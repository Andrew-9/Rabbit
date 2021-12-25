const Discord = require("discord.js");
const chalk = require("chalk");
const config = require("../config");
const sql = require("../utilities/database");
const canvacord = require("canvacord")
const Canvas = require("canvas");

module.exports = function (client, guild) {
  const description = {
    name: "Rabbit Welcome & Leave",
    filename: "welcome&Leave.js",
    version: "2.5"
  }

  //// DM WELCOME SETUP
  client.on("guildMemberAdd", member => {
  let c = sql.query("SELECT `guildId` FROM `welcome` WHERE `guildId` = ?;", member.guild.id, function (err, result, fields) {
    if(result == 0) {
    const sql4 = "INSERT INTO `welcome` (`guildId`, `channelid`, `CustonChannelid`, `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`, `DMWelcome`, `w_embed_welcome`, `DMEmbed`, `DMImage`, `DMBackground`, `w_embed_channel`, `w_embed_thumb`, `w_embed_Image`, `w_embed_Image_on`, `w_embed_thumb_on`) VALUES (" + member.guild.id + ", '123456789', '123456789', '0', '0', '1', 'https://media.discordapp.net/attachments/711910361133219903/893604349698277397/welcome.png?width=1440&height=514', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');";
    sql.query(sql4, function (error, results, fields) {if (error) console.log(error);});
    } else {
      let WelDm = sql.query("SELECT DMWelcome, DMEmbed, DMImage, DMBackground FROM welcome WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
      if (result[0].DMWelcome == 0) {
      return;
      } else if (result[0].DMWelcome == 1) {
      if (result[0].DMEmbed == 1) {
      //////// Check /////////////
      if (result[0].DMImage == 1) {
      let DMBackground = result[0].DMBackground;
      const DMSetup = new Discord.MessageEmbed()
      .setColor(client.wdm.get(member.guild.id, "WelcomeDmColor"))
      .setAuthor(`${client.wdm.get(member.guild.id, "WelcomeDmAuthor")}`, member.guild.iconURL())
      .setTitle(client.wdm.get(member.guild.id, "WelcomeDmTitle"))
      .setDescription(client.wdm.get(member.guild.id, "WelcomeDmMessage"))
      .setImage(DMBackground)
      .setFooter(`${client.wdm.get(member.guild.id, "WelcomeDmFooter")}`, member.guild.iconURL())
      .setTimestamp();
      member.send(DMSetup);
      } else {
      const DMNSetup = new Discord.MessageEmbed()
      .setColor(client.wdm.get(member.guild.id, "WelcomeDmColor"))
      .setAuthor(`${client.wdm.get(member.guild.id, "WelcomeDmAuthor")}`, member.guild.iconURL())
      .setTitle(client.wdm.get(member.guild.id, "WelcomeDmTitle"))
      .setDescription(client.wdm.get(member.guild.id, "WelcomeDmMessage"))
      .setFooter(`${client.wdm.get(member.guild.id, "WelcomeDmFooter")}`, member.guild.iconURL())
      .setTimestamp();
      member.send(DMNSetup);
      }
      } else if (result[0].DMEmbed == 0) {
      member.send(client.wdm.get(member.guild.id, "WelcomeDmMessage"));
      } 
      }
      });
    }
  });
  });
    //// END DM WELCOME SETUP

    //// EMBED WELCOME SETUP
    client.on("guildMemberAdd", member => {
    let c = sql.query("SELECT `guildId` FROM `welcome` WHERE `guildId` = ?;", member.guild.id, function (err, result, fields) {
    if(result == 0) {
    const sql4 = "INSERT INTO `welcome` (`guildId`, `channelid`, `CustonChannelid`, `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`, `DMWelcome`, `w_embed_welcome`, `DMEmbed`, `DMImage`, `DMBackground`, `w_embed_channel`, `w_embed_thumb`, `w_embed_Image`, `w_embed_Image_on`, `w_embed_thumb_on`) VALUES (" + member.guild.id + ", '123456789', '123456789', '0', '0', '1', 'https://media.discordapp.net/attachments/711910361133219903/893604349698277397/welcome.png?width=1440&height=514', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');";
    sql.query(sql4, function (error, results, fields) {if (error) console.log(error);});
    } else {
      let con = sql.query("SELECT w_embed_welcome FROM welcome WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
      if(result[0].w_embed_welcome == 0) { 
      return;
      } else if (result[0].w_embed_welcome == 1) {
      const sqlquery = "SELECT w_embed_channel AS res FROM welcome WHERE guildid = " + member.guild.id;
      sql.query(sqlquery, function (error, results, fields) {
      if (error) return; if (!results || results.length == 0) {return;}
      (async () => {
      const logsetup = await results[0].res;
      const log = await member.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
      if (!member.guild) return;
      if (!member.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      if (!log) return;
      if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
      member.guild.fetchAuditLogs().then((logs) => {
      let emblog = sql.query("SELECT w_embed_Image, w_embed_thumb, w_embed_Image_on, w_embed_thumb_on FROM welcome WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
        let EmImg = result[0].w_embed_Image;
        let EmThm = result[0].w_embed_thumb;
        if (result[0].w_embed_Image_on == 1) {
        if (result[0].w_embed_thumb_on == 0) {
        const ENSetup = new Discord.MessageEmbed()
        .setTitle(client.wembed.get(member.guild.id, "WEmbedTitle"))
        .setAuthor(client.wembed.get(member.guild.id, "WEmbedAuthor"), member.user.displayAvatarURL())
        .setColor(client.wembed.get(member.guild.id, "WEmbedColor"))
        .setDescription(client.wembed.get(member.guild.id, "WEmbedMessage"))
        .setFooter(client.wembed.get(member.guild.id, "WEmbedFooter"), member.guild.iconURL())
        .setImage(EmImg)
        .setTimestamp();
        log.send(`<@${member.user.id}>`, ENSetup);
        } else {
        const ENSetup1 = new Discord.MessageEmbed()
        .setTitle(client.wembed.get(member.guild.id, "WEmbedTitle"))
        .setAuthor(client.wembed.get(member.guild.id, "WEmbedAuthor"), member.user.displayAvatarURL())
        .setColor(client.wembed.get(member.guild.id, "WEmbedColor"))
        .setDescription(client.wembed.get(member.guild.id, "WEmbedMessage"))
        .setFooter(client.wembed.get(member.guild.id, "WEmbedFooter"), member.guild.iconURL())
        .setImage(EmImg)
        .setThumbnail(EmThm)
        .setTimestamp();
        log.send(`<@${member.user.id}>`, ENSetup1);
        }
        } else if (result[0].w_embed_Image_on == 0) {
        if (result[0].w_embed_thumb_on == 1) {
        const ENSetup2 = new Discord.MessageEmbed()
        .setTitle(client.wembed.get(member.guild.id, "WEmbedTitle"))
        .setAuthor(client.wembed.get(member.guild.id, "WEmbedAuthor"), member.user.displayAvatarURL())
        .setColor(client.wembed.get(member.guild.id, "WEmbedColor"))
        .setDescription(client.wembed.get(member.guild.id, "WEmbedMessage"))
        .setFooter(client.wembed.get(member.guild.id, "WEmbedFooter"), member.guild.iconURL())
        .setThumbnail(EmThm)
        .setTimestamp();
        log.send(`<@${member.user.id}>`, ENSetup2);
        } else {
        const ENSetup3 = new Discord.MessageEmbed()
        .setTitle(client.wembed.get(member.guild.id, "WEmbedTitle"))
        .setAuthor(client.wembed.get(member.guild.id, "WEmbedAuthor"), member.user.displayAvatarURL())
        .setColor(client.wembed.get(member.guild.id, "WEmbedColor"))
        .setDescription(client.wembed.get(member.guild.id, "WEmbedMessage"))
        .setFooter(client.wembed.get(member.guild.id, "WEmbedFooter"), member.guild.iconURL())
        .setTimestamp();
        log.send(`<@${member.user.id}>`, ENSetup3);
        }
        }
        });
         });
       })();
      });
      }
    });
      }
    });
    });
    //// END EMBED WELCOME SETUP


    //// LOG WELCOME SETUP
    client.on("guildMemberAdd", member => {
      let b = sql.query("SELECT `guildId` FROM `logs` WHERE `guildId` = ?;", member.guild.id, function (err, result, fields) {
      if(result == 0) {
        const sql3 = "INSERT INTO `logs` (`guildId`, `channelid`, `enabled`) VALUES (" + member.guild.id + ", '0', '12345678');";
        sql.query(sql3, function (error, results, fields) {if (error) console.log(error);});
      } else {
        try {  
        let con = sql.query("SELECT enabled FROM logs WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
        if(result[0].enabled == 0) { 
        return;
        } else if (result[0].enabled == 1) {
        const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + member.guild.id;
        sql.query(sqlquery, function (error, results, fields) {
         if (error) return; if (!results || results.length == 0) {return;}
         (async () => {
          const logsetup = await results[0].res;
          const log = await member.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
          if (!member.guild) return;
          if (!member.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
          if (!log) return;
          if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
           member.guild.fetchAuditLogs().then((logs) => {
           const newmember = new Discord.MessageEmbed()
           .setAuthor(`Member Joined`, member.user.displayAvatarURL())
           .setDescription(`<@${member.user.id}> - ${member.user.tag}`)
           .addField('**Account Age**', `${new Date(member.user.createdTimestamp).toDateString()}`, false)
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
      return;
    }
    }
    });
  });
  //// END LOG WELCOME SETUP
  

  //// LOG GOODBYE SETUP
  client.on("guildMemberRemove", member => {
    let b = sql.query("SELECT `guildId` FROM `logs` WHERE `guildId` = ?;", member.guild.id, function (err, result, fields) {
    if(result == 0) {
    const sql3 = "INSERT INTO `logs` (`guildId`, `channelid`, `enabled`) VALUES (" + member.guild.id + ", '0', '12345678');";
    sql.query(sql3, function (error, results, fields) {if (error) console.log(error);});
    } else {
    try {  
      let con = sql.query("SELECT enabled FROM logs WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
      if(result[0].enabled == 0) { 
      return;
      } else if (result[0].enabled == 1) {
      const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + member.guild.id;
      sql.query(sqlquery, function (error, results, fields) {
       if (error) return; if (!results || results.length == 0) {return;}
       (async () => {
        const logsetup = await results[0].res;
        const log = await member.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
        if (!member.guild) return;
        if (!member.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
        if (!log) return;
        if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
         member.guild.fetchAuditLogs().then((logs) => {
         const newmember = new Discord.MessageEmbed()
         .setAuthor("Member Left", member.user.displayAvatarURL())
         .setDescription(`<@${member.user.id}> - ${member.user.tag}`)
         .setColor("#d34242")
         .setTimestamp()
         .setFooter(member.guild.name, member.guild.iconURL());
         log.send(newmember);
        });
       })();
      });
    }
  });
  } catch (err) {
    return;
  }
  }
  });
  })
  //// END LOG GOODBYE SETUP


  //// CUSTOM WELCOME SETUP
  client.on("guildMemberAdd", member => {
    try {  
      let c = sql.query("SELECT `guildId` FROM `welcome` WHERE `guildId` = ?;", member.guild.id, function (err, result, fields) {
      if(result == 0) {
      const sql4 = "INSERT INTO `welcome` (`guildId`, `channelid`, `CustonChannelid`, `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`, `DMWelcome`, `w_embed_welcome`, `DMEmbed`, `DMImage`, `DMBackground`, `w_embed_channel`, `w_embed_thumb`, `w_embed_Image`, `w_embed_Image_on`, `w_embed_thumb_on`) VALUES (" + member.guild.id + ", '123456789', '123456789', '0', '0', '1', 'https://media.discordapp.net/attachments/711910361133219903/893604349698277397/welcome.png?width=1440&height=514', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0');";
      sql.query(sql4, function (error, results, fields) {if (error) console.log(error);});
      } else {
      let con = sql.query("SELECT CustomEnabled FROM welcome WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
      if(result[0].CustomEnabled == 0) { 
      return;
      } else if (result[0].CustomEnabled == 1) {
      const sqlquery = "SELECT CustonChannelid AS res FROM welcome WHERE guildid = " + member.guild.id;
      sql.query(sqlquery, function (error, results, fields) {
       if (error) return; if (!results || results.length == 0) {return;}
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
                let EmWelMsgColor = result[0].embedColor
                let setupembed = new Discord.MessageEmbed()
                .setColor(EmWelMsgColor)
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
  }
  });
  } catch (err) {};
  });
  //// END CUSTOM WELCOME SETUP
  

  //// CUSTOM GOODBYE SETUP
  client.on("guildMemberRemove", member => {
    try {  
      let c = sql.query("SELECT `guildId` FROM `leave` WHERE `guildId` = ?;", member.guild.id, function (err, result, fields) {
      if(result == 0) {
      const sql5 = "INSERT INTO `leave` (`guildId`, `channelid`, `CustonChannelid`, `message`, `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`) VALUES (" + member.guild.id + ", '123456789', '123456789', ':crying_cat_face: Good bye.. We hope to see you again.', '0', '0', '1', 'https://media.discordapp.net/attachments/711910361133219903/877887340947853372/goodbye.png?width=1440&height=514', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29');";
      sql.query(sql5, function (error, results, fields) {if (error) console.log(error);});
      } else {
      let con = sql.query("SELECT `CustomEnabled` FROM `leave` WHERE `guildId` = ?;", member.guild.id, function (err, result, fields) {
      if(result[0].CustomEnabled == 0) { 
      return;
      } else if (result[0].CustomEnabled == 1) {
      const sqlquery22 = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + member.guild.id;
      sql.query(sqlquery22, function (error, results, fields) {
       if (error) return; if (!results || results.length == 0) {return;}
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
              let LeavebgImage = `${result[0].background}`;
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
              .setBackground(LeavebgImage)
              let attachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
              let con6 = sql.query("SELECT `embedColor` FROM `leave` WHERE `guildId` = ?;", member.guild.id, function (err, result, fields) {
              let EmLvMsgColor = result[0].embedColor
              let leaveembed = new Discord.MessageEmbed()
              .setTitle(member.user.tag.toUpperCase())
              .setColor(EmLvMsgColor)
              .setDescription(client.settings.get(member.guild.id, "leaveMsg"))
              .setFooter(member.user.tag, member.guild.iconURL())
              .attachFiles(attachment)
              .setImage("attachment://leave-image.png")
              .setTimestamp()
              log.send(leaveembed)
              });
              })();
              });
            }
          });
      });
       })();
      });
    }
  });
  }
  });
  } catch (err) {}
  })
  //// END CUSTOM GOODBYE SETUP

  console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(`Successfully Loaded: ${description.name}`));
}