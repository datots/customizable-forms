// // src/components/CreateTemplate.jsx
// import React from "react";
// import { Formik, Form, Field } from "formik";
// import axios from "axios";

// const CreateTemplate = () => {
//   const handleSubmit = async  (values) => {
//     console.log('Submitting to URL:', import.meta.env.VITE_TEMPLATE_API_URL);
//     console.log('Form values:', values);

//     try {
//       const response = await axios.post(import.meta.env.VITE_TEMPLATE_API_URL, values);
//       console.log('Template created successfully:', response.data);
//     } catch (error) {
//       console.error('Error creating template:', error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="mt-6 text-xl font-semibold">Create Template</h2>
//       <Formik
//         initialValues={{
//           title: "",
//           description: "",
//           fields: [{ label: "", type: "text" }], // Example structure
//         }}
//         onSubmit={handleSubmit}
//       >
//         {({ values, handleChange, push }) => (
//           <Form>
//             <Field
//               name="title"
//               placeholder="Template Title"
//               className="border p-2 w-full"
//             />
//             <Field
//               name="description"
//               placeholder="Template Description"
//               className="border p-2 w-full"
//             />
//             {values.fields.map((field, index) => (
//               <div key={index}>
//                 <Field
//                   name={`fields[${index}].label`}
//                   placeholder="Field Label"
//                   className="border p-2 w-full"
//                 />
//                 <Field
//                   as="select"
//                   name={`fields[${index}].type`}
//                   className="border p-2 w-full"
//                 >
//                   <option value="text">Single Line</option>
//                   <option value="textarea">Multi-line</option>
//                   <option value="number">Integer</option>
//                   <option value="checkbox">Checkbox</option>
//                 </Field>
//               </div>
//             ))}
//             <button
//               type="submit"
//               className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
//             >
//               Create Template
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default CreateTemplate;

import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { templateApiUrl } from "../../config/apiConfig"; // Adjust path if necessary

const CreateTemplate = () => {
  const handleSubmit = async (values) => {
    console.log("Submitting to URL:", templateApiUrl);
    console.log("Form values:", values);

    try {
      const response = await axios.post(templateApiUrl, values);
      console.log("Template created successfully:", response.data);
    } catch (error) {
      console.error("Error creating template:", error.message || error);
    }
  };

  return (
    <div>
      <h2 className="mt-6 text-xl font-semibold">Create Template</h2>
      <Formik
        initialValues={{
          title: "",
          description: "",
          fields: [{ label: "", type: "text" }], // Example structure
        }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, push }) => (
          <Form>
            <Field
              name="title"
              placeholder="Template Title"
              className="border p-2 w-full"
            />
            <Field
              name="description"
              placeholder="Template Description"
              className="border p-2 w-full"
            />
            {values.fields.map((field, index) => (
              <div key={index}>
                <Field
                  name={`fields[${index}].label`}
                  placeholder="Field Label"
                  className="border p-2 w-full"
                />
                <Field
                  as="select"
                  name={`fields[${index}].type`}
                  className="border p-2 w-full"
                >
                  <option value="text">Single Line</option>
                  <option value="textarea">Multi-line</option>
                  <option value="number">Integer</option>
                  <option value="checkbox">Checkbox</option>
                </Field>
              </div>
            ))}
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
            >
              Create Template
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateTemplate;
