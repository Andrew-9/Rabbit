const Discord = require("discord.js");
const sql = require("../../utilities/database");
const ms = require("parse-ms");
const StateManager = require("../../utilities/state_manager");
const { MessageButton } = require('discord-buttons');
const guildPrefix = new Map();
module.exports = {
  name: "reward",
  category: "Economy",
  aliases: [""],
  usage: "reward",
  description: "Claim your reward after completion the economy progress",

  run: async (client, message, args) => {
    let con = sql.query("SELECT `enabled` FROM `economy_ward` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
    let isEnabled = result[0].enabled
    if (isEnabled == 0) {
    const EcoNotEnabled = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:xvector:869193619318382602> ECONOMY SYSTEM NOT ENABLED")
    .setDescription(`The economical system of this server is not **enabled**\nContact the admins of the server to enable it.`)
    return message.lineReply(EcoNotEnabled); 
    } else if (isEnabled == 1) {
    (async () => {
    const prefix = guildPrefix.get(message.guild.id);
    let b = sql.query("SELECT buyer, fish, crime, work FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
    if(result == 0) { 
    let register = "INSERT INTO economy (userId, balance, bank, sales_balance, username, is_jailed, buyer, fish, crime, work, cardtype) VALUES ('" + message.author.id + "', '0', '0', '0',' " + message.author.username + "', '0','0','0','0','0','1');";
    sql.query(register)
    let NoAccount = new Discord.MessageEmbed()
    .setColor('#e53637')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setAuthor(message.author.tag)
    .setDescription(`**${message.author.username}** you do not have an account.\nfortunately one has been opened for you`)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL());
    message.channel.send(NoAccount);
    } else {
    if (result[0].buyer < 50) {
    let nope = new Discord.MessageEmbed()
    .setColor('#ff547a')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setTitle(`PROGRESS STILL IN PROCESS`)
    .setDescription(`
    **${message.author.username}** you must have bought \`50\`
    products from the global market to get rewards here
    `)
    message.channel.send(nope);
    } else if (result[0].fish < 100) {
    let nope1 = new Discord.MessageEmbed()
    .setColor('#ff547a')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setTitle(`PROGRESS STILL IN PROCESS`)
    .setDescription(`
    **${message.author.username}** you must have fished up to
    \`100\` times to get rewards from here. so continue fishing
    `)
    message.channel.send(nope1);
    } else if (result[0].crime < 100) {
    let nope2 = new Discord.MessageEmbed()
    .setColor('#ff547a')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setTitle(`PROGRESS STILL IN PROCESS`)
    .setDescription(`
    **${message.author.username}** you must have committed up to
    \`100\` crimes to get rewards from here. 
    So continue breaking the law to finish.
    `)
    message.channel.send(nope2);
    } else if (result[0].work < 100){
    let nope3 = new Discord.MessageEmbed()
    .setColor('#ff547a')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setTitle(`PROGRESS STILL IN PROCESS`)
    .setDescription(`
    **${message.author.username}** you must have worked up to
    \`100\` times to get rewards from here.
    So continue working hard to finish.
    `)
    message.channel.send(nope3);
    } else {
    if (args[0] === "daily") {
      if (message.member.roles.cache.some(role => role.id === '871855079987220541')) {
        const prefix = guildPrefix.get(message.guild.id);
        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
         if (error) console.log(error);
          const logsetup = results[0].res;
          const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
          if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
          if (!log) return;
          if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
            message.guild.fetchAuditLogs().then((logs) => { 
            let timeout = 79990000;
            let com = sql.query("SELECT reward_daily FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
            let TheTime = result[0].reward_daily
            if (TheTime !== null && timeout - (Date.now() - TheTime) > 0) {
            let time = ms(timeout - (Date.now() - TheTime));
            message.channel.send(`⏰ **|** You need to wait another **${time.hours}h ${time.minutes}m ${time.seconds}s**\nBefore you can use this command again.`);
            } else {
            const daily = ["🍰 You bought up to \`50\` products from the global market\nfor that here's your daily reward of", "🐟 You have caught up to \`100\` fishes\nHere's your daily reward of", "🎭 You have committed up to \`100\` crimes\nVery impressive for that take", "🦺 You have worked up to \`100\` times. a very good woker\nFor that I think you deserve this"];
            randomDaily = daily[Math.floor(Math.random() * daily.length)];
            var DailyAward = 50000;
            let DailyAmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(DailyAward);
            let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
            if(result == 0) { 
            let register = "INSERT INTO economy (userId, balance, bank, sales_balance, username, is_jailed, buyer, fish, crime, work) VALUES ('" + message.author.id + "', '0', '0', '0',' " + message.author.username + "', '0','0','0','0','0');";
            sql.query(register)
            let NoAccount = new Discord.MessageEmbed()
            .setColor('#e53637')
            .setThumbnail(message.author.avatarURL({ dynamic:true }))
            .setAuthor(message.author.tag)
            .setDescription(`**${message.author.username}** you do not have an account.\nfortunately one has been opened for you\nBut you will not receive the rewards for this round.`)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL());
            message.channel.send(NoAccount);
            } else {
            let c = sql.query("SELECT is_jailed FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
            if (result[0].is_jailed == 1) {
            const beenjailed = new Discord.MessageEmbed()
            .setColor("#ea4d4d")
            .setTitle("<:xvector:869193619318382602> YOU HAVE BEEN JAILED!!")
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`You will have to **bail** yourself out first\nTo bail yourself out of prison use \`${prefix}bail\``)
            message.lineReply(beenjailed);	
            } else {
            let sql8 = 'UPDATE economy SET reward_daily = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
            sql.query(sql8);
            message.channel.send(`${randomDaily} **${DailyAmountGiven}<:dollars:881559643820793917>**`);
            let sql5 = 'UPDATE economy SET balance = balance+' + DailyAward + ' WHERE userId = ' + message.author.id + '';
            sql.query(sql5);
            let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
            let giveamount = result[0].balance
            let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
            const DailyRewards = new Discord.MessageEmbed()
            .setColor('#125bf8')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(`**${message.author.username}** was awarded with a daily reward of **${DailyAmountGiven}<:dollars:881559643820793917>**\nUser now has a total of **${AmountGiven}<:dollars:881559643820793917>**`)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL());
            log.send(DailyRewards);
            }); 
            }
            });
            }
          });
         }
        });
      });
    })
      } else {
      const NoRole = new Discord.MessageEmbed()
      .setColor("#f04949")
      .setTitle("<:xvector:869193619318382602> YOU'RE NOT A MEMBER OF MY GUILD!")
      .setDescription(`You have to be a member of my [support](https://discord.com/invite/tyjhKE3VdB) guild to use this command\n**Note:** only members in that guild can use the command to claim rewards`);
      return message.channel.send(NoRole);
      }
    }
    if (args[0] === "weekly") {
      if (message.member.roles.cache.some(role => role.id === '871855079987220541')) {
        const prefix = guildPrefix.get(message.guild.id);
        let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
         if (error) console.log(error);
          const logsetup = results[0].res;
          const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
          if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
          if (!log) return;
          if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
            message.guild.fetchAuditLogs().then((logs) => { 
            let timeout = 604800000;
            let com = sql.query("SELECT reward_weelky FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
            let TheTime = result[0].reward_weelky
            if (TheTime !== null && timeout - (Date.now() - TheTime) > 0) {
            let time = ms(timeout - (Date.now() - TheTime));
            message.channel.send(`⏰ **|** You need to wait another **${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**\nBefore you can use this command again.`);
            } else {
            const weekly = ["🍰 You bought up to \`50\` products from the global market\nfor that here's your weelky reward of", "🐟 You have caught up to \`100\` fishes\nHere's your weekly reward of", "🎭 You have committed up to \`100\` crimes\nVery impressive for that take", "🦺 You have worked up to \`100\` times. a very good woker\nFor that I think you deserve this"];
            randomWeekly = weekly[Math.floor(Math.random() * weekly.length)];
            var WeeklyAward = 100000;
            let WeeklyAmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(WeeklyAward);
            let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
            if(result == 0) { 
            let register = "INSERT INTO economy (userId, balance, bank, sales_balance, username, is_jailed, buyer, fish, crime, work) VALUES ('" + message.author.id + "', '0', '0', '0',' " + message.author.username + "', '0','0','0','0','0');";
            sql.query(register)
            let NoAccount = new Discord.MessageEmbed()
            .setColor('#e53637')
            .setThumbnail(message.author.avatarURL({ dynamic:true }))
            .setAuthor(message.author.tag)
            .setDescription(`**${message.author.username}** you do not have an account.\nfortunately one has been opened for you\nBut you will not receive the rewards for this round.`)
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL());
            message.channel.send(NoAccount);
            } else {
            let c = sql.query("SELECT is_jailed FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
            if (result[0].is_jailed == 1) {
            const beenjailed = new Discord.MessageEmbed()
            .setColor("#ea4d4d")
            .setTitle("<:xvector:869193619318382602> YOU HAVE BEEN JAILED!!")
            .setThumbnail(message.author.displayAvatarURL())
            .setDescription(`You will have to **bail** yourself out first\nTo bail yourself out of prison use \`${prefix}bail\``)
            message.lineReply(beenjailed);	
            } else {
            let sql8 = 'UPDATE economy SET reward_weelky = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
            sql.query(sql8);
            message.channel.send(`${randomWeekly} **${WeeklyAmountGiven}<:dollars:881559643820793917>**`);
            let sql5 = 'UPDATE economy SET balance = balance+' + WeeklyAward + ' WHERE userId = ' + message.author.id + '';
            sql.query(sql5);
            let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
            let giveamount = result[0].balance
            let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
            const WeelkyRewards = new Discord.MessageEmbed()
            .setColor('#125bf8')
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(`**${message.author.username}** was awarded with a weekly reward of **${WeeklyAmountGiven}<:dollars:881559643820793917>**\nUser now has a total of **${AmountGiven}<:dollars:881559643820793917>**`)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL());
            log.send(WeelkyRewards);
            }); 
            }
            });
            }
          });
         }
        });
      });
    })
      } else {
      const NoRole = new Discord.MessageEmbed()
      .setColor("#f04949")
      .setTitle("<:xvector:869193619318382602> YOU'RE NOT A MEMBER OF MY GUILD!")
      .setDescription(`You have to be a member of my [support](https://discord.com/invite/tyjhKE3VdB) guild to use this command\n**Note:** only members in that guild can use the command to claim rewards`);
      return message.channel.send(NoRole);
      }
    }
    if (args[0] === "role") {
    if (message.member.roles.cache.some(role => role.id === '871855079987220541')) {
    const custom = new Discord.MessageEmbed()
    .setColor("#12ffb4")
    .setTitle("<:checkvector:869193650184269834> GET YOUR CUSTOM ROLE FROM A MOD!")
    .setDescription(`**${message.author.username}** you can go ahead and **ping** a mod to create\nA role for you. if no one answers then ping **Kotlin#0427**`);
    message.channel.send(custom);
    } else {
    const NoRole = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("<:xvector:869193619318382602> YOU'RE NOT A MEMBER OF MY GUILD!")
    .setDescription(`You have to be a member of my [support](https://discord.com/invite/tyjhKE3VdB) guild to use this command\n**Note:** only members in that guild can use the command to claim rewards`);
    return message.channel.send(NoRole);
    }
    }
    if (args[0] === "claimrole") {
    if (message.member.roles.cache.some(role => role.id === '871855079987220541')) {
    let RewardRole = message.member.guild.roles.cache.find(role => role.id === "883269049813991444");
    if(message.member.roles.cache.has(RewardRole.id)) {
    const Already = new Discord.MessageEmbed()
    .setColor("#ff308c")
    .setTitle("<:xvector:869193619318382602> YOU ALREADY HAVE THAT ROLE!")
    .setDescription(`**${message.author.username}** you already have that role in your profile\nGet another role or buy from the \`Black Market\``);
    return message.channel.send(Already);
    } else {
    message.member.roles.add(RewardRole.id)
    const claimed = new Discord.MessageEmbed()
    .setColor("#12ffb4")
    .setTitle("<:checkvector:869193650184269834> ROLE CLAIM SUCCESS!")
    .setDescription(`**${message.author.username}** you have successfully claimed the reward role`);
    message.channel.send(claimed);
    }
    } else {
    const NoRole = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("<:xvector:869193619318382602> YOU'RE NOT A MEMBER OF MY GUILD!")
    .setDescription(`You have to be a member of my [support](https://discord.com/invite/tyjhKE3VdB) guild to use this command\n**Note:** only members in that guild can use the command to claim rewards`);
    return message.channel.send(NoRole);
    }
    } if (args[0] === "rolemembers") {
    let RewardRole = message.member.guild.roles.cache.find(role => role.id === "883269049813991444");
    let membersWithRole = message.guild.roles.cache.get(RewardRole.id).members;
    const rolelist = new Discord.MessageEmbed()
    .setColor("#ffac07")
    .setTitle("<:xquestion:888362040647909406> ROLE MEMBERS COUNT!")
    .setDescription(`This reward role has been claimed by **${membersWithRole.size}** members`);
    message.channel.send(rolelist);
    }
    if (args[0] === "xpcounter") {
    if (message.member.roles.cache.some(role => role.id === '871855079987220541')) {
    const custom = new Discord.MessageEmbed()
    .setColor("#12ffb4")
    .setTitle("<:checkvector:869193650184269834> GET 5XP COUNTER ON MESSAGE!")
    .setDescription(`**${message.author.username}** you can go ahead and **ping** a mod to give\nYou **5xp** counter. if no one answers then ping **Kotlin#0427**`);
    message.channel.send(custom);
    } else {
    const NoRole = new Discord.MessageEmbed()
    .setColor("#f04949")
    .setTitle("<:xvector:869193619318382602> YOU'RE NOT A MEMBER OF MY GUILD!")
    .setDescription(`You have to be a member of my [support](https://discord.com/invite/tyjhKE3VdB) guild to use this command\n**Note:** only members in that guild can use the command to claim rewards`);
    return message.channel.send(NoRole);
    }
    } else if (!args[0]) {
    const rlist = new Discord.MessageEmbed()
    .setColor("#ff7900")
    .setTitle("<:xquestion:888362040647909406> REWARD COMMANDS LIST")
    .setDescription(`
    <:rabbitbullet:887617523925778443> ... **1** - \`role\`
    <:rabbitbullet:887617523925778443> ... **2** - \`daily\`
    <:rabbitbullet:887617523925778443> ... **3** - \`weekly\`
    <:rabbitbullet:887617523925778443> ... **4** - \`xpcounter\`
    <:rabbitbullet:887617523925778443> ... **5** - \`claimrole\`
    <:rabbitbullet:887617523925778443> ... **6** - \`rolemembers\`
    `)
    return message.channel.send(rlist);
    }
    }
    }   
    });
 })();
 }
});
  }
};

StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});
