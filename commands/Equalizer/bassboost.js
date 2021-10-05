const functions = require("../../utilities/music-function")
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();
const config = require("../../config.json")
const Discord = require("discord.js");
const path = require("path");
module.exports = {
  name: path.parse(__filename).name,
  category: "Equalizer",
  usage: `<${path.parse(__filename).name}>`,
  description: "*Adds a Filter named " + path.parse(__filename).name,
  run: async (client, message, args) => {
    const prefix = guildPrefix.get(message.guild.id);
    if (functions.check_if_dj(message)) {
    const Nopermission8 = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NO DJ-ROLE ROLE!")
    .setDescription(`Opps you don't have permission for this command!\nYou need to have the ${functions.check_if_dj(message)} role`)
    return message.channel.send(Nopermission8);
    }

    if (!message.guild.me.voice.channel){
    const notPlaying = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOTHING PLAYING!")
    .setDescription(`There's currently nothing playing right now`)
    return message.channel.send(notPlaying);
    }

    if (!message.member.voice.channel) {
    const notInChannel = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOT IN A VOICE CHANNEL!")
    .setDescription(`You have to be in a voice channel to use this command!`)
    return message.channel.send(notInChannel);
    }

    if (message.member.voice.channel.id != message.guild.me.voice.channel.id) {
    const notInSameChannel = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOT IN SAME VOICE!")
    .setDescription(`You must be in the same voice channel as me - \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
    return message.channel.send(notInSameChannel);
    }
    //get queue
    let queue = client.distube.getQueue(message);

    if (!queue) {
    const notPlaying = new Discord.MessageEmbed()
    .setColor(config.colors.playmode)
    .setTitle("<:musicblues:888396777202520124> NOTHING IS PLAYING!")
    .setDescription(`There's currently nothing playing`)
    return message.channel.send(notPlaying);
    }
    let filter = message.content.slice(prefix.length).split(" ")[0];
    if (args[0]) {
      message.react("<:musicblues:888396777202520124>");
      let bassboostfilter = `bassboost${Math.floor(Number(args[0]))}`;
      switch (Math.floor(Number(args[0]))) {
        case 1:
          await client.distube.setFilter(message, bassboostfilter);
          const adding = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding);
          break;

        case 2:
          await client.distube.setFilter(message, bassboostfilter);
          const adding1 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding1);
          break;

        case 3:
          await client.distube.setFilter(message, bassboostfilter);
          const adding2 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding2);
          break;

        case 4:
          await client.distube.setFilter(message, bassboostfilter);
          const adding3 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding3);
          break;

        case 5:
          await client.distube.setFilter(message, bassboostfilter);
          const adding4 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding4);
          break;

        case 6:
          await client.distube.setFilter(message, bassboostfilter);
          const adding5 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding5);
          break;

        case 7:
          await client.distube.setFilter(message, bassboostfilter);
          const adding6 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding6);
          break;

        case 8:
          await client.distube.setFilter(message, bassboostfilter);
          const adding7 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding7);
          break;

        case 9:
          await client.distube.setFilter(message, bassboostfilter);
          const adding8 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding8);
          break;

        case 10:
          await client.distube.setFilter(message, bassboostfilter);
          const adding9 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding9);
          break;

        case 11:
          await client.distube.setFilter(message, bassboostfilter);
          const adding10 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding10);
          break;

        case 12:
          await client.distube.setFilter(message, bassboostfilter);
          const adding11 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding11);
          break;

        case 13:
          await client.distube.setFilter(message, bassboostfilter);
          const adding12 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding12);
          break;

        case 14:
          await client.distube.setFilter(message, bassboostfilter);
          const adding13 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding13);
          break;

        case 15:
          await client.distube.setFilter(message, bassboostfilter);
          const adding14 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding14);
          break;

        case 16:
          await client.distube.setFilter(message, bassboostfilter);
          const adding15 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding15);
          break;

        case 17:
          await client.distube.setFilter(message, bassboostfilter);
          const adding16 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding16);
          break;

        case 18:
          await client.distube.setFilter(message, bassboostfilter);
          const adding17 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding17);
          break;

        case 19:
          await client.distube.setFilter(message, bassboostfilter);
          const adding18 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding18);
          break;

        case 20:
          const adding19 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` hold on...`)
          await message.channel.send(adding19);
          await client.distube.setFilter(message, bassboostfilter);
          break;

        default:
          const adding20 = new Discord.MessageEmbed()
          .setColor(config.colors.playmode)
          .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
          .setDescription(`Bassboost with: \`${Math.floor(Number(args[0]))}db Gain\` dose not work...`)
          await message.channel.send(adding20);
          break;
      }
    } else if (message.content.slice(filter.length).split(" ")[0] === queue.filter) filter = "clear";
    else {
      filter = await client.distube.setFilter(message, filter);
      const addingit = new Discord.MessageEmbed()
      .setColor(config.colors.playmode)
      .setTitle("<:musicblues:888396777202520124> ADDING FILTER!")
      .setDescription(filter)
      await message.channel.send(addingit);
    }
  }
};
StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});