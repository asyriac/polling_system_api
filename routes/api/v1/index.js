const express = require("express");
const router = express.Router();

// Handling v1 routes
router.use("/questions", require("./questions"));
router.use("/options", require("./options"));

module.exports = router;
