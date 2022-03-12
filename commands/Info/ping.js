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
        .setLabel('Instagram')
        .setURL("https://www.instagram.com/fumigramapp")
        .setStyle('LINK')
        .setEmoji('924819412505223188'),
      )
      message.reply({
      content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/info ping\`**",
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
      .setTitle(`<:errorcode:868245243357712384> AN ERROR OCCURED!`)
      .setFooter("Error in code: Report this error to kotlin#0427")
      .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
      ],
      });
    }
  }
}
