const Discord = require("discord.js");

module.exports = {
 name: "snipe",
 aliases: [],
 description: "Snipe a deleted message",
 category: "Utility",
 usage: "snipe",
 run: async (client, message, args) => {
  try {
   const msg = client.snipes.get(message.channel.id);
   if (!msg) {
    return message.lineReply("<:xvector:869193619318382602> **| There is nothing to snipe :(**");
   }
   const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author, msg.member.user.displayAvatarURL())
    .setDescription("```" + msg.content + "```")
    .setFooter(`The message got sniped by Rabbit!`, message.author.displayAvatarURL())
    .setTimestamp()
    .setColor("RANDOM");
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
