import express from "express";
const router = express.Router();
const {
  createTemplate,
  getTemplates,
  updateTemplate,
  deleteTemplate,
  searchTemplates,
} = require("../controllers/templateController");

// Create a new template
router.post("/", createTemplate);

// Get all templates (for viewing, with public access)
router.get("/", getTemplates);

// Update a specific template
router.put("/:id", updateTemplate);

// Delete a specific template
router.delete("/:id", deleteTemplate);

// Search templates
router.get("/search", searchTemplates);

module.exports = router;
