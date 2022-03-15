const config = require(`../../botconfig/config.json`);
const settings = require(`../../botconfig/settings.json`);
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
      levelupcolor: "#F1434D",
      giveawaycolor: "#E62E52",
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
    let prefix = client.settings.get(message.guild.id, `prefix`);
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})`);
    if(!prefixRegex.test(message.content)) return;
    const [, mPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(mPrefix.length).trim().split(/ +/).filter(Boolean);
    const cmd = args.length > 0 ? args.shift().toLowerCase() : null;
    if(!cmd || cmd.length == 0){
        if(mPrefix.includes(client.user.id)){
            message.reply({
              embeds: [new MessageEmbed()
                .setColor("#2F3136")
                .setDescription(`
                > My prefix in this server is \`${prefix}\`
                > To see all  my commands please type \`${prefix}help\`
                `)
              ]})
        }
        return;
    }
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        client.infos.ensure("global", { songs: 0, commands: 0 });
        client.infos.set("global", Number(client.infos.get("global", "commands")) + 1, "commands");
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
