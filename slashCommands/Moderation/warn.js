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
        client.warning.ensure(Target.id, {  userId: "", userTag: "", guildId: "", moderatorId: "", reason: "", timestamp: "" });
        client.warning.set(Target.id, Target.id, "userId");
        client.warning.set(Target.id, Target.tag, "userTag");
        client.warning.set(Target.id, guild.id, "guildId");
        client.warning.set(Target.id, interaction.user.tag, "moderatorId");
        client.warning.set(Target.id, reason, "reason");
        client.warning.set(Target.id, Date.now(), "timestamp");
        await interaction.reply({ content: `🧐 **Collecting the user's information...**`,  components: [row] });
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
        .setTitle(`❌ AN ERROR OCCURED!`)
        .setFooter("Error in code: Report this error to kotlin#0427")
        .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
        ],
        });
		}
	}
}