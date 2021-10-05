const Discord = require("discord.js");
const config = require("../../config");
const { MessageButton } = require('discord-buttons');

module.exports = {
 name: "fumigram",
 aliases: [],
 description: "Provide's a link and some information about the fumigram community",
 category: "General",
 usage: "fumigram",
 run: async (client, message, args) => {
  try {   
    const fumigram = new Discord.MessageEmbed()
    .setTitle("<:fumigram:885984580660772934> FUMIGRAM IMAGE SHARING COMMUNITY")
    .setDescription(`
    Fumigram has provided a place mainly for animation activities. we believe that anime fans deserve to have their very own social community and it would be able to help bring all of the fans out there closer. We have made a image sharing community which would be the start of this endeavor and with time more ideas will be implemented to make the world of animation more interesting for others. the **fumigram** community will be accepting **partnership** and team **members** to help grow and advance the world of anime throughout the internet world. to **pathner** up applicant much join the discord server and message the admin **Kotlin#0427**
    `)
    .setImage("https://media.discordapp.net/attachments/711910361133219903/885985719292686386/banner-bg.jpg?width=1089&height=612")
    .setColor("FF006F")
    .setFooter("Your home for Anime", "https://media.discordapp.net/attachments/735795382084173854/885995239423217674/icon.png")
    .setTimestamp();
    let about = new MessageButton().setStyle("url").setLabel("ABOUT US").setURL("https://about.fumigram.com")
    let discord = new MessageButton().setStyle("url").setLabel("DISCORD").setURL("https://discord.gg/p7k64z7CcA")
    let messageus = new MessageButton().setStyle("url").setLabel("MESSAGE US").setURL("https://web.fumigram.com/fumigram")
    let rabbit = new MessageButton().setStyle("url").setLabel("RABBIT").setURL("https://rabbit.fumigram.com")
    let terms = new MessageButton().setStyle("url").setLabel("TERMS").setURL("https://web.fumigram.com/terms-of-use")
    let policy = new MessageButton().setStyle("url").setLabel("POLICY").setURL("https://web.fumigram.com/privacy-and-policy")
    let facebook = new MessageButton().setStyle("url").setLabel("FACEBOOK").setURL("https://web.facebook.com/fumigram")
    let instagram = new MessageButton().setStyle("url").setLabel("INSTAGRAM").setURL("https://www.instagram.com/fumigramapp")

    var buttonarray = [about, discord, messageus, rabbit]  

    let Fmessage = await message.channel.send({ embed: fumigram, buttons: buttonarray });

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
