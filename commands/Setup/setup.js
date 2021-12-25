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
    **1.** \`Action Log System\` - Setup Guild Logging
    **2.** \`Welcome & Leave System\` - Setup Welcome & Leave System
    **3.** \`Economical Ward System\` - Setup An Economical Ward Logging
    **4.** \`Advance Ranking System\`  - Setup The Guild Ranking System
    **5.** \`Creative Application System\` - Setup An Application System
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
  .setColor(config.color)
  .setAuthor("What do u want to do?", `${message.guild.iconURL()}`)
  .setDescription(`
  **0.** \`log System\` - Creates ONE Log System.
  **1.** \`Set log\` - Set a channel for logging members actions.
  **2.** \`Check log\` - Check if the guild has a log channel.
  **3.** \`Set Boosters\` - Set a boosters channel for the guild.
  **4.** \`Check Boosters\` - Check if the guild has a boosters channel.
  **5.** \`Delete Log\` - Delete the log channel \`[DISABLED]\`.
  **6.** \`Delete Boosters\` - Delete the boosters channel \`[DISABLED]\`.
  **7.** \`Reset All\` - Resets settings for all action log system.
  **8.** \`Enable logging\` - Enable the logging system for the guild.
  **9.** \`Disable logging\` - Disable the logging system for the guild.
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
                 .setColor(config.color)
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
                .setColor(config.color)
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
                .setColor(config.color)
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
                .setColor(config.color)
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
        .setDescription(`**Successfully Rested \`ALL ACTION LOG\` System**\n*You can set a new channel settings with \`${prefix}setup -> action-log.\`*`)
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
  .setColor(config.color)
  .setAuthor("What do u want to do?", `${message.guild.iconURL()}`)
  .setDescription(`
  **0.** \`Ward System\` - Creates ONE Ward System.
  **1.** \`Set Ward\` - Set an economical ward channel for the guild.
  **2.** \`Check Ward\` - Check if the guild already has a ward channel.
  **3.** \`Delete Ward\` - Delete the current ward channel.
  **4.** \`Reset All\` - Resets settings for economical system.
  **5.** \`Enable Ward\` - Enable the ward system logging for the guild.
  **6.** \`Disable Ward\` - Disable the ward system logging the guild.
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
              .setColor(config.color)
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
        .setDescription(`**Successfully Rested \`ECONOMY WARD\` System**\n*You can set a new channel settings with \`${prefix}setup -> economical ward.\`*`)
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
  .setColor(config.color)
  .setTitle("What do u want to do?")
  .setDescription(`
  **1.** \`Enable Ranking\` - Enables the Ranking system for the guild.
  **2.** \`Disable Ranking\` - Disables the Ranking system for the guild.
  **3.** \`Change Background\` - Changes the Background of the Rankcard.
  **4.** \`Reset Everything\` - Resets all settings for the Ranking System.
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
          .setColor(config.color)
          .setTitle("So tell me what you want to do?")
          .setDescription(`
          **1.** \`Change Background\` - Change the image background of rank card.
          **2.** \`Disable Card Embed\` - Disable the embed of the rank card.
          **3.** \`Enable Card Embed\` - Enable the embed of the rank card.
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
            .setTitle("<:checkvector:869193650184269834> RANKING SYSTEM RESTED!")
            .setDescription(`**Successfully Rested \`RANKING SYSTEM\`** for the guild\n*You can add new settings with \`${prefix}setup -> advance ranking system.\`*`)
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
    **1.** \`Create Application\` - Create ONE application aystem.
    **2.** \`Edit Application\` - Edit already existing application aystem.
    **3.** \`Reset Application\` - Reset settings for the application system.
    `)
    .setColor(config.color)
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
        **1.** \`Accept Message\` - Let's you edit the accept message.
        **2.** \`Deny Message\` - You can edit the deny message.
        **3.** \`Question\` - Edit one question out of all questions.
        **4.** \`Edit Role\` - Edit the application Role.
        **5.** \`Add Question\` - Add a question to the questions.
        `)
        .setColor(config.color)
        .setThumbnail(config.avatarUrl)
        .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
        message.reply(rrembed).then(msg => {
        msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:30000,errors:['time']}).then(collected=>{
              switch(collected.first().content.toString()){
                case "1":
                message.channel.send(new Discord.MessageEmbed()
                .setColor("#00f7ff")
                .setTitle(":mailbox_with_mail: ENTER NEW ACCEPT MESSAGE")
                .setDescription("Enter the new accept message you want for the application")
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
                .setDescription("Enter the new deny message you want for the application")
                ).then(msg=>{
                msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 60000, errors: ["TIME"]}).then(collected=>{
                client.apply.set(message.guild.id, collected.first().content, "deny")
                return message.reply(new Discord.MessageEmbed()
                .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setColor("GREEN")
                .setTitle(":mailbox_with_mail: CHANGED DENY MESSAGE!")
                .setDescription(`Successfully changed the application \`DENY MESSAGE\`\nYou can edit this settings with \`${prefix}setup -> creative application system\``)
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
                .setDescription("What should be the new Question?")
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
                .setDescription("Hmmm, that Question does not exist! Here are all Questions")
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
              What should be the new role?
              Just ping the new role you want
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
                          That role is off a higher status so I'm not able to edit it
                          You can place my role above other roles that you want me to manage.
                          `)
                          return message.channel.send(CanUseRoleDone);
                        }
                        client.apply.set(message.guild.id, roleid, "TEMP_ROLE")
                        const CanUseRoleDone = new Discord.MessageEmbed()
                        .setColor("00f7ff")
                        .setTitle("<:checkvector:869193650184269834> TEMP ROLE HAS BEEN CHANGED")
                        .setDescription(`The temporary application role has been changed\nYou can edit this settings with \`${prefix}setup -> creative application system\``)
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
             .setDescription(`**Successfully Rested \`APPLICATION SYSTEM\` System**\n*You can set new settings with \`${prefix}setup -> creative application system.\`*`)
             .setFooter("Rested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
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
    .setColor(config.color)
    .setAuthor("What do you want to do?", `${message.guild.iconURL()}`)
    .setDescription(`
    **1.** \`Welcome System\` - Creates ONE Welcome System.
    **2.** \`Leave System\` - Creates ONE Leave System.
    **3.** \`Default Welcome\` - Default welcome system.
    **4.** \`Set Welcome DM\` - Set the welcome direct message.
    **5.** \`Embed Welcome System\` - Embed only welcome system.
    **6.** \`Add One Welcome Role\` - Give new members a role.
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
        _DefaultWelcome();
        break;
        case "4":
        _welcomeDM();
        break;
        case "5":
        _embedWelcome();
        break;
        case "6":
        let NotCompleted2 = new Discord.MessageEmbed()
        .setColor('#f862ff')
        .setThumbnail(config.Kotlin)
        .setTitle(`THIS FEATURE IS STILL UNDER CONSTRUCTION`)
        .setDescription(`
        **${message.author.username}** this feature is still being constructed by **Kotlin#0427**
        You will have to wait for a while or join my [support](https://discord.com/invite/tyjhKE3VdB) server to know when it would be released
        `)
        message.channel.send(NotCompleted2);
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
 * @welcomeDM FINISHED
 */
    function _embedWelcome(){
      let weembed = new MessageEmbed()
      .setColor(config.color)
      .setAuthor("What would you like to do?", `${message.guild.iconURL()}`)
      .setDescription(`
      **0.** \`Embed Setup\` - Creates one embed welcome setup.
      **1.** \`Embed Author\` - Let's you edit the embed author.
      **2.** \`Embed Title\` - Let's you edit the embed title.
      **3.** \`Embed Color\` - Let's you edit the embed color.
      **4.** \`Manage Image\` - Let's you change the embed Image.
      **5.** \`Embed Footer\` - Let's you edit the embed footer.
      **6.** \`Manage Message\` - Let's you change the embed message.
      **7.** \`Enable Image\` - Enables the welcome embed Image.
      **8.** \`Disable Image\` - Disables the welcome embed Image.
      **9.** \`Manage Thumbnail\` - Let's you change the welcome thumbnail.
      **10.** \`Enable Thumbnail\` - Enables the welcome embed thumbnail.
      **11.** \`Disable Thumbnail\` - Disables the welcome embed thumbnail.
      **12.** \`Embed Preview\` - Get a preview of the embed message.
      **13.** \`Reset Settings\` - Resets all settings for embed welcome.
      **14.** \`Enable Welcome\` - Enable welcome embed for new members.
      **15.** \`Disable Welcome\` - Disable welcome embed for new members.
      **16.** \`Manage Channel\` - Let's you change the embed channel.
      `)
      .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
      .setThumbnail(config.avatarUrl)
      message.lineReply(weembed).then(msg => {
      msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:80000,errors:['time']}).then(async collected=>{
        switch(collected.first().content.toString()){
          case "0":
            client.wembed.ensure(message.guild.id, { "WEmbedAuthor": ""});
            client.wembed.ensure(message.guild.id, { "WEmbedColor": "#FAAFAF"});
            client.wembed.ensure(message.guild.id, { "WEmbedFooter": ""});
            client.wembed.ensure(message.guild.id, { "WEmbedTitle": "GREETINGS"});
            client.wembed.ensure(message.guild.id, { "WEmbedMessage": `🎑 Thank you for Joining **${message.guild.name}**\nWe're very excited that you joined us\nHope you have a fun time here **(>‿◠)**`});
            let WEMBED = "https://media.discordapp.net/attachments/711910361133219903/899392123906961458/55.png?width=1089&height=612";
            let WEMBEDTH = "https://media.discordapp.net/attachments/711910361133219903/899392847436980265/54.jpg";
            let sqlwembed = "UPDATE welcome SET w_embed_Image = '" + WEMBED + "' WHERE guildId  = " + message.guild.id;
            sql.query(sqlwembed);
            let sqlwembedth = "UPDATE welcome SET w_embed_thumb = '" + WEMBEDTH + "' WHERE guildId  = " + message.guild.id;
            sql.query(sqlwembedth);
            let sqlwembed1 = "UPDATE welcome SET w_embed_welcome = " + 1 + " WHERE guildId = " + message.guild.id;
            sql.query(sqlwembed1);
            let sqlwembed2 = "UPDATE welcome SET w_embed_Image_on = " + 1 + " WHERE guildId = " + message.guild.id;
            sql.query(sqlwembed2);
            let sqlwembed3 = "UPDATE welcome SET w_embed_thumb_on = " + 1 + " WHERE guildId = " + message.guild.id;
            sql.query(sqlwembed3);
            let SEmbedWel = sql.query("SELECT w_embed_thumb, w_embed_Image FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            let wembedimage = result[0].w_embed_Image;  
            let wembedthumb = result[0].w_embed_thumb;         
            message.guild.channels.create("🗳welcome", {
              type: 'text',
              topic: "Welcoming New Members With An Embed",
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  allow: ['READ_MESSAGE_HISTORY'],
                  deny: ['SEND_MESSAGES'],
                },
              ],
            })
          .then((channel) => {
          let wembed = new MessageEmbed()
          .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
          .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
          .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
          .setThumbnail(wembedthumb)
          .setImage(wembedimage)
          .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
          .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
          .setTimestamp()
          channel.send(`<@${message.author.id}>`, wembed);
          let sql27 = 'UPDATE welcome SET w_embed_channel = ' + channel.id + ' WHERE guildId = ' + message.guild.id + '';
          sql.query(sql27);
          const welembeds = new Discord.MessageEmbed()
          .setColor("#006eee")
          .setTitle("<:bxcheck:895478636046606346> EMBED SETUP COMPLETED!")
          .setDescription(`Your Embed Welcome Setup is now completed!\nYou can run \`${prefix}setup -> welcome & leave\` to adjust the Welcome Message.`)
          message.channel.send(welembeds);
          });
          });
          break;
          case "1":
          let select1 = sql.query("SELECT w_embed_welcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if(result[0].w_embed_welcome == 0) {
              const noton = new Discord.MessageEmbed()
              .setColor("#fc5d71")
              .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
              .setDescription(`
              The embed system has not been setup for this guild.
              You have to run this setup command again and use the \`0 index\`
              `)
            message.channel.send(noton)
            } else {
              const EnterEmbedAuthor = new Discord.MessageEmbed()
              .setColor("#0082ea")
              .setTitle(":incoming_envelope: ENTER THE EMBED AUTHOR!")
              .setDescription(`
              You can change the message of the embed author
              **Please make sure you've used the \`0 index\`
              to create an embed setup before proceeding**
              `)
              message.channel.send(EnterEmbedAuthor).then(msg=>{
              msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 880000, errors: ["TIME"]}).then(collected=>{
              let EmbedAMessage = collected.first().content
              client.wembed.set(message.guild.id, EmbedAMessage, "WEmbedAuthor"); 
              let SEmWel = sql.query("SELECT w_embed_thumb, w_embed_Image FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
              if (err) console.log(err);
              let wembedimage = result[0].w_embed_Image;  
              let wembedthumb = result[0].w_embed_thumb; 
              const EmbedSetup = new Discord.MessageEmbed()
              .setThumbnail(wembedthumb)
              .setImage(wembedimage)
              .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
              .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
              .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
              .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
              .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
              .setTimestamp()
              message.channel.send("**EMBED AUTHOR SUCCESS**", EmbedSetup);
              });
              }).catch(error=>{
              console.log(error)
              return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
              });
              });
            }
          })
          break;
          case "2":
            let select2 = sql.query("SELECT w_embed_welcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if(result[0].w_embed_welcome == 0) {
            const noton = new Discord.MessageEmbed()
            .setColor("#fc5d71")
            .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
            .setDescription(`
            The embed system has not been setup for this guild.
            You have to run this setup command again and use the \`0 index\`
            `)
            message.channel.send(noton)
            } else {
            const EnterEmbedTitle = new Discord.MessageEmbed()
            .setColor("#0082ea")
            .setTitle(":incoming_envelope: ENTER THE EMBED TITLE!")
            .setDescription(`You can change the message of the embed title`)
            message.channel.send(EnterEmbedTitle).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 880000, errors: ["TIME"]}).then(collected=>{
            let EmbedAMessage = collected.first().content
            client.wembed.set(message.guild.id, EmbedAMessage, "WEmbedTitle"); 
            let SEmWel1 = sql.query("SELECT w_embed_thumb, w_embed_Image FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if (err) console.log(err);
            let wembedimage = result[0].w_embed_Image;  
            let wembedthumb = result[0].w_embed_thumb; 
            const EmbedSetup1 = new Discord.MessageEmbed()
            .setThumbnail(wembedthumb)
            .setImage(wembedimage)
            .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
            .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
            .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
            .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
            .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
            .setTimestamp()
            message.channel.send("**EMBED TITLE SUCCESS**", EmbedSetup1);
            });
            }).catch(error=>{
            console.log(error)
            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
            });
            });
            }
            });
          break;
          case "3":
            let select3 = sql.query("SELECT w_embed_welcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if(result[0].w_embed_welcome == 0) {
            const noton = new Discord.MessageEmbed()
            .setColor("#fc5d71")
            .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
            .setDescription(`
            The embed system has not been setup for this guild.
            You have to run this setup command again and use the \`0 index\`
            `)
            message.channel.send(noton)
            } else {
            const EnterEmbedColor = new Discord.MessageEmbed()
            .setColor("#0082ea")
            .setTitle(":art: ENTER THE EMBED COLOR!")
            .setDescription(`
            You can change the color of the embed
            **Please make sure you've used the \`0\`
            Settings to create an embed setup before proceeding**
            `)
            message.channel.send(EnterEmbedColor).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 880000, errors: ["TIME"]}).then(collected=>{
            let content = collected.first().content
            if(!content.startsWith("#") && content.length !== 7){
            message.lineReply("<:xvector:869193619318382602> **| WRONG COLOR CODE**")
            } else {
            if(isValidColor(content)){
            client.wembed.set(message.guild.id, content, `WEmbedColor`); 
            let SEmWel1 = sql.query("SELECT w_embed_thumb, w_embed_Image FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if (err) console.log(err);
            let wembedimage = result[0].w_embed_Image;  
            let wembedthumb = result[0].w_embed_thumb; 
            const EMSetup = new Discord.MessageEmbed()
            .setThumbnail(wembedthumb)
            .setImage(wembedimage)
            .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
            .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
            .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
            .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
            .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
            .setTimestamp()
            message.channel.send("**EMBED COLOR SUCCESS**", EMSetup);
            });
            }
            }
            function isValidColor(str) {
            return str.match(/^#[a-f0-9]{6}$/i) !== null;
            }
            }).catch(error=>{
            console.log(error)
            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
            });
            });
            }
            });
          break;
          case "4":
            let select4 = sql.query("SELECT w_embed_welcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if(result[0].w_embed_welcome == 0) {
            const noton = new Discord.MessageEmbed()
            .setColor("#fc5d71")
            .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
            .setDescription(`
            The embed system has not been setup for this guild.
            You have to run this setup command again and use the \`0 index\`
            `)
            message.channel.send(noton)
            } else {
            const enterImage = new Discord.MessageEmbed()
            .setColor("#0082ea")
            .setTitle(":park: ENTER THE EMBED IMAGE!")
            .setDescription(`
            You can enter any Image
            From local system or url from the internet
            **Please make sure you've used the \`0\`
            Settings to create an embed setup before proceeding**
            `)
            message.lineReply(enterImage).then(msg => {
            msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:70000,errors:['time']}).then(collected=>{     
            function attachIsImage(msgAttach) {
            url = msgAttach.url;
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
            let sqlwembg = "UPDATE welcome SET w_embed_Image = '" + url + "' WHERE guildId  = " + message.guild.id;
            var query = sql.query(sqlwembg, function(err, result) { 
            if (err) console.log(err);
            let DmWel = sql.query("SELECT w_embed_Image FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if (err) console.log(err);
            let WembedBackground = result[0].w_embed_Image;
            const WESetup = new Discord.MessageEmbed()
            .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
            .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
            .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
            .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
            .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
            .setImage(WembedBackground)
            .setTimestamp();
            message.channel.send("**EMBED BACKGROUND SUCCESS**", WESetup);
            });
            });
            }
            else{
            message.lineReply("<:xvector2:869193716575911966> An error occured somewhere\nWhich makes me not able to set the image.")
            }
            }
            else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
            let sqlDMWbg = "UPDATE welcome SET w_embed_Image = '" + collected.first().content + "' WHERE guildId  = " + message.guild.id;
            var query = sql.query(sqlDMWbg, function(err, result) {
            if (err) console.log(err);
            let DmWel = sql.query("SELECT w_embed_Image FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if (err) console.log(err);
            let WembedBackground = result[0].w_embed_Image;
            const EmBag = new Discord.MessageEmbed()
            .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
            .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
            .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
            .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
            .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
            .setImage(WembedBackground)
            .setTimestamp();
            message.channel.send("**EMBED BACKGROUND SUCCESS**", EmBag);
            });
            });
            }
            }).catch(error=>{
            console.log(error)
            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
            });
            });
            }
            });
          break;
          case "5":
            let select5 = sql.query("SELECT w_embed_welcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if(result[0].w_embed_welcome == 0) {
            const noton = new Discord.MessageEmbed()
            .setColor("#fc5d71")
            .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
            .setDescription(`
            The embed system has not been setup for this guild.
            You have to run this setup command again and use the \`0 index\`
            `)
            message.channel.send(noton)
            } else {
            const entereFooter = new Discord.MessageEmbed()
            .setColor("#0082ea")
            .setTitle(":incoming_envelope: ENTER THE EMBED FOOTER!")
            .setDescription(`You can enter the message of the embed footer`)
            message.channel.send(entereFooter).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 880000, errors: ["TIME"]}).then(collected=>{
            let EFooterMessage = collected.first().content
            client.wembed.set(message.guild.id, EFooterMessage, `WEmbedFooter`); 
            let DmWel = sql.query("SELECT w_embed_Image FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if (err) console.log(err);
            let WembedBackground = result[0].w_embed_Image;
            const wembedp = new Discord.MessageEmbed()
            .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
            .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
            .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
            .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
            .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
            .setImage(WembedBackground)
            .setTimestamp();
            message.channel.send("**EMBED FOOTER SUCCESS**", wembedp);
            });
            }).catch(error=>{
            console.log(error)
            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
            });
            });
            }
           });
          break;
          case "6":
            let select6 = sql.query("SELECT w_embed_welcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if(result[0].w_embed_welcome == 0) {
            const noton = new Discord.MessageEmbed()
            .setColor("#fc5d71")
            .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
            .setDescription(`
            The embed system has not been setup for this guild.
            You have to run this setup command again and use the \`0 index\`
            `)
            message.channel.send(noton)
            } else {
            const entereMessage = new Discord.MessageEmbed()
            .setColor("#0082ea")
            .setTitle(":incoming_envelope: ENTER THE EMBED MESSAGE!")
            .setDescription(`
            You can enter the message of the embed
            **Please make sure you've used the \`0\`
            Settings to create an embed setup before proceeding**
            `)
            message.channel.send(entereMessage).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 980000, errors: ["TIME"]}).then(collected=>{
            let TEmbedMessage = collected.first().content
            client.wembed.set(message.guild.id, TEmbedMessage, `WEmbedMessage`); 
            let DmWel = sql.query("SELECT w_embed_Image FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if (err) console.log(err);
            let WembedBackg = result[0].w_embed_Image;
            const wembmsg = new Discord.MessageEmbed()
            .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
            .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
            .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
            .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
            .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
            .setImage(WembedBackg)
            .setTimestamp();
            message.channel.send("**EMBED MESSAGE SUCCESS**", wembmsg);
            });
            }).catch(error=>{
            console.log(error)
            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
            });
            });
            }
            });
          break;
          case "7":
            let select7 = sql.query("SELECT w_embed_welcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if(result[0].w_embed_welcome == 0) {
            const noton = new Discord.MessageEmbed()
            .setColor("#fc5d71")
            .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
            .setDescription(`
            The embed system has not been setup for this guild.
            You have to run this setup command again and use the \`0 index\`
            `)
            message.channel.send(noton)
            } else {
            let sqlemOn = "UPDATE welcome SET w_embed_Image_on = " + 1 + " WHERE guildId = " + message.guild.id;
            sql.query(sqlemOn);
            let EmbImg = sql.query("SELECT w_embed_Image, w_embed_Image_on FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if (err) console.log(err);
            if (result[0].w_embed_Image_on == 1) {
            let wembg = result[0].w_embed_Image;
            const wembImg = new Discord.MessageEmbed()
            .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
            .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
            .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
            .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
            .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
            .setImage(wembg)
            .setTimestamp();
            message.channel.send("**WELCOME EMBED IMAGE ENABLED**", wembImg); 
            } else if (result[0].w_embed_Image_on == 0) {
            const wembImgi = new Discord.MessageEmbed()
            .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
            .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
            .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
            .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
            .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
            .setTimestamp();
            message.channel.send("**WELCOME EMBED IMAGE IS DISABLED**", wembImgi);
            }
            });
            }
            });
          break;
          case "8":
            let select8 = sql.query("SELECT w_embed_welcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if(result[0].w_embed_welcome == 0) {
            const noton = new Discord.MessageEmbed()
            .setColor("#fc5d71")
            .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
            .setDescription(`
            The embed system has not been setup for this guild.
            You have to run this setup command again and use the \`0 index\`
            `)
            message.channel.send(noton)
            } else {
            let sqlemOf = "UPDATE welcome SET w_embed_Image_on = " + 0 + " WHERE guildId = " + message.guild.id;
            sql.query(sqlemOf);
            let EmbelEn = sql.query("SELECT w_embed_Image, w_embed_Image_on FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if (err) console.log(err);
            if (result[0].w_embed_Image_on == 0) {
            const wembImg = new Discord.MessageEmbed()
            .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
            .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
            .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
            .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
            .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
            .setTimestamp();
            message.channel.send("**WELCOME EMBED IMAGE DISABLED**", wembImg); 
            } else if (result[0].w_embed_Image_on == 1) {
            let wembg = result[0].w_embed_Image;
            const wembImgi = new Discord.MessageEmbed()
            .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
            .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
            .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
            .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
            .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
            .setImage(wembg)
            .setTimestamp();
            message.channel.send("**WELCOME EMBED IMAGE IS ENABLED**", wembImgi);
            }
            });
            }
            });
          break;
          case "9":
            let select9 = sql.query("SELECT w_embed_welcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if(result[0].w_embed_welcome == 0) {
            const noton = new Discord.MessageEmbed()
            .setColor("#fc5d71")
            .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
            .setDescription(`
            The embed system has not been setup for this guild.
            You have to run this setup command again and use the \`0 index\`
            `)
            message.channel.send(noton)
            } else {
            const enterThumb = new Discord.MessageEmbed()
            .setColor("#0082ea")
            .setTitle(":park: ENTER THE EMBED THUMBNAIL!")
            .setDescription(`
            You can enter any Image
            From local system or url from the internet
            **Please make sure you've used the \`0\`
            Settings to create an embed setup before proceeding**
            `)
            message.lineReply(enterThumb).then(msg => {
            msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time: 90000,errors:['time']}).then(collected=>{     
            function attachIsImage(msgAttach) {
            url = msgAttach.url;
            return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1 ||
            url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/) !== -1 ||
            url.indexOf("jpg", url.length - "jpg".length /*or 3*/) !== -1;
            }
            if (collected.first().attachments.size > 0) {
            if (collected.first().attachments.every(attachIsImage)){
            function saveImageToDisk(url, path) { // You can save the Image anywhere if you want
            var fullUrl = url
            var localPath = fs.createWriteStream(path)
            var request = https.get(fullUrl, function (response) {
            response.pipe(localPath)
            })
            }
            let sqlwembg = "UPDATE welcome SET w_embed_thumb = '" + url + "' WHERE guildId  = " + message.guild.id;
            var query = sql.query(sqlwembg, function(err, result) { 
            if (err) console.log(err);
            let EmbWel = sql.query("SELECT w_embed_thumb, w_embed_Image FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if (err) console.log(err);
            let WembThumb = result[0].w_embed_thumb;
            let WembBackg = result[0].w_embed_Image;
            const wethumb = new Discord.MessageEmbed()
            .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
            .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
            .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
            .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
            .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
            .setThumbnail(WembThumb)
            .setImage(WembBackg)
            .setTimestamp();
            message.channel.send("**EMBED THUMBNAIL SUCCESS**", wethumb);
            });
            });
            }
            else{
            message.lineReply("<:xvector2:869193716575911966> An error occured somewhere\nWhich makes me not able to set the image.")
            }
            }
            else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
            let sqleth = "UPDATE welcome SET w_embed_thumb = '" + collected.first().content + "' WHERE guildId  = " + message.guild.id;
            var query = sql.query(sqleth, function(err, result) {
            if (err) console.log(err);
            let EmbWel = sql.query("SELECT w_embed_thumb, w_embed_Image FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if (err) console.log(err);
            let WembThumb = result[0].w_embed_thumb;
            let WembBackg = result[0].w_embed_Image;
            const nwethumb = new Discord.MessageEmbed()
            .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
            .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
            .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
            .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
            .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
            .setThumbnail(WembThumb)
            .setImage(WembBackg)
            .setTimestamp();
            message.channel.send("**EMBED THUMBNAIL SUCCESS**", nwethumb);
            });
            });
            }
            }).catch(error=>{
            console.log(error)
            return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
            });
            });
            }
            });
          break;
          case "10":
            let select10 = sql.query("SELECT w_embed_welcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
              if(result[0].w_embed_welcome == 0) {
              const noton = new Discord.MessageEmbed()
              .setColor("#fc5d71")
              .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
              .setDescription(`
              The embed system has not been setup for this guild.
              You have to run this setup command again and use the \`0 index\`
              `)
              message.channel.send(noton)
              } else {
              let sqlemOn = "UPDATE welcome SET w_embed_thumb_on = " + 1 + " WHERE guildId = " + message.guild.id;
              sql.query(sqlemOn);
              let EmbImg = sql.query("SELECT w_embed_Image, w_embed_thumb, w_embed_thumb_on FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
              if (err) console.log(err);
              if (result[0].w_embed_thumb_on == 1) {
              let wenbg = result[0].w_embed_Image;
              let wemthunb = result[0].w_embed_thumb;
              const wembthun = new Discord.MessageEmbed()
              .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
              .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
              .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
              .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
              .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
              .setImage(wenbg)
              .setThumbnail(wemthunb)
              .setTimestamp();
              message.channel.send("**WELCOME EMBED THUMBNAIL ENABLED**", wembthun); 
              } else if (result[0].w_embed_thumb_on == 0) {
              let wenbg = result[0].w_embed_Image;
              const wembthub = new Discord.MessageEmbed()
              .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
              .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
              .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
              .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
              .setImage(wenbg)
              .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
              .setTimestamp();
              message.channel.send("**WELCOME EMBED THUMBNAIL IS DISABLED**", wembthub);
              }
              });
              }
              });
          break;
          case "11":
            let select11 = sql.query("SELECT w_embed_welcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
              if(result[0].w_embed_welcome == 0) {
              const noton = new Discord.MessageEmbed()
              .setColor("#fc5d71")
              .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
              .setDescription(`
              The embed system has not been setup for this guild.
              You have to run this setup command again and use the \`0 index\`
              `)
              message.channel.send(noton)
              } else {
              let sqlemOn = "UPDATE welcome SET w_embed_thumb_on = " + 0 + " WHERE guildId = " + message.guild.id;
              sql.query(sqlemOn);
              let EmbImg = sql.query("SELECT w_embed_Image, w_embed_thumb, w_embed_thumb_on FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
              if (err) console.log(err);
              if (result[0].w_embed_thumb_on == 0) {
              let wenbg = result[0].w_embed_Image;
              const wembthun = new Discord.MessageEmbed()
              .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
              .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
              .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
              .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
              .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
              .setImage(wenbg)
              .setTimestamp();
              message.channel.send("**WELCOME EMBED THUMBNAIL DISABLED**", wembthun); 
              } else if (result[0].w_embed_thumb_on == 1) {
              let wenbg = result[0].w_embed_Image;
               let wemthunb = result[0].w_embed_thumb;
              const wembthub = new Discord.MessageEmbed()
              .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
              .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
              .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
              .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
              .setImage(wenbg)
              .setThumbnail(wemthunb)
              .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
              .setTimestamp();
              message.channel.send("**WELCOME EMBED THUMBNAIL IS ENABLED**", wembthub);
              }
              });
              }
              });
          break;
          case "12":
            let select12 = sql.query("SELECT w_embed_welcome, w_embed_Image, w_embed_thumb, w_embed_Image_on, w_embed_thumb_on FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
              let EmImg = result[0].w_embed_Image;
              let EmThm = result[0].w_embed_thumb;
              if(result[0].w_embed_welcome == 0) {
              const noton = new Discord.MessageEmbed()
              .setColor("#fc5d71")
              .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
              .setDescription(`
              The embed system has not been setup for this guild.
              You have to run this setup command again and use the \`0 index\`
              `)
              message.channel.send(noton)
              } else if (result[0].w_embed_welcome == 1) {
              if (result[0].w_embed_Image_on == 1) {
              if (result[0].w_embed_thumb_on == 0) {
              const ENSetup = new Discord.MessageEmbed()
              .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
              .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
              .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
              .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
              .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
              .setImage(EmImg)
              .setTimestamp();
              message.channel.send("**PREVIEW OF \`EMBED\` WELCOME SETUP**", ENSetup);
              } else {
              const ENSetup1 = new Discord.MessageEmbed()
              .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
              .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
              .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
              .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
              .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
              .setImage(EmImg)
              .setThumbnail(EmThm)
              .setTimestamp();
              message.channel.send("**PREVIEW OF \`EMBED\` WELCOME SETUP**", ENSetup1);
              }
              } else if (result[0].w_embed_Image_on == 0) {
              if (result[0].w_embed_thumb_on == 1) {
              const ENSetup2 = new Discord.MessageEmbed()
              .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
              .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
              .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
              .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
              .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
              .setThumbnail(EmThm)
              .setTimestamp();
              message.channel.send("**PREVIEW OF \`EMBED\` WELCOME SETUP**", ENSetup2);
              } else {
              const ENSetup3 = new Discord.MessageEmbed()
              .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
              .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
              .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
              .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
              .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
              .setTimestamp();
              message.channel.send("**PREVIEW OF \`EMBED\` WELCOME SETUP**", ENSetup3);
              }
              }
              }
              });
          break;
          case "13":
            let select13 = sql.query("SELECT w_embed_welcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            if(result[0].w_embed_welcome == 0) {
            const noton = new Discord.MessageEmbed()
            .setColor("#fc5d71")
            .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
            .setDescription(`
            The embed system has not been setup for this guild.
            You have to run this setup command again and use the \`0 index\`
            `)
            message.channel.send(noton)
            } else {
            client.wembed.set(message.guild.id, "GREETINGS", "WEmbedTitle");
            client.wembed.set(message.guild.id, "", "WEmbedAuthor");
            client.wembed.set(message.guild.id, "#FAAFAF", "WEmbedColor");
            client.wembed.set(message.guild.id, `🎑 Thank you for Joining **${message.guild.name}**\nWe're very excited that you joined us\nHope you have a fun time here **(>‿◠)**`, "WEmbedMessage");
            client.wembed.set(message.guild.id, "", "WEmbedFooter");
            let ResetEm = "https://media.discordapp.net/attachments/711910361133219903/899392123906961458/55.png?width=1089&height=612";
            let ResetTm = "https://media.discordapp.net/attachments/711910361133219903/899392847436980265/54.jpg";
            let sqler = "UPDATE welcome SET w_embed_Image = '" + ResetEm + "' WHERE guildId  = " + message.guild.id;
            sql.query(sqler);
            let sqltr = "UPDATE welcome SET w_embed_thumb = '" + ResetTm + "' WHERE guildId  = " + message.guild.id;
            sql.query(sqltr);
            let sqlr0 = "UPDATE welcome SET w_embed_welcome = " + 0 + " WHERE guildId = " + message.guild.id;
            sql.query(sqlr0);
            let sqlr01 = "UPDATE welcome SET w_embed_Image_on = " + 1 + " WHERE guildId = " + message.guild.id;
            sql.query(sqlr01);
            let sqlr02 = "UPDATE welcome SET w_embed_thumb_on = " + 1 + " WHERE guildId = " + message.guild.id;
            sql.query(sqlr02);
            /////////// Code By Kotlin#0427
            let sqlnew = sql.query("SELECT w_embed_thumb, w_embed_Image FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
            let wembedimage = result[0].w_embed_Image;  
            let wembedthumb = result[0].w_embed_thumb;         
            let Resemb = new MessageEmbed()
            .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
            .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
            .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
            .setThumbnail(wembedthumb)
            .setImage(wembedimage)
            .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
            .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
            .setTimestamp();
            message.channel.send("**RESTED THE \`EMBED\` WELCOME SETUP**", Resemb);
            });
            }
            });
          break;
          case "14":
              let sqleone = "UPDATE welcome SET w_embed_welcome = " + 1 + " WHERE guildId = " + message.guild.id;
              sql.query(sqleone);
              const weison = new Discord.MessageEmbed()
              .setTitle("<:bxcheck:895478636046606346> WELCOME EMBED ENABLED SUCCESS")
              .setColor("#0066ff")
              .setDescription(`Embed welcome setup has been enabled for **${message.guild.name}**`)
              message.channel.send(weison);
          break;
          case "15":
              let sqleofe = "UPDATE welcome SET w_embed_welcome = " + 0 + " WHERE guildId = " + message.guild.id;
              sql.query(sqleofe);
              const emdoff = new Discord.MessageEmbed()
              .setTitle("<:bxcheck:895478636046606346> WELCOME EMBED DISABLED SUCCESS")
              .setColor("#0066ff")
              .setDescription(`Embed welcome setup has been disabled for **${message.guild.name}**`)
              message.channel.send(emdoff);
          break;
          case "16":
            const pinglog = new Discord.MessageEmbed()
            .setColor("#0082ea")
            .setTitle(":pushpin: ENTER EMBED CHANNEL!")
            .setDescription("**You can ping your \`embed\` welcome channel now.**")
            message.lineReply(pinglog).then(msg=>{
              msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 80000, errors: ["TIME"]}).then(collected=>{
                if (!message.member.hasPermission("MANAGE_CHANNELS")) {
                  const Nopermission = new Discord.MessageEmbed()
                  .setColor("#f04949")
                  .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
                  .setDescription(`You don't have permissions to set embed channel!`)
                  message.channel.send(Nopermission);
                 }
                 let channel = collected.first().mentions.channels.first();
                 if (!channel) {
                  return message.lineReply("<:thinkingface:867897965380108288> **| Hmm, You have to enter a channel!**");
                 }
                 const sqlquery = "SELECT w_embed_channel AS res FROM welcome WHERE guildId = " + message.guild.id;
                 sql.query(sqlquery, function (error, results, fields) {
                  if (error) return console.log(error);
                  if (results[0]) {
                   const update = "UPDATE welcome SET w_embed_channel = " + channel.id + " WHERE guildId = " + message.guild.id;
                   sql.query(update, function (error, results, fields) {
                    if (error) console.log(error);
                    const euccess = new Discord.MessageEmbed()
                    .setColor("#46c300")
                    .setTitle("<:checkvector:869193650184269834> CHANNEL SUCCESS!")
                    .setDescription(`**Successfully updated \`embed\` welcome channel**\nNew welcome channel is ${channel}\nRun \`${prefix}setup -> Welcome & Leave System \` to reset settings!`)
                    message.channel.send(euccess);
                    let select16 = sql.query("SELECT w_embed_welcome, w_embed_Image, w_embed_thumb, w_embed_Image_on, w_embed_thumb_on FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
                      let EmImg = result[0].w_embed_Image;
                      let EmThm = result[0].w_embed_thumb;
                      if(result[0].w_embed_welcome == 0) {
                      const noton = new Discord.MessageEmbed()
                      .setColor("#fc5d71")
                      .setTitle("<:xvector2:869193716575911966> EMBED SYSTEM NOT SETUP")
                      .setDescription(`
                      The embed system has not been setup for this guild.
                      You have to run \`${prefix}setup -> Embed Welcome System\` and use the \`0 index\`
                      `)
                      channel.send(noton)
                      } else if (result[0].w_embed_welcome == 1) {
                      if (result[0].w_embed_Image_on == 1) {
                      if (result[0].w_embed_thumb_on == 0) {
                      const ENSetup = new Discord.MessageEmbed()
                      .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
                      .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
                      .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
                      .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
                      .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
                      .setImage(EmImg)
                      .setTimestamp();
                      channel.send("**NEW \`EMBED\` WELCOME CHANNEL**", ENSetup);
                      } else {
                      const ENSetup1 = new Discord.MessageEmbed()
                      .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
                      .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
                      .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
                      .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
                      .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
                      .setImage(EmImg)
                      .setThumbnail(EmThm)
                      .setTimestamp();
                      channel.send("**NEW \`EMBED\` WELCOME CHANNEL**", ENSetup1);
                      }
                      } else if (result[0].w_embed_Image_on == 0) {
                      if (result[0].w_embed_thumb_on == 1) {
                      const ENSetup2 = new Discord.MessageEmbed()
                      .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
                      .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
                      .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
                      .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
                      .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
                      .setThumbnail(EmThm)
                      .setTimestamp();
                      channel.send("**NEW \`EMBED\` WELCOME CHANNEL**", ENSetup2);
                      } else {
                      const ENSetup3 = new Discord.MessageEmbed()
                      .setTitle(client.wembed.get(message.guild.id, "WEmbedTitle"))
                      .setAuthor(client.wembed.get(message.guild.id, "WEmbedAuthor"), message.author.displayAvatarURL())
                      .setColor(client.wembed.get(message.guild.id, "WEmbedColor"))
                      .setDescription(client.wembed.get(message.guild.id, "WEmbedMessage"))
                      .setFooter(client.wembed.get(message.guild.id, "WEmbedFooter"), message.guild.iconURL())
                      .setTimestamp();
                      channel.send("**NEW \`EMBED\` WELCOME CHANNEL**", ENSetup3);
                      }
                      }
                      }
                      });
                   });
                  }
                 });
              })
            })
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
 * @welcomeDM FINISHED
 */
  function _welcomeDM(){
    let rembed = new MessageEmbed()
    .setColor(config.color)
    .setAuthor("What would you like to do?", `${message.guild.iconURL()}`)
    .setDescription(`
    **0.** \`DM Setup\` - Creates one DM welcome setup.
    **1.** \`Embed Author\` - Let's you edit the embed author.
    **2.** \`Embed Title\` - Let's you edit the embed title.
    **3.** \`Embed Color\` - Let's you edit the embed color.
    **4.** \`Manage Image\` - Let's you change the embed Image.
    **5.** \`Embed Footer\` - Let's you edit the embed footer.
    **6.** \`Manage Message\` - Let's you change the embed message.
    **7.** \`Enable DM Embed\` - Enables the Welcome DM embed.
    **8.** \`Disable DM Embed\` - Disables the Welcome DM embed.
    **9.** \`Enable Embed Image\` - Enables the Welcome DM Image.
    **10.** \`Disable Embed Image\` - Disables the Welcome DM Image.
    **11.** \`DM Preview\` - Get a preview of the DM message in your DM
    **12.** \`Reset All\` - Resets all settings for DM Welcome setup.
    **13.** \`Enable DM Welcome\` - Enables the Welcome DM message.
    **14.** \`Disable DM Welcome\` - Disables the Welcome DM message.
    `)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    .setThumbnail(config.avatarUrl)
    message.lineReply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:50000,errors:['time']}).then(async collected=>{
      switch(collected.first().content.toString()){
        case "0":
          client.wdm.ensure(message.guild.id, { "WelcomeDmAuthor": ""});
          client.wdm.ensure(message.guild.id, { "WelcomeDmColor": "#F184B4"});
          client.wdm.ensure(message.guild.id, { "WelcomeDmFooter": `Sent by Admins from ${message.guild.name}`});
          client.wdm.ensure(message.guild.id, { "WelcomeDmTitle": `GREETINGS`});
          client.wdm.ensure(message.guild.id, { "WelcomeDmMessage": `⛱ Thank you for Joining **${message.guild.name}**\nWe're very excited that you joined us\nHope you have a fun time here **^_^**`});
          let MDMBG = "https://media.discordapp.net/attachments/711910361133219903/899370200246407208/2.jpg?width=1089&height=612";
          let sqlMDMSetup = "UPDATE welcome SET DMBackground = '" + MDMBG + "' WHERE guildId  = " + message.guild.id;
          sql.query(sqlMDMSetup);
          let sqlDM = "UPDATE welcome SET DMWelcome = " + 1 + " WHERE guildId = " + message.guild.id;
          sql.query(sqlDM);
          let sqlEDM = "UPDATE welcome SET DMEmbed = " + 1 + " WHERE guildId = " + message.guild.id;
          sql.query(sqlEDM);
          let sqlIMDM = "UPDATE welcome SET DMImage = " + 1 + " WHERE guildId = " + message.guild.id;
          sql.query(sqlIMDM);
          let DmWel = sql.query("SELECT DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**PREVIEW OF \`DM\` WELCOME SETUP**", DMSetup);
          });
        break;
        case "1":
          let dm1 = sql.query("SELECT DMWelcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if(result[0].DMWelcome == 0) {
          const dnoton = new Discord.MessageEmbed()
          .setColor("#fc5d71")
          .setTitle("<:xvector2:869193716575911966> DM SYSTEM NOT SETUP YET")
          .setDescription(`
          The dm system has not been setup for this guild.
          You have to run this setup command again and use the \`0 index\`
          `)
          message.channel.send(dnoton)
          } else {
          const enterAuthor = new Discord.MessageEmbed()
          .setColor("#0082ea")
          .setTitle(":incoming_envelope: ENTER DM EMBED AUTHOR!")
          .setDescription(`You can enter the message of the embed author`)
          message.channel.send(enterAuthor).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 880000, errors: ["TIME"]}).then(collected=>{
          let AuthorMessage = collected.first().content
          client.wdm.set(message.guild.id, AuthorMessage, `WelcomeDmAuthor`); 
          let DmWel = sql.query("SELECT DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if (err) console.log(err);
          let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**\`DM\` EMBED AUTHOR SUCCESS**", DMSetup);
          });
          }).catch(error=>{
          console.log(error)
          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
          });
          });
          }
          });
        break;
        case "2":
          let dm2 = sql.query("SELECT DMWelcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if(result[0].DMWelcome == 0) {
          const dnoton = new Discord.MessageEmbed()
          .setColor("#fc5d71")
          .setTitle("<:xvector2:869193716575911966> DM SYSTEM NOT SETUP YET")
          .setDescription(`
          The dm system has not been setup for this guild.
          You have to run this setup command again and use the \`0 index\`
          `)
          message.channel.send(dnoton)
          } else {
          const enterTitle = new Discord.MessageEmbed()
          .setColor("#0082ea")
          .setTitle(":incoming_envelope: ENTER DM EMBED TITLE!")
          .setDescription(`You can enter the message of the embed title`)
          message.channel.send(enterTitle).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 880000, errors: ["TIME"]}).then(collected=>{
          let TitleMessage = collected.first().content
          client.wdm.set(message.guild.id, TitleMessage, `WelcomeDmTitle`); 
          let DmWel = sql.query("SELECT DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if (err) console.log(err);
          let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**\`DM\` EMBED TITLE SUCCESS**", DMSetup);
          });
          }).catch(error=>{
          console.log(error)
          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
          });
          });
          }
          });
        break;
        case "3":
          let dm3 = sql.query("SELECT DMWelcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if(result[0].DMWelcome == 0) {
          const dnoton = new Discord.MessageEmbed()
          .setColor("#fc5d71")
          .setTitle("<:xvector2:869193716575911966> DM SYSTEM NOT SETUP YET")
          .setDescription(`
          The dm system has not been setup for this guild.
          You have to run this setup command again and use the \`0 index\`
          `)
          message.channel.send(dnoton)
          } else {
          const enterColor = new Discord.MessageEmbed()
          .setColor("#0082ea")
          .setTitle(":art: ENTER DM EMBED COLOR!")
          .setDescription(`You can enter the message of the embed title`)
          message.channel.send(enterColor).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 880000, errors: ["TIME"]}).then(collected=>{
          let content = collected.first().content
          if(!content.startsWith("#") && content.length !== 7){
          message.lineReply("<:xvector:869193619318382602> **| WRONG COLOR CODE**")
          } else {
          if(isValidColor(content)){
          client.wdm.set(message.guild.id, content, `WelcomeDmColor`); 
          let DmWel = sql.query("SELECT DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if (err) console.log(err);
          let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**\`DM\` EMBED COLOR SUCCESS**", DMSetup);
          });
          }
          }
          function isValidColor(str) {
          return str.match(/^#[a-f0-9]{6}$/i) !== null;
          }
          }).catch(error=>{
          console.log(error)
          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
          });
          });
          }
          });
        break;
        case "4":
          let dm4 = sql.query("SELECT DMWelcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if(result[0].DMWelcome == 0) {
          const dnoton = new Discord.MessageEmbed()
          .setColor("#fc5d71")
          .setTitle("<:xvector2:869193716575911966> DM SYSTEM NOT SETUP YET")
          .setDescription(`
          The dm system has not been setup for this guild.
          You have to run this setup command again and use the \`0 index\`
          `)
          message.channel.send(dnoton)
          } else {
          const enterImage = new Discord.MessageEmbed()
          .setColor("#0082ea")
          .setTitle(":park: ENTER DM EMBED IMAGE!")
          .setDescription(`You can enter any Image\nFrom local system or url from the internet`)
          message.lineReply(enterImage).then(msg => {
          msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:70000,errors:['time']}).then(collected=>{     
          function attachIsImage(msgAttach) {
          url = msgAttach.url;
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
          // saveImageToDisk(" " + url + " ", "./lib/img/shop/" + Date.now() + ".png") //saves the image to local storage
          let sqlDmbg = "UPDATE welcome SET DMBackground = '" + url + "' WHERE guildId  = " + message.guild.id;
          var query = sql.query(sqlDmbg, function(err, result) { 
          if (err) console.log(err);
          let DmWel = sql.query("SELECT DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if (err) console.log(err);
          let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**\`DM\` EMBED BACKGROUND SUCCESS**", DMSetup);
          });
          });
          }
          else{
          message.lineReply("<:xvector2:869193716575911966> An error occured somewhere\nWhich makes me not able to set the image.")
          }
          }
          else if (collected.first().content.includes("https")||collected.first().content.includes("http")){
          let sqlDMWbg = "UPDATE welcome SET DMBackground = '" + collected.first().content + "' WHERE guildId  = " + message.guild.id;
          var query = sql.query(sqlDMWbg, function(err, result) {
          if (err) console.log(err);
          let DmWel = sql.query("SELECT DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if (err) console.log(err);
          let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**\`DM\` EMBED BACKGROUND SUCCESS**", DMSetup);
          });
          });
          }
          }).catch(error=>{
          console.log(error)
          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
          });
          });
          }
          });
        break;
        case "5":
          let dm5 = sql.query("SELECT DMWelcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if(result[0].DMWelcome == 0) {
          const dnoton = new Discord.MessageEmbed()
          .setColor("#fc5d71")
          .setTitle("<:xvector2:869193716575911966> DM SYSTEM NOT SETUP YET")
          .setDescription(`
          The dm system has not been setup for this guild.
          You have to run this setup command again and use the \`0 index\`
          `)
          message.channel.send(dnoton)
          } else {
          const enterFooter = new Discord.MessageEmbed()
          .setColor("#0082ea")
          .setTitle(":incoming_envelope: ENTER DM EMBED FOOTER!")
          .setDescription(`You can enter the message of the embed footer`)
          message.channel.send(enterFooter).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 880000, errors: ["TIME"]}).then(collected=>{
          let FooterMessage = collected.first().content
          client.wdm.set(message.guild.id, FooterMessage, `WelcomeDmFooter`); 
          let DmWel = sql.query("SELECT DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if (err) console.log(err);
          let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**\`DM\` EMBED FOOTER SUCCESS**", DMSetup);
          });
          }).catch(error=>{
          console.log(error)
          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
          });
          });
          }
          });
        break;
        case "6":
          let dm6 = sql.query("SELECT DMWelcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if(result[0].DMWelcome == 0) {
          const dnoton = new Discord.MessageEmbed()
          .setColor("#fc5d71")
          .setTitle("<:xvector2:869193716575911966> DM SYSTEM NOT SETUP YET")
          .setDescription(`
          The dm system has not been setup for this guild.
          You have to run this setup command again and use the \`0 index\`
          `)
          message.channel.send(dnoton)
          } else {
          const enterMessage = new Discord.MessageEmbed()
          .setColor("#0082ea")
          .setTitle(":incoming_envelope: ENTER DM EMBED MESSAGE!")
          .setDescription(`You can enter the message of the embed`)
          message.channel.send(enterMessage).then(msg=>{
          msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 880000, errors: ["TIME"]}).then(collected=>{
          let FooterMessage = collected.first().content
          client.wdm.set(message.guild.id, FooterMessage, `WelcomeDmMessage`); 
          let DmWel = sql.query("SELECT DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if (err) console.log(err);
          let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**NEW \`DM\` EMBED MESSAGE**", DMSetup);
          });
          }).catch(error=>{
          console.log(error)
          return message.lineReply("<:thinkingface:867897965380108288> **| HMMM IT SEEMS YOUR TIME RAN OUT!**")
          });
          });
          }
          });
        break;
        case "7":
          let dm7 = sql.query("SELECT DMWelcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if(result[0].DMWelcome == 0) {
          const dnoton = new Discord.MessageEmbed()
          .setColor("#fc5d71")
          .setTitle("<:xvector2:869193716575911966> DM SYSTEM NOT SETUP YET")
          .setDescription(`
          The dm system has not been setup for this guild.
          You have to run this setup command again and use the \`0 index\`
          `)
          message.channel.send(dnoton)
          } else {
          let sqldmEnable = "UPDATE welcome SET DMEmbed = " + 1 + " WHERE guildId = " + message.guild.id;
          sql.query(sqldmEnable);
          let DmWelEn = sql.query("SELECT DMEmbed, DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if (err) console.log(err);
          if (result[0].DMEmbed == 1) {
          let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**\`DM\` WELCOME EMBED ENABLED**", DMSetup); 
          } else if (result[0].DMEmbed == 0) {
          message.channel.send("**\`DM\` WELCOME EMBED IS DISABLED**\n\n", client.wdm.get(message.guild.id, "WelcomeDmMessage"));
          }
          });
          }
          });
        break;
        case "8":
          let dm8 = sql.query("SELECT DMWelcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if(result[0].DMWelcome == 0) {
          const dnoton = new Discord.MessageEmbed()
          .setColor("#fc5d71")
          .setTitle("<:xvector2:869193716575911966> DM SYSTEM NOT SETUP YET")
          .setDescription(`
          The dm system has not been setup for this guild.
          You have to run this setup command again and use the \`0 index\`
          `)
          message.channel.send(dnoton)
          } else {
          let sqldmDisable = "UPDATE welcome SET DMEmbed = " + 0 + " WHERE guildId = " + message.guild.id;
          sql.query(sqldmDisable);
          let DmDisable = sql.query("SELECT DMEmbed, DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if (err) console.log(err);
          if (result[0].DMEmbed == 0) {
          message.channel.send(`**\`DM\` WELCOME EMBED DISABLED**\n\n${client.wdm.get(message.guild.id, "WelcomeDmMessage")}`);
          } else if (result[0].DMEmbed == 1) {
          let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**\`DM\` WELCOME EMBED IS ENABLED**", DMSetup);  
          }
          });
          }
          });
        break;
        case "9":
          let dm9 = sql.query("SELECT DMWelcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if(result[0].DMWelcome == 0) {
          const dnoton = new Discord.MessageEmbed()
          .setColor("#fc5d71")
          .setTitle("<:xvector2:869193716575911966> DM SYSTEM NOT SETUP YET")
          .setDescription(`
          The dm system has not been setup for this guild.
          You have to run this setup command again and use the \`0 index\`
          `)
          message.channel.send(dnoton)
          } else {
          let sqlDmImageOn = "UPDATE welcome SET DMImage = " + 1 + " WHERE guildId = " + message.guild.id;
          sql.query(sqlDmImageOn);
          let DmEnable = sql.query("SELECT DMImage, DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if (err) console.log(err);
          if (result[0].DMImage == 0) {
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**DM** EMBED IMAGE IS DISABLED", DMSetup);  
          } else if (result[0].DMImage == 1) {
           let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**\`DM\` EMBED IMAGE ENABLED**", DMSetup);
          }
          });
          }
          });
        break;
        case "10":
          let dm10 = sql.query("SELECT DMWelcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if(result[0].DMWelcome == 0) {
          const dnoton = new Discord.MessageEmbed()
          .setColor("#fc5d71")
          .setTitle("<:xvector2:869193716575911966> DM SYSTEM NOT SETUP YET")
          .setDescription(`
          The dm system has not been setup for this guild.
          You have to run this setup command again and use the \`0 index\`
          `)
          message.channel.send(dnoton)
          } else {
          let sqlDmImageOff = "UPDATE welcome SET DMImage = " + 0 + " WHERE guildId = " + message.guild.id;
          sql.query(sqlDmImageOff);
          let SqlDm = sql.query("SELECT DMImage, DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if (err) console.log(err);
          if (result[0].DMImage == 0) {
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**\`DM\` EMBED IMAGE DISABLED**", DMSetup);  
          } else if (result[0].DMImage == 1) {
           let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**\`DM\` EMBED IMAGE IS ENABLED**", DMSetup);
          }
          });
          }
          });
        break;
        case "11":
          let WelDm = sql.query("SELECT DMWelcome, DMEmbed, DMImage, DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if (result[0].DMWelcome == 0) {
          let DmDisable = new Discord.MessageEmbed()
          .setColor('#ff7a1d')
          .setTitle(`DM WELCOME IS DISABLED`)
          .setDescription(`
          The **DM** welcome for **${message.guild.name}** is Disabled
          Contact your server admins to enable it for Preview
          `)
          message.channel.send(DmDisable);
          } else if (result[0].DMWelcome == 1) {
          if (result[0].DMEmbed == 1) {
          if (result[0].DMImage == 1) {
          let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.author.send("**PREVIEW OF \`DM\` WELCOME SETUP**", DMSetup);
          } else {
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.author.send("**PREVIEW OF \`DM\` WELCOME SETUP**", DMSetup);
          }
          } else if (result[0].DMEmbed == 0) {
          message.author.send(`**PREVIEW OF \`DM\` WELCOME SETUP**\n\n${client.wdm.get(message.guild.id, "WelcomeDmMessage")}`);
          } 
          }
          });
          const sendt = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setTitle("CHECK YOUR DM")
          .setDescription(`You should see the preview in your dm\nIf for some reason it you don't see it\nmake to you've allowed message **DMS** in your discord settings`)
          message.channel.send(sendt, "**CHECK YOUR DM**")
        break;
        case "12":
          let dm12 = sql.query("SELECT DMWelcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if(result[0].DMWelcome == 0) {
          const dnoton = new Discord.MessageEmbed()
          .setColor("#fc5d71")
          .setTitle("<:xvector2:869193716575911966> DM SYSTEM NOT SETUP YET")
          .setDescription(`
          The dm system has not been setup for this guild.
          You have to run this setup command again and use the \`0 index\`
          `)
          message.channel.send(dnoton)
          } else {
          client.wdm.set(message.guild.id, "", "WelcomeDmAuthor");
          client.wdm.set(message.guild.id, "#F184B4", "WelcomeDmColor");
          client.wdm.set(message.guild.id, `Sent by Admins from ${message.guild.name}`, "WelcomeDmFooter");
          client.wdm.set(message.guild.id, `GREETINGS`, "WelcomeDmTitle");
          client.wdm.set(message.guild.id, `⛱ Thank you for Joining **${message.guild.name}**\nWe're very excited that you joined us\nHope you have a fun time here **^_^**`, "WelcomeDmMessage");
          let DMBG = "https://media.discordapp.net/attachments/711910361133219903/899370200246407208/2.jpg?width=1089&height=612";
          let sqlDMR = "UPDATE welcome SET DMBackground = '" + DMBG + "' WHERE guildId  = " + message.guild.id;
          sql.query(sqlDMR);
          let sqlRDM = "UPDATE welcome SET DMWelcome = " + 0 + " WHERE guildId = " + message.guild.id;
          sql.query(sqlRDM);
          let sqlREDM = "UPDATE welcome SET DMEmbed = " + 0 + " WHERE guildId = " + message.guild.id;
          sql.query(sqlREDM);
          let sqlRIMDM = "UPDATE welcome SET DMImage = " + 0 + " WHERE guildId = " + message.guild.id;
          sql.query(sqlRIMDM);
          let WelcoDm = sql.query("SELECT DMBackground FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          let DMBackground = result[0].DMBackground;
          const DMSetup = new Discord.MessageEmbed()
          .setColor(client.wdm.get(message.guild.id, "WelcomeDmColor"))
          .setAuthor(`${client.wdm.get(message.guild.id, "WelcomeDmAuthor")}`, message.guild.iconURL())
          .setTitle(client.wdm.get(message.guild.id, "WelcomeDmTitle"))
          .setDescription(client.wdm.get(message.guild.id, "WelcomeDmMessage"))
          .setImage(DMBackground)
          .setFooter(`${client.wdm.get(message.guild.id, "WelcomeDmFooter")}`, client.user.displayAvatarURL())
          .setTimestamp();
          message.channel.send("**RESTED THE \`DM\` WELCOME SETUP**", DMSetup);
          });
          }
          });
        break;
        case "13":
          let dm13 = sql.query("SELECT DMWelcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if(result[0].DMWelcome == 0) {
          let sqlDME = "UPDATE welcome SET DMWelcome = " + 1 + " WHERE guildId = " + message.guild.id;
          sql.query(sqlDME);
          const DMsuccess = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> WELCOME DM ENABLED!")
          .setDescription(`**Successfully Enabled \`DM\` welcome message**\nRun \`${prefix}setup -> welcome & leave\` to disable the DM welcome`)
          message.channel.send(DMsuccess);
          } else {
          const alreon = new Discord.MessageEmbed()
          .setColor("#ff590c")
          .setTitle("DM SYSTEM IS ALREADY ENABLED")
          .setDescription(`
          The dm system has already been enabled for this guild.
          You can run this setup command again to disable it or reset it
          `)
          message.channel.send(alreon)
          }
          });
        break;
        case "14":
          let dm14 = sql.query("SELECT DMWelcome FROM welcome WHERE guildId = ?;", message.guild.id, function (err, result, fields) {
          if(result[0].DMWelcome == 1) {
          let sqlDMD = "UPDATE welcome SET DMWelcome = " + 0 + " WHERE guildId = " + message.guild.id;
          sql.query(sqlDMD);
          const DMDsuccess = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> WELCOME DM DISABLED!")
          .setDescription(`**Successfully Disabled \`DM\` welcome message**\nRun \`${prefix}setup -> welcome & leave\` to enable the DM welcome`)
          message.channel.send(DMDsuccess);
          } else {
          const alreoff = new Discord.MessageEmbed()
          .setColor("#ff590c")
          .setTitle("DM SYSTEM IS NOT ENABLED")
          .setDescription(`
          The dm system is not enabled for this guild yet.
          You can run this setup command again to enable it or reset it
          `)
          message.channel.send(alreoff)
          }
          });
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
 * @defaultwelcomesystem FINISHED
 */
  function _DefaultWelcome(){
    let rembed = new MessageEmbed()
    .setColor(config.color)
    .setAuthor("What would you like to do?", `${message.guild.iconURL()}`)
    .setDescription(`
    **1.** \`Set Welcome Channel\` - Set a default welcome channel.
    **2.** \`Set Leave Channel\` - Set a default leave channel.
    **3.** \`Reset-Both\` - Resets settings for Default Welcome & Leave.
    **4.** \`Enable Welcome/leave\` - Enable default welcome/leave.
    **5.** \`Disable Welcome/leave\` - Disable default welcome/leave.
    **6.** \`Check Welcome Channel\` - Check default welcome channel.
    **7.** \`Check leave Channel\` - Check default leave channel.
    **8.** \`Change Welcome Message\` - Change default welcome message.
    `)
    .setFooter("PICK YOUR INDEX NUMBER", message.author.displayAvatarURL())
    .setThumbnail(config.avatarUrl)
    message.lineReply(rembed).then(msg => {
    msg.channel.awaitMessages(m=>m.author.id===message.author.id,{max:1,time:50000,errors:['time']}).then(async collected=>{
      switch(collected.first().content.toString()){
        case "1":
          client.wdsystem.ensure(message.guild.id, { "defaultWelcomeMsg": "Thank you for joining us\nWe're happy to have you with us" });
          let Dwelbg = "https://media.discordapp.net/attachments/711910361133219903/893604349698277397/welcome.png?width=1440&height=514";
          let sqldgb = "UPDATE welcome SET background = '" + Dwelbg + "' WHERE guildId  = " + message.guild.id;
          sql.query(sqldgb);
          const pingwelc = new Discord.MessageEmbed()
          .setColor("#0082ea")
          .setTitle(":pushpin: ENTER WELCOME CHANNEL!")
          .setDescription("You can ping your welcome channel now")
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
                  .setDescription(client.wdsystem.get(message.guild.id, "defaultWelcomeMsg"))
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
                  .setDescription(`Success! New channel for welcome messages is ${channel}`)
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
                  .setDescription(client.wdsystem.get(message.guild.id, "defaultWelcomeMsg"))
                  .setImage("attachment://welcome.png")
                  .attachFiles(attachment);
                  channel.send(Newdefaultembed);
                  })();
                 });
                 });
                }
               });
            });
          });
        break;
        case "2":
          const pingleavec = new Discord.MessageEmbed()
          .setColor("#0082ea")
          .setTitle(":pushpin: ENTER LEAVE CHANNEL!")
          .setDescription("You can ping your leave channel now.")
          message.lineReply(pingleavec).then(msg=>{
            msg.channel.awaitMessages(m=>m.author.id === message.author.id, {max: 1, time: 80000, errors: ["TIME"]}).then(collected=>{
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
                  .setDescription(`**Successfully updated default leave channel**\nNew leave channel is ${channel}\nRun \`${prefix}setup -> Welcome & Leave System \` to enable this channel!`)
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
                 const insert1 = "INSERT INTO `leave` (`guildId`, `channelid`, `message`, `enabled`, `CustomEnabled`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`) VALUES (" + guild.id + ", "+ channel.id +", ':crying_cat_face: Good bye.. We hope to see you again.', '0', '0', 'https://media.discordapp.net/attachments/711910361133219903/877887340947853372/goodbye.png?width=1440&height=514', '#ff4d4d', '#ff4d4d', '#ff4d4d', '#ff4d4d', '#ff4d4d', '#ff4d4d');";
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
            });
          });
        break;
        case "3":
          client.wdsystem.set(message.guild.id, "Thank you for joining us\nWe're happy to have you with us", `defaultWelcomeMsg`);
          let TDwelbg = "https://media.discordapp.net/attachments/711910361133219903/893604349698277397/welcome.png?width=1440&height=514";
          let sqltdgb = "UPDATE welcome SET background = '" + TDwelbg + "' WHERE guildId  = " + message.guild.id;
          sql.query(sqltdgb);
          let TDweleabg = "https://media.discordapp.net/attachments/711910361133219903/877887340947853372/goodbye.png?width=1440&height=514";
          let sqltdlegb = "UPDATE `leave` SET `background` = '" + TDweleabg + "' WHERE `guildId`  = " + message.guild.id;
          sql.query(sqltdlegb);
          let sql1 = "UPDATE `welcome` SET `channelid` = " + 0 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql1);
          let sql2 = "UPDATE `leave` SET `channelid` = " + 0 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql2);
          const wellssuccess3 = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> SUCCESS!")
          .setDescription(`**Successfully Rested Default \`WELCOME & LEAVE\` System**\nYou can set a new channel settings with \`${prefix}setup -> welcome & leave.\``)
          message.channel.send(wellssuccess3);
        break;
        case "4":
          client.wdsystem.ensure(message.guild.id, { "defaultWelcomeMsg": "Thank you for joining us\nWe're happy to have you with us" });
          let sql6 = "UPDATE `welcome` SET `enabled` = " + 1 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql6);
          let sql7 = "UPDATE `leave` SET `enabled` = " + 1 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql7);
          const welcome1 = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> SUCCESS!")
          .setDescription(`**Successfully Enabled \`WELCOME\` and \`LEAVE\` System**\nYou can disable the settings with \`${prefix}setup -> Welcome & Leave.\``)
          message.channel.send(welcome1);
        break;
        case "5":
          client.wdsystem.ensure(message.guild.id, { "defaultWelcomeMsg": "Thank you for joining us\nWe're happy to have you with us" });
          let sql11 = "UPDATE `welcome` SET `enabled` = " + 0 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql11);
          let sql12 = "UPDATE `leave` SET `enabled` = " + 0 + " WHERE `guildId` = " + message.guild.id;
          sql.query(sql12);
          const welcome2 = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> SUCCESS!")
          .setDescription(`**Successfully Disabled \`WELCOME\` and \`LEAVE\` System**\nYou can enabled this settings with \`${prefix}setup -> Welcome & Leave System.\``)
          message.channel.send(welcome2);
        break;
        case "6":
          client.wdsystem.ensure(message.guild.id, { "defaultWelcomeMsg": "Thank you for joining us\nWe're happy to have you with us" });
          if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            const Nopermission1 = new Discord.MessageEmbed()
            .setColor("#f04949")
            .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
            .setDescription(`You don't have permissions to check welcome channel!`)
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
              
              **Default welcome message for your guild**
              ${client.wdsystem.get(message.guild.id, "defaultWelcomeMsg")}
              `)
              message.channel.send(check1);
             } else {
              const check2 = new Discord.MessageEmbed()
              .setColor("#1775f2")
              .setTitle("<:xvector2:869193716575911966> WELCOME NOT ENABLED YET!")
              .setDescription(`**You haven't enabled the default welcome system on this server yet.**\nRun \`${prefix}setup -> welcome & leave -> enable-welcome\` to enabled welcome system!`)
              message.channel.send(check2);
             }
            });
        break;
        case "7":
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
              .setDescription(`**Your current leave channel is: <#${results[0].res}>**\nYou can channge the channel using \`${prefix}setup -> welcome & leave\``)
              message.channel.send(check1);
             } else {
              const check2 = new Discord.MessageEmbed()
              .setColor("#1775f2")
              .setTitle("<:xvector2:869193716575911966> LEAVE NOT ENABLED YET!")
              .setDescription(`**You haven't enabled the default leave system on this server yet.**\nRun \`${prefix}setup -> welcome & leave -> enable-leave\` to enabled leave system!`)
              message.channel.send(check2);
             }
            });
        break;
        case "8":
          client.wdsystem.ensure(message.guild.id, { "defaultWelcomeMsg": "Thank you for joining us\nWe're happy to have you with us" });
          const enterMessage = new Discord.MessageEmbed()
          .setColor("#0082ea")
          .setTitle(":incoming_envelope: ENTER YOUR MESSAGE!")
          .setDescription(`You can change the default welcome message!`)
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
          client.wdsystem.set(message.guild.id, NewMessage, `defaultWelcomeMsg`); 
          if (error) console.log(error);
          const upmsg = new Discord.MessageEmbed()
          .setColor("#006eee")
          .setTitle("<:checkvector:869193650184269834> NEW MESSAGE UPDATED!")
          .setDescription(`**Successfully Updated the Default Welcome Message!**\nYou can run \`${prefix}setup -> welcome & leave\` to change the background Image!`)
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
          .setDescription(client.wdsystem.get(message.guild.id, "defaultWelcomeMsg"))
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
      });
      });
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

  /**
 * @welcomesetup FINISHED
 */
  function _welcome(){
    let rembed = new MessageEmbed()
    .setColor(config.color)
    .setAuthor("What would you like to do?", `${message.guild.iconURL()}`)
    .setDescription(`
    **0.** \`Create Setup\` - Creates a Welcome channel setup.
    **1.** \`Manage Message\` - Let's you edit the Welcome Message.
    **2.** \`Manage Image\` - Let's you change the background Image.
    **3.** \`Manage Role\` - Let's you manage the welcome roles.
    **4.** \`Reset All\` - Resets all settings for Custom Welcome.
    **5.** \`Enable Welcome\` - Enables Custom Welcome.
    **6.** \`Disable Welcome\` - Disables Custom Welcome.
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
          .setColor(config.color)
          .setAuthor("What do you want to do?", `${message.guild.iconURL()}`)
          .setDescription(`
          **1.** \`Change Background\` - Changes Background Image.
          **2.** \`Change Border Color\` - Changes Color of the border.
          **3.** \`Change Username Box\` - Changes Color of the Username-box.
          **4.** \`Change Discriminator\` - Changes Color of the discriminator-box.
          **5.** \`Change Message Box\` - Changes Color of the message-box.
          **6.** \`Change Title Color\` - Changes Color of the Title.
          **7.** \`Change Avatar Color\` - Changes Color of the Avatar.
          **8.** \`Change Embed Color\` - Changes Color of the Embed.
          **9.** \`Enable Welcome Embed\` - Enable's embed of the welcome card.
          **10.** \`Disable Welcome Embed\` - Disable's embed of the welcome card.
          **11.** \`Reset All Changes\` - Resets welcome card changes to default.
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
                    .setDescription(`**Successfully Rested \`WELCOME CARD\` Changes**\n*You can set a new changes settings with \`${prefix}setup -> welcome & leave.\`*`)
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
          let NotCompleted3 = new Discord.MessageEmbed()
          .setColor('#f862ff')
          .setThumbnail(config.Kotlin)
          .setTitle(`THIS FEATURE IS STILL UNDER CONSTRUCTION`)
          .setDescription(`
          **${message.author.username}** this feature is still being constructed by **Kotlin#0427**
          You will have to wait for a while or join my [support](https://discord.com/invite/tyjhKE3VdB) server to know when it would be released
          `)
          message.channel.send(NotCompleted3);
          break;
        case "4":
          client.settings.delete(message.guild.id, "welcomeMsg");
          const sql1del = "DELETE FROM welcome WHERE guildId = " + message.guild.id;
          sql.query(sql1del, function (error, results, fields) {
          if (error) return console.log(error);
          const sql4 = "INSERT INTO `welcome` (`guildId`, `message`,  `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`) VALUES (" + message.guild.id + ", ':heart: Thanks for joining us at', ':partying_face: Thanks for joining us.', '0', '0', '1', 'lib/img/welcome.png', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c');";
          sql.query(sql4, function (error, results, fields) {if (error) console.log(error);});
          const wellssuccess3 = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> RESET SUCCESS!")
          .setDescription(`**Successfully Rested \`WELCOME\` System**\n*You can set a new settings settings with \`${prefix}setup -> welcome & leave.\`*`)
          message.channel.send(wellssuccess3);
          });
          break;
          case "5":
            let sql60 = "UPDATE `welcome` SET `CustomEnabled` = " + 1 + " WHERE `guildId` = " + message.guild.id;
            sql.query(sql60);
            const welcome1 = new Discord.MessageEmbed()
            .setColor("#46c300")
            .setTitle("<:checkvector:869193650184269834> SUCCESS!")
            .setDescription(`**Successfully Enabled Custom \`WELCOME\` System**\n*You can disable the settings with \`${prefix}setup -> Welcome & Leave System.\`*`)
            message.channel.send(welcome1);
            break;
            case "6":
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
    .setColor(config.color)
    .setAuthor("What would you like to do?", `${message.guild.iconURL()}`)
    .setDescription(`
    **0.** \`Create Setup\` - Creates a Leave channel setup.
    **1.** \`Manage Message\` - Let's you edit the Leave Message.
    **2.** \`Manage Image\` - Let's you change the background Image.
    **3.** \`Reset All\` - Resets all settings for Custom Leave.
    **4.** \`Enable Leave\` - Enables Custom Leave.
    **5.** \`Disable Leave\` - Disables Custom Leave.
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
          .setColor(config.color)
          .setAuthor("What do you want to do?", `${message.guild.iconURL()}`)
          .setDescription(`
          **1.** \`Change Background\` - Changes Background Image.
          **2.** \`Change Border Color\` - Changes Color of the border.
          **3.** \`Change Username Box\` - Changes Color of the Username-box.
          **4.** \`Change Discriminator\` - Changes Color of the discriminator-box.
          **5.** \`Change Message Box\` - Changes Color of the message-box.
          **6.** \`Change Title Color\` - Changes Color of the Title.
          **7.** \`Change Avatar Color\` - Changes Color of the Avatar.
          **8.** \`Change Embed Color\` - Changes Color of the Embed.
          **9.** \`Enable Leave Embed\` - Enable's the embed of the leave card.
          **10.** \`Disable Leave Embed\` - Disable's the embed of the leave card.
          **11.** \`Reset All Changes\` - Resets leave card changes to default.
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
                    .setDescription(`**Successfully Rested \`LEAVE CARD\` Changes**\n*You can set a new changes settings with \`${prefix}setup -> welcome & leave.\`*`)
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
          const sql4 = "INSERT INTO `leave` (`guildId`, `message`, `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`) VALUES (" + message.guild.id + ", ':crying_cat_face: Good bye.. We hope to see you again.', ':crying_cat_face: Good bye.. We hope to see you again.', '0', '0', '1', 'https://media.discordapp.net/attachments/711910361133219903/877887340947853372/goodbye.png?width=1440&height=514', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29');";
          sql.query(sql4, function (error, results, fields) {if (error) console.log(error);});
          const wellssuccess3 = new Discord.MessageEmbed()
          .setColor("#46c300")
          .setTitle("<:checkvector:869193650184269834> RESET SUCCESS!")
          .setDescription(`**Successfully Rested \`LEAVE\` System**\n*You can set a new settings settings with \`${prefix}setup -> welcome & leave.\`*`)
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