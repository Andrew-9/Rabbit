const Discord = require("discord.js");
module.exports = {
  name: "removedj",
  aliases: ["deletedj"],
  category: "Setup",
  description: "Let's you delete a DJ role from the server",
  usage: "removedj @role",
  run: async (client, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {

    let role = message.mentions.roles.first();
    if (!role) {
    const NoRole = new Discord.MessageEmbed()
    .setColor("#ff0081")
    .setTitle("<:xvector:869193619318382602> NOT A VALID ROLE!")
    .setDescription(`Please add a valid role via ping @role!`)
    return message.channel.send(NoRole);
    }
    try {
      message.guild.roles.cache.get(role.id)
    } catch {
    const NoRole = new Discord.MessageEmbed()
    .setColor("#ff0081")
    .setTitle("<:xvector:869193619318382602> ROLE NOT EXIST!")
    .setDescription(`That role does not exist in this Server`)
    return message.channel.send(NoRole);
    }
    if (!client.settings.get(message.guild.id, `djroles`).includes(role.id)) {
    const NoRole = new Discord.MessageEmbed()
    .setColor("#ff0081")
    .setTitle("<:xvector:869193619318382602> ROLE ALREADY EXIST!")
    .setDescription(`This role alerady a dj role!`)
    return message.channel.send(NoRole);
    }
    client.settings.remove(message.guild.id, role.id, `djroles`);
    let leftb = "";
    if (client.settings.get(message.guild.id, `djroles`).join("") === "") leftb = "No Dj Roles, ok then all users are Djs"
    else
      for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
        leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
      }
    const roleadd = new Discord.MessageEmbed()
    .setColor("#00ffef")
    .setTitle("<:checkvector:869193650184269834> DJ-ROLE REMOVED!")
    .setDescription(`Successfully deleted ${role} from this server dj roles\nleft dj roles: ${leftb}`)
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