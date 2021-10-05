const Discord = require("discord.js");
const emoji = require("discord-emoji-convert");

module.exports = {
 name: "emojify",
 aliases: [],
 description: "Convert text to emojis",
 category: "Utility",
 usage: "emojify (text)",
 run: async (client, message, args) => {
  try {
   const emojis = args.join(" ");
   if (!emojis) {
    return message.lineReply("<:xvector:869193619318382602> **| Please enter text to convert!**");
   }
   if (args.join(" ").lenght > 30) {
    return message.lineReply("<:xvector:869193619318382602> **| Please enter shorter string, maximum length is 30 characters!**");
   }
   const converted = emoji.convert(emojis);
   if (!converted) {
    return message.lineReply("<:xvector:869193619318382602> **| I cannot convert the text**");
   }
   message.channel.startTyping();
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Text To Emoji`)
    .addField("Converted text", converted)
    .addField("Converted text (Code)", "```" + converted.toString().substr(0, 1000) + "```")
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
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
