const path = require("path");
const express = require("express");
const router = express.Router();
const connect = require("../connect.js");

/* GET home page. */
router.get("/", function(req, res, next) {
    res.sendFile(path.join(__dirname, "../views/new-index.html"));
});

module.exports = router;
