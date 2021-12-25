const Discord = require("discord.js");
const config = require("./config");
const MusicConfig = require("./config.json");
const client = new Discord.Client();
client.config = config;
const chalk = require("chalk");
const logs = require("discord-logs");
logs(client);
require("dotenv").config();
require("./utilities/inline_reply");
require("discord-buttons")(client);
const sql = require("./utilities/database");
const Enmap = require("enmap")
client.points = new Enmap({ name: "points" });
const leveling = require("./models/ranking");
leveling(client);
const apply = require("./models/apply");
apply(client);
const WelcomeAndLeave = require("./models/welcome&Leave");
WelcomeAndLeave(client);
const Interaction = require("./models/interaction");
Interaction(client);
const DisTube = require("distube");

/* = Enmap Database Registering = */
client.apply = new Enmap({ name: "apply", dataDir: "./data/apply" });
client.embed = new Enmap({ name: "embed", dataDir: "./data/embed" }); 
client.points = new Enmap({ name: "points", dataDir: "./data/points" }); 
client.settings = new Enmap({ name: "settings", dataDir: "./data/settings" });
client.infos = new Enmap({ name: "infos", dataDir: "./data/infos" });
client.custom = new Enmap({ name: "custom", dataDir: "./data/playlist" });
client.custom2 = new Enmap({ name: "custom", dataDir: "./data/playlist2" });
client.wdm = new Enmap({ name: "wdm", dataDir: "./data/wdm" }); 
client.wembed = new Enmap({ name: "wembed", dataDir: "./data/wembed" }); 
client.wdsystem = new Enmap({ name: "wdsystem", dataDir: "./data/wdsystem" }); 
/* = Enmap Database Ended = */

/* = Logging system = */
sql.query("CREATE TABLE IF NOT EXISTS `logs` (`guildId` VARCHAR(100) NOT NULL, `channelid` VARCHAR(32) NOT NULL, `enabled` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function(error, results, fields) {
    if (error) throw new Error(error);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `Logs`! Status: Success"));
});
/* = Ecomony Ward = */
sql.query("CREATE TABLE IF NOT EXISTS `economy_ward` (`guildId` VARCHAR(100) NOT NULL, `channelid` VARCHAR(32) NOT NULL, `enabled` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function(error, results, fields) {
    if (error) throw new Error(error);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `Economy ward`! Status: Success"));
});
/* = Create guild = */
sql.query("CREATE TABLE IF NOT EXISTS `guilds` (`guildId` VARCHAR(100) NOT NULL, `guild_prefix` VARCHAR(10) NOT NULL, `rules` VARCHAR(100) NOT NULL, `embed_channel` VARCHAR(100) NOT NULL, `embed_color` VARCHAR(100) NOT NULL, UNIQUE(`guildid`));", function(error) {
    if (error) throw new Error(error);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `Guilds`! Status: Success"));
});
/* = Welcome message = */
sql.query("CREATE TABLE IF NOT EXISTS `welcome` (`guildId` VARCHAR(100) NOT NULL, `channelid` VARCHAR(32) NOT NULL, `CustonChannelid` VARCHAR(32) NOT NULL, `message` VARCHAR(1000) NOT NULL, `enabled` VARCHAR(32) NOT NULL, `embedEnable` VARCHAR(32) NOT NULL, `CustomEnabled` VARCHAR(32) NOT NULL, `role` VARCHAR(100) NOT NULL, `background` VARCHAR(1500) NOT NULL, `border` VARCHAR(32) NOT NULL, `usernameBox` VARCHAR(32) NOT NULL, `discriminatorBox` VARCHAR(32) NOT NULL, `messageBox` VARCHAR(32) NOT NULL, `titleBox` VARCHAR(32) NOT NULL, `avatarBox` VARCHAR(32) NOT NULL, `embedColor` VARCHAR(32) NOT NULL, `DMWelcome` VARCHAR(100) NULL, `DMEmbed` VARCHAR(100) NOT NULL, `DMImage` VARCHAR(100) NOT NULL, `DMBackground` VARCHAR(1500) NULL, `w_embed_welcome` VARCHAR(100) NULL, `w_embed_thumb` VARCHAR(1500) NULL, `w_embed_Image` VARCHAR(1500) NULL, `w_embed_Image_on` VARCHAR(100) NULL, `w_embed_thumb_on` VARCHAR(100) NULL, UNIQUE(`guildid`));", function(error) {
    if (error) throw new Error(error);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `Welcome`! Status: Success"));
});
/* = Leave message = */
sql.query("CREATE TABLE IF NOT EXISTS `leave` (`guildId` VARCHAR(100) NOT NULL, `channelid` VARCHAR(32) NOT NULL, `CustonChannelid` VARCHAR(32) NOT NULL, `message` VARCHAR(1000) NOT NULL, `enabled` VARCHAR(32) NOT NULL, `embedEnable` VARCHAR(32) NOT NULL, `CustomEnabled` VARCHAR(32) NOT NULL, `background` VARCHAR(1500) NOT NULL, `border` VARCHAR(32) NOT NULL, `usernameBox` VARCHAR(32) NOT NULL, `discriminatorBox` VARCHAR(32) NOT NULL, `messageBox` VARCHAR(32) NOT NULL, `titleBox` VARCHAR(32) NOT NULL, `avatarBox` VARCHAR(32) NOT NULL, `embedColor` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function(error) {
    if (error) throw new Error(error);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `Leave`! Status: Success"));
});
/* = Boosters channel = */
sql.query("CREATE TABLE IF NOT EXISTS `boosters` (`guildId` VARCHAR(100) NOT NULL, `channelid` VARCHAR(32) NOT NULL, `enabled` VARCHAR(32) NOT NULL, UNIQUE(`guildid`));", function(error) {
    if (error) throw new Error(error);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `Boosters`! Status: Success"));
});
/* = Economy = */
sql.query("CREATE TABLE IF NOT EXISTS `economy` (`userId` VARCHAR(100) NOT NULL, `username` VARCHAR(100) NOT NULL, `bank` VARCHAR(100) NOT NULL, `balance` VARCHAR(100) NOT NULL, `sales_balance` VARCHAR(100) NOT NULL, `buyer` VARCHAR(100) NOT NULL, `shop_reward` VARCHAR(100) NOT NULL, `karma` VARCHAR(100) NOT NULL, `kpoints` VARCHAR(100) NOT NULL, `gold` VARCHAR(100) NOT NULL, `rewards` VARCHAR(100) NOT NULL, `HasShop` VARCHAR(100) NOT NULL, `shop_title` VARCHAR(100) NOT NULL, `shop_thumbnail` VARCHAR(100) NOT NULL, `shop_text` VARCHAR(100) NOT NULL, `shopowner_color` VARCHAR(100) NOT NULL, `backgroundimage` VARCHAR(3000) NOT NULL, `bal_color` VARCHAR(100) NOT NULL, `is_jailed` VARCHAR(100) NOT NULL, `fish` VARCHAR(100) NOT NULL, `fishtime` VARCHAR(100) NOT NULL, `crime` VARCHAR(100) NOT NULL, `crimetime` VARCHAR(100) NOT NULL, `work` VARCHAR(100) NOT NULL, `worktime` VARCHAR(100) NOT NULL, `daily` VARCHAR(100) NOT NULL, `loottime` VARCHAR(100) NOT NULL, `thanks` VARCHAR(100) NOT NULL, `weekly` VARCHAR(100) NOT NULL, `randomize` VARCHAR(100) NOT NULL, `slotstime` VARCHAR(100) NOT NULL, `roulette` VARCHAR(100) NOT NULL, `cardtype` VARCHAR(100) NOT NULL, `embed` VARCHAR(100) NOT NULL, `reward_daily` VARCHAR(100) NOT NULL, `reward_weelky` VARCHAR(100) NOT NULL, `claimrole` VARCHAR(100) NOT NULL, `play_cmd` VARCHAR(100) NOT NULL, `myplaylist_cmd` VARCHAR(100) NOT NULL, `jump_cmd` VARCHAR(100) NOT NULL, `grab_cmd` VARCHAR(100) NOT NULL, `seek_cmd` VARCHAR(100) NOT NULL, `skipnext_cmd` VARCHAR(100) NOT NULL, `search_cmd` VARCHAR(100) NOT NULL, `removetrack_cmd` VARCHAR(100) NOT NULL, `nowplaying` VARCHAR(100) NOT NULL, `clearqueue_cmd` VARCHAR(100) NOT NULL, `addrelated_cmd` VARCHAR(100) NOT NULL, `searchrelated_cmd` VARCHAR(100) NOT NULL, `radio` VARCHAR(100) NOT NULL, UNIQUE(`userId`));", function(error) {
    if (error) throw new Error(error);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `Economy`! Status: Success"));
});
/* = Shop = */
sql.query("CREATE TABLE IF NOT EXISTS `shop` (`product_id` INT(20) NOT NULL AUTO_INCREMENT, `userId` VARCHAR(100) NULL, `username` VARCHAR(100) NULL, `product_name` VARCHAR(100) NOT NULL, `product_price` VARCHAR(100) NOT NULL, `product_quantity` VARCHAR(300) NULL, `product_text` VARCHAR(300) NOT NULL, `product_emoji` VARCHAR(300) NOT NULL, `product_ratings` VARCHAR(100) NOT NULL, PRIMARY KEY(`product_id`));", function(error) {
    if (error) throw new Error(error);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `Warehouse`! Status: Success"));
});
/* = Warehouse = */
sql.query("CREATE TABLE IF NOT EXISTS `warehouse` (`product_id` INT(20) NOT NULL AUTO_INCREMENT, `userId` VARCHAR(100) NULL, `username` VARCHAR(100) NULL, `product_name` VARCHAR(100) NOT NULL, `product_price` VARCHAR(100) NOT NULL, `product_quantity` VARCHAR(300) NULL, `product_text` VARCHAR(300) NOT NULL, `product_emoji` VARCHAR(300) NOT NULL, `product_ratings` VARCHAR(100) NOT NULL, PRIMARY KEY(`product_id`));", function(error) {
    if (error) throw new Error(error);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `Warehouse`! Status: Success"));
});
/* = Global Market= */
sql.query("CREATE TABLE IF NOT EXISTS `global_market` (`product_id` INT(20) NOT NULL AUTO_INCREMENT, `userId` VARCHAR(100) NOT NULL, `product_author` VARCHAR(100) NOT NULL, `product_name` VARCHAR(100) NOT NULL, `product_price` VARCHAR(100) NOT NULL, `product_text` VARCHAR(300) NOT NULL, `product_emoji` VARCHAR(300) NOT NULL, `product_ratings` VARCHAR(100) NOT NULL, UNIQUE(`product_id`));", function(error) {
    if (error) throw new Error(error);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `Global Market`! Status: Success"));
});
/* = Ranking = */
sql.query("CREATE TABLE IF NOT EXISTS `ranking` (`guildId` VARCHAR(100) NOT NULL, `enabled` VARCHAR(100) NOT NULL, `embedEnable` VARCHAR(32) NOT NULL, `cardtype` VARCHAR(20) NOT NULL, `backgroundimage` VARCHAR(3000) NOT NULL, UNIQUE(`guildid`));", function(error) {
    if (error) throw new Error(error);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold(" Fetched table `Ranking`! Status: Success"));
});
/* Giveaways config */
sql.query("CREATE TABLE IF NOT EXISTS `giveaways` (`id` INT(1) NOT NULL AUTO_INCREMENT, `message_id` VARCHAR(64) NOT NULL, `data` LONGTEXT NOT NULL, PRIMARY KEY (`id`));", (err) => {
    if (err) throw new Error(err);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold("Fetched table `Giveaways`! Status: Success"));
});

/* Insert into database */ //This way we would prevent the bot from carshing everytime there's no entry in the database. Kinda Anoying Yeap
sql.query("SELECT guildId, guild_prefix, rules, embed_channel, embed_color FROM guilds WHERE `guildId` = 0;", function (err, result, fields){
  if(result == 0) {
    sql.query("INSERT INTO `guilds` (`guildId`, `guild_prefix`, `rules`, `embed_channel`, `embed_color`) VALUES ('0', '0', '0', '0', '0');", (err) => {
    if (err) throw new Error(err);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold("Fetched table `Inserts Guilds`! Status: Success"));
    });
  } else {
    return;
  }
});
sql.query("SELECT `guildId`, `enabled`, `embedEnable`, `cardtype`, `backgroundimage` FROM ranking WHERE `guildId` = 0;", function (err, result, fields){
    if(result == 0) {
    sql.query("INSERT INTO `ranking` (`guildId`, `enabled`, `embedEnable`, `cardtype`, `backgroundimage`) VALUES ('0', '0', '0', '0', '0');", (err) => {
    if (err) throw new Error(err);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold("Fetched table `Inserts Ranking`! Status: Success"));
    });
  } else {
    return;
  }
});
sql.query("SELECT `guildId`, `enabled`, `channelid` FROM logs WHERE `guildId` = 0;", function (err, result, fields){
    if(result == 0) {
    sql.query("INSERT INTO `logs` (`guildId`, `enabled`, `channelid`) VALUES ('0', '0', '0');", (err) => {
    if (err) throw new Error(err);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold("Fetched table `Inserts Logs`! Status: Success"));
    });
  } else {
    return;
  }
});
sql.query("SELECT `guildId`, `channelid`, `CustonChannelid`,  `enabled`, `CustomEnabled`, `role`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`, `DMWelcome`, `DMEmbed`, `DMImage`, `DMBackground` FROM welcome WHERE `guildId` = 0;", function (err, result, fields){
    if(result == 0) {
    sql.query("INSERT INTO `welcome` (`guildId`, `channelid`, `CustonChannelid`,  `enabled`, `CustomEnabled`, `role`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`, `DMWelcome`, `DMEmbed`, `DMImage`, `DMBackground`) VALUES ('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');", (err) => {
    if (err) throw new Error(err);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold("Fetched table `Inserts Welcome`! Status: Success"));
    });
  } else {
    return;
  }
});
sql.query("SELECT `guildId`, `channelid`, `CustonChannelid`, `message`,  `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor` FROM leave WHERE `guildId` = 0;", function (err, result, fields){
    if(result == 0) {
    sql.query("INSERT INTO `leave` (`guildId`, `channelid`, `CustonChannelid`, `message`,  `enabled`, `CustomEnabled`, `embedEnable`, `background`, `border`, `usernameBox`, `discriminatorBox`, `messageBox`, `titleBox`, `avatarBox`, `embedColor`) VALUES ('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');", (err) => {
    if (err) throw new Error(err);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold("Fetched table `Inserts Welcome`! Status: Success"));
    });
  } else {
    return;
  }
});

sql.query("SELECT `guildId`, `channelid`, `enabled` FROM economy_ward WHERE `guildId` = 0;", function (err, result, fields){
    if(result == 0) {
    sql.query("INSERT INTO `economy_ward` (`guildId`, `channelid`, `enabled`) VALUES ('0', '0', '0');", (err) => {
    if (err) throw new Error(err);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold("Fetched table `Inserts Economy Ward`! Status: Success"));
    });
  } else {
    return;
  }
});
sql.query("SELECT `guildId`, `channelid`, `enabled` FROM boosters WHERE `guildId` = 0;", function (err, result, fields){
    if(result == 0) {
    sql.query("INSERT INTO `boosters` (`guildId`, `channelid`, `enabled`) VALUES ('0', '0', '0');", (err) => {
    if (err) throw new Error(err);
    console.log(chalk.bold(chalk.blue.bold("[SQL]")) + chalk.cyan.bold("Fetched table `Inserts Boosters Ward`! Status: Success"));
    });
  } else {
    return;
  }
});
/////////////
const { GiveawaysManager } = require('discord-giveaways'); ///// Here we configure the giveaway manager to our liking
const Giveaways = class extends GiveawaysManager {
    async getAllGiveaways() {
        return new Promise((resolve, reject) => {
            sql.query("SELECT `data` FROM `giveaways`", (err, res) => {
                if (err) {
                    return reject(err);
                }
                const giveaways = res.map((row) => JSON.parse(row.data));
                resolve(giveaways);
            });
        });
    }
    async saveGiveaway(messageID, giveawayData) {
        return new Promise((resolve, reject) => {
            sql.query("INSERT INTO `giveaways` (`message_id`, `data`) VALUES (?,?)", [messageID, JSON.stringify(giveawayData)], (err, res) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
    async editGiveaway(messageID, giveawayData) {
        return new Promise((resolve, reject) => {
            sql.query("UPDATE `giveaways` SET `data` = ? WHERE `message_id` = ?", [JSON.stringify(giveawayData), messageID], (err, res) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
    async deleteGiveaway(messageID) {
        return new Promise((resolve, reject) => {
            sql.query("DELETE FROM `giveaways` WHERE `message_id` = ?", messageID, (err, res) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }
};

/* Distube Logging */
const https = require('https-proxy-agent');
const proxy = 'http://123.123.123.123:8080';
const agent = https(proxy);
client.distube = new DisTube(client, {
    youtubeCookie: MusicConfig.cookie,
    requestOptions: {
        agent
    },
    ytdlOptions: {
    highWaterMark: 1024 * 1024 * 64,
    quality: "highestaudio",
    format: "audioonly",
    liveBuffer: 60000,
    dlChunkSize: 1024 * 1024 * 64,
    },
    searchSongs: true,
    emitNewSongOnly: true,
    highWaterMark: 1024 * 1024 * 64,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    searchSongs: false,
    youtubeDL: true,
    updateYouTubeDL: true,
    savePreviousSongs: true,
    nsfw: false, //Set it to false if u want to disable nsfw songs
    customFilters: MusicConfig.customs
})

/* Login and Commands */
if (process.env.TOKEN) {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.slashCommands = new Discord.Collection();
    client.snipes = new Discord.Collection();
    client.queue = new Map();
    const manager = new Giveaways(client, {
    updateCountdownEvery: 10000,
    default: {
    botsCanWin: false,
    embedColor: "RANDOM",
    embedColorEnd: "RANDOM",
    reaction: config.reaction
    },
    });
    client.giveawaysManager = manager;
    client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => { ///We give users a heads up when someone joins their givwaway
        if (member.id !== client.user.id){
            try { 
            const dmMember = new Discord.MessageEmbed()
            .setTitle("<:checkvector:869193650184269834> GIVEAWAY ENTRY CONFIRMED")
            .setDescription(`
            <:happyrabbit:868230223961919548> **Add [Rabbit](https://discord.com/api/oauth2/authorize?client_id=734522699228905585&permissions=3690852087&scope=bot%20applications.commands) to your server**

            **Useful Links** - [Support server](${config.server}) | [Website](https://rabbit.fumigram.com) | [Fumigram](https://fumigram.com)
            `)
            .setColor("#ff7a1d")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
            member.send(dmMember);
            let con = sql.query("SELECT enabled FROM logs WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
            let isEnabled = result[0].enabled
            if(isEnabled == 0) { 
            return;
            } else if (isEnabled == 1) {
            const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + member.guild.id;
            sql.query(sqlquery, function (error, results, fields) {
            if (error) console.log(error);if (!results || results.length == 0) {return;}
            (async () => {
            const logsetup = await results[0].res;
            const log = await member.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
            if (!member.guild) return;
            if (!member.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
            if (!log) return;
            if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
            member.guild.fetchAuditLogs().then((logs) => {
            const newmember = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setDescription(`:inbox_tray: <@${member.user.id}> Entered the giveaway \n**#${giveaway.messageID}** (${reaction.emoji.name})`)
            .setColor("#00f0d2")
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(member.guild.name, member.guild.iconURL());
            log.send(newmember);
            });
           })();
          });
         }
        });
        } catch (err) {
        // console.log(err);
        }
        }
    });
    
    client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
        if (member.id !== client.user.id){
            try {  
            const dmMember = new Discord.MessageEmbed()
            .setTitle("<:checkvector:869193650184269834> GIVEAWAY ENTRY REMOVED")
            .setDescription(`
            Your entry for this **Giveaway** has been removed
            <:happyrabbit:868230223961919548> **Add [Rabbit](https://discord.com/api/oauth2/authorize?client_id=734522699228905585&permissions=3690852087&scope=bot%20applications.commands) to your server**

            **Useful Links** - [Support server](${config.server}) | [Website](https://rabbit.fumigram.com) | [Fumigram](https://fumigram.com)
            `)
            .setColor("#ff7a1d")
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL());
            member.send(dmMember);
            let con = sql.query("SELECT enabled FROM logs WHERE guildId = ?;", member.guild.id, function (err, result, fields) {
            let isEnabled = result[0].enabled
            if(isEnabled == 0) { 
            return;
            } else if (isEnabled == 1) {
            const sqlquery = "SELECT channelid AS res FROM logs WHERE guildid = " + member.guild.id;
            sql.query(sqlquery, function (error, results, fields) {
            if (error) console.log(error);if (!results || results.length == 0) {return;}
            (async () => {
            const logsetup = await results[0].res;
            const log = await member.guild.channels.cache.find((c) => c.id == logsetup && c.type == "text");
            if (!member.guild) return;
            if (!member.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
            if (!log) return;
            if (!log.guild.member(client.user).hasPermission("EMBED_LINKS", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "VIEW_AUDIT_LOG", "SEND_MESSAGES")) return;
            member.guild.fetchAuditLogs().then((logs) => {
            const newmember = new Discord.MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setDescription(`:outbox_tray: <@${member.user.id}> left the giveaway \n**#${giveaway.messageID}** (${reaction.emoji.name})`)
            .setColor("#f3007b")
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(member.guild.name, member.guild.iconURL());
            log.send(newmember);
            });
           })();
          });
         }
        });
        } catch (err) {
        // console.log(err);
        }
        }
    });
    
    require("events").EventEmitter.prototype._maxListeners = 70;
    require("events").defaultMaxListeners = 70;
    ["command", "slashCommands", "event"].forEach((handler) => {
        require(`./handlers/${handler}`)(client);
    });
    client.login(process.env.TOKEN);
} else {
    throw new Error("[RABBIT] Bot token is not provided! give your bot life by entering your bot token value in the .env file - TOKEN=Your_Bot_Token");
}
/* ---- */