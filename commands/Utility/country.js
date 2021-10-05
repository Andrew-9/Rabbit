const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
 name: "country",
 aliases: [],
 description: "Gets a country info",
 category: "Utility",
 usage: "country <country name>",
 run: async (client, message, args) => {
  try {
   const country = args.slice().join(" ");
   if (!country) {
    return message.lineReply("<:xvector:869193619318382602> **| Please provide a country name!**");
   }
   const url = "https://restcountries.eu/rest/v2/name/" + country;
   let response;
   try {
    response = await fetch(url).then((res) => res.json());
   } catch (e) {
    return message.lineReply("<:xvector:869193619318382602> **| An error occured, please try again!**");
   }
   const data = response[0];
   if (!data) {
    return message.lineReply("<:xvector:869193619318382602> **| Please provide a country name!**");
   }
   const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(data.name + " Information")
    .setThumbnail(`https://www.countryflags.io/${data.alpha2Code}/flat/64.png`)
    .setTimestamp()
    .addField("🖊️ Native Name", `\`\`\`${data.nativeName}\`\`\``)
    .addField("🏛️ Capital", `\`\`\`${data.capital ? data.capital : "None"}\`\`\``)
    .addField("📍 Location", `\`\`\`${data.subregion ? data.subregion : data.region}\`\`\``)
    .addField("💱 Currency", `\`\`\`${data.currencies[0].code} ${data.currencies[0].symbol}\`\`\``)
    .addField("<:users:869698487577632778> Population", `\`\`\`${data.population.toLocaleString()}\`\`\``)
    .addField("🌐 Area", `\`\`\`${data.area.toLocaleString()}km\`\`\``)
    .addField("👅 Languages", `\`\`\`${data.languages.map((lang) => lang.name).join("/")}\`\`\``)
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.lineReply(embed);
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
