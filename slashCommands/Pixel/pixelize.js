const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);
const wait = require('util').promisify(setTimeout);
module.exports = {
	name: "pixelize",
    description: "Pixelize the user avatar",
	cooldown: 2,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
    {
      "User": {
        name: "user",
        description: "Ping a user to pixelize",
        required: false
      }
    },
    {
      "Integer": {
        name: "pixelizer",
        description: "What pixelizer in numbers do you want?",
        required: false
      }
    },
    ],
	run: async (client, interaction) => {
	try {
    const { member, options } = interaction;
    const { guild } = member;
    let prefix = client.settings.get(guild.id, "prefix");
    let color = client.settings.get(guild.id, `pixelcolor`);
    let emoji = client.settings.get(guild.id, "SlashEmoji");
    let user = options.getUser("user") || interaction.user;
    let pixelize = options.getInteger("pixelizer") || 50;
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
    .setURL('https://www.youtube.com/watch?v=ifz-mai8pL4&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('🐇')
    )
    if (pixelize < 2) {
    interaction.reply({ content: `👋 **The pixelize must be higher than \`2\`... Try again...**`,  components: [row] })
    await wait(3000);
    await interaction.deleteReply();
    } else if (pixelize > 50) {
    interaction.reply({ content: `👋 **The pixelize must be lower than \`50\`... Try again...**`,  components: [row] })
    await wait(3000);
    await interaction.deleteReply();
    } else {
    interaction.reply({ content: `🔥 **Generating Pixels... Hold On...**`,  components: [row] })
    const buffer = await AmeAPI.generate("pixelize", { url: user.displayAvatarURL({ format: "png", size: 2048 }), pixelize: pixelize });
    const attachment = new MessageAttachment(buffer, "pixelize.png");
    await wait(5000);
    interaction.editReply({
    content: `**${emoji} Easily use this same command with \`${prefix}pixelize\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setImage('attachment://pixelize.png')
    ],
    files: [attachment],
    components: []  
    })
    }
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