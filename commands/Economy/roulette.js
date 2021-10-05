const Discord = require("discord.js");
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
const ms = require("parse-ms");
function toFixed(x) {
if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
      }
    }
return x;
}
module.exports = {
    name: "roulette",
    aliases: ["rou", "ro"],
    description: "Bet a color to win or lose\nBets are totally being controlled by you.",
    category: "Economy",
    usage: "roulette",
    run: async (client, message, args) => {
        try {
            const prefix = guildPrefix.get(message.guild.id);
            let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
             if (error) console.log(error);
              const logsetup = results[0].res;
              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
              if (!log) return;
              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                message.guild.fetchAuditLogs().then((logs) => { 
                    let timeout = 20000;
                    let com = sql.query("SELECT roulette FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    let TheTime = result[0].roulette
                    if (TheTime !== null && timeout - (Date.now() - TheTime) > 0) {
                    let time = ms(timeout - (Date.now() - TheTime));
                    message.channel.send(`⏰ **|** You need to wait another  **${time.minutes}m ${time.seconds}s**\nBefore you can play the game again`);
                    } else {
                    let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                    if(result == 0) { 
                    let register ="INSERT INTO economy (userId, balance, bank, username, is_jailed, cardtype) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '0', '1');";
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
                    let sql4 = 'UPDATE economy SET roulette = ' + Date.now() + ' WHERE userId = ' + message.author.id + '';
                    sql.query(sql4);
                    let scon = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    let betmoney = result[0].balance
                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(betmoney);
                    function isOdd(num) { 
                    if ((num % 2) == 0) {
                    return false;
                    } else if ((num % 2) == 1) {
                    return true;
                    }
                    else if ((num % 3) == 2) {
                    return true;
                    }
                    }
                    let colour = args[0];
                    let money = parseInt(args[1]);
                    let random = Math.floor((Math.random() * 10));
                    if (!colour) {
                    let CEmbed = new Discord.MessageEmbed()
                    .setColor('#ff0d87')
                    .setAuthor(`SPECIFY A COLOR TO BET`, message.author.avatarURL())
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`
                    💸 **Green** | Your bet results would be Multiplier: **15x**
                    🔴 **Red** | Your bet results would be Multiplier: **1.5x**
                    ⚫ **Black** | Your bet results would be Multiplier: **2x**
                    🟠 **Orange** | Your bet results would be Multiplier: **3x**
                    🟣 **Purple** | Your bet results would be Multiplier: **5x**
                    `)
                    return message.channel.send(CEmbed);
                    } 
                    colour = colour.toLowerCase()
                    if (!money) {
                    message.channel.send(`<:xvector2:869193716575911966> Specify an amount to gamble\nYou can use \`${prefix}roulette\` red 150\nAnd that would bet with **$150.00**<:dollars:881559643820793917>`);
                    } else if (money <= toFixed(betmoney)){
                    if (colour == "b" || colour.includes("black")) {
                    colour = 0;
                    } else if (colour == "r" || colour.includes("red")) {
                    colour = 1;
                    } else if (colour == "g" || colour.includes("green")) {
                    colour = 2;
                    } else if (colour == "o" || colour.includes("orange")) {
                    colour = 3;
                   } else if (colour == "p" || colour.includes("purple")) {
                    colour = 4;
                    } else {
                    let lEmbed = new Discord.MessageEmbed()
                    .setColor('#ff0d87')
                    .setAuthor(`LIST OF BET AND REWARDS`, message.author.avatarURL())
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`
                    💸 **Green** | Your bet results would be Multiplier: **15x**
                    🔴 **Red** | Your bet results would be Multiplier: **1.5x**
                    ⚫ **Black** | Your bet results would be Multiplier: **2x**
                    🟠 **Orange** | Your bet results would be Multiplier: **3x**
                    🟣 **Purple** | Your bet results would be Multiplier: **5x**
                    `)
                    return message.channel.send(lEmbed);
                    }
                    if (random == 1 && colour == 2) { // Green
                    money *= 15
                    let sqlM = 'UPDATE economy SET balance = balance+' + money + '  WHERE userId = ' + message.author.id + '';
                    sql.query(sqlM);
                    let WinAmount = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(money);
                    message.channel.send(`:money_with_wings: You won **${WinAmount}** <:dollars:881559643820793917>\nYour bet resulted in **Multiplier: 15x**`);
                    } else if (isOdd(random) && colour == 1) { // Red
                    money = parseInt(money * 1.5)
                    let WinAmount = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(money)
                    let sqlMR = 'UPDATE economy SET balance = balance+' + money + '  WHERE userId = ' + message.author.id + '';
                    sql.query(sqlMR);
                    message.channel.send(`🔴 You won **${WinAmount}** <:dollars:881559643820793917>\nYour bet resulted in **Multiplier: 1.5x**`);
                    } else if (!isOdd(random) && colour == 0) { // Black
                    money = parseInt(money * 2)
                    let WinAmount = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(money)
                    let sqlMB = 'UPDATE economy SET balance = balance+' + money + '  WHERE userId = ' + message.author.id + '';
                    sql.query(sqlMB);
                    message.channel.send(`⚫ You won **${WinAmount}** <:dollars:881559643820793917>\nYour bet resulted in **Multiplier: 2x**`);
                    } else if (isOdd(random) && colour == 3) { // Orange
                    money = parseInt(money * 3)
                    let WinAmount = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(money)
                    let sqlMR = 'UPDATE economy SET balance = balance+' + money + '  WHERE userId = ' + message.author.id + '';
                    sql.query(sqlMR);
                    message.channel.send(`🟠 You won **${WinAmount}** <:dollars:881559643820793917>\nYour bet resulted in **Multiplier: 3x**`);
                    } else if (isOdd(random) && colour == 4) { // Purple
                    money = parseInt(money * 5)
                    let WinAmount = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(money)
                    let sqlMP = 'UPDATE economy SET balance = balance+' + money + '  WHERE userId = ' + message.author.id + '';
                    sql.query(sqlMP);
                    message.channel.send(`🟣 You won **${WinAmount}** <:dollars:881559643820793917>\nYour bet resulted in **Multiplier: 5x**`);
                    } else { // Wrong
                    let LostAmount = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(money)
                    let addbank = 'UPDATE economy SET balance = balance-' + money + ' WHERE userId = ' + message.author.id + '';
                    sql.query(addbank);
                    message.channel.send(`<:xvector2:869193716575911966> You lost **${LostAmount}** <:dollars:881559643820793917> \nYour bet resulted in **Multiplier: 0x**`);
                    }
                    } else {
                    message.channel.send(`<:xvector2:869193716575911966> You're biting more than you can chew\nHere's your total balance of **${TotalBalance}**<:dollars:881559643820793917>`);
                    }
                    // let con = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
                    // let giveamount = result[0].balance
                    // let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                    // const Rewards = new Discord.MessageEmbed()
                    // .setColor('#125bf8')
                    // .setAuthor(message.author.tag, message.author.avatarURL())
                    // .setDescription(`**${message.author.username}** was awarded with **${WinAmount}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                    // .setThumbnail(message.author.displayAvatarURL())
                    // .setTimestamp()
                    // .setFooter(message.guild.name, message.guild.iconURL());
                    // log.send(Rewards);
                    // }); WILL LOG IT LATER 
                    });                
                    }
                   });
                  }
                });
                } 
               });
              });
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
StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});