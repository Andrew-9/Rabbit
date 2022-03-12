const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
	name: "unban",
	description: "Unban a user from the server\nAnd the bot will create an invite link for the user",
	cooldown: 10,
	memberpermissions: ["BAN_MEMBERS"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
        {
          "String": {
            name: "target",
            description: "Give me a user Id to unban",
            required: true
          }
        },
        {
          "String": {
            name: "reason",
            description: "Provide a reason for this ban",
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
        let smug = client.settings.get(guild.id, "smug");
        let emoji = client.settings.get(guild.id, "emoji");
        let SlashDrinking = client.settings.get(guild.id, "SlashDrinking");
        const Target = options.getString("target");
        const rgx = /^(?:<@!?)?(\d+)>?$/;
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setURL(client.global.get("global", "invite"))
          .setLabel("Invite")
          .setEmoji('924818034965766215')
          .setStyle("LINK"),
    
          new MessageButton()
          .setURL("https://www.instagram.com/fumigramapp/")
          .setLabel("Instagram")
          .setEmoji('924819412505223188')
          .setStyle("LINK"),
    
          new MessageButton()
          .setLabel('Facebook')
          .setURL('https://web.facebook.com/fumigram')
          .setStyle('LINK')
          .setEmoji('924927819610456124')
        )
        if (!rgx.test(Target)) {
        interaction.reply({
        ephemeral: true,
        content: `**${emoji} Easily use this same command with \`${prefix}unban\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("PROVIDE VALID USER ID")
        .setDescription("Please provide a valid user id to unban")
        ],
        components: [row]
        });
        } else {
        const bannedUsers = await guild.bans.fetch();
        const user = bannedUsers.get(Target).user;
        if (!user) {
        interaction.reply({
        content: `**${emoji} Easily use this same command with \`${prefix}unban\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("USER NOT FOUND")
        .setDescription("Unable to find user, please check the provided ID")
        ],
        components: [row]
        }); 
        } else {
        const reason = options.getString("reason");
        if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
        await guild.members.unban(user, reason);
        interaction.reply({
        content: `**${smug} Nice job. we can rest with ease**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("TARGET UNBANNED")
        .setThumbnail(user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
        .setDescription(`**${user.tag}** has been unbanned\nReason: ${reason || "You did not provide one"}`)
        ],
        components: [row]
        });
        try {
        const dUrl = "https://discord.gg/";
        interaction.channel.createInvite({ maxAge: 86400, maxUses: 2, unique: true })
        .then((invite) => {          
        user.send({
        content: `**${emoji} You were unbanned from \`${guild.name}\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("SUCCESSFULLY UNBANNED")
        .setThumbnail(user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
        .setDescription(`You've been unbanned from **${guild.name}**\nReason: ${reason || "The moderator did not provide one"}\nJoin back using ${dUrl}${invite.code}\nNote: this link is valid for \`24 hours\` only`)
        ],
        components: [row]
        });
        });
        } catch (e){
        interaction.channel.send({
        content: `${SlashDrinking} I could not DM **${user.tag}** about the unbanned`,
        components: [row]
        })
        }
        }
        }
		} catch (e) {
        console.log(e.stack ? e.stack : e)
        interaction.editReply({
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