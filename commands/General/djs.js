const functions = require("../../utilities/music-function")
const config = require("../../config.json")
const Discord = require("discord.js");
module.exports = {
    name: "serverdj",
    aliases: ["dj"],
    category: "General",
    description: "Displays the server DJ Roles",
    usage: "serverdj",
    run: async (client, message, args) => {
        let boch = "";
        if (client.settings.get(message.guild.id, `botchannel`).join("") === "") boch = "Not Setup Yet"
        else for (let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++) {
        boch += "<#" + client.settings.get(message.guild.id, `botchannel`)[i] + "> | "
        }
        let djs = "";
        if (client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "There are no **DJ** roles in this server\nSo all my music commands are open to all"
        else
        for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
            djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
        }
        const SDJ = new Discord.MessageEmbed()
        .setColor(config.colors.playmode)
        .setTitle("<:musicblues:888396777202520124> SERVER DJ-ROLE ROLES!")
        .setDescription(`${djs}`)
        return message.channel.send(SDJ);
    }
}
