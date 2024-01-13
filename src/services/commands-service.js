const stupidReply = require("../stupid-replies");


function insult(){
    console.log("Received insult command");
    return stupidReply.getStupidReply();
}


function addNewInsult(phrase, username) {
  let reply;
  if (username !== "samuraikirby7") {
    stupidReply.addStupidReply(phrase);
    reply = `Added new insult: ${phrase}`;
  } else {
    reply =
      "Fuck you Isaiah! You can't add insults for yourself (unless you want to)";
  }
  return reply;
}

module.exports = {
  addNewInsult: addNewInsult,
  insult: insult,
};
