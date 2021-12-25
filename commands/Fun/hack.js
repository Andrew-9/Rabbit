const Discord = require("discord.js");

module.exports = {
 name: "hack",
 aliases: [],
 description: "Hack a user",
 category: "Fun",
 usage: "hack <user>",
 run: async (client, message, args) => {
  try {
   const member = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase());
   if (!member) {
    return message.lineReply("<:xvector:869193619318382602> You must mention a vaild member");
   }
   message.channel.startTyping();
   let randomDelay = Math.floor(Math.random() * (6000 - 2000)) + 2000;
   let ip1 = Math.floor(Math.random() * 255);
   let ip2 = Math.floor(Math.random() * 255);
   let ip3 = Math.floor(Math.random() * 255);
   let ip4 = Math.floor(Math.random() * 255);
   let fails = ["I forgot what I was doing.", "Oops! Busted!", "Wait, what was I doing?", "Oof! That didn't work.", "Wait, what am I hacking again?", "**Oh no, I forgot how to hack!", `I don't think I can hack \`${member.user.username}\``, `\`${member.user.username}\` is unhackable`, `\`${member.user.username}\` got the biggest antivirus ever.`, "I blew the hack! Now the FBI is looking for me..."];
   let hacks = [`Found ${member.user.username}'s IP address: ${ip1}.${ip2}.${ip3}.${ip4} ||Jk||`, `${member.user.username}'s private data has been sold to the government.`, `\`${member.user.username}\` has been hacked and will get viruses on his computer forever!`, `${member.user.username}'s Fortnite dances have been uploaded to his boss's network!`, `${member.user.username} has to pay $${ip1} to get his data back.`, `Oh look, ${member.user.username} just lost all his money!`, `Hacked Success. ${member.user.username}'s data has been sold to facebook.`,];
   let chance = Math.random();
   if (chance >= 0.4) {
    message.channel.stopTyping();
    return message.lineReply("<:hackercat:868056384351113217> **Hacking " + member.user.username + "...**")
     .then((msg) => {
      setTimeout(function () {
       msg.edit({ embed: { color: 8118348, title: "<:hackercat:868056384351113217> I hacked " + member.user.username + "!", description: "<:checkvector:869193650184269834>`" + hacks[Math.floor(Math.random() * hacks.length)] + "`" } });
      }, randomDelay);
     })
     .catch(console.error);
   } else {
    message.channel.stopTyping();
    return message.lineReply("<:hackercat:868056384351113217> **Hacking " + member.user.username + "...**")
     .then((msg) => {
      setTimeout(function () {
       msg.edit({ embed: { color: 16734039, title: "<:hackercat:868056384351113217> **I can't hack** " + member.user.username + "**!**", description: "<:xvector:869193619318382602> `" + fails[Math.floor(Math.random() * fails.length)] + "`" } });
      }, randomDelay);
     });
   }
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
