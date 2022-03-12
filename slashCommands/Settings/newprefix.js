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
        .setURL(client.global.get("global", "invite"))
        .setLabel("Invite")
        .setEmoji('924818034965766215')
        .setStyle("LINK"),
  
        new MessageButton()
        .setLabel('Support Server')
        .setURL(client.global.get("global", "support"))
        .setStyle('LINK')
        .setEmoji('924818382908440606'),
  
        new MessageButton()
        .setLabel('Vote')
        .setURL(client.global.get("global", "vote"))
        .setStyle('LINK')
        .setEmoji('924819119860224082'),
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