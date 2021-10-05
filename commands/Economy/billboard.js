const Discord = require("discord.js");
const sql = require("../../utilities/database");

module.exports = {
  name: "billboard",
  aliases: ["bb"],
  description: "See list of the highest ranking members on the billboard.",
  category: "Economy",
  usage: "billboard",

  run: async (client, message, args) => {
   try {
    let b = sql.query("SELECT * FROM economy ORDER BY bank DESC LIMIT 30;", function (err, result, fields){
        if (Object.keys(result).length === 0) {
          const agive = new Discord.MessageEmbed()
          .setColor("#fb8c1b")
          .setTitle("<:xvector:869193619318382602> NO AMOUNTS YET!!")
          .setDescription(`**There are no current accounts on my system**`)
          .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
          .setTimestamp();
          return message.lineReply(agive);
        } else {
            let userString = "";
            Object.keys(result).forEach(function (key) {
            let row = result[key];
            let Bank = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(row.bank);
            let users = row.username + ': ' + Bank + '<:dollars:881559643820793917>';
            let userslead = users.split("\n");
            userString += `\n${userslead}`;
            });
            let billboard = new Discord.MessageEmbed()
            .setColor("#00dfff")
            .setTitle(':dart: TOP 30 RICHEST USERS')
            .setThumbnail(message.guild.iconURL())
            .setDescription(`
            ${userString}
            `)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL({ dynamic:true }));
            message.channel.send(billboard);
        }
      })
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