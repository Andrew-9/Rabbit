const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const config = require("../../botconfig/config.json");
module.exports = {
  name: "newprefix",
  cooldown: 5,
  description: "Change the server prefix!",
  memberpermissions: ["MANAGE_GUILD"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  options: [
    {
      "String": {
        name: "prefix",
        description: "What should be the new prefix?",
        required: true
      }
    },
  ],
  run: async (client, interaction) => {
    try {
      const { member, options } = interaction;
      const { guild } = member;
      let emoji = client.settings.get(guild.id, `emoji`);
      let newPrefix = options.getString("prefix");
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
      client.settings.ensure(guild.id, {
        prefix: config.prefix
      });
      client.settings.set(guild.id, newPrefix, "prefix");
      return interaction.reply({
        content: `**${emoji} Successfully set the new prefix to \`${newPrefix}\`**`,
        components: [row]
      })
    } catch (e) {
      console.log(String(e.stack))
    }
  }
}