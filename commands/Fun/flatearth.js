const Discord = require("discord.js");

module.exports = {
 name: "flatearth",
 aliases: [],
 description: "Demonstrates that the earth really is flat",
 category: "Fun",
 usage: "flatearth",
 run: async (client, message, args) => {
  try {
   message.channel.startTyping();
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("🌍 If the earth isn't flat, then explain this")
    .setImage("https://media1.tenor.com/images/462b6d76beee0f9501d20535dae9c00b/tenor.gif?itemid=13792633")
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
