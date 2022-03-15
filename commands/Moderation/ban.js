const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    name: "ban",
    category: "Moderation",
    usage: "ban <mention> <reason>",
    aliases: [""],
    cooldown: 10,
    description: "Ban a member from the server",
    memberpermissions: ["BAN_MEMBERS"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
            let color = client.settings.get(message.guild.id, `modcolor`);
            let smug = client.settings.get(message.guild.id, "smug");
            const target = message.mentions.members.first();
            const reason = args.slice(1).join(" ");
            args.shift();
            if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
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
        
              new MessageButton()
              .setLabel('Facebook')
              .setURL('https://web.facebook.com/fumigram')
              .setStyle('LINK')
              .setEmoji('✔')
            )
            if (!target) {
            message.reply({
            content: "**/ Try slash command \`/moderation ban\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("NOT A VALID USER")
            .setDescription("Please mention a valid user to ban")
            ],
            components: [row]
            }); 
            } else if (target.id === message.author.id) {
            message.reply({
            content: "**/ Try slash command \`/moderation ban\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("CANNOT BAN YOURSELF")
            .setDescription("Nope nope nope you cannot ban yourself")
            ],
            components: [row]
            });
            } else if (target) {
            const targetMember = message.guild.members.cache.get(target.id);
            if (targetMember.permissions.has("ADMINISTRATOR")){
            message.reply({
            content: "**/ try this with slash command \`/moderation ban\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("CANNOT BAN ADMINISTRATOR")
            .setDescription("You can't and cannot ban an administrator")
            ],
            components: [row]
            });  
            } else {
            targetMember.ban({ reason: reason });
            message.reply({
            content: `**${smug} Nice job. use \`/moderation ban\` next time**`,
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("TARGET BANNED")
            .setThumbnail(target.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
            .setDescription(`The target **${target.user.username}** has been banned\nReason: ${reason || "You did not provide one"}`)
            ],
            components: [row]
            }); 
            try {
            target.send({
            content: `**${smug} You were banned from \`${message.guild.name}\`**`,
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("SUCCESSFULLY BANNED")
            .setThumbnail(target.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
            .setDescription(`You've been banned from **${message.guild.name}**\nReason: ${reason || "The moderator did not provide one"}`)
            ],
            components: [row]
            })
            } catch (e){
            message.channel.send({
            content: `<:thinkingkatana:913429281353371719> I could not DM **${target.user.tag}** about the banned`,
            components: [row]
            })
            }
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