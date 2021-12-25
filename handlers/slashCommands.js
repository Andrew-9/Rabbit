const config = require("../config.json");
const chalk = require("chalk");
module.exports = (client) => {
    try {
		//Then Code a Function to manage the SlashCommands
		const SlashCommandsApp = (guild) => {
			const app = client.api.applications(client.user.id)
			if (guild) app.guilds(guild)
			return app;
		}
		//Ready Event + Loading the Slash Commands
		client.on('ready', async () => {
			console.log(`Logged in as ${client.user.tag}!`);
			//Register All Slash Commands for a specific Guild
			for (const configData of config.slashcommands) {
				await SlashCommandsApp("").commands.post({
					data: configData
				});
				console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold(`✓ Loaded the SlashCommand ${configData.name}`));
			}
		});

    } catch (e) {
        console.log(e)
    }
};