const { MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
	name: "queue",
	category: "Audiomack",
	aliases: ["queuelist", "musiclist"],
	usage: "queue",
	description: "Lists of songs in the current queue",
	cooldown: 10,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, message, args) => {
		try {
				const { member, guildId, guild } = message;
				const { channel } = member.voice;
				let prefix = client.settings.get(message.guild.id, "prefix");
				let color = client.settings.get(message.guild.id, `audiomack`);
				let emoji = client.settings.get(message.guild.id, `audioemoji`);
				let rabbit = client.settings.get(message.guild.id, `emoji`);
				let audiothumb = client.links.get(message.guild.id, `audiothumb`);
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
			    if (!channel) {
				return message.reply({
				content: "**/ Try this with slash command \`/audiomack queue\`**",
				embeds: [new MessageEmbed()
				.setColor(color)
				.setDescription(`You have to be in a voice channel to use this command!`)
				.setTitle(`NOT IN A VOICE CHANNEL!`)
				],
				components: [row],
				});
				}
				//if user is not in the same voice channel as the bot
				if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
				return message.reply({
				content: "**/ Try this with slash command \`/audiomack queue\`**",
				embeds: [new MessageEmbed()
				.setColor(color)
				.setDescription(`You must be in the same voice channel as me - <#${guild.me.voice.channel.id}>`)
				.setTitle(`NOT IN SAME VOICE!`)
				],
				components: [row],
				});
				}
			    try {
				let newQueue = client.distube.getQueue(guildId);
				if (!newQueue || !newQueue.songs || newQueue.songs.length == 0){
				return message.reply({
				content: "**/ Try this with slash command \`/audiomack queue\`**",
				embeds: [new MessageEmbed()
				.setColor(color)
				.setDescription(`There's currently nothing playing right now`)
				.setTitle(`NOTHING PLAYING!`)
				],
				components: [row],
				});
				}
				let embeds = [];
				let k = 10;
				let theSongs = newQueue.songs;
				//defining each Pages
				for (let i = 0; i < theSongs.length; i += 10) {
				let qus = theSongs;
				const current = qus.slice(i, k)
				let j = i;
				const info = current.map((track) => `> **${j++} -** [\`${String(track.name).replace(/\[/igu, "{").replace(/\]/igu, "}").substr(0, 55)}\`](${track.url}) - \`${track.formattedDuration}\``).join("\n")
				const embed = new MessageEmbed()
				.setColor(color)
				.setThumbnail(audiothumb)
				.setDescription(info)
				embed.setFooter(`${client.user.username}'s audiomack has ${theSongs.length} songs in the queue | Duration: ${newQueue.formattedDuration}`, "https://media.discordapp.net/attachments/711910361133219903/928937527447027722/cd.png")
				if (i < 10) {
				embed.setTitle(`TOP ${theSongs.length > 50 ? 50 : theSongs.length} | QUEUE OF ${guild.name.toUpperCase()}`)
				embed.setDescription(`
				**Current Song:**\n> [\`${theSongs[0].name.replace(/\[/igu, "{").replace(/\]/igu, "}")}\`](${theSongs[0].url})\n\n${info}
				`)
				}
				embeds.push(embed);
				k += 10; //Raise k to 10
				}
				embeds[embeds.length - 1] = embeds[embeds.length - 1]
				let pages = []
				for (let i = 0; i < embeds.length; i += 1) {
				pages.push(embeds.slice(i, i + 1));
				}
				pages = pages.slice(0, 24)
				const Menu = new MessageSelectMenu()
				.setCustomId("queuepages")
				.setPlaceholder("Select a Page")
				.addOptions([
				pages.map((pages, index) => {
				let Obj = {};
				Obj.label = `Page ${index}`
				Obj.value = `${index}`;
				Obj.description = `Shows the ${index}/${pages.length - 1} Page!`
				Obj.emoji = `🎵`
				return Obj;
				})
				])
				const qrow = new MessageActionRow().addComponents([Menu])
				const m = await message.reply({
	            content: "**/ Try this with slash command \`/audiomack queue\`**",
				embeds: [embeds[0]],
				components: [qrow],
				});
				//Event
				const collector = m.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 80000 });
				collector.on("collect", async i => {
				if (i.user.id === message.author.id) {
				if(i.customId == "queuepages"){
				await i.deferUpdate();
				return m.edit({
			    content: `**${rabbit} Drop a review on \`${client.user.username}\` with \`/info feedback\` **`,
				embeds: pages[Number(i.values[0])],
				})
				}
				} else {
				i.reply({ content: `🔊 **You can't use this \`menu\` because you did not ask for it...**`, ephemeral: true, components: [row] });
				}
				});
				collector.on('end', async () => {
				const end_embed = new MessageEmbed()
				.setColor("#3C76FF")
				.setTitle(`TIME HAS ELASPED`)
				.setThumbnail("https://media.discordapp.net/attachments/711910361133219903/924816096274567258/expired.png")
				.setDescription(`
				> To see this queue **menu** again please type \`${prefix}queue\`
				> View this menu using **slash** command \`/audiomack queue\`
				> Developed by **Kotlin#0427** - And powered by **Fumigram**
				`)
				interaction.editReply({
				embeds: [end_embed],
				components: [row],
				});
				});
				} catch (e) {
				console.log(e.stack ? e.stack : e)
				message.reply({
				embeds: [
				new MessageEmbed()
				.setColor("#e63064")
				.setTitle("❌ AN ERROR OCCURED!")
				.setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
				.setFooter("Error in code: Report this error to kotlin0427")
				],
				});
				}
		} catch (e) {
			console.log(String(e.stack))
		}
	}
}
