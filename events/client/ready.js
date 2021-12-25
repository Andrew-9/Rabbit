const Discord = require("discord.js");
const chalk = require("chalk");
const config = require("../../config");
const { botstatus } = require('../../config');
const gradient = require("gradient-string");
const sql = require("../../utilities/database");
const { Intents } = require('discord.js');
const canvacord = require("canvacord")
const intents = new Intents();
intents.add([
  'GUILDS',
  'GUILD_MEMBERS',
  'GUILD_BANS',
  'GUILD_EMOJIS',
  'GUILD_WEBHOOKS',
  'GUILD_VOICE_STATES',
  'GUILD_MESSAGES',
  'GUILD_MESSAGE_REACTIONS',
  'DIRECT_MESSAGES',
  'DIRECT_MESSAGE_REACTIONS'
]);

module.exports = (client, guild, member) => {
 try {
  function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
  }
  if(botstatus.enabled === true) {
    if(botstatus.activity_type.toUpperCase() == 'STREAMING') {
        client.user.setPresence({activity: {name: botstatus.activity_text, type: botstatus.activity_type.toUpperCase(), url: botstatus.activity_url}, status: botstatus.status.toLowerCase() || 'idle'});
    } else {
        client.user.setPresence({activity: {name: botstatus.activity_text, type: botstatus.activity_type.toUpperCase()}, status: botstatus.status.toLowerCase() || 'idle'});
    };
};

  const datelog = new Date();
  currentDate = datelog.getDate();
  month = datelog.getMonth() + 1;
  year = datelog.getFullYear();
  hour = datelog.getHours();
  min = datelog.getMinutes();
  sec = datelog.getSeconds();
  console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.bold.cyan(" Generated at: " + chalk.blue.bold.underline(currentDate + "/" + month + "/" + year + " | " + hour + ":" + min + "." + sec)));
  console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.bold.cyan(" Client connected! Logged to Discord as ") + chalk.bold.blue.underline(client.user.tag) + chalk.bold.cyan(" (ID: ") + chalk.bold.blue.underline(client.user.id) + chalk.bold.cyan(")!"));
  /* Status Webhook */
  if (!process.env.STATUS_WEBHOOK_ID) throw new Error("[HOST] You need to provide Discord Status Webhook ID in .env - STATUS_WEBHOOK_ID=YOUR_WEBHOOK_ID");
  if (!process.env.STATUS_WEBHOOK_TOKEN) throw new Error("[HOST] You need to provide Discord Status Webhook Token in .env - STATUS_WEBHOOK_TOKEN=YOUR_WEBHOOK_TOKEN");
  const statuswebhook = new Discord.WebhookClient(process.env.STATUS_WEBHOOK_ID, process.env.STATUS_WEBHOOK_TOKEN);
  const status = new Discord.MessageEmbed()
  .setColor("#0096ff")
  .setThumbnail(client.user.displayAvatarURL())
  .setDescription(`**${capitalizeFirstLetter(client.user.username)} is now online!\nServing in ${client.guilds.cache.size} Guilds\nWith ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members\nLogged at: ${datelog}**`);
  statuswebhook.send({
  username: capitalizeFirstLetter(client.user.username) + " Status",
  avatarURL: client.user.displayAvatarURL(),
  embeds: [status],
  });  

 } catch (err) {
  console.log(err);
 }
};
