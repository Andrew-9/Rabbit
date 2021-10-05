const Discord = require("discord.js");

module.exports = {
 name: "iq",
 aliases: [],
 description: "Display a user IQ",
 category: "Fun",
 usage: "iq",
 run: async (client, message, args) => {
  message.channel.startTyping();
  try {
   const iq = Math.floor(Math.random() * 226);
   const embed = new Discord.MessageEmbed() // Prettier()
    .setTitle(":brain: IQ Test:")
    .setDescription(":bulb: " + message.author.username + " **IQ:** `" + iq + "`")
    .setColor(`RANDOM`)
   message.channel.stopTyping();
   message.lineReply(embed);
  } catch (err) {
    message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
  }
 },
};
