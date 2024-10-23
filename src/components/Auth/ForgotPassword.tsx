import * as Yup from "yup";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navitation = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      sendPasswordResetEmail(auth, values.email);
      navitation("/");
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          name="email"
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
        <button type="submit" disabled={formik.isSubmitting}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
