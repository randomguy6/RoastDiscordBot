const mongoDao = require("../mongo/mongo-dao");

async function profanityCommandHandler(command, server, channel){
    if(command === "enable_profanity"){
        await mongoDao.addChannelForProfanity(server, channel);
        return "Fuck you! Now I have to start saying stupid shit here."
    } else if(command === "disable_profanity"){
        await mongoDao.deleteChannelForProfanity(server, channel);
        return "Thank you! I will try to be more respectful now.";
    } else if(command === "profanity_status"){
        const result = await mongoDao.findChannel(server, channel);
        if(result.length !== 0) {
            return "I am supposed to be nice with you guys!";
        } else {
            return "Fuck you! I am supposed to be fucking naughty with you guys!";
        }
    } else {
        return "Sir/Ma'am! I don't know what to do here.";
    }
}

module.exports = {
    handleCommand: profanityCommandHandler,
}