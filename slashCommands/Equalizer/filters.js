const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const FiltersSettings = require("../../botconfig/filters.json");
const { check_if_dj } = require("../../handlers/functions");
module.exports = {
  name: "filters",
  description: "List all active and possible filters!",
  cooldown: 5,
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, interaction) => {
    try {
			const { member, guildId, options } = interaction;
			const { guild } = member;
			const { channel } = member.voice;
      let prefix = client.settings.get(guild.id, `prefix`);
			let color = client.settings.get(guild.id, `equalizercolor`);
			let rabbit = client.settings.get(guild.id, `emoji`);
      let equalizer_thumb = client.links.get(guild.id, `equalizerthumb`);
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

      new MessageButton()
      .setLabel('Instagram')
      .setURL("https://www.instagram.com/fumigramapp")
      .setStyle('LINK')
      .setEmoji('❤'),
			)
      try {
        let newQueue = client.distube.getQueue(guildId);
        if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) {
        return interaction.reply({
        content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
        embeds: [
        new MessageEmbed()
        .setColor(color)
        .setThumbnail(equalizer_thumb)
        .setTitle(`LIST OF AVAILABLE FILTERS!`)
			  .setDescription(`
        > ${Object.keys(FiltersSettings).map(f => `\`${f}\``).join(", ")}

        > **Current Filters:** ${newQueue.filters.map(f => `\`${f}\``).join(", ")}
        
        > 🔊 **NOTICE**
        > Filters starting with custom are having there own command.
        > Please use them to define what custom filter to add **(¬‿¬)**
        `)
        ],
        components: [row],
        });
        }
        return interaction.reply({
        content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
        embeds: [
        new MessageEmbed()
        .setColor(color)
        .setThumbnail(equalizer_thumb)
        .setTitle(`LIST OF AVAILABLE FILTERS!`)
        .setDescription(`
        > ${Object.keys(FiltersSettings).map(f => `\`${f}\``).join(", ")}

        > **Current Filters:** ${newQueue.filters.map(f => `\`${f}\``).join(", ")}
        
        > 🔊 **NOTICE**
        > Filters starting with custom are having there own command.
        > Please use them to define what custom filter to add **(¬‿¬)**
        `)
        ],
        components: [row],
      });
      } catch (e) {
			console.log(e.stack ? e.stack : e)
			interaction.editReply({
			embeds: [
			new MessageEmbed()
			.setColor("#e63064")
			.setTitle("❌ AN ERROR OCCURED!")
			.setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
			.setFooter("Error in code: Report this error to kotlin0427")
			],
			ephemeral: true
			});
			}
    } catch (e) {
      console.log(String(e.stack))
    }
  }
}
