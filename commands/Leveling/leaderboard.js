const Discord = require("discord.js");
const { MessageButton } = require('discord-buttons');
const sql = require("../../utilities/database");

module.exports = {
  name: "leaderboard",
  aliases: ["top", "lb"],
  description: "Displays of the highest ranking members",
  category: "Leveling",
  usage: "leaderboard",
  run: async (client, message, args) => {
    try {
      let con = sql.query("SELECT `enabled` FROM `ranking` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
      let isEnabled = result[0].enabled
      if (isEnabled == 0) {
      const RankNotEnabled = new Discord.MessageEmbed()
      .setColor("#e63064")
      .setTitle("<:xvector:869193619318382602> RANKING SYSTEM NOT ENABLED")
      .setDescription(`*The ranking system of this server is not **enabled**\nContact the admins of the server to enable it.*`)
      .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
      .setTimestamp();
      return message.lineReply(RankNotEnabled);  
      } else if (isEnabled == 1) { 
      function leaderboardembed() {
        const filtered = client.points.filter(p => p.guild === message.guild.id).array();
        let orilent;
        const sorted = filtered.sort((a, b) => b.level - a.level || b.points - a.points);
        let embeds = [];
        let j = 0;
        let maxnum = 100;
        orilent = sorted.length;
        if(isNaN(maxnum)) { maxnum = 100; }
        if (maxnum > sorted.length) 
        maxnum = sorted.length + (10 - Number(String(sorted.length/10).slice(2)));
        if(maxnum < 6) maxnum = 6;
        for (let i = 6; i <= maxnum; i += 6) {
            const top = sorted.splice(0, 6);
            const embed = new Discord.MessageEmbed()
            .setTitle(`${message.guild.name} | leaderboard`)
            .setTimestamp()
            .setThumbnail(message.guild.iconURL())
            .setDescription(`Top **${i<orilent?i:orilent}/${orilent}** Ranking:`)
            .setColor("#ff8100")
            .setFooter(message.author.tag, message.author.avatarURL({ dynamic:true }));
            for (const data of top) {
                j++;
                try {
                    embed.addField(`**${j}**. **${data.usertag}**`, `Points: \`${data.points.toFixed(2)}\` / \`${data.neededpoints}\` | Level: **${data.level}**`);
                } catch {
                    embed.addField(`**${j}**. **${data.usertag}**`, `Points: \`${data.points.toFixed(2)}\` / \`${data.neededpoints}\` | Level: **${data.level}**`);
                }
            }
            embeds.push(embed);
        }
        return embeds;
    }
    async function leaderboard() {
        let currentPage = 0;
        const embeds = leaderboardembed();
        if(embeds.length == 1){
            return message.channel.send(embeds[0]);
        }

        let backtbutton = new MessageButton().setStyle("blurple").setID("backward").setLabel("⏪ Back")
        let forwardbutton = new MessageButton().setStyle("blurple").setID("forward").setLabel("⏩ Forward")
        let linkbutton = new MessageButton().setStyle("url").setLabel("FUMIGRAM").setURL("https://fumigram.com")

        var buttonarray = [backtbutton, forwardbutton, linkbutton]

        const lbembed = await message.channel.send({ embed: embeds[currentPage], buttons: buttonarray });

        const collector = lbembed.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 90000});
        collector.on("collect", (b) => {
            b.reply.defer()
             if(b.id == "backward"){
                if(currentPage !== 0){
                    --currentPage;
                    lbembed.edit({ embed: embeds[currentPage], buttons: buttonarray });
                } else {
                    currentPage = lbembed.length -1;
                    lbembed.edit({ embed: embeds[currentPage], buttons: buttonarray });
                }
            } else if(b.id == "forward"){
                if(currentPage < embeds.length - 1){
                    currentPage++;
                    lbembed.edit({ embed: embeds[currentPage], buttons: buttonarray });
                } else {
                    currentPage = 0;
                    lbembed.edit({ embed: embeds[currentPage], buttons: buttonarray });
                }
            }
        })
    }  
    leaderboard();
    }
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