const { MessageEmbed } = require("discord.js");
const chalk = require("chalk");
const sql = require("../utilities/database");
const Discord = require("discord.js")

module.exports = function (client, options) {
    const description = {
        name: "apply",
        filename: "apply.js",
        version: "3.2"
    }   

    client.on("messageReactionAdd", async (reaction, user) => {
      const { message } = reaction;
      if(user.bot || !message.guild) return;
      if(message.partial) await message.fetch();
      if(reaction.partial) await reaction.fetch();
      client.apply.ensure(message.guild.id, {
        "channel_id": "",
        "f_channel_id": "",
        "QUESTIONS": [{"1":"DEFAULT MESSAGE"}],
        "TEMP_ROLE": "",   
        "accept": "Your application was accepted!",
        "deny": "Your application was denied!"
       })
      if(message.channel.id === client.apply.get(message.guild.id, "channel_id") && reaction.emoji.name === "✅"){
          reaction.users.remove(user);
          let guild = await message.guild.fetch();
          let channel_tosend = guild.channels.cache.get(client.apply.get(message.guild.id, "f_channel_id"));
          if(!channel_tosend) return console.log("RETURN FROM !CHANNEL_TOSEND");
          let answers = [];
          let counter = 0;
          let Questions = client.apply.get(message.guild.id, "QUESTIONS");
          let act = Object.values(Questions[counter]).join(" ")
          ask_question(act);
          function ask_question(qu){
              if(counter === Questions.length) return send_finished();
              user.send(new Discord.MessageEmbed()
              .setColor("#fcfc03")
              .setDescription(qu)
              .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))).then(msg => {
                msg.channel.awaitMessages(m=>m.author.id === user.id, {max: 1, time: 60000, errors: ["time"]}).then(collected => {
                answers.push(collected.first().content);
                counter++;
                if(counter === Questions.length) return send_finished();
                let act = Object.values(Questions[counter]).join(" ")
                ask_question(act);
                }).catch(error=>{
                console.log(error)
                return message.channel.send(`${user}, SORRY BUT YOUR TIME RAN OUT!`).then(msg=> msg.delete({timeout: 3000}))
                })
              }).catch(err => {
                reaction.message.channel.send(`${user}, SORRY! But I can't dm you :smile_cat:`).then(msg=> msg.delete({timeout: 3000}))
                const Anerror = new Discord.MessageEmbed()
                .setColor("#e63064")
                .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
                .setDescription(`\`\`\`${err}\`\`\``)
                .setFooter("Error in code: Report this error to kotlin0427")
                .setTimestamp();
                return message.channel.send(Anerror);
              
              });
          }
          async function send_finished(){
              let embed = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
              .setColor("#fcfc03")
              .setTitle("A new application from: " + user.tag)
              .setDescription(`*Applicant ${user} \nThe time they applied was ${new Date()}*`)
              .setFooter(user.id, user.displayAvatarURL({dynamic:true}))
              .setTimestamp()
              for(let i = 0; i < Questions.length; i++){
                  try{
                    embed.addField(("**"+Object.keys(Questions[i])+". |** " + Object.values(Questions[i]) + "").substr(0, 256), String(answers[i]).substr(0, 1024))
                  }catch{
                  }
              }
              channel_tosend.send(embed).then(msg => {
                  msg.react("✅");
                  msg.react("❌");
                  client.apply.set(msg.id, user.id, "temp")
              }).catch(err => {
                const Anerror = new Discord.MessageEmbed()
                .setColor("#e63064")
                .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
                .setDescription(`\`\`\`${err}\`\`\``)
                .setFooter("Error in code: Report this error to kotlin0427")
                .setTimestamp();
                return message.channel.send(Anerror);
              });
              try{
                  let roleid = client.apply.get(message.guild.id, "TEMP_ROLE");
                  let member = message.guild.members.cache.get(user.id);
                  let role = await message.guild.roles.cache.get(roleid)
                  member.roles.add(role.id)
              }catch (e){
                  console.log(e)
              }
              user.send(new Discord.MessageEmbed()
              .setColor("#fc7800")
              .setTitle("Thanks for applying in: " + message.guild.name + "")
              .setDescription(`Your application has been sent and will be carefully considered\nYou can reapply here if you made some mistake ${reaction.message.channel}`)
              .setTimestamp()
              .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
              ).catch(err => {
                const Anerror = new Discord.MessageEmbed()
                .setColor("#e63064")
                .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
                .setDescription(`\`\`\`${err}\`\`\``)
                .setFooter("Error in code: Report this error to kotlin0427")
                .setTimestamp();
                return message.channel.send("COULDN'T DM THIS PERSON!", Anerror);
              });
              }
             }
              if(message.channel.id === client.apply.get(message.guild.id, "f_channel_id") && (reaction.emoji.name === "✅" || reaction.emoji.name === "❌")){
              reaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));    
              const targetMessage = await message.channel.messages.fetch(message.id, false, true)
              if (!targetMessage) {
                return message.lineReply(new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("Couldn't get information about this Message!")
                .setFooter(message.guild.name, message.guild.iconURL({dynamic:true})));
              }
            //altes embed
            const oldEmbed = targetMessage.embeds[0];
            if(!oldEmbed) return message.lineReply("NOT A VALID EMBED")
            const embed = new Discord.MessageEmbed()
            .setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
            .setTitle(oldEmbed.title)
            .setDescription(`Edited by: ${user} | ${reaction.emoji}`)
            if(oldEmbed.fields[0]){
              try{
                for(let i = 0; i<= oldEmbed.fields.length; i++){
                  try{
                    if(oldEmbed.fields[i]) embed.addField(oldEmbed.fields[i].name, oldEmbed.fields[i].value)
                  }catch (error) {
                    const Anerror = new Discord.MessageEmbed()
                    .setColor("#e63064")
                    .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
                    .setDescription(`\`\`\`${error}\`\`\``)
                    .setFooter("Error in code: Report this error to kotlin0427")
                    .setTimestamp();
                    return message.channel.send(Anerror);
                  }
                }
              }catch (error) {
                const Anerror = new Discord.MessageEmbed()
                .setColor("#e63064")
                .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
                .setDescription(`\`\`\`${error}\`\`\``)
                .setFooter("Error in code: Report this error to kotlin0427")
                .setTimestamp();
                return message.channel.send(Anerror);
              }
            }
            if(oldEmbed.footer) embed.setFooter(oldEmbed.footer.text, oldEmbed.footer.iconURL)               
            if (reaction.emoji.name === "✅")  {
              embed.setColor("GREEN")
              targetMessage.edit(embed)
              let approve = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
              .setColor("GREEN")
              .setTitle("Application approved In: " + message.guild.name + "")
              .setFooter("Approved By  |  " + user.tag, user.displayAvatarURL({dynamic:true}))
              .setTimestamp()
              .setDescription(client.apply.get(message.guild.id, "accept"))
              let usert = await client.users.fetch(client.apply.get(message.id, "temp"))
              usert.send(approve).catch(err => {
                const Anerror = new Discord.MessageEmbed()
                .setColor("#e63064")
                .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
                .setDescription(`\`\`\`${err}\`\`\``)
                .setFooter("Error in code: Report this error to kotlin0427")
                .setTimestamp();
                return message.channel.send("COULDN'T DM THIS PERSON!", Anerror);
              });
            }
            if (reaction.emoji.name === "❌")  {
              embed.setColor("RED")
              targetMessage.edit(embed)
              let deny = new Discord.MessageEmbed().setFooter(message.guild.name, message.guild.iconURL({dynamic:true}))
              .setColor("#ff2f2f")
              .setTitle("Application denied in: " + message.guild.name + "")
              .setDescription(client.apply.get(message.guild.id, "deny"))
              .setFooter("Denied By  |  " + user.tag, user.displayAvatarURL({dynamic:true}))
              .setTimestamp()
              let usert = await client.users.fetch(client.apply.get(message.id, "temp"))
              usert.send(deny).catch(err => {
              const Anerror = new Discord.MessageEmbed()
              .setColor("#e63064")
              .setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
              .setDescription(`\`\`\`${err}\`\`\``)
              .setFooter("Error in code: Report this error to kotlin0427")
              .setTimestamp();
              return message.channel.send("COULDN'T DM THIS PERSON!", Anerror);
              });
            }
        
        targetMessage.edit(embed)
      }
  })
  console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(`Successfully Loaded: ${description.name}`));
}
