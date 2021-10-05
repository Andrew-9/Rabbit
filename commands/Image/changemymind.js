const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
 name: "changemymind",
 aliases: [],
 description: "Try to change my mind!",
 category: "Image",
 usage: "changemymind (text)",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply("<:xvector:869193619318382602> **| Please enter a text!**");
   }
   if (args.join(" ") > 20) {
    return message.lineReply("<:xvector:869193619318382602> **| Max lenght for the text is 20!**");
   }
   const wait = await message.lineReply("✨ **Generating Image.**");
   message.channel.startTyping();
   const changemymind = await canvacord.Canvas.changemymind(args.join(" "));
   const attachment = new Discord.MessageAttachment(changemymind, "changemymind.png");
   message.channel.stopTyping();
   return message.channel.send(attachment);
  } catch (err) {
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
