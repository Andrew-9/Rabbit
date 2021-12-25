const Discord = require("discord.js");
const flip = require("flip-text");

module.exports = {
 name: "fliptext",
 aliases: [],
 description: "Flip some text",
 category: "Fun",
 usage: "fliptext <text>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply("<:xvector:869193619318382602> You must provide a text...");
   }
   const max = 50;
   if (args.lenght > max)
    return message.lineReply(`<:xvector:869193619318382602> The max lenght for text is \`${max}\` letters!`);
   var flipped = [];
   args.forEach((arg) => {
    flipped.push(flip(arg));
   });
   message.lineReply("↕️ **| Flipped text**", "```" + flipped.join(" ") + "```");
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
