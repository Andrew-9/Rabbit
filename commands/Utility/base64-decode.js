const Discord = require("discord.js");

module.exports = {
 name: "base64-decode",
 aliases: ["b64-decode", "base-64-decode"],
 description: "Decode Base64 text to normal",
 category: "Utility",
 usage: "base64-decode <text>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply("<:xvector:869193619318382602> **| You must enter a text to decode!**");
   }
   if (!args[0].lenght > 50) {
    return message.lineReply("<:xvector:869193619318382602> **| You must enter a text shorer than 50 characters!**");
   }
   const buffer = new Buffer.from(args.join(" "), "base64");
   const base64 = buffer.toString("utf-8");
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
    .setTitle(`✨ Base64 Decoder`)
    .addField("📥 Text to decode", `\`\`\`${args.join(" ")}\`\`\``)
    .addField("📤 Decoded text", `\`\`\`${base64 || "An unknown error ocurred while decoding!"}\`\`\``);
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
 },
};
