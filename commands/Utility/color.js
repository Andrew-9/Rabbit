const pop = require("popcat-wrapper");
const Discord = require("discord.js");

module.exports = {
 name: "color",
 aliases: ["colors"],
 description: "Shows color info",
 category: "Utility",
 usage: "color <hex color>",
 run: async (client, message, args) => {
  try {
   let color = args[0];
   if (!color) {
    return message.lineReply("<:xvector:869193619318382602> **| Please provide a HEX color code!**");
   }
   if (color.includes("#")) {
    color = color.split("#")[1];
   }
   try {
    const info = await pop.colorinfo(color);
    const embed = new Discord.MessageEmbed()
     .setTitle("Color Information")
     .addField("Name", "`" + info.name + "`", true)
     .addField("Hex", "`" + info.hex + "`", true)
     .addField("RGB", "`" + info.rgb + "`", true)
     .addField("Brighter Shade", "`" + info.brightened + "`", true)
     .setImage(info.color_image)
     .setColor(info.hex);
    message.lineReply(embed);
   } catch (err) {
    message.lineReply("<:xvector:869193619318382602> **| Please provide a vaild HEX color code!**");
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
 },
};
