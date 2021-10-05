const Discord = require("discord.js");
const chalk = require("chalk");
const config = require("../../config");
const { botstatus } = require('../../config');
const gradient = require("gradient-string");
const sql = require("../../utilities/database");
const { Intents } = require('discord.js');
const canvacord = require("canvacord")
const intents = new Intents();
intents.add([
  'GUILDS',
  'GUILD_MEMBERS',
  'GUILD_BANS',
  'GUILD_EMOJIS',
  'GUILD_WEBHOOKS',
  'GUILD_VOICE_STATES',
  'GUILD_MESSAGES',
  'GUILD_MESSAGE_REACTIONS',
  'DIRECT_MESSAGES',
  'DIRECT_MESSAGE_REACTIONS'
]);

module.exports = (client, guild, member) => {
 try {
  function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
  }
  if(botstatus.enabled === true) {
    if(botstatus.activity_type.toUpperCase() == 'STREAMING') {
        client.user.setPresence({activity: {name: botstatus.activity_text, type: botstatus.activity_type.toUpperCase(), url: botstatus.activity_url}, status: botstatus.status.toLowerCase() || 'idle'});
    } else {
        client.user.setPresence({activity: {name: botstatus.activity_text, type: botstatus.activity_type.toUpperCase()}, status: botstatus.status.toLowerCase() || 'idle'});
    };
};

  const datelog = new Date();
  currentDate = datelog.getDate();
  month = datelog.getMonth() + 1;
  year = datelog.getFullYear();
  hour = datelog.getHours();
  min = datelog.getMinutes();
  sec = datelog.getSeconds();
  console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.bold.cyan(" Generated at: " + chalk.blue.bold.underline(currentDate + "/" + month + "/" + year + " | " + hour + ":" + min + "." + sec)));
  console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.bold.cyan(" Client connected! Logged to Discord as ") + chalk.bold.blue.underline(client.user.tag) + chalk.bold.cyan(" (ID: ") + chalk.bold.blue.underline(client.user.id) + chalk.bold.cyan(")!"));
  /* Status Webhook */
  if (!process.env.STATUS_WEBHOOK_ID) throw new Error("[HOST] You need to provide Discord Status Webhook ID in .env - STATUS_WEBHOOK_ID=YOUR_WEBHOOK_ID");
  if (!process.env.STATUS_WEBHOOK_TOKEN) throw new Error("[HOST] You need to provide Discord Status Webhook Token in .env - STATUS_WEBHOOK_TOKEN=YOUR_WEBHOOK_TOKEN");
  const statuswebhook = new Discord.WebhookClient(process.env.STATUS_WEBHOOK_ID, process.env.STATUS_WEBHOOK_TOKEN);
  const status = new Discord.MessageEmbed()
  .setColor("#0096ff")
  .setThumbnail(client.user.displayAvatarURL())
  .setDescription(`**${capitalizeFirstLetter(client.user.username)} is now online!\nServing in ${client.guilds.cache.size} Guilds\nWith ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members\nLogged at: ${datelog}**`);
  statuswebhook.send({
  username: capitalizeFirstLetter(client.user.username) + " Status",
  avatarURL: client.user.displayAvatarURL(),
  embeds: [status],
  });

  /* Slash command */
  client.ws.on("INTERACTION_CREATE", async (interaction) => {
   try {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;
    if (command == "Rabbit") {
     const embed = new Discord.MessageEmbed()
      .setDescription(`Hello, ${client.user.username} unfortunately **I do not support slash commands for now**.`)
      .setAuthor(`Hi ${interaction.member.user.username}! I'm ${client.user.username}`,client.user.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
      .setColor("RANDOM")
      .addField("**You can join my support server**", config.server)
      .addField("**Invite me**", `[Click this link to invite me!](https://discord.com/oauth2/authorize/?permissions=${config.permissions}&scope=${config.scopes}&client_id=${client.user.id}) **__[Recomended!]__**\n**Or** [click this link to invite me __as root__](https://discord.com/oauth2/authorize/?permissions=8&scope=${config.scopes}&client_id=${client.user.id}) [Not recomended!]`)
      .setFooter("Requested by: " + interaction.member.user.username,client.user.displayAvatarURL({dynamic: true,format: "png",size: 2048,}));
      client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
       type: 4,
       data: await createAPIMessage(interaction, embed),
      },
     });
    }
   } catch (err) {
    return;
   }
  });
  

  client.on("guildMemberAdd", member => {
    try {  
      let con = sql.query("SELECT enabled FROM logs WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
      if(result[0].enabled == 0) { 
      return;
      } else if (result[0].enabled == 1) {
      const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + member.guild.id;
      sql.query(sqlquery, function (error, results, fields) {
       if (error) console.log(error);if (!results || results.length == 0) {return;}
       (async () => {
        const logsetup = await results[0].res;
        const log = await member.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
        if (!member.guild) return;
        if (!member.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        if (!log) return;
        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
         member.guild.fetchAuditLogs().then((logs) => {
         const newmember = new Discord.MessageEmbed()
         .setAuthor(member.user.tag, member.user.displayAvatarURL())
         .setDescription(`:inbox_tray: <@${member.user.id}> **Joined the server**`)
         .addField("**Account creation**\n", `${new Date(member.user.createdTimestamp).toDateString()}`)
         .setColor("#1ccf00")
         .setThumbnail(member.user.displayAvatarURL())
         .setTimestamp()
         .setFooter(member.guild.name, member.guild.iconURL());
         log.send(newmember);
        });
       })();
      });
    }
  });
  } catch (err) {
  // console.log(err);
  }
})

client.on("guildMemberRemove", member => {
  try {  
    let con = sql.query("SELECT enabled FROM logs WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
    if(result[0].enabled == 0) { 
    return;
    } else if (result[0].enabled == 1) {
    const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + member.guild.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) console.log(error);if (!results || results.length == 0) {return;}
     (async () => {
      const logsetup = await results[0].res;
      const log = await member.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!member.guild) return;
      if (!member.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
       member.guild.fetchAuditLogs().then((logs) => {
       const newmember = new Discord.MessageEmbed()
       .setAuthor(member.user.tag, member.user.displayAvatarURL())
       .setDescription(`:outbox_tray: <@${member.user.id}> **Left the server**`)
       .addField("**Thanks for joining us**", "We hope to see you again")
       .setColor("#d34242")
       .setThumbnail(member.user.displayAvatarURL())
       .setTimestamp()
       .setFooter(member.guild.name, member.guild.iconURL());
       log.send(newmember);
      });
     })();
    });
  }
});
} catch (err) {
// console.log(err);
}
})

client.on("guildMemberAdd", member => {
  try {  
    let con = sql.query("SELECT CustomEnabled FROM welcome WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
    if(result[0].CustomEnabled == 0) { 
    return;
    } else if (result[0].CustomEnabled == 1) {
    const sqlquery = "SELECT CustonChannelid AS res FROM welcome WHERE guildid = " + member.guild.id;
    sql.query(sqlquery, function (error, results, fields) {
     if (error) console.log(error);if (!results || results.length == 0) {return;}
     (async () => {
      const logsetup = await results[0].res;
      const log = await member.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!member.guild) return;
      if (!member.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
       member.guild.fetchAuditLogs().then((logs) => {
        let con = sql.query("SELECT embedEnable FROM welcome WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
          let isEmbedEnabled = result[0].embedEnable
          if(isEmbedEnabled == 0) { 
            let select = sql.query("SELECT background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox FROM welcome WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
              const BorderColor = `${result[0].border}`;
              const UsernameColor = `${result[0].usernameBox}`;
              const DiscriminatorColor = `${result[0].discriminatorBox}`;
              const messageColor = `${result[0].messageBox}`;
              const titleColor = `${result[0].titleBox}`;
              const avatarColor = `${result[0].avatarBox}`;
              (async () => {
              let avatar = member.user.displayAvatarURL({format: "png"});
              let username = member.user.username
              let hash = member.user.discriminator;
              let membercount = member.guild.memberCount;
              let Servername = member.guild.name;
              const backgroundImage = `${result[0].background}`;
              const WelcomeCard = new canvacord.Welcomer()
              .setUsername(username)
              .setDiscriminator(hash)
              .setMemberCount(membercount)
              .setGuildName(Servername)
              .setAvatar(avatar)
              .setColor("border", `${BorderColor}`)
              .setColor("username-box", `${UsernameColor}`)
              .setColor("discriminator-box", `${DiscriminatorColor}`)
              .setColor("message-box", `${messageColor}`)
              .setColor("title", `${titleColor}`)
              .setColor("avatar", `${avatarColor}`)
              .setBackground(`${backgroundImage}`)
              let attachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
              log.send(`<@${member.user.id}>\n${client.settings.get(member.guild.id, "welcomeMsg")}`, attachment);
            })();
            });
          } else if (isEmbedEnabled == 1) {
            let select = sql.query("SELECT background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox FROM welcome WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
              const BorderColor = `${result[0].border}`;
              const UsernameColor = `${result[0].usernameBox}`;
              const DiscriminatorColor = `${result[0].discriminatorBox}`;
              const messageColor = `${result[0].messageBox}`;
              const titleColor = `${result[0].titleBox}`;
              const avatarColor = `${result[0].avatarBox}`;
              (async () => {
              let avatar = member.user.displayAvatarURL({format: "png"});
              let username = member.user.username
              let hash = member.user.discriminator;
              let membercount = member.guild.memberCount;
              let Servername = member.guild.name;
              const backgroundImage = `${result[0].background}`;
              const WelcomeCard = new canvacord.Welcomer()
              .setUsername(username)
              .setDiscriminator(hash)
              .setMemberCount(membercount)
              .setGuildName(Servername)
              .setAvatar(avatar)
              .setColor("border", `${BorderColor}`)
              .setColor("username-box", `${UsernameColor}`)
              .setColor("discriminator-box", `${DiscriminatorColor}`)
              .setColor("message-box", `${messageColor}`)
              .setColor("title", `${titleColor}`)
              .setColor("avatar", `${avatarColor}`)
              .setBackground(`${backgroundImage}`)
              let attachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
              let con6 = sql.query("SELECT embedColor FROM welcome WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
              let EmbedWelcomeMsgColor = result[0].embedColor
              let setupembed = new Discord.MessageEmbed()
              .setColor(`${EmbedWelcomeMsgColor}`)
              .setTitle(member.user.tag.toUpperCase())
              .setDescription(client.settings.get(member.guild.id, "welcomeMsg"))
              .setFooter(member.user.tag, member.guild.iconURL())
              .attachFiles(attachment)
              .setImage("attachment://welcome-image.png")
              .setTimestamp()
              log.send(`<@${member.user.id}>`, setupembed);
            })
            })();
            });
          }       
        });
      });
      // const sqlquery = "SELECT role FROM welcome WHERE guildid = " + member.guild.id;
      // sql.query(sqlquery, function (error, results, fields) { 
      //   if (error) console.log(error);
      //   let roles = results[0].role
      //   if(roles.length >= 1){
      //     for(let i = 0; i < roles.length; i++){
      //       try{
      //         let grat = member.guild.roles.cache.get(roles[i])
      //          member.roles.add(grat.id);
      //       }catch (e){
      //         console.log(e.stack.toString())
      //       }
      //     }
      //   }
      // });
     })();
    });
  }
});
} catch (err) {
// console.log(err);
};
});

client.on("guildMemberRemove", member => {
  try {  
    let con = sql.query("SELECT `CustomEnabled` FROM `leave` WHERE `guildId` = ?;", member.guild.id, function (err, result, fields) {
    if(result[0].CustomEnabled == 0) { 
    return;
    } else if (result[0].CustomEnabled == 1) {
    const sqlquery22 = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + member.guild.id;
    sql.query(sqlquery22, function (error, results, fields) {
     if (error) console.log(error);if (!results || results.length == 0) {return;}
     (async () => {
      const logsetup = await results[0].res;
      const log = await member.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!member.guild) return;
      if (!member.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      member.guild.fetchAuditLogs().then((logs) => {
        let con = sql.query("SELECT `embedEnable` FROM `leave` WHERE `guildId` = ?;", member.guild.id, function (err, result, fields) {
          let isEmbedEnabled = result[0].embedEnable
          if(isEmbedEnabled == 0) { 
            let con = sql.query("SELECT `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `background` FROM `leave` WHERE `guildId` = " + member.guild.id, function (err, result, fields) {
            (async () => {
            let avatar = member.user.displayAvatarURL({format: "png"});
            let username = member.user.username
            let hash = member.user.discriminator;
            let membercount = member.guild.memberCount;
            let Servername = member.guild.name;
            const BorderColor = `${result[0].border}`;
            const UsernameColor = `${result[0].usernameBox}`;
            const DiscriminatorColor = `${result[0].discriminatorBox}`;
            const messageColor = `${result[0].messageBox}`;
            const titleColor = `${result[0].titleBox}`;
            const avatarColor = `${result[0].avatarBox}`;
            let Leavebg = `${result[0].background}`;
            const Canvacord = require("canvacord")
            const LeaveCard = new Canvacord.Leaver()
            .setUsername(username)
            .setDiscriminator(hash)
            .setMemberCount(membercount)
            .setGuildName(Servername)
            .setAvatar(avatar)
            .setColor("avatar", avatarColor)
            .setColor("border", BorderColor)
            .setColor("username-box", UsernameColor)
            .setColor("discriminator-box", DiscriminatorColor)
            .setColor("message-box", messageColor)
            .setColor("title", titleColor)
            .setBackground(Leavebg)
            let attachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
            log.send(`<@${member.user.id}>\n${client.settings.get(member.guild.id, "leaveMsg")}`, attachment);
            })();
          });
          } else if (isEmbedEnabled == 1) {
            let con = sql.query("SELECT `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `background` FROM `leave` WHERE `guildId` = " + member.guild.id, function (err, result, fields) {
            (async () => {
            let avatar = member.user.displayAvatarURL({format: "png"});
            let username = member.user.username
            let hash = member.user.discriminator;
            let membercount = member.guild.memberCount;
            let Servername = member.guild.name;
            let BorderColor = `${result[0].border}`;
            let UsernameColor = `${result[0].usernameBox}`;
            let DiscriminatorColor = `${result[0].discriminatorBox}`;
            let messageColor = `${result[0].messageBox}`;
            let titleColor = `${result[0].titleBox}`;
            let avatarColor = `${result[0].avatarBox}`;
            let LeavebackgroundImage = `${result[0].background}`;
            const Canvacord = require("canvacord")
            const LeaveCard = new Canvacord.Leaver()
            .setUsername(username)
            .setDiscriminator(hash)
            .setMemberCount(membercount)
            .setGuildName(Servername)
            .setAvatar(avatar)
            .setColor("avatar", avatarColor)
            .setColor("border", BorderColor)
            .setColor("username-box", UsernameColor)
            .setColor("discriminator-box", DiscriminatorColor)
            .setColor("message-box", messageColor)
            .setColor("title", titleColor)
            .setBackground(LeavebackgroundImage)
            let attachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
            let con6 = sql.query("SELECT `embedColor` FROM `leave` WHERE `guildId` = ?;", member.guild.id, function (err, result, fields) {
            let EmbedLeaveMsgColor = result[0].embedColor
            let leaveembed = new Discord.MessageEmbed()
            .setTitle(member.user.tag.toUpperCase())
            .setColor(`${EmbedLeaveMsgColor}`)
            .setDescription(client.settings.get(member.guild.id, "leaveMsg"))
            .setFooter(member.user.tag, member.guild.iconURL())
            .attachFiles(attachment)
            .setImage("attachment://leave-image.png")
            .setTimestamp()
            log.send(leaveembed)
            })
            })();
            });
          }
        });
    });
     })();
    });
  }
});
} catch (err) {
// console.log(err);
}
})

  async function createAPIMessage(interaction, content) {
   const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content).resolveData().resolveFiles();
   return {
    ...apiMessage.data,
    files: apiMessage.files,
   };
  }
 } catch (err) {
  console.log(err);
 }
};
