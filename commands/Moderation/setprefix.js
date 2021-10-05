const Discord = require("discord.js");
const sql = require("../../utilities/database");
const chalk = require("chalk");
const guildPrefix = new Map();

module.exports = {
 name: "setprefix",
 aliases: ["set-prefix"],
 description: "Set a custom prefix for your server",
 category: "Moderation",
 usage: "setprefix <prefix>",
 run: async (client, message, guild, args) => {
  try {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      const Nopermission8 = new Discord.MessageEmbed()
      .setColor("#f04949")
      .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
      .setDescription(`**You don't have permissions to change guild prefix!**`)
      .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
      .setTimestamp();
      return message.channel.send(Nopermission8);
      }
      const [cmdName, newPrefix] = message.content.split(" ");
      if(newPrefix){
           try{
            const update = `UPDATE guilds SET guild_prefix = '${newPrefix}' WHERE guildId = '${message.guild.id}'`;
            sql.query(update, function (error, results, fields) {
               guildPrefix.set(message.guild.id, newPrefix);
               const prefix = guildPrefix.get(message.guild.id);
               const newprefix = new Discord.MessageEmbed()
               .setColor("#b300ea")
               .setTitle("<:checkvector:869193650184269834> NEW PREFIX UPDATE!")
               .setDescription(`**Successfully updated the guild prefix to \`${newPrefix}\`**`)
               .setFooter("Changed by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
               .setTimestamp();
               message.lineReply(newprefix);
               console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(`Guild prefix updated to: `) + chalk.blue.bold.underline(prefix) + chalk.cyan.bold(" (Name: ") + chalk.blue.bold.underline(message.guild.name) + chalk.cyan.bold(")") +  chalk.cyan.bold(" (ID: ") + chalk.blue.bold.underline(message.guild.id));
            });
           } catch {
             return message.channel.send(`<:xvector:869193619318382602> **| Failed to update the guild prefix to \`${newPrefix}\`**`)
           }
      } else{
        return message.channel.send("<:xvector:869193619318382602> **| You can not set prefix as a single argument**")
      }
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