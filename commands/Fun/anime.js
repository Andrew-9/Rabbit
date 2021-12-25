const Discord = require("discord.js");
const malScraper = require("mal-scraper");

module.exports = {
 name: "anime",
 aliases: ["animesearch"],
 description: "Search anime list",
 category: "Fun",
 usage: "animesearch <name>",
 run: async (client, message, args) => {
 message.channel.startTyping();
  try {
   const search = `${args}`;
   malScraper
    .getInfoFromName(search)
    .then((data) => {
     const embed = new Discord.MessageEmbed()
      .setTitle(`MY ANIME LIST SEARCH RESULTS FOR ${args}`.split(",").join(" "))
      .setImage(data.picture)
      .setColor("RANDOM")
      .setDescription(`
      :flag_gb: ... **English Title** - ${data.englishTitle}
      :flag_jp: ... **Japanese Title** - ${data.japaneseTitle}
      :book: ... **Type** - ${data.type}
      :1234: ... **Episodes** - ${data.episodes}
      :star2: ... **Rating** - ${data.rating}
      :calendar_spiral: ... **Aired** - ${data.aired}
      :star: ... **Score** - ${data.score}
      :bar_chart: ... **Score Stats** - ${data.scoreStats}
      :link: ... **Link** - ${data.url}
      `)
      .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png",size: 2048 }))
      .setTimestamp();
      message.channel.stopTyping();
      message.lineReply(embed);
    })
    .catch((err) =>
     message.lineReply("<:xvector2:869193716575911966> Please enter a vaild name!")
    );
  } catch (err) {
    console.log(err);
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
