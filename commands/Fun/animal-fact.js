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
      .setFooter(
       "Requested by " + `${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      )
      .setTitle(`✨ ${args.join(" ")} fact`)
      // .setImage(response.data.img)
      .setDescription(response.data.fact);
      message.channel.stopTyping();
     message.lineReply(embed);
    })
    .catch(() => {
     return message.lineReply({
      embed: {
       color: 16734039,
       description: "<:xvector:869193619318382602> | **Sorry, we don't have any facts for that animal**",
      },
     });
    });
  }  catch (err) {
    console.log(err);
    return message.lineReply("<:errorcode:868245243357712384> | **Oops Something went wrong...**");
  }
 },
};
