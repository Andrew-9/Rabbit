const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
	name: "warn",
	description: "Warn a user in the server",
	cooldown: 5,
	memberpermissions: ["MANAGE_MESSAGES"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    options: [
        {
            "User": {
                name: "target",
                description: "The user you want to warn",
                required: true
            }
          },
          {
            "String": {
              name: "reason",
              description: "Reason for this warn",
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
        let rabbitsmirk = client.settings.get(guild.id, "rabbitsmirk");
        let emoji = client.settings.get(guild.id, "SlashEmoji");
        let smug = client.settings.get(guild.id, "smug");
        const Target = options.getUser("target");
        let reason = options.getString("reason") || "No reason provided";
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

        // const button = new MessageActionRow()
        // .addComponents(
        // new MessageButton()
        // .setCustomId('mute')
        // .setLabel('Mute')
        // .setStyle('SECONDARY')
        // .setEmoji('🔇'),

        // new MessageButton()
        // .setCustomId('kick')
        // .setLabel('Kick')
        // .setStyle('SECONDARY')
        // .setEmoji('🦵'),

        // new MessageButton()
        // .setCustomId('ban')
        // .setLabel('Ban')
        // .setStyle('SECONDARY')
        // .setEmoji('🔨'),

        // new MessageButton()
        // .setCustomId('pardon')
        // .setLabel('Pardon')
        // .setStyle('SECONDARY')
        // .setEmoji('🤝'),

        // new MessageButton()
        // .setLabel('Vote')
        // .setURL(client.global.get("global", "vote"))
        // .setStyle('LINK')
        // .setEmoji('868230223961919548')
        // )
        client.warning.ensure(Target.id, {  userId: "", userTag: "", guildId: "", moderatorId: "", reason: "", timestamp: "" });
        client.warning.set(Target.id, Target.id, "userId");
        client.warning.set(Target.id, Target.tag, "userTag");
        client.warning.set(Target.id, guild.id, "guildId");
        client.warning.set(Target.id, interaction.user.tag, "moderatorId");
        client.warning.set(Target.id, reason, "reason");
        client.warning.set(Target.id, Date.now(), "timestamp");
        await interaction.reply({ content: `<:checkinginformation:914230628516519937> **Collecting the user's information...**`,  components: [row] });
        const wait = require('util').promisify(setTimeout);
        await wait(4000);
        await interaction.editReply({ content: `${smug} **Warning the user... Hold on...**`,  components: [row] });
        await wait(4000);
        interaction.editReply({ content: `**${rabbitsmirk} Good Job \`${Target.tag}\` has been warned. Reason: \`${reason}\`**`,  components: [row] });
        try {
        Target.send({
        content: `You have been warned in **${guild.name}** \nModerator who issued the warning: **${interaction.user.tag}**\nThe reason is: **\`${reason}\`**`,
        components: [row]
        });
        } catch (e) {
        interaction.channel.send({
        content: `${emoji} I could not DM **${Target.tag}** about the warning`,
        components: [row]
        })
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