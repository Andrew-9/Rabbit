const Discord = require("discord.js");
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const config = require("../../config");

module.exports = {
 name: "hentaigif",
 aliases: [],
 description: "Random Hentai Gif Images/Gif!",
 category: "NSFW",
 usage: "hentaigif",
 run: async (client, message, args) => {
  (async () => {
   try {
    if (config.nsfw_channel_only == 'true') {
        if (!message.channel.nsfw) {
          let embed = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
          .setTimestamp()
          .setColor('#fa0808')
          .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif")
          .setDescription('**💢 Kaya.** This command is only allowed in **NSFW** channels.')
          .setFooter("Requested by " + `${message.author.username}`)
          message.channel.send(embed);
        }
      }
    if (message.channel.nsfw) {
    message.channel.startTyping();
    async function hentaigif() {
    const GIF = await neko.nsfw.randomHentaiGif();
    const embed = new Discord.MessageEmbed()
    .setTitle(`Random hentai gif just for you ${message.author.username}`,
        message.guild.iconURL({
         dynamic: true,
         format: "png",
        })
       )
       .setFooter(
        "Requested by " + `${message.author.username}`,
        message.author.displayAvatarURL({
         dynamic: true,
         format: "png",
         size: 2048,
        })
       )
    .setColor('#202225')
    .setImage(GIF.url)
    message.channel.stopTyping();
    message.lineReply(embed);
    }
    hentaigif();
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
  })();
 },
};
