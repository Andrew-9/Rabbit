const client = require("nekos.life");
const Discord = require("discord.js");
const neko = new client();

module.exports = {
 name: "cat-emoji",
 aliases: [],
 description: "Cats is cute",
 category: "Fun",
 usage: "cat-emoji",
 run: async (client, message, args) => {
 message.channel.startTyping();
  (async () => {
   try {
    let text = await neko.sfw.catText();
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(text.cat)
     message.channel.stopTyping();
    message.lineReply(embed);
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
