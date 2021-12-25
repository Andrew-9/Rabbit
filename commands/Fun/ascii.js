const Discord = require("discord.js");
const figlet = require("figlet");
const hastebin = require("hastebin");

module.exports = {
 name: "ascii",
 aliases: ["asciiart", "ascii-art"],
 category: "Fun",
 description: "Convert text to asci format",
 usage: "ascii <text>",
 run: async (client, message, args) => {
  try {
   var max = 1000;
   if (args.join(" ").length > max)
    return message.lineReply("<:xvector2:869193716575911966> The max length for ascii is " + `${max}` + "!");
   if (!args[0])
   return message.lineReply("<:xvector2:869193716575911966> Please enter a text to convert!");
   figlet(`${args.join(" ")}`, function (err, data) {
    if (err) {
      const Anerror = new Discord.MessageEmbed()
      .setColor("#e63064")
      .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
      .setDescription(`\`\`\`${err}\`\`\``)
      .setFooter("Error in code: Report this error to kotlin0427")
      .setTimestamp();
      return message.lineReply(Anerror);
    }
    hastebin
     .createPaste(
      data,
      {
       raw: true,
       contentType: "text/plain",
       server: "https://haste.zneix.eu/",
      },
      {}
     )
     .then(function (urlToPaste) {
      message.channel.startTyping();
      const embed = new Discord.MessageEmbed()
       .setColor("RANDOM")
       .setDescription("<:successful:868563013614043146> Ascii code generated successfully!\n:link: Link to ascii code paste: " + urlToPaste)
       message.channel.stopTyping();
      message.lineReply(embed);
     })
     .catch(function (requestError) {
      message.lineReply("<:xvector2:869193716575911966> Something went wrong while\nUploading ascii code to server");
     });
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
