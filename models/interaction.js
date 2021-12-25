const Discord = require("discord.js");
const chalk = require("chalk");
const sql = require("../utilities/database");
const config = require("../config");
const moment = require("moment");
const os = require("os");
const fetch = require("node-fetch");
const axios = require("axios").default;
const osutils = require("os-utils");
require("moment-duration-format");
const { dependencies } = require("../package.json");
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const AmeClient = require("amethyste-api");
const AmeAPI = new AmeClient(process.env.AMEAPI);
const { MessageMenuOption, MessageMenu, MessageButton } = require("discord-buttons")
const StateManager = require("../utilities/state_manager");
const guildPrefix = new Map();

module.exports = function (client) {
    const description = {
        name: "Rabbit Interactions",
        filename: "interaction.js",
        version: "1.5"
    }
    
    client.ws.on("INTERACTION_CREATE", async (interaction, options) => {
        try {
            const prefix = guildPrefix.get(interaction.guild_id);
            if (interaction && interaction.type && interaction.type == 3) return;
            if (interaction && interaction.author && interaction.author.bot) return;
            if (!interaction || !interaction.data || !interaction.data.name) return;
            //get the command
            let cmd = interaction.data.name.toLowerCase();
            const args = interaction.data.options;
            //function for sending data
            let send = async (inter, responseData) => {
                try {
                    let data = { content: responseData };
                    if (typeof responseData === "object") data = await createApiMessage(inter, responseData)
                    if (!client.api.interactions(inter.id, inter.token) || !client.api.interactions(inter.id, inter.token).callback) return;
                    return client.api.interactions(inter.id, inter.token).callback.post({ data: { type: 4, data }
                    }).catch((e) => {
                        console.log(e)
                    });
                } catch (e) {
                    console.log(e)
                    return false;
                }
            }
            //function for sending embedded messages
            let createApiMessage = async (interaction, content) => {
            const { data, files } = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content).resolveData().resolveFiles()
            return { ...data, files };
            }
            //Respond with the right Command
            switch (cmd) {
                case "discord":
                    const Dserver = ["https://discord.com/invite/ghdvMDVFse", "https://discord.com/invite/BvSDcaYbhN", "https://discord.com/invite/p7k64z7CcA", "https://discord.com/invite/aGNYWUV", "https://discord.gg/axP7D9wbRZ", "https://discord.gg/mh2pTUTGu9", "https://discord.gg/animebase", "https://discord.gg/77eeQwnf3N", "https://discord.gg/ZnqEc6WaZF", " https://discord.gg/FVqbtGu", "https://discord.gg/gfbksraETj", "https://discord.gg/7MZCuWaG5q"];
                    randomserver = Dserver[Math.floor(Math.random() * Dserver.length)];
                    send(interaction, randomserver);
                    break;
                    case "support":
                    send(interaction, "https://discord.com/invite/ghdvMDVFse");
                    break;
                case "help":
                        let embed = new Discord.MessageEmbed()
                        .setAuthor("Slash Commands Overview", client.user.displayAvatarURL())
                        .setColor("#ff6900")
                        .setTimestamp()
                        .setThumbnail(client.user.displayAvatarURL())
                        .setDescription(`
                        > \`/ping\` - Show the Client Ping
                        > \`/dog\` - Shows a random dog Image
                        > \`/neko\` - Shows a random neko Image
                        > \`/echo\` - Echo your text in an embed
                        > \`/invite\` - Invite me to your server
                        > \`/waifu\` - Shows a random waifu Image
                        > \`/support\` - Shows our support server
                        > \`/wink\` - Shows a random winking Image
                        > \`/foxgirl\` - Shows a random foxgirl Image
                        > \`/help\` - Shows all available slash commands
                        > \`/wallpaper\` - Shows a random wallpaper Image
                        > \`/info\` - Shows informations of the about rabbit
                        > \`/discord\` - Shows random Discord servers to join
                        > \`/fumigram\` - Provide's some information about fumigram
                        > \`/balance\` - Shows your current balance with random images
                        > Type \`${prefix}help\` to see all \`prefix\` commands and their categories
                        `)
                        .setFooter(`${client.user.username} By Kotlin#0427`, config.Kotlin)
                    send(interaction, embed);
                    break;
                case "ping":
                    send(interaction, `:ping_pong: **PONG! Api Ping is: \`${client.ws.ping}ms\`**`);
                break;
                case "echo":
                const description = args.find(arg => arg.name.toLowerCase() == "content").value;
                const embedV = new Discord.MessageEmbed()
                .setDescription(description)
                .setColor("RANDOM")
                .setTitle(interaction.member.user.username.toUpperCase())
                send(interaction, embedV);
                break;
                case "invite":
                const invitee = new Discord.MessageEmbed()
                .setTitle(`RABBIT BOT`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor("#ff690e")
                .setDescription(`
                Invite me to your server using [Link](https://discord.com/oauth2/authorize?client_id=734522699228905585&permissions=8&scope=bot%20applications.commands)
                Website for some details about me [Info](https://rabbit.fumigram.com/)
                Vote for me using links [Void](https://voidbots.net/bot/734522699228905585/), [Bot List](https://discordbotlist.com/bots/rabbit-1895), [Boats](https://discord.boats/bot/734522699228905585), [Milrato Bots](https://botlist.milrato.eu/bot/734522699228905585)
                `)
                send(interaction, invitee);
                break;
                case "info":
                function capitalizeFirstLetter(string) {return string.charAt(0).toUpperCase() + string.slice(1);}
                const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
                let infoembed = new Discord.MessageEmbed()
                .setColor("#ff9900")
                .setAuthor(`GENERIC INFORMATION`, client.user.displayAvatarURL())
                .setDescription(`
                <:rabbitpoint:897844154258841620> **Prefix** - \`${prefix}\`
                <:rabbitpoint:897844154258841620> **Version** - \`${config.version}\`
                <:rabbitpoint:897844154258841620> **Count** - \`${client.guilds.cache.size}\` guilds
                <:rabbitpoint:897844154258841620> **Uptime** - \`${Math.round(client.ws.ping)}\` ms
                <:rabbitpoint:897844154258841620> **Node** - \`${process.version}\`
                <:rabbitpoint:897844154258841620> **Platform** - \`${capitalizeFirstLetter(osutils.platform())}\`
                <:rabbitpoint:897844154258841620> **Discord.js** - \`${dependencies["discord.js"].replace("^", "v")}\`
                <:rabbitpoint:897844154258841620> **Ping** - \`${duration}\`
                <:rabbitpoint:897844154258841620> **User Count** - \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\` members
                <:rabbitpoint:897844154258841620> **Channel Count** - \`${client.channels.cache.size}\` channels
                <:rabbitpoint:897844154258841620> **Rabbit Developer** - <@${config.ownerid}> | [[Website](${config.authorwebsite})\]
                <:rabbitpoint:897844154258841620> **CPU** - \`${(os.cpus()[0].model.substring(0, os.cpus()[0].model.indexOf("CPU")) || "Intel Xeon (" + osutils.cpuCount() + " cores)")}\`
                <:rabbitpoint:897844154258841620> **Total Memory** - \`${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}\` MB
                <:rabbitpoint:897844154258841620> **RAM Usage (VPS)** - \`${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split(" ")[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[1]}%)\`
                <:rabbitpoint:897844154258841620> **RAM Usage (BOT)** - \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1] + "MB " + `(${((100 * (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / osutils.totalmem().toString().split(".")[0]).toFixed(2)}%)`}\`
                <:rabbitpoint:897844154258841620> **Amount Of Song Played** - \`${client.infos.get("global", "songs")}\`
                <:rabbitpoint:897844154258841620> **Amount Of Filter Added** - \`${client.infos.get("global", "filters")}\`
                <:rabbitpoint:897844154258841620> **Useful Links** - [Support server](${config.server}) | [Website](https://rabbit.fumigram.com) | [Invite me](https://discord.com/oauth2/authorize?client_id=734522699228905585&permissions=158913785591&scope=bot%20applications.commands)
                `)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048})) 
                .setFooter("Rabbit by Kotlin#0427", config.Kotlin)
                .setTimestamp();
                send(interaction, infoembed);
                break;
                case "wallpaper":
                async function wallpaper() {
                const GIF = await neko.sfw.wallpaper();
                const walembed = new Discord.MessageEmbed()
                .setTitle(`TRY THIS WALLPAPER ${interaction.member.user.username.toUpperCase()}`)
                .setColor('#ff0282')
                .setImage(GIF.url)
                send(interaction, walembed);
                }
                wallpaper();
                break;
                case "neko":
                async function nekof() {
                const GIF = await neko.sfw.neko();
                const nekoembed = new Discord.MessageEmbed()
                .setTitle(`SEE THIS NEKO ${interaction.member.user.username.toUpperCase()}`)
                .setColor('#ff0282')
                .setImage(GIF.url)
                send(interaction, nekoembed);
                }
                nekof();
                break;
                case "foxgirl":
                async function foxgirl() {
                const GIF = await neko.sfw.foxGirl();
                const foxembed = new Discord.MessageEmbed()
                .setTitle(`OHOH SEE THIS FOXGIRL ${interaction.member.user.username.toUpperCase()}`)
                .setColor('#ff0282')
                .setImage(GIF.url)
                send(interaction, foxembed);
                }
                foxgirl();
                break;
                case "wink":
                const options = {
                method: "GET",
                url: "https://some-random-api.ml/animu/wink",
                };
                axios.request(options).then((response) => {
                const birdembed = new Discord.MessageEmbed()
                .setColor("#ff0282")
                .setImage(response.data.link);
                send(interaction, birdembed);
                });
                break;
                case "waifu":
                async function waifu() {
                const GIF = await neko.sfw.waifu();
                const foxembed = new Discord.MessageEmbed()
                .setTitle(`SEE THIS WAIFU ${interaction.member.user.username.toUpperCase()}`)
                .setColor('#ff0282')
                .setImage(GIF.url)
                send(interaction, foxembed);
                }
                waifu();
                break;
                case "balance":
                const theimg = ["https://res.feednews.com/assets/v2/206108bb7cbb02b6499cc3580a6a9cd4?width=1280&height=720&quality=hq&category=us_News_Entertainment", "https://media.comicbook.com/2017/03/richest-anime-characters-ciel-phantomhive-238691.png", "https://i.pinimg.com/originals/f5/76/67/f57667d2071ffa56e63772b2cbe91165.gif", "https://64.media.tumblr.com/483fc6ea279fb1338b7065c02373f06d/tumblr_peppw4FnkQ1wouno4o1_500.gifv", "https://media.comicbook.com/2018/12/anime-money-1149275.jpeg", "https://sakugabrasil.com/wp-content/uploads/2021/05/money.png", "https://i.ytimg.com/vi/JNWYtg8uxUg/maxresdefault.jpg", "https://i.ytimg.com/vi/JNWYtg8uxUg/maxresdefault.jpg", "https://i.redd.it/bmagu33oezs51.jpg", "https://i.ytimg.com/vi/_jv3QNflkYo/maxresdefault.jpg", "https://pics.me.me/o-your-money-yo-i-wanna-be-a-gang-star-42167376.png", "https://i.pinimg.com/564x/cc/46/61/cc4661543212b6871d5a02ab6e5300a8.jpg", "https://media.comicbook.com/2017/03/richest-anime-characters-nami-and-money-238692.png", "https://media.comicbook.com/2017/03/richest-anime-characters-nami-and-money-238692.png", "https://thumbs.gfycat.com/LameDopeyBullmastiff-size_restricted.gif", "https://64.media.tumblr.com/e7897724117872728d084c51add4d43e/8287d481e15e9a66-fa/s500x750/8dab36f0f2c8dacf2871dfbe9ef5870893d92aaf.gifv"];
                randomimage = theimg[Math.floor(Math.random() * theimg.length)];
                let b = sql.query("SELECT balance, bank, sales_balance, bal_color FROM economy WHERE userId = ?;", interaction.member.user.id, function (err, result, fields) {
                if (Object.keys(result).length === 0) {
                let register = "INSERT INTO economy (userId, balance, bank, sales_balance, username, cardtype) VALUES ('" + interaction.member.user.id + "', '0', '0', '0',' " + interaction.member.user.username + "', '1');";
                sql.query(register)
                let NoAccount = new Discord.MessageEmbed()
                .setColor('#e53637')
                .setThumbnail(randomimage)
                .setTitle(interaction.member.user.username.toUpperCase(), "NO ACCOUNT")
                .setDescription(`**${interaction.member.user.username}** you do not have an account.\nfortunately one has been opened for you`)
                send(interaction, NoAccount);
                } else {
                const Balimg = ["https://res.feednews.com/assets/v2/206108bb7cbb02b6499cc3580a6a9cd4?width=1280&height=720&quality=hq&category=us_News_Entertainment", "https://media.comicbook.com/2017/03/richest-anime-characters-ciel-phantomhive-238691.png", "https://i.pinimg.com/originals/f5/76/67/f57667d2071ffa56e63772b2cbe91165.gif", "https://64.media.tumblr.com/483fc6ea279fb1338b7065c02373f06d/tumblr_peppw4FnkQ1wouno4o1_500.gifv", "https://media.comicbook.com/2018/12/anime-money-1149275.jpeg", "https://sakugabrasil.com/wp-content/uploads/2021/05/money.png", "https://i.ytimg.com/vi/JNWYtg8uxUg/maxresdefault.jpg", "https://i.ytimg.com/vi/JNWYtg8uxUg/maxresdefault.jpg", "https://i.redd.it/bmagu33oezs51.jpg", "https://i.ytimg.com/vi/_jv3QNflkYo/maxresdefault.jpg", "https://pics.me.me/o-your-money-yo-i-wanna-be-a-gang-star-42167376.png", "https://i.pinimg.com/564x/cc/46/61/cc4661543212b6871d5a02ab6e5300a8.jpg", "https://media.comicbook.com/2017/03/richest-anime-characters-nami-and-money-238692.png", "https://media.comicbook.com/2017/03/richest-anime-characters-nami-and-money-238692.png", "https://thumbs.gfycat.com/LameDopeyBullmastiff-size_restricted.gif", "https://64.media.tumblr.com/e7897724117872728d084c51add4d43e/8287d481e15e9a66-fa/s500x750/8dab36f0f2c8dacf2871dfbe9ef5870893d92aaf.gifv"];
                randombalImg = Balimg[Math.floor(Math.random() * Balimg.length)];
                let Balance = result[0].balance;
                let BankBalance = result[0].bank;
                let SalesBalance = result[0].sales_balance;
                let AuthorColor = result[0].bal_color;
                let formattedBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(Balance);
                let formattedBankBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(BankBalance);
                let formattedSalesBalance = new Intl.NumberFormat("en-US", {style: 'currency', currency: 'USD'}).format(SalesBalance);
                let balEmbed = new Discord.MessageEmbed()
                .setColor(AuthorColor)
                .setThumbnail(randombalImg)
                .setAuthor(`${interaction.member.user.username.toUpperCase()}'S | BALANCE`)
                .addFields({name: '<:dollars:881559643820793917> Balance | ',value: formattedBalance, inline: true}, {name: '🏦 Bank | ',value: formattedBankBalance, inline: true}, {name: '💸 Sales Balance',value: formattedSalesBalance, inline: true})
                send(interaction, balEmbed);
                }
                })
                break;
                case "fumigram":
                const fumigram = new Discord.MessageEmbed()
                .setTitle("<:fumigram:885984580660772934> FUMIGRAM IMAGE SHARING COMMUNITY")
                .setDescription(`
                Fumigram has provided a place mainly for animation activities.
                We believe that anime fans deserve to have their very own social community
                And it would be able to help bring all of the fans out there closer.
                We have made a image sharing community which would be the start of this endeavor
                And with time more ideas will be implemented to make the world of animation more interesting for others.
                Read more on the [about us](https://about.fumigram.com) page
                Join the community [fumigram](https://web.fumigram.com/welcome)
                Facebook Page [fumigram](https://web.facebook.com/fumigram)
                Instagram Page [fumigram](https://www.instagram.com/fumigramapp)
                Discord Community [fumigram](https://discord.gg/p7k64z7CcA)
                `)
                .setImage("https://media.discordapp.net/attachments/711910361133219903/865526833004937216/youtube-lg.jpg")
                .setColor("FF006F")
                send(interaction, fumigram);
                break;
                case "cat":
                async function cat() {
                const response = await fetch("https://nekos.life/api/v2/img/meow");
                const body = await response.json();
                const catmbed = new Discord.MessageEmbed()
                .setTitle("• (Aww cute =＾´• ⋏ •`＾=)")
                .setColor('#ff0282')
                .setImage(body.url)
                send(interaction, catmbed);
                }
                cat();
                break;
                case "dog":
                async function dog() {
                const response = await fetch("https://nekos.life/api/v2/img/woof");
                const body = await response.json();
                const catmbed = new Discord.MessageEmbed()
                .setColor('#ff0282')
                .setImage(body.url)
                send(interaction, catmbed);
                }
                dog();
                break;
            }
        } catch (e) {
            console.log(e.stack ? e.stack : e)
        }
    })

console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(`Successfully Loaded: ${description.name}`));
}
StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});