const Discord = require("discord.js");

module.exports = {
 name: "dice",
 aliases: [],
 description: "Roll a dice",
 category: "Fun",
 usage: "dice",
 run: async (client, message, args) => {
 message.channel.startTyping();
  try {
   const answers = ["1", "2", "3", "4", "5", "6"];
   const dice = answers[Math.floor(Math.random() * answers.length)];
   message.channel.stopTyping();
   message.lineReply("<:rabbitdice:869312215851884597> **| The dice rolled " + dice + "!**");
  } catch (err) {
    message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
  }
 },
};
