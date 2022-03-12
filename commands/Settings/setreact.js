const { MessageEmbed, MessageButton } = require("discord.js");
module.exports = {
  name: "setreact",
  category: "Settings",
  aliases: ["reaction", "newreaction", "react", "setreaction"],
  usage: "setreact <newReaction>",
  cooldown: 1,
  description: "This changes the emoji which the bot reacts with",
  memberpermissions: ["MANAGE_GUILD"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

  run: async (client, message, args) => {
    try {
      const { member } = message;
      const { guild } = member;
      let color = client.settings.get(message.guild.id, `settingscolor`);
	    let emoji = client.settings.get(message.guild.id, `emoji`);
      if (!args[0]) {
        return message.reply({
          embeds: [
            new MessageEmbed()
            .setColor(color)
            .setTitle(`${emoji} PLEASE ADD A SERVER EMOJI`)
            .setDescription(`**Usage:** - \`${client.settings.get(guild.id, "prefix")}setreact <newReaction>\``)
          ],
        })
      }
      let newReact = args[0];
      client.settings.ensure(guild.id, {
        react: "<:R_rabbit:924819119860224082>"
      });
      client.settings.set(guild.id, newReact, "react");
      let BnewReact = client.settings.get(guild.id, `react`);
      message.react(BnewReact);
      return message.reply({
        content: "**<:rabbitslash:913423874182500352> Try slash command \`/settings react\`**",
        embeds: [
          new MessageEmbed()
          .setColor(color)
          .setTitle(`NEW MESSAGE REACTION`)
          .setDescription(`Successfully set the reaction to ${BnewReact}`)
        ],
      });
    } catch (e) {
    console.log(e)
		message.reply({
		embeds: [
		new MessageEmbed()
		.setColor("#e63064")
		.setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
		.setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
		.setFooter("Error in code: Report this error to kotlin0427 or _destroyer_#1574")
		],
		});
    }
  }
}
