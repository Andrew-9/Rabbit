const Discord = require("discord.js");
const rp = require("request-promise-native");

module.exports = {
 name: "boobs",
 aliases: [],
 description: "Display a random boobs image/gif",
 category: "NSFW",
 usage: "boobs",
 run: async (client, message, args) => {
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
  return rp
   .get("http://api.oboobs.ru/boobs/0/1/random")
   .then(JSON.parse)
   .then(function (res) {
    return rp.get({
     url: "http://media.oboobs.ru/" + res[0].preview,
     encoding: null,
    });
   })
   .then(function (res) {
    message.channel.startTyping();
    const embed = new Discord.MessageEmbed()
     .attachFiles([
      {
       attachment: res,
       name: "ass.png",
      },
     ])
     message.channel.stopTyping();
    message.channel.send(embed);
   })
   .catch((err) => {
    const Anerror = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
    .setDescription(`\`\`\`${err}\`\`\``)
    .setFooter("Error in code: Report this error to kotlin0427")
    .setTimestamp();
    return message.lineReply(Anerror);
   }
   );
 },
};
