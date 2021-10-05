const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
 name: "suggest",
 aliases: [],
 description: "Suggest a feature for the bot development",
 category: "General",
 usage: "suggest <suggestion>",
 run: async (client, message, args) => {
  try {
   const suggestion = args.join(" ");
   if (!suggestion) {
    return message.lineReply("<:xvector:869193619318382602> **| You need to enter a suggestion!**");
   }
   if (suggestion.lenght > 1000) {
    return message.lineReply("<:xvector:869193619318382602> **| Your suggestion can have a maximum of 1000 characters!**");
   }
   const channel = client.channels.cache.get(config.suggestionschannel);
   if (channel) {
    const embed = new Discord.MessageEmbed()
     .setAuthor(`${message.author.username.toUpperCase()}'s SUGGESSTION!`, message.guild.iconURL())
     .setColor("RANDOM")
     .setDescription(`**${suggestion}**`)
     .addField("Reporter:", `<@${message.author.id}> (ID: ${message.author.id})`)
     .addField("User guild:", `**${message.guild.name} (ID: ${message.guild.id})**`)
     .setFooter(`${message.author.username} posted a suggesstion for Rabbit.`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
     .setThumbnail(message.author.displayAvatarURL());
     channel.send(embed);
     const success = new Discord.MessageEmbed()
     .setAuthor("SUGGESSTION SENT", message.guild.iconURL())
     .setColor("RANDOM")
     .setDescription(`**${message.author} your suggestion was sent \n You can view it at Rabbit support server in <#${config.suggestionschannel}> channel.**`)
     .setFooter("Thanks for suggesting this", message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }));
    message.lineReply(success);
   } else {
    return message.lineReply("<:thinkingface:867897965380108288> **| Hmm I can't find suggestions channel.**");
   }
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
