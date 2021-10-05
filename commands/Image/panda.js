const axios = require("axios").default;
const Discord = require("discord.js");

module.exports = {
 name: "panda",
 aliases: [],
 description: "Sends a random panda image",
 category: "Fun",
 usage: "panda",
 run: async (client, message, args) => {
 message.channel.startTyping();
  try {
   const options = {
    method: "GET",
    url: "https://some-random-api.ml/img/panda",
   };
   axios.request(options).then((response) => {
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setFooter(
      "Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTitle("🐼 Panda")
     .setImage(response.data.link);
     message.channel.stopTyping();
    message.lineReply(embed);
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