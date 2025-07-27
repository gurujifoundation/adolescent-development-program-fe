// src/utils/validators.js

/**
 * Validates a generic name field: required, alphabetic characters and spaces only, min length.
 * @param {string} value - The input value.
 * @param {number} minLength - Minimum required length.
 * @returns {string|null} Error message or null if valid.
 */
export const validateName = (value, minLength = 2) => {
  if (!value || String(value).trim() === '') {
    return "Name is required.";
  }
  if (!/^[A-Za-z\s]+$/.test(value)) {
    return "Name should only contain letters and spaces.";
  }
  if (value.length < minLength) {
    return `Name must be at least ${minLength} characters long.`;
  }
  return null;
};

/**
 * Validates an email field: required, valid email format.
 * @param {string} value - The input value.
 * @returns {string|null} Error message or null if valid.
 */
export const validateEmail = (value) => {
  if (!value || String(value).trim() === '') {
    return "Email is required.";
  }
  // A more robust email regex (though still not perfect for all edge cases)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Invalid email format.";
  }
  return null;
};

/**
 * Validates a birthday field: required, valid date format (YYYY-MM-DD), not in the future.
 * @param {string} value - The input value (expected YYYY-MM-DD).
 * @returns {string|null} Error message or null if valid.
 */
export const validateBirthday = (value) => {
  if (!value || String(value).trim() === '') {
    return "Birthday is required.";
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) {
    return "Birthday must be in YYYY-MM-DD format.";
  }
  const birthDate = new Date(value);
  const today = new Date();
  // Set time to 00:00:00 for accurate date comparison
  today.setHours(0, 0, 0, 0);
  birthDate.setHours(0, 0, 0, 0);

  if (isNaN(birthDate.getTime())) { // Check if date is invalid
    return "Invalid date.";
  }
  if (birthDate > today) {
    return "Birthday cannot be in the future.";
  }
  return null;
};

/**
 * Validates an address field: required, min length, allows alphanumeric, spaces, common punctuation.
 * @param {string} value - The input value.
 * @param {number} minLength - Minimum required length.
 * @returns {string|null} Error message or null if valid.
 */
export const validateAddress = (value, minLength = 5) => {
  if (!value || String(value).trim() === '') {
    return "Address is required.";
  }
  if (value.length < minLength) {
    return `Address must be at least ${minLength} characters long.`;
  }
  // Allow letters, numbers, spaces, commas, periods, hyphens, #
  if (!/^[A-Za-z0-9\s.,#-]+$/.test(value)) {
    return "Address contains invalid characters.";
  }
  return null;
};

/**
 * Validates a phone number field: required, exactly 10 digits.
 * @param {string} value - The input value.
 * @returns {string|null} Error message or null if valid.
 */
export const validatePhoneNumber = (value) => {
  if (!value || String(value).trim() === '') {
    return "Phone number is required.";
  }
  if (!/^\d{10}$/.test(value)) {
    return "Phone number must be exactly 10 digits.";
  }
  return null;
};

/**
 * Validates a number field within a min/max range.
 * @param {string|number} value - The input value.
 * @param {number} min - Minimum allowed value.
 * @param {number} max - Maximum allowed value.
 * @param {boolean} required - Whether the field is required.
 * @returns {string|null} Error message or null if valid.
 */
export const validateNumberRange = (value, min, max, required = true) => {
  if (required && (!value || String(value).trim() === '')) {
    return "This field is required.";
  }
  if (!required && (!value || String(value).trim() === '')) {
    return null; // Not required and empty, so it's valid
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return "Please enter a valid number.";
  }
  if (numValue < min) {
    return `Value must be at least ${min}.`;
  }
  if (numValue > max) {
    return `Value cannot exceed ${max}.`;
  }
  return null;
};

export const validateWebsite = (value) => {
  // If the field is empty, it's considered valid as it's optional
  if (!value || String(value).trim() === '') {
    return null;
  }
  // Regex for basic URL validation
  if (!/^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/\S*)?$/.test(value)) {
    return "Please enter a valid website URL.";
  }
  return null;
};
