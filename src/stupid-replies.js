const mongoDao = require('./mongo/mongo-dao')
const axios = require('axios');
const profanityService = require("./services/profanity-service");

const apiUrl = 'https://insult.mattbas.org/api/insult';

async function getStupidReply(server, channel, override = false) {
  let response = await axios.get(apiUrl);
  response = response.data.trim();
  if(override || await profanityService.isProfanityOnForChannel(server, channel)){
    response = profanityService.generateSentenceWithProfanity(response);
  }
  return response;
}

function addStupidReply(reply) {
  console.log("Saving new insult to database: ", reply);
  mongoDao.addInsult(reply);
}

module.exports = {
  getStupidReply: getStupidReply,
  addStupidReply: addStupidReply,
};
