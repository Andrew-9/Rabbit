const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
	name: "hug",
    description: "Give a hug to your friends",
	cooldown: 2,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
    {
      "User": {
        name: "friend",
        description: "ping the friend you want to hug",
        required: false
      }
    },
    ],
	run: async (client, interaction) => {
	try {
    const { member, options } = interaction;
    const { guild } = member;
    let prefix = client.settings.get(guild.id, "prefix");
    let color = client.settings.get(guild.id, `funcolor`);
    let emoji = client.settings.get(guild.id, "SlashEmoji");
    const friend = options.getUser("friend");
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
    .setURL('https://www.youtube.com/watch?v=w00ASMZTqJw&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('916090320758915102')
    )
    if (!friend) {
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}hug\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("TAG A FRIEND")
    .setDescription(`Please tag the friend you want to hug. \`/fun hug @kotlin\``)
    ],
    components: [row]
    });
    } else if (friend == interaction.user){
    let response = await fetch("https://nekos.life/api/v2/img/hug");
    let body = await response.json();
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}hug\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setDescription(`Ara Ara, hugging yourself are we?`)
    .setImage(body.url)
    ]
    });
    } else if (friend == client.user){
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}hug\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setDescription(`Oh, you tried to hug me but u can't hehe\nFor I'm not real. just your darling bot...`)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    ],
    components: [row]
    });  
    } else {
    let response = await fetch("https://nekos.life/api/v2/img/hug");
    let body = await response.json();
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}hug\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setDescription(`<@${friend.id}> Just got a hug from <@${interaction.user.id}>`)
    .setImage(body.url)
    ]
    });
    }
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