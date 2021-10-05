const Discord = require("discord.js");
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();

module.exports = {
 name: "progress",
 aliases: ["pp"],
 category: "Economy",
 description: "You economy progress",
 usage: "progress",
 run: async (client, message, args) => {
  try {
    let con = sql.query("SELECT `enabled` FROM `economy_ward` WHERE `guildId` = ?;", message.guild.id, function (err, result, fields) {
    let isEnabled = result[0].enabled
    if (isEnabled == 0) {
    const EcoNotEnabled = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:xvector:869193619318382602> ECONOMY SYSTEM NOT ENABLED")
    .setDescription(`*The economical system of this server is not **enabled**\nContact the admins of the server to enable it.*`)
    return message.lineReply(EcoNotEnabled); 
    } else if (isEnabled == 1) {
    (async () => {
    let Progress = await message.mentions.members.first() || message.author;
    const prefix = guildPrefix.get(message.guild.id);
    if (message.author === Progress) {
    let b = sql.query("SELECT buyer, fish, crime, work FROM economy WHERE userId = ?;", message.author.id, function (err, result, fields) {
    if(result == 0) {
    let register = "INSERT INTO economy (userId, balance, bank, sales_balance, username, is_jailed, buyer, fish, crime, work, cardtype) VALUES ('" + message.author.id + "', '0', '0', '0',' " + message.author.username + "', '0','0','0','0','0','1');";
    sql.query(register)
    let NoAccount = new Discord.MessageEmbed()
    .setColor('#e53637')
    .setThumbnail(message.author.avatarURL({ dynamic:true }))
    .setAuthor(message.author.tag)
    .setDescription(`**${message.author.username}** you do not have an account.\nfortunately one has been opened for you\nRun the command again to view your progress`)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL());
    message.channel.send(NoAccount);
    } else {
    let ABuyer = result[0].buyer;
    let AWoker = result[0].work;
    let AFisher = result[0].fish;
    let ACriminal = result[0].crime;
    const progress = new Discord.MessageEmbed()
    .setColor("#ff6f0b")
    .setAuthor(`${message.author.username.toUpperCase()}'S PROGRESS`, message.author.displayAvatarURL())
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`
    <:rabbitbullet:887617523925778443> **WORKED:** \`${AWoker}\` times
    <:rabbitbullet:887617523925778443> **FISHED:** \`${AFisher}\` times
    <:rabbitbullet:887617523925778443> **COMMITTED:** \`${ACriminal}\` crimes
    <:rabbitbullet:887617523925778443> **PURCHASED:** \`${ABuyer}\` products
    `)
    message.channel.send(progress);
    }
    });
    } else if (Progress) {
    let Progress = message.mentions.users.first();
    let b = sql.query("SELECT buyer, fish, crime, work FROM economy WHERE userId = ?;", Progress.id, function (err, result, fields) {
    if(result == 0) {
    let register = "INSERT INTO economy (userId, balance, bank, sales_balance, username, is_jailed, buyer, fish, crime, work, cardtype) VALUES ('" + Progress.id + "', '0', '0', '0',' " + Progress.username + "', '0','0','0','0','0','0');";
    sql.query(register)
    let NoAccount = new Discord.MessageEmbed()
    .setColor('#e53637')
    .setThumbnail(Progress.avatarURL({ dynamic:true }))
    .setAuthor(Progress.tag)
    .setDescription(`**${Progress.username}** did not have an account.\nfortunately one has been opened for them\nRun the command again to view their progress`)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL());
    message.channel.send(NoAccount);
    } else {
    let ABuyer = result[0].buyer;
    let AWoker = result[0].work;
    let AFisher = result[0].fish;
    let ACriminal = result[0].crime;
    const progress = new Discord.MessageEmbed()
    .setColor("#ff6f0b")
    .setAuthor(`${Progress.username.toUpperCase()}'S PROGRESS`, Progress.displayAvatarURL())
    .setThumbnail(Progress.displayAvatarURL())
    .setDescription(`
    <:rabbitbullet:887617523925778443> **WORKED:** \`${AWoker}\` times
    <:rabbitbullet:887617523925778443> **FISHED:** \`${AFisher}\` times
    <:rabbitbullet:887617523925778443> **COMMITTED:** \`${ACriminal}\` crimes
    <:rabbitbullet:887617523925778443> **PURCHASED:** \`${ABuyer}\` products
    `)
    message.channel.send(progress);
    }
    });
    }
 })();
 }
});
  } catch (err) { //catch all errors
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