const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
const Extra = require("discord-buttons");

module.exports = {
 name: "github",
 aliases: [],
 description: "Search for things in github",
 category: "Utility",
 usage: "github (search)",
 run: async (client, message, args) => {
  try {
   if (!args[0])
    return message.lineReply("<:xvector:869193619318382602> **| Please enter a Github username**");
   fetch(`https://api.github.com/users/${args.join("-")}`)
    .then((res) => res.json())
    .then((body) => {
     if (body.message)
      return message.lineReply("<:xvector:869193619318382602> **| 0 Users found, please provide vaild username**");
     let { login, avatar_url, name, id, html_url, company, public_repos, public_gists, twitter_username, email, followers, following, location, created_at, bio } = body;
     const button = new Extra.MessageButton()
      .setLabel("See profile")
      .setStyle("url")
      .setURL(html_url);
     const embed = new Discord.MessageEmbed()
      .setTitle(`🐙 ${login} Github`, avatar_url)
      .setColor(`RANDOM`)
      .setThumbnail(avatar_url)
      .addField(`<:users:869698487577632778> Username`, `\`\`\`${login}\`\`\``)
      .addField(`📝 Bio`, `\`\`\`${bio || "<:xvector:869193619318382602> Bio not provided"}\`\`\``)
      .addField(`📚 Public Repositories`, `\`\`\`${public_repos || "0"}\`\`\``, true)
      .addField(`📚 Public Gists`, `\`\`\`${public_gists || "0"}\`\`\``, true)
      .addField(`🖇️ Followers`, `\`\`\`${followers}\`\`\``, true)
      .addField(`📎 Following`, `\`\`\`${following}\`\`\``, true)
      .addField(`🐙 Github ID`, `\`\`\`${id}\`\`\``)
      .addField(`🌐 Location`, `\`\`\`${location || "<:xvector:869193619318382602> Unknown location"}\`\`\``)
      .addField(`📧 E-Mail`, `\`\`\`${email || "<:xvector:869193619318382602> No public email provided"}\`\`\``)
      .addField(`🐦 Twitter`, `\`\`\`${twitter_username || "None"}\`\`\``)
      .addField(`🚀 Company`, `\`\`\`${company || "<:xvector:869193619318382602> No company"}\`\`\``)
      .addField(`⏱️ Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
      .setFooter(
       "Requested by " + `${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      )
      .setTimestamp();
     message.lineReply({
      button: button,
      embed: embed,
     });
    });
  } catch (err) {
    const Anerror = new Discord.MessageEmbed()
    .setColor("#e63064")
    .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
    .setDescription(`\`\`\`${err}\`\`\``)
    .setFooter("Error in code: Report this error to kotlin0427")
    .setTimestamp();
    return message.lineReply(Anerror);
  }
 },
};
