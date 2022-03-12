const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const client = require("nekos.life");
const neko = new client();
module.exports = {
  name: "cat-emoji",
  category: "Fun",
  usage: "cat-emoji",
  aliases: [],
  description: "Do you know that cat's are cute?",
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
      .setLabel('Vote')
      .setURL(client.global.get("global", "vote"))
      .setStyle('LINK')
      .setEmoji('924819119860224082'),
    )
    message.channel.sendTyping();
    let text = await neko.sfw.catText();
    return message.reply({
    content: `**${text.cat}**`,
    components: [row]
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
