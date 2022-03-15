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
            if (isNaN(amount)) {
            message.reply({
            content: "**/ Try slash command \`/moderation purge\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("NOT A VALID NUMBER")
            .setDescription("Please use only numbers when deleting messages")
            ]
            });
            } else if (amount > 100) {
            message.reply({
            content: "**/ Try slash command \`/moderation purge\`**",
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
            content: "**/ Try slash command \`/moderation purge\`**",
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
              .setTitle(`❌ AN ERROR OCCURED!`)
              .setFooter("Error in code: Report this error to kotlin#0427")
              .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
            ]
          });
        }
    }
}