const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    name: "purge",
    category: "Moderation",
    usage: "purge <amount>",
    aliases: ["clear", "prune", "pruge", "purne", "clean", "trash"],
    cooldown: 5,
    description: "Removes up to 100 messages",
    memberpermissions: ["MANAGE_MESSAGES"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
            let color = client.settings.get(message.guild.id, `modcolor`);
            let amount = args.join(" ") || 100;
            //const messages = await msg.channel.messages.fetch({ limit: count > 100 ? 100 : count })
            args.shift();
            const row = new MessageActionRow()
            .addComponents(
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
            )
            if (isNaN(amount)) {
            message.reply({
            content: "**<:rabbitslash:913423874182500352> Try slash command \`/moderation purge\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("NOT A VALID NUMBER")
            .setDescription("Please use only numbers when deleting messages")
            ]
            });
            } else if (amount > 100) {
            message.reply({
            content: "**<:rabbitslash:913423874182500352> Try slash command \`/moderation purge\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("NUMBER LENGTH TOO LONG")
            .setDescription("Number must be \`100\` or less than \`100\`")
            ]
            });
            } else {
            try {
            await message.delete();
            await message.channel.bulkDelete(amount);
            } catch (e) {
            console.log(e);
            message.channel.send({
            content: "**<:rabbitslash:913423874182500352> Try slash command \`/moderation purge\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("CANNOT DELETE OLDER MESSAGES")
            .setDescription(`Cannot delete messages that are over \`14\` days old`)
            ],
            components: [row]
            })
            }
            }
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