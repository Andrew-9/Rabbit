const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
	name: "slap",
  description: "Slap a user",
	cooldown: 2,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
    {
      "User": {
        name: "user",
        description: "ping the user you want to slap",
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
    .setURL('https://www.youtube.com/watch?v=lp9o5i2s5sA&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('📺')
    )
    if (!user) {
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}slap\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("TAG A USER")
    .setDescription(`Please tag the user you want to slap. \`/fun slap @Elena\``)
    ],
    components: [row]
    });
    } else if (user == interaction.user){
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}slap\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("NOPE NOPE NOPE")
    .setDescription(`You cannot slap yourself. it's an unbroken rule`)
    ],
    components: [row]
    });
    } else if (user == client.user){
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}slap\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setDescription(`Oh, you tried to slap me but u can't hehe\nFor I'm not real. just your darling bot...`)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    ],
    components: [row]
    });  
    } else {
    let response = await fetch("https://nekos.life/api/v2/img/slap");
    let body = await response.json();
    return interaction.reply({
    content: `**${emoji} Easily use this same command with \`${prefix}slap\`**`,
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setImage(body.url)
    .setDescription(`<@${user.id}> Just got slapped by <@${interaction.user.id}>`)
    ]
    });
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