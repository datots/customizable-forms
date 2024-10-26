// services/formService.js
import { db } from "./firebase";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";

// Fetch all templates
export const fetchTemplates = async () => {
  const templatesCollection = collection(db, "templates");
  const templatesSnapshot = await getDocs(templatesCollection);
  return templatesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Fetch a single template by ID
export const fetchTemplateById = async (id) => {
  const templateDoc = doc(db, "templates", id);
  const templateSnapshot = await getDoc(templateDoc);
  return templateSnapshot.exists()
    ? { id: templateSnapshot.id, ...templateSnapshot.data() }
    : null;
};

// Create a new form
export const createForm = async (formData) => {
  const formDoc = doc(collection(db, "forms"));
  await setDoc(formDoc, formData);
  return formDoc.id; // Return the ID of the newly created form
};
