const Discord = require("discord.js");
const glob = require("glob");
const config = require("../../config");

module.exports = {
 name: "reload",
 aliases: ["reload-commands"],
 description: "Reload all the commands for new changes.\nNote: Only my developer can use this command.",
 category: "General",
 usage: "reload",
 run: async (client, message, args) => {
  try {
    if (message.member.id !== config.ownerid) {
        const Nopermission8 = new Discord.MessageEmbed()
        .setColor("#f04949")
        .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
        .setDescription(`**Oops sorry. (Only my owner can run this)**`)
        .setFooter("Requested by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
        .setTimestamp();
        return await message.channel.send(Nopermission8);
    }else {
        client.commands.sweep(() => true)
        glob(`${__dirname}/../**/*.js`, async(error, filePaths) =>{
            if(error) return console.log(err);
            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)];
                const pull = require(file);
                if(pull.name){
                    console.log(`Reloaded ${pull.name} (Command)`);
                    client.commands.set(pull.name, pull);
                }
                if(pull.aliases && Array.isArray(pull.aliases)){
                    pull.aliases.forEach((alias) => {
                        client.aliases.set(alias, pull.name)
                    });
                }
            })

        });
        const reloaded = new Discord.MessageEmbed()
        .setColor("#ff8100")
        .setTitle("CMD RELOADED!")
        .setDescription(`<:winkingface_01:869178842957381734> **Commands Reloaded Successfully!**`)
        .setFooter("Reloaded by " + `${message.author.username}`,message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048,}))
        .setTimestamp();
         message.channel.send(reloaded);
    }
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
