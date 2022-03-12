const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
	name: "tickle",
    description: "Tickle a user",
	cooldown: 2,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
    {
      "User": {
        name: "user",
        description: "ping the user you want to tickle",
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
    const user = options.getUser("user");
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
    .setURL('https://www.youtube.com/watch?v=R2-ANlXrf68&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('916090320758915102')
    )
    if (!user) {
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}tickle\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("TAG A USER")
    .setDescription(`Please tag the user you want to tickle. \`/fun tickle @Elena\``)
    ],
    components: [row]
    });
    } else if (user == interaction.user){
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}tickle\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("NOPE NOPE NOPE")
    .setDescription(`You cannot tickle yourself. it's an unbroken rule`)
    ],
    components: [row]
    });
    } else if (user == client.user){
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
    let response = await fetch("https://nekos.life/api/v2/img/tickle");
    let body = await response.json();
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}tickle\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setImage(body.url)
    .setDescription(`<@${user.id}> Just got tickled by <@${interaction.user.id}>`)
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