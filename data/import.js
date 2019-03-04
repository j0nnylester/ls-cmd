const shortid = require("shortid");
const connect = require("../connect.js");
const cmdjson = require("./cmds.json");

connect("ls-cmd").then(db => {
    cmdjson.forEach(item => {
        db.collection("cmds")
            .insertOne({
                id: shortid.generate(),
                type: item.type,
                cmd: item.cmd,
                desc: item.desc
            })
            .then(res => console.log({ cmd: `${res.ops[0]._id}` }))
            .catch(res => console.log({ failed: `${item.id}` }));
    });
});
