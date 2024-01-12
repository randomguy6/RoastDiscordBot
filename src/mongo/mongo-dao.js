require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const MONGO_URI = process.env.MONGO_URI;

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
  const collection = client.db("IsaiahBot").collection("insults");
  const result = await collection.findOne();
  client.close();
  return result.insults;
}

async function addInsultToMongo(newInsult) {
  const client = getClient();
  const collection = client.db("IsaiahBot").collection("insults");
  await collection.updateOne({}, { $addToSet: { insults: newInsult } });
  client.close();
}

async function getCommandsFromMongo() {
  const client = getClient();
  const collection = client.db("IsaiahBot").collection("commands");
  const result = await collection.find().toArray();
  client.close();
  return result;
}

module.exports = {
  getInsults: getInsultsFromMongo,
  addInsult: addInsultToMongo,
  getCommands: getCommandsFromMongo,
};
