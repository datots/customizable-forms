// src/validation/helpers.js

// Function to handle error messages
export const getErrorMessage = (error) => {
  if (error && error.message) {
    return error.message;
  }
  return "An unknown error occurred.";
};

// Function to validate email format (if needed)
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Add more helper functions as needed
