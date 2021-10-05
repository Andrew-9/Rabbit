const Discord = require("discord.js");
const beautify = require("beautify");
const config = require("../../config");

module.exports = {
 name: "eval",
 aliases: [],
 description: "Evaluates and runs JavaScript code",
 category: "General",
 usage: "eval <code>",
 run: async (client, message, args) => {
  try {
   if (message.author.id !== config.ownerid) {
    const Nopermission8 = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
    .setDescription(`**Oops sorry. (Only my owner can run this)**`)
    .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
    .setTimestamp();
    return await message.channel.send(Nopermission8);
   } else {
    var result = args.join(" ");
    if (!result) {
     return message.lineReply("<:xvector:869193619318382602> **| Please input code to evaluate!**");
    }
    let evaluated = eval(result);
    console.log(result);
    const success = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle("💡 Eval")
     .setTimestamp()
     .addField(`Input:\n`, "```js\n" + `${args.join(" ")}` + "```", false)
     .addField(`Output:\n`, "```js\n" + evaluated + "```", true)
     .setFooter(
      "Requested by " + `${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
    message.lineReply(success);
   }
   
  } catch (err) {
   const errormessage = new Discord.MessageEmbed()
    .setColor("#e31212")
    .setTitle("<:thinkingface:867897965380108288> There's an error in the code")
    .setTimestamp()
    .addField(`Input:\n`, "```js\n" + `${result}` + "```", false)
    .addField(`Output:\n`, "```js\n" + `${err.message}` + "```", true)
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   return message.lineReply(errormessage);
  }
 },
};
