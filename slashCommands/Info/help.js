const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "help",
	description: "Displays all the commands available",
	cooldown: 3,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, interaction) => {
		try {
        const { member, options } = interaction;
        const { guild } = member;
        let cmdlist = new MessageEmbed()
        .setColor("#FF7F3F")
        .setThumbnail("https://media.discordapp.net/attachments/711910361133219903/927990837403586560/commands-list.png")
        .setTitle(`HELP MENU COMMANDS LIST`)
        .setDescription(`
        \`\`\`[] - Required Argument | () - Optional Argument\`\`\`
        `)
        const commands = (category) => {
        return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
        };
        try {
        for (let i = 0; i < client.categories.length; i += 1) {
        const current = client.categories[i];
        const items = commands(current);
        cmdlist.addField(`**${current.toUpperCase()}**`, `> ${items.join(", ")}`);
        }
        } catch (e) { console.log(String(e.stack)); }
        return interaction.reply({ embeds: [cmdlist] });
	} catch (e) {
    console.log(e.stack ? e.stack : e)
    interaction.reply({
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