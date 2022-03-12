const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    name: "warn",
    category: "Moderation",
    usage: "warn <user>",
    aliases: [""],
    cooldown: 5,
    description: "Warn a user in the server",
    memberpermissions: ["MANAGE_MESSAGES"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
            let color = client.settings.get(message.guild.id, `modcolor`);
            let rabbitsmirk = client.settings.get(message.guild.id, "rabbitsmirk");
            let emoji = client.settings.get(message.guild.id, "SlashEmoji");
            let smug = client.settings.get(message.guild.id, "smug");
            const Target = message.mentions.members.first();
            args.shift();
            let reason = args.join(" ") || "No reason provided";
            if (reason.length > 1024) reason = reason.slice(0, 1021) + "...";
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
            if (!Target) {
            message.reply({
            content: "**<:rabbitslash:913423874182500352> Try slash command \`/moderation warn\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("NOT A VALID USER")
            .setDescription("Please mention a valid user to warn")
            ]
            });
            } else {
            client.warning.ensure(Target.id, {  userId: "", userTag: "", guildId: "", moderatorId: "", reason: "", timestamp: "" });
            client.warning.set(Target.id, Target.user.tag, "userId");
            client.warning.set(Target.id, Target.user.tag, "userTag");
            client.warning.set(Target.id, message.guild.id, "guildId");
            client.warning.set(Target.id, message.author.tag, "moderatorId");
            client.warning.set(Target.id, reason, "reason");
            client.warning.set(Target.id, Date.now(), "timestamp");
            let msg = await message.reply({ content: `<:checkinginformation:914230628516519937> **Collecting the user's information...**`,  components: [row] });
            const wait = require('util').promisify(setTimeout);
            await wait(4000);
            await msg.edit({ content: `${smug} **Warning the user... Hold on...**`,  components: [row] });
            await wait(4000);
            msg.edit({ content: `**${rabbitsmirk} Good Job \`${Target.user.tag}\` has been warned. Reason: \`${reason}\`**`,  components: [row] });
            try {
            Target.send({
            content: `You have been warned in **${message.guild.name}** \nModerator who issued the warning: **${message.author.tag}**\nThe reason is: **\`${reason}\`**`,
            components: [row]
            });
            } catch (e) {
            message.channel.send({
            content: `${emoji} I could not DM **${Target.tag}** about the warning`,
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