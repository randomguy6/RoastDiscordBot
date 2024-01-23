require("dotenv").config();
const {MongoClient, ServerApiVersion} = require("mongodb");

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "IsaiahBot";

function getClient() {
    return new MongoClient(MONGO_URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
}

async function getInsultsFromMongo() {
    const client = getClient();
    const collection = client.db(DB_NAME).collection("insults");
    const result = await collection.findOne();
    client.close();
    return result.insults;
}

async function addInsultToMongo(newInsult) {
    const client = getClient();
    const collection = client.db("IsaiahBot").collection("insults");
    await collection.updateOne({}, {$addToSet: {insults: newInsult}});
    client.close();
}

async function getCommandsFromMongo() {
    const client = getClient();
    const collection = client.db(DB_NAME).collection("commands");
    const result = await collection.find().toArray();
    client.close();
    return result;
}

function addChannelForProfanity(serverName, channelName) {
    const client = getClient();
    const collection = client.db(DB_NAME).collection("profanity");
    collection.updateOne(
        {"sever": serverName},
        {$addToSet: {"channels": channelName}},
        {upsert: true}
    ).then(() => client.close());
}

async function deleteChannelForProfanity(serverName, channelName) {
    const client = getClient();
    const collection = client.db(DB_NAME).collection("profanity");
    await collection.updateOne(
        {"sever": serverName},
        {$pull: {"channels": channelName}},
        {upsert: true}
    ).then(() => client.close());
}

module.exports = {
    getInsults: getInsultsFromMongo,
    addInsult: addInsultToMongo,
    getCommands: getCommandsFromMongo,
    addChannelForProfanity: addChannelForProfanity,
    deleteChannelForProfanity: deleteChannelForProfanity,
};
