const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
  name: "defaultvolume",
  category: "Settings",
  aliases: ["dvolume"],
  usage: "defaultvolume <Percentage>",
  cooldown: 10,
  description: "Defines audiomack's default volume",
  memberpermissions: ["MANAGE_GUILD"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
      const { member } = message;
      const { guild } = member;
			let prefix = client.settings.get(message.guild.id, "prefix");
			let color = client.settings.get(message.guild.id, `settingscolor`);
			let emoji = client.settings.get(message.guild.id, `audioemoji`);
			let rabbit = client.settings.get(message.guild.id, `emoji`);
      const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
				.setLabel('Support Server')
				.setURL("https://discord.com/invite/MJ5tYb4Jh9")
				.setStyle('LINK')
				.setEmoji('✈'),
	
				new MessageButton()
				.setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1533303193591&scope=bot%20applications.commands`)
				.setLabel("Invite")
				.setEmoji('💌')
				.setStyle("LINK"),
			
				new MessageButton()
				.setLabel('Vote')
				.setURL("https://top.gg/bot/897819791732121621")
				.setStyle('LINK')
				.setEmoji('🐰'),
			)
      if (!args[0]) {
        return message.reply({
          content: "**<:rabbitslash:913423874182500352> Try slash command \`/audiomack defaultvolume\`**",
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setTitle(`PLEASE ADD A VOLUME`)
            .setDescription(`
            **Usage:** - \`${prefix}defaultvolume <percentage>\`
            `)
          ],
          components: [row],
        })
      }
      let volume = Number(args[0]);
      client.settings.ensure(guild.id, {
        defaultvolume: 50
      });

      if (!volume || (volume > 150 || volume < 1)) {
        return message.reply({
          content: "**<:rabbitslash:913423874182500352> Try slash command \`/audiomack defaultvolume\`**",
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setTitle(`INVALID VOLUME ARGS`)
            .setDescription(`The Volume must be between \`1\` and \`150\`!`)
          ],
          components: [row],
        })
      }
      client.settings.set(guild.id, volume, "defaultvolume");
      return message.reply({
        content: "**<:rabbitslash:913423874182500352> Try slash command \`/audiomack defaultvolume\`**",
        embeds: [
          new MessageEmbed()
          .setColor(color)
          .setTitle(`DEFAULT VOLUME SUCCESS`)
          .setDescription(`The Default Volume has been set to: \`${volume}%\``)
        ],
      })
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