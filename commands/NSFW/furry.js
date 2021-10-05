const Discord = require("discord.js");
const booru = require("booru");

module.exports = {
 name: "furry",
 aliases: [],
 description: "Search internet for your furry!",
 category: "NSFW",
 usage: "furry",
 run: async (client, message, args) => {
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
   const query = message.content.split(/\s+/g).slice(1).join(" ");
   if (!query) {
    return message.channel.send("<:xvector:869193619318382602> **| You must enter a text to search for furry!**");
   }
   booru
    .search("e6", [query], {
     nsfw: true,
     limit: 1,
     random: true,
    })
    .then((images) => {
    message.channel.startTyping();
     for (let image of images) {
      const embed = new Discord.MessageEmbed()
       .setTitle(":smirk: Furry")
       .setImage(image.fileUrl)
       .setColor("RANDOM")
       .setFooter(
        "Requested by " + `${message.author.username}`,
        message.author.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        })
       )
       .setURL(image.fileUrl);
       message.channel.stopTyping();
      return message.channel.send({
       embed,
      });
     }
    })
    .catch((err) => {
     if (err.name === "booruError") {
      return message.channel.send(`<:xvector:869193619318382602> **| No results found for: ${query}**`);
     } else {
      return message.channel.send(`<:xvector:869193619318382602> **| No results found for: ${query}**`);
     }
    });
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
