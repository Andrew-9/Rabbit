const Discord = require("discord.js");
const ms = require("ms");
const chalk = require("chalk");
const config = require("../../config");
const sql = require("../../utilities/database");
const StateManager = require("../../utilities/state_manager");
const Timeout = new Map();
const guildPrefix = new Map();

module.exports = async (client, message) => {
 try {
  client.guilds.cache.forEach(guild => {
    const sqlquery = `SELECT guild_prefix FROM guilds WHERE guildId = '${guild.id}'`;
    sql.query(sqlquery, function (error, results, fields) {
    if (results[0]) {
        const guildId = guild.id;
        const prefix = results[0].guild_prefix;
        guildPrefix.set(guild.id, prefix);
        StateManager.emit('PrefixFetched', guildId, prefix);
        // console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(`Gotten Guild Prefix. Ready: `) + chalk.blue.bold.underline(guild.name) + chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(guild.id));
      }
    })
  });
  if (!message) return;
  if (message.author.bot) return;
  if (!message.guild) return;

  /// Ensure Soundki's Settings
  client.custom.ensure(message.guild.id, { playlists: [] });
  client.custom2.ensure(message.author.id, { myplaylists: [] });
  client.infos.ensure("global", { cmds: 0, songs: 0, filters: 0 })
  client.settings.ensure(message.guild.id, { djroles: [], playingembed: "", playingchannel: "", botchannel: [] });
  client.custom2.ensure(message.author.id, { myplaylists: [] });
 /// Ensure Soundki's Settings End
  const prefix = guildPrefix.get(message.guild.id);
  if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
  const youcalled = new Discord.MessageEmbed()
  .setColor("#ff7900")
  .setTitle(":rabbit: YOU CALLED MR.MASATAMI")
  .setDescription(`
  <:rabbitbullet:887617523925778443> My prefix in this server is \`${prefix}\`
  <:rabbitbullet:887617523925778443> To see all  my commands please type \`${prefix}help\`
  `)
  return message.lineReply(youcalled);
  }
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) {
   return;
  }
  if (message.content.toLowerCase().includes("process.env")) {
   console.log("[Security Log]: " + message.author.tag + ` (ID: ` + message.author.id + ") used process.env in the " + command.name + " command.");
   return message.lineReply("<:xvector:869193619318382602> **| Rabbit: The command cannot contain the `process.env` string for my safetly reasons...**");
  }
  if (message.content.toLowerCase().includes("config.js")) {
    console.log("[Security Log]: " + message.author.tag + ` (ID: ` + message.author.id + ") used config.js in the " + command.name + " command.");
    return message.lineReply("<:xvector:869193619318382602> **| Rabbit: The command cannot contain the `config.js` string for my safetly reasons...**");
   }
   if (message.content.toLowerCase().includes(".env")) {
    console.log("[Security Log]: " + message.author.tag + ` (ID: ` + message.author.id + ") used .env in the " + command.name + " command.");
    return message.lineReply("<:xvector:869193619318382602> **| Rabbit: The command cannot contain the `.env` string for my safetly reasons...**");
   }
  if (command) {
   const timeout = command.timeout || 3000;
   const key = message.author.id + command.name;
   const found = Timeout.get(key);
   if (found) {
   const timePassed = Date.now() - found;
   const timeLeft = timeout - timePassed;
   message.channel.send(`⏰ You need to wait another **${ms(timeLeft)}**\nBefore you can use this command.`);
   } else {
    command.run(client, message, args);
    Timeout.set(key, Date.now());
    setTimeout(() => {
     Timeout.delete(key);
    }, timeout);
   }
  }
 } catch (err) {
  console.log(err);
  message.lineReply("<:errorcode:868245243357712384>**|** Oops Something went wrong. Try Running the command again later");
 }
};
StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});