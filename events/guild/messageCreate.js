const config = require(`../../botconfig/config.json`);
const settings = require(`../../botconfig/settings.json`);
const websettings = require("../../../dashboard/settings.json");
const { onCoolDown, replacemsg } = require(`../../handlers/functions`);
const { MessageEmbed } = require(`discord.js`);
const ms = require("parse-ms");
const mstime = require("ms");
module.exports = async (client, message) => {
  try {
    if (!message) return;
    if (message.author.bot) return;
    if (!message.guild) return
    if(message.channel.partial) await message.channel.fetch();
    if(message.partial) await message.fetch();
    ////// Settings Databasing //////////////
    client.settings.ensure(message.guild.id, {
      djroles: [],
      botchannel: [],
      updates: "",
      defaultvolume: 50,
      defaultmute: "1m",
      slashcommands: true,
      prefix: config.prefix,
      defaultautoplay: false,
      defaultfilters: [`bassboost6`, `clear`],
      setupointer: ">",
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
      levelupcolor: "#F1434D",
      giveawaycolor: "#E62E52",
      audiomack: "#00b7ff",
      equalizercolor: "#4170FF",
      economycolor: "#07A461",
      emoji: "<:R_rabbit:924819119860224082>",
      SlashEmoji: "<:thinkingkatana:913429281353371719>",
      SlashDrinking: "<:drinkingthinking:914230665443155978>",
      rabbitsmirk: "<:rabbitsmirk:868230245176713266>",
      smug: "<:finesmug:914226329073909830>",
      react: "<:R_rabbit:924819119860224082>",
      pointer: "<:rabbitpoint:897844154258841620>",
      audioemoji: "<:Audiomack:928030855560060988>",
    });
  
    client.infos.ensure(message.guild.id, { songs: 0, commands: 0 });
    client.infos.ensure("global", { songs: 0, commands: 0 });
    let error = "<:xvector:869193619318382602>"
    let prefix = client.settings.get(message.guild.id, `prefix`);
    let color = client.settings.get(message.guild.id, `color`);
    let pointer = client.settings.get(message.guild.id, `pointer`);
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})`);
    if(!prefixRegex.test(message.content)) return;
    const [, mPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(mPrefix.length).trim().split(/ +/).filter(Boolean);
    const cmd = args.length > 0 ? args.shift().toLowerCase() : null;
    if(!cmd || cmd.length == 0){
        if(mPrefix.includes(client.user.id)){
            message.reply({
              embeds: [new MessageEmbed()
                .setColor(color)
                .setDescription(`
                ${pointer} My prefix in this server is \`${prefix}\`
                ${pointer} To see all  my commands please type \`${prefix}help\`
                `)
              ]})
        }
        return;
    }
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
      client.infos.set("global", Number(client.infos.get("global", "commands")) + 1, "commands");
      let botchannels = client.settings.get(message.guild.id, `botchannel`);
      if(!botchannels || !Array.isArray(botchannels)) botchannels = [];
        if (botchannels.length > 0) {
            if (!botchannels.includes(message.channel.id) && !message.member.permissions.has("ADMINISTRATOR")) {
               return message.reply({
                content: `**${emoji} This channel is not a bot channel.**`,
                embeds: [new MessageEmbed()
                .setColor("#ff0079")
                .setTitle(`COMMANDS NOT ALLOWED HERE`)
                .setDescription(`
                **${message.author.username}** You are not allowed to use this command here
                Please do it in one of this channels: ${botchannels.map(c=>`<#${c}>`).join(", ")}
                `)
                ]
               });
            }
        }
        if (onCoolDown(message, command)) {
        return message.reply(replacemsg(settings.messages.cooldown, { prefix: prefix, command: command, timeLeft: onCoolDown(message, command) }));
        }
        try {
          //if Command has specific permission return error
          if (command.memberpermissions && command.memberpermissions.length > 0 && !message.member.permissions.has(command.memberpermissions)) {
            return message.reply({ embeds: [new MessageEmbed()
                .setColor("#ff0079")
                .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
                .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.memberpermissions, {
                  command: command,
                  prefix: prefix
                }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e))})}, settings.timeout.notallowed_to_exec_cmd.memberpermissions)}).catch((e) => {console.log(String(e))});
          }
          //if Command has specific needed roles return error
          if (command.requiredroles && command.requiredroles.length > 0 && message.member.roles.cache.size > 0 && !message.member.roles.cache.some(r => command.requiredroles.includes(r.id))) {
            return message.reply({embeds: [new MessageEmbed()
              .setColor("#ff0079")
              .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
              .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.requiredroles, {
                command: command,
                prefix: prefix
              }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e))})}, settings.timeout.notallowed_to_exec_cmd.requiredroles)}).catch((e) => {console.log(String(e))});
            
          }
          //if Command has specific users return error
          if (command.alloweduserids && command.alloweduserids.length > 0 && !command.alloweduserids.includes(message.author.id)) {
            return message.reply({embeds: [new MessageEmbed()
              .setColor("#ff0079")
              .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
              .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.alloweduserids, {
                command: command,
                prefix: prefix
              }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e))})}, settings.timeout.notallowed_to_exec_cmd.alloweduserids)}).catch((e) => {console.log(String(e))});
          }
          //if command has minimum args, and user dont entered enough, return error
          if(command.minargs && command.minargs > 0 && args.length < command.minargs) {
            return message.reply({embeds: [new MessageEmbed()
              .setColor("#ff0079")
              .setTitle(`${error} WRONG COMMANDS USAGE!`)
              .setDescription(command.argsmissing_message && command.argsmissing_message.trim().length > 0 ? command.argsmissing_message : command.usage ? `Usage: ` + command.usage : `Wrong Command Usage`)]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.minargs)}).catch((e) => {console.log(String(e).grey)});
          }
          //if command has maximum args, and user enters too many, return error
          if(command.maxargs && command.maxargs > 0 && args.length > command.maxargs) {
            return message.reply({embeds: [new MessageEmbed()
              .setColor("#ff0079")
              .setTitle(`${error} WRONG COMMANDS USAGE!`)
              .setDescription(command.argstoomany_message && command.argstoomany_message.trim().length > 0 ? command.argstoomany_message : command.usage ? `Usage: ` + command.usage : `Wrong Command Usage`)]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e))})}, settings.timeout.maxargs)}).catch((e) => {console.log(String(e))});
          }
          
          //if command has minimum args (splitted with `++`), and user dont entered enough, return error
          if(command.minplusargs && command.minplusargs > 0 && args.join(` `).split(`++`).filter(Boolean).length < command.minplusargs) {
            return message.reply({embeds: [new MessageEmbed()
              .setColor("#ff0079")
              .setTitle(`${error} WRONG COMMANDS USAGE!`)
              .setDescription(command.argsmissing_message && command.argsmissing_message.trim().length > 0 ? command.argsmissing_message : command.usage ? `Usage: ` + command.usage : `Wrong Command Usage`)]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e))})}, settings.timeout.minplusargs)}).catch((e) => {console.log(String(e))});
          }
          //if command has maximum args (splitted with `++`), and user enters too many, return error
          if(command.maxplusargs && command.maxplusargs > 0 && args.join(` `).split(`++`).filter(Boolean).length > command.maxplusargs) {
            return message.reply({embeds: [new MessageEmbed()
              .setColor("#ff0079")
              .setTitle(`${error} WRONG COMMANDS USAGE!`)
              .setDescription(command.argstoomany_message && command.argstoomany_message.trim().length > 0 ? command.argsmissing_message : command.usage ? `Usage: ` + command.usage : `Wrong Command Usage`)]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e))})}, settings.timeout.maxplusargs)}).catch((e) => {console.log(String(e))});
          }
          //run the command with the parameters:  client, message, args, Cmduser, text, prefix,
          command.run(client, message, args, args.join(` `).split(`++`).filter(Boolean), message.member, args.join(` `), prefix);
        } catch (error) {
          if (settings.somethingwentwrong_cmd) {
            return message.reply({
              embeds: [new MessageEmbed()
                .setColor("#ff0079")
                .setTitle(replacemsg(settings.messages.somethingwentwrong_cmd.title, {
                  prefix: prefix,
                  command: command
                }))
                .setDescription(replacemsg(settings.messages.somethingwentwrong_cmd.description, {
                  error: error,
                  prefix: prefix,
                  command: command
                }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e))})}, 4000)}).catch((e) => {console.log(String(e))});
          }
        }
    }
   } catch (err) {
    console.log(err);
    message.lineReply("<:errorcode:868245243357712384>**|** Oops Something went wrong. Try Running the command again later");
   }
  }
function escapeRegex(str) {
    try{
      return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    }catch{
      return str
    }
}
