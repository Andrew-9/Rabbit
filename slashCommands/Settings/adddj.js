const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
  name: "adddj",
  cooldown: 5,
  description: "Let's you add a dj roles to the music setup",
  memberpermissions: ["MANAGE_GUILD"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  options: [
    {
      "Role": {
        name: "role",
        description: "Which role do you want to add?",
        required: true
      }
    },
  ],
  run: async (client, interaction) => {
    try {
      const { member, options } = interaction;
      const { guild } = member;
      let color = client.settings.get(guild.id, `settingscolor`);
      let emoji = client.settings.get(guild.id, `emoji`);
      let slashEmoi = client.settings.get(guild.id, `SlashEmoji`);
      let prefix = client.settings.get(guild.id, "prefix");
      let Role = options.getRole("role");
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
        djroles: []
      });
        if (client.settings.get(guild.id, "djroles").includes(Role.id)) {
          return interaction.reply({
            content: `**${slashEmoi} Easily use this command with \`${prefix}dj add\`**`,
            ephemeral: true,
            embeds: [
              new MessageEmbed()
              .setColor(color)
              .setTitle(`ROLE ALREADY A DJ`)
              .setDescription(`This Role is already a dj-role!`)
            ],
            components: [row]
          })
        }
        client.settings.push(guild.id, Role.id, "djroles");
        var djs = client.settings.get(guild.id, `djroles`).map(r => `<@&${r}>`);
        if (djs.length == 0) djs = "\`✖ not setup\`";
        else djs.join(", ");
        return interaction.reply({
          content: `**${slashEmoi} Easily use this command with \`${prefix}dj add\`**`,
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setTitle(`ROLE ADDED TO DJ`)
            .setDescription(`
            The Role \`${Role.name}\` got added to music dj-roles!
            DJ-Role${client.settings.get(guild.id, "djroles").length > 1 ? "s": ""}: ${djs}
            `)
          ],
          components: [row]
        })
    } catch (e) {
      console.log(String(e.stack))
    }
  }
}