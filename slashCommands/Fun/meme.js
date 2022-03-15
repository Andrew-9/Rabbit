const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const axios = require("axios").default;
const wait = require('util').promisify(setTimeout);
module.exports = {
	name: "meme",
    description: "Sends a random meme",
	cooldown: 2,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, interaction) => {
	try {
    const { member } = interaction;
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
    .setURL('https://www.youtube.com/watch?v=bT-Hznb78UM&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('📺')
    )
    const options = {
    method: "GET",
    url: `https://reddit.com/r/dankmemes/random/.json`,
    };
    interaction.reply({ content: `🥕 **Looking for a meme... Hold On...**`,  components: [row] });
    await wait(5000);
    axios.request(options).then((response) => {
    let meme = response.data[0].data.children[0].data;
    interaction.editReply({
    content: `**${emoji} Easily use this same command with \`${prefix}meme\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("FOUND ONE")
    .setDescription(meme.title)
    .setImage(meme.url)
    .setFooter(`👍 ${meme.ups} | 💬 ${meme.num_comments}`)
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