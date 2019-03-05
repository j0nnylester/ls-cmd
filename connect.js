const mongodb = require("mongodb");
require("dotenv").config();

const mongoUser = process.env.MDB_USER || "readOnly";
const mongoPass = process.env.MDB_PASSWD || "hF1d6TgctPmSLyur";

const uri = `mongodb+srv://${mongoUser}:${mongoPass}@ls-cmd-kbfzv.mongodb.net/ls-cmd?retryWrites=true`;

const connect = database => {
    return mongodb.MongoClient.connect(uri, { useNewUrlParser: true }).then(
        client => {
            //console.log("Connected to MongoDB!");
            return client.db(database);
        }
    );
};

module.exports = connect;
