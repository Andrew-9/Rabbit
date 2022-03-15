const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const nekoclient = require('nekos.life');
const neko = new nekoclient();
module.exports = {
	name: "tickle",
    description: "Give your friend a tickle",
	cooldown: 2,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
    {
      "User": {
        name: "friend",
        description: "Tag a friend to tickle",
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
    let friend = options.getUser("friend");
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
    if (!friend) {
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}tickle\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("TAG A FRIEND")
    .setDescription(`Please mention one of your friends. \`${prefix}tickle @kotlin\``)
    ],
    components: [row]
    });
    } else if (friend == interaction.user){
    async function tickle() {
    const GIF = await neko.sfw.tickle();
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}tickle\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
    .setDescription(`<@${interaction.user.id}> gave themselve a tickle`)
    .setImage(GIF.url)
    ],
    components: []
    });
    }
    tickle();
    } else if (friend == client.user){
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}tickle\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setDescription(`Oh, you tried to tickle me but u can't hehe\nFor I'm not real. just your darling bot...`)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    ],
    components: [row]
    });
    } else {
    async function tickle() {
    const GIF = await neko.sfw.tickle();
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}tickle\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
    .setDescription(`<@${interaction.user.id}> just gave <@${friend.id}> a tickle`)
    .setImage(GIF.url)
    ],
    components: []  
    })
    }
    tickle();
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