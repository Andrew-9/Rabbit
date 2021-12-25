const Discord = require("discord.js");
const config = require("../../config");
const child = require("child_process");
const { errors } = require("puppeteer");

module.exports = {
 name: "shell",
 aliases: ["cmd", "exec", "terminal"],
 description: "Shows informations only developers would understand.",
 category: "General",
 usage: "info",
 run: async (client, message, args) => {
  try {
  //  if (message.author.id !== config.ownerid) {
  //   const Nopermission8 = new Discord.MessageEmbed()
  //   .setColor("#f04949")
  //   .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
  //   .setDescription(`**Oops sorry. (Only my owner can run this)**`)
  //   .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
  //   .setTimestamp();
  //   return await message.channel.send(Nopermission8);
  //  }
   const command = args.join(" ");
   if (!command) {
    return message.lineReply("<:xvector:869193619318382602> **| Please input some string!**");
   }
   child.exec(command, (err, res) => {
    if (err)
     return message.lineReply({
      embed: {
       color: 16734039,
       title: "<:xvector:869193619318382602> Error!",
       description: `\`\`\`${err.toString().slice(0, 1000) || "Unknown error!"}\`\`\``,
      },
     });
    const embed = new Discord.MessageEmbed() // Prettier
     .setColor("RANDOM")
     .setTitle("📝 Command Prompt Shell")
     .addField("📤 Request", "```" + command + "```")
     .addField("📥 Server response", `\`\`\`${res.slice(0, 1000) || "No response!"}\`\`\``);
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
