const {getInsults, addInsult} = require('./mongo/mongo-dao')

async function getStupidReply() {
  const replies = await getInsults();
  let i = Math.floor(Math.random() * replies.length);
  return replies[i];
};

function addStupidReply(reply) {
  addInsult(reply);
};

module.exports = {
  getStupidReply: getStupidReply,
  addStupidReply: addStupidReply,
};
