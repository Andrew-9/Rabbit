const Discord = require("discord.js");

module.exports = {
 name: "flipcoin",
 aliases: [],
 description: "Flip a virtual coin",
 category: "Fun",
 usage: "flipcoin",
 run: async (client, message, args) => {
  try {
   const answers = ["Heads", "Tails"];
   const answer = answers[Math.floor(Math.random() * answers.length)];
   message.channel.startTyping();
   message.lineReply(`**🪙 I got:** **\`${answer}\`**`);
   message.channel.stopTyping();
  } catch (err) {
    message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
  }
 },
};
