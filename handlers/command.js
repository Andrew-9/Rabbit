const { readdirSync } = require("fs");
const gradient = require("gradient-string");
const chalk = require("chalk");
const ascii = require("ascii-table");
const table = new ascii();
table.setHeading("Command", "Category", "Load status");
table.setTitleAlign(table.CENTER);
module.exports = (client) => {
    try {
        let amount = 0;
        readdirSync("./commands/").forEach((dir) => {
            const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));
            for (let file of commands) {
                let pull = require(`../commands/${dir}/${file}`);
                if (pull.name) {
                    client.commands.set(pull.name, pull);
                    amount++;
                } else {
                    console.log(chalk.bold(chalk.blue.bold(`[RABBIT]`)) + chalk.cyan.bold("missing a help.name, or help.name is not a string."));
                    continue;
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
            }
        });
        const logo =
        gradient.pastel.multiline(
         [
          " ____      _    ____  ____ ___ _____ ",
          "|  _ \\    / \\  | __ )| __ )_ _|_   _| ",
          "| |_) |  / _ \\ |  _ \\|  _ \\| |  | |  ",
          "|  _ <  / ___ \\| |_) | |_) | |  | |  ",
          "|_| \\_\\/_/   \\_\\____/|____/___| |_|  ",
      
         ].join("\n")
        ) + "\n       -- By Kotlin#0427 --       \n\n";
       console.log(chalk.bold.bgBlack(logo));
       console.log(chalk.bold(chalk.blue.bold("[RABBIT]")) + chalk.cyan.bold("Successfully loaded " + chalk.blue.underline(`${amount}`) + " commands!"));
    } catch (e) {
      console.log(e);
    }
};