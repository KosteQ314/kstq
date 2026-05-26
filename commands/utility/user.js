const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Provides information about the user.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to provide information about"),
        ),
    async execute(interaction) {
        const user = interaction.options.getUser("user") ?? interaction.user;

        // user is the object representing the user who's information we want to retrieve
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.reply(
            `This command shows information about ${user}, who joined on ${interaction.member.joinedAt}.`,
        );
    },
};
