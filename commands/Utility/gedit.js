const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
 name: "edit-giveaway",
 aliases: ["edit", "e-giveaway"],
 description: "Edit a Giveaway.\nYou can specify the price or time by using the following command.\nEg: `prefix edit-giveaway` price: 10$ from Rabbit\nOr winners: 5",
 category: "Utility",
 usage: "edit-giveaway <giveaway id> <price> or <winners>",
 run: async (client, message, args) => {
  try {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
    if(!args[0]){
    const noId = new Discord.MessageEmbed()
    .setColor("#fc217b")
    .setTitle("<:xvector:869193619318382602> ENTER AN ID!")
    .setDescription(`You have to specify a valid message ID`)
    return message.lineReply(noId);
    }
    if(!args[1]){
    const noWIN = new Discord.MessageEmbed()
    .setColor("#fc217b")
    .setTitle("<:xvector:869193619318382602> EDIT ONE OF THE ABOVE!")
    .setDescription(`You need to either edit the prize or the winners`)
    return message.lineReply(noWIN);
    }
    if(args[1] === 'prize'){
        let newPrize = args.slice(2).join(' ')
        if(!newPrize) {
        const noPri = new Discord.MessageEmbed()
        .setColor("#fc217b")
        .setTitle("<:xvector:869193619318382602> ENTER A PRICE!")
        .setDescription(`You have to provide a new prize`)
        return message.lineReply(noPri);
        }
        client.giveawaysManager.edit(args[0], {
        newPrize: newPrize,
        }).then(() => {
        const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
        const Gupdate = new Discord.MessageEmbed()
        .setColor("#fc217b")
        .setTitle("<:checkvector:869193650184269834> GIVEAWAY EDIT IN PROCESS!")
        .setDescription('The giveaway prize will be updated in less than **' + numberOfSecondsMax + '** seconds.')
        message.lineReply(Gupdate);
        }).catch((err) => {
        const NoGiveaway = new Discord.MessageEmbed()
        .setColor("#fc217b")
        .setTitle("<:xvector:869193619318382602> CAN'T FIND THE GIVEAWAY!")
        .setDescription(`No giveaway found for \`${args[0]}\`. \nPlease check you have the right message and try again.`)
        return message.lineReply(NoGiveaway);
        });
    }else
    if(args[1] === 'winners'){
        let newWinners = args[2]
        if(isNaN(newWinners) || (parseInt(newWinners) <= 0)){
        const noWIN = new Discord.MessageEmbed()
        .setColor("#fc217b")
        .setTitle("<:xvector:869193619318382602> ENTER A WINNER!")
        .setDescription(`You have to specify a valid number of winners`)
        return message.lineReply(noWIN);
        }
        client.giveawaysManager.edit(args[0], {
        newWinnerCount: newWinners,
        }).then(() => {
        const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
        const Gupdate = new Discord.MessageEmbed()
        .setColor("#fc217b")
        .setTitle("<:checkvector:869193650184269834> GIVEAWAY EDIT IN PROCESS!")
        .setDescription('The giveaway winner count will be updated in less than **' + numberOfSecondsMax + '** minutes.')
        message.lineReply(Gupdate);
        }).catch((err) => {
        const NoGiveaway = new Discord.MessageEmbed()
        .setColor("#fc217b")
        .setTitle("<:xvector:869193619318382602> CAN'T FIND THE GIVEAWAY!")
        .setDescription(`No giveaway found for \`${args[0]}\`. \nPlease check you have the right message and try again.`)
        return message.lineReply(NoGiveaway);
        });
    }else{
        const NoEdit = new Discord.MessageEmbed()
        .setColor("#fc217b")
        .setTitle("<:xvector:869193619318382602> EDIT ONE OF THE ABOVE!")
        .setDescription(`You need to either edit the prize or the winners`)
        return message.lineReply(NoEdit);
    }
  }
  else {
      const Nopermission8 = new Discord.MessageEmbed()
      .setColor("#f04949")
      .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
      .setDescription(`You don't have permission to use this command!`)
      return await message.channel.send(Nopermission8);
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