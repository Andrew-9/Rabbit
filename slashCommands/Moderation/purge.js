const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
	name: "purge",
	description: "Removes up to 100 messages",
	cooldown: 5,
	memberpermissions: ["MANAGE_MESSAGES"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
        {
          "String": {
            name: "amount",
            description: "The amount of messages to delete",
            required: false
          }
        },
      ],
	run: async (client, interaction) => {
		try {
        const { member, options } = interaction;
		    const { guild } = member;
        let prefix = client.settings.get(guild.id, "prefix");
        let color = client.settings.get(guild.id, `modcolor`);
        let emoji = client.settings.get(guild.id, "SlashEmoji");
        let amount = options.getString("amount") || 100;
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
        if (isNaN(amount)) {
        interaction.reply({
        content: `**${emoji} Easily use this same command with \`${prefix}purge\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("NOT A VALID NUMBER")
        .setDescription("Please use only numbers when deleting messages")
        ],
        components: [row]
        });
        } else if (amount > 100) {
        interaction.reply({
        content: `**${emoji} Easily use this same command with \`${prefix}purge\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("NUMBER LENGTH TOO LONG")
        .setDescription("Number must be \`100\` or less than \`100\`")
        ],
        components: [row]
        });
        } else {
        try {
        await interaction.channel.bulkDelete(amount).then((messages) => {
        (async () => {
        interaction.reply({ content: `**${emoji} Deleted \`${messages.size}/${amount}\` messages**`, components: [row] });
        const wait = require('util').promisify(setTimeout);
        await wait(4000);
        await interaction.deleteReply();
        })();
        });
        } catch (e) {
        console.log(e);
        interaction.channel.send({
        content: `**${emoji} Easily use this same command with \`${prefix}purge\`**`,
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
        console.log(e.stack ? e.stack : e)
        interaction.editReply({
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