const Discord = require("discord.js");
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = {
 name: "wallpaper",
 aliases: ["wall", "paper"],
 description: "Random Wallpaper Images!",
 category: "Image",
 usage: "wallpaper",
 run: async (client, message, args) => {
  (async () => {
   try {
    message.channel.startTyping();
    async function wallpaper() {
    const GIF = await neko.sfw.wallpaper();
    const embed = new Discord.MessageEmbed()
    .setTitle(`Try this wallpaper ${message.author.username}`)
    .setFooter("Requested by " + `${message.author.username}`,
    message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048}))
    .setColor('#202225')
    .setImage(GIF.url)
    message.channel.stopTyping();
    message.lineReply(embed);
    }
    wallpaper();
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
