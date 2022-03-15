const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
  name: "ping",
  category: "Info",
  usage: "ping",
  aliases: ["latency"],
  description: "Gives you information on how fast the Bot is",
  cooldown: 1,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

  run: async (client, message, args) => {
    try {
      let color = client.settings.get(message.guild.id, `colorlike`);
      let pointer = client.settings.get(message.guild.id, `pointer`);
      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setLabel('Support Server')
        .setURL("https://discord.com/invite/MJ5tYb4Jh9")
        .setStyle('LINK')
        .setEmoji('✈'),

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
      )
      message.reply({
      content: "**/ Try this with slash command \`/info ping\`**",
      embeds: [new MessageEmbed()
      .setColor(color)
      .setTitle(`${client.user.username.toUpperCase()} PONG`)
      .setDescription(`
      ${pointer} **Bot Ping:** - \`${Math.floor((Date.now() - message.createdTimestamp) - 2 * Math.floor(client.ws.ping))} ms\`
      ${pointer} **Api Ping:** - \`${Math.floor(client.ws.ping)} ms\`
      `)
      .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
      ],
      components: [row]
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
