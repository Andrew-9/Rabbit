const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");

module.exports = async (client, oldGuild, newGuild) => {
 try {
  let con = sql.query("SELECT enabled FROM logs WHERE guildId = ?;", newGuild.id, function (err, result, fields) {
  if(result[0].enabled == 0) { 
  return;
  } else if (result[0].enabled == 1) {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + newGuild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    const logsetup = await results[0].res;
    const log = await newGuild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
    if (!newGuild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (!log) return;
    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (oldGuild.name != newGuild.name) {
     const embed = new Discord.MessageEmbed() // Prettier()
      .setAuthor("Guild name changed", newGuild.iconURL())
      .setColor("#0066ff")
      .addField("Old guild name", `\`\`\`${oldGuild.name}\`\`\``)
      .addField("New guild name", `\`\`\`${newGuild.name}\`\`\``)
      .setTimestamp()
      .setFooter(newGuild.name, newGuild.iconURL());
     await log.send(embed);
    }
    if (oldGuild.owner != newGuild.owner) {
     const embed = new Discord.MessageEmbed() // Prettier()
      .setAuthor("Guild owner changed", newGuild.iconURL())
      .setColor("#0066ff")
      .addField("Old guild owner", `<@${oldGuild.owner}>`)
      .addField("New guild owner", `<@${newGuild.owner}>`)
      .setTimestamp()
      .setFooter(newGuild.name, newGuild.iconURL());
     await log.send(embed);
    }
    if (oldGuild.preferredLocale != newGuild.preferredLocale) {
     const embed = new Discord.MessageEmbed() // Prettier()
      .setAuthor("Guild preferred locale changed", newGuild.iconURL())
      .setColor("#0066ff")
      .addField("Old preferred locale", `\`\`\`${oldGuild.preferredLocale}\`\`\``)
      .addField("New preferred locale", `\`\`\`${newGuild.preferredLocale}\`\`\``)
      .setTimestamp()
      .setFooter(newGuild.name, newGuild.iconURL());
     log.send(embed);
    }
    if (oldGuild.publicUpdatesChannelID != newGuild.publicUpdatesChannelID) {
     const embed = new Discord.MessageEmbed() // Prettier()
      .setAuthor("Guild public channel changed for updates", newGuild.iconURL())
      .setColor("##0066ff")
      .addField("Old public channel for updates", `<#${oldGuild.publicUpdatesChannelID}>`)
      .addField("New public channel for updates", `<#${newGuild.publicUpdatesChannelID}>`)
      .setTimestamp()
      .setFooter(newGuild.name, newGuild.iconURL());
     await log.send(embed);
    }
    if (oldGuild.rulesChannelID != newGuild.rulesChannelID) {
     const embed = new Discord.MessageEmbed() // Prettier()
      .setAuthor("Guild rules channel changed", newGuild.iconURL())
      .setColor("#0066ff")
      .addField("Old rules channel", `<#${oldGuild.rulesChannelID}>`)
      .addField("New rules channel", `<#${newGuild.rulesChannelID}>`)
      .setTimestamp()
      .setFooter(newGuild.name, newGuild.iconURL());
     await log.send(embed);
    }
    if (oldGuild.systemChannelID != newGuild.systemChannelID) {
     const embed = new Discord.MessageEmbed() // Prettier()
      .setAuthor("Guild system channel changed", newGuild.iconURL())
      .setColor("#0066ff")
      .addField("Old system channel", `<#${oldGuild.systemChannelID}>`)
      .addField("New system channel", `<#${newGuild.systemChannelID}>`)
      .setTimestamp()
      .setFooter(newGuild.name, newGuild.iconURL());
     await log.send(embed);
    }
    if (oldGuild.verificationLevel != newGuild.verificationLevel) {
     const embed = new Discord.MessageEmbed() // Prettier()
      .setAuthor("Guild verification level changed", newGuild.iconURL())
      .setColor("#0066ff")
      .addField("Old verification level", `\`\`\`${oldGuild.verificationLevel}\`\`\``)
      .addField("New verification level", `\`\`\`${newGuild.verificationLevel}\`\`\``)
      .setTimestamp()
      .setFooter(newGuild.name, newGuild.iconURL());
     await log.send(embed);
    }
    if (oldGuild.widgetEnabled != newGuild.widgetEnabled) {
     const embed = new Discord.MessageEmbed() // Prettier()
      .setAuthor("Guild widget update", newGuild.iconURL())
      .setColor("RANDOM")
      .addField("Old widget channel", `\`\`\`${oldGuild.widgetEnabled}\`\`\``)
      .addField("New widget channel", `\`\`\`${newGuild.widgetEnabled}\`\`\``)
      .setTimestamp()
      .setFooter(newGuild.name, newGuild.iconURL());
     await log.send(embed);
    }
    if (oldGuild.widgetChannelID != newGuild.widgetChannelID) {
     const embed = new Discord.MessageEmbed() // Prettier()
      .setAuthor("Guild widget channel changed", newGuild.iconURL())
      .setColor("RANDOM")
      .addField("Old widget channel", `<#${oldGuild.widgetChannelID}>`)
      .addField("New widget channel", `<#${newGuild.widgetChannelID}>`)
      .setTimestamp()
      .setFooter(newGuild.name, newGuild.iconURL());
     await log.send(embed);
    }
   })();
});
}
});
} catch (err) {
// console.log(err);
}
};
