const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    name: "vote",
    category: "Info",
    usage: "vote",
    aliases: [""],
    cooldown: 1,
    description: "Vote for rabbit if you love him",
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
            let color = client.settings.get(message.guild.id, `colorlike`);
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
            )
            message.reply({
            content: "**<:rabbitslash:913423874182500352> You can try this with slash command \`/info vote\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle(`VOTE FOR ${client.user.username.toUpperCase()}`)
            .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 2048}))
            .setDescription(`
            > Vote for rabbit with this link he'd love that **(✿◠‿◠)**\n
            > Developed by **Kotlin#0427** - And powered by **Fumigram**
            `)
            ],
            components: [row]
         });
        } catch (e) {
         console.log(e)
         return message.reply({
            embeds: [new MessageEmbed()
              .setColor("#ff0079")
              .setTitle(`<:errorcode:868245243357712384> AN ERROR OCCURED!`)
              .setFooter("Error in code: Report this error to kotlin#0427")
              .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
            ]
          });
        }
    }
}