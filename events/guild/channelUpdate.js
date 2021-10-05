const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");

module.exports = async (client, oldChannel, newChannel) => {
 try {
  let con = sql.query("SELECT enabled FROM logs WHERE guildId = ?;", channel.guild.id, function (err, result, fields) {
  if(result[0].enabled == 0) { 
  return;
  } else if (result[0].enabled == 1) {
  const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + newChannel.guild.id;
  sql.query(sqlquery, function (error, results, fields) {
   if (error) console.log(error);
   if (!results || results.length == 0) {
    return;
   }
   (async () => {
    const logsetup = await results[0].res;
    const log = await newChannel.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
    if (!oldChannel.guild) return;
    if (!newChannel.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (!log) return;
    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
    if (oldChannel.type === "text") {
     type = "Text";
    } else if (oldChannel.type === "voice") {
     type = "Voice";
    } else if (oldChannel.type === "category") {
     type = "Category";
    } else if (oldChannel.type === "news") {
     type = "News Feed";
    } else if (oldChannel.type === "store") {
     type = "Store channel";
    } else if (!oldChannel.type) {
     type = "?";
    }
    if (newChannel.type == "text") {
     channelping = `<#${newChannel.id}>`;
    } else {
     channelping = "```" + newChannel.name + "```";
    }
    const newcategory = newChannel.parent;
    if (!newcategory) {
     const newcategory = "None";
    }
    const oldcategory = oldChannel.parent;
    if (!oldcategory) {
     const oldcategory = "None";
    }
    if (oldcategory === newcategory) {
     const newcategory = "Not changed";
    }
    oldChannel.guild.fetchAuditLogs().then((logs) => {
     const userid = logs.entries.first().executor.id;
     const uavatar = logs.entries.first().executor.avatarURL();
     const guildsChannel = newChannel.guild;
    //  if (oldChannel.parent !== newChannel.parent) {
    //   const channelname = new Discord.MessageEmbed()
    //    .setAuthor(oldChannel.guild.name, oldChannel.guild.iconURL())
    //    .addField("Channel", channelping)
    //    .addField("Channel type", `${type}`)
    //    .addField("Old Channel category (parent)", `${oldcategory} (ID: ${newChannel.parentID})`)
    //    .addField("New Channel category (parent)", `${newcategory} (ID: ${newChannel.parentID})`)
    //    .addField("Changed by", `<@${userid}> (ID: ${userid})`)
    //    .setColor("RANDOM")
    //    .setTimestamp()
    //    .setFooter(`ID: ${newChannel.parentID}`);
    //   log.send(channelname);
    //  }
     if (oldChannel.name !== newChannel.name) {
      const channelname = new Discord.MessageEmbed()
       .setTitle("📝 Channel Name changed")
       .addFields(
        { name: '**Old Channel name**', value: `**${oldChannel.name}**`, inline: true},
        { name: '**New Channel name**', value: `${channelping}`, inline: true},
        { name: '**Changed by**', value: `<@${userid}>`, inline: true},
      )
       .setColor("#255fff")
       .setTimestamp()
       .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL());
      log.send(channelname);
     }
    });
   })();
  });
}
});
} catch (err) {
//console.log(err);
}
};
