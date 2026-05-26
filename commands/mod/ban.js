const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bans a user from the server")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to ban")
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("The reason for the ban")
                .setRequired(true),
        )
        // Check if the user who ran the commands has the required permissions to ban
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
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

        // Check if the user is bannable (e.g. not an admin or higher role)
        if (!member.bannable) {
            return interaction.reply({
                content:
                    "I cannot ban that user. They may have a higher role than me.",
                ephemeral: true,
            });
        }

        // Ban the user
        await member.ban({ reason });
        await interaction.reply({
            content: `Successfully banned ${user} for: ${reason}`,
            ephemeral: true,
        });
    },
};
