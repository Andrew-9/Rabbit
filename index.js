const Discord = require("discord.js");
const config = require("./botconfig/config.json");
const settings = require(`./botconfig/settings.json`);
const client = new Discord.Client({
  shards: "auto",
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [ 
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ]
});

//npm install @distube/ytdl-core@latest

///// Requires
require("dotenv").config();
const Enmap = require("enmap");
const logs = require('discord-logs');
logs(client);
const DisTube = require("distube").default;
const filters = require(`./botconfig/filters.json`);
/* = Enmap Database Registering = */
client.ward = new Enmap({ name: "ward", dataDir: "./database/ward" });
client.infos = new Enmap({ name: "infos", dataDir: "./database/infos" });
client.global = new Enmap({ name: "global", dataDir: "./database/global" }); 
client.warning = new Enmap({ name: "warning", dataDir: "./database/warning" }); 
client.settings = new Enmap({ name: "settings", dataDir: "./database/settings" });
client.audiomack = new Enmap({ name: "audiomack", dataDir: "./database/audiomack" });
/* = Enmap Database Ended = */
client.config = config;
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
let spotifyoptions = {
  parallel: true,
  emitEventsAfterFetching: true,
}
if(config.spotify_api.enabled){
  spotifyoptions.api = {
    clientId: config.spotify_api.clientId,
    clientSecret: config.spotify_api.clientSecret,
  }
}

/* Distube Logging */
client.distube = new DisTube(client, {
  emitNewSongOnly: false,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  savePreviousSongs: true,
  emitAddSongWhenCreatingQueue: true,
  searchSongs: 0,
  youtubeCookie: config.youtubeCookie,     //Comment this line if you dont want to use a youtube Cookie 
  nsfw: false, //Set it to false if u want to disable nsfw songs
  emptyCooldown: 25,
  ytdlOptions: {
    highWaterMark: 1024 * 1024 * 64,
    quality: "highestaudio",
    format: "audioonly",
    liveBuffer: 60000,
    dlChunkSize: 1024 * 1024 * 4,
  },
  youtubeDL: true,
  updateYouTubeDL: true,
  customFilters: filters,
  plugins: [
    new SpotifyPlugin(spotifyoptions),
    new SoundCloudPlugin()
  ]
})

/* Login and Commands */
if (process.env.TOKEN) {
  client.commands = new Discord.Collection();
  client.cooldowns = new Discord.Collection();
  client.slashCommands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  client.categories = require("fs").readdirSync(`./commands`);  
  client.allEmojis = require("./botconfig/emojis.json");
  client.setMaxListeners(100); require('events').defaultMaxListeners = 100;
  ["command", "slashCommands", "distubeEvent", "event", settings.antiCrash ? "antiCrash" : null].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
  });
  client.login(process.env.TOKEN);
} else {
  throw new Error("[RABBIT] Bot token is not provided! enter your bot token in the .env file - TOKEN=Your_Bot_Token");
}
/* ---- */