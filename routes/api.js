const express = require("express");
const shortid = require("shortid");
const router = express.Router();
const connect = require("../connect.js");

let db;

connect("ls-cmd").then(database => {
    db = database;
});

router.get("/cmds", (req, res, next) => {
    db.collection("cmds")
        .find({})
        .sort({ cmd: 1 })
        .toArray()
        .then(data => {
            res.json({ payload: data });
        })
        .catch(err => console.log(err));
});

// router.post("/cmds", function(req, res, next) {
//     db.collection("cmds").insertOne(
//         { id: shortid.generate(), cmd: req.body.cmd, desc: req.body.desc },
//         (error, result) => {
//             if (error) {
//                 console.log("failed to add to mongo");
//                 res.status(500).json({ message: "failed" });
//             }
//             res.status(201).json(result.ops[0]);
//         }
//     );
// });

router.get("/cmds/:id", (req, res, next) => {
    db.collection("cmds")
        .find({ id: req.params.id })
        .toArray()
        .then(data => {
            res.json({ payload: data });
        })
        .catch(err => console.log(err));
});

router.get("/gits", (req, res, next) => {
    db.collection("cmds")
        .find({ type: "git" })
        .sort({ name: 1 })
        .toArray()
        .then(data => {
            res.json({ payload: data });
        })
        .catch(err => console.log(err));
});

// router.post("/gits", function(req, res, next) {
//     db.collection("cmds").insertOne(
//         { id: shortid.generate(), cmd: req.body.cmd, desc: req.body.desc },
//         (error, result) => {
//             if (error) {
//                 console.log("failed to add to mongo");
//                 res.status(500).json({ message: "failed" });
//             }
//             res.status(201).json(result.ops[0]);
//         }
//     );
// });

router.get("/gits/:id", (req, res, next) => {
    db.collection("gits")
        .find({ id: req.params.id })
        .toArray()
        .then(data => {
            res.json({ payload: data });
        })
        .catch(err => console.log(err));
});

module.exports = router;
