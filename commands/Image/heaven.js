const Discord = require("discord.js");

module.exports = {
 name: "heaven",
 aliases: ["hvn"],
 description: "Returns a heaven image",
 category: "Image",
 usage: "heaven [user mention, user id, user name]",
 run: async (client, message, args) => {
  try {
   const hmember = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   const wait = await message.lineReply("✨ **Generating Image.**");
   const embed = new Discord.MessageEmbed() // Prettier()
    .setColor("RANDOM")
    .setImage(
     encodeURI(
      `https://vacefron.nl/api/heaven?user=${hmember.user.displayAvatarURL({
       format: "png",
      })}`
     )
    )
    .setTimestamp();
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
