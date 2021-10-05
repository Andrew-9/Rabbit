const Discord = require("discord.js");

module.exports = {
  name: "adddj",
  aliases: ["adddjrole"],
  category: "Setup",
  description: "Let's you define a DJ ROLE. And you can have multiple roles as dj",
  usage: "adddj @role",

  run: async (client, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
    let role = message.mentions.roles.first();
    try {
    message.guild.roles.cache.get(role.id)
    } catch {
    const NoRole = new Discord.MessageEmbed()
    .setColor("#ff0081")
    .setTitle("<:xvector:869193619318382602> ROLE NOT EXIST!")
    .setDescription(`That role does not exist in this Server`)
    return message.channel.send(NoRole);
    }
    if (!role) {
    const NoRole = new Discord.MessageEmbed()
    .setColor("#ff0081")
    .setTitle("<:xvector:869193619318382602> NOT A VALID ROLE!")
    .setDescription(`Please add a valid role via ping @role!`)
    return message.channel.send(NoRole);
    } 
    if (client.settings.get(message.guild.id, `djroles`).includes(role.id)) {
    const NoRole = new Discord.MessageEmbed()
    .setColor("#ff0081")
    .setTitle("<:xvector:869193619318382602> ROLE ALREADY EXIST!")
    .setDescription(`This role alerady exist in the list!`)
    return message.channel.send(NoRole);
    }

    client.settings.push(message.guild.id, role.id, `djroles`);
    let leftb = "";
    if (client.settings.get(message.guild.id, `djroles`).join("") === "") leftb = "No Dj Roles, ok then all users are Djs"
    else
    for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
      leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
    }
    const roleadd = new Discord.MessageEmbed()
    .setColor("#00ffef")
    .setTitle("<:checkvector:869193650184269834> DJ-ROLE SUCCESS!")
    .setDescription(`Successfully set the DJ ROLE to ${role}\nAll **DJ** Roles: ${leftb}`)
    return message.channel.send(roleadd);

  } else {
    const Nopermission8 = new Discord.MessageEmbed()
    .setColor("#ff0081")
    .setTitle("<:xvector:869193619318382602> NO PERMISSION!")
    .setDescription(`You don't have permission to use this command!`)
    return message.channel.send(Nopermission8);
  }
  }
};