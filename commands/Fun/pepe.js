const Discord = require("discord.js");

module.exports = {
 name: "pepe",
 aliases: ["pp"],
 description: "Show user PP size",
 category: "Fun",
 usage: "pepe <user>",
 run: async (client, message, args) => {
  message.channel.startTyping();
  try {
   const user = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.author;
   const pepe = "8" + "=".repeat(Math.floor(Math.random() * 15)) + "D";
   const embed = new Discord.MessageEmbed() // Prettier()
    .setTitle(
     `Pe-pe :stuck_out_tongue_winking_eye:`,
     message.author.displayAvatarURL({
      dynamic: true,
     })
    )
    .setDescription(`😳 | ${user}, you're pepe is **${pepe}** long!`)
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.stopTyping();
   message.lineReply(embed);
  } catch (err) {
   console.log(err);
   message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
  }
 },
};
