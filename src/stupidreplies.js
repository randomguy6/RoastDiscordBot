const replies = ["Shut up Isaiah", "Go sit in your corner"]

const getStupidReply = () => {
    let i = Math.floor(Math.random() * replies.length)
    return replies[i]
}

module.exports = {
    getStupidReply: getStupidReply
};