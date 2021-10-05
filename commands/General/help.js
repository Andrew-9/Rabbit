const Discord = require("discord.js");
const { readdirSync } = require("fs");
const config = require("../../config");
const { MessageButton } = require('discord-buttons');
const StateManager = require("../../utilities/state_manager");
const guildPrefix = new Map();

module.exports = {
 name: "help",
 aliases: ["h", "commands"],
 category: "General",
 description: "Displays all the commands available",
 timeout: "1000",
 usage: "help <command>",
 run: async (client, message, args) => {
  try {
    const prefix = guildPrefix.get(message.guild.id);
    if (!args[0]) {return getAll(client, message);}
    function getAll(client, message) {
    (async () => {
    let backtbutton = new MessageButton().setStyle("green").setID("Back").setLabel("⏪ Back")
    let homebutton = new MessageButton().setStyle("red").setID("Home").setLabel("🏡 Go Home")
    let forwardbutton = new MessageButton().setStyle("green").setID("Forward").setLabel("⏩ Forward")
    let linkbutton = new MessageButton().setStyle("url").setLabel("FUMIGRAM").setURL("https://fumigram.com")
    let EqualizerButton = new MessageButton().setStyle("blurple").setID("Equalizer").setLabel("🎼 Equalizer")
    //let AboutMeButton = new MessageButton().setStyle("blurple").setID("AboutMe").setLabel("🍻 Me")
    const commands = readdirSync("./commands/");
    var buttonarray = [backtbutton, forwardbutton, homebutton, linkbutton, EqualizerButton]

    let overviewembed = new Discord.MessageEmbed()
    .setAuthor("Command Category Overview", message.guild.iconURL())
    .setColor("#ff6900")
    .setTimestamp()
    .setThumbnail(config.avatarUrl)
    overviewembed.setDescription(`
    > :gear: ... **General** - Information Commands
    > :tools: ... **Moderation** - Light Moderation Feature
    > <:starbutton:868270158689488966> ... **Fun** - Fun and Memes Commands
    > <:musicblues:888396777202520124> ... **Music** - Advance music feature
    > <:economy:881557584467865620> ... **Economy** - Free Style Dolla Economy System
    > <:equalizer:888362090362990622> ... **Equalizer** - Advance Music Equalizer
    > <:images:877355588256923719> ... **Image** - 4th Gen Wild Image Generation
    > <:leveling:880516352987775016> ... **Leveling** - Advance leveling system with rewards
    > :underage: ... **NSFW** - Danger Zone 18+ NSFW Commands
    > <:Utility:880878481758621706> ... **Utility** - Creative Utility Tools
    > <:setup:887630377571737610> ... **Setup** - Advance Multiple Purpose Commands
    `)

    let General = new Discord.MessageEmbed()
    .setColor("#0086f0")
    .setTitle(":gear: GENERAL INFORMATION")
    .setThumbnail(config.general)
    .setDescription(`
    **1.** \`Vote\` - *Vote for rabbit*
    **2.** \`Ping\` - *Show client ping*
    **3.** \`Info\` - *Shows informations of the about the bot*
    **4.** \`Invite\` - *Invite me to your server*
    **5.** \`Serverdj\` - *Displays the server DJ Roles*
    **6.** \`Tempinvite\` - *Use the bot to create a temporary invite link*
    **7.** \`Perminvite\` - *Use the bot to create a permanent invite*
    **8.** \`Reload\` - *Reload all commands for new changes **[Owner Only]***
    **9.** \`Request\` - *Request for new features for rabbit*
    **10.** \`Eval\` - *Evaluates and runs JavaScript codes **[Owner Only]***
    **11.** \`Servers\` - *Displays total servers that the bot is in.*
    **12.** \`Shell\` - *Shows informations only developers would understand.*
    **13.** \`Uptime\` - *Display's the bot uptime*
    **14.** \`fumigram\` - *Provide's a link to the fumigram community*
    **15.** \`Suggest\` - *Suggest a feature for the bot development.*
    **16.** \`Poll\` - *Ask questions by creating a poll for your members*
    **17.** \`Help\` - *Displays this help information*
    **18.** \`Serverinfo\` - *Display's the information of a server*
    **19.** \`Userinfo\` - *Get the information about a user*
    **20.** \`Members\` - *How many members are in the current server*
    `)

    let Moderation = new Discord.MessageEmbed()
    .setColor("#54d800")
    .setThumbnail(config.moderation)
    .setTitle(":tools: LIGHT MODERATION")
    .setDescription(`
    **1.** \`Ban\` - *Ban a member from the server*
    **2.** \`Kick\` - *Kicks a member from guild*
    **3.** \`ID\` - *Display a mentioned user ID*
    **4.** \`Say\` - *Send a message using the bot*
    **5.** \`Embed\` - *Send a custom built embed*
    **6.** \`Prune\` - *Removes up to 100 messages*
    **7.** \`Warn\` - *Send a warning to any user that tries shit*
    **8.** \`Unbans\` - *Unbans a member into the server*
    **9.** \`Softban\` - *Softban a member from the Guild*
    **10.** \`Setprefix\` - *Set a custom prefix for your server*
    `)

    let Fun = new Discord.MessageEmbed()
    .setColor("#df15ff")
    .setThumbnail(config.fun)
    .setTitle("<:starbutton:868270158689488966> FUN AND MEMES")
    .setDescription(`
    **1.** \`Sneeze\` - *Achoo*
    **2.** \`poke\` - *Poke anyone*
    **3.** \`Slap\` - *Slap a user*
    **4.** \`Dice\` - *Roll a dice*
    **5.** \`Ship\` - *Ship members*
    **6.** \`Kill\` - *Murders a user*
    **7.** \`Rate\` - *Rate Something*
    **8.** \`IQ\` - *Display a user IQ*
    **9.** \`Tickle\` - *Tickle a user*
    **10.** \`Chat\` - *Chat with bot AI*
    **11.** \`Pepe\` - *Show user PP size*
    **12.** \`Fliptext\` - *Flip some text*
    **13.** \`Meme\` - *Sends a random meme*
    **14.** \`Advice\` - *Get a random advice*
    **15.** \`Hack\` - *Hack a user real quick*
    **16.** \`Flipcoin\` - *Flip a virtual coin*
    **17.** \`Joke\` - *Display a random dad joke*
    **18.** \`Hug\` - *Give a hug to mention user*
    **19.** \`Ascii\` - *Convert text to asci format*
    **20.** \`Beep\` - *Beep-Boop! Beep-Boop! Beep-Boop!*
    **21.** \`Anime\` - *Search the name of any anime list*
    **22.** \`Kiss\` - *Kiss Kiss <3 | Nina... I love you*
    **23.** \`Cuddle\` - *Give a cuddle to mentioned user*
    **24.** \`Eightball\` - *Rabbit wll tell you a fortune*
    **25.** \`Baka\` - *You're a BAKA! or something like that*
    **26.** \`Tictactoe\` - *Play Tic Tac Toe against someone*
    **27.** \`Animal-fact\` - *Shows a random fact about animal*
    **28.** \`Cat-emoji\` - *Every Cat is cute. Don't you think?*
    **29.** \`Bot-token\` - *Generate **(fake)** random Discord Bot token*
    **30.** \`Flatearth\` - *Demonstrates that the earth really is flat*
    **31.** \`4chan\` - *Shows a random image from the selected 4chan board*
    `)

    let Music = new Discord.MessageEmbed()
    .setColor(config.musicmode)
    .setThumbnail(config.music)
    .setTitle("<:musicblues:888396777202520124> ADVANCE MUSIC FEATURE")
    .setDescription(`
    **1.** \`Play\` - *Play any music*
    **2.** \`Skip\` - *Skips current song*
    **3.** \`Volume\` - *Control the sound volume*
    **4.** \`Replay\` - *Replays the current song*
    **5.** \`Shuffle\` - *Shuffles the whole queue*
    **6.** \`Grab\` - *Saves current song in your DM*
    **7.** \`Seek\` - *Moves in the song by seconds*
    **8.** \`Resume\` - *Resume already paused track*
    **9.** \`Clearqueue\` - *Clears the server queue*
    **10.** \`Stop\` - *Stop the current playing music*
    **11.** \`Skip\` - *Skip the current playing music*
    **12.** \`Nowplaying\` - *Display now playing song*
    **13.** \`loop\` - *Enables loop for a song or queue*
    **14.** \`Pause\` - *Pause the current playing music*
    **15.** \`Jump\` - *Jump to a song in the music queue*
    **16.** \`Radio\` - *Play one of the 200 Radio Station*
    **17.** \`Rewind\` - *Rewinds the song back by seconds*
    **18.** \`Queue\` - *Displays musics in the server queue*
    **19.** \`Forward\` - *Forwards the song by duration seconds*
    **20.** \`Botplaylist\` - *Play some of the premade playlists*
    **21.** \`Autoplay\` - *Enable autoplay - random similar songs*
    **22.** \`Search\` - *Search and select music or videos to play*
    **23.** \`Skipnext\` - *Play new song and skip the current song*
    **24.** \`Addrelated\` - *Add a similar song of the current track*
    **25.** \`Myplaylist\` - *Creates a personal playlist for yourself*
    **26.** \`Removetrack\` - *Removes a specific track from the queue*
    **27.** \`Serverplaylist\` - *Add a custom playlist for your server*
    **28.** \`Sleeptimer\` - *Sets a sleep timer which will stop the bot*
    **29.** \`Status\` - *Shows queue status and the current playing song*
    **30.** \`Searchrelated\` - *Search similar songs of the current track*
    **31.** \`Myplaylistsongs\` - *Displays urls of each songs in your playlist*
    You can play music from **Youtube,** and **Spotify.**
    Do report any bugs you find. that would be really **appreciated**.
    `)

    let Economy = new Discord.MessageEmbed()
    .setColor("#F2B926")
    .setThumbnail(config.economy)
    .setTitle("<:economy:881557584467865620> DOLLA ECONOMY SYSTEM")
    .setDescription(`
    **1.** \`Slots\` - *Draw a slots with **100$***
    **2.** \`Balance\` - *Shows Current Balance*
    **3.** \`Give\` - *Give moeny to your friends*
    **4.** \`Bail\` - *Bail yourself out of jail*
    **5.** \`Sell\` - *Sell out items in your shop*
    **6.** \`Loot\` - *Look for money if you're broke*
    **7.** \`Fish\` - *Catch a fish from a vast ocean*
    **8.** \`Crime\` - *Comit a crime to earn money*
    **9.** \`Thanks\` - *Offer up your thanks to **rabbit*** 
    **10.** \`Work\` - *Work for moeny and earn rewards*
    **11.** \`Weekly\` - *Get your weekly reward from **rabbit*** 
    **12.** \`Shop\` - *Personal shop for all your items*
    **13.** \`Daily\` - *Get daily rewards from **rabbit***
    **14.** \`Roulette\` - *Bet a color to win or lose. depends*
    **15.** \`Deposit\` - *Deposit money into your bank account* 
    **16.** \`Profile\` - *Shows your profile/other users Profile*
    **17.** \`Withdraw\` - *Withdraw moeny from your bank account*   
    **18.** \`Admingive\` - *Give moeny to people as an administrator*
    **19.** \`Admintake\` - *Take money from others as an administrator*
    **20.** \`Buyproducts\` - *Buy products from global the market*
    **21.** \`Addproducts\` - *Add products to the global market list*
    **22.** \`Random\` - *Do random things to ramdomize your earnings*
    **23.** \`Globalmarket\` - *Global Market where all products are listed*
    **24.** \`Getshop\` - *Open a shop to start selling products anytime*
    **25.** \`Set-color\` - *Set a color for the your economical embed details*
    **26.** \`Shopsettings\` - *Change settings of a user shop and even close it*
    **27.** \`Billboard\` - *See the list of richest members on the billboard*
    **28.** \`withdrawsales\` - *Withdraw cash from sales account to balance*
    **29.** \`Rockpaperscissors\` - *Play rock paper scissors against **Rabbit***
    **NOTE:** you'll have to setup an **Economical ward** system to use this command. you can set it up with \`${prefix}setup -> economical ward\`
    `)

    let Image = new Discord.MessageEmbed()
    .setColor("#ff0070")
    .setThumbnail(config.Eimages)
    .setTitle("<:images:877355588256923719> 4TH GEN IMAGE GENERATION")
    .setDescription(`
    **1.** \`3000years\` - *3000 Years later*
    **2.** \`Affect\` - *No, it doesn't affect my baby*
    **3.** \`Approved\` - *Approve the users avatar*
    **4.** \`Beautiful\` - *Oh this? This is beautiful!*
    **5.** \`Bird\` - *Sends a random bird image*
    **6.** \`Blur\` - *Blur the user avatar*
    **7.** \`Cat\` - *Sends a random cat photo*
    **8.** \`Changemymind\` - *Try to change my mind!*
    **9.** \`Circle\` - *Creates circular image*
    **10.** \`Contrast\` - *Add contrast effect to user avatar*
    **11.** \`Distort\` - *Add distort effect to user avatar*
    **12.** \`Dog\` - *Sends a random dog photo*
    **13.** \`Facepalm\` - *Creates facepalm image*
    **14.** \`Fire\` - *Burns the users avatar*
    **15.** \`Fox\` - *Sends a random fox image*
    **16.** \`Foxgirl\` - *Random Foxgirl Images!*
    **17.** \`Frame\` - *Place user avatar in a frame*
    **18.** \`Gay\` - *Rainbow ( ͡° ͜ʖ ͡°)*
    **19.** \`Glass\` - *Returns a glass image*
    **20.** \`Glitch\` - *Add glitch effect to user avatar*
    **21.** \`Heaven\` - *Returns a heaven image*
    **22.** \`Hitler\` - *Worse than hitler*
    **23.** \`Holo\` - *Random Holo Images!*
    **24.** \`Invert\` - *Invert image colors*
    **25.** \`Jail\` - *Sends user to jail*
    **26.** \`jokeoverhead\` - *Whoosh!*
    **27.** \`Kiss\` - *Random Kiss Images!*
    **28.** \`Koala\` - *Sends a random koala image*
    **29.** \`Magik\` - *Add a dash of magik to the user avatar*
    **30.** \`Moustache\` - *Add moustache to user avatar*
    **31.** \`Neko\` - *Random Neko Images!*
    **32.** \`Ohno\` - *Oh no! It's stupid!*
    **33.** \`Panda\` - *Sends a random panda image*
    **34.** \`Pat\` - *Sends a random pat image*
    **35.** \`Pikachu\` - *Sends a random pikachu image*
    **36.** \`Pixelize\` - *Pixelize the user avatar*
    **37.** \`Posterize\` - *Posterize the user avatar*
    **38.** \`Red-panda\` - *Sends a random red panda image"*
    **39.** \`Reject\` - *Reject the users avatar*
    **40.** \`Rip\` - *F in the chat*
    **41.** \`Sad\` - *Returns a sad image*
    **42.** \`Scary\` - *Booo that's a bit scary*
    **43.** \`Sepia\` - *Add sepia effect to user avatar*
    **44.** \`Shit\` - *Oh Shit!*
    **45.** \`Tickle\` - *Random tickle Images!*
    **46.** \`Trigerred\` - *Returns a triggered image*
    **47.** \`Trash\` - *Is this trash?*
    **48.** \`Utatoo\` - *Hmmm*
    **49.** \`Waifu\` - *Random waifu Images!*
    **50.** \`Wallpaper\` - *Random Wallpaper Images!*
    **51.** \`Wanted\` - *Creates wanted card*
    **52.** \`Wasted\` - *Returns a wasted image*
    **53.** \`Wink\` - *Sends a random winking image*
    `)

    let Leveling = new Discord.MessageEmbed()
    .setColor("#FF4404")
    .setThumbnail(config.leveling)
    .setTitle("<:leveling:880516352987775016> ADVANCE LEVELING SYSTEM")
    .setDescription(`
    **1.** \`Addlevel\` - *Add any specific amount of levels to users*
    **2.** \`Addpoints\` - *Give points to your members for free*
    **3.** \`Addrandomall\` - *Add a random amount of Points to everyone*
    **4.** \`leaderboard\` - *Displays the highest ranking members*
    **5.** \`Rank\` - *Check your current ranking and other members ranking*
    **6.** \`Registerall\` - *Register your server members to ranking database*
    **7.** \`Removelevel\` - *Remove a specific amount of **level** from a user* 
    **8.** \`Removepoints\` - *Remove a specific amount of **points** from any user*   
    **9.** \`Resetranking\` - *Resets the ranking of a user back to zero*
    **10.** \`Resetrankingall\` - *Reset the ranking of everyone in this server*
    **11.** \`Setglobalxpcounter\` - *Sets the global **xp** to count for all members*
    **12.** \`Setlevel\` - *Give a specific amount of levels to any user*
    **13.** \`Setpoints\` - *Sets a specific amount of **points** to any user*
    **14.** \`Setxpcounter\` - *Sets a specific amount of **xp** to count for a user*
    **INFO:** Some commands requires the \`MANAGE_MESSAGES\` permission.
    **NOTE:** You'll have to enable the **ranking system** for the guild to use this command. you can enable it with \`${prefix}setup -> ranking system\`
    `)

    let Utility = new Discord.MessageEmbed()
    .setColor("#CCF5FF")
    .setThumbnail(config.utility)
    .setTitle("<:Utility:880878481758621706> CREATIVE UTILITY TOOLS")
    .setDescription(`
    **1.** \`Avatar\` - *Get a user avatar*
    **2.** \`Base64-decode\` - *Decode Base64 text to normal*
    **3.** \`Base64\` - *Encode text to Base64 format*
    **4.** \`Calculator\` - *Calculator*
    **5.** \`Color\` - *Shows color information*
    **6.** \`Country\` - *Gets a country information*
    **7.** \`Djs\` - *Look at the discord.js docs*
    **8.** \`Emojify\` - *Convert text to emojis*
    **9.** \`Emojiinfo\` - *See Information about an emoji*
    **10.** \`Delete-giveaway\` - *Delete a giveaway*
    **11.** \`Start\` - *Start giveaways quickly in your server*
    **12.** \`Edit-giveaway\` - *Edit a currently running Giveaway.*
    **13.** \`End-giveaway\` - *Ends any current running giveaways*
    **14.** \`Fetch-giveaway\` - *Fetch server's current running giveaways*
    **15.** \`Github\` - *Search for things in github*
    **16.** \`Giveaway\` - *create a giveway for your members*
    **17.** \`Reroll-giveaway\` - *Restart an already ended giveaway*
    **18.** \`Guild-avatar\` - *Get the avatar of a guild*
    **19.** \`Shortener\` - *Shorter a url real quick for you*
    **20.** \`Snipe\` - *Snipe a deleted message*
    **21.** \`Weather\` - *Checks a weather forecast*
    `)

    let NSFW = new Discord.MessageEmbed()
    .setColor("#BD1A41")
    .setThumbnail(config.nsfw)
    .setTitle(":underage: 18+ NSFW COMMANDS")
    .setDescription(`
    **1.** \`Anal\` - *Display a random anal image/gif*
    **2.** \`Ass\` - *Display a random ass image/gif*
    **3.** \`Blowjob\` - *Display a random blowjob image/gif*
    **4.** \`Boobs\` - *Display a random boobs image/gif*
    **5.** \`Classic\` - *Display a random classic porn image/gif*
    **6.** \`Cum\` - *Display a random cum image/gif*
    **7.** \`Cumsluts\` - *Random Cumsluts Bitc** Images/Gif!*
    **8.** \`Ero\` - *Display a random ero image/gif*
    **9.** \`Erofeet\` - *Display a random ero feet image/gif*
    **10.** \`Eroneko\` - *Display a random ero neko image/gif*
    **11.** \`Eroyuri\` - *Display a random ero yuri image/gif*
    **12.** \`feet\` - *Display a random feet image/gif*
    **13.** \`Femdom\` - *Display a random femdom image/gif*
    **14.** \`Foxgirl\` - *Display a random foxgirl image/gif*
    **15.** \`Furry\` - *Search internet for your furry!r*
    **16.** \`Futa\` - *Display a random futa image/gif*
    **17.** \`Hentai\` - *Display a random hentai gif*
    **18.** \`Hentaigif\` - *Random Hentai Gif Images/Gif!*
    **19.** \`keta\` - *andom Keta Images/Gif!*
    **20.** \`Tits\` - *Random Tits Images/Gif!*
    **21.** \`Trap\` - *Random Trap Images/Gif!*
    **22.** \`Yuri\` - *Random Yuri Images/Gif!*
    `)

    let Setup = new Discord.MessageEmbed()
    .setColor("#007eff")
    .setThumbnail(config.Thsetup)
    .setTitle("<:setup:887630377571737610> SETUP COMMANDS")
    .setDescription(`
    **1.** \`Setup\` - *Advance Setup Commmands!*
    **2.** \`Adddj\` - *Let's you define a **DJ** role*
    **3.** \`Deletedj\` - *Let's you delete a DJ role*
    **4.** \`Reset\` - *Resets all of the music settings*
    This command includes a variation of settings.
    Kindly read the **description** of each **numbers.**
    You need help setting up join the support [server](https://discord.gg/vpSkUCAYbp) and ask.
    The command includes the following settings which you can use.
    **1.** \`Action Log System\` - *Logs all guild activities into a single channel*
    **2.** \`Welcome & Leave System\` - *Welcome and leave builder!*
    **3.** \`Economical Ward System\` - *Logs members economical actions!*
    **4.** \`Advance Ranking System\` - *Ranking system with reward money!*
    **5.** \`Creative Application System\` - *Application system with roles!*
    Please **Report** any bugs you find I'll really **Appreciate** it.
    and if you have any suggesstions on improving the **Rabbit** bot do tell. I'm open to suggesstions **Kotlin#0427** Thanks **^_+**
    `)

    let Equalizer = new Discord.MessageEmbed()
    .setColor("#00dfff")
    .setThumbnail(config.Equalizer)
    .setTitle("<:equalizer:888362090362990622> ADVANCE MUSIC EQUALIZER")
    .setDescription(`
    **1.** \`8d\` - *Adds a filter named 8d*
    **2.** \`Bassboost\` - *Adds a filter with db gains*
    **3.** \`Clear\` - *Adds a filter named clear*
    **4.** \`Earrape\` - *Adds a filter named earrape*
    **5.** \`Echo\` - *Adds a filter named echo*
    **6.** \`Flanger\` - *Adds a filter named flanger*
    **7.** \`Gate\` - *Adds a filter named gate*
    **8.** \`Haas\` - *UAdds a filter named haas*
    **9.** \`Heavybass\` - *Adds a filter named heavybass*
    **10.** \`Karaoke\` - *Adds a filter named karaoke*
    **11.** \`Lightbass\` - *Adds a filter named lightbass*
    **12.** \`Mcompand\` - *Adds a filter named mcompand*
    **13.** \`Nightcore\` - *Adds a filter named nightcore*
    **14.** \`Phaser\` - *Adds a filter named phaser*
    **15.** \`Pulsator\` - *Adds a filter named pulsator*
    **16.** \`Purebass\` - *Adds a filter named purebass*
    **17.** \`Reverse\` - *Adds a filter named reverse*
    **18.** \`Subboost\` - *Adds a filter named subboost*
    **19.** \`Surrounding\` - *Adds a filter named surrounding*
    **20.** \`Treble\` - *Adds a filter named treble*
    **21.** \`Tremolo\` - *Adds a filter named tremolo*
    **22.** \`Vaporwave\` - *Adds a filter named vaporwave*
    **23.** \`Vibrato\` - *Adds a filter named vibrato*
    `)

    // let AboutMe = new Discord.MessageEmbed()
    // .setColor("#4648ff")
    // .setThumbnail(config.Kotlin)
    // .setTitle(":smile_cat: ABOUT ME")
    // .setDescription(`
    // **Thanks** for using my darling rabbit bot.
    // Hi my name is Kotlin aka **Andrew** but call me **Kotlin**
    // I'm **21** and my gender is **male** also am just an average everyday guy
    // My profession is a developer and yes I do enjoy programming **a lot**
    // And I enjoy watching anime like most of my free time I spend it in the world of anime it's quite fun.
    // As you might have seen I'm the founder of [Fumigram](http://fumigram.com)
    // To know more information about fumigram visit the [About](https://about.fumigram.com) page.
    // I really love the world of animation and everything in it. watching anime has always bring me confort and joy no matter how I feel.
    // Well anyways thanks again and if you want to support me then do so by sharing the world of fumigram to your friends. **^_+**
    // Here are some of my servers you can check out if you want.
    // **1.** \`Rabbit Official\` - The Official [server](https://discord.com/invite/tyjhKE3VdB) for this **Rabbit**.
    // **2.** \`Fumigram\` - The Official discord [server](https://discord.com/invite/p7k64z7CcA) for **fumigram.**
    // `)

   // **3.** \`Ecchi Palace\` - Just like the name sounds this [server](https://discord.com/invite/s6GtY8z) is **18+**
   
    var embedarray = [overviewembed, General, Moderation, Fun, Music, Economy, Utility, Image, Leveling, NSFW, Setup, Equalizer]

    let GeneralButton = new MessageButton().setStyle("blurple").setID("General").setLabel("📨 General")
    let ModerationButton = new MessageButton().setStyle("blurple").setID("Moderation").setLabel("🔨 Moderation")
    let FunButton = new MessageButton().setStyle("blurple").setID("Fun").setLabel("😜 Fun")
    let MusicButton = new MessageButton().setStyle("blurple").setID("Music").setLabel("🎶 Music")
    let EconomyButton = new MessageButton().setStyle("blurple").setID("Economy").setLabel("💸 Economy")
    let UtilityButton = new MessageButton().setStyle("blurple").setID("Utility").setLabel("🧰 Utility")
    let ImageButton = new MessageButton().setStyle("blurple").setID("Images").setLabel("🎨 Images")
    let LevelingButton = new MessageButton().setStyle("blurple").setID("Leveling").setLabel("📶 Leveling")
    let NSFWButton = new MessageButton().setStyle("blurple").setID("NSFW").setLabel("🔞 NSFW")
    let SetupButton = new MessageButton().setStyle("blurple").setID("Setup").setLabel("📌 Let's Setup")

    overviewembed.addField("> :rabbit: Invite Me To Your Server", `> Rabbit is ready to serve you with one click [invite](https://discord.com/api/oauth2/authorize?client_id=734522699228905585&permissions=158913785591&scope=bot%20applications.commands) him .\n> If you need help join the supprot [server](https://discord.com/invite/ghdvMDVFse) and ask the question.`);
    if (config.newstitle) {overviewembed.addField(`> ${config.newstitle}`, `> New version of rabbit **3.5.5**\n> **Slash** commands coming up`);}
    overviewembed.addField("> :grey_question: Command Information", `> Click the Buttons to swipe through the pages \n> Developed by **Kotlin#0427** - Powered by **Fumigram**\n> Visit the [website](https://rabbit.fumigram.com) for some light information about **Rabbit** \n> \`${prefix} help <command>\` you can follow [Rabbit](https://web.fumigram.com/Rabbit) for future updates.`);
    overviewembed.setFooter("Requested by " + `${message.author.username}` + " | " + `${client.commands.size}+` + " Commands", message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048}));
    let HelpMessageButton = await message.channel.send({ embed: overviewembed, embedarray, buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 2, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });

    var currentPage = 0;

    const collector = HelpMessageButton.createButtonCollector((button) => button.clicker.user.id === message.author.id, {time: 180000});
    collector.on("collect", (b) => {
        b.reply.defer()
        if(b.id == "Home"){
            currentPage = 0;
            HelpMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 2, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
        }
        else if(b.id == "General"){
            HelpMessageButton.edit({ embed: General, buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
        }
        else if(b.id == "Moderation"){
            HelpMessageButton.edit({ embed: Moderation, buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
        }
        else if(b.id == "Fun"){
            HelpMessageButton.edit({ embed: Fun, buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
        }
        else if(b.id == "Music"){
            HelpMessageButton.edit({ embed: Music, buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
        }
        else if(b.id == "Economy"){
            HelpMessageButton.edit({ embed: Economy, buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
        }
        else if(b.id == "Utility"){
            HelpMessageButton.edit({ embed: Utility, buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
        }
        else if(b.id == "Images"){
            HelpMessageButton.edit({ embed: Image, buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
        }
        else if(b.id == "Leveling"){
            HelpMessageButton.edit({ embed: Leveling, buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
        }
        else if(b.id == "NSFW"){
            HelpMessageButton.edit({ embed: NSFW, buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
        }
        else if(b.id == "Setup"){
            HelpMessageButton.edit({ embed: Setup, buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
        }
        if(b.id == "Equalizer"){
            HelpMessageButton.edit({ embed: Equalizer, buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
        }
        else if(b.id == "Back"){
            if(currentPage !==0){
                --currentPage;
                HelpMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
            } else {
                currentPage = embedarray.length -1;
                HelpMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
            }
        } else if(b.id == "Forward"){
            if(currentPage < embedarray.length -1){
                currentPage++;
                HelpMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
            } else {
                currentPage = 0;
                HelpMessageButton.edit({ embed: embedarray[currentPage], buttons: buttonarray, components: [{ type: 1, components: [GeneralButton, ModerationButton, FunButton, MusicButton, EconomyButton] }, { type: 1, components: [UtilityButton, ImageButton, LevelingButton, NSFWButton, SetupButton] }] });
            }
        }
    })
  })();
}

   if (args[0]) {
    return getCMD(client, message, args[0]);
   }
   function getCMD(client, message, input) {
    const embed = new Discord.MessageEmbed();
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    const info = "<:xvector:869193619318382602> | No information found for command `" + input.toLowerCase() + "`!";
    if (!cmd) {
     try {
      return message.lineReply("<:xvector:869193619318382602> **| No information found.**");
     } catch (err) {
      message.lineReply("<:xvector:869193619318382602> **| No information found.**");
     }
    } else {
     function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
     }

     alliaseslist = cmd.aliases.toString() || "None";
     const cmdembed = new Discord.MessageEmbed()
     .setAuthor(`${message.guild.name}`, message.guild.iconURL())
     .setColor("#00efff")
     .setTimestamp()
     .setDescription(`
     **Help: ** \`${cmd.name}\`
     **Category: ** \`${cmd.category}\`
     **Description: **\n ${cmd.description}
     **Example: ** \`${prefix}${cmd.usage}\`
     **Aliases: ** \`${alliaseslist}\`
     `)
    .setFooter("Requested by " + `${message.author.tag}`, message.author.displayAvatarURL({dynamic: true,format: "png",size: 2048}));
     message.lineReply(cmdembed);
    }
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
StateManager.on('PrefixFetched', (guildId, prefix) => {
  guildPrefix.set(guildId, prefix);
});