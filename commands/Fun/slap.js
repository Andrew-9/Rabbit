const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "slap",
  category: "Fun",
  usage: "slap <user>",
  aliases: [""],
  description: "Slap a user",
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
    .setURL('https://www.youtube.com/watch?v=lp9o5i2s5sA&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('📺')
    )
    if (!user) {
    return message.reply({
    content: "**/ Try this with slash command \`/fun slap\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("TAG A FRIEND")
    .setDescription(`Please mention the user you want to slap. \`${prefix}slap @kotlin\``)
    ],
    components: [row]
    });
    } else if (user == message.author){
    return message.reply({
    content: "**/ Try this with slash command \`/fun slap\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("NOPE NOPE NOPE")
    .setDescription(`You cannot slap yourself. it's an unbroken rule`)
    ],
    components: [row]
    });
    } else if (user == client.user){
    return message.reply({
    content: "**/ Try this with slash command \`/fun slap\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setDescription(`Oh, you tried to slap me but u can't hehe\nFor I'm not real. just your darling bot...`)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    ],
    components: [row]
    });  
    } else {
    message.channel.sendTyping();
    const response = await fetch("https://nekos.life/api/v2/img/slap");
    const body = await response.json();
    return message.reply({
    content: "**/ Try this with slash command \`/fun kill\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
    .setImage(body.url)
    .setDescription(`<@${user.id}> Just got slapped by <@${message.author.id}>`)
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
