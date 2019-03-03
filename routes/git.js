const express = require("express");
const router = express.Router();
const connect = require("../connect.js");
let db;

connect("ls-cmd").then(database => {
    db = database;
});

router.get("/:id", function(req, res, next) {
    db.collection("gits")
        .find({ id: req.params.id })
        .toArray()
        .then(data => {
            res.render("cmd", {
                title: "Git",
                cmd: `${data[0].cmd}`,
                desc: `${data[0].desc}`
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;
