const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
  name: "removedj",
  cooldown: 5,
  description: "Let's you remove a dj roles from the music setup",
  memberpermissions: ["MANAGE_GUILD"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  options: [
    {
      "Role": {
        name: "role",
        description: "Which role do you want to remove?",
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
        if (!client.settings.get(guild.id, "djroles").includes(Role.id)) {
          return interaction.reply({
            content: `**${slashEmoi} Easily use this command with \`${prefix}dj remove\`**`,
            ephemeral: true,
            embeds: [
              new MessageEmbed()
              .setColor(color)
              .setTitle(`ROLE NOT A DJ`)
              .setDescription(`This Role is not a dj-role yet!`)
            ],
            components: [row]
          })
        }
        client.settings.remove(guild.id, Role.id, "djroles");
        var djs = client.settings.get(guild.id, `djroles`).map(r => `<@&${r}>`);
        if (djs.length == 0) djs = "\`✖ not setup\`";
        else djs.join(", ");
        return interaction.reply({
          content: `**${slashEmoi} Easily use this command with \`${prefix}dj remove\`**`,
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setTitle(`ROLE REMOVED FROM DJ`)
            .setDescription(`
            The Role \`${Role.name}\` got removed from the music dj-roles!
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