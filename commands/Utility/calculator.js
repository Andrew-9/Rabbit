const Discord = require("discord.js");

module.exports = {
 name: "calculator",
 aliases: ["math", "calc"],
 description: "Calculator",
 category: "Utility",
 usage: "calculator [--gui] [math task]",
 run: async (client, message, args) => {
  try {
   if (args.includes("--gui")) {
    try {
     const calc = require("../../utilities/calculator");
     await calc(message);
    } catch (err) {
    message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
    }
   } else {
    try {
     args.toString().replace("--gui", "");
     if (args.length < 1) {
      return message.lineReply("<:xvector:869193619318382602> **| You must provide a equation to be solved on the calculator! (eg. `9 + 10`)**");
     }
     const question = args.join(" ");
     const calc = new Discord.MessageEmbed()
      .setTitle("🔢 Calculator")
      .setColor("RANDOM")
      .addField("Question: ", `\`\`\`${question}\`\`\``)
      .addField("Answer: ", `\`\`\`${require("mathjs").evaluate(question)}\`\`\``)
      .setFooter(
       '✨ Tip: Type "' + process.env.PREFIX + ' calculator --gui" to run graphic calculator! | Requested by ' + `${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      );
     return message.lineReply(calc);
    } catch (err) {
    const Anerror = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
    .setDescription(`\`\`\`${err}\`\`\``)
    .setFooter("Error in code: Report this error to kotlin0427")
    .setTimestamp();
    return message.lineReply(Anerror);
    }
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
