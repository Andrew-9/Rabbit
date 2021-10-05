const Discord = require("discord.js");

module.exports = {
 name: "eightball",
 aliases: ["8ball", "fortune"],
 description: "Tells you a fortune",
 category: "Fun",
 usage: "eightball <question>",
 run: async (client, message, args) => {
  try {
   if (!args.length)
    return message.lineReply("<:xvector:869193619318382602> **| You need to enter question :/**");
   const fortunes = ["**Yes.**", "**It is certain.**", "**It is decidedly so.**", "**Without a doubt.**", "**Yes definelty.**", "**You may rely on it.**", "**As I see it, yes.**", "**Most likely.**", "**Outlook good.**", "**Signs point to yes.**", "**Reply hazy, try again.**", "**Ask again later.**", "**Better not tell you now...**", "**Cannot predict now.**", "**Concentrate and ask again.**", "**Don't count on it.**", "**My reply is no.**", "**My sources say no.**", "**Outlook not so good...**", "**Very doubtful.**"];
   message.channel.startTyping();
   const embed = new Discord.MessageEmbed()
    .setDescription("🔮 **|** " + fortunes[Math.floor(Math.random() * fortunes.length)])
    .setColor("RANDOM")
    message.channel.stopTyping();
   await message.lineReply(embed);
  } catch (err) {
    message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
  }
 },
};
