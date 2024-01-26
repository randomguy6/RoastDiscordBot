const stupidReply = require("../stupid-replies");

var currentlyInsultingUser = "<@1054656340913573939>";

async function insult(server, channel) {
  console.log("Received insult command");
  return `${currentlyInsultingUser} ${await stupidReply.getStupidReply(server, channel, false)}`;
}

function addNewInsult(phrase, username) {
  let reply;
  if (username !== currentlyInsultingUser) {
    stupidReply.addStupidReply(phrase);
    reply = `Added new insult: ${phrase}`;
  } else {
    reply = `Fuck you ${currentlyInsultingUser}! You can't add insults for yourself (unless you want to)`;
  }
  return reply;
}

function insultNewUser(user) {
    let reply;
  if (user !== "<@448522510988738560>") {
    reply = `Started insulting ${user}`;
    currentlyInsultingUser = user;
  } else {
    reply = "I can't insult my creator. Pick another guy."
  }
  return reply;
}

function enableProfanityForChannel(serverName, channelName){

}

module.exports = {
  addNewInsult: addNewInsult,
  insult: insult,
  insultNewUser: insultNewUser,
  enableProfanity: enableProfanityForChannel,
};
