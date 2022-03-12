const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const wait = require('util').promisify(setTimeout);
const { check_if_dj } = require("../../handlers/functions");
const Canvas = require('canvas');
module.exports = {
	name: "nowplaying",
	category: "Audiomack",
	usage: "nowplaying",
	aliases: ["np"],
	description: "Shows the current playing song",
	cooldown: 1,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, message, args) => {
		try {
			const { member, guildId } = message;
			const { guild } = member;
			const { channel } = member.voice;
			let prefix = client.settings.get(message.guild.id, "prefix");
			let color = client.settings.get(message.guild.id, `audiomack`);
			let emoji = client.settings.get(message.guild.id, `audioemoji`);
			let rabbit = client.settings.get(message.guild.id, `emoji`);
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
			if (!channel){
			return message.reply({
			content: "**<:rabbitslash:913423874182500352> Try slash command \`/audiomack nowplaying\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`You have to be in a voice channel to use this command!`)
			.setTitle(`${emoji} NOT IN A VOICE CHANNEL!`)
			],
			});
			}
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
			return message.reply({
			content: "**<:rabbitslash:913423874182500352> Try slash command \`/audiomack nowplaying\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`You must be in the same voice channel as me - <#${guild.me.voice.channel.id}>`)
			.setTitle(`NOT IN SAME VOICE!`)
			],
			});
			}
			try {
			let newQueue = client.distube.getQueue(guildId);
			if (!newQueue || !newQueue.songs || newQueue.songs.length == 0){
			return message.reply({
			content: "**<:rabbitslash:913423874182500352> Try slash command \`/audiomack nowplaying\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`There's currently nothing playing right now`)
			.setTitle(`NOTHING PLAYING!`)
			],
			});
			}
			let queuesong = newQueue.formattedCurrentTime;
			let cursong = newQueue.songs[0];
			let cursongtimes = 0;
			let cursongtimem = 0;
			let cursongtimeh = 0;
			let queuetimes = 0;
			let queuetimem = 0;
			let queuetimeh = 0;
			if (cursong.formattedDuration.split(":").length === 3) {
			cursongtimes = cursong.formattedDuration.split(":")[2]
			cursongtimem = cursong.formattedDuration.split(":")[1]
			cursongtimeh = cursong.formattedDuration.split(":")[0]
			}
			if (queuesong.split(":").length === 3) {
			queuetimes = queuesong.split(":")[2]
			queuetimem = queuesong.split(":")[1]
			queuetimeh = queuesong.split(":")[0]
			}
			cursongtimes = cursong.formattedDuration.split(":")[1]
			cursongtimem = cursong.formattedDuration.split(":")[0]
			queuetimes = queuesong.split(":")[1]
			queuetimem = queuesong.split(":")[0]
			///
			let maxduration = Number(cursongtimes) + Number(cursongtimem) * 60 + Number(cursongtimeh) * 60 * 60;
			let minduration = Number(queuetimes) + Number(queuetimem) * 60 + Number(queuetimeh) * 60 * 60;
			let percentduration = Math.floor((minduration / maxduration) * 100);	
			Canvas.registerFont("./assets/UbuntuCondensed-Regular.ttf", { family: "UbuntuCondensed" });
			let songtitle = cursong.name;
			let oftime = `${newQueue.formattedCurrentTime}/${cursong.formattedDuration}`
			const canvas = Canvas.createCanvas(800, 200);
			const ctx = canvas.getContext('2d');
			const background = await Canvas.loadImage('./assets/np.png');
			ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
			const url = `https://img.youtube.com/vi/${cursong.id}/mqdefault.jpg`
			const avatar = await Canvas.loadImage(url);
			ctx.drawImage(avatar, 10, 10, 192, 108);
			///
			var textString = songtitle.substr(0, 35);
			ctx.font = 'bold 40px UbuntuCondensed';
			ctx.fillStyle = color;
			ctx.fillText(textString, 10 + 192 + 10, 10 + 25);
			let textStringt
			if (songtitle.length > 40) textStringt = songtitle.substr(35, 32) + "...";
			else textStringt = "";
			ctx.font = 'bold 40px UbuntuCondensed';
			ctx.fillStyle = color;
			ctx.fillText(textStringt, 10 + 192 + 10, 10 + 25 + 40);
		
			ctx.font = 'bold 30px UbuntuCondensed';
			ctx.fillStyle = color;
			ctx.fillText(oftime, 10 + 192 + 10, 10 + 25 + 30 + 50);
		
			let percent = percentduration;
			let index = Math.floor(percent) || 10;
			let left = Number(".".repeat(index).length) * 7.9;
				
			if (left < 50) left = 50;

			let x = 10;
			let y = 200 - 63;
			let width = left;
			let height = 43;
			let radius = 1;
		
			if (width < 2 * radius) radius = width / 2;
			if (height < 2 * radius) radius = height / 2;
			ctx.beginPath();
			ctx.moveTo(x + radius, y);
			ctx.arcTo(x + width, y, x + width, y + height, radius);
			ctx.arcTo(x + width, y + height, x, y + height, radius);
			ctx.arcTo(x, y + height, x, y, radius);
			ctx.arcTo(x, y, x + width, y, radius);
			ctx.closePath();
		
			ctx.fillStyle = color;
			ctx.fill();
			const attachment = new MessageAttachment(canvas.toBuffer(), 'nowplaying.png');
			message.reply({ 
			content: "**<:rabbitslash:913423874182500352> Try slash command \`/audiomack nowplaying\`**",
			files: [attachment]
		    })
			} catch (e) {
			console.log(e.stack ? e.stack : e)
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
		} catch (e) {
			console.log(String(e.stack))
		}
	}
}