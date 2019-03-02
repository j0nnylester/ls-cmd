const mongodb = require("mongodb");

const uri =
    "mongodb+srv://ls-cmd:1qFWaK0vioi622aj@ls-cmd-kbfzv.mongodb.net/ls-cmd?retryWrites=true";

const connect = async database => {
    return mongodb.MongoClient.connect(uri, { useNewUrlParser: true }).then(
        client => {
            //console.log("Connected to MongoDB!");
            return client.db(database);
        }
    );
};

module.exports = connect;
