const fs = require("fs");
const chalk = require("chalk");
const allevents = [];
module.exports = async (client) => {
    try {
        let amount = 0;
        const load_dir = (dir) => {
            const event_files = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js"));
            for (const file of event_files) {
                try {
                    const event = require(`../events/${dir}/${file}`)
                    let eventName = file.split(".")[0];
                    allevents.push(eventName);
                    client.on(eventName, event.bind(null, client));
                    amount++;
                } catch (e) {
                    console.log(e)
                }
            }
        }
        await ["client", "guild"].forEach(e => load_dir(e));
        console.log(chalk.bold(chalk.blue.bold(`[RABBIT]`)) + chalk.cyan.bold(`Successfully loaded ${amount} Events`));
    } catch (e) {
        console.log(String(e.stack))
    }
};