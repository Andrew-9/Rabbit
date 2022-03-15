const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const axios = require("axios").default;
const wait = require('util').promisify(setTimeout);
module.exports = {
	name: "panda",
    description: "Sends a random panda image",
	cooldown: 2,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, interaction) => {
	try {
    const { member } = interaction;
    const { guild } = member;
    let prefix = client.settings.get(guild.id, "prefix");
    let color = client.settings.get(guild.id, `pixelcolor`);
    let emoji = client.settings.get(guild.id, "SlashEmoji");
    const row = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setLabel('Vote')
    .setURL("https://top.gg/bot/897819791732121621")
    .setStyle('LINK')
    .setEmoji('🐰'),
    
    new MessageButton()
    .setLabel('Bunny')
    .setURL('https://www.youtube.com/watch?v=55unNKP2DBE&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('📺')
    )
    const options = {
    method: "GET", url: "https://some-random-api.ml/img/panda" };
    axios.request(options).then(async (response) => {
    interaction.reply({ content: `🐇 **Looking for a panda...**`,  components: [row] })
    await wait(2000);
    interaction.editReply({
    content: `**${emoji} Found one. Try prefix command \`${prefix}panda\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setImage(response.data.link)
    ],
    components: []
    })
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