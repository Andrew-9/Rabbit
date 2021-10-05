const Discord = require("discord.js");
const config = require("../../config");

module.exports = {
 name: "request",
 aliases: ["feature-request"],
 description: "Request for new features for rabbit",
 category: "General",
 usage: "request <feature>",
 run: async (client, message, args) => {
  try {
   const request = args.join(" ");
   if (!request) {
    return message.lineReply("<:xvector:869193619318382602> **| You need to enter a request!**");
   }
   if (request.lenght > 1000) {
    return message.lineReply("<:xvector:869193619318382602> **| Your request can have a maximum of 1000 characters!**");
   }
   const channel = client.channels.cache.get(config.featurerequest);
   if (channel) {
    const embed = new Discord.MessageEmbed()
     .setAuthor(message.guild.name, message.guild.iconURL())
     .setTitle(`${message.author.username} requested for a feature.`)
     .setColor("#ff5a02")
     .setDescription(`**${request}**`)
     .setTimestamp()
     .addField("Requested By:", `<@${message.author.id}> (ID: ${message.author.id})`)
     .addField("User guild:", `**${message.guild.name} (ID: ${message.guild.id})**`)
     .setFooter(`feature requested by ${message.author.username}`,
      message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
     .setThumbnail(message.author.displayAvatarURL());
     channel.send(embed);
     const success = new Discord.MessageEmbed()
     .setAuthor("RABBIT FEATURE REQUEST", message.guild.iconURL())
     .setColor("#ff5a02")
     .setDescription(`
     **${message.author} Your request was sent
     You can view it at the support server in <#${config.featurerequest}> channel.**`)
     .setFooter(
      "Feature request for rabbit",
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.lineReply(success);
   } else {
    return message.lineReply("<:thinkingface:867897965380108288> **| Hmm I can't find the feature request channel.**");
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
