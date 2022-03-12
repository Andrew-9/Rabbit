const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);
const wait = require('util').promisify(setTimeout);
module.exports = {
	name: "fire",
  description: "Burns the users avatar",
	cooldown: 2,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
    {
      "User": {
        name: "user",
        description: "Which user's avater do you want to burn?",
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
    .setURL(client.global.get("global", "invite"))
    .setLabel("Invite")
    .setEmoji('924818034965766215')
    .setStyle("LINK"),

    new MessageButton()
    .setLabel('Vote')
    .setURL(client.global.get("global", "vote"))
    .setStyle('LINK')
    .setEmoji('924819119860224082'),
    
    new MessageButton()
    .setLabel('Bunny')
    .setURL('https://www.youtube.com/watch?v=4kTu7ZtaDls&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('916090320758915102')
    )
    interaction.reply({ content: `<a:is_loading:923892698782511125> **Burning user's avatar... Hold On...**`,  components: [row] })
    await wait(3000);
    const buffer = await AmeAPI.generate("fire", { url: user.displayAvatarURL({ format: "png", size: 2048 }) });
    const attachment = new MessageAttachment(buffer, "fire.png");
    interaction.editReply({
    content: `**${emoji} Easily use this same command with \`${prefix}fire\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setImage('attachment://fire.png')
    ],
    files: [attachment],
    components: []  
    })
	} catch (e) {
    console.log(e.stack ? e.stack : e)
    interaction.editReply({
    embeds: [
    new MessageEmbed()
    .setColor("#ff0079")
    .setTitle(`<:errorcode:868245243357712384> AN ERROR OCCURED!`)
    .setFooter("Error in code: Report this error to kotlin#0427")
    .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
    ],
    });
	}
	}
}