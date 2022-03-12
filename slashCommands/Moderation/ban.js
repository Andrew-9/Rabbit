const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
	name: "ban",
	description: "Ban a member from the server",
	cooldown: 10,
	memberpermissions: ["BAN_MEMBERS"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
        {
          "User": {
            name: "target",
            description: "Select a target to ban",
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
        let SlashDrinking = client.settings.get(guild.id, "SlashDrinking");
        const Target = options.getUser("target");
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
        if (Target.id === interaction.member.id) {
        interaction.reply({
        ephemeral: true,
        content: `**${SlashDrinking} You can try this command using \`${prefix}ban\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("CANNOT BAN YOURSELF")
        .setDescription("Nope nope nope you cannot ban yourself")
        ],
        components: [row],
        });
        }
        const targetMember = interaction.guild.members.cache.get(Target.id);
        if (targetMember.permissions.has('ADMINISTRATOR')){
        interaction.reply({
        ephemeral: true,            
        content: `**${SlashDrinking} You can try this command using \`${prefix}ban\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("CANNOT BAN ADMINISTRATOR")
        .setDescription("You can't and cannot ban an administrator")
        ],
        components: [row]
        });  
        } else {
        const reason = options.getString("reason") || "You did not provide one";
        if(reason.length > 1024){
        interaction.reply({
        ephemeral: true,
        content: `**${SlashDrinking} You can try this command using \`${prefix}ban\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("REASON LENGTH")
        .setDescription("reason cannot exceed **1024** characteristics")
        ],
        components: [row]
        }); 
        } else {
        targetMember.ban({ reason: reason })
        interaction.reply({
        content: `**${smug} Nice job. we can rest with ease**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("TARGET BANNED")
        .setThumbnail(targetMember.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
        .setDescription(`The target **${targetMember.user.username}** has been banned\nReason: ${reason}`)
        ],
        components: [row]
        });
        try {
        targetMember.send({
        content: `**${smug} You were banned from \`${guild.name}\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("SUCCESSFULLY BANNED")
        .setThumbnail(targetMember.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
        .setDescription(`You've been banned from **${guild.name}**\nReason: ${reason || "The moderator did not provide one"}`)
        ],
        components: [row]
        })
        } catch (e){
        interaction.channel.send({
        content: `${SlashDrinking} I could not DM **${targetMember.user.tag}** about the banned`,
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