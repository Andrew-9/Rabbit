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
    const Anerror = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
    .setDescription(`\`\`\`${err}\`\`\``)
    .setFooter("Error in code: Report this error to kotlin0427")
    .setTimestamp();
    return message.lineReply(Anerror);
  }
 },
};
