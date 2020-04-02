const express = require("express");
const router = express.Router();
const { create_question, destroy_question, create_option, get_question } = require("../../../controllers/v1/questions");

// Handling questions routes
router.post("/create", create_question);
router.delete("/:id/delete", destroy_question);
router.post("/:id/options/create", create_option);
router.get("/:id", get_question);

module.exports = router;
