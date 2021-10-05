const Discord = require("discord.js");
const sql = require("../../utilities/database");
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
    name: "deposit",
    aliases: ["dep"],
    description: "Deposit money into your bank account for future uses",
    category: "Economy",
    usage: "deposit <amount>",
    run: async (client, message, args) => {
        try {
            let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
             if (error) console.log(error);
              const logsetup = results[0].res;
              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
              if (!log) return;
              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                 message.guild.fetchAuditLogs().then((logs) => { 
                if (!args.length) {
                    return message.lineReply(`<:xvector:869193619318382602> **| You didn't provide the amount! ${message.author}**`);
                }
                let b = sql.query("SELECT balance, bank FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                if (Object.keys(result).length === 0) {
                let register ="INSERT INTO economy (userId, balance, bank, username, cardtype) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '1');";
                sql.query(register)
                let NoAccount = new Discord.MessageEmbed()
                .setColor('#e53637')
                .setThumbnail(message.author.avatarURL({ dynamic:true }))
                .setAuthor(message.author.tag)
                .setDescription(`**${message.author.username}** you do not have an account.\nfortunately one has been opened for you\nBut you will not receive the rewards for this round.`)
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());
                 message.channel.send(NoAccount);
                } else if (toFixed(args[0]) <= toFixed(result[0].balance) && toFixed(args[0]) >= 0){
                let removebal = 'UPDATE economy SET balance = balance-' + args[0] + ' WHERE userId = ' + message.author.id + '';
                sql.query(removebal);
                let addbank = 'UPDATE economy SET bank = bank+' + args[0] + ' WHERE userId = ' + message.author.id + '';
                sql.query(addbank);
                let DepositedAmount = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(args[0]);
                let balEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription('Deposited **' + DepositedAmount + '<:dollars:881559643820793917>** into bank account!')    
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());  
                message.channel.send(balEmbed);
                const DepositedLog = new Discord.MessageEmbed()
                .setColor('#0e53e7')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`**${message.author.username}** deposited **${DepositedAmount}<:dollars:881559643820793917>**\nInto their bank account!`)
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());
                log.send(DepositedLog);
                } else { 
                let DepositedAmount = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(args[0]);
                let LowBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(result[0].balance);
                let NoMoney = new Discord.MessageEmbed()
                .setColor('#e53637')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("Insufficient Funds. You currently have: **" + LowBalance + "<:dollars:881559643820793917>**")    
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());  
                message.channel.send(NoMoney);
                const InsufficientFunds = new Discord.MessageEmbed()
                .setColor('#e53637')
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`**${message.author.username}** couldn't deposit **${DepositedAmount}<:dollars:881559643820793917>**\nInsufficient funds to deposit.\n Their current balance: **${LowBalance}<:dollars:881559643820793917>**`)
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                .setFooter(message.guild.name, message.guild.iconURL());
                log.send(InsufficientFunds);
                }
                })
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