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
