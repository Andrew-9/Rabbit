const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
  name: "djrole",
  category: "Settings",
  aliases: ["dj", "drole", "dj-role"],
  usage: "dj <add/remove> <@Role>",
  cooldown: 1,
  description: "Manage and change audiomack's Dj roles!",
  memberpermissions: ["MANAGE_GUILD"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
      const { member } = message;
      const { guild } = member;
      let color = client.settings.get(message.guild.id, `settingscolor`);
			let emoji = client.settings.get(message.guild.id, `emoji`);
      const row = new MessageActionRow()
      .addComponents(
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
  
        new MessageButton()
        .setLabel('Instagram')
        .setURL("https://www.instagram.com/fumigramapp")
        .setStyle('LINK')
        .setEmoji('924819412505223188'),
      )
      if (!args[0]) {
        return message.reply({
          content: "**<:rabbitslash:913423874182500352> Try slash command \`/settings adddj\`**",
          embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle(`PLEASE ADD A ROLE METHOD`)
            .setDescription(`**Usage:** - \`${client.settings.get(message.guild.id, "prefix")}dj <add/remove> <@Role>\``)
          ],
          components: [row]
        });
      }
      let add_remove = args[0].toLowerCase();
      if (!["add", "remove"].includes(add_remove)) {
        return message.reply({
          content: "**<:rabbitslash:913423874182500352> Try slash command \`/settings adddj\`**",
          embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle(`PLEASE ADD A ROLE METHOD`)
            .setDescription(`**Usage:** - \`${client.settings.get(message.guild.id, "prefix")}dj <add/remove> <@Role>\``)
          ],
          components: [row]
        });
      }
      let Role = message.mentions.roles.first();
      if (!Role) {
        return message.reply({
          content: "**<:rabbitslash:913423874182500352> Try slash command \`/settings adddj\`**",
          embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle(`PLEASE ADD A ROLE METHOD`)
            .setDescription(`**Usage:** - \`${client.settings.get(message.guild.id, "prefix")}dj <add/remove> <@Role>\``)
          ],
          components: [row]
        });
      }
      client.settings.ensure(message.guild.id, {
        djroles: []
      });
      if (add_remove == "add") {
        if (client.settings.get(message.guild.id, "djroles").includes(Role.id)) {
          return message.reply({
            content: "**<:rabbitslash:913423874182500352> Try slash command \`/settings adddj\`**",
            embeds: [
              new MessageEmbed()
              .setColor(color)
              .setTitle(`ROLE ALREADY A DJ`)
              .setDescription(`This Role is already a dj-role!`)
            ],
            components: [row]
          })
        }
        client.settings.push(message.guild.id, Role.id, "djroles");
        var djs = client.settings.get(message.guild.id, `djroles`).map(r => `<@&${r}>`);
        if (djs.length == 0) djs = "not setup";
        else djs.join(", ");
        return message.reply({
          content: "**<:rabbitslash:913423874182500352> Try slash command \`/settings adddj\`**",
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setTitle(`ROLE ADDED TO DJ`)
            .setDescription(`
            The Role \`${Role.name}\` got added to music dj-roles!
            DJ-Role${client.settings.get(message.guild.id, "djroles").length > 1 ? "s": ""}: ${djs}
            `)
          ],
          components: [row]
        })
      } else {
        if (!client.settings.get(message.guild.id, "djroles").includes(Role.id)) {
          return message.reply({
            content: "**<:rabbitslash:913423874182500352> Try slash command \`/settings removedj\`**",
            embeds: [
              new MessageEmbed()
              .setColor(color)
              .setTitle(`ROLE NOT A DJ`)
              .setDescription(`This Role is not a dj-role yet!`)
            ],
            components: [row]
          })
        }
        client.settings.remove(message.guild.id, Role.id, "djroles");
        var djs = client.settings.get(message.guild.id, `djroles`).map(r => `<@&${r}>`);
        if (djs.length == 0) djs = "not setup";
        else djs.join(", ");
        return message.reply({
          content: "**<:rabbitslash:913423874182500352> Try slash command \`/settings removedj\`**",
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setTitle(`ROLE REMOVED FROM DJ`)
            .setDescription(`
            The Role \`${Role.name}\` got removed from the music dj-roles!
            DJ-Role${client.settings.get(message.guild.id, "djroles").length > 1 ? "s": ""}: ${djs}
            `)
          ],
          components: [row]
        })
      }
    } catch (e) {
      console.log(e)
			message.reply({
			embeds: [
			new MessageEmbed()
			.setColor("#e63064")
			.setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
			.setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
			.setFooter("Error in code: Report this error to kotlin0427 or _destroyer_#1574")
			],
			});
    }
  }
}