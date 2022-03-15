const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "kiss",
  category: "Fun",
  usage: "kiss <user>",
  aliases: [""],
  description: "Kiss kiss kiss <3 | Cari... I love you",
  cooldown: 2,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
    let prefix = client.settings.get(message.guild.id, "prefix");
    let color = client.settings.get(message.guild.id, `funcolor`);
    const user = message.mentions.users.first();
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
    .setEmoji('📺')
    )
    if (!user) {
    return message.reply({
    content: "**/ Try this with slash command \`/fun kiss\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("TAG A LOVER")
    .setDescription(`Please mention the lover you want to kiss. \`${prefix}kiss @Elena\``)
    ],
    components: [row]
    });
    } else if (user == message.author){
    return message.reply({
    content: "**/ Try this with slash command \`/fun kiss\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("NOPE NOPE NOPE")
    .setDescription(`You can't kiss yourself **(¬‿¬)**\nTry kissing someone else, your love or something`)
    ],
    components: [row]
    });
    } else if (user == client.user){
    message.channel.sendTyping();
    let response = await fetch("https://nekos.life/api/v2/img/kiss");
    let body = await response.json();
    return message.reply({
    content: "**/ Try this with slash command \`/fun kiss\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setDescription(`Oh thanks for the kiss **(✿◠‿◠)**`)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setImage(body.url)
    ],
    components: [row]
    });  
    } else {
    message.channel.sendTyping();
    let response = await fetch("https://nekos.life/api/v2/img/kiss");
    let body = await response.json();
    return message.reply({
    content: "**/ Try this with slash command \`/fun kiss\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setImage(body.url)
    .setDescription(`<:heart_with_ribbon:923883162499702835> <@${message.author.id}> Gave <@${user.id}> a beautiful kiss **(✿◠‿◠)**`)
    ]
    });
    }
    } catch (e) {
    console.log(e.stack ? e.stack : e)
    message.reply({
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
