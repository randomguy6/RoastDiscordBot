const mongoDao = require("../mongo/mongo-dao");
const nlp = require("compromise");

const profanity = [
    "fucking",
    "mother fucking"
]

async function profanityCommandHandler(command, server, channel) {
    if (command === "enable_profanity") {
        await mongoDao.addChannelForProfanity(server, channel);
        return "Fuck you! Now I have to start saying stupid shit here."
    } else if (command === "disable_profanity") {
        await mongoDao.deleteChannelForProfanity(server, channel);
        return "Thank you! I will try to be more respectful now.";
    } else if (command === "profanity_status") {
        if (await isProfanityOnForChannel(server, channel)) {
            return "Fuck you! I am supposed to be fucking naughty with you guys!";
        } else {
            return "I am supposed to be nice with you guys!";
        }
    } else {
        return "Sir/Ma'am! I don't know what to do here.";
    }
}

async function isProfanityOnForChannel(server, channel) {
    const result = await mongoDao.findChannel(server, channel);
    return (result !== null && result.length !== 0);
}

function generateSentenceWithProfanity(sentence) {
    const nounsIndex = nlp(sentence).termList()
        .filter(term => term.tags.has("Noun") && term.text !== "I" && term.index[1] !== 0)
        .map(term => term.index[1]);
    let sentenceSplit = sentence.split(" ").map((word, index) => {
        if(nounsIndex.includes(index)){
            word = profanity[Math.floor(Math.random() * profanity.length)] + " " + word;
        }
        return word;
    });
    return sentenceSplit.join(" ");
}

module.exports = {
    handleCommand: profanityCommandHandler,
    isProfanityOnForChannel: isProfanityOnForChannel,
    generateSentenceWithProfanity: generateSentenceWithProfanity,
}