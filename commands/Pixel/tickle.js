const { MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const nekoclient = require('nekos.life');
const neko = new nekoclient();
module.exports = {
  name: "tickle",
  category: "Pixel",
  usage: "tickle [user mention, user id]",
  aliases: [""],
  description: "Give your friend a tickle",
  cooldown: 2,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

  run: async (client, message, args) => {
    try {
    let prefix = client.settings.get(message.guild.id, "prefix");
    let color = client.settings.get(message.guild.id, `pixelcolor`);
    const user = message.mentions.users.first();
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
    .setURL('https://www.youtube.com/watch?v=xsjgpj2AtTM&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('916090320758915102')
    )
    if (!user) {
    return message.reply({
    content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/pixel tickle\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("TAG A FRIEND")
    .setDescription(`Please mention one of your friends. \`${prefix}tickle @kotlin\``)
    ],
    components: [row]
    });
    } else if (user == message.author){
    message.channel.sendTyping();
    async function tickle() {
    const GIF = await neko.sfw.tickle();
    return message.reply({
    content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/pixel tickle\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`<@${message.author.id}> gave themselve a tickle`)
    .setImage(GIF.url)
    ],
    components: []
    });
    }
    tickle();
    } else if (user == client.user){
    return message.reply({
    content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/fun tickle\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setDescription(`Oh, you tried to tickle me but u can't hehe\nFor I'm not real. just your darling bot...`)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    ],
    components: [row]
    });  
    } else {
    message.channel.sendTyping();
    async function tickle() {
    const GIF = await neko.sfw.tickle();
    return message.reply({
    content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/pixel tickle\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`<@${message.author.id}> just gave <@${user.id}> a tickle`)
    .setImage(GIF.url)
    ],
    components: []  
    })
    }
    tickle();
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
