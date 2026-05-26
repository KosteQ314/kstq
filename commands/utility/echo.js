const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Replies with your input!")
        .addStringOption((option) =>
            option
                .setName("input")
                .setDescription("The input to echo back")
                .setRequired(true),
        )
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription("The channel to echo back into")
                .setRequired(true),
        )
        .addBooleanOption((option) =>
            option
                .setName("ephemeral")
                .setDescription("Whether the reply should be ephemeral or not"),
        ),
    async execute(interaction) {
        const input = interaction.options.getString("input");
        const channel = interaction.options.getChannel("channel");
        const ephemeral = interaction.options.getBoolean("ephemeral") ?? true;

        await channel.send(input);
        await interaction.reply({
            content: `Echoed back, "${input}", to ${channel}!`,
            ephemeral: ephemeral,
        });
    },
};
