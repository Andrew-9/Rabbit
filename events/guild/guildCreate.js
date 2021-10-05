const Discord = require("discord.js");
const chalk = require("chalk");
const config = require("../../config");
const sql = require("../../utilities/database");

module.exports = async (client, guild) => {
 try {
    const sql1 = "INSERT INTO `guilds` (`guildId`, `guild_prefix`) VALUES (" + guild.id + ", 'r!');";
    sql.query(sql1, function (error, results, fields) {if (error) console.log(error);});

    const sql2 = "INSERT INTO `ranking` (`guildId`, `enabled`, `embedEnable`, `cardtype`, `backgroundimage`) VALUES (" + guild.id + ", '0', '1', '0', 'lib/img/rank.jpg');";
    sql.query(sql2, function (error, results, fields) {if (error) console.log(error);});

    const sql3 = "INSERT INTO `logs` (`guildId`, `enabled`) VALUES (" + guild.id + ", '0');";
    sql.query(sql3, function (error, results, fields) {if (error) console.log(error);});

    const sql4 = "INSERT INTO `welcome` (`guildId`,  `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`) VALUES (" + guild.id + ", '0', '0', '1', 'https://media.discordapp.net/attachments/711910361133219903/893604349698277397/welcome.png?width=1440&height=514', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c', '#ffab2c');";
    sql.query(sql4, function (error, results, fields) {if (error) console.log(error);});

    const sql5 = "INSERT INTO `leave` (`guildId`, `message`, `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`) VALUES (" + guild.id + ", ':crying_cat_face: Good bye.. We hope to see you again.', '0', '0', '1', 'https://media.discordapp.net/attachments/711910361133219903/877887340947853372/goodbye.png?width=1440&height=514', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29', '#ff5f29');";
    sql.query(sql5, function (error, results, fields) {if (error) console.log(error);});

    const sql7 = "INSERT INTO `economy_ward` (`guildId`, `enabled`) VALUES (" + guild.id + ", '0');";
    sql.query(sql7, function (error, results, fields) {if (error) console.log(error);});

    const sql8 = "INSERT INTO `boosters` (`guildId`, `enabled`) VALUES (" + guild.id + ", '0');";
    sql.query(sql8, function (error, results, fields) {if (error) console.log(error);});

    client.custom.ensure(guild.id, { playlists: [] });
    client.settings.ensure(guild.id, { djroles: [], playingembed: "", playingchannel: ""});

    console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(`Guild data created for: `) + chalk.blue.bold.underline(guild.name) + chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(guild.id));
    const Gchannel = client.channels.cache.get(config.guildcreate);
    if (Gchannel) {
    const joined = new Discord.MessageEmbed()
    .setColor("#ff8100")
    .setTitle(":inbox_tray: NEW GUILD JOINED!!")
    .setThumbnail(guild.iconURL())
    .setDescription(`
    <:rabbitbullet:887617523925778443> **Guild ID** - \`${guild.id}\`
    <:rabbitbullet:887617523925778443> **Guild Name** - ${guild.name}
    <:rabbitbullet:887617523925778443> **Guild Members** - ${guild.memberCount}
    `)
    Gchannel.send(joined);
    } else {
      return;
    }
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    const Thanks = new Discord.MessageEmbed()
    .setColor("#ff690e")
    .setThumbnail(config.avatarUrl)
    .setTitle("<:happyrabbit:868230223961919548> THANKS FOR INVITING ME!")
    .setDescription(`**Let's get you \`STARTED\` with setting up everything.**\n*For more information about me \`r!info\`*\n*You want to see all my commands? then use \`r!help\`*\n*To get started setting up **\`r!setup\`** and follow the Instructions.*`)
    .setFooter("Rabbit by Kotlin#0427", guild.iconURL())
    .setTimestamp();
    channel.send(Thanks);
    console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(` New guild joined: `) + chalk.blue.bold.underline(guild.name) + chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(guild.id) + chalk.cyan.bold(") This guild has ") + chalk.blue.bold.underline(guild.memberCount) + chalk.cyan.bold(" members!"));
 } catch (err) {
  console.log(err);
 }
};