const Discord = require("discord.js");

module.exports = {
 name: "boop",
 aliases: [],
 description: "Boop-Beep!",
 category: "Fun",
 usage: "boop",
 run: async (client, message, args) => {
 message.channel.startTyping();
  try {
   const embed = new Discord.MessageEmbed() // Prettier()
    .setColor("RANDOM")
    .setTitle("⏰ Beep!")
    message.channel.stopTyping();
   message.lineReply(embed);
  } catch (err) {
    message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
  }
 },
};
