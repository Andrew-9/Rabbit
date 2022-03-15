const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const config = require("../../config");
const moment = require("moment");
const os = require("os");
const osutils = require("os-utils");
require("moment-duration-format");
const { dependencies } = require("../../package.json");
module.exports = {
	name: "botinfo",
	description: "Shows Information about the Bot",
	cooldown: 3,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, interaction) => {
		try {
        const { member } = interaction;
		const { guild } = member;
        let prefix = client.settings.get(guild.id, "prefix");
        let color = client.settings.get(guild.id, `colorlike`);
        let pointer = client.settings.get(guild.id, `pointer`);
        let emoji = client.settings.get(guild.id, "SlashEmoji");
        function capitalizeFirstLetter(string) {return string.charAt(0).toUpperCase() + string.slice(1);}
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Support Server')
            .setURL("https://discord.com/invite/MJ5tYb4Jh9")
            .setStyle('LINK')
            .setEmoji('924818382908440606'),

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
        .setEmoji('🔗'),
        )
        interaction.reply({
        content: `**${emoji} Easily use this same command with \`${prefix}info\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle(`${client.user.username.toUpperCase()} GENERIC INFORMATION`)
        .setDescription(`
        ${pointer} **Prefix** - \`${prefix}\`
        ${pointer} **Version** - \`3.6.4\`
        ${pointer} **Count** - \`${client.guilds.cache.size}\` guilds
        ${pointer} **Uptime** - \`${duration}\`
        ${pointer} **Node** - \`${process.version}\`
        ${pointer} **Platform** - \`${capitalizeFirstLetter(osutils.platform())}\`
        ${pointer} **Discord.js** - \`${dependencies["discord.js"].replace("^", "v")}\`
        ${pointer} **Ping** - \`${Math.round(client.ws.ping)}\` ms
        ${pointer} **User Count** - \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\` members
        ${pointer} **Channel Count** - \`${client.channels.cache.size}\` channels
        ${pointer} **Rabbit Developer** - <@${config.ownerid}> | [[Website](${config.authorwebsite})\]
        ${pointer} **CPU** - \`${(os.cpus()[0].model.substring(0, os.cpus()[0].model.indexOf("CPU")) || "Intel Xeon (" + osutils.cpuCount() + " cores)")}\`
        ${pointer} **Total Memory** - \`${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}\` MB
        ${pointer} **RAM Usage (VPS)** - \`${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split(" ")[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[1]}%)\`
        ${pointer} **RAM Usage (BOT)** - \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1] + "MB " + `(${((100 * (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / osutils.totalmem().toString().split(".")[0]).toFixed(2)}%)`}\`
        ${pointer} **Useful Links** - [Support server](https://discord.com/invite/MJ5tYb4Jh9) | [Website](https://rabbit.fumigram.com) | [Invite me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1533303193591&scope=bot%20applications.commands)
        `)
        .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048})) 
        .setFooter("Rabbit by Kotlin#0427", "https://media.discordapp.net/attachments/711910361133219903/949368135960645742/Akebis_Sailor.jpg?width=735&height=612")
        .setTimestamp()
        ],
        components: [row]
        });	
		} catch (e) {
        console.log(e.stack ? e.stack : e)
        interaction.editReply({
        embeds: [
        new MessageEmbed()
        .setColor("#ff0079")
        .setTitle(`❌ AN ERROR OCCURED!`)
        .setFooter("Error in code: Report this error to kotlin#0427")
        .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
        ],
        });
		}
	}
}