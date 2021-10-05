const Discord = require("discord.js");
const sql = require("../../utilities/database");
const { promptMessage } = require("../../utilities/functions");
const jailed = new Set();
const Rockdown = new Set();

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    name: "rockpaperscissors",
    aliases: ["rps"],
    description: "Play rock paper scissors against **Rabbit**!\nSelect the reactions to play the game!\nBeat **Rabbit** and make some money.\nloose to **Rabbit** and you'll loose **300$**",
    category: "Economy",
    usage: "rockpaperscissors",
    run: async (client, message, args) => {
        try {
            let con = sql.query("SELECT channelid AS res FROM economy_ward WHERE guildid = " + message.guild.id, function (error, results, fields) {
             if (error) console.log(error);
              const logsetup = results[0].res;
              const log = message.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
              if (!message.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
              if (!log) return;
              if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
                (async () => {
                if(jailed.has(message.author.id)){
                    const beenjailed = new Discord.MessageEmbed()
                    .setColor("#ea4d4d")
                    .setTitle("<:xvector:869193619318382602> YOU HAVE BEEN JAILED!!")
                    .setDescription("**Wait `5` minutes from the jailing to continue**")
                    .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
                    .setTimestamp();
                    message.lineReply(beenjailed);
                    } else if (Rockdown.has(message.author.id)) {
                        message.lineReply("<:xvector:869193619318382602> **| wait `2` seconds and try again**");
                    } else {
                    var WonAward = Math.floor(Math.random() *(128)) + 0;
                    let AmountGiven = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(WonAward);
                    Rockdown.add(message.author.id);
                    setTimeout(() => {
                        Rockdown.delete(message.author.id);
                    }, 2000);
                    let GameEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription(`Play rock paper scissors with **Rabbit**`)
                    .setTimestamp()
                    .setFooter(message.guild.me.displayName, client.user.displayAvatarURL())
                    const m = await message.channel.send(GameEmbed);
                    const reacted = await promptMessage(m, message.author, 30, chooseArr);
                    const RabbitChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
                    let results = getResult(reacted, RabbitChoice);
                    await m.reactions.removeAll();
                    m.edit({embed: {color: 'RANDOM', author: { name: message.guild.name, icon_url: message.guild.iconURL() }, fields: [{ name: `**${results}**`, value: `**${message.member.displayName}** ${reacted} **VS** ${RabbitChoice} **${message.guild.me.displayName}**`, inline: true }]}});
                    function getResult(me, RabbitChoice) {
                    if ((me === "🗻" && RabbitChoice === "✂") ||
                    (me === "📰" && RabbitChoice === "🗻") ||
                    (me === "✂" && RabbitChoice === "📰")) {
                    let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){ 
                    if(result == 0) { 
                    let register ="INSERT INTO economy (userId, balance, bank, username, bal_color, cardtype) VALUES ('" + message.author.id + "', '0', '0',' " + message.author.username + "', '0','1');";
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
                    let sql3 = 'UPDATE economy SET balance = balance+' + WonAward + ' WHERE userId = ' + message.author.id + '';
                    sql.query(sql3);
                    let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                    let giveamount = result[0].balance
                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                    const Rewards = new Discord.MessageEmbed()
                    .setColor('#125bf8')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription(`**${message.author.username}** won in rock paper scissors\nAnd was awarded with **${AmountGiven}<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(message.guild.name, message.guild.iconURL());
                    log.send(Rewards);
                    });
                    } 
                    });
                    return "You won!"
                    } else if (me === RabbitChoice) {
                    return "Its a tie!";
                    } else {
                    let sql3 = 'UPDATE economy SET balance = balance-300 WHERE userId = ' + message.author.id + '';
                    sql.query(sql3);
                    let c = sql.query("SELECT balance FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields){
                    let giveamount = result[0].balance
                    let TotalBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(giveamount);
                    let lostEmbed = new Discord.MessageEmbed()
                    .setColor('#e53637')
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription(`**${message.author.username}** lost to **Rabbit** in rock paper scissors\nAs a result they lost **300.00<:dollars:881559643820793917>**\nUser now has **${TotalBalance}<:dollars:881559643820793917>**`)
                    .setTimestamp()
                    .setFooter(message.guild.name, message.guild.iconURL());
                    log.send(lostEmbed);
                    });
                    return "You lost!";
                    }
                  }
                }
            })();
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