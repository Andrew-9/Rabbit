const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "cuddle",
  category: "Fun",
  usage: "cuddle <user>",
  aliases: [],
  description: "Give a cuddle to mentioned user",
  cooldown: 2,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
    let prefix = client.settings.get(message.guild.id, "prefix");
    let color = client.settings.get(message.guild.id, `funcolor`);
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
    .setURL('https://www.youtube.com/watch?v=-pp-isBAaR8&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('916090320758915102')
    )
    const user = message.mentions.users.first();
    if (!user) {
    return message.reply({
    content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/fun cuddle\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("CUDDLE SOMEONE")
    .setDescription(`Ara Ara, Do you want to cuddle someone?`)
    ],
    components: [row]
    });
    } else if (user == message.author){
    message.channel.sendTyping();
    let response = await fetch("https://nekos.life/api/v2/img/cuddle");
    let body = await response.json();
    return message.reply({
    content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/fun cuddle\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setDescription(`Ara Ara, cuddling yourself are we?`)
    .setImage(body.url)
    ]
    });
    } else if (user == client.user) {
    return message.reply({
    content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/fun cuddle\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setDescription(`Oh, you tried to hug me but u can't hehe\nFor I'm not real. just your darling bot...`)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    ],
    components: [row]
    });  
    } else {
    message.channel.sendTyping();
    let response = await fetch("https://nekos.life/api/v2/img/cuddle");
    let body = await response.json();
    return message.reply({
    content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/fun cuddle\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setDescription(`<@${user.id}> Just got a cuddle from <@${message.author.id}>`)
    .setImage(body.url)
    ]
    });
    }  
    } catch (e) {
    console.log(e.stack ? e.stack : e)
    message.reply({
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
