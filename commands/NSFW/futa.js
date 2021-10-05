const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "futa",
 aliases: ["futanari"],
 description: "Display a random futa image/gif",
 category: "NSFW",
 usage: "futa",
 run: async (client, message, args) => {
  (async () => {
   try {
    if (!message.channel.nsfw) {
     const nsfwembed = new Discord.MessageEmbed()
     .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
     .setTimestamp()
     .setColor('#fa0808')
     .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif")
     .setDescription('**💢 Kaya.** This command is only allowed in **NSFW** channels.')
     .setFooter("Requested by " + `${message.author.username}`)
     return message.lineReply(nsfwembed);
    }
    message.channel.startTyping();
    const response = await fetch("https://nekos.life/api/v2/img/futanari");
    const body = await response.json();
    const embed = new Discord.MessageEmbed()
     .setTitle(
      ":smirk: Futa",
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter(
      "Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTimestamp()
     .setURL(body.url);
     message.channel.stopTyping();
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
  })();
 },
};
