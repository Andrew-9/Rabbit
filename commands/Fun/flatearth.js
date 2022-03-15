const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
  name: "flatearth",
  category: "Fun",
  usage: "flatearth",
  aliases: [""],
  description: "Demonstrates that the earth is really flat",
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
    .setLabel('Bunny')
    .setURL('https://www.youtube.com/watch?v=72CU3BltbfU&ab_channel=PeterRabbit')
    .setStyle('LINK')
    .setEmoji('📺')
    )
    message.channel.sendTyping();
    message.reply({
    content: "**/ Try this with slash command \`/fun flatearth\`**",
    embeds: [new MessageEmbed()
    .setColor(color)
    .setTitle("FLAT EARTH")
    .setDescription("If the earth isn't flat, then explain this")
    .setImage("https://media1.tenor.com/images/462b6d76beee0f9501d20535dae9c00b/tenor.gif?itemid=13792633")
    ],
    })
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
