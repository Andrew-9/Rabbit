const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "cat",
 aliases: [],
 description: "Sends a random cat photo",
 category: "Image",
 usage: "cat",
 run: async (client, message, args) => {
    message.channel.startTyping();
  (async () => {
   try {
    const response = await fetch("https://nekos.life/api/v2/img/meow");
    const body = await response.json();
    const embed = new Discord.MessageEmbed()
     .setTitle("😸 Random Cat")
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter(" • (Aww cute =＾´• ⋏ •`＾=)", message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048,}))
     .setTimestamp()
     .setURL(body.url);
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
