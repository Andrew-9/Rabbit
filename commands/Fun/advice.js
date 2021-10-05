/**
 * Get a random advice
 * @module advice
 *
 */
const Discord = require("discord.js");
const Random = require("srod-v2");

module.exports = {
 name: "advice",
 aliases: [],
 description: "Get a random advice",
 category: "Fun",
 usage: "advice",
 run: async (client, message, args) => {
    message.channel.startTyping();
  try {
   const Data = await Random.GetAdvice();
   message.channel.stopTyping();
   return message.lineReply(Data);
  }  catch (err) {
    console.log(err);
    return message.lineReply("<:errorcode:868245243357712384> | **Oops Something went wrong...**");
  }
 },
};
