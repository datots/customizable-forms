import { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const CreateTemplate = () => {
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Template title is required"),
    questions: Yup.array()
      .of(
        Yup.object().shape({
          question: Yup.string().required("Question is required"),
          answerType: Yup.string()
            .oneOf(
              ["text", "radio", "checkbox", "dropdown", "date"],
              "Invalid answer type"
            )
            .required("Answer type is required"),
          options: Yup.array().when(
            "answerType",
            (answerType: string, schema) => {
              if (answerType === "dropdown") {
                return schema
                  .of(Yup.string().required("Option is required"))
                  .min(1, "At least one option is required");
              }
              return schema.notRequired();
            }
          ),
        })
      )
      .required("At least one question is required")
      .min(1, "At least one question is required"),
  });

  const initialValues = {
    title: "",
    questions: [{ question: "", answerType: "text", options: [""] }],
  };

  const handleSubmit = async (values) => {
    try {
      if (!auth.currentUser) {
        setError("You must be logged in to create a template.");
        return;
      }
      const valuesWithCreator = {
        ...values,
        creatorId: auth.currentUser.uid,
        createdAt: new Date(),
      };

      const docRef = await addDoc(
        collection(db, "templates"),
        valuesWithCreator
      );
      console.log("Template created with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating template: ", error);
      setError("Failed to create template. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create Template</h1>
      {error && <div className="text-red-500">{error}</div>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2">
                Template Title
              </label>
              <Field name="title" className="border p-2 rounded w-full" />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
            </div>
            <FieldArray name="questions">
              {({ push, remove }) => (
                <div>
                  {values.questions.map((question, index) => (
                    <div key={index} className="border p-4 mb-4 rounded">
                      <h2 className="font-semibold mb-2">
                        Question {index + 1}
                      </h2>
                      <Field
                        name={`questions.${index}.question`}
                        placeholder="Question"
                        className="border p-2 rounded w-full mb-2"
                      />
                      <ErrorMessage
                        name={`questions.${index}.question`}
                        component="div"
                        className="text-red-500"
                      />
                      <Field
                        name={`questions.${index}.answerType`}
                        as="select"
                        className="border p-2 rounded w-full mb-2"
                      >
                        <option value="text">Text</option>
                        <option value="radio">Radio</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="date">Date</option>
                      </Field>
                      <ErrorMessage
                        name={`questions.${index}.answerType`}
                        component="div"
                        className="text-red-500"
                      />
                      {question.answerType === "dropdown" && (
                        <FieldArray name={`questions.${index}.options`}>
                          {({ push: pushOption, remove: removeOption }) => (
                            <div>
                              {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex mb-2">
                                  <Field
                                    name={`questions.${index}.options.${optionIndex}`}
                                    placeholder="option"
                                    className="border p-2 rounded w-full"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeOption(optionIndex)}
                                    className="ml-2 text-red-500 "
                                  >
                                    Remove
                                  </button>
                                  <ErrorMessage
                                    name={`questions.${index}.options.${optionIndex}`}
                                    component="div"
                                    className="text-red-500"
                                  />
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => pushOption("")}
                                className="text-blue-500"
                              >
                                Add Option
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      )}
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500"
                      >
                        Remove Question
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({ question: "", answerType: "text", options: [""] })
                    }
                    className="text-blue-500"
                  >
                    Add Question
                  </button>
                </div>
              )}
            </FieldArray>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded"
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
