# Rabbit
Rabbit -A darling Discord bot with fun commands, Memes, Images, Giveaway, Anime, Economy, and NSFW! Rabbit serve over 180+ commands!

[![Discord Banner](https://media.discordapp.net/attachments/711910361133219903/880873445951430686/banner.jpg?width=851&height=613)](https://rabbit.fumigram.com/)

### Features
👻 Fun
🎵 Music
🧰 Utility
🏖 Images
📶 Leveling
💸 Economy
🔨 Moderation
⚙️ Configuration
🔖 Application System

### Invite

To invite public version use - [invite link](https://discord.com/oauth2/authorize?client_id=734522699228905585&permissions=8&scope=bot%20applications.commands) 
NOTE for the bot to fully function without errors you'll need to grand him the `ADMINISTRATION` permission to your server.
Or let's make things far easier, visit our [website](https://rabbit.fumigram.com/)

## Support Server
Are you facing issues with setting up? then drop by at our [server](https://discord.com/invite/8ygztKCHgS) 

### Self-Hosting

1. Clone [repository](https://github.com/Andrew-9/Rabbit)
2. Run `npm install` to get all dependencies,
3. Quickly grab a Discord Bot token and client secret on [Discord's developer portal](https://discord.com/developers/applications)
4. Fill `config.json` with your desired values
5. Fill `config.js` with what you need to get started
5. Rename `.env.exp`  Remember - this file is a super secret file, better not share it with anyone.
6. In `.env` file set this values:
    * **Required:**
    * `TOKEN` - Bot token from Discord Developer portal
    * `ID` - Your Discord Bot ID
    * `AMEAPI` - your Ametyhyste API token
    * `BRAINID` - Your Brainshop AI Brain ID
    * `BRAINKEY` - Your Brainshop AI Brain Key
    * `GENIUS` - Your Genius API Key. - Not Required for now
    * `MYSQL_DATABASE` - Your MYSQL database name
    * `MYSQL_HOST` - Your MYSQL Host name
    * `MYSQL_PASSWORD` - Your MYSQL user password
    * `MYSQL_USER` - Your MYSQL User name who can acces to the database
7. Run `npm run start` or `node.`

### Example `.env` file
<details><summary>Example <code>.env</code> file</summary>

```
# Environment Config

# Required
TOKEN=[YOUR_BOT_TOKEN]
ID=[YOUR_BOT_ID]
AMEAPI=[AME_API_KEY]
MYSQL_DATABASE=[YOUR_BOT_DATABASE]
MYSQL_HOST=[YOUR_HOST]
MYSQL_PASSWORD=[DB_HOST_PASSWORD]
MYSQL_USER=[DB_HOST_USERNAME]
BRAINID=[API_ID]
BRAINKEY=[API_KEY]
GENIUS=[NOT_NEEDED _FOR_NOW]
CONTACT_WEBHOOK_TOKEN=YOUR_CONTACT_FORM_WEBHOOK_TOKEN
CONTACT_WEBHOOK_ID=YOUR_CONTACT_FORM_WEBHOOK_ID
STATUS_WEBHOOK_TOKEN=[BOT_WEBHOOK_TOKEN]
STATUS_WEBHOOK_ID=[BOT_WEBHOOK_ID]

```
</details>