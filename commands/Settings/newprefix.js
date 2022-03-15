const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const config = require("../../botconfig/config.json");
module.exports = {
name: "newprefix",
category: "Settings",
aliases: [""],
usage: "newprefix <prefix>",
cooldown: 5,
description: "Set a custom prefix for your server",
memberpermissions: ["MANAGE_GUILD"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
 run: async (client, message, args) => {
  try {
    let emoji = client.settings.get(message.guild.id, `emoji`);
    let prefix = client.settings.get(message.guild.id, `prefix`);
    const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1533303193591&scope=bot%20applications.commands`)
      .setLabel("Invite")
      .setEmoji('🐰')
      .setStyle("LINK"),

      new MessageButton()
      .setLabel('Support Server')
      .setURL("https://discord.com/invite/MJ5tYb4Jh9")
      .setStyle('LINK')
      .setEmoji('💌'),

      new MessageButton()
      .setLabel('Vote')
      .setURL("https://top.gg/bot/897819791732121621")
      .setStyle('LINK')
      .setEmoji('❤'),
    )
    if (!args[0]) {
    return message.reply({
    content: `**💢 Please add a new prefix. Eg: \`${prefix}newprefix +\`**`,
    components: [row]
    });
    } else {
     let newPrefix = args[0];
      client.settings.ensure(message.guild.id, {
        prefix: config.prefix
      });
      client.settings.set(message.guild.id, newPrefix, "prefix");
      return message.reply({
      content: `**${emoji} Successfully set the new prefix to \`${newPrefix}\`**`,
      components: [row]
      });
      }
  } catch (err) {
    console.log(err)
    message.reply({
    embeds: [
    new MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
    .setDescription(`\`\`\`${err.stack.toString().substr(0, 800)}\`\`\``)
    .setFooter("Error in code: Report this error to kotlin#0427")
    ],
    });
  }
 },
};
