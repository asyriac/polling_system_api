const express = require("express");
const router = express.Router();
const { destroy_option, add_vote } = require("../../../controllers/v1/options");

// Handling options routes
router.delete("/:id/delete", destroy_option);
router.post("/:id/add_vote", add_vote);

module.exports = router;
