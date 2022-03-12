const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    name: "unban",
    category: "Moderation",
    usage: "unban <user> <reason>",
    aliases: [""],
    cooldown: 10,
    description: "Unban a member from the server\nAnd the bot will create an invite link for the user",
    memberpermissions: ["BAN_MEMBERS"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
            let color = client.settings.get(message.guild.id, `modcolor`);
            let emoji = client.settings.get(message.guild.id, `emoji`);
            const target = args[0];
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
            if (!target) {
            message.reply({
            content: "**<:rabbitslash:913423874182500352> Try slash command \`/moderation unban\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("PROVIDE USER ID")
            .setDescription("Please give me a user id to unban")
            ],
            components: [row]
            }); 
            } else if (!rgx.test(target))  {
            message.reply({
            content: "**<:rabbitslash:913423874182500352> Try slash command \`/moderation unban\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("PROVIDE VALID USER ID")
            .setDescription("Please provide a valid user id to unban")
            ],
            components: [row]
            });
            } else {
            const bannedUsers = await message.guild.bans.fetch();
            const user = bannedUsers.get(target).user;
            if (!user) {
            message.reply({
            content: "**<:rabbitslash:913423874182500352> try this with slash command \`/moderation unban\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("USER NOT FOUND")
            .setDescription("Unable to find user, please check the provided ID")
            ],
            components: [row]
            }); 
            } else {
            let reason = args.slice(1).join(" ");
            args.shift();
            if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
            await message.guild.members.unban(user, reason);
            message.reply({
            content: "**<:rabbitslash:913423874182500352> try this with slash command \`/moderation unban\`**",
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
            message.channel.createInvite({ maxAge: 86400, maxUses: 2, unique: true })
            .then((invite) => {    
            user.send({
            content: `**${emoji} You were unbanned from \`${message.guild.name}\`**`,
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("SUCCESSFULLY UNBANNED")
            .setThumbnail(user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
            .setDescription(`You've been unbanned from **${message.guild.name}**\nReason: ${reason || "The moderator did not provide one"}\nJoin back using ${dUrl}${invite.code}\nNote: this link is valid for \`24 hours\` only`)
            ],
            components: [row]
            });
            });
            } catch (e){
            message.channel.send({
            content: `<:thinkingkatana:913429281353371719> I could not DM **${user.tag}** about the unbanned`,
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
              .setTitle(`<:errorcode:868245243357712384> AN ERROR OCCURED!`)
              .setFooter("Error in code: Report this error to kotlin#0427")
              .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
            ]
          });
        }
    }
}