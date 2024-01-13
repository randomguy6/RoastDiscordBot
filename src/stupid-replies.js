const {getInsults, addInsult} = require('./mongo/mongo-dao')
const axios = require('axios');

const apiUrl = 'https://insult.mattbas.org/api/insult';

async function getStupidReply() {
  const response = await axios.get(apiUrl);
  return response.data.trim();
};

function addStupidReply(reply) {
  console.log("Saving new insult to database: ", reply);
  addInsult(reply);
};

module.exports = {
  getStupidReply: getStupidReply,
  addStupidReply: addStupidReply,
};
