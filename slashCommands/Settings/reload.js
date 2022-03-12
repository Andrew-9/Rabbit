const { MessageEmbed, Message } = require("discord.js");
const glob = require("glob");
const chalk = require("chalk");
const config = require("../../config");
module.exports = {
  name: "reload",
  cooldown: 5,
  description: "Reload all the commands for new changes",
  memberpermissions: ["MANAGE_GUILD"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: ["696724053477556254", "709414462779687004"], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, interaction) => {
    try {
      const { member, options } = interaction;
      const { guild } = member;
      let color = client.settings.get(guild.id, `settingscolor`);
      let emoji = client.settings.get(guild.id, "SlashEmoji");
      if (interaction.member.id !== config.ownerid) {
        interaction.reply({
		embeds: [
		new MessageEmbed()
        .setColor(color)
        .setTitle(`NO PERMISSION!`)
		.setDescription(`Oops sorry. (Only my owner can run this)`)
		],
		});
    } else {
        client.commands.sweep(() => true)
        glob(`${__dirname}/../**/*.js`, async(error, filePaths) =>{
            if(error) return console.log(err);
            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)];
                const pull = require(file);
                if(pull.name){
                console.log(chalk.bold(chalk.blue.bold(`[RABBIT]`)) + chalk.magenta.bold(`Reloaded ${pull.name} (Command)`));
                client.commands.set(pull.name, pull);
                }
                if(pull.aliases && Array.isArray(pull.aliases)){
                    pull.aliases.forEach((alias) => {
                        client.aliases.set(alias, pull.name)
                    });
                }
            })

        });
        interaction.reply({
		embeds: [
		new MessageEmbed()
        .setColor(color)
        .setTitle(`CMD RELOADED!`)
		.setDescription(`Commands Reloaded Successfully`)
		],
		});
    }
    } catch (e) {
      console.log(String(e.stack))
    }
  }
}