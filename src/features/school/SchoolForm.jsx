import React, { useState, useEffect } from "react";

import SuccessModal from "../../common/FeedbackComponents/Sucess/SuccessModal"; // Import the modal component
import "./SchoolForm.css";
import "../../CSS/Main.css";
import ErrorMessage from "../../common/FormInput/ErrorMessage";
import NumberInput from "../../common/FormInput/NumberInput";
import TextInput from "../../common/FormInput/TextInput";
import Button from "../../common/FormInput/Button";
import useError from "../../hooks/useError";

const SchoolForm = ({
  handleSubmit,
  message,
  heading,
  handleCloseModal,
  schoolDataDefault,
}) => {
  const [schoolData, setSchoolData] = useState({
    name: schoolDataDefault?.name,
    address: schoolDataDefault?.address,
    phoneNumber: schoolDataDefault?.phoneNumber,
    principalName: schoolDataDefault?.principalName,
    principalContactNo: schoolDataDefault?.principalContactNo,
    managingTrustee: schoolDataDefault?.managingTrustee,
    trusteeContactInfo: schoolDataDefault?.trusteeContactInfo,
    website: schoolDataDefault?.website,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSchoolData(schoolDataDefault);
  }, [schoolDataDefault]);

  const [showModal, setShowModal] = useState(false);
  const { errors, setError, clearError } = useError();

  const handleInputChange = (e) => {
    setSchoolData({
      ...schoolData,
      [e.target.name]: e.target.value,
    });
  };

  //submit button
  const handleSubmitButton = async (e) => {
    e.preventDefault();
    if (loading) return;

    const newErrors = [];

    // School name: alphanumeric + spaces
    if (!/^[A-Za-z0-9\s]+$/.test(schoolData.name || "")) {
      newErrors.push("School name should be alphanumeric only.");
    }

    // Address: at least 5 characters
    if (!schoolData.address || schoolData.address.trim().length < 5) {
      newErrors.push("Address must be at least 5 characters long.");
    }

    // Principal Name: alphabets and spaces
    if (!/^[A-Za-z\s]+$/.test(schoolData.principalName || "")) {
      newErrors.push("Principal name should only contain letters and spaces.");
    }

    // Principal Contact: 10 digits
    if (!/^\d{10}$/.test(schoolData.principalContactNo || "")) {
      newErrors.push("Principal contact number must be exactly 10 digits.");
    }

    // Trustee Contact (optional): if present, must be 10 digits
    if (
      schoolData.trusteeContactInfo &&
      !/^\d{10}$/.test(schoolData.trusteeContactInfo)
    ) {
      newErrors.push("Trustee contact number must be 10 digits.");
    }

    // Website (optional): basic URL validation
    if (
      schoolData.website &&
      !/^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/\S*)?$/.test(schoolData.website)
    ) {
      newErrors.push("Please enter a valid website URL.");
    }

    if (newErrors.length > 0) {
      setError(newErrors); // <-- this replaces old errors
      return;
    }

    clearError();
    setLoading(true);
    try {
      const response = await handleSubmit(schoolData);

      if (response.data?.status) {
        setShowModal(true);
        clearError();
      } else if (response.data?.messages) {
        setError(response.data.messages.map((msg) => msg.message));
      } else {
        setError("An unexpected error occurred.");
      }
    } catch (error) {
      setError(error.message || "Error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    handleCloseModal();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmitButton}>
        <h2>{heading}</h2>
        <div className="form-layout">
          <div className="form-row">
            <TextInput
              label="School Name"
              name="name"
              value={schoolData.name}
              onChange={handleInputChange}
              required
            />

            <TextInput
              label="Address"
              name="address"
              value={schoolData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <TextInput
              label="Principal Name"
              name="principalName"
              value={schoolData.principalName}
              onChange={handleInputChange}
              required
            />

            <TextInput
              label="Principal Contact No"
              name="principalContactNo"
              value={schoolData.principalContactNo}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <TextInput
              label="Managing Trustee"
              name="managingTrustee"
              value={schoolData.managingTrustee}
              onChange={handleInputChange}
            />

            <TextInput
              label="Trustee Contact Info"
              name="trusteeContactInfo"
              value={schoolData.trusteeContactInfo}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row single-input">
            <TextInput
              label="Website"
              name="website"
              value={schoolData.website}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <Button
          type="submit"
          label="Submit"
          className="g-button submit-button"
        />
      </form>

      {errors.length > 0 && <ErrorMessage errors={errors} />}
      {showModal && <SuccessModal data={message} onClose={handleClose} />}
    </div>
  );
};

export default SchoolForm;
