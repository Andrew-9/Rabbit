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
    .setLabel('Fumigram')
    .setURL('https://fumigram.com')
    .setStyle('LINK')
    .setEmoji('🥰')
    )
    message.channel.sendTyping();
    const options = {
    method: "GET",
    url: "https://some-random-api.ml/bottoken",
    };
    axios.request(options).then((response) => {
    return message.reply({
    content: "**/ Try this with slash command \`/fun botoken\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("BOT TOKEN")
    .setDescription(`✔ Bot token: \`${response.data.token}\`\nNote: ||This token is propabbly a fake one||`)
    ]
    }); 
    });
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
