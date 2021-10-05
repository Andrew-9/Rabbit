const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
 name: "ohno",
 aliases: [],
 description: "Oh no! It's stupid!",
 category: "Image",
 usage: "ohno (text)",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply("<:xvector:869193619318382602> **| You must enter a text!**");
   }
   if (args.join(" ") > 20) {
    return message.lineReply("<:xvector:869193619318382602> **| Max lenght for the text is 20!**");
   }
   const wait = await message.lineReply("✨ **Generating Image.**");
   const ohno = await canvacord.Canvas.ohno(args.join(" "));
   const attachment = new Discord.MessageAttachment(ohno, "ohno.png");
   message.channel.send(attachment);
   wait.delete({
    timeout: 5000,
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
