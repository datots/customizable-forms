import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { values } from "lodash";

const EditTemplate = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    category: "",
    popularity: 0,
  });
  const validationSchema = Yup.object({
    name: Yup.string().required("Template name is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    popularity: Yup.number().min(0, "Popularity cannot be negative"),
  });

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const docRef = doc(db, "templates", templateId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setInitialValues(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching template: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, [templateId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const docRef = doc(db, "templates", templateId);
      await addDoc(collection(db, "templateVersion"), {
        ...values,
        templateId: templateId,
        versionTimestamp: serverTimestamp(),
      });
      await updateDoc(docRef, {
        ...values,
        updatedAt: serverTimestamp(),
      });
      setFeedbackMessage("Template updated successfully!");
      setOpenModal(true);
    } catch (error) {
      console.error("Error updating template:", error);
      setFeedbackMessage("Error updating the template. Please try again.");
      setOpenModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (feedbackMessage.includes("success")) {
      navigate("/templates");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Edit Template</h1>
      {feedbackMessage && (
        <div
          style={{ color: feedbackMessage.includes("Error") ? "red" : "green" }}
        >
          {feedbackMessage}
        </div>
      )}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Template Name</label>
              <Field type="text" name="name" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="name" component="div" />
              </div>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field as="textarea" name="description" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="description" component="div" />
              </div>
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <Field type="text" name="category" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="category" component="div" />
              </div>
            </div>
            <div>
              <label htmlFor="popularity">Popularity</label>
              <Field name="popularity" type="number" />
              <div style={{ color: "red" }}>
                <ErrorMessage name="popularity" component="div" />
              </div>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {" "}
          {feedbackMessage.includes("Error") ? "Error" : "Success"}
        </DialogTitle>
        <DialogContent>{feedbackMessage}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTemplate;
