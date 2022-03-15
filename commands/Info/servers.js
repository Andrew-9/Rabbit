const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    name: "servers",
    category: "Info",
    usage: "servers",
    aliases: ["guilds"],
    cooldown: 5,
    description: "Shows total servers where the bot is in",
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
            let color = client.settings.get(message.guild.id, `colorlike`);
            let pointer = client.settings.get(message.guild.id, `pointer`);
            let version = client.global.get("global", `version`);
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
              .setEmoji('🐰')
            )
            message.reply({
            content: "**/ Try this with slash command \`/info servers\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle(`${client.user.username.toUpperCase()} IS RUNNING`)
            .setDescription(`
            ${pointer} **Running in** - \`${client.guilds.cache.size}\` servers
            ${pointer} **Channels** - \`${client.channels.cache.size}\` channels
            ${pointer} **Serving up to** - \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\` members
            ${pointer} **Rabbit Version** - \`${version}\`
            `)
            .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
            ],
            components: [row]
         });
        } catch (e) {
         console.log(e)
         return message.reply({
            embeds: [new MessageEmbed()
              .setColor("#ff0079")
              .setTitle(`❌ AN ERROR OCCURED!`)
              .setFooter("Error in code: Report this error to kotlin#0427")
              .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
            ]
          });
        }
    }
}