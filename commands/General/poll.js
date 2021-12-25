const Discord = require("discord.js");

module.exports = {
    name: "poll",
    aliases: [""],
    description: "Creates a poll",
    category: "General",
    usage: "poll <question>",
    run: async (client, message, args) => {
     try {
        if (!args[0]){
        const NoQuestion = new Discord.MessageEmbed()
        .setColor("#ff4d4d")
        .setTitle("<:xvector:869193619318382602> NO QUESTION ADDED!")
        .setDescription(`You have to enter a question or message`)
        return message.lineReply(NoQuestion);
        }

        let msg = args.slice(0).join(' ');

        let embed = new Discord.MessageEmbed()
        .setColor("#00e7ff")
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setTimestamp()
        .setFooter(`Poll by: ${message.author.tag}`, message.member.user.displayAvatarURL({ dynamic: true }))
        .setDescription(msg);
        let pollmessage = await message.channel.send(embed);

        await message.delete();

        await pollmessage.react("✅");

        await pollmessage.react("❌");

        await pollmessage.react("🤔");

        await pollmessage.react("🙄");

        await pollmessage.react("🤣");

        await pollmessage.react("😅");


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