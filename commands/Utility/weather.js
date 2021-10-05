const Discord = require("discord.js");
const weather = require("weather-js");

module.exports = {
 name: "weather",
 aliases: [],
 description: "Checks a weather forecast",
 category: "Utility",
 usage: "weather <location>",
 run: async (client, message, args) => {
  try {
   if (!args[0]) {
    return message.lineReply("<:xvector:869193619318382602> **| Please specify a location**");
   }
   weather.find(
    {
     search: args.join(" "),
     degreeType: "C",
    },
    function (error, result) {
     if (error) {
      return message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
     }
     if (result === undefined || result.length === 0) {
      return message.lineReply("<:xvector:869193619318382602> **| Invaild location!**");
     }
     const current = result[0].current;
     const location = result[0].location;
     const weatherinfo = new Discord.MessageEmbed()
      .setTitle(
       `🌤️ Weather forecast for ${current.observationpoint}`,
       message.guild.iconURL({
        dynamic: true,
        format: "png",
       })
      )
      .setThumbnail(current.imageUrl)
      .setColor("RANDOM")
      .setDescription(`**${current.skytext}**`)
      .addField("🌡️ Temperature", `${current.temperature}°`)
      .addField("🥵 Feels like", `${current.feelslike}°`)
      .addField("🌪️ Wind", current.winddisplay, true)
      .addField("💦 Humidity", `${current.humidity}%`)
      .addField("📏 Degree Type", "Celsius")
      .addField("⏱️ Timezone", `UTC${location.timezone}`)
      .setTimestamp()
      .setFooter(
       "Requested by " + `${message.author.username}`,
       message.author.displayAvatarURL({
        dynamic: true,
        format: "png",
        size: 2048,
       })
      );
     message.lineReply(weatherinfo);
    }
   );
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
