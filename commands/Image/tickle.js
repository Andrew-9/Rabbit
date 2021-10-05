const Discord = require("discord.js");
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports = {
 name: "tickle",
 aliases: ["tic"],
 description: "Random tickle Images!",
 category: "Image",
 usage: "tickle",
 run: async (client, message, args) => {
  (async () => {
   try {
    message.channel.startTyping();
    if (message.mentions.members.size === 0) {
    async function no_ping() {
    const GIF = await neko.sfw.tickle();
    const embed = new Discord.MessageEmbed()
    .setTitle(`${message.author.username} tickled themselves 🤣`,
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
    no_ping();
   }
   if (message.mentions.members.size !== 0) {
    async function ping() {
        const member = message.mentions.members.first();
        const GIF = await neko.sfw.tickle();
        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} tickled ${member.user.username} 🤣🤣`,
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
    ping();
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
