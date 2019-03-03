const express = require("express");
const shortid = require("shortid");
const router = express.Router();
const connect = require("../connect.js");

let db;

connect("ls-cmd").then(database => {
    db = database;
});

router.get("/cmd", (req, res, next) => {
    db.collection("cmds")
        .find({})
        .sort({ cmd: 1 })
        .toArray()
        .then(data => {
            res.json({ payload: data });
        })
        .catch(err => console.log(err));
});

router.post("/cmd", function(req, res, next) {
    db.collection("cmds").insertOne(
        { id: shortid.generate(), cmd: req.body.cmd, desc: req.body.desc },
        (error, result) => {
            if (error) {
                console.log("failed to add to mongo");
                res.status(500).json({ message: "failed" });
            }
            res.status(201).json(result.ops[0]);
        }
    );
});

router.get("/cmd/:id", (req, res, next) => {
    db.collection("cmds")
        .find({ id: req.params.id })
        .toArray()
        .then(data => {
            res.json({ payload: data });
        })
        .catch(err => console.log(err));
});

router.get("/git", (req, res, next) => {
    db.collection("gits")
        .find({})
        .sort({ name: 1 })
        .toArray()
        .then(data => {
            res.json({ payload: data });
        })
        .catch(err => console.log(err));
});

router.post("/git", function(req, res, next) {
    db.collection("gits").insertOne(
        { id: shortid.generate(), cmd: req.body.cmd, desc: req.body.desc },
        (error, result) => {
            if (error) {
                console.log("failed to add to mongo");
                res.status(500).json({ message: "failed" });
            }
            res.status(201).json(result.ops[0]);
        }
    );
});

router.get("/git/:id", (req, res, next) => {
    db.collection("gits")
        .find({ id: req.params.id })
        .toArray()
        .then(data => {
            res.json({ payload: data });
        })
        .catch(err => console.log(err));
});

module.exports = router;
