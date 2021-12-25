const Discord = require("discord.js");
const { MessageButton } = require('discord-buttons');

module.exports = {
 name: "members",
 aliases: ["users"],
 description: "How many members are in the current server",
 category: "General",
 usage: "members",
 run: async (client, message, args) => {
  try {
    const members = message.guild.members.cache;
    const embed = new Discord.MessageEmbed()
    .setAuthor("TOTAL MEMBERS", message.guild.iconURL())
    .setColor("#00efff")
    .setThumbnail(message.guild.iconURL())
    .setDescription(`
    <:bluebullet:887635391866372106> **Members Count** - ${message.guild.memberCount}
    <:bluebullet:887635391866372106> **Online Members** - ${members.filter((member) => member.presence.status === "online").size}
    <:bluebullet:887635391866372106> **Idle Members** - ${members.filter((member) => member.presence.status === "idle").size}
    <:bluebullet:887635391866372106> **Do Not Disturb** - ${members.filter((member) => member.presence.status === "dnd").size}
    <:bluebullet:887635391866372106> **Offline Members** - ${members.filter((member) => member.presence.status === "offline").size}
    `)
    .setTimestamp()
    .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048}));
    message.channel.send(embed);
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
