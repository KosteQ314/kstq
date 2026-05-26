const { SlashCommandBuilder } = require("discord.js");
const { giphyApiKey } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gif")
        .setDescription("Sends a random GIF")
        .addStringOption((option) =>
            option
                .setName("category")
                .setDescription("The category of the GIF to send")
                .setRequired(true)
                .addChoices(
                    { name: "Funny", value: "gif_funny" },
                    { name: "Meme", value: "gif_meme" },
                ),
        ),
    async execute(interaction) {
        const category = interaction.options.getString("category");

        // Get a search category from the input
        const searchTerms = {
            gif_funny: "funny",
            gif_meme: "meme",
        };

        const searchTerm = searchTerms[category];

        // Fetch a random GIF from Giphy
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${giphyApiKey}&limit=20`,
        );
        const data = await response.json();

        // Pick a random GIF from the results
        const randomIndex = Math.floor(Math.random() * data.data.length);
        const gif = data.data[randomIndex].url;

        await interaction.reply({ content: gif });
    },
};
