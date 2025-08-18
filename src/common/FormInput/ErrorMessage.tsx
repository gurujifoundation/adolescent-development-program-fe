import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import "./ErrorMessage.css";

interface ErrorMessageProps {
  errors: string[];
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors }) => {
  const [visibleErrors, setVisibleErrors] = useState<string[]>([]);

  useEffect(() => {
    if (errors.length > 0) {
      setVisibleErrors(errors); // Override old errors with new ones
      const timer = setTimeout(() => {
        setVisibleErrors([]); // Clear after 5 seconds
      }, 5000);
      return () => clearTimeout(timer); // Cleanup on update
    }
  }, [errors]);

  if (visibleErrors.length === 0) return null;

  return (
    <div className="error-message">
      <FaExclamationTriangle className="warning-icon" />
      <div className="error-text">
        {visibleErrors.map((err, index) => (
          <p key={index} className="error-item">
            {err}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ErrorMessage;
