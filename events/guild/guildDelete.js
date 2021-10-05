const chalk = require("chalk");
const Discord = require("discord.js");
const config = require("../../config");
const sql = require("../../utilities/database");

module.exports = async (client, guild) => {
 try {
   let sql1 = "DELETE FROM `guilds` WHERE guildId = " + guild.id;
   sql.query(sql1);
   let sql2 = "DELETE FROM `boosters` WHERE guildId = " + guild.id;
   sql.query(sql2);
   let sql3 = "DELETE FROM `economy_ward` WHERE guildId = " + guild.id;
   sql.query(sql3);
   let sql4 = "DELETE FROM `leave` WHERE guildId = " + guild.id;
   sql.query(sql4);
   let sql5 = "DELETE FROM `logs` WHERE guildId = " + guild.id;
   sql.query(sql5);
   let sql6 = "DELETE FROM `welcome` WHERE guildId = " + guild.id;
   sql.query(sql6);
   let sql7 = "DELETE FROM `ranking` WHERE guildId = " + guild.id;
   sql.query(sql7, function (error, results, fields) {
   if (error) return console.log(error);
   client.settings.delete(guild.id, "djroles");
   client.settings.delete(guild.id, "playingembed");
   client.settings.delete(guild.id, "playingchannel");
   client.custom.delete(guild.id, "playlists");
   const channel = client.channels.cache.get(config.guilddelete);
   if (channel) {
    const leave = new Discord.MessageEmbed()
    .setColor("#ff8100")
    .setTitle(":outbox_tray: GUILD DATA DELETED!!")
    .setThumbnail(guild.iconURL())
    .setDescription(`
    <:rabbitbullet:887617523925778443> **Guild ID** - \`${guild.id}\`
    <:rabbitbullet:887617523925778443> **Guild Name** - ${guild.name}
    `)
    channel.send(leave);
   } else {
     return;
   }
    console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(` I'v been removed from: `) + chalk.blue.bold.underline(guild.name) + chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(guild.id) + chalk.cyan.bold(")"));
    console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(`Guild data deleted for: `) + chalk.blue.bold.underline(guild.name) + chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(guild.id));
   });
 } catch (err) {
  console.log(err);
 }
};
