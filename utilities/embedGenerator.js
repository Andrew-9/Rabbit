const Discord = require("discord.js");
const { color } = require("./colors.json");

/**
 * @description Embed generator file to hold all embeds, to reduce clutter elsewhere keeping cleaner code.
 */

class embGen {
  /**
   * @description Generates the embed objects for Moderation
   * @param {string} userName Name of the user.
   * @param {string} userImg User Avatar.
   * @param {string} user Empty User.
   * @param {string} message Message event in Discord.js.
   * @param {string} oldMessage old message in Discord.js when message is edited.
   * @param {string} newMessage new message event in Discord.js when message is edited.
   * @param {string} oldState old member voice state event - Not currently used here yet.
   * @param {string} newState new member voice state event.
   * @param {string} reason User Input for giving reasons for Invites and kicks/bans.
   * @param {string} dUrl url link to compliment the invite code given, to make it clickable.
   * @param {string} invite invite code for discord that is produced.
   * @param {string} ping checks the users ping to the bot.
   * @param {string} bot defines contender bot.
   * @param {string} offender defines the member who is being kicked.
   * @param {string} memCount grabs the current guilds member count.
   */

  // Member Joins
  generateMemJoin(bot, userName, userImg, code, tag) {
    const newMemLog = new Discord.MessageEmbed()
      .setColor(`${color.Pass}`)
      .setTitle("===   Member Joined   ===")
      .setDescription(`${userName} joined using **${code}** created by ${tag}.`)
      .addField(`**Welcome!**`, userName)
      .setThumbnail(userImg)
      .setTimestamp()
      .setFooter(`©️ ` + `${bot.user.tag} 2020`);
    return newMemLog;
  }

  // Define temp invite embed
  generatetempInvEmb(bot, user, message, reason, dUrl, invite) {
    const inviteMsg = new Discord.MessageEmbed()
      .setColor(color.Cool)
      .setTitle("===  Temporary invite created  ===")
      .addField("__Created for:__", `${user}`, true)
      .addField("__Channel:__", `${message.channel.name}`, true)
      .addField("__Invite Code:__", `${dUrl}${invite.code}`)
      .addField("__Valid for__", " 24hrs ", true)
      .addField("__Max Uses__", " 10 ", true)
      .addField("__Reason:__", `${reason}`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(`©️ ` + `${bot.user.tag} By Kotlin#0427`);
    return inviteMsg;
  }

  // Define Perm Invite embed
  generatepermInviteEmb(bot, user, message, reason, dUrl, invite) {
    const permInv = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("===  Permanent invite created  ===")
      .addField("__Created for:__", `${user}`, true)
      .addField("__Channel:__", `**\`${message.channel.name}\`**`, true)
      .addField("__Invite Code:__", `${dUrl}${invite.code}`)
      .addField("__Valid for__", " **Permanently** ")
      .addField("__Reason:__", `${reason}`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(`©️ ` + `${bot.user.tag} By Kotlin#0427`);
    return permInv;
  }

  // Define softban embed
  generatesoftBanEmb(bot, user, message, offender, reason) {
    const softBanMsg = new Discord.MessageEmbed()
      .setColor(color.Alert)
      .setTitle("===  Member SoftBan  ===")
      .addField("__Author:__", `${user}`, true)
      .addField("__Channel:__", `${message.channel.name}`, true)
      .addField("__Offender:__", `${offender} **has been soft-banned!**`)
      .addField("__Reason:__", ` \u200b${reason}`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(`©️ ` + `${bot.user.tag} By Kotlin#0427`);
    return softBanMsg;
  }
  
  // Warn User
  // Warn Member
  generateUserWarn(bot, user, message, offender, reason) {
    const warnMsg = new Discord.MessageEmbed()
      .setColor(color.Warning)
      .setTitle("===  Member Warning  ===")
      .addField("__Author:__", `${user}`, true)
      .addField("__Channel:__", `${message.channel.name}`, true)
      .addField("__Offender:__", `${offender} **has been Warned!**`)
      .addField("__Reason:__", ` \u200b${reason}`)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .setFooter(`©️ ` + `${bot.user.tag} By Kotlin#0427`);
    return warnMsg;
  }
}
module.exports = embGen;
