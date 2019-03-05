const shortid = require("shortid");
const connect = require("../connect.js");
const cmdjson = require("./cmds.json");

let uploadData = cmdjson.map(function(item) {
    return {
        id: shortid.generate(),
        cmd: item.cmd,
        flags: item.flags,
        args: item.args,
        desc: item.desc,
        user: item.user
    };
});


connect("ls-cmd").then(db => {
    db.collection("cmds")
        .insertMany(uploadData)
        .then(res => console.log({ cmd: `${res.ops[0]._id}` }))
        .then(() => process.exit(0))
        .catch(err => {
            console.log({ failed: `${err}` });
            process.exit(1);
        });
});
