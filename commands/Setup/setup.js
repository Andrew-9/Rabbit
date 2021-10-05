const { MessageEmbed, MessageAttachment } = require("discord.js");
const Discord = require("discord.js")
const canvacord = require("canvacord")
const fs = require('fs');
const https = require('https');
const config = require("../../config");
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
const Canvas = require("canvas");

module.exports = {
  name: "setup",
  aliases: ["settings", "config"],
  category: "Setup",
  description: "Show the list of available systems setup!\nThis command includes a variation of settings.\nPlease read the **description** of each **numbers** to learn more.\nYou need help with setting up? Join the support server.",
  usage: "setup",
  run: async (client, message, args) => {
  const prefix = guildPrefix.get(message.guild.id);
  if (message.member.hasPermission("ADMINISTRATOR")) {

   let embed = new MessageEmbed()
   .setColor("#DB170D")
   .setAuthor("What system setup do u want?", `${message.guild.iconURL()}`)
   .setDescription(`
    **1.** \`Action Log System\`
    **2.** \`Welcome & Leave System\`
    **3.** \`Economical Ward System\`
    **4.** \`Advance Ranking System\`
    **5.** \`Creative Application System\`
    `)
   .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
   .setThumbnail(config.avatarUrl)
   message.reply(embed).then(msg => {
  msg.channel.awaitMessages(m=> m.author.id === message.author.id, { max: 1, time: 30000, errors: ['time'] }).then(collected=>{
    switch(collected.first().content.toString()){
      case "1":
        actionlog();
      break;
      case "2":
        welcomesystem();
      break;
      case "3":
        economicalward();
      break;
      case "4":
        rankingsystem()
      break;
      case "5":
        applysystem()
      break;
      default:
        message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
      break;
    }
  }).catch(error=>{
    console.log(error)
    return message.lineReply("<:thinkingface:867897965380108288> | **IT SEEMS YOUR TIME RAN OUT!**")
})
})

/**
 * @actionlog FINISHED
 */
 function actionlog(){
  let rembed = new MessageEmbed()
  .setColor(config.black)
  .setAuthor("What do u want to do?", `${message.guild.iconURL()}`)
  .setDescription(`
  **0.** \`log System\` - *Creates ONE Log System.*
  **1.** \`Set log\` - *Set a channel for logging members actions.*
  **2.** \`Check log\` - *Check if the guild has a log channel.*
  **3.** \`Set Boosters\` - *Set a boosters channel for the guild.*
  **4.** \`Check Boosters\` - *Check if the guild has a boosters channel.*
  **5.** \`Delete Log\` - *Delete the log channel \`[DISABLED]\`.*
  **6.** \`Delete Boosters\` - *Delete the boosters channel \`[DISABLED]\`.*
  **7.** \`Reset All\` - *Resets settings for all action log system*
  **8.** \`Enable logging\` - *Enable the logging system for the guild*
  **9.** \`Disable logging\` - *Disable the logging system for the guild*
  `)
  .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
  .setThumbnail(config.avatarUrl)
  message.lineReply(rembed).then(msg => {
  let parent = false;
  if(msg.channel.parent) parent = msg.channel.parent.id;
  msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
    switch(collected.first().content.toString()){
      case "0":
            message.guild.channels.create("📢action-log", {
            type: 'text',
            topic: "logging all members actions",
            permissionOverwrites: [
              {
                id: message.guild.id,
                allow: ['READ_MESSAGE_HISTORY'],
                deny: ['SEND_MESSAGES'],
              },
            ],
          })
          .then((channel) => {
            let conlog = sql.query("SELECT channelid FROM logs WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if(result == 0) {
            let inputlog ="INSERT INTO `logs` (`guildId`, `channelid`, `enabled`) VALUES (" + message.guild.id + "," + channel.id + "," + 1 + ");";
            sql.query(inputlog)
            if (error) console.log(error);
            const logsetupem = new Discord.MessageEmbed()
            .setColor("#006eee")
            .setTitle("<:checkvector:869193650184269834> SETUP COMPLETED!")
            .setDescription(`**Your log setup is now completed!**\n*You can run \`${prefix}setup -> action log -> set log\` to change channel!*`)
            .setFooter("Setup completed by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
            .setTimestamp();
            message.channel.send(logsetupem);
            const setlog = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(`<@${message.author.id}> **created a log system** **<#${channel.id}>**`)
            .setColor("#02c000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL());
            channel.send(setlog);
            } else {
            let sqluplog = 'UPDATE `logs` SET `channelid` = ' + channel.id + ' WHERE `guildId` = ' + message.guild.id + '';
            sql.query(sqluplog);
            let sqlupdlog = "UPDATE `logs` SET `enabled` =  " + 1 + " WHERE `guildId` = " + message.guild.id + "";
            sql.query(sqlupdlog);
            const setuplogemb = new Discord.MessageEmbed()
            .setColor("#006eee")
            .setTitle("<:checkvector:869193650184269834> SETUP COMPLETED!")
            .setDescription(`**Your log setup is now completed!**\n*You can run \`${prefix}setup -> action log -> set log\` to change channel!*`)
            .setFooter("Setup completed by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
            .setTimestamp();
            message.channel.send(setuplogemb);
            const setlog = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(`**Rabbit created a log channel** **<#${channel.id}>**`)
            .setColor("#02c000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL());
            channel.send(setlog);
            }
            });
           });
      break;
      case "1":
        const pinglog = new Discord.MessageEmbed()
        .setColor("#0082ea")
        .setTitle(":pushpin: ENTER LOG CHANNEL!")
        .setDescription("**You can ping your \`LOG\` channel now.**")
        message.lineReply(pinglog).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
            if (!message.member.hasPermission("MANAGE_CHANNELS")) {
              const Nopermission = new Discord.MessageEmbed()
              .setColor("#f04949")
              .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
              .setDescription(`**You don't have permissions to set logging channel!**`)
              message.channel.send(Nopermission);
             }
             let channel = collected.first().mentions.channels.first();
             if (!channel) {
              return message.lineReply("<:thinkingface:867897965380108288> **| Hmm, You have to enter a channel!**");
             }
             const sqlquery = "SELECT channelid AS res FROM logs WHERE guildId = " + message.guild.id;
             sql.query(sqlquery, function (error, results, fields) {
              if (error) return console.log(error);
              if (results[0]) {
               const update = "UPDATE logs SET channelid = " + channel.id + " WHERE guildId = " + message.guild.id;
               sql.query(update, function (error, results, fields) {
                if (error) console.log(error);
                const logsuccess = new Discord.MessageEmbed()
                .setColor("#46c300")
                .setTitle("<:checkvector:869193650184269834> SUCCESS!")
                .setDescription(`**Successfully updated logs channel, new logs channel is** ${channel}\n*Run \`${prefix}setup -> action-log -> delete-log\` to delete logging channel!*`)
                message.channel.send(logsuccess);
                const embed = new Discord.MessageEmbed()
                 .setColor(config.black)
                 .setTitle("<:xchannel:887869003412947024> NEW LOG CHANNEL!")
                 .setThumbnail(config.avatarUrl)
                 .setDescription(`**Hello people ${message.author} has set this channel for logging all events!**\nThis will log all members activities into this channel.`)
                channel.send(embed);
               });
              } else {
               const insert1 = "INSERT INTO `logs` (`guildId`, `channelid`, `enabled`) VALUES (" + message.guild.id + "," + channel.id + "," + 1 + ");";
               sql.query(insert1, function (error, results, fields) {
                if (error) console.log(error);
                const logsuccess1 = new Discord.MessageEmbed()
                .setColor("#46c300")
                .setTitle("<:checkvector:869193650184269834> LOG SUCCESS!")
                .setDescription(`**Success! New channel for logging members activities is** ${channel}`)
                message.channel.send(logsuccess1);
                const logembed = new Discord.MessageEmbed()
                .setColor(config.black)
                .setTitle("<:xchannel:887869003412947024> NEW LOG CHANNEL!")
                .setThumbnail(config.avatarUrl)
                .setDescription(`**Hello people ${message.author} has set this channel for logging all events!**\n*This will log all members activities into this channel.*`)
                channel.send(logembed);
               });
              }
             });
          })
        })
      break;
      case "2":
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
          const Nopermission1 = new Discord.MessageEmbed()
          .setColor("#f04949")
          .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
          .setDescription(`**You don't have permissions to check log channel!**`)
          message.channel.send(Nopermission1);
         }
          const sqlquery1 = "SELECT channelid AS res FROM logs WHERE guildId = " + message.guild.id;
          sql.query(sqlquery1, function (error, results, fields) {
           if (error) return console.log(error);
           if (results[0]) {
            const check1 = new Discord.MessageEmbed()
            .setColor("#1775f2")
            .setTitle("<:xchannel:887869003412947024> CURRENT LOG CHANNEL!")
            .setDescription(`**Your current logs channel is: <#${results[0].res}>**\n*You can channge the channel using \`${prefix}setup -> action-log -> set-log\`*`)
            message.channel.send(check1);
           } else {
            const check2 = new Discord.MessageEmbed()
            .setColor("#1775f2")
            .setTitle("<:xvector2:869193716575911966> LOG NOT ENABLED YET!")
            .setDescription(`**You haven't enabled logs on this server yet.**\n*Run \`${prefix}setup -> action-log -> enable-logging\` to enabled system logging!*`)
            message.channel.send(check2);
           }
          });
      break;
      case "3":
        const pingbooster = new Discord.MessageEmbed()
        .setColor("#0082ea")
        .setTitle(":pushpin: ENTER BOOSTERS CHANNEL!")
        .setDescription("**You can ping your \`BOOSTERS\` channel now.**")
        message.lineReply(pingbooster).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
            if (!message.member.hasPermission("MANAGE_CHANNELS")) {
              const Nopermission2 = new Discord.MessageEmbed()
              .setColor("#f04949")
              .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
              .setDescription(`**You don't have permissions to set boosters channel!**`)
              message.channel.send(Nopermission2);
             }
             let channel = collected.first().mentions.channels.first();
             if (!channel) {
              return message.lineReply("<:thinkingface:867897965380108288> **| Hmm, You have to enter a channel!**");
             }
             const sqlquery2 = "SELECT channelid AS res FROM boosters WHERE guildId = " + message.guild.id;
             sql.query(sqlquery2, function (error, results, fields) {
              if (error) return console.log(error);
              if (results[0]) {
               const update1 = "UPDATE boosters SET channelid = " + channel.id + " WHERE guildId = " + message.guild.id;
               sql.query(update1, function (error, results, fields) {
                if (error) console.log(error);
                const logsuccess2 = new Discord.MessageEmbed()
                .setColor("#46c300")
                .setTitle("<:checkvector:869193650184269834> BOOSTERS SUCCESS!")
                .setDescription(`**Successfully updated boosters channel, new boosters channel is** ${channel}\n*Run \`${prefix}setup -> action-log -> delete-boosters\` to delete boosters channel!*`)
                message.channel.send(logsuccess2);
                const embed1 = new Discord.MessageEmbed()
                .setColor(config.black)
                .setTitle("<:xchannel:887869003412947024> NEW BOOSTERS CHANNEL!")
                .setThumbnail(config.avatarUrl)
                .setDescription(`**Hello people ${message.author} has set this channel for logging all Boosters events!**\n*This will log members boosters activities into this channel.*`)
                 channel.send(embed1);
               });
              } else {
               const insert2 = "INSERT INTO `boosters` (`guildId`, `channelid`, `enabled`) VALUES (" + message.guild.id + "," + channel.id + "," + 1 + ");";
               sql.query(insert2, function (error, results, fields) {
                if (error) console.log(error);
                const boostersuccess = new Discord.MessageEmbed()
                .setColor("#46c300")
                .setTitle("<:checkvector:869193650184269834> BOOSTERS SUCCESS!")
                .setDescription(`**Success! New channel for logging boosters is** ${channel}`)
                message.channel.send(boostersuccess);
                const boostembed1 = new Discord.MessageEmbed()
                .setColor(config.black)
                .setTitle("<:xchannel:887869003412947024>NEW BOOSTERS CHANNEL!")
                .setThumbnail(config.avatarUrl)
                .setDescription(`**Hello People ${message.author} has set this channel for logging all Boosters events!**\n*This will log members boosters activities into this channel.*`)
                channel.send(boostembed1);
               });
              }
             });
          })
        })
      break;
      case "4":
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
          const Nopermission3 = new Discord.MessageEmbed()
          .setColor("#f04949")
          .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
          .setDescription(`**You don't have permissions to check boosters channel!**`)
          message.channel.send(Nopermission3);
         }
          const sqlquery3 = "SELECT channelid AS res FROM boosters WHERE guildId = " + message.guild.id;
          sql.query(sqlquery3, function (error, results, fields) {
           if (error) return console.log(error);
           if (results[0]) {
            const check4 = new Discord.MessageEmbed()
            .setColor("#1775f2")
            .setTitle("<:xchannel:887869003412947024> CURRENT BOOSTERS CHANNEL!")
            .setDescription(`**Your current boosters channel is:** <#${results[0].res}>.\n*You can channge the channel using \`${prefix}setup -> action-log -> set-boosters\`*`)
            message.channel.send(check4);
           } else {
            const check5 = new Discord.MessageEmbed()
            .setColor("#1775f2")
            .setTitle("<:xvector2:869193716575911966> BOOSTERS NOT ENABLED YET!")
            .setDescription(`**You haven't enabled boosters on this server yet.**\n*Run \`${prefix}setup -> action-log -> set-boosters\` to enabled boosters logging!*`)
            message.channel.send(check5);
           }
          });
      break;
      case "5":
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
          const Nopermission4 = new Discord.MessageEmbed()
          .setColor("#f04949")
          .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
          .setDescription(`**You don't have permissions to delete log channel!**`)
          message.channel.send(Nopermission4);
          }
          // const sqlquery6 = "SELECT channelid AS res FROM logs WHERE guildId = " + message.guild.id;
          // sql.query(sqlquery6, function (error, results, fields) {
          //  if (error) return console.log(error);
          //  if (results[0]) {
          //   const deletequery = "DELETE FROM logs WHERE guildId = " + message.guild.id;
          //   sql.query(deletequery, function (error, results, fields) {
          //    if (error) return console.log(error);
          //    const check7 = new Discord.MessageEmbed()
          //    .setColor("#1775f2")
          //    .setTitle("<:checkvector:869193650184269834> DELETE SUCCESS!")
          //    .setDescription(`**Successfully deleted logs channel.**\n*You can always set new channel using \`${prefix}setup -> action-log -> set-log\`*`)
          //    message.channel.send(check7);
          //   });
          //  } else {
          //   const check8 = new Discord.MessageEmbed()
          //   .setColor("#1775f2")
          //   .setTitle("<:xvector2:869193716575911966> LOGS NOT ENABLED YET!")
          //   .setDescription(`**You haven't enabled logs system on this server yet.**\n*Run \`${prefix}setup -> action-log -> enable-logging\` to enabled system logging!*`)
          //   message.channel.send(check8);
          //  }
          // });
      break;
      case "6":
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
          const Nopermission6 = new Discord.MessageEmbed()
          .setColor("#f04949")
          .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
          .setDescription(`**You don't have permissions to delete boosters channel!**`)
          message.channel.send(Nopermission6);
          }
          // const sqlquery7 = "SELECT channelid AS res FROM boosters WHERE guildId = " + message.guild.id;
          // sql.query(sqlquery7, function (error, results, fields) {
          //  if (error) return console.log(error);
          //  if (results[0]) {
          //   const deletequery1 = "DELETE FROM boosters WHERE guildId = " + message.guild.id;
          //   sql.query(deletequery1, function (error, results, fields) {
          //    if (error) return console.log(error);
          //    const check9 = new Discord.MessageEmbed()
          //    .setColor("#1775f2")
          //    .setTitle("<:checkvector:869193650184269834> DELETE SUCCESS!")
          //    .setDescription(`**Successfully deleted boosters channel.**\n*You can always set new channel using \`${prefix}setup -> action-log -> set-boosters\`*`)
          //    message.channel.send(check9);
          //   });
          //  } else {
          //   const check10 = new Discord.MessageEmbed()
          //   .setColor("#1775f2")
          //   .setTitle("<:xvector2:869193716575911966> BOOSTERS NOT ENABLED YET!")
          //   .setDescription(`**You haven't enabled boosters system on this server yet.**\n*Run \`${prefix}setup -> action-log -> enable-logging\` to enabled system logging!*`)
          //   message.channel.send(check10);
          //  }
          // });
      break;
      case "7":
        let sql3 = "UPDATE `boosters` SET `channelid` = " + 0 + " WHERE `guildId` = " + message.guild.id;
        sql.query(sql3);
        let sql5 = "UPDATE `logs` SET `channelid` = " + 0 + " WHERE `guildId` = " + message.guild.id;
        sql.query(sql5);
        const logsuccess3 = new Discord.MessageEmbed()
        .setColor("#46c300")
        .setTitle("<:checkvector:869193650184269834> SUCCESS!")
        .setDescription(`**Successfully Resetted \`ALL ACTION LOG\` System**\n*You can set a new channel settings with \`${prefix}setup -> action-log.\`*`)
        message.channel.send(logsuccess3);
        break;
        case "8":
          let sql8 = "UPDATE `boosters` SET `enabled` = " + 1 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql8);
          let sql10 = "UPDATE `logs` SET `enabled` = " + 1 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql10);
          const logsuccess4 = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> SUCCESS!")
          .setDescription(`**Successfully Enabled \`ALL ACTION LOG\` System**\n*You can disable the settings with \`${prefix}setup -> action-log.\`*`)
          message.channel.send(logsuccess4);
          break;
          case "9":
            let sql13 = "UPDATE `boosters` SET `enabled` = " + 0 + " WHERE `guildId` = " + message.guild.id;
            sql.query(sql13);
            let sql15 = "UPDATE `logs` SET `enabled` = " + 0 + " WHERE `guildId` = " + message.guild.id;
            sql.query(sql15);
            const logsuccess5 = new Discord.MessageEmbed()
            .setColor("#46c300")
            .setTitle("<:checkvector:869193650184269834> SUCCESS!")
            .setDescription(`**Successfully Disabled \`ALL ACTION LOG\` System**\n*You can enabled this settings with \`${prefix}setup -> action-log.\`*`)
            message.channel.send(logsuccess5);
            break;
      default:
        message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
      break;
    }
  }).catch(error => {
    //console.log(error);
    return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**")
 })
 })
}

/**
 * @economicalward FINISHED
 */
 function economicalward(){
  let rembed = new MessageEmbed()
  .setColor(config.black)
  .setAuthor("What do u want to do?", `${message.guild.iconURL()}`)
  .setDescription(`
  **0.** \`Ward System\` - *Creates ONE Ward System*
  **1.** \`Set Ward\` - *Set an economical ward channel for the guild.*
  **2.** \`Check Ward\` - *Check if the guild already has a ward channel.*
  **3.** \`Delete Ward\` - *Delete the current ward channel.*
  **4.** \`Reset All\` - *Resets settings for economical system*
  **5.** \`Enable Ward\` - *Enable the ward system logging for the guild*
  **6.** \`Disable Ward\` - *Disable the ward system logging the guild*
  `)
  .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
  .setThumbnail(config.avatarUrl)
  message.lineReply(rembed).then(msg => {
  let parent = false;
  if(msg.channel.parent) parent = msg.channel.parent.id;
  msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
    switch(collected.first().content.toString()){
      case "0":
        message.guild.channels.create("💸economical-ward", {
          type: 'text',
          permissionOverwrites: [
            {
              id: message.guild.id,
              allow: ['READ_MESSAGE_HISTORY'],
              deny: ['SEND_MESSAGES'],
            },
          ],
        })
        .then((channel) => {
        let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
        if(result == 0) { 
        let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '1000', '0',' " + message.author.username + "');";
        sql.query(register)
        const setupreward = new Discord.MessageEmbed()
        .setColor('#125bf8')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`**${message.author.username}** was awarded with a surprise reward of **1,000.00<:dollars:881559643820793917>**\nUser now has a total of **1,000.00<:dollars:881559643820793917>** in their balance.`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        channel.send(setupreward);
        } else {
        let sqleup = 'UPDATE economy SET balance = balance+' + 1000 + ' WHERE userId = ' + message.author.id + '';
        sql.query(sqleup);
        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        let setupamount = result[0].balance
        let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(setupamount);
        const setupreward = new Discord.MessageEmbed()
        .setColor('#125bf8')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`**${message.author.username}** was awarded with a surprise reward of **1,000.00<:dollars:881559643820793917>**\nUser now has a total of **${AmountGiven}<:dollars:881559643820793917>** in their balance.`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        channel.send(setupreward);
        });
        }
        let c = sql.query("SELECT channelid FROM economy_ward WHERE guildId = ?;", message.guild.id, function (err, result, fields){
        if(result == 0) { 
        const createeco = "INSERT INTO `economy_ward` (`guildId`, `channelid`, `enabled`) VALUES (" + message.guild.id + "," + channel.id + "," + 1 + ");";
        sql.query(createeco)
        const wardcomplete = new Discord.MessageEmbed()
        .setColor("#006eee")
        .setTitle("<:checkvector:869193650184269834> SETUP COMPLETED!")
        .setDescription(`**Your Ward Setup is now completed!**\n*You can run \`${prefix}setup -> economical ward\` to change channel*`)
        .setFooter("Setup completed by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
        .setTimestamp();
        message.channel.send(wardcomplete);
        let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
        let setupamount = result[0].balance
        let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(setupamount);
        const setupreward = new Discord.MessageEmbed()
        .setColor('#125bf8')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`**${message.author.username}** was awarded with a surprise reward of **1,000.00<:dollars:881559643820793917>**\nUser now has a total of **${AmountGiven}<:dollars:881559643820793917>** in their balance.`)
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL());
        channel.send(setupreward);
        });
        } else {
        let sql6 = "UPDATE economy_ward SET enabled =  " + 1 + " WHERE guildId = " + message.guild.id + "";
        sql.query(sql6);
        let sql7 = 'UPDATE economy_ward SET channelid = ' + channel.id + ' WHERE guildId = ' + message.guild.id + '';
        sql.query(sql7);
        const wardcomplete = new Discord.MessageEmbed()
        .setColor("#006eee")
        .setTitle("<:checkvector:869193650184269834> SETUP COMPLETED!")
        .setDescription(`**Your Ward Setup is now completed!**\n*You can run \`${prefix}setup -> economical ward\` to change channel*`)
        .setFooter("Setup completed by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
        .setTimestamp();
        message.channel.send(wardcomplete);
        }
        });
        });
       });
      break;
      case "1":
        const pingwardc = new Discord.MessageEmbed()
        .setColor("#0082ea")
        .setTitle(":pushpin: ENTER WARD CHANNEL!")
        .setDescription("**You can ping your ward channel now.**")
        message.lineReply(pingwardc).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
            if (!message.member.hasPermission("MANAGE_CHANNELS")) {
              const Nopermission = new Discord.MessageEmbed()
              .setColor("#f04949")
              .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
              .setDescription(`**You don't have permissions to set economical ward channel!**`)
              message.channel.send(Nopermission);
             }
             let channel = collected.first().mentions.channels.first();
             if (!channel) {
              return message.lineReply("<:thinkingface:867897965380108288> **| Hmm, You have to enter a channel!**");
             }
              const sqlquery4 = "SELECT channelid AS res FROM economy_ward WHERE guildId = " + message.guild.id;
              sql.query(sqlquery4, function (error, results, fields) {
              if (error) return console.log(error);
              if (results[0]) {
              const update = "UPDATE economy_ward SET channelid = " + channel.id + " WHERE guildId = " + message.guild.id;
              sql.query(update, function (error, results, fields) {
              if (error) console.log(error);
              const logsuccess3 = new Discord.MessageEmbed()
              .setColor("#46c300")
              .setTitle("<:checkvector:869193650184269834> SUCCESS!")
              .setDescription(`**Successfully updated ward channel, new ward channel is** ${channel}\n*Run \`${prefix}setup -> economical ward\` to delete economical ward channel!*`)
              message.channel.send(logsuccess3);
              const ecoembed = new Discord.MessageEmbed()
              .setColor(config.black)
              .setTitle("<:xchannel:887869003412947024> NEW WARD CHANNEL!")
              .setThumbnail(config.avatarUrl)
              .setDescription(`**News.** *${message.author} has set this channel for logging **economy** events!*\n*All members **economical** activities will be logged into this channel.*`)
              channel.send(ecoembed);
               });
              } else {
              const insert3 = "INSERT INTO `economy_ward` (`guildId`, `channelid`, `enabled`) VALUES (" + message.guild.id + "," + channel.id + "," + 1 + ");";
              sql.query(insert3, function (error, results, fields) {
              if (error) console.log(error);
              const logsuccess4 = new Discord.MessageEmbed()
              .setColor("#46c300")
              .setTitle("<:checkvector:869193650184269834> SUCCESS!")
              .setDescription(`**Success! New channel for logging economical events! is** ${channel}\n*Run \`${prefix}setup -> economical ward set-ward\` to change ward channel!*`)
              message.channel.send(logsuccess4);
              let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
              if(result == 0) { 
              let register ="INSERT INTO economy (userId, balance, bank, username) VALUES ('" + message.author.id + "', '1000', '0',' " + message.author.username + "');";
              sql.query(register)
              let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
              const Newcreward = new Discord.MessageEmbed()
              .setColor('#125bf8')
              .setAuthor(message.author.tag, message.author.avatarURL())
              .setDescription(`**${message.author.username}** was awarded with a surprise reward of **1,000.00<:dollars:881559643820793917>**\nUser now has a total of **1,000.00<:dollars:881559643820793917>** in their balance.`)
              .setThumbnail(message.author.displayAvatarURL())
              .setTimestamp()
              .setFooter(message.guild.name, message.guild.iconURL());
              channel.send(Newcreward);
              });
              } else {
              let sqleup = 'UPDATE economy SET balance = balance+' + 1000 + ' WHERE userId = ' + message.author.id + '';
              sql.query(sqleup);
              let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
              let setupamount = result[0].balance
              let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(setupamount);
              const setupreward = new Discord.MessageEmbed()
              .setColor('#125bf8')
              .setAuthor(message.author.tag, message.author.avatarURL())
              .setDescription(`**${message.author.username}** was awarded with a surprise reward of **1,000.00<:dollars:881559643820793917>**\nUser now has a total of **${AmountGiven}<:dollars:881559643820793917>** in their balance.`)
              .setThumbnail(message.author.displayAvatarURL())
              .setTimestamp()
              .setFooter(message.guild.name, message.guild.iconURL());
              channel.send(setupreward);
              });
              }
              });
              });
              }
             });
          })
        })
      break;
      case "2":
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
          const Nopermission5 = new Discord.MessageEmbed()
          .setColor("#f04949")
          .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
          .setDescription(`**You don't have permissions to check ward channel!**`)
          message.channel.send(Nopermission5);
         }
          const sqlquery5 = "SELECT channelid AS res FROM economy_ward WHERE guildId = " + message.guild.id;
          sql.query(sqlquery5, function (error, results, fields) {
           if (error) return console.log(error);
           if (results[0]) {
            const check6 = new Discord.MessageEmbed()
            .setColor("#1775f2")
            .setTitle("<:xchannel:887869003412947024> CURRENT WARD CHANNEL!")
            .setDescription(`**Your current ward channel is: <#${results[0].res}>.**\n*You can channge the channel using \`${prefix}setup -> economical ward -> set-ward\`*`)
            message.channel.send(check6);
           } else {
            const check3 = new Discord.MessageEmbed()
            .setColor("#1775f2")
            .setTitle("<:xvector2:869193716575911966> WARD NOT ENABLED YET!")
            .setDescription(`**You haven't enabled economical ward system on this server yet.**\n*Run \`${prefix}setup -> economical ward\` to enabled ward logging!*`)
            message.channel.send(check3);
           }
          });
      break;
      case "3":
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
          const Nopermission7 = new Discord.MessageEmbed()
          .setColor("#f04949")
          .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
          .setDescription(`**You don't have permissions to delete ward channel!**`)
          message.channel.send(Nopermission7);
          }
          const sqlquery8 = "SELECT channelid AS res FROM economy_ward WHERE guildId = " + message.guild.id;
          sql.query(sqlquery8, function (error, results, fields) {
           if (error) return console.log(error);
           if (results[0]) {
            const deletequery2 = "DELETE FROM economy_ward WHERE guildId = " + message.guild.id;
            sql.query(deletequery2, function (error, results, fields) {
             if (error) return console.log(error);
             const economydelete = new Discord.MessageEmbed()
             .setColor("#1775f2")
             .setTitle("<:checkvector:869193650184269834> DELETE SUCCESS!")
             .setDescription(`**Successfully deleted ward channel.**\n*You can always set new channel using \`${prefix}setup -> economical ward.\`*`)
             message.channel.send(economydelete);
            });
           } else {
            const nowardenabled = new Discord.MessageEmbed()
            .setColor("#1775f2")
            .setTitle("<:xvector2:869193716575911966> WARD NOT ENABLED YET!")
            .setDescription(`**You haven't enabled ward system on this server yet.**\n*Run \`${prefix}setup -> economical ward system.\` to enabled ward logging!*`)
            message.channel.send(nowardenabled);
           }
          });
      break;
      case "4":
        let sql4 = "UPDATE `economy_ward` SET `channelid` = " + 0 + " WHERE `guildId` = " + message.guild.id;
        sql.query(sql4);
        const economyReset = new Discord.MessageEmbed()
        .setColor("#46c300")
        .setTitle("<:checkvector:869193650184269834> WARD RESERT SUCCESS!")
        .setDescription(`**Successfully Resetted \`ECONOMY WARD\` System**\n*You can set a new channel settings with \`${prefix}setup -> economical ward.\`*`)
        message.channel.send(economyReset);
      break;
      case "5":
        let sqlee5 = "UPDATE `economy_ward` SET `enabled` = " + 1 + " WHERE `guildId` = " + message.guild.id;
        sql.query(sqlee5);
        const economyenable = new Discord.MessageEmbed()
        .setColor("#46c300")
        .setTitle("<:checkvector:869193650184269834> WARD ENABLED SUCCESS!")
        .setDescription(`**Successfully Enabled \`ECONOMY WARD\` System**\n*You can set a channel settings with \`${prefix}setup -> economical ward.\`*`)
        message.channel.send(economyenable);
        break;
        case "6":
          let sqled5 = "UPDATE `economy_ward` SET `enabled` = " + 0 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sqled5);
          const economydisable = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> WARD DISABLED SUCCESS!")
          .setDescription(`**Successfully Disabled \`ECONOMY WARD\` System**\n*You can set a enable ward settings with \`${prefix}setup -> economical ward.\`*`)
          message.channel.send(economydisable);
          break;
      default:
        message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
      break;
    }
  }).catch(error => {
    //console.log(error);
    return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**")
 })
 })
}


/**
 * @rankingsystem FINISHED
 */
 function rankingsystem(){
  let rembed = new MessageEmbed()
  .setColor(config.black)
  .setTitle("What do u want to do?")
  .setDescription(`
  **1.** \`Enable Ranking\` - *Enables the Ranking system for the guild*
  **2.** \`Disable Ranking\` - *Disables the Ranking system for the guild*
  **3.** \`Change Background\` - *Changes the Background of the Rankcard*
  **4.** \`Reset Everything\` - *Resets all settings for the Ranking System*
  `)
  .setThumbnail(config.avatarUrl)
  .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
   message.reply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
          let sqlee5 = "UPDATE `ranking` SET `enabled` = " + 1 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sqlee5);
          const rankingenable = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> RANK SYSTEM ENABLED SUCCESS!")
          .setDescription(`**Successfully Enabled \`RANKING SYSTEM\`**\n*You can disable this settings with \`${prefix}setup -> advance ranking system.\`*`)
          message.channel.send(rankingenable);
        break;
        case "2":
          let sqld3 = "UPDATE `ranking` SET `enabled` = " + 0 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sqld3);
          const rankingdisable = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> RANK SYSTEM DISABLE SUCCESS!")
          .setDescription(`**Successfully Disabled \`RANKING SYSTEM\`**\n*You can enable this settings with \`${prefix}setup -> advance ranking system.\`*`)
          message.channel.send(rankingdisable);
        break;
        case "3":
          let rembed = new MessageEmbed()
          .setColor(config.black)
          .setTitle("So tell me what you want to do?")
          .setDescription(`
          **1.** \`Change Background\` - *Change the image background of rank card*
          **2.** \`Disable Card Embed\` - *Disable the embed of the rank card*
          **3.** \`Enable Card Embed\` - *Enable the embed of the rank card*
          `)
          .setThumbnail(config.avatarUrl)
          .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
          var url;
          message.reply(rembed).then(msg => {
          msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
             switch(collected.first().content.toString()){
                case "1":
                  const enterRbg = new Discord.MessageEmbed()
                  .setColor("#0082ea")
                  .setTitle(":park: ENTER BACKGROUND IMAGE!")
                  .setDescription(`*Please enter your background **Image** or **Url***`)
                  message.lineReply(enterRbg).then(msg => {
                  msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{     
                  function attachIsImage(msgAttach) {
                    url = msgAttach.url;
                    //True if this url is a png image.
                    return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                    url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                    url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                  }
                  if (collected.first().attachments.size > 0) {
                  if (collected.first().attachments.every(attachIsImage)){
                    function saveImageToDisk(url, path) {
                      var fullUrl = url
                      var localPath = fs.createWriteStream(path)
                      var request = https.get(fullUrl, function (response) {
                        response.pipe(localPath)
                      })
                    }
                    saveImageToDisk(" " + url + " ", "./lib/img/" + Date.now() + ".png") //saves the image to local storage
                    let sqlrankbg = "UPDATE `ranking` SET `backgroundimage` = '" + url + "' WHERE guildId = " + message.guild.id;
                    var query = sql.query(sqlrankbg, function(err, result) {
                    const rankbgsuccess = new Discord.MessageEmbed()
                    .setColor("#46c300")
                    .setTitle("<:checkvector:869193650184269834> BACKGROUND IMAGE SUCCESS!")
                    .setDescription(`**Successfully changed your rank \`BACKGROUND IMAGE\`**\n*Please do **not** delete your Image from the Channel!\nRun \`${prefix}setup -> advance ranking system.\` to change the background Image*`)
                    message.channel.send(rankbgsuccess);  
                     });
                   }
                   else{
                    message.lineReply("<:xvector:869193619318382602> **| Hmmm I Could not set the image as background**")
                  }
                 }
                 else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                  let sqlrankurlbg = "UPDATE `ranking` SET `backgroundimage` = '" + collected.first().content + "' WHERE guildId = " + message.guild.id;
                  var query = sql.query(sqlrankurlbg, function(err, result) {
                  const Rankbgsuccess = new Discord.MessageEmbed()
                  .setColor("#46c300")
                  .setTitle("<:checkvector:869193650184269834> BACKGROUND IMAGE SUCCESS!")
                  .setDescription(`**Successfully changed your rank \`BACKGROUND IMAGE\`**\nRun \`${prefix}setup -> advance ranking system.\` to change the background Image*`)
                  message.channel.send(Rankbgsuccess);
                  });
                  }
                  }).catch(error=>{
                    console.log(error)
                    return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                  });
                  });
               break;
               case "2":
                let sqlRenbedD = "UPDATE `ranking` SET `embedEnable` = " + 0 + " WHERE `guildId` = " + message.guild.id;
                sql.query(sqlRenbedD);
                const cardEmbedD = new Discord.MessageEmbed()
                .setColor("#46c300")
                .setTitle("<:checkvector:869193650184269834> EMBED DISABLE SUCCESS!")
                .setDescription(`**Successfully Disable \`RANK CARD EMBED\`**\n*You can enable the embed with \`${prefix}setup -> advance ranking system.\`*`)
                message.channel.send(cardEmbedD);
                break;
                case "3":
                let sqlRenbedE = "UPDATE `ranking` SET `embedEnable` = " + 1 + " WHERE `guildId` = " + message.guild.id;
                sql.query(sqlRenbedE);
                const cardEmenable = new Discord.MessageEmbed()
                .setColor("#46c300")
                .setTitle("<:checkvector:869193650184269834> EMBED ENABLED SUCCESS!")
                .setDescription(`**Successfully Enabled \`RANK CARD EMBED\`**\n*You can disable the embed with \`${prefix}setup -> advance ranking system.\`*`)
                message.channel.send(cardEmenable);
                break;
            }
          });
        })
        break;
        case "4":
            let RankBackground = "lib/img/rank.jpg";
            let sqlRSystem = "UPDATE `ranking` SET `enabled` = " + 0 + " WHERE `guildId` = " + message.guild.id;
            sql.query(sqlRSystem);
            let sqlRembedCard = "UPDATE `ranking` SET `embedEnable` = " + 1 + " WHERE `guildId` = " + message.guild.id;
            sql.query(sqlRembedCard);
            let sqlRbgImg = "UPDATE `ranking` SET `backgroundimage` = '" + RankBackground + "' WHERE `guildId` = " + message.guild.id;
            sql.query(sqlRbgImg);
            let allmembers = message.guild.members.cache.keyArray();
            for (let i = 0; i < allmembers.length; i++) {
              try{
                let rankuser = message.guild.members.cache.get(allmembers[i]).user;
                const key = `${message.guild.id}-${rankuser.id}`;
                client.points.set(key, 0, `level`); //set level to 0
                client.points.set(key, 0, `points`); //set the points to 0
                client.points.set(key, 500, `neededpoints`) //set neededpoints to 0 for beeing sure
                client.points.set(key, "", `oldmessage`); //set old message to 0
              }catch (err) {
                const Anerror = new Discord.MessageEmbed()
                .setColor("#e63064")
                .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
                .setDescription(`\`\`\`${err}\`\`\``)
                .setFooter("Error in code: Report this error to kotlin0427")
                .setTimestamp();
                return message.lineReply(Anerror);
              }
            }
            const rankResert = new Discord.MessageEmbed()
            .setColor("#46c300")
            .setTitle("<:checkvector:869193650184269834> RANKING SYSTEM RESERTED!")
            .setDescription(`**Successfully Resetted \`RANKING SYSTEM\`** for the guild\n*You can add new settings with \`${prefix}setup -> advance ranking system.\`*`)
            message.lineReply(rankResert);
        break;
        default:
          message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
  })

})
}


/**
 * @APPLYSYSTEM NOT FINISHED
 */
 function applysystem(){
  let rembed = new MessageEmbed()
    .setTitle("What do u want to do?")
    .setDescription(`
    **1.** \`Create Application\` - *Create ONE application aystem*
    **2.** \`Edit Application\` - *Edit already existing application aystem*
    **3.** \`Reset Application\` - *Reset settings for the application system*
    `)
    .setColor(config.black)
    .setThumbnail(config.avatarUrl)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    message.reply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
      case "1":
        let color = "#00f7ff";
        let desc;
        let userid = message.author.id;
        message.guild.channels.create("📑 | Applications", {
            type: "category",
        }).then(ch=>{
            ch.guild.channels.create("✔️| finished-applies", {
                type: "text",
                topic: "React to the Embed, to start the application process",
                parent: ch.id,
                permissionOverwrites: [
                    {
                      id: ch.guild.id,
                      deny: ["VIEW_CHANNEL"]
                    }
                ]
            }).then(ch=> {
              client.apply.set(ch.guild.id, ch.id, "f_channel_id")
            })
            ch.guild.channels.create("✅|apply-here", {
                type: "text",
                topic: "React to the Embed, to start the application process",
                parent: ch.id,
                permissionOverwrites: [
                    {
                      id: ch.guild.id,
                      allow: ["VIEW_CHANNEL"],
                      deny: ["SEND_MESSAGES"]
                    }
                ]
            }).then(ch=> {
                let embed = new Discord.MessageEmbed()
                .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setColor("00f7ff")
                .setTimestamp();
                 message.channel.send(embed.setTitle(":art: ENTER EMBED COLOR!").setDescription("Please enter the type of color you want for the embed.\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #00f7ff)*")).then(msg =>{
                    msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let content = collected.first().content;
                        if(!content.startsWith("#") && content.length !== 7){
                            message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                        }
                        else {
                            if(isValidColor(content)){
                                color = content;
                            }
                            else{
                              message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE USING `#00f7ff`!**");
                            }
                        }
                        function isValidColor(str) {
                            return str.match(/^#[a-f0-9]{6}$/i) !== null;
                        }
                    }).catch(error=>{
                        console.log(error)
                        return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
                    })
                    .then(something=>{
                        message.channel.send(embed.setTitle(":envelope_with_arrow: ENTER EMBED TEXT").setDescription("Like what do you want the members to apply for?\nExample: **Apply to be a virtual assistant** or something like that.")).then(msg =>{
                            msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                                desc = collected.first().content;
                                let setupembed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                                    .setColor(color)
                                    .setDescription(desc)
                                    .setTitle("Application for: " + message.guild.name + "")
                                    .setTimestamp()
                                    .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                                    ch.send(setupembed).then(msg=>{
                                    msg.react("✅")
                                    client.apply.set(msg.guild.id, msg.channel.id, "channel_id")
                                    });
                                    let counter = 0;
                                    client.apply.set(msg.guild.id, [{"1":"DEFAULT MESSAGE"}], "QUESTIONS")
                                    ask_which_qu();
                                    function ask_which_qu(){
                                        counter++;
                                        if(counter === 25) {
                                            message.lineReply(new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true})).setColor("RED").setAuthor("MAXIMUM AMOUNT OF QUESTIONS REACHED!", "https://media.discordapp.net/attachments/711910361133219903/881598390142660618/ximes.png"))
                                            return ask_addrole();
                                        }
                                        message.channel.send(embed.setTitle(`What should be the **${counter}** Question?`).setDescription("Enter **finish**, if you are finished with your Questions!")).then(msg=>{
                                            msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 60000, errors: ["TIME"]}).then(collected => {
                                                if(collected.first().content.toLowerCase() === "finish") {
                                                    return ask_addrole();
                                                }
                                                switch(counter){
                                                    case 1: { client.apply.set(msg.guild.id, [], "QUESTIONS"); client.apply.push(msg.guild.id, {"1": collected.first().content}, "QUESTIONS");}break;
                                                    case 2: client.apply.push(msg.guild.id, {"2": collected.first().content}, "QUESTIONS");break;
                                                    case 3: client.apply.push(msg.guild.id, {"3": collected.first().content}, "QUESTIONS");break;
                                                    case 4: client.apply.push(msg.guild.id, {"4": collected.first().content}, "QUESTIONS");break;
                                                    case 5: client.apply.push(msg.guild.id, {"5": collected.first().content}, "QUESTIONS");break;
                                                    case 6: client.apply.push(msg.guild.id, {"6": collected.first().content}, "QUESTIONS");break;
                                                    case 7: client.apply.push(msg.guild.id, {"7": collected.first().content}, "QUESTIONS");break;
                                                    case 8: client.apply.push(msg.guild.id, {"8": collected.first().content}, "QUESTIONS");break;
                                                    case 9: client.apply.push(msg.guild.id, {"9": collected.first().content}, "QUESTIONS");break;
                                                    case 10: client.apply.push(msg.guild.id, {"10": collected.first().content}, "QUESTIONS");break;
                                                    case 11: client.apply.push(msg.guild.id, {"11": collected.first().content}, "QUESTIONS");break;
                                                    case 12: client.apply.push(msg.guild.id, {"12": collected.first().content}, "QUESTIONS");break;
                                                    case 13: client.apply.push(msg.guild.id, {"13": collected.first().content}, "QUESTIONS");break;
                                                    case 14: client.apply.push(msg.guild.id, {"14": collected.first().content}, "QUESTIONS");break;
                                                    case 15: client.apply.push(msg.guild.id, {"15": collected.first().content}, "QUESTIONS");break;
                                                    case 16: client.apply.push(msg.guild.id, {"16": collected.first().content}, "QUESTIONS");break;
                                                    case 17: client.apply.push(msg.guild.id, {"17": collected.first().content}, "QUESTIONS");break;
                                                    case 18: client.apply.push(msg.guild.id, {"18": collected.first().content}, "QUESTIONS");break;
                                                    case 19: client.apply.push(msg.guild.id, {"19": collected.first().content}, "QUESTIONS");break;
                                                    case 20: client.apply.push(msg.guild.id, {"20": collected.first().content}, "QUESTIONS");break;
                                                    case 21: client.apply.push(msg.guild.id, {"21": collected.first().content}, "QUESTIONS");break;
                                                    case 22: client.apply.push(msg.guild.id, {"22": collected.first().content}, "QUESTIONS");break;
                                                    case 23: client.apply.push(msg.guild.id, {"23": collected.first().content}, "QUESTIONS");break;
                                                    case 24: client.apply.push(msg.guild.id, {"24": collected.first().content}, "QUESTIONS");break;
                                                }
                                                ask_which_qu();
                                            }).catch(error=>{
                                                console.log(error)
                                                return message.lineReply("<:thinkingface:867897965380108288> **| HMM IT SEEMS YOUR TIME RAN OUT!**")
                                            })
                                        })
                                    }
                                    function ask_addrole(){
                                        message.channel.send(embed.setTitle(`DO YOU WANT TO ADD ROLE IF SOMEONE APPLIES?`).setDescription("Enter **no**, if you don't want to add a role\n\nIF you want role then just ping the Role you want")).then(msg=>{
                                            msg.channel.awaitMessages(m => m.author.id === userid, {max: 1, time: 60000, errors: ["TIME"]}).then(async collected => {
                                                if(collected.first().content.toLowerCase() === "no") {
                                                  const appdone = new Discord.MessageEmbed()
                                                  .setColor("#f04949")
                                                  .setTitle("<:checkvector:869193650184269834> APPLICATION SYSTEM READY 2 USE!")
                                                  .setDescription(`*You can edit questions by running \`${prefix}setup -> creative application system\`\nNOTE: Only **one** guild per setup. which means you can have two setup.*`)
                                                  .setFooter("application by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                                                  .setTimestamp();
                                                  return message.lineReply(appdone);
                                                }
                                                else{
                                                    let role = collected.first().mentions.roles.map(role => role.id).join(" ");
                                                    if(!role){
                                                    const NoRoleAppDone = new Discord.MessageEmbed()
                                                    .setColor("00f7ff")
                                                    .setTitle("<:xvector:869193619318382602> I COULD NOT FIND THE ROLE!")
                                                    .setDescription(`*Still though Your application is ready 2 use\n You can edit questions by running \`${prefix}setup -> creative application system\`\n Note: Only **one** guild per setup. which means you can't have two setup.*`)
                                                    .setFooter("Application by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                                                    .setTimestamp();
                                                    return message.lineReply(NoRoleAppDone);
                                                    }  
                                                    let guildrole = message.guild.roles.cache.get(role)
                                                    let botrole = message.guild.roles.cache.get(message.guild.me.roles.highest.id)
                                                    if(guildrole.position > botrole.position){
                                                      const CanUseRoleDone = new Discord.MessageEmbed()
                                                      .setColor("00f7ff")
                                                      .setTitle("<:xvector:869193619318382602> I CAN'T ACCESS THAT ROLE!")
                                                      .setDescription(`
                                                      *That role is off a higher status so I'm using **NO** role*
                                                      *You can change this settings with \`${prefix}setup -> creative application system\`*
                                                      *You can also edit questions by running \`${prefix}setup -> creative application system\`*
                                                      *NOTE: Only **one** guild per setup. which means you can have two setup.*
                                                      `)
                                                      .setFooter("Application by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                                                      .setTimestamp();
                                                      message.lineReply(CanUseRoleDone);
                                                    }
                                                    client.apply.set(message.guild.id, role, "TEMP_ROLE")
                                                    const appdone = new Discord.MessageEmbed()
                                                    .setColor("#00f7ff")
                                                    .setTitle("<:checkvector:869193650184269834> APPLICATION SYSTEM READY 2 USE!")
                                                    .setDescription(`*You can edit questions by running \`${prefix}setup -> creative application system\`\nNOTE: Only **one** guild per setup. which means you can have two setup.*`)
                                                    .setFooter("Application by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                                                    .setTimestamp();
                                                    return message.lineReply(appdone);
                                                }
                                            }).catch(error=>{
                                                console.log(error)
                                               return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
                                            })
                                        })
                                    }
                                }).catch(error=>{
                                    console.log(error)
                                    return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**")
                                })
                        })
                    })
                })
            })
        })
        break;
        case "2":
        let rrembed = new MessageEmbed()
        .setTitle("What do u want to do?")
        .setDescription(`
        **1.** \`Accept Message\` - *Let's you edit the accept message!*
        **2.** \`Deny Message\` - *You can edit the deny message!*
        **3.** \`Question\` - *Edit one question out of all questions*
        **4.** \`Edit Role\` - *Edit the application Role*
        **5.** \`Add Question\` - *Add a question to the questions*
        `)
        .setColor(config.black)
        .setThumbnail(config.avatarUrl)
        .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
        message.reply(rrembed).then(msg => {
        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
              switch(collected.first().content.toString()){
                case "1":
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#00f7ff")
                .setTitle(":mailbox_with_mail: ENTER NEW ACCEPT MESSAGE")
                .setDescription("*Enter the new accept message you want for the application*")
                ).then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                client.apply.set(message.guild.id, collected.first().content, "accept")
                return message.lineReply(new Discord.MessageEmbed()
                .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setColor("#12e36c")
                .setTitle(":mailbox_with_mail: CHANGED ACCEPT MESSAGE!")
                .setDescription(`*Successfully changed the application \`ACCEPT MESSAGE\`\nYou can edit this settings with \`${prefix}setup -> creative application system\`*`)
                )
                }).catch(error=>{
                console.log(error)
                return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
                })
                })
            break;
            case "2":
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#00fff7")
                .setTitle(":mailbox_with_mail: ENTER NEW DENY MESSAGE")
                .setDescription("*Enter the new deny message you want for the application*")
                ).then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                client.apply.set(message.guild.id, collected.first().content, "deny")
                return message.reply(new Discord.MessageEmbed()
                .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setColor("GREEN")
                .setTitle(":mailbox_with_mail: CHANGED DENY MESSAGE!")
                .setDescription(`*Successfully changed the application \`DENY MESSAGE\`\nYou can edit this settings with \`${prefix}setup -> creative application system\`*`)
                )
                }).catch(error=>{
                console.log(error)
                return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
                });
                });
            break;
            case "3":
                let Questions = client.apply.get(message.guild.id, "QUESTIONS");
                let embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setColor("#00ffcf")
                .setTitle(":mailbox_with_mail: CHOOSE THE QUESTION TO EDIT")
                .setFooter("PICK YOUR INDEX NUMBER TO EDIT THE MSG", message.guild.iconURL({dynamic: true}))
                for(let i = 0; i < Questions.length; i++){
                  try{
                  embed.addField("**"+Object.keys(Questions[i])+".** ",Object.values(Questions[i]))
                  }catch (e){
                  console.log(e)
                  }
                }
                message.channel.send(embed).then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors:["TIME"]}).then(collected=>{
                let arr = client.apply.get(message.guild.id, "QUESTIONS");
                if(arr.length >= Number(collected.first().content)){
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#00ffd7")
                .setTitle(":envelope_with_arrow: ENTER YOUR NEW QUESTION")
                .setDescription("*What should be the new Question?*")
                ).then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected => {
                let index = Number(collected.first().content);
                var obj;
                switch(Number(index)){
                case 1: obj =  {"1": collected.first().content};break;
                case 2: obj =  {"2": collected.first().content};break;
                case 3: obj =  {"3": collected.first().content};break;
                case 4: obj =  {"4": collected.first().content};break;
                case 5: obj =  {"5": collected.first().content};break;
                case 6: obj =  {"6": collected.first().content};break;
                case 7: obj =  {"7": collected.first().content};break;
                case 8: obj =  {"8": collected.first().content};break;
                case 9: obj =  {"9": collected.first().content};break;
                case 10: obj =  {"10": collected.first().content};break;
                case 11: obj =  {"11": collected.first().content};break;
                case 12: obj =  {"12": collected.first().content};break;
                case 13: obj =  {"13": collected.first().content};break;
                case 14: obj =  {"14": collected.first().content};break;
                case 15: obj =  {"15": collected.first().content};break;
                case 16: obj =  {"16": collected.first().content};break;
                case 17: obj =  {"17": collected.first().content};break;
                case 18: obj =  {"18": collected.first().content};break;
                case 19: obj =  {"19": collected.first().content};break;
                case 20: obj =  {"20": collected.first().content};break;
                case 21: obj =  {"21": collected.first().content};break;
                case 22: obj =  {"22": collected.first().content};break;
                case 23: obj =  {"23": collected.first().content};break;
                case 24: obj =  {"24": collected.first().content};break;
                }
                arr[ index-1 ] = obj;
                client.apply.set(message.guild.id, arr, "QUESTIONS")
                Questions = client.apply.get(message.guild.id, "QUESTIONS");
                let new_embed = new Discord.MessageEmbed()
                .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setColor("#00ffe7")
                .setTitle("NEW QUESTIONS")
                .setTimestamp()
                for(let i = 0; i < Questions.length; i++){
                try{
                new_embed.addField("**"+Object.keys(Questions[i])+".** ",Object.values(Questions[i]))
                }catch{}
                }
                message.channel.send(new_embed);
                }).catch(error=>{
                console.log(error)
                return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
                })
                })
                }else{
                message.lineReply(new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(":mailbox_with_mail: QUESTION DOES NOT EXIST")
                .setDescription("*Hmmm, that Question does not exist! Here are all Questions*")
                )
                return message.channel.send(embed);
                }
                })
                .catch(e=>{
                  return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT! CANCELLED**");
                })
                })
            break;
            case "4":
              const EditNewRole = new Discord.MessageEmbed()
              .setColor("00f7ff")
              .setTitle(":pushpin: PING THE NEW ROLE!")
              .setDescription(`
              *What should be the new role?
              Just ping the new role you want*
              `)
                message.channel.send(EditNewRole).then(msg=>{
                    msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        if(!collected.first().mentions.roles) return message.lineReply("<:thinkingface:867897965380108288> You did not ping a role do retry!")
                        let roleid = collected.first().mentions.roles.map(role => role.id)[0];
                        let guildrole = message.guild.roles.cache.get(roleid)
                        let botrole = message.guild.roles.cache.get(message.guild.me.roles.highest.id)
                        if(guildrole.position >= botrole.position){
                          const CanUseRoleDone = new Discord.MessageEmbed()
                          .setColor("00f7ff")
                          .setTitle("<:xvector:869193619318382602> I CAN'T ACCESS THAT ROLE!")
                          .setDescription(`
                          *That role is off a higher status so I'm not able to edit it*
                          You can place my role above other roles that you want me to manage.
                          `)
                          return message.channel.send(CanUseRoleDone);
                        }
                        client.apply.set(message.guild.id, roleid, "TEMP_ROLE")
                        const CanUseRoleDone = new Discord.MessageEmbed()
                        .setColor("00f7ff")
                        .setTitle("<:checkvector:869193650184269834> TEMP ROLE HAS BEEN CHANGED")
                        .setDescription(`
                        *The temporary application role has been changed*\n*You can edit this settings with \`${prefix}setup -> creative application system\`*`)
                        .setFooter("Changed by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048, }))
                        .setTimestamp();
                        return message.lineReply(CanUseRoleDone);
                    }).catch(error=>{
                        console.log(error)
                        return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
                    })
                })
            break;
            case "5":
                message.channel.send(new Discord.MessageEmbed()
                .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setColor("#ff0099")
                .setAuthor("ADD A QUESTION", message.author.displayAvatarURL({dynamic:true}))
                .setDescription("What Question do you want to add")
                ).then(msg=>{
                    msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                        let Questions = client.apply.get(message.guild.id, "QUESTIONS")
                        let obj;
                        switch(Questions.length+1){
                            case 1: obj =  {"1": collected.first().content};break;
                            case 2: obj =  {"2": collected.first().content};break;
                            case 3: obj =  {"3": collected.first().content};break;
                            case 4: obj =  {"4": collected.first().content};break;
                            case 5: obj =  {"5": collected.first().content};break;
                            case 6: obj =  {"6": collected.first().content};break;
                            case 7: obj =  {"7": collected.first().content};break;
                            case 8: obj =  {"8": collected.first().content};break;
                            case 9: obj =  {"9": collected.first().content};break;
                            case 10: obj =  {"10": collected.first().content};break;
                            case 11: obj =  {"11": collected.first().content};break;
                            case 12: obj =  {"12": collected.first().content};break;
                            case 13: obj =  {"13": collected.first().content};break;
                            case 14: obj =  {"14": collected.first().content};break;
                            case 15: obj =  {"15": collected.first().content};break;
                            case 16: obj =  {"16": collected.first().content};break;
                            case 17: obj =  {"17": collected.first().content};break;
                            case 18: obj =  {"18": collected.first().content};break;
                            case 19: obj =  {"19": collected.first().content};break;
                            case 20: obj =  {"20": collected.first().content};break;
                            case 21: obj =  {"21": collected.first().content};break;
                            case 22: obj =  {"22": collected.first().content};break;
                            case 23: obj =  {"23": collected.first().content};break;
                            case 24: obj =  {"24": collected.first().content};break;
                        }
                        client.apply.push(message.guild.id, obj, "QUESTIONS")
                        message.reply(new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setDescription("Successfully added your Question!"))
                        Questions = client.apply.get(message.guild.id, "QUESTIONS");
                        let embed = new Discord.MessageEmbed()
                        .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                        .setColor("#00ffe7")
                        .setTitle("NEW QUESTIONS")
                        .setFooter(message.guild.name, message.guild.iconURL({dynamic: true}))
                        .setTimestamp()
                        for(let i = 0; i < Questions.length; i++){
                            try{
                              embed.addField("**"+Object.keys(Questions[i])+".** ",Object.values(Questions[i]))
                            }catch (e){
                            console.log(e)
                            }
                        }
                        message.channel.send(embed);
                    }).catch(error=>{
                        console.log(error)
                        return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**");
                    })
                })
            break;
            default:
              message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
          break;

        }
        })
      })
          break;
          case "3":
            client.apply.set(message.guild.id, {
              "channel_id": "",
              "f_channel_id": "",
              "QUESTIONS": [{"1":"DEFAULT MESSAGE"}],
              "TEMP_ROLE": "",
              "accept": "Your application was accepted!",
              "deny": "Your application was denied!"
             })
             const AppResert = new Discord.MessageEmbed()
             .setColor("#46c300")
             .setTitle("<:checkvector:869193650184269834> APPLICATION RESERT SUCCESS!")
             .setDescription(`**Successfully Resetted \`APPLICATION SYSTEM\` System**\n*You can set new settings with \`${prefix}setup -> creative application system.\`*`)
             .setFooter("Reseted by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
             .setTimestamp();
             message.lineReply(AppResert);
             break;
        default:
          break;
      }
    })
  })
}

/**
 * @welcomesystem FINISHED
 */
function welcomesystem(){

    let rembed = new MessageEmbed()
    .setColor(config.black)
    .setAuthor("What do you want to do?", `${message.guild.iconURL()}`)
    .setDescription(`
    **1.** \`Welcome System\` - *Creates ONE Welcome System*
    **2.** \`Leave System\` - *Creates ONE Leave System*
    **3.** \`Set Welcome Channel\` - *Set a default welcome channel*
    **4.** \`Set Leave Channel\` - *Set a default leave channel*
    **5.** \`Reset-Both\` - *Resets settings for Default Welcome & Leave*
    **6.** \`Enable Welcome/leave\` - *Enable default welcome/leave*
    **7.** \`Disable Welcome/leave\` - *Disable default welcome/leave*
    **8.** \`Check Welcome Channel\` - *Check default welcome channel.*
    **9.** \`Check leave Channel\` - *Check default leave channel.*
    **10.** \`Change welcome Message\` - *Change default welcome message.*
    `)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    .setThumbnail(config.avatarUrl)
    message.lineReply(rembed).then(msg => {
    let parent = false;
    if(msg.channel.parent) parent = msg.channel.parent.id;
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
      switch(collected.first().content.toString()){
        case "1":
        _welcome();
        break;
        case "2":
        _leave();
        break;
        case "3":
          client.settings.ensure(message.guild.id, { "defaultWelcomeMsg": "Thank you for joining us\nWe're happy to have you with us" })
          const pingwelc = new Discord.MessageEmbed()
          .setColor("#0082ea")
          .setTitle(":pushpin: ENTER WELCOME CHANNEL!")
          .setDescription("**You can ping your welcome channel now.**")
          message.lineReply(pingwelc).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
              if (!message.member.hasPermission("MANAGE_CHANNELS")) {
                const Nopermission = new Discord.MessageEmbed()
                .setColor("#f04949")
                .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
                .setDescription(`**You don't have permissions to set welcome channel!**`)
                message.channel.send(Nopermission);
               }
               let channel = collected.first().mentions.channels.first();
               if (!channel) {
                return message.lineReply("<:thinkingface:867897965380108288> **| Hmm, You have to enter a channel!**");
               }
               const sqlquery = "SELECT channelid AS res FROM welcome WHERE guildId = " + message.guild.id;
               sql.query(sqlquery, function (error, results, fields) {
                if (error) return console.log(error);
                if (results[0]) {
                 const update = "UPDATE welcome SET channelid = " + channel.id + " WHERE guildId = " + message.guild.id;
                 sql.query(update, function (error, results, fields) {
                  if (error) console.log(error);
                  const welluccess = new Discord.MessageEmbed()
                  .setColor("#46c300")
                  .setTitle("<:checkvector:869193650184269834> SUCCESS!")
                  .setDescription(`**Successfully updated default welcome channel\nNew welcome channel is** ${channel}\n*Run \`${prefix}setup -> Welcome & Leave System \` to enable this channel!*`)
                  message.channel.send(welluccess);
                  let bg = sql.query("SELECT background FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                  Canvas.registerFont("./lib/fonts/FengardoNeue_Regular.otf", {family: "FengardoNeue",});
                  const image = `${result[0].background}`;
                  (async () => {
                  const canvas = Canvas.createCanvas(1772, 633);
                  const ctx = canvas.getContext("2d");
                  const background = await Canvas.loadImage(image);
                  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                  ctx.strokeStyle = "#f2f2f2";
                  ctx.strokeRect(0, 0, canvas.width, canvas.height);
                  var textString3 = `${message.author.username}`;
                  if (textString3.length >= 14) {
                  ctx.font = 'bold 150px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString3, 720, canvas.height / 2 + 20);
                  } else {
                  ctx.font = 'bold 200px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString3, 720, canvas.height / 2 + 25);
                  }
                  var textString2 = `#${message.author.discriminator}`;
                  ctx.font = 'bold 40px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString2, 730, canvas.height / 2 + 62);
                  var textString4 = `Member #${message.guild.memberCount}`;
                  ctx.font = 'bold 60px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString4, 720, canvas.height / 2 + 120);
                  var textString4 = `${message.guild.name}`;
                  ctx.font = 'bold 70px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString4, 720, canvas.height / 2 - 140);
                  ctx.beginPath();
                  ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
                  ctx.closePath();
                  ctx.clip();
                  const avatar = await Canvas.loadImage(message.author.displayAvatarURL({format: "jpg",size: 2048,}));
                  ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
                  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
                  const defaultembed = new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setTimestamp()
                  .setFooter(`${message.guild.name}`, message.guild.iconURL({dynamic: true,format: "png",}))
                  .setTitle("<:xchannel:887869003412947024> DEFAULT WELCOME CHANNEL & MESSAGE!")
                  .setDescription(client.settings.get(message.guild.id, "defaultWelcomeMsg"))
                  .setImage("attachment://welcome.png")
                  .attachFiles(attachment);
                  channel.send(defaultembed);
                })();
                });
              });
                } else {
                 const insert1 = "INSERT INTO `welcome` (`guildId`, `channelid`,  `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`) VALUES (" + message.guild.id + ", " + channel.id + ", '0', '0', '1', 'lib/img/welcome.png', '#ffb101', '#ffb101', '#ffb101', '#ffb101', '#ffb101', '#ffb101');";
                 sql.query(insert1, function (error, results, fields) {
                  if (error) console.log(error);
                  const wellsuccess1 = new Discord.MessageEmbed()
                  .setColor("#46c300")
                  .setTitle("<:checkvector:869193650184269834> Success!")
                  .setDescription(`**Success! New channel for welcome messages is** ${channel}`)
                  message.channel.send(wellsuccess1);
                  let bg = sql.query("SELECT background, message FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                  Canvas.registerFont("./lib/fonts/FengardoNeue_Regular.otf", {family: "FengardoNeue",});
                  const image = `${result[0].background}`;
                  (async () => {
                  const canvas = Canvas.createCanvas(1772, 633);
                  const ctx = canvas.getContext("2d");
                  const background = await Canvas.loadImage(image);
                  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                  ctx.strokeStyle = "#f2f2f2";
                  ctx.strokeRect(0, 0, canvas.width, canvas.height);
                  var textString3 = `${message.author.username}`;
                  if (textString3.length >= 14) {
                  ctx.font = 'bold 150px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString3, 720, canvas.height / 2 + 20);
                  } else {
                  ctx.font = 'bold 200px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString3, 720, canvas.height / 2 + 25);
                  }
                  var textString2 = `#${message.author.discriminator}`;
                  ctx.font = 'bold 40px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString2, 730, canvas.height / 2 + 62);
                  var textString4 = `Member #${message.guild.memberCount}`;
                  ctx.font = 'bold 60px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString4, 720, canvas.height / 2 + 120);
                  var textString4 = `${message.guild.name}`;
                  ctx.font = 'bold 70px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString4, 720, canvas.height / 2 - 140);
                  ctx.beginPath();
                  ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
                  ctx.closePath();
                  ctx.clip();
                  const avatar = await Canvas.loadImage(message.user.displayAvatarURL({format: "jpg",size: 2048,}));
                  ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
                  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
                  const Newdefaultembed = new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setTimestamp()
                  .setFooter(`${message.guild.name}`, message.guild.iconURL({dynamic: true,format: "png",}))
                  .setTitle("<:xchannel:887869003412947024> DEFAULT WELCOME CHANNEL & MESSAGE!")
                  .setDescription(client.settings.get(message.guild.id, "defaultWelcomeMsg"))
                  .setImage("attachment://welcome.png")
                  .attachFiles(attachment);
                  channel.send(Newdefaultembed);
                  })();
                 });
                 });
                }
               });
            })
          })
        break;
        case "4":
          const pingleavec = new Discord.MessageEmbed()
          .setColor("#0082ea")
          .setTitle(":pushpin: ENTER LEAVE CHANNEL!")
          .setDescription("You can ping your leave channel now.")
          message.lineReply(pingleavec).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
              if (!message.member.hasPermission("MANAGE_CHANNELS")) {
                const Nopermission = new Discord.MessageEmbed()
                .setColor("#f04949")
                .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
                .setDescription(`You don't have permissions to set leave channel!`)
                message.channel.send(Nopermission);
               }
               let channel = collected.first().mentions.channels.first();
               if (!channel) {
                return message.lineReply("<:thinkingface:867897965380108288> **| Hmm, You have to enter a channel!**");
               }
               const queryleave = "SELECT `channelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
               sql.query(queryleave, function (error, results, fields) {
                if (error) return console.log(error);
                if (results[0]) {
                 const updateleave = "UPDATE `leave` SET `channelid` = " + channel.id + " WHERE `guildId` = " + message.guild.id;
                 sql.query(updateleave, function (error, results, fields) {
                  if (error) console.log(error);
                  const leaveuccess = new Discord.MessageEmbed()
                  .setColor("#46c300")
                  .setTitle("<:checkvector:869193650184269834> SUCCESS!")
                  .setDescription(`**Successfully updated default leave channel\nNew leave channel is** ${channel}\n*Run \`${prefix}setup -> Welcome & Leave System \` to enable this channel!*`)
                  message.channel.send(leaveuccess);
                  let leavebg = sql.query("SELECT background, message FROM `leave` WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                  (async () => {
                  Canvas.registerFont("./lib/fonts/FengardoNeue_Regular.otf", {family: "FengardoNeue",});
                  const Leaveimage = `${result[0].background}`;
                  const canvas = Canvas.createCanvas(1772, 633);
                  const ctx = canvas.getContext("2d");
                  const background = await Canvas.loadImage(Leaveimage);
                  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                  ctx.strokeStyle = "#f2f2f2";
                  ctx.strokeRect(0, 0, canvas.width, canvas.height);
                  var textString3 = `${message.author.username}`;
                  if (textString3.length >= 14) {
                  ctx.font = 'bold 150px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString3, 720, canvas.height / 2 + 20);
                  } else {
                  ctx.font = 'bold 200px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString3, 720, canvas.height / 2 + 25);
                  }
                  var textString2 = `#${message.author.discriminator}`;
                  ctx.font = 'bold 40px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString2, 730, canvas.height / 2 + 62);
                  var textString4 = `Member #${message.guild.memberCount}`;
                  ctx.font = 'bold 60px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString4, 720, canvas.height / 2 + 120);
                  var textString4 = `${message.guild.name}`;
                  ctx.font = 'bold 70px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString4, 720, canvas.height / 2 - 140);
                  ctx.beginPath();
                  ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
                  ctx.closePath();
                  ctx.clip();
                  const avatar = await Canvas.loadImage(message.author.displayAvatarURL({format: "jpg",size: 2048,}));
                  ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
                  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "goodbye.png");
                  const defaultembed = new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setTimestamp()
                  .setFooter(`${message.guild.name}`, message.guild.iconURL({dynamic: true,format: "png",}))
                  .setTitle("<:xchannel:887869003412947024> DEFAULT LEAVE CHANNEL & MESSAGE!")
                  .setDescription(result[0].message)
                  .setImage("attachment://goodbye.png")
                  .attachFiles(attachment);
                  channel.send(defaultembed);
                })();
                });
              });
                } else {
                 const insert1 = "INSERT INTO `leave` (`guildId`, `message`, `channelid`, `CustomMessage`, `enabled`, `CustomEnabled`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`) VALUES (" + guild.id + ", "+ channel.id +", ':crying_cat_face: Good bye.. We hope to see you again.', ':crying_cat_face: Good bye.. We hope to see you again.', '0', '0', 'https://media.discordapp.net/attachments/711910361133219903/877887340947853372/goodbye.png?width=1440&height=514', '#ff4d4d', '#ff4d4d', '#ff4d4d', '#ff4d4d', '#ff4d4d', '#ff4d4d');";
                 sql.query(insert1, function (error, results, fields) {
                  if (error) console.log(error);
                  const leaveuccess1 = new Discord.MessageEmbed()
                  .setColor("#46c300")
                  .setTitle("<:checkvector:869193650184269834> Success!")
                  .setDescription(`Success! New channel for leave messages is ${channel}`)
                  message.channel.send(leaveuccess1);
                  let leavebg = sql.query("SELECT background, message FROM `leave` WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                  (async () => {
                  Canvas.registerFont("./lib/fonts/FengardoNeue_Regular.otf", {family: "FengardoNeue",});
                  const leaveimage = `${result[0].background}`;
                  const canvas = Canvas.createCanvas(1772, 633);
                  const ctx = canvas.getContext("2d");
                  const background = await Canvas.loadImage(leaveimage);
                  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                  ctx.strokeStyle = "#f2f2f2";
                  ctx.strokeRect(0, 0, canvas.width, canvas.height);
                  var textString3 = `${message.author.username}`;
                  if (textString3.length >= 14) {
                  ctx.font = 'bold 150px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString3, 720, canvas.height / 2 + 20);
                  } else {
                  ctx.font = 'bold 200px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString3, 720, canvas.height / 2 + 25);
                  }
                  var textString2 = `#${message.author.discriminator}`;
                  ctx.font = 'bold 40px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString2, 730, canvas.height / 2 + 62);
                  var textString4 = `Member #${message.guild.memberCount}`;
                  ctx.font = 'bold 60px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString4, 720, canvas.height / 2 + 120);
                  var textString4 = `${message.guild.name}`;
                  ctx.font = 'bold 70px "FengardoNeue"';
                  ctx.fillStyle = "#f2f2f2";
                  ctx.fillText(textString4, 720, canvas.height / 2 - 140);
                  ctx.beginPath();
                  ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
                  ctx.closePath();
                  ctx.clip();
                  const avatar = await Canvas.loadImage(message.author.displayAvatarURL({format: "jpg",size: 2048,}));
                  ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
                  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "goodbye.png");
                  const Newdefaultembed1 = new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setTimestamp()
                  .setFooter(`${message.guild.name}`, message.guild.iconURL({dynamic: true,format: "png",}))
                  .setTitle("<:xchannel:887869003412947024> DEFAULT LEAVE CHANNEL & MESSAGE!")
                  .setDescription(result[0].message)
                  .setImage("attachment://goodbye.png")
                  .attachFiles(attachment);
                  channel.send(Newdefaultembed1);
                  })();
                 });
                 });
                }
               });
            })
          })
        break;
        case "5":
          client.settings.set(message.guild.id, "Thank you for joining us\nWe're happy to have you with us", `defaultWelcomeMsg`);
          let sql1 = "UPDATE `welcome` SET `channelid` = " + 0 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql1);
          let sql2 = "UPDATE `leave` SET `channelid` = " + 0 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql2);
          const wellssuccess3 = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> SUCCESS!")
          .setDescription(`**Successfully Resetted Default \`WELCOME & LEAVE\` System**\n*You can set a new channel settings with \`${prefix}setup -> welcome & leave.\`*`)
          message.channel.send(wellssuccess3);
        break;
        case "6":
          let sql6 = "UPDATE `welcome` SET `enabled` = " + 1 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql6);
          let sql7 = "UPDATE `leave` SET `enabled` = " + 1 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql7);
          const welcome1 = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> SUCCESS!")
          .setDescription(`**Successfully Enabled \`WELCOME\` and \`LEAVE\` System**\n*You can disable the settings with \`${prefix}setup -> Welcome & Leave.\`*`)
          message.channel.send(welcome1);
          break;
          case "7":
          let sql11 = "UPDATE `welcome` SET `enabled` = " + 0 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql11);
          let sql12 = "UPDATE `leave` SET `enabled` = " + 0 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql12);
          const welcome2 = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> SUCCESS!")
          .setDescription(`**Successfully Disabled \`WELCOME\` and \`LEAVE\` System**\n*You can enabled this settings with \`${prefix}setup -> Welcome & Leave System.\`*`)
          message.channel.send(welcome2);
          break;
          case "8":
            if (!message.member.hasPermission("MANAGE_CHANNELS")) {
              const Nopermission1 = new Discord.MessageEmbed()
              .setColor("#f04949")
              .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
              .setDescription(`**You don't have permissions to check welcome channel!**`)
              message.channel.send(Nopermission1);
             }
              const sqlquery11 = "SELECT channelid AS res FROM welcome WHERE guildId = " + message.guild.id;
              sql.query(sqlquery11, function (error, results, fields) {
               if (error) return console.log(error);
               if (results[0]) {
                const check1 = new Discord.MessageEmbed()
                .setColor("#1775f2")
                .setTitle("<:xchannel:887869003412947024> CURRENT WELCOME CHANNEL!")
                .setDescription(`
                Your current welcome channel is: <#${results[0].res}>
                The Default welcome message for your guild.

                ${client.settings.get(message.guild.id, "defaultWelcomeMsg")}
                `)
                message.channel.send(check1);
               } else {
                const check2 = new Discord.MessageEmbed()
                .setColor("#1775f2")
                .setTitle("<:xvector2:869193716575911966> WELCOME NOT ENABLED YET!")
                .setDescription(`**You haven't enabled the default welcome system on this server yet.**\n*Run \`${prefix}setup -> welcome & leave -> enable-welcome\` to enabled welcome system!*`)
                message.channel.send(check2);
               }
              });
          break;
          case "9":
            if (!message.member.hasPermission("MANAGE_CHANNELS")) {
              const Nopermission1 = new Discord.MessageEmbed()
              .setColor("#f04949")
              .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
              .setDescription(`You don't have permissions to check leave channel!`)
              message.channel.send(Nopermission1);
             }
              const sqlquery12 = "SELECT `channelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
              sql.query(sqlquery12, function (error, results, fields) {
               if (error) return console.log(error);
               if (results[0]) {
                const check1 = new Discord.MessageEmbed()
                .setColor("#1775f2")
                .setTitle("<:xchannel:887869003412947024> CURRENT LEAVE CHANNEL!")
                .setDescription(`**Your current leave channel is: <#${results[0].res}>**\n*You can channge the channel using \`${prefix}setup -> welcome & leave\`*`)
                message.channel.send(check1);
               } else {
                const check2 = new Discord.MessageEmbed()
                .setColor("#1775f2")
                .setTitle("<:xvector2:869193716575911966> LEAVE NOT ENABLED YET!")
                .setDescription(`**You haven't enabled the default leave system on this server yet.**\n*Run \`${prefix}setup -> welcome & leave -> enable-leave\` to enabled leave system!*`)
                message.channel.send(check2);
               }
              });
              break;
              case "10":
              client.settings.ensure(message.guild.id, { "defaultWelcomeMsg": "Thank you for joining us\nWe're happy to have you with us" })
              const enterMessage = new Discord.MessageEmbed()
              .setColor("#0082ea")
              .setTitle(":incoming_envelope: ENTER YOUR MESSAGE!")
              .setDescription(`You can enter your message!`)
              message.channel.send(enterMessage).then(msg=>{
              msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 150000, errors: ["TIME"]}).then(collected=>{
              const queryleave = "SELECT `channelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
              sql.query(queryleave, function (error, results, fields) {
              const logsetup = results[0].res;
              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
              if (!log) return;
              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
              message.guild.fetchAuditLogs().then((logs) => { 
              let NewMessage = collected.first().content
              client.settings.set(message.guild.id, NewMessage, `defaultWelcomeMsg`); 
              if (error) console.log(error);
              const upmsg = new Discord.MessageEmbed()
              .setColor("#006eee")
              .setTitle("<:checkvector:869193650184269834> NEW MESSAGE UPDATED!")
              .setDescription(`**Successfully Updated the Default Welcome Message!**\n*You can run \`${prefix}setup -> welcome & leave\` to change the background Image!*`)
              .setFooter("Message changed by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
              .setTimestamp();
              message.channel.send(upmsg);
              let bg = sql.query("SELECT background FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
              (async () => {
              Canvas.registerFont("./lib/fonts/FengardoNeue_Regular.otf", {family: "FengardoNeue",});
              const image = `${result[0].background}`;
              const canvas = Canvas.createCanvas(1772, 633);
              const ctx = canvas.getContext("2d");
              const background = await Canvas.loadImage(image);
              ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
              ctx.strokeStyle = "#f2f2f2";
              ctx.strokeRect(0, 0, canvas.width, canvas.height);
              var textString3 = `${message.author.username}`;
              if (textString3.length >= 14) {
              ctx.font = 'bold 150px "FengardoNeue"';
              ctx.fillStyle = "#f2f2f2";
              ctx.fillText(textString3, 720, canvas.height / 2 + 20); // User Name
              } else {
              ctx.font = 'bold 200px "FengardoNeue"';
              ctx.fillStyle = "#f2f2f2";
              ctx.fillText(textString3, 720, canvas.height / 2 + 25); // User Name
              }
              var textString2 = `#${message.author.discriminator}`;
              ctx.font = 'bold 40px "FengardoNeue"';
              ctx.fillStyle = "#f2f2f2";
              ctx.fillText(textString2, 730, canvas.height / 2 + 62); // User Tag
              var textString4 = `Member #${message.guild.memberCount}`;
              ctx.font = 'bold 60px "FengardoNeue"';
              ctx.fillStyle = "#f2f2f2";
              ctx.fillText(textString4, 720, canvas.height / 2 + 120); // Member Count
              var textString4 = `${message.guild.name}`;
              ctx.font = 'bold 70px "FengardoNeue"';
              ctx.fillStyle = "#f2f2f2";
              ctx.fillText(textString4, 720, canvas.height / 2 - 140); // Member Guild Name
              ctx.beginPath();
              ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
              ctx.closePath();
              ctx.clip();
              const avatar = await Canvas.loadImage(message.author.displayAvatarURL({format: "jpg",size: 2048,}));
              ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
              const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
              const embed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTimestamp()
              .setFooter(`${message.guild.name}`, message.guild.iconURL({dynamic: true,format: "png",}))
              .setTitle(`${message.author.tag.toUpperCase()}`)
              .setDescription(client.settings.get(message.guild.id, "defaultWelcomeMsg"))
              .setImage("attachment://welcome.png")
              .attachFiles(attachment);
              log.send(embed);    
              })();
              });
             });
            });
            }).catch(error=>{
            console.log(error)
            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
          })
          })
          break;
          default:
            message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
          break;
      }
    }).catch(error=>{
      //console.log(error)
      return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
  });
  });

  /**
 * @welcomesetup FINISHED
 */
  function _welcome(){
    let rembed = new MessageEmbed()
    .setColor(config.black)
    .setAuthor("What would you like to do?", `${message.guild.iconURL()}`)
    .setDescription(`
    **0.** \`Create Setup\` - *Creates a Welcome channel setup!*
    **1.** \`Manage Message\` - *Let's you edit the Welcome Message*
    **2.** \`Manage Image\` - *Let's you change the background Image*
    **3.** \`Reset All\` - *Resets all settings for Custom Welcome*
    **4.** \`Enable Welcome\` - *Enables Custom Welcome*
    **5.** \`Disable Welcome\` - *Disables Custom Welcome*
    `)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    .setThumbnail(config.avatarUrl)
    message.lineReply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(async collected=>{
      switch(collected.first().content.toString()){
        case "0":
          client.settings.ensure(message.guild.id, { "welcomeMsg": "Thanks for joining us.\nWe're happy to have you with us" })
          //client.settings.ensure(message.guild.id, { "WelBackground": "https://media.discordapp.net/attachments/711910361133219903/892487229795082240/393558.jpg?width=980&height=613" })
          let select = sql.query("SELECT background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          (async () => {
          let avatar = message.author.displayAvatarURL({format: "png"});
          let username = message.author.username
          let hash = message.author.discriminator;
          let membercount = message.guild.memberCount;
          let Servername = message.guild.name;
          const BorderColor = `${result[0].border}`;
          const UsernameColor = `${result[0].usernameBox}`;
          const DiscriminatorColor = `${result[0].discriminatorBox}`;
          const messageColor = `${result[0].messageBox}`;
          const titleColor = `${result[0].titleBox}`;
          const avatarColor = `${result[0].avatarBox}`;
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
          message.guild.channels.create("👋welcome", {
            type: 'text',
            topic: "Welcoming new members",
            permissionOverwrites: [
              {
                id: message.guild.id,
                allow: ['READ_MESSAGE_HISTORY'],
                deny: ['SEND_MESSAGES'],
              },
            ],
          })
          .then((channel) => {
          let con6 = sql.query("SELECT embedColor FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          const ColorEmbed = `${result[0].embedColor}`;
          let NWembed = new MessageEmbed()
          .setColor(`${ColorEmbed}`)
          .setDescription(client.settings.get(message.guild.id, "welcomeMsg"))
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
          .attachFiles(attachment)
          .setImage("attachment://welcome-image.png")
          .setTimestamp()
          channel.send(`<@${message.author.id}>`, NWembed);
          let sql6 = "UPDATE welcome SET CustomEnabled =  " + 1 + " WHERE guildId = " + message.guild.id + "";
          sql.query(sql6);
          let sql7 = 'UPDATE welcome SET CustonChannelid = ' + channel.id + ' WHERE guildId = ' + message.guild.id + '';
          sql.query(sql7);
          const wsetupcomplete = new Discord.MessageEmbed()
          .setColor("#006eee")
          .setTitle("<:checkvector:869193650184269834> SETUP COMPLETED!")
          .setDescription(`**Your Welcome Setup is now completed!**\n*You can run \`${prefix}setup -> welcome & leave\` to adjust Welcome Message and Background Image!*`)
          .setFooter("Setup completed by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
          .setTimestamp();
          message.channel.send(wsetupcomplete);
          })
         })
         })();
         });
        break;
        case "1":
          const enterMessage = new Discord.MessageEmbed()
          .setColor("#0082ea")
          .setTitle(":incoming_envelope: ENTER YOUR MESSAGE!")
          .setDescription(`You can enter your message!`)
          message.channel.send(enterMessage).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 150000, errors: ["TIME"]}).then(collected=>{
              const queryleave = "SELECT `CustonChannelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
              sql.query(queryleave, function (error, results, fields) {
              const logsetup = results[0].res;
              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
              if (!log) return;
              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
              message.guild.fetchAuditLogs().then((logs) => { 
              let TheMessage = collected.first().content
              client.settings.set(message.guild.id, TheMessage, `welcomeMsg`); 
              if (error) console.log(error);
              const upmsg = new Discord.MessageEmbed()
              .setColor("#006eee")
              .setTitle("<:checkvector:869193650184269834> NEW MESSAGE UPDATED!")
              .setDescription(`**Successfully Updated the Welcome Message!**\n*You can run \`${prefix}setup -> welcome & leave\` to change the background Image!*`)
              .setFooter("Message changed by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
              .setTimestamp();
              message.channel.send(upmsg);
              let select = sql.query("SELECT CustomMessage, background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
              (async () => {
              let avatar = message.author.displayAvatarURL({format: "png"});
              let username = message.author.username
              let hash = message.author.discriminator;
              let membercount = message.guild.memberCount;
              let Servername = message.guild.name;
              const BorderColor = `${result[0].border}`;
              const UsernameColor = `${result[0].usernameBox}`;
              const DiscriminatorColor = `${result[0].discriminatorBox}`;
              const messageColor = `${result[0].messageBox}`;
              const titleColor = `${result[0].titleBox}`;
              const avatarColor = `${result[0].avatarBox}`;
              const backgroundImage = `${result[0].background}`;
              const NewMessage = `${result[0].CustomMessage}`;
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
              let newattachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
              let NewMsgembed = new MessageEmbed()
              .setColor("RANDOM")
              .setTitle(":incoming_envelope: NEW WELCOME MESSAGE FOR: `" + message.guild.name + "`")
              .setDescription(client.settings.get(message.guild.id, "welcomeMsg"))
              .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
              .attachFiles(newattachment)
              .setImage("attachment://welcome-image.png")
              .setTimestamp()
              log.send(NewMsgembed);
              })();
             });
             });
            });
            }).catch(error=>{
              console.log(error)
              return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
          })
          })
        break;
        case "2":
          let bgembed = new MessageEmbed()
          .setColor(config.black)
          .setAuthor("What do you want to do?", `${message.guild.iconURL()}`)
          .setDescription(`
          **1.** \`Change Background\` - *Changes Background Image*
          **2.** \`Change Border Color\` - *Changes Color of the border*
          **3.** \`Change Username Box\` - *Changes Color of the Username-box*
          **4.** \`Change Discriminator\` - *Changes Color of the discriminator-box*
          **5.** \`Change Message Box\` - *Changes Color of the message-box*
          **6.** \`Change Title Color\` - *Changes Color of the Title*
          **7.** \`Change Avatar Color\` - *Changes Color of the Avatar*
          **8.** \`Change Embed Color\` - *Changes Color of the Embed*
          **9.** \`Enable Welcome Embed\` - *Enable's embed of the welcome card*
          **10.** \`Disable Welcome Embed\` - *Disable's embed of the welcome card*
          **11.** \`Reset All Changes\` - *Resets welcome card changes to default*
          `)
          .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
          .setThumbnail(config.avatarUrl)
            message.channel.send(bgembed).then(msg=>{
              msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(async collected=>{
                switch(collected.first().content.toString()){
                  case "1":
                    const enterbg = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":park: ENTER BACKGROUND IMAGE!")
                    .setDescription(`*Please enter your background **Image** or **Url***\n*Also **note** that this will also change the default background Image*`)
                    message.lineReply(enterbg).then(msg => {
                      msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        switch(collected.first().content.toString()){
                          case "1":
                            let sqlback = "UPDATE `welcome` SET `background` = " + 0 + " WHERE `guildId` = " + message.guild.id;
                            sql.query(sqlback);
                            break;
                          default:
                            function attachIsImage(msgAttach) {
                              url = msgAttach.url;
                              //True if this url is a png image.
                              return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                               url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                               url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                          }
                           if (collected.first().attachments.size > 0) {
                             if (collected.first().attachments.every(attachIsImage)){
                              function saveImageToDisk(url, path) {
                                var fullUrl = url
                                var localPath = fs.createWriteStream(path)
                                var request = https.get(fullUrl, function (response) {
                                  response.pipe(localPath)
                                })
                              }
                              saveImageToDisk(" " + url + " ", "./background/" + Date.now() + ".png") //saves the image to local storage
                                const queryleave = "SELECT `CustonChannelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
                                sql.query(queryleave, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE welcome SET background = '" + url + "' WHERE guildId = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> BACKGROUND IMAGE SUCCESS!")
                                .setDescription(`**Successfully changed your \`Background Image\`**\n*Please do **not** delete your Image from the Channel!\nRun \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
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
                                let newattachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
                                let NewBgembed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle("NEW BACKGROUND IMAGE FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "welcomeMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://welcome-image.png")
                                .setTimestamp()
                                log.send(NewBgembed);
                                })();
                              });
                               });
                             });
                            });   
                             }
                             else{
                              message.lineReply("<:xvector:869193619318382602> **| Hmmm I Could not set the image as background**")
                            }
                           }
                           else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                              const querychan = "SELECT `CustonChannelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
                              sql.query(querychan, function (error, results, fields) {
                              const logsetup = results[0].res;
                              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                              if (!log) return;
                              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                              message.guild.fetchAuditLogs().then((logs) => { 
                              let sql111 = "UPDATE welcome SET background = '" + collected.first().content + "' WHERE guildId = " + message.guild.id;
                              var query = sql.query(sql111, function(err, result) {
                              const bgsuccess = new Discord.MessageEmbed()
                              .setColor("#46c300")
                              .setTitle("<:checkvector:869193650184269834> BACKGROUND IMAGE SUCCESS!")
                              .setDescription(`**Successfully changed your \`Background Image\`**\n*Please do **not** delete your Image from the Channel!\nRun \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                              message.channel.send(bgsuccess);
                              let select = sql.query("SELECT background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                              (async () => {
                              let avatar = message.author.displayAvatarURL({format: "png"});
                              let username = message.author.username
                              let hash = message.author.discriminator;
                              let membercount = message.guild.memberCount;
                              let Servername = message.guild.name;
                              const BorderColor = `${result[0].border}`;
                              const UsernameColor = `${result[0].usernameBox}`;
                              const DiscriminatorColor = `${result[0].discriminatorBox}`;
                              const messageColor = `${result[0].messageBox}`;
                              const titleColor = `${result[0].titleBox}`;
                              const avatarColor = `${result[0].avatarBox}`;
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
                              let newattachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
                              let HttpNewBgembed = new MessageEmbed()
                              .setColor("RANDOM")
                              .setTitle(":park: NEW BACKGROUND IMAGE FOR: `" + message.guild.name + "`")
                              .setDescription(client.settings.get(message.guild.id, "welcomeMsg"))
                              .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                              .attachFiles(newattachment)
                              .setImage("attachment://welcome-image.png")
                              .setTimestamp()
                              log.send(HttpNewBgembed);
                              })();
                              });
                              });
                              });
                              });
                              const defaultchan = "SELECT `channelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
                              sql.query(defaultchan, function (error, results, fields) {
                              if (error) console.log(error);
                              const logsetup = results[0].res;
                              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                              if (!log) return;
                              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                              message.guild.fetchAuditLogs().then((logs) => { 
                              let bg = sql.query("SELECT background, message FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                              Canvas.registerFont("./lib/fonts/FengardoNeue_Regular.otf", {family: "FengardoNeue",});
                              const image = `${result[0].background}`;
                              (async () => {
                              const canvas = Canvas.createCanvas(1772, 633);
                              const ctx = canvas.getContext("2d");
                              const background = await Canvas.loadImage(image);
                              ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                              ctx.strokeStyle = "#f2f2f2";
                              ctx.strokeRect(0, 0, canvas.width, canvas.height);
                              var textString3 = `${message.author.username}`;
                              if (textString3.length >= 14) {
                              ctx.font = 'bold 150px "FengardoNeue"';
                              ctx.fillStyle = "#f2f2f2";
                              ctx.fillText(textString3, 720, canvas.height / 2 + 20);
                              } else {
                              ctx.font = 'bold 200px "FengardoNeue"';
                              ctx.fillStyle = "#f2f2f2";
                              ctx.fillText(textString3, 720, canvas.height / 2 + 25);
                              }
                              var textString2 = `#${message.author.discriminator}`;
                              ctx.font = 'bold 40px "FengardoNeue"';
                              ctx.fillStyle = "#f2f2f2";
                              ctx.fillText(textString2, 730, canvas.height / 2 + 62);
                              var textString4 = `Member #${message.guild.memberCount}`;
                              ctx.font = 'bold 60px "FengardoNeue"';
                              ctx.fillStyle = "#f2f2f2";
                              ctx.fillText(textString4, 720, canvas.height / 2 + 120);
                              var textString4 = `${message.guild.name}`;
                              ctx.font = 'bold 70px "FengardoNeue"';
                              ctx.fillStyle = "#f2f2f2";
                              ctx.fillText(textString4, 720, canvas.height / 2 - 140);
                              ctx.beginPath();
                              ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
                              ctx.closePath();
                              ctx.clip();
                              const avatar = await Canvas.loadImage(message.author.displayAvatarURL({format: "jpg",size: 2048,}));
                              ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
                              const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
                              const NewBgdefaultembed = new Discord.MessageEmbed()
                              .setColor("RANDOM")
                              .setTimestamp()
                              .setFooter(`${message.guild.name}`, message.guild.iconURL({dynamic: true,format: "png",}))
                              .setTitle(":park: NEW BACKGROUND FOR DEFAULT WELCOME CARD!")
                              .setDescription(result[0].message)
                              .setImage("attachment://welcome.png")
                              .attachFiles(attachment);
                              log.send(NewBgdefaultembed);
                              })();
                              });
                            });
                            });
                            }
                           else{
                            message.lineReply("<:xvector:869193619318382602> **| Hmmm I Could not set the image as background**")
                           }
                            break;
                       }
                     }).catch(error=>{
                      console.log(error)
                      return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                  });
                   });    
                  break;
                  case "2":
                    const enterborderC = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER BORDER COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterborderC).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                              message.lineReply("<:xvector:869193619318382602> **| WRONG COLOR CODE**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE welcome SET border = '" + content + "' WHERE guildId = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> BORDER COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Border color\` of the welcome card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
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
                                let newattachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle(":art: NEW BORDER COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "welcomeMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://welcome-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })              
                  break;
                  case "3":
                    const enterUsernameC = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER USERNAME BOX COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterUsernameC).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                            message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE welcome SET usernameBox = '" + content + "' WHERE guildId = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> USERNAME BOX COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Username box color\` of the welcome card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
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
                                let newattachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle(":art: NEW USERNAME COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "welcomeMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://welcome-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })
                  break;
                  case "4":
                    const enterDiscC = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER DISCRIMINATOR BOX COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterDiscC).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                            message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE welcome SET discriminatorBox = '" + content + "' WHERE guildId = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> DISCRIMINATOR COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Discriminator box color\` of the welcome card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
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
                                let newattachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle(":art: NEW DISCRIMINATOR COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "welcomeMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://welcome-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })
                  break;
                  case "5":
                    const enterMessageC = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER MESSAGE BOX COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterMessageC).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                            message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE welcome SET messageBox = '" + content + "' WHERE guildId = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> MESSAGE BOX COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Message box color\` of the welcome card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
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
                                let newattachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle(":art: NEW MESSAGE COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "welcomeMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://welcome-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })
                  
                  break;
                  case "6":
                    const enterTitleC = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER TITLE BOX COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterTitleC).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                            message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE welcome SET titleBox = '" + content + "' WHERE guildId = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> TITLE BOX COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Title box color\` of the welcome card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
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
                                let newattachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle(":art: NEW TITLE COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "welcomeMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://welcome-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })
                  break;
                  case "7":
                    const enterAvatarC = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER AVATAR BOX COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterAvatarC).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                            message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE welcome SET avatarBox = '" + content + "' WHERE guildId = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> AVATAR BOX COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Avatar box color\` of the welcome card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
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
                                let newattachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle(":art: NEW AVATAR COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "welcomeMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://welcome-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })
                
                  break;
                  case "8":
                    const enterEmbedC = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER EMBED MESSAGE COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterEmbedC).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                              message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE welcome SET embedColor = '" + content + "' WHERE guildId = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> EMBED MESSAGE COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Embed message color\` of the welcome card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox, embedColor FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
                                const EmbedMsgColor = `${result[0].embedColor}`;
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
                                let newattachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor(`${EmbedMsgColor}`)
                                .setTitle(":art: NEW EMBED COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "welcomeMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://welcome-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })
                  break;
                  case "9":
                    const enablequerychan1 = "SELECT `CustonChannelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
                    sql.query(enablequerychan1, function (error, results, fields) {
                    const logsetup = results[0].res;
                    const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                    if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                    if (!log) return;
                    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                    message.guild.fetchAuditLogs().then((logs) => { 
                    let enable10 = "UPDATE `welcome` SET `embedEnable` = " + 1 + " WHERE `guildId` = " + message.guild.id;
                    var enablequery = sql.query(enable10, function(err, result) {
                    const bgsuccess = new Discord.MessageEmbed()
                    .setColor("#46c300")
                    .setTitle("<:checkvector:869193650184269834> WELCOME CARD EMBED ENABLED!")
                    .setDescription(`**Successfully Enabled \`WELCOME CARD\` Embed**\n*You can disable the embed with \`${prefix}setup -> welcome & leave.\`*`)
                    message.channel.send(bgsuccess);
                    let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor` FROM `welcome` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                    (async () => {
                    let avatar = message.author.displayAvatarURL({format: "png"});
                    let username = message.author.username
                    let hash = message.author.discriminator;
                    let membercount = message.guild.memberCount;
                    let Servername = message.guild.name;
                    const BorderColor = `${result[0].border}`;
                    const UsernameColor = `${result[0].usernameBox}`;
                    const DiscriminatorColor = `${result[0].discriminatorBox}`;
                    const messageColor = `${result[0].messageBox}`;
                    const titleColor = `${result[0].titleBox}`;
                    const avatarColor = `${result[0].avatarBox}`;
                    const ResertEmbedColor = `${result[0].embedColor}`;
                    const backgroundImage = `${result[0].background}`;
                    const WelCard = new canvacord.Welcomer()
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
                    let newattachment = new Discord.MessageAttachment(await WelCard.build(), "welcome-image.png")
                    let EnableLEmbed = new MessageEmbed()
                    .setColor(`${ResertEmbedColor}`)
                    .setTitle("<:checkvector:869193650184269834> ENABLED WELCOME EMBED FOR: `" + message.guild.name + "`")
                    .setDescription(client.settings.get(message.guild.id, "welcomeMsg"))
                    .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                    .attachFiles(newattachment)
                    .setImage("attachment://welcome-image.png")
                    .setTimestamp()
                    log.send(EnableLEmbed);
                    })();
                    });
                    });
                    });
                    });
                  break;
                  case "10":
                    const disquerychan1 = "SELECT `CustonChannelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
                    sql.query(disquerychan1, function (error, results, fields) {
                    const logsetup = results[0].res;
                    const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                    if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                    if (!log) return;
                    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                    message.guild.fetchAuditLogs().then((logs) => { 
                    let disable10 = "UPDATE `welcome` SET `embedEnable` = " + 0 + " WHERE `guildId` = " + message.guild.id;
                    var disablequery = sql.query(disable10, function(err, result) {
                    const bgsuccess = new Discord.MessageEmbed()
                    .setColor("#46c300")
                    .setTitle("<:checkvector:869193650184269834> WELCOME CARD EMBED DISABLED!")
                    .setDescription(`**Successfully Disabled \`WELCOME CARD\` Embed**\n*You can enable the embed with \`${prefix}setup -> welcome & leave.\`*`)
                    message.channel.send(bgsuccess);
                    let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor` FROM `welcome` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                    (async () => {
                    let avatar = message.author.displayAvatarURL({format: "png"});
                    let username = message.author.username
                    let hash = message.author.discriminator;
                    let membercount = message.guild.memberCount;
                    let Servername = message.guild.name;
                    const BorderColor = `${result[0].border}`;
                    const UsernameColor = `${result[0].usernameBox}`;
                    const DiscriminatorColor = `${result[0].discriminatorBox}`;
                    const messageColor = `${result[0].messageBox}`;
                    const titleColor = `${result[0].titleBox}`;
                    const avatarColor = `${result[0].avatarBox}`;
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
                    let newattachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
                    log.send(`<@${message.author.id}>\n${client.settings.get(message.guild.id, "welcomeMsg")}`, newattachment);
                    })();
                    });
                    });
                    });
                    });
                  break;
                  case "11":
                    const querychan = "SELECT `CustonChannelid` AS res FROM `welcome` WHERE `guildId` = " + message.guild.id;
                    sql.query(querychan, function (error, results, fields) {
                    const logsetup = results[0].res;
                    const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                    if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                    if (!log) return;
                    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                    message.guild.fetchAuditLogs().then((logs) => { 
                    let ResetBackground = "lib/img/welcome.png";
                    let Reset1 = "UPDATE welcome SET background = '" + ResetBackground + "' WHERE guildId = " + message.guild.id;
                    sql.query(Reset1);
                    let Reset2 = "UPDATE welcome SET border = '#ffab2c' WHERE guildId = " + message.guild.id;
                    sql.query(Reset2);
                    let Reset3 = "UPDATE welcome SET usernameBox = '#ffab2c' WHERE guildId = " + message.guild.id;
                    sql.query(Reset3);
                    let Reset4 = "UPDATE welcome SET discriminatorBox = '#ffab2c' WHERE guildId = " + message.guild.id;
                    sql.query(Reset4);
                    let Reset5 = "UPDATE welcome SET messageBox = '#ffab2c' WHERE guildId = " + message.guild.id;
                    sql.query(Reset5);
                    let Reset6 = "UPDATE welcome SET titleBox = '#ffab2c' WHERE guildId = " + message.guild.id;
                    sql.query(Reset6);
                    let Reset7 = "UPDATE welcome SET avatarBox = '#ffab2c' WHERE guildId = " + message.guild.id;
                    sql.query(Reset7);
                    let Reset8 = "UPDATE welcome SET embedColor = '#ffab2c' WHERE guildId = " + message.guild.id;
                    sql.query(Reset8);
                    let Reset9 = "UPDATE welcome SET embedEnable = " + 1 + " WHERE guildId = " + message.guild.id;
                    var Resetquery = sql.query(Reset9, function(err, result) {
                    const bgsuccess = new Discord.MessageEmbed()
                    .setColor("#46c300")
                    .setTitle("<:checkvector:869193650184269834> RESERT CHANGES COMPLETED!")
                    .setDescription(`**Successfully Resetted \`WELCOME CARD\` Changes**\n*You can set a new changes settings with \`${prefix}setup -> welcome & leave.\`*`)
                    message.channel.send(bgsuccess);
                    let select = sql.query("SELECT background, border, usernameBox, discriminatorBox, messageBox, titleBox, avatarBox, embedColor FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                    (async () => {
                    let avatar = message.author.displayAvatarURL({format: "png"});
                    let username = message.author.username
                    let hash = message.author.discriminator;
                    let membercount = message.guild.memberCount;
                    let Servername = message.guild.name;
                    const BorderColor = `${result[0].border}`;
                    const UsernameColor = `${result[0].usernameBox}`;
                    const DiscriminatorColor = `${result[0].discriminatorBox}`;
                    const messageColor = `${result[0].messageBox}`;
                    const titleColor = `${result[0].titleBox}`;
                    const avatarColor = `${result[0].avatarBox}`;
                    const EmbedResertColor = `${result[0].embedColor}`;
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
                    let newattachment = new Discord.MessageAttachment(await WelcomeCard.build(), "welcome-image.png")
                    let ResertCard = new MessageEmbed()
                    .setColor(`${EmbedResertColor}`)
                    .setTitle(":clock4: RESERT CHANGES FOR: `" + message.guild.name + "`")
                    .setDescription(client.settings.get(message.guild.id, "welcomeMsg"))
                    .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                    .attachFiles(newattachment)
                    .setImage("attachment://welcome-image.png")
                    .setTimestamp()
                    log.send(ResertCard);
                    })();
                    });
                    });
                    });
                    });
                    break;
                  default:
                    message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
                  break;
                }
            }).catch(error=>{
              console.log(error)
              return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
          })
          })
        break;
        case "3":
          client.settings.delete(message.guild.id, "welcomeMsg");
          const sql1del = "DELETE FROM welcome WHERE guildId = " + message.guild.id;
          sql.query(sql1del, function (error, results, fields) {
          if (error) return console.log(error);
          const sql4 = "INSERT INTO `welcome` (`guildId`, `message`, `CustomMessage`,  `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`) VALUES (" + message.guild.id + ", ':heart: Thanks for joining us at', ':partying_face: Thanks for joining us.', '0', '0', '1', 'lib/img/welcome.png', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c');";
          sql.query(sql4, function (error, results, fields) {if (error) console.log(error);});
          const wellssuccess3 = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> RESET SUCCESS!")
          .setDescription(`**Successfully Resetted \`WELCOME\` System**\n*You can set a new settings settings with \`${prefix}setup -> welcome & leave.\`*`)
          message.channel.send(wellssuccess3);
        });
          break;
        case "4":
          let sql60 = "UPDATE `welcome` SET `CustomEnabled` = " + 1 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql60);
          const welcome1 = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> SUCCESS!")
          .setDescription(`**Successfully Enabled Custom \`WELCOME\` System**\n*You can disable the settings with \`${prefix}setup -> Welcome & Leave System.\`*`)
          message.channel.send(welcome1);
          break;
          case "5":
            let sql11 = "UPDATE `welcome` SET `CustomEnabled` = " + 0 + " WHERE `guildId` = " + message.guild.id;
            sql.query(sql11);
            const welcome2 = new Discord.MessageEmbed()
            .setColor("#46c300")
            .setTitle("<:checkvector:869193650184269834> SUCCESS!")
            .setDescription(`**Successfully Disabled Custom \`WELCOME\` System**\n*You can enabled this settings with \`${prefix}setup -> Welcome & Leave System.\`*`)
            message.channel.send(welcome2);
            break;
        default:
          message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**")
  })
  })
  }

  /**
 * @leavesetup FINISHED
 */
   function _leave(){
    let rembed = new MessageEmbed()
    .setColor(config.black)
    .setAuthor("What would you like to do?", `${message.guild.iconURL()}`)
    .setDescription(`
    **0.** \`Create Setup\` - *Creates a Leave channel setup!*
    **1.** \`Manage Message\` - *Let's you edit the Leave Message*
    **2.** \`Manage Image\` - *Let's you change the background Image*
    **3.** \`Reset All\` - *Resets all settings for Custom Leave*
    **4.** \`Enable Leave\` - *Enables Custom Leave*
    **5.** \`Disable Leave\` - *Disables Custom Leave*
    `)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    .setThumbnail(config.avatarUrl)
    message.lineReply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(async collected=>{
      switch(collected.first().content.toString()){
        case "0":
          client.settings.ensure(message.guild.id, { "leaveMsg": ":crying_cat_face: Good bye.. We hope to see you again." })
          let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox` FROM `leave` WHERE `guildId` = " + message.guild.id, function (err, result, fields) {
          (async () => {
          let avatar = message.author.displayAvatarURL({format: "png"});
          let username = message.author.username
          let hash = message.author.discriminator;
          let membercount = message.guild.memberCount;
          let Servername = message.guild.name;
          const BorderColor = `${result[0].border}`;
          const UsernameColor = `${result[0].usernameBox}`;
          const DiscriminatorColor = `${result[0].discriminatorBox}`;
          const messageColor = `${result[0].messageBox}`;
          const titleColor = `${result[0].titleBox}`;
          const avatarColor = `${result[0].avatarBox}`;
          const backgroundImage = `${result[0].background}`;
          const Canvacord = require("canvacord")
          const LeaveCard = new Canvacord.Leaver()
          .setUsername(username)
          .setDiscriminator(hash)
          .setMemberCount(membercount)
          .setGuildName(Servername)
          .setAvatar(avatar)
          .setColor("avatar", `${avatarColor}`)
          .setColor("border", `${BorderColor}`)
          .setColor("username-box", `${UsernameColor}`)
          .setColor("discriminator-box", `${DiscriminatorColor}`)
          .setColor("message-box", `${messageColor}`)
          .setColor("title", `${titleColor}`)
          .setBackground(`${backgroundImage}`)
          let attachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")

          message.guild.channels.create("👋Good Bye", {
            type: 'text',
            permissionOverwrites: [
              {
                id: message.guild.id,
                allow: ['READ_MESSAGE_HISTORY'],
                deny: ['SEND_MESSAGES'],
              },
            ],
          })
          .then((channel) => {
          const leaveMsg = "SELECT `embedColor` FROM `leave` WHERE `guildId` = " + message.guild.id;
          sql.query(leaveMsg, function (error, results, fields) {
          let EmbedMessageColor = results[0].embedColor
          let NWembed = new MessageEmbed()
          .setColor(`${EmbedMessageColor}`)
          .setDescription(client.settings.get(message.guild.id, "leaveMsg"))
          .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
          .attachFiles(attachment)
          .setImage("attachment://leave-image.png")
          .setTimestamp()
          channel.send(NWembed);
          let sqlleave6 = "UPDATE `leave` SET `CustomEnabled` =  " + 1 + " WHERE `guildId` = " + message.guild.id + "";
          sql.query(sqlleave6);
          let sqlleave7 = 'UPDATE `leave` SET `CustonChannelid` = ' + channel.id + ' WHERE `guildId` = ' + message.guild.id + '';
          sql.query(sqlleave7);
          const goodbysetupC = new Discord.MessageEmbed()
          .setColor("#006eee")
          .setTitle("<:checkvector:869193650184269834> SETUP COMPLETED!")
          .setDescription(`**Your Leave Setup is now completed!**\n*You can run \`${prefix}setup -> welcome & leave\` to adjust leave Message and Background Image!*`)
          .setFooter("Setup completed by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
          .setTimestamp();
          message.channel.send(goodbysetupC);
          })
         })
         })();
         })
        break;
        case "1":
            const enterMessage = new Discord.MessageEmbed()
            .setColor("#0082ea")
            .setTitle(":incoming_envelope: ENTER YOUR MESSAGE!")
            .setDescription(`**You can enter your message!**\n*Also **note** message character cannot be above **1000** Rabbit won't respond.*`)
            message.channel.send(enterMessage).then(msg=>{
              msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 150000, errors: ["TIME"]}).then(collected=>{
              const queryleave = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
              sql.query(queryleave, function (error, results, fields) {
              const logsetup = results[0].res;
              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
              if (!log) return;
              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
              message.guild.fetchAuditLogs().then((logs) => { 
              let TheLeaveMessage = collected.first().content
              client.settings.set(message.guild.id, TheLeaveMessage, `leaveMsg`); 
              const upmsg = new Discord.MessageEmbed()
              .setColor("#006eee")
              .setTitle("<:checkvector:869193650184269834> NEW MESSAGE UPDATED!")
              .setDescription(`**Successfully Updated the leave Message!**\n*You can run \`${prefix}setup -> welcome & leave\` to change the background Image!*`)
              .setFooter("Message changed by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
              .setTimestamp();
              message.channel.send(upmsg);
              let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
              (async () => {
              let avatar = message.author.displayAvatarURL({format: "png"});
              let username = message.author.username
              let hash = message.author.discriminator;
              let membercount = message.guild.memberCount;
              let Servername = message.guild.name;
              const BorderColor = `${result[0].border}`;
              const UsernameColor = `${result[0].usernameBox}`;
              const DiscriminatorColor = `${result[0].discriminatorBox}`;
              const messageColor = `${result[0].messageBox}`;
              const titleColor = `${result[0].titleBox}`;
              const avatarColor = `${result[0].avatarBox}`;
              const backgroundImage = `${result[0].background}`;
              const LeaveCard = new canvacord.Leaver()
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
              let newattachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
              let NewMsgembed = new MessageEmbed()
              .setColor("RANDOM")
              .setTitle(":incoming_envelope: NEW LEAVE MESSAGE FOR: `" + message.guild.name + "`")
              .setDescription(client.settings.get(message.guild.id, "leaveMsg"))
              .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
              .attachFiles(newattachment)
              .setImage("attachment://leave-image.png")
              .setTimestamp()
              log.send(NewMsgembed);
              })();
             });
             });
            });
            }).catch(error=>{
              console.log(error)
              return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
          })
          })
        break;
        case "2":
          let bgembed = new MessageEmbed()
          .setColor(config.black)
          .setAuthor("What do you want to do?", `${message.guild.iconURL()}`)
          .setDescription(`
          **1.** \`Change Background\` - *Changes Background Image*
          **2.** \`Change Border Color\` - *Changes Color of the border*
          **3.** \`Change Username Box\` - *Changes Color of the Username-box*
          **4.** \`Change Discriminator\` - *Changes Color of the discriminator-box*
          **5.** \`Change Message Box\` - *Changes Color of the message-box*
          **6.** \`Change Title Color\` - *Changes Color of the Title*
          **7.** \`Change Avatar Color\` - *Changes Color of the Avatar*
          **8.** \`Change Embed Color\` - *Changes Color of the Embed*
          **9.** \`Enable Leave Embed\` - *Enable's the embed of the leave card*
          **10.** \`Disable Leave Embed\` - *Disable's the embed of the leave card*
          **11.** \`Reset All Changes\` - *Resets leave card changes to default*
          `)
          .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
          .setThumbnail(config.avatarUrl)
            message.channel.send(bgembed).then(msg=>{
              msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(async collected=>{
                switch(collected.first().content.toString()){
                  case "1":
                    const enterbg = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":park: ENTER BACKGROUND IMAGE!")
                    .setDescription(`*Please enter your background **Image** or **Url***\n*Also **note** that this will also change the default background Image*`)
                    message.lineReply(enterbg).then(msg => {
                      msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
                        switch(collected.first().content.toString()){
                          case "1":
                            let sqlback = "UPDATE `leave` SET `background` = " + 0 + " WHERE `guildId` = " + message.guild.id;
                            sql.query(sqlback);
                            break;
                          default:
                            function attachIsImage(msgAttach) {
                              url = msgAttach.url;
                              //True if this url is a png image.
                              return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
                               url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
                               url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
                          }
                           if (collected.first().attachments.size > 0) {
                             if (collected.first().attachments.every(attachIsImage)){
                              function saveImageToDisk(url, path) {
                                var fullUrl = url
                                var localPath = fs.createWriteStream(path)
                                var request = https.get(fullUrl, function (response) {
                                  response.pipe(localPath)
                                })
                              }
                              saveImageToDisk(" " + url + " ", "./background/" + Date.now() + ".png") //saves the image to local storage
                                const queryleave = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
                                sql.query(queryleave, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE `leave` SET `background` = '" + url + "' WHERE `guildId` = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> BACKGROUND IMAGE SUCCESS!")
                                .setDescription(`**Successfully changed the \`Background Image\`**\n*Please do **not** delete your Image from the Channel!\nRun \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
                                const backgroundImage = `${result[0].background}`;
                                const LeaveCard = new canvacord.Leaver()
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
                                let newattachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
                                let NewBgembed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle("NEW BACKGROUND IMAGE FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "leaveMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://leave-image.png")
                                .setTimestamp()
                                log.send(NewBgembed);
                                })();
                              });
                               });
                             });
                            });   
                             }
                             else{
                              message.lineReply("<:xvector:869193619318382602> **| Hmmm I Could not set the image as background**")
                            }
                           }
                           else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
                              const querychan = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
                              sql.query(querychan, function (error, results, fields) {
                              const logsetup = results[0].res;
                              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                              if (!log) return;
                              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                              message.guild.fetchAuditLogs().then((logs) => { 
                              let sql111 = "UPDATE `leave` SET `background` = '" + collected.first().content + "' WHERE `guildId` = " + message.guild.id;
                              var query = sql.query(sql111, function(err, result) {
                              const bgsuccess = new Discord.MessageEmbed()
                              .setColor("#46c300")
                              .setTitle("<:checkvector:869193650184269834> BACKGROUND IMAGE SUCCESS!")
                              .setDescription(`**Successfully changed your \`Background Image\`**\n*Please do **not** delete your Image from the Channel!\nRun \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                              message.channel.send(bgsuccess);
                              let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                              (async () => {
                              let avatar = message.author.displayAvatarURL({format: "png"});
                              let username = message.author.username
                              let hash = message.author.discriminator;
                              let membercount = message.guild.memberCount;
                              let Servername = message.guild.name;
                              const BorderColor = `${result[0].border}`;
                              const UsernameColor = `${result[0].usernameBox}`;
                              const DiscriminatorColor = `${result[0].discriminatorBox}`;
                              const messageColor = `${result[0].messageBox}`;
                              const titleColor = `${result[0].titleBox}`;
                              const avatarColor = `${result[0].avatarBox}`;
                              const backgroundImage = `${result[0].background}`;
                              const LeaveCard = new canvacord.Leaver()
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
                              let newattachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
                              let HttpNewBgembed = new MessageEmbed()
                              .setColor("RANDOM")
                              .setTitle(":park: NEW BACKGROUND IMAGE FOR: `" + message.guild.name + "`")
                              .setDescription(client.settings.get(message.guild.id, "leaveMsg"))
                              .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                              .attachFiles(newattachment)
                              .setImage("attachment://leave-image.png")
                              .setTimestamp()
                              log.send(HttpNewBgembed);
                              })();
                              });
                              });
                              });
                              });
                              const defaultchan = "SELECT `channelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
                              sql.query(defaultchan, function (error, results, fields) {
                              if (error) console.log(error);
                              const logsetup = results[0].res;
                              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                              if (!log) return;
                              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                              message.guild.fetchAuditLogs().then((logs) => { 
                              let bg = sql.query("SELECT `background`, `message` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                              Canvas.registerFont("./lib/fonts/FengardoNeue_Regular.otf", {family: "FengardoNeue",});
                              const image = `${result[0].background}`;
                              (async () => {
                              const canvas = Canvas.createCanvas(1772, 633);
                              const ctx = canvas.getContext("2d");
                              const background = await Canvas.loadImage(image);
                              ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                              ctx.strokeStyle = "#f2f2f2";
                              ctx.strokeRect(0, 0, canvas.width, canvas.height);
                              var textString3 = `${message.author.username}`;
                              if (textString3.length >= 14) {
                              ctx.font = 'bold 150px "FengardoNeue"';
                              ctx.fillStyle = "#f2f2f2";
                              ctx.fillText(textString3, 720, canvas.height / 2 + 20);
                              } else {
                              ctx.font = 'bold 200px "FengardoNeue"';
                              ctx.fillStyle = "#f2f2f2";
                              ctx.fillText(textString3, 720, canvas.height / 2 + 25);
                              }
                              var textString2 = `#${message.author.discriminator}`;
                              ctx.font = 'bold 40px "FengardoNeue"';
                              ctx.fillStyle = "#f2f2f2";
                              ctx.fillText(textString2, 730, canvas.height / 2 + 62);
                              var textString4 = `Member #${message.guild.memberCount}`;
                              ctx.font = 'bold 60px "FengardoNeue"';
                              ctx.fillStyle = "#f2f2f2";
                              ctx.fillText(textString4, 720, canvas.height / 2 + 120);
                              var textString4 = `${message.guild.name}`;
                              ctx.font = 'bold 70px "FengardoNeue"';
                              ctx.fillStyle = "#f2f2f2";
                              ctx.fillText(textString4, 720, canvas.height / 2 - 140);
                              ctx.beginPath();
                              ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
                              ctx.closePath();
                              ctx.clip();
                              const avatar = await Canvas.loadImage(message.author.displayAvatarURL({format: "jpg",size: 2048,}));
                              ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
                              const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "leave.png");
                              const NewBgdefaultembed = new Discord.MessageEmbed()
                              .setColor("RANDOM")
                              .setTimestamp()
                              .setFooter(`${message.guild.name}`, message.guild.iconURL({dynamic: true,format: "png",}))
                              .setTitle(":park: NEW BACKGROUND FOR DEFAULT LEAVE CARD!")
                              .setDescription(result[0].message)
                              .setImage("attachment://leave.png")
                              .attachFiles(attachment);
                              log.send(NewBgdefaultembed);
                              })();
                              });
                            });
                            });
                            }
                           else{
                            message.lineReply("<:xvector:869193619318382602> **| Hmmm I Could not set the image as background**")
                           }
                            break;
                       }
                     }).catch(error=>{
                      console.log(error)
                      return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                  });
                   });    
                  break;
                  case "2":
                    const enterborderC = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER BORDER COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterborderC).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                              message.lineReply("<:xvector:869193619318382602> **| WRONG COLOR CODE**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE `leave` SET `border` = '" + content + "' WHERE `guildId` = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> BORDER COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Border color\` of the leave card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
                                const backgroundImage = `${result[0].background}`;
                                const LeaveCard = new canvacord.Leaver()
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
                                let newattachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle(":art: NEW BORDER COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "leaveMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://leave-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })              
                  break;
                  case "3":
                    const enterUsernameC = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER USERNAME BOX COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterUsernameC).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                            message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE `leave` SET `usernameBox` = '" + content + "' WHERE `guildId` = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> USERNAME BOX COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Username box color\` of the leave card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
                                const backgroundImage = `${result[0].background}`;
                                const LeaveCard = new canvacord.Leaver()
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
                                let newattachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle(":art: NEW USERNAME COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "leaveMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://leave-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })
                  break;
                  case "4":
                    const enterDiscC = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER DISCRIMINATOR BOX COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterDiscC).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                            message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE `leave` SET `discriminatorBox` = '" + content + "' WHERE `guildId` = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> DISCRIMINATOR COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Discriminator box color\` of the leave card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
                                const backgroundImage = `${result[0].background}`;
                                const LeaveCard = new canvacord.Leaver()
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
                                let newattachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle(":art: NEW DISCRIMINATOR COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "leaveMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://leave-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })
                  break;
                  case "5":
                    const enterMessageC = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER MESSAGE BOX COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterMessageC).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                            message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE `leave` SET `messageBox` = '" + content + "' WHERE `guildId` = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> MESSAGE BOX COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Message box color\` of the leave card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
                                const backgroundImage = `${result[0].background}`;
                                const LeaveCard = new canvacord.Leaver()
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
                                let newattachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle(":art: NEW MESSAGE COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "leaveMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://leave-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })
                  
                  break;
                  case "6":
                    const enterTitleC = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER TITLE BOX COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterTitleC).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                            message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE `leave` SET `titleBox` = '" + content + "' WHERE `guildId` = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> TITLE BOX COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Title box color\` of the leave card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
                                const backgroundImage = `${result[0].background}`;
                                const LeaveCard = new canvacord.Leaver()
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
                                let newattachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle(":art: NEW TITLE COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "leaveMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://leave-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })
                  break;
                  case "7":
                    const enterAvatarC = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER AVATAR BOX COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterAvatarC).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                            message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sql111 = "UPDATE `leave` SET `avatarBox` = '" + content + "' WHERE `guildId` = " + message.guild.id;
                                var query = sql.query(sql111, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> AVATAR BOX COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Avatar box color\` of the leave card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
                                const backgroundImage = `${result[0].background}`;
                                const LeaveCard = new canvacord.Leaver()
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
                                let newattachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle(":art: NEW AVATAR COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "leaveMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://leave-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })
                
                  break;
                  case "8":
                    const enterEmbedColor = new Discord.MessageEmbed()
                    .setColor("#0082ea")
                    .setTitle(":art: ENTER EMBED MESSAGE COLOR!")
                    .setDescription("**Please enter the type of color you want.**\n*Color must be an **Hex code 7** letters, **with** the `#` (E.g: #ffab2c)*")
                    message.channel.send(enterEmbedColor).then(msg =>{
                      msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                          let content = collected.first().content;
                          if(!content.startsWith("#") && content.length !== 7){
                              message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                          }
                          else {
                              if(isValidColor(content)){
                                const querychan = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
                                sql.query(querychan, function (error, results, fields) {
                                const logsetup = results[0].res;
                                const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                                if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                if (!log) return;
                                if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                                message.guild.fetchAuditLogs().then((logs) => { 
                                let sqlEmb11 = "UPDATE `leave` SET `embedColor` = '" + content + "' WHERE `guildId` = " + message.guild.id;
                                var query = sql.query(sqlEmb11, function(err, result) {
                                const bgsuccess = new Discord.MessageEmbed()
                                .setColor("#46c300")
                                .setTitle("<:checkvector:869193650184269834> EMBED MESSAGE COLOR SUCCESS!")
                                .setDescription(`**Successfully changed \`Embed message color\` of the welcome card**\n*Run \`${prefix}setup -> welcome & leave\` to change the background Image*`)
                                message.channel.send(bgsuccess);
                                let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                                (async () => {
                                let avatar = message.author.displayAvatarURL({format: "png"});
                                let username = message.author.username
                                let hash = message.author.discriminator;
                                let membercount = message.guild.memberCount;
                                let Servername = message.guild.name;
                                const BorderColor = `${result[0].border}`;
                                const UsernameColor = `${result[0].usernameBox}`;
                                const DiscriminatorColor = `${result[0].discriminatorBox}`;
                                const messageColor = `${result[0].messageBox}`;
                                const titleColor = `${result[0].titleBox}`;
                                const avatarColor = `${result[0].avatarBox}`;
                                const EmbedMsgColor = `${result[0].embedColor}`;
                                const backgroundImage = `${result[0].background}`;
                                const LeaveCard = new canvacord.Leaver()
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
                                let newattachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
                                let ColorEmbed = new MessageEmbed()
                                .setColor(`${EmbedMsgColor}`)
                                .setTitle(":art: NEW EMBED COLOR FOR: `" + message.guild.name + "`")
                                .setDescription(client.settings.get(message.guild.id, "leaveMsg"))
                                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                                .attachFiles(newattachment)
                                .setImage("attachment://leave-image.png")
                                .setTimestamp()
                                log.send(ColorEmbed);
                                })();
                                });
                                });
                                });
                                });
                              }
                              else{
                                message.lineReply("<:xvector:869193619318382602> **| WRONG HEX COLOR CODE!**")
                              }
                          }
                          function isValidColor(str) {
                              return str.match(/^#[a-f0-9]{6}$/i) !== null;
                          }
                      }).catch(error=>{
                          console.log(error)
                          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
                      })
                    })
                  break;
                  case "9":
                    const enablequerychan = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
                    sql.query(enablequerychan, function (error, results, fields) {
                    const logsetup = results[0].res;
                    const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                    if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                    if (!log) return;
                    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                    message.guild.fetchAuditLogs().then((logs) => { 
                    let enable9 = "UPDATE `leave` SET `embedEnable` = " + 1 + " WHERE `guildId` = " + message.guild.id;
                    var enablequery = sql.query(enable9, function(err, result) {
                    const bgsuccess = new Discord.MessageEmbed()
                    .setColor("#46c300")
                    .setTitle("<:checkvector:869193650184269834> LEAVE CARD EMBED ENABLED!")
                    .setDescription(`**Successfully Enabled \`LEAVE CARD\` Embed**\n*You can disable the embed with \`${prefix}setup -> welcome & leave.\`*`)
                    message.channel.send(bgsuccess);
                    let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                    (async () => {
                    let avatar = message.author.displayAvatarURL({format: "png"});
                    let username = message.author.username
                    let hash = message.author.discriminator;
                    let membercount = message.guild.memberCount;
                    let Servername = message.guild.name;
                    const BorderColor = `${result[0].border}`;
                    const UsernameColor = `${result[0].usernameBox}`;
                    const DiscriminatorColor = `${result[0].discriminatorBox}`;
                    const messageColor = `${result[0].messageBox}`;
                    const titleColor = `${result[0].titleBox}`;
                    const avatarColor = `${result[0].avatarBox}`;
                    const ResertEmbedColor = `${result[0].embedColor}`;
                    const backgroundImage = `${result[0].background}`;
                    const LeaveCard = new canvacord.Leaver()
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
                    let newattachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
                    let EnableLEmbed = new MessageEmbed()
                    .setColor(`${ResertEmbedColor}`)
                    .setTitle("<:checkvector:869193650184269834> ENABLED LEAVE EMBED FOR: `" + message.guild.name + "`")
                    .setDescription(client.settings.get(message.guild.id, "leaveMsg"))
                    .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                    .attachFiles(newattachment)
                    .setImage("attachment://leave-image.png")
                    .setTimestamp()
                    log.send(EnableLEmbed);
                    })();
                    });
                    });
                    });
                    });
                  break;
                  case "10":
                    const disquerychan = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
                    sql.query(disquerychan, function (error, results, fields) {
                    const logsetup = results[0].res;
                    const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                    if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                    if (!log) return;
                    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                    message.guild.fetchAuditLogs().then((logs) => { 
                    let disable8 = "UPDATE `leave` SET `embedEnable` = " + 0 + " WHERE `guildId` = " + message.guild.id;
                    var disablequery = sql.query(disable8, function(err, result) {
                    const bgsuccess = new Discord.MessageEmbed()
                    .setColor("#46c300")
                    .setTitle("<:checkvector:869193650184269834> LEAVE CARD EMBED DISABLED!")
                    .setDescription(`**Successfully Disabled \`LEAVE CARD\` Embed**\n*You can enable the embed with \`${prefix}setup -> welcome & leave.\`*`)
                    message.channel.send(bgsuccess);
                    let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                    (async () => {
                    let avatar = message.author.displayAvatarURL({format: "png"});
                    let username = message.author.username
                    let hash = message.author.discriminator;
                    let membercount = message.guild.memberCount;
                    let Servername = message.guild.name;
                    const BorderColor = `${result[0].border}`;
                    const UsernameColor = `${result[0].usernameBox}`;
                    const DiscriminatorColor = `${result[0].discriminatorBox}`;
                    const messageColor = `${result[0].messageBox}`;
                    const titleColor = `${result[0].titleBox}`;
                    const avatarColor = `${result[0].avatarBox}`;
                    const backgroundImage = `${result[0].background}`;
                    const LeaveCard = new canvacord.Leaver()
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
                    let newattachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
                    log.send(`<@${message.author.id}>\n${client.settings.get(message.guild.id, "leaveMsg")}`, newattachment);
                    })();
                    });
                    });
                    });
                    });
                  break;
                  case "11":
                    const querychan = "SELECT `CustonChannelid` AS res FROM `leave` WHERE `guildId` = " + message.guild.id;
                    sql.query(querychan, function (error, results, fields) {
                    const logsetup = results[0].res;
                    const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
                    if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                    if (!log) return;
                    if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                    message.guild.fetchAuditLogs().then((logs) => { 
                    let ResetBackground = "https://media.discordapp.net/attachments/711910361133219903/877887340947853372/goodbye.png?width=1440&height=514";
                    let Reset1 = "UPDATE `leave` SET `background` = '" + ResetBackground + "' WHERE `guildId` = " + message.guild.id;
                    sql.query(Reset1);
                    let Reset2 = "UPDATE `leave` SET `border` = '#ff5f29' WHERE `guildId` = " + message.guild.id;
                    sql.query(Reset2);
                    let Reset3 = "UPDATE `leave` SET `usernameBox` = '#ff5f29' WHERE `guildId` = " + message.guild.id;
                    sql.query(Reset3);
                    let Reset4 = "UPDATE `leave` SET `discriminatorBox` = '#ff5f29' WHERE `guildId` = " + message.guild.id;
                    sql.query(Reset4);
                    let Reset5 = "UPDATE `leave` SET `messageBox` = '#ff5f29' WHERE `guildId` = " + message.guild.id;
                    sql.query(Reset5);
                    let Reset6 = "UPDATE `leave` SET `titleBox` = '#ff5f29' WHERE `guildId` = " + message.guild.id;
                    sql.query(Reset6);
                    let Reset7 = "UPDATE `leave` SET `avatarBox` = '#ff5f29' WHERE `guildId` = " + message.guild.id;
                    sql.query(Reset7);
                    let Reset8 = "UPDATE `leave` SET `embedColor` = '#ff5f29' WHERE `guildId` = " + message.guild.id;
                    sql.query(Reset8);
                    let Reset9 = "UPDATE `leave` SET `embedEnable` = " + 1 + " WHERE `guildId` = " + message.guild.id;
                    var Resetquery = sql.query(Reset9, function(err, result) {
                    const bgsuccess = new Discord.MessageEmbed()
                    .setColor("#46c300")
                    .setTitle("<:checkvector:869193650184269834> RESERT CHANGES COMPLETED!")
                    .setDescription(`**Successfully Resetted \`LEAVE CARD\` Changes**\n*You can set a new changes settings with \`${prefix}setup -> welcome & leave.\`*`)
                    message.channel.send(bgsuccess);
                    let select = sql.query("SELECT `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor` FROM `leave` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
                    (async () => {
                    let avatar = message.author.displayAvatarURL({format: "png"});
                    let username = message.author.username
                    let hash = message.author.discriminator;
                    let membercount = message.guild.memberCount;
                    let Servername = message.guild.name;
                    const BorderColor = `${result[0].border}`;
                    const UsernameColor = `${result[0].usernameBox}`;
                    const DiscriminatorColor = `${result[0].discriminatorBox}`;
                    const messageColor = `${result[0].messageBox}`;
                    const titleColor = `${result[0].titleBox}`;
                    const avatarColor = `${result[0].avatarBox}`;
                    const ResertEmbedColor = `${result[0].embedColor}`;
                    const backgroundImage = `${result[0].background}`;
                    const LeaveCard = new canvacord.Leaver()
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
                    let newattachment = new Discord.MessageAttachment(await LeaveCard.build(), "leave-image.png")
                    let ResertCard = new MessageEmbed()
                    .setColor(`${ResertEmbedColor}`)
                    .setTitle(":clock4: RESERT CHANGES FOR: `" + message.guild.name + "`")
                    .setDescription(client.settings.get(message.guild.id, "leaveMsg"))
                    .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
                    .attachFiles(newattachment)
                    .setImage("attachment://leave-image.png")
                    .setTimestamp()
                    log.send(ResertCard);
                    })();
                    });
                    });
                    });
                    });
                    break;
                  default:
                    message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
                  break;
                }
            }).catch(error=>{
              console.log(error)
              return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
          })
          })
        break;
        case "3":
          client.settings.delete(message.guild.id, "leaveMsg");
          const sql1del = "DELETE FROM `leave` WHERE `guildId` = " + message.guild.id;
          sql.query(sql1del, function (error, results, fields) {
          if (error) return console.log(error);
          const sql4 = "INSERT INTO `leave` (`guildId`, `message`, `CustomMessage`, `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`) VALUES (" + message.guild.id + ", ':crying_cat_face: Good bye.. We hope to see you again.', ':crying_cat_face: Good bye.. We hope to see you again.', '0', '0', '1', 'https://media.discordapp.net/attachments/711910361133219903/877887340947853372/goodbye.png?width=1440&height=514', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29');";
          sql.query(sql4, function (error, results, fields) {if (error) console.log(error);});
          const wellssuccess3 = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> RESET SUCCESS!")
          .setDescription(`**Successfully Resetted \`LEAVE\` System**\n*You can set a new settings settings with \`${prefix}setup -> welcome & leave.\`*`)
          message.channel.send(wellssuccess3);
        });
          break;
        case "4":
          let sql60 = "UPDATE `leave` SET `CustomEnabled` = " + 1 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql60);
          const leave1 = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> SUCCESS!")
          .setDescription(`**Successfully Enabled Custom \`LEAVE\` System**\n*You can disable the settings with \`${prefix}setup -> Welcome & Leave System.\`*`)
          message.channel.send(leave1);
          break;
          case "5":
            let sql11 = "UPDATE `leave` SET `CustomEnabled` = " + 0 + " WHERE `guildId` = " + message.guild.id;
            sql.query(sql11);
            const leave2 = new Discord.MessageEmbed()
            .setColor("#46c300")
            .setTitle("<:checkvector:869193650184269834> SUCCESS!")
            .setDescription(`**Successfully Disabled Custom \`LEAVE\` System**\n*You can enabled this settings with \`${prefix}setup -> Welcome & Leave System.\`*`)
            message.channel.send(leave2);
            break;
        default:
          message.lineReply(String("<:xvector:869193619318382602> **| SORRY, that Number does not exists... Your Input:** " + collected.first().content).substr(0,1999))
        break;
      }
    }).catch(error=>{
      console.log(error)
      return message.lineReply("<:thinkingface:867897965380108288> **| IT SEEMS YOUR TIME RAN OUT!**")
  });
  });
  }


 //function changeprefix(){}

}
} else {
  const Nopermission8 = new Discord.MessageEmbed()
  .setColor("#f04949")
  .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
  .setDescription(`**You don't have permissions to run this command!**`)
  .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
  .setTimestamp();
  message.lineReply(Nopermission8);
}
}
};
StateManager.on('PrefixFetched', (guildId, prefix) => {
guildPrefix.set(guildId, prefix);
});