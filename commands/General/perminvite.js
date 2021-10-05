const Discord = require("discord.js");
const embGen = require("../../utilities/embedGenerator");
const sql = require("../../utilities/database");

module.exports = {
 name: "perminvite",
 aliases: ["permanent-invite", "cpi"],
 description: "Use the bot to create a permanent invite link\nfor your server and the bot will DM it to you.",
 category: "General",
 usage: "perminvite",
 run: async (client, message, args) => {
  try {
    const user = message.author;
       const dUrl = "https://discord.gg/";
       const reason = args.join(" ");
       if (reason.length === 0) {
        const Nopermission8 = new Discord.MessageEmbed()
        .setColor("#f04949")
        .setTitle("<:xvector:869193619318382602> NO REASON PROVIDED!")
        .setDescription(`**Please provide a reason why you want\nMe to create a permanent invite link**`)
        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
        .setTimestamp();
        message.lineReply(Nopermission8);
       } else {
        const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + message.guild.id;
        sql.query(sqlquery, function (error, results, fields) {
         if (error) console.log(error);
         if (!results || results.length == 0) {
          return;
         }
         (async () => {
          const logsetup = await results[0].res;
          const log = await message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
          if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
          if (!log) return;
          if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
          message.guild.fetchAuditLogs().then((logs) => {
          const userid = logs.entries.first().executor.id;
          message.channel.createInvite({maxAge: 0,maxUses: 0,unique: true})
            .then((invite) => {
              message.lineReply(`<:winkingface_01:869178842957381734> **| Invite link created. Check your DM**`);
              const embedGen = new embGen();
              const permInvite = embedGen.generatepermInviteEmb(client,user,message,reason,dUrl,invite);
              message.author.send(permInvite);
              log.send(permInvite);
            })
          });
         })();
        });
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
