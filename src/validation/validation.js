// src/validation/validation.js
import * as Yup from "yup";

// Validation schema for the Forgot Password form
export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

// You can export more validation schemas here for other forms
