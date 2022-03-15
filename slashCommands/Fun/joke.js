const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
	name: "joke",
    description: "Display a random dad joke",
	cooldown: 2,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, interaction) => {
	try {
    const { member, options } = interaction;
    const { guild } = member;
    let prefix = client.settings.get(guild.id, "prefix");
    let color = client.settings.get(guild.id, `funcolor`);
    let emoji = client.settings.get(guild.id, "SlashEmoji");
    const row = new MessageActionRow()
    .addComponents(
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
    .setLabel('Bunny')
    .setURL('https://www.youtube.com/watch?v=72CU3BltbfU&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('📺')
    )
    interaction.reply({ content: `🥕 **Fetching dad joke... Hold On...**`,  components: [row] })
    const response = await fetch("http://icanhazdadjoke.com/", {
     method: "get",
     headers: {
      Accept: "application/json",
     },
    });
    const wait = require('util').promisify(setTimeout);
    await wait(3000);
    const body = await response.json();
    interaction.editReply({
    content: `**${emoji} Easily use this same command with \`${prefix}joke\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("DAD JOKE")
    .setDescription("Dad said: " + body.joke)
    ],
    components: []
    })
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