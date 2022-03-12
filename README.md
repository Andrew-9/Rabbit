# Rabbit
Rabbit - An adorable rabbit bot with over 260+ commands He is very obedient and can help you setup your server.
The bot has a lot of functionalities with an advance server setup settings which includes a bunch of commands that are package into one grand command. this source code will be constantly updated with new features and functions.

[![Logo](https://media.discordapp.net/attachments/711910361133219903/929412133920313344/Rabbit.png)](https://rabbit.fumigram.com/)

### Features

 * `👻 Fun`
 * `🎶 Music`
 * `🧰 Utility`
 * `🏖  Images`
 * `📶 Leveling`
 * `💸 Economy`
 * `🔨 Moderation`
 * `⚙️ Configuration`

### Invite

To invite public version use - [invite link](https://discord.com/oauth2/authorize?client_id=897819791732121621&permissions=1533303193591&scope=bot%20applications.commands) 
NOTE for the bot to fully function without errors you'll need to grand him the `ADMINISTRATION` permission to your server.
Or let's make things far easier, visit our [website](https://rabbit.fumigram.com/)

## Support Server
Are you facing issues with setting up? then drop by at our [server](https://discord.com/invite/MJ5tYb4Jh9) 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Also please make sure all contributions you add uses the following database and language
* `ENMAP` - Rabbit Main Database
* `JAVASCRIPT` - Rabbit Programing Language

### Self-Hosting

1. Clone [repository](https://github.com/Andrew-9/Rabbit)
2. Run `npm install` to get all dependencies,
3. Quickly grab a Discord Bot token and client secret on [Discord's developer portal](https://discord.com/developers/applications)
4. Fill `botconfig/config.json` with your desired values
5. Fill `config.js` with what you need to get started `(optional)`
6. Rename `.env.exp`  Remember - this file is a super secret file, better not share it with anyone.
7. In `.env` file set this values:
    * **Required:**
    * `TOKEN` - Bot token from Discord Developer portal
    * `ID` - Your Discord Bot ID
    * `AMEAPI` - your Ametyhyste API token
    * `BRAINID` - Your Brainshop AI Brain ID
    * `BRAINKEY` - Your Brainshop AI Brain Key
    * `GENIUS` - Your Genius API Key. - Not Required for now
7. Run `npm run start` or `node.`

### Example `.env` file
<details><summary>Example <code>.env</code> file</summary>

```
# Environment Config

# Required
TOKEN=[YOUR_BOT_TOKEN]
ID=[YOUR_BOT_ID]
AMEAPI=[AME_API_KEY]
BRAINID=[API_ID]
BRAINKEY=[API_KEY]
GENIUS=[NOT_NEEDED _FOR_NOW]

```
</details>