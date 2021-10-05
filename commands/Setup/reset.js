const Discord = require("discord.js");
module.exports = {
  name: "reset",
  aliases: ["hardreset"],
  category: "Setup",
  description: "Resets and deletes all of the advance music settings",
  usage: "reset",
  run: async (client, message, args) => {
    if (message.member.guild.owner.id !== message.author.id)  {
      const Nopermission8 = new Discord.MessageEmbed()
      .setColor("#ff0081")
      .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
      .setDescription(`You don't have permission to use this command!\nOnly the server owner can do this`)
      return message.channel.send(Nopermission8);
    }
    else {
      let themsg = await message.lineReply("Are you sure you want to reset all settings?\nReply with: **`yes`** if you know you're sure.")
      const filter = m => m.author.id === message.author.id;
        themsg.channel.awaitMessages(filter, {
        max: 1,
        time: 600000,
        errors: ['time']
      })
      .then(collected => {
        let sosure = collected.first().content.toLowerCase();
        if (sosure.includes("yes")) {
          client.settings.delete(message.guild.id, "djroles");

          client.settings.delete(message.guild.id, "playingembed");

          client.settings.delete(message.guild.id, "playingchannel");

          client.settings.delete(message.guild.id, "botchannel");

          client.custom.delete(message.guild.id, "playlists");

          client.custom.ensure(message.guild.id, {
            playlists: [],
          });
          client.settings.ensure(message.guild.id, {
            djroles: [],
            playingembed: "",
            playingchannel: "",
            botchannel: [],
          });
          const roleadd = new Discord.MessageEmbed()
          .setColor("#00ffef")
          .setTitle("<:checkvector:869193650184269834> RESERT SUCCESS!")
          .setDescription(`Successfully reserted everything`)
          return message.channel.send(roleadd);
        } else if (sosure.includes("no")) {
          message.lineReply("<:checkvector:869193650184269834> | CANCELLED THE ACTION.")
        }
      }).catch(error => {
        message.lineReply("<:thinkingface:867897965380108288> | CANCELLED THE ACTION. OR TIME RAN OUT!")
      })
    }


  }
};
