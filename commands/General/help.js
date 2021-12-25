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
    .setThumbnail("https://media.discordapp.net/attachments/711910361133219903/924217896127844372/7253972_b5a8f.gif")
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
    > \`${prefix}vote\` - Vote for rabbit
    > \`${prefix}ping\` - Show client ping
    > \`${prefix}invite\` - Invite me to your server
    > \`${prefix}uptime\` - Display's the bot uptime
    > \`${prefix}help\` - Displays this help information
    > \`${prefix}userinfo\` - Get the information about a user
    > \`${prefix}request\` - Request for new features for rabbit
    > \`${prefix}shell\` - Run a prompt command using this shell
    > \`${prefix}info\` - Shows informations of the about the bot
    > \`${prefix}serverdj\` - Displays the DJ Roles for your server
    > \`${prefix}serverinfo\` - Display's the information of a server
    > \`${prefix}servers\` - Displays total servers that the bot is in
    > \`${prefix}suggest\` - Suggest a feature for the bot development
    > \`${prefix}members\` - How many members are in the current server
    > \`${prefix}fumigram\` - Provide's a link to the fumigram community
    > \`${prefix}perminvite\` - Use the bot to create a permanent invite
    > \`${prefix}poll\` - Ask questions by creating a poll for your members
    > \`${prefix}reload\` - Reload all commands for changes **[Owner Only]**
    > \`${prefix}eval\` - Evaluates and runs JavaScript codes **[Owner Only]**
    > \`${prefix}tempinvite\` - Use the bot to create a temporary invite link
    `)

    let Moderation = new Discord.MessageEmbed()
    .setColor("#54d800")
    .setThumbnail(config.moderation)
    .setTitle(":tools: LIGHT MODERATION")
    .setDescription(`
    > \`${prefix}ban\` - Ban a member from the server
    > \`${prefix}kick\` - Kicks a member from guild
    > \`${prefix}id\` - Display a mentioned user ID
    > \`${prefix}say\` - Send a message using the bot
    > \`${prefix}embed\` - Send a custom built embed
    > \`${prefix}prune\` - Removes up to 100 messages
    > \`${prefix}unbans\` - Unbans a member into the server
    > \`${prefix}softban\` - Softban a member from the Guild
    > \`${prefix}setprefix\` - Set a custom prefix for your server
    > \`${prefix}warn\` - Send a warning to any user that tries shit
    > \`${prefix}set-proverb\` - Set a proverb's channel for the guild
    `)

    let Fun = new Discord.MessageEmbed()
    .setColor("#df15ff")
    .setThumbnail(config.fun)
    .setTitle("<:starbutton:868270158689488966> FUN AND MEMES")
    .setDescription(`
    > \`${prefix}sneeze\` - Achoo
    > \`${prefix}poke\` - Poke anyone
    > \`${prefix}slap\` - Slap a user
    > \`${prefix}dice\` - Roll a dice
    > \`${prefix}ship\` - Ship members
    > \`${prefix}kill\` - Murders a user
    > \`${prefix}rate\` - Rate Something
    > \`${prefix}iQ\` - Display a user IQ
    > \`${prefix}tickle\` - Tickle a user
    > \`${prefix}chat\` - Chat with bot AI
    > \`${prefix}pepe\` - Show user PP size
    > \`${prefix}fliptext\` - Flip some text
    > \`${prefix}meme\` - Sends a random meme
    > \`${prefix}advice\` - Get a random advice
    > \`${prefix}hack\` - Hack a user real quick
    > \`${prefix}flipcoin\` - Flip a virtual coin
    > \`${prefix}joke\` - Display a random dad joke
    > \`${prefix}hug\` - Give a hug to mention user
    > \`${prefix}ascii\` - Convert text to asci format
    > \`${prefix}beep\` - Beep-Boop! Beep-Boop! Beep-Boop
    > \`${prefix}anime\` - Search the name of any anime list
    > \`${prefix}kiss\` - Kiss Kiss <3 | Nina... I love you
    > \`${prefix}cuddle\` - Give a cuddle to mentioned user
    > \`${prefix}eightball\` - Rabbit wll tell you a fortune
    > \`${prefix}baka\` - You're a BAKA! or something like that
    > \`${prefix}tictactoe\` - Play Tic Tac Toe against someone
    > \`${prefix}animal-fact\` - Shows a random fact about animal
    > \`${prefix}cat-emoji\` - Every Cat is cute. Don't you think?
    > \`${prefix}bot-token\` - Generate **(fake)** random Discord Bot token
    > \`${prefix}flatearth\` - Demonstrates that the earth really is flat
    > \`${prefix}4chan\` - Gets a random image from the selected 4chan board
    `)

    let Music = new Discord.MessageEmbed()
    .setColor(config.musicmode)
    .setThumbnail(config.music)
    .setTitle("<:musicblues:888396777202520124> ADVANCE MUSIC FEATURE")
    .setDescription(`
    > \`${prefix}play\` - Play any music
    > \`${prefix}skip\` - Skips current song
    > \`${prefix}volume\` - Control the sound volume
    > \`${prefix}replay\` - Replays the current song
    > \`${prefix}shuffle\` - Shuffles the whole queue
    > \`${prefix}grab\` - Saves current song in your DM
    > \`${prefix}seek\` - Moves in the song by seconds
    > \`${prefix}resume\` - Resume already paused track
    > \`${prefix}clearqueue\` - Clears the server queue
    > \`${prefix}stop\` - Stop the current playing music
    > \`${prefix}skip\` - Skip the current playing music
    > \`${prefix}nowplaying\` - Display now playing song
    > \`${prefix}loop\` - Enables loop for a song or queue
    > \`${prefix}pause\` - Pause the current playing music
    > \`${prefix}jump\` - Jump to a song in the music queue
    > \`${prefix}radio\` - Play one of the 200 Radio Station
    > \`${prefix}rewind\` - Rewinds the song back by seconds
    > \`${prefix}queue\` - Displays musics in the server queue
    > \`${prefix}forward\` - Forwards the song by duration seconds
    > \`${prefix}botplaylist\` - Play some of the premade playlists
    > \`${prefix}autoplay\` - Enable autoplay - random similar songs
    > \`${prefix}search\` - Search and select music or videos to play
    > \`${prefix}skipnext\` - Play new song and skip the current song
    > \`${prefix}addrelated\` - Add a similar song of the current track
    > \`${prefix}myplaylist\` - Creates a personal playlist for yourself
    > \`${prefix}removetrack\` - Removes a specific track from the queue
    > \`${prefix}serverplaylist\` - Add a custom playlist for your server
    > \`${prefix}sleeptimer\` - Sets a sleep timer which will stop the bot
    > \`${prefix}status\` - Shows queue status and the current playing song
    > \`${prefix}searchrelated\` - Search similar songs of the current track
    > \`${prefix}myplaylistsongs\` - Displays urls of songs in your playlist
    > You can play music from **Youtube,** and **Spotify.**
    > Do report any bugs you find. that would be really **appreciated.**
    `)

    let Economy = new Discord.MessageEmbed()
    .setColor("#F2B926")
    .setThumbnail(config.economy)
    .setTitle("<:economy:881557584467865620> DOLLA ECONOMY SYSTEM")
    .setDescription(`
    > \`${prefix}slots\` - Draw a slots with **100$**
    > \`${prefix}balance\` - Shows Current Balance
    > \`${prefix}give\` - Give moeny to your friends
    > \`${prefix}bail\` - Bail yourself out of jail
    > \`${prefix}sell\` - Sell out items in your shop
    > \`${prefix}loot\` - Look for money if you're broke
    > \`${prefix}fish\` - Catch a fish from a vast ocean
    > \`${prefix}crime\` - Comit a crime to earn money
    > \`${prefix}thanks\` - Offer up your thanks to **rabbit**
    > \`${prefix}work\` - Work for moeny and earn rewards
    > \`${prefix}weekly\` - Get your weekly reward from **rabbit**
    > \`${prefix}shop\` - Personal shop for all your items
    > \`${prefix}daily\` - Get daily rewards from **rabbit**
    > \`${prefix}progress\` - Check you economy progress
    > \`${prefix}roulette\` - Bet a color to win or lose. depends
    > \`${prefix}deposit\` - Deposit money into your bank account
    > \`${prefix}profile\` - Shows your profile/other users Profile
    > \`${prefix}withdraw\` - Withdraw moeny from your bank account   
    > \`${prefix}admingive\` - Give moeny to people as an administrator
    > \`${prefix}admintake\` - Take money from others as an administrator
    > \`${prefix}buyproducts\` - Buy products from global the market
    > \`${prefix}addproducts\` - Add products to the global market list
    > \`${prefix}random\` - Do random things to ramdomize your earnings
    > \`${prefix}globalmarket\` - Global Market where all products are listed
    > \`${prefix}getshop\` - Open a shop to start selling products anytime
    > \`${prefix}reward\` - On completion of eco progress. **Claim your reward**
    > \`${prefix}set-color\` - Set a color for your economical embed details
    > \`${prefix}claimreward\` - Reward for completing eco progress
    > \`${prefix}shopsettings\` - Change settings of a user shop and close it
    > \`${prefix}billboard\` - See the list of richest members on the billboard
    > \`${prefix}withdrawsales\` - Withdraw cash from sales account balance
    > \`${prefix}rockpaperscissors\` - Play rock paper scissors against **Rabbit**
    > **NOTE:** You'll have to setup the **Economical ward** system to use this command. Just set it up with \`${prefix}setup -> economical ward\`
    `)

    let Image = new Discord.MessageEmbed()
    .setColor("#ff0070")
    .setThumbnail(config.Eimages)
    .setTitle("<:images:877355588256923719> 4TH GEN IMAGE GENERATION")
    .setDescription(`
    > \`${prefix}3000years\` - 3000 Years later
    > \`${prefix}affect\` - No, it doesn't affect my baby
    > \`${prefix}approved\` - Approve the users avatar
    > \`${prefix}beautiful\` - Oh this? This is beautiful
    > \`${prefix}bird\` - Sends a random bird image
    > \`${prefix}blur\` - Blur the user avatar
    > \`${prefix}cat\` - Sends a random cat photo
    > \`${prefix}changemymind\` - Try to change my mind
    > \`${prefix}circle\` - Creates circular image
    > \`${prefix}contrast\` - Add contrast effect to user avatar
    > \`${prefix}distort\` - Add distort effect to user avatar
    > \`${prefix}dog\` - Sends a random dog photo
    > \`${prefix}facepalm\` - Creates facepalm image
    > \`${prefix}fire\` - Burns the users avatar
    > \`${prefix}fox\` - Sends a random fox image
    > \`${prefix}foxgirl\` - Random Foxgirl Images
    > \`${prefix}frame\` - Place user avatar in a frame
    > \`${prefix}gay\` - Rainbow ( ͡° ͜ʖ ͡°)
    > \`${prefix}glass\` - Returns a glass image
    > \`${prefix}glitch\` - Add glitch effect to user avatar
    > \`${prefix}heaven\` - Returns a heaven image
    > \`${prefix}hitler\` - Worse than hitler
    > \`${prefix}holo\` - Random Holo Images
    > \`${prefix}invert\` - Invert image colors
    > \`${prefix}jail\` - Sends user to jail
    > \`${prefix}jokeoverhead\` - Whoosh!
    > \`${prefix}kiss\` - Random Kiss Images!
    > \`${prefix}koala\` - Sends a random koala image
    > \`${prefix}magik\` - Add a dash of magik to the user avatar
    > \`${prefix}moustache\` - Add moustache to user avatar
    > \`${prefix}neko\` - Random Neko Images!
    > \`${prefix}ohno\` - Oh no! It's stupid!
    > \`${prefix}panda\` - Sends a random panda image
    > \`${prefix}pat\` - Sends a random pat image
    > \`${prefix}pikachu\` - Sends a random pikachu image
    > \`${prefix}pixelize\` - Pixelize the user avatar
    > \`${prefix}posterize\` - Posterize the user avatar
    > \`${prefix}red-panda\` - Sends a random red panda image
    > \`${prefix}reject\` - Reject the users avatar
    > \`${prefix}rip\` - F in the chat
    > \`${prefix}sad\` - Returns a sad image
    > \`${prefix}scary\` - Booo that's a bit scary
    > \`${prefix}sepia\` - Add sepia effect to user avatar
    > \`${prefix}shit\` - Oh Shit!
    > \`${prefix}tickle\` - Random tickle Images!
    > \`${prefix}trigerred\` - Returns a triggered image
    > \`${prefix}trash\` - Is this trash?
    > \`${prefix}utatoo\` - Hmmm
    > \`${prefix}waifu\` - Random waifu Images!
    > \`${prefix}wallpaper\` - Random Wallpaper Images!
    > \`${prefix}wanted\` - Creates wanted card
    > \`${prefix}wasted\` - Returns a wasted image
    > \`${prefix}wink\` - Sends a random winking image
    `)

    let Leveling = new Discord.MessageEmbed()
    .setColor("#FF4404")
    .setThumbnail(config.leveling)
    .setTitle("<:leveling:880516352987775016> ADVANCE LEVELING SYSTEM")
    .setDescription(`
    > \`${prefix}addlevel\` - Add any specific amount of levels to users
    > \`${prefix}addpoints\` - Give points to your members for free
    > \`${prefix}addrandomall\` - Add a random amount of Points to everyone
    > \`${prefix}leaderboard\` - Displays the highest ranking members
    > \`${prefix}rank\` - Check your current ranking and other members ranking
    > \`${prefix}registerall\` - Register your server members to the database
    > \`${prefix}removelevel\` - Remove a specific amount of **level** from a user
    > \`${prefix}removepoints\` - Remove any amount of **points** from a user   
    > \`${prefix}resetranking\` - Resets the ranking of a user back to zero
    > \`${prefix}resetrankingall\` - Reset the ranking of everyone in this server
    > \`${prefix}setglobalxpcounter\` - Sets global **xp** to count for all members
    > \`${prefix}setlevel\` - Give a specific amount of levels to any user
    > \`${prefix}setpoints\` - Sets a specific amount of **points** to any user
    > \`${prefix}setxpcounter\` - Sets a specific amount of **xp** to count for a user
    > **INFO:** Some commands requires the \`MANAGE_MESSAGES\` permission. so just give any user the permission
    > **NOTE:** You'll have to enable the **ranking system** to use this command. you can enable it with \`${prefix}setup -> ranking system\`
    `)

    let Utility = new Discord.MessageEmbed()
    .setColor("#CCF5FF")
    .setThumbnail(config.utility)
    .setTitle("<:Utility:880878481758621706> CREATIVE UTILITY TOOLS")
    .setDescription(`
    > \`${prefix}avatar\` - Get a user avatar
    > \`${prefix}base64-decode\` - Decode Base64 text to normal
    > \`${prefix}base64\` - Encode text to Base64 format
    > \`${prefix}calculator\` - Calculator
    > \`${prefix}color\` - Shows color information
    > \`${prefix}country\` - Gets a country information
    > \`${prefix}djs\` - Look at the discord.js docs
    > \`${prefix}emojify\` - Convert text to emojis
    > \`${prefix}emojiinfo\` - See Information about an emoji
    > \`${prefix}delete-giveaway\` - Delete a giveaway
    > \`${prefix}start\` - Start giveaways quickly in your server
    > \`${prefix}edit-giveaway\` - Edit a currently running Giveaway
    > \`${prefix}end-giveaway\` - Ends any current running giveaways
    > \`${prefix}fetch-giveaway\` - Fetch server's current running giveaways
    > \`${prefix}github\` - Search for things in github
    > \`${prefix}giveaway\` - Create a giveway for your members
    > \`${prefix}reroll-giveaway\` - Restart an already ended giveaway
    > \`${prefix}guild-avatar\` - Get the avatar of a guild
    > \`${prefix}shortener\` - Shorter a url real quick for you
    > \`${prefix}snipe\` - Snipe a deleted message
    > \`${prefix}weather\` - Checks a weather forecast
    > **NOTE:** The Giveaway commands requires the \`MANAGE_MESSAGE\` permission to use. just give a user this perm.
    `)

    let NSFW = new Discord.MessageEmbed()
    .setColor("#BD1A41")
    .setThumbnail(config.nsfw)
    .setTitle(":underage: 18+ NSFW COMMANDS")
    .setDescription(`
    > \`${prefix}anal\` - Display a random anal image/gif
    > \`${prefix}ass\` - Display a random ass image/gif
    > \`${prefix}blowjob\` - Display a random blowjob image/gif
    > \`${prefix}boobs\` - Display a random boobs image/gif
    > \`${prefix}classic\` - Display a random classic porn image/gif
    > \`${prefix}cum\` - Display a random cum image/gif
    > \`${prefix}cumsluts\` - Random Cumsluts Bitc** Images/Gif!
    > \`${prefix}ero\` - Display a random ero image/gif
    > \`${prefix}erofeet\` - Display a random ero feet image/gif
    > \`${prefix}eroneko\` - Display a random ero neko image/gif
    > \`${prefix}eroyuri\` - Display a random ero yuri image/gif
    > \`${prefix}feet\` - Display a random feet image/gif
    > \`${prefix}femdom\` - Display a random femdom image/gif
    > \`${prefix}foxgirl\` - Display a random foxgirl image/gif
    > \`${prefix}furry\` - Search internet for your furry!r
    > \`${prefix}futa\` - Display a random futa image/gif
    > \`${prefix}hentai\` - Display a random hentai gif
    > \`${prefix}hentaigif\` - Random Hentai Gif Images/Gif!
    > \`${prefix}keta\` - Random Keta Images/Gif!
    > \`${prefix}tits\` - Random Tits Images/Gif!
    > \`${prefix}trap\` - Random Trap Images/Gif!
    > \`${prefix}yuri\` - Random Yuri Images/Gif!
    `)

    let Setup = new Discord.MessageEmbed()
    .setColor("#007eff")
    .setThumbnail(config.Thsetup)
    .setTitle("<:setup:887630377571737610> SETUP COMMANDS")
    .setDescription(`
    > \`${prefix}setup\` - Advance Setup Commmands!
    > \`${prefix}adddj\` - Let's you define a **DJ** role
    > \`${prefix}deletedj\` - Let's you delete a DJ role
    > \`${prefix}reset\` - Resets all of the music settings
    > This command includes a variation of settings.
    > Kindly read the **description** of each **numbers.**
    > You need help setting up join the support [server](https://discord.gg/vpSkUCAYbp) and ask.
    > The command includes the following settings for you.
    > \`Action Log System\` - Logs all guild activities into a channel
    > \`Welcome & Leave System\` - Welcome and leave builder!
    > \`Economical Ward System\` - Logs members economical actions!
    > \`Advance Ranking System\` - Ranking system with rewards!
    > \`Creative Application System\` - Application system!
    > Please **Report** any bugs you find I'll really **Appreciate** it.
    > And if you have any suggesstions on improving the Bot do tell.
    > I'm open to suggesstions **Kotlin#0427** Thanks **^_+**
    `)

    let Equalizer = new Discord.MessageEmbed()
    .setColor("#00dfff")
    .setThumbnail(config.Equalizer)
    .setTitle("<:equalizer:888362090362990622> ADVANCE MUSIC EQUALIZER")
    .setDescription(`
    > \`${prefix}8d\` - Adds a filter named 8d
    > \`${prefix}bassboost\` - Adds a filter with db gains
    > \`${prefix}clear\` - Adds a filter named clear
    > \`${prefix}earrape\` - Adds a filter named earrape
    > \`${prefix}echo\` - Adds a filter named echo
    > \`${prefix}flanger\` - Adds a filter named flanger
    > \`${prefix}gate\` - Adds a filter named gate
    > \`${prefix}haas\` - UAdds a filter named haas
    > \`${prefix}heavybass\` - Adds a filter named heavybass
    > \`${prefix}karaoke\` - Adds a filter named karaoke
    > \`${prefix}lightbass\` - Adds a filter named lightbass
    > \`${prefix}mcompand\` - Adds a filter named mcompand
    > \`${prefix}nightcore\` - Adds a filter named nightcore
    > \`${prefix}phaser\` - Adds a filter named phaser
    > \`${prefix}pulsator\` - Adds a filter named pulsator
    > \`${prefix}purebass\` - Adds a filter named purebass
    > \`${prefix}reverse\` - Adds a filter named reverse
    > \`${prefix}subboost\` - Adds a filter named subboost
    > \`${prefix}surrounding\` - Adds a filter named surrounding
    > \`${prefix}treble\` - Adds a filter named treble
    > \`${prefix}tremolo\` - Adds a filter named tremolo
    > \`${prefix}vaporwave\` - Adds a filter named vaporwave
    > \`${prefix}vibrato\` - Adds a filter named vibrato
    `)
   
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
    if (config.newstitle) {overviewembed.addField(`> ${config.newstitle}`, `> Rabbit will be migrating to discord.js version **^13.3.0**\n > And will be bringing more features. **coming soon**`);}
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