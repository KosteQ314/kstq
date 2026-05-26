const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { data } = require("./ban");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kicks a user from the server")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to kick")
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("The reason for the kick")
                .setRequired(true),
        )
        // Check if the user who ran the commands has the required permissions to ban
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");

        // Get the member object from the guild
        const member = interaction.guild.members.cache.get(user.id);

        // Check if the user is in the server
        if (!member) {
            return interaction.reply({
                content: "That user is not in this server.",
                ephemeral: true,
            });
        }

        // Check if the user is kickable (e.g. not an admin or higher role)
        if (!member.kickable) {
            return interaction.reply({
                content:
                    "I cannot kick that user. They may have a higher role than me.",
                ephemeral: true,
            });
        }

        // Kick the user
        await member.kick({ reason });
        await interaction.reply({
            content: `Successfully kicked ${user} for: ${reason}`,
            ephemeral: true,
        });
    },
};
