const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    name: "invite",
    category: "Info",
    usage: "invite",
    aliases: [""],
    cooldown: 5,
    description: "Invite me to your server",
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
            .setLabel('Support Server')
            .setURL(client.global.get("global", "support"))
            .setStyle('LINK')
            .setEmoji('924818382908440606'),

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
            content: "**<:rabbitslash:913423874182500352> You can try this with slash command \`/info invite\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle(`INVITE ${client.user.username.toUpperCase()}`)
            .setDescription(`
            Invite me to your server using [Link](${client.global.get("global", "invite")})
            Website for some details about me [Info](https://rabbit.fumigram.com/)
            Vote for me using links [Top.gg](${client.global.get("global", "vote")}) | [Discord Boats](https://discord.boats/bot/897819791732121621)
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
              .setTitle(`<:errorcode:868245243357712384> AN ERROR OCCURED!`)
              .setFooter("Error in code: Report this error to kotlin#0427")
              .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
            ]
          });
        }
    }
}