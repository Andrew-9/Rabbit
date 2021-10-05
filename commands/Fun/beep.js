const Discord = require("discord.js");

module.exports = {
 name: "beep",
 aliases: [],
 description: "Beep-Boop!",
 category: "Fun",
 usage: "beep",
 run: async (client, message, args) => {
 message.channel.startTyping();
  try {
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("⏰ Boop!")
    message.channel.stopTyping();
   message.lineReply(embed);
  } catch (err) {
    message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
  }
 },
};
