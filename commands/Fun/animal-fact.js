const axios = require("axios").default;
const Discord = require("discord.js");

module.exports = {
 name: "animal-fact",
 aliases: ["ani-fact"],
 description: "Shows a random fact about animal",
 category: "Fun",
 usage: "animal-fact",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply("<:xvector:869193619318382602> | **You must enter an animal name!**");
   }
   const options = {
    method: "GET",
    url: `https://some-random-api.ml/facts/${args.join(" ")}`,
   };
   axios
    .request(options)
    .then((response) => {
     message.channel.startTyping();
     const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`✨ ${args.join(" ")} fact`)
      // .setImage(response.data.img)
      .setDescription(response.data.fact);
      message.channel.stopTyping();
     message.lineReply(embed);
    })
    .catch(() => {
      return message.lineReply("<:xvector2:869193716575911966> Sorry, we don't have any\nfacts for that animal");
    });
  }  catch (err) {
    console.log(err);
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
