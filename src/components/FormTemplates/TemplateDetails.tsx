import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

const TemplateDetails = () => {
  const { templateId } = useParams();
  const [template, setTemplate] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTemplate = async () => {
      const docRef = doc(db, "templates", templateId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTemplate(docSnap.data());
      } else {
        console.log("No such document");
      }
    };
    fetchTemplate();
  }, [templateId, db]);

  const onSubmit = async (data) => {
    try {
      if (!user) {
        console.log("User is not authorized.");
        return;
      }

      const userId = user.uid;

      const responseDocId = `${templateId} - ${new Date().getTime()}`;

      const responseData = {
        ...data,
        templateId,
        userId,
        submittedAt: Timestamp.now(),
      };

      await setDoc(doc(db, "responses", responseDocId), responseData);
      console.log("Response submitted:", responseData);
    } catch (error) {
      console.log("Error submitting rsponse: ", error);
    }
  };

  if (!template) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <h1>{template.name}</h1>
      <p>{template.description}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {template.content.map((field, index) => {
          switch (field.type) {
            case "string":
              return (
                <div key={index}>
                  <label>{field.index}</label>
                  <input
                    type="text"
                    {...register(`response-${index}`, { required: true })}
                  />
                  {errors[`response-${index}`] && (
                    <span>This field is required</span>
                  )}
                </div>
              );
            case "boolean":
              return (
                <div key={index}>
                  <label>{field.label}</label>
                  <input type="checkbox" {...register(`response-${index}`)} />
                </div>
              );
            case "multiple-choice":
              return (
                <div key={index}>
                  <label> {field.index} </label>
                  {field.options.map((option, optIndex) => (
                    <div key={optIndex}>
                      <input
                        type="radio"
                        value={option}
                        {...register(`response-${index}`, { required: true })}
                      />
                    </div>
                  ))}
                  {errors[`response-${index}`] && (
                    <span> This field is required</span>
                  )}
                </div>
              );
            default:
              return null;
          }
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TemplateDetails;
