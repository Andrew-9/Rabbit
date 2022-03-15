//Import Modules
const ms = require("parse-ms");
const mstime = require("ms");
const config = require(`../../botconfig/config.json`);
const settings = require(`../../botconfig/settings.json`);
const { onCoolDown, replacemsg } = require("../../handlers/functions");
const { MessageEmbed } = require("discord.js");
module.exports = (client, interaction) => {
	const CategoryName = interaction.commandName;
  client.settings.ensure(interaction.guildId, {
      djroles: [],
      defaultvolume: 50,
      prefix: config.prefix,
      defaultautoplay: false,
      defaultfilters: [`bassboost6`, `clear`],
      helppointer: ">",
      color: "#2F3136",
      homecolor: "#00B1F9",
      colorlike: "#FE7B00",
      modcolor: "#22C59F",
      funcolor: "#AD2466",
      settingscolor: "#C14EFF",
      setupcolor: "#525CFF",
      imagecolor: "#CA385F",
      pixelcolor: "#4B61FF",
      audiomack: "#00b7ff",
      equalizercolor: "#4170FF",
      emoji: "🐰",
      SlashEmoji: "🤔",
      SlashDrinking: "😛",
      rabbitsmirk: "😏",
      smug: "🧐",
      react: "🐰",
      pointer: ">",
      audioemoji: "🎵",
  });
  let prefix = client.settings.get(interaction.guildId)
  let color = client.settings.get(interaction.guildId, `color`);
	let command = false;
	try{
    if (client.slashCommands.has(CategoryName + interaction.options.getSubcommand())) {
    command = client.slashCommands.get(CategoryName + interaction.options.getSubcommand());
    }
  	}catch{
    if (client.slashCommands.has("normal" + CategoryName)) {
    command = client.slashCommands.get("normal" + CategoryName);
   	}
	}
	if (command) {
    client.infos.ensure("global", { songs: 0, commands: 0 });
    client.infos.set("global", Number(client.infos.get("global", "commands")) + 1, "commands");
		if (onCoolDown(interaction, command)) {
			  return interaction.reply({ephemeral: true,
				embeds: [new MessageEmbed()
          .setColor(color)
				  .setDescription(replacemsg(settings.messages.cooldown, {
					prefix: prefix,
					command: command,
					timeLeft: onCoolDown(interaction, command)
				  }))]
			  });
			}
		//if Command has specific permission return error
        if (command.memberpermissions && command.memberpermissions.length > 0 && !interaction.member.permissions.has(command.memberpermissions)) {
          return interaction.reply({ 
            ephemeral: true, 
            embeds: [new MessageEmbed()
              .setColor(color)
              .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
              .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.memberpermissions, {
                command: command,
                prefix: prefix
              }))]
          });
        }
        //if Command has specific needed roles return error
        if (command.requiredroles && command.requiredroles.length > 0 && interaction.member.roles.cache.size > 0 && !interaction.member.roles.cache.some(r => command.requiredroles.includes(r.id))) {
          return interaction.reply({ 
            ephemeral: true, 
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
            .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.requiredroles, {
              command: command,
              prefix: prefix
			}))]
          })
        }
        //if Command has specific users return error
        if (command.alloweduserids && command.alloweduserids.length > 0 && !command.alloweduserids.includes(interaction.member.id)) {
          return message.channel.send({ 
            ephemeral: true, 
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
            .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.alloweduserids, {
              command: command,
              prefix: prefix
            }))]
          });
        }
		//execute the Command
		command.run(client, interaction)
	}
}
