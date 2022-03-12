const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const axios = require("axios").default;
module.exports = {
  name: "botoken",
  category: "Fun",
  usage: "botoken",
  aliases: ["bot-token", "discord-bot-token"],
  description: "Generate (fake) random discord bot token",
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
    .setLabel('Fumigram')
    .setURL('https://fumigram.com')
    .setStyle('LINK')
    .setEmoji('885984580660772934')
    )
    message.channel.sendTyping();
    const options = {
    method: "GET",
    url: "https://some-random-api.ml/bottoken",
    };
    axios.request(options).then((response) => {
    return message.reply({
    content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/fun botoken\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("BOT TOKEN")
    .setDescription(`<a:checkmark:923609365737537556> Bot token: \`${response.data.token}\`\nNote: ||This token is propabbly a fake one||`)
    ]
    }); 
    });
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
