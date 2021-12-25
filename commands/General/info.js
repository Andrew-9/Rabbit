const Discord = require("discord.js");
const config = require("../../config");
const moment = require("moment");
const os = require("os");
const osutils = require("os-utils");
require("moment-duration-format");
const { dependencies } = require("../../package.json");
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();

module.exports = {
 name: "info",
 aliases: ["botinfo", "clientinfo", "stats"],
 description: "Shows informations of the about rabbit",
 category: "General",
 usage: "info",
 run: async (client, message, args) => {
  try {
   const prefix = guildPrefix.get(message.guild.id);
   function capitalizeFirstLetter(string) {return string.charAt(0).toUpperCase() + string.slice(1);}
   const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
   let embed = new Discord.MessageEmbed()
   .setColor("#ff9900")
   .setAuthor(`GENERIC INFORMATION`, message.guild.iconURL({dynamic: true, format: "png"}))
   .setDescription(`
   <:rabbitpoint:897844154258841620> **Prefix** - \`${prefix}\`
   <:rabbitpoint:897844154258841620> **Version** - \`${config.version}\`
   <:rabbitpoint:897844154258841620> **Count** - \`${client.guilds.cache.size}\` guilds
   <:rabbitpoint:897844154258841620> **Uptime** - \`${Math.round(client.ws.ping)}\` ms
   <:rabbitpoint:897844154258841620> **Node** - \`${process.version}\`
   <:rabbitpoint:897844154258841620> **Platform** - \`${capitalizeFirstLetter(osutils.platform())}\`
   <:rabbitpoint:897844154258841620> **Discord.js** - \`${dependencies["discord.js"].replace("^", "v")}\`
   <:rabbitpoint:897844154258841620> **Ping** - \`${duration}\`
   <:rabbitpoint:897844154258841620> **User Count** - \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\` members
   <:rabbitpoint:897844154258841620> **Channel Count** - \`${client.channels.cache.size}\` channels
   <:rabbitpoint:897844154258841620> **Rabbit Developer** - <@${config.ownerid}> | [[Website](${config.authorwebsite})\]
   <:rabbitpoint:897844154258841620> **CPU** - \`${(os.cpus()[0].model.substring(0, os.cpus()[0].model.indexOf("CPU")) || "Intel Xeon (" + osutils.cpuCount() + " cores)")}\`
   <:rabbitpoint:897844154258841620> **Total Memory** - \`${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}\` MB
   <:rabbitpoint:897844154258841620> **RAM Usage (VPS)** - \`${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split(" ")[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[1]}%)\`
   <:rabbitpoint:897844154258841620> **RAM Usage (BOT)** - \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1] + "MB " + `(${((100 * (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / osutils.totalmem().toString().split(".")[0]).toFixed(2)}%)`}\`
   <:rabbitpoint:897844154258841620> **Amount Of Song Played** - \`${client.infos.get("global", "songs")}\`
   <:rabbitpoint:897844154258841620> **Amount Of Filter Added** - \`${client.infos.get("global", "filters")}\`
   <:rabbitpoint:897844154258841620> **Useful Links** - [Support server](${config.server}) | [Website](https://rabbit.fumigram.com) | [Invite me](https://discord.com/oauth2/authorize?client_id=734522699228905585&permissions=158913785591&scope=bot%20applications.commands)
   `)
   .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048})) 
   .setFooter("Rabbit by Kotlin#0427", config.Kotlin)
   .setTimestamp();
   message.channel.send(embed);
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