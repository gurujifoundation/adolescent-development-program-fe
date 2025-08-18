import { useState } from "react";

const useError = () => {
  const [errors, setErrors] = useState([]); // Store errors in an array

  const setError = (newErrors) => {
    if (Array.isArray(newErrors)) {
      setErrors(newErrors); // Replace entire list
    } else if (newErrors) {
      setErrors([newErrors]); // Wrap single error in array
    }
  };
  

  const clearError = () => {
    setErrors([]); // Clear all errors
  };

  return { errors, setError, clearError };
};

export default useError;
