const Discord = require("discord.js");
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = {
 name: "neko",
 aliases: [],
 description: "Random Neko Images!",
 category: "Image",
 usage: "neko",
 run: async (client, message, args) => {
  (async () => {
   try {
    message.channel.startTyping();
    async function nekof() {
    const GIF = await neko.sfw.neko();
    const embed = new Discord.MessageEmbed()
    .setAuthor(
        "See Neko!",
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
    .setDescription("**Click [here](" + GIF.url + ") to download the Neko!**")
    .setImage(GIF.url)
    message.channel.stopTyping();
    message.lineReply(embed);
    }
    nekof();
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
