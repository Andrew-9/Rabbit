const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
const wait = require('util').promisify(setTimeout);
module.exports = {
	name: "heaven",
    description: "Returns a heaven image",
	cooldown: 2,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
    {
      "User": {
        name: "user",
        description: "The user you want?",
        required: false
      }
    }
    ],
	run: async (client, interaction) => {
	try {
    const { member, options } = interaction;
    const { guild } = member;
    let prefix = client.settings.get(guild.id, "prefix");
    let color = client.settings.get(guild.id, `imagecolor`);
    let emoji = client.settings.get(guild.id, "SlashEmoji");
    const user = options.getUser("user") || interaction.user;
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
    .setURL('https://www.youtube.com/watch?v=4kTu7ZtaDls&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('📺')
    )
    interaction.reply({ content: `🥕 **Generating a heaven image.. Hold On...**`,  components: [row] })
    await wait(2000);
    interaction.editReply({
    content: `**${emoji} Easily use this same command with \`${prefix}heaven\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setImage(encodeURI(`https://vacefron.nl/api/heaven?user=${user.displayAvatarURL({ format: "png", size: 2048 })}`))
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