const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log("Deleting all commands...");

        // Purge guild commands
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: [],
        });
        console.log("Successfully deleted all guild commands.");

        // Purge global commands
        await rest.put(Routes.applicationCommands(clientId), { body: [] });
        console.log("Successfully deleted all global commands.");
    } catch (error) {
        console.error(error);
    }
})();
