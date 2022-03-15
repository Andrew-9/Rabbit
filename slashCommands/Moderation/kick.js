const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
	name: "kick",
	description: "kick a member from the server",
	cooldown: 10,
	memberpermissions: ["KICK_MEMBERS"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
        {
          "User": {
            name: "target",
            description: "Select a target to kick",
            required: true
          }
        },
        {
          "String": {
            name: "reason",
            description: "Provide a reason for this kick",
            required: true
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
        if (Target.id === interaction.member.id) {
        interaction.reply({
        ephemeral: true,
        content: `**${SlashDrinking} You can try this command using \`${prefix}kick\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("CANNOT KICK YOURSELF")
        .setDescription("Nope nope nope you cannot kick yourself")
        ],
        components: [row],
        });
        }
        const targetMember = interaction.guild.members.cache.get(Target.id);
        if (targetMember.permissions.has('ADMINISTRATOR')){
        interaction.reply({
        ephemeral: true,            
        content: `**${SlashDrinking} You can try this command using \`${prefix}kick\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("CANNOT KICK ADMINISTRATOR")
        .setDescription("You can't and cannot kick an administrator")
        ],
        components: [row]
        });  
        } else {
        const reason = options.getString("reason");
        if(reason.length > 600){
        interaction.reply({
        ephemeral: true,
        content: `**${SlashDrinking} You can try this command using \`${prefix}kick\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("REASON LENGTH")
        .setDescription("reason cannot exceed **600** characteristics")
        ],
        components: [row]
        }); 
        } else {
        targetMember.kick(reason)
        interaction.reply({
        content: `**${smug} Nice job. we can rest with ease**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle("TARGET KICKED")
        .setThumbnail(targetMember.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
        .setDescription(`The target **${targetMember.user.username}** has been kicked\nReason: ${reason}`)
        ],
        components: [row]
        });
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