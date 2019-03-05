const mongodb = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.MDB_USER}:${
    process.env.MDB_PASSWD
}@ls-cmd-kbfzv.mongodb.net/ls-cmd?retryWrites=true`;

const connect = database => {
    return mongodb.MongoClient.connect(uri, { useNewUrlParser: true }).then(
        client => {
            //console.log("Connected to MongoDB!");
            return client.db(database);
        }
    );
};

module.exports = connect;
