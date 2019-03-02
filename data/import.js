const shortid = require("shortid");
const connect = require("../connect.js");
const cmdjson = require("./cmd.json");
const gitjson = require("./git.json");

connect("ls-cmd").then(db => {
    cmdjson.forEach(item => {
        db.collection("cmds")
            .insertOne({
                id: shortid.generate(),
                cmd: item.cmd,
                desc: item.desc
            })
            .then(res => console.log({ cmd: `${res.ops[0]._id}` }))
            .catch(res => console.log({ failed: `${item.id}` }));
    });
});

connect("ls-cmd").then(db => {
    gitjson.forEach(item => {
        db.collection("gits")
            .insertOne({
                id: shortid.generate(),
                cmd: item.cmd,
                desc: item.desc
            })
            .then(res => console.log({ git: `${res.ops[0]._id}` }))
            .catch(res => console.log({ failed: `${item.id}` }));
    });
});
