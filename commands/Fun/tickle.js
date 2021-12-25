const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "tickle",
 aliases: [],
 description: "Tickle a user",
 category: "Fun",
 usage: "tickle <user>",
 run: async (client, message, args) => {
  try {
   const member = (await await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   if (!member) {
    return message.lineReply("<:xvector:869193619318382602> **| Mention a valid member of this server!**");
   }
   if (message.author === member || message.member == member) {
    return await message.lineReply("<:xvector:869193619318382602> **| You cant tickle yourself!**");
   }
   (async () => {
    message.channel.startTyping();
    const response = await fetch("https://nekos.life/api/v2/img/tickle");
    const body = await response.json();
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(member.username + " just got tickled by " + message.author.username)
     .setFooter(
      "._. | Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setImage(body.url);
     message.channel.stopTyping();
    message.lineReply(embed);
   })();
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
