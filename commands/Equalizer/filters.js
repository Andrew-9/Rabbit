const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { check_if_dj } = require("../../handlers/functions")
const FiltersSettings = require("../../botconfig/filters.json");
module.exports = {
  name: "filters",
  category: "Equalizer",
  usage: "filters",
  aliases: ["listfilters", "allfilters"],
  description: "List all active and possible Filters!",
  cooldown: 5,
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
			const { member, guildId, guild } = message;
			const { channel } = member.voice;
			let color = client.settings.get(message.guild.id, `equalizercolor`);
			let emoji = client.settings.get(message.guild.id, `emoji`);
      let equalizer_thumb = client.links.get(message.guild.id, `equalizerthumb`);
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

      new MessageButton()
      .setLabel('Instagram')
      .setURL("https://www.instagram.com/fumigramapp")
      .setStyle('LINK')
      .setEmoji('924819412505223188'),
			)
      try {
        let newQueue = client.distube.getQueue(guildId);
        if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) {
          return message.reply({
          content: "**<:rabbitslash:913423874182500352> Try slash command \`/equalizer filters\`**",
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setThumbnail(equalizer_thumb)
            .setTitle(`LIST OF AVAILABLE FILTERS!`)
			      .setDescription(`
            > ${Object.keys(FiltersSettings).map(f => `\`${f}\``).join(", ")}

            > **Current Filters:** ${newQueue.filters.map(f => `\`${f}\``).join(", ")}
            
            > <:megaphone:925484563952709653> **NOTICE**
            > Filters starting with custom are having there own command.
            > Please use them to define what custom filter to add **(¬‿¬)**
            `)
          ],
          components: [row],
        })
        }
        return message.reply({
          content: "**<:rabbitslash:913423874182500352> Try slash command \`/equalizer filters\`**",
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setThumbnail(equalizer_thumb)
            .setTitle(`LIST OF AVAILABLE FILTERS!`)
            .setDescription(`
            > ${Object.keys(FiltersSettings).map(f => `\`${f}\``).join(", ")}

            > **Current Filters:** ${newQueue.filters.map(f => `\`${f}\``).join(", ")}
            
            > <:megaphone:925484563952709653> **NOTICE**
            > Filters starting with custom are having there own command.
            > Please use them to define what custom filter to add **(¬‿¬)**
            `)
          ],
          components: [row],
        })
      } catch (e) {
        console.log(e.stack ? e.stack : e)
        message.reply({
        embeds: [
        new MessageEmbed()
        .setColor("#e63064")
        .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
        .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
        .setFooter("Error in code: Report this error to kotlin#0427")
        ],
        });
      }
    } catch (e) {
      console.log(String(e.stack))
    }
  }
}