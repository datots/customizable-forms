import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase"; // Adjust import based on your structure
import { doc, setDoc } from "firebase/firestore";

const CreateTemplate = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      templateName: "",
      templateDescription: "",
    },
    validationSchema: Yup.object({
      templateName: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      templateDescription: Yup.string()
        .max(200, "Must be 200 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const templateRef = doc(db, "templates", values.templateName);
        await setDoc(templateRef, {
          description: values.templateDescription,
        });
        navigate("/templates");
      } catch (error: unknown) {
        console.error("Error creating template:", error);
        alert("Error creating template: " + (error as Error).message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Create Template
        </h1>
        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              type="text"
              name="templateName"
              placeholder="Template Name"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.templateName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.templateName && formik.errors.templateName && (
              <div className="mt-1 text-sm text-red-500">
                {formik.errors.templateName}
              </div>
            )}
          </div>

          <div>
            <textarea
              name="templateDescription"
              placeholder="Template Description"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.templateDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.templateDescription &&
              formik.errors.templateDescription && (
                <div className="mt-1 text-sm text-red-500">
                  {formik.errors.templateDescription}
                </div>
              )}
          </div>

          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Create Template
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplate;
