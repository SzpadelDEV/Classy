const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: "premium_usun",
    run: async (client, message, args) => {
        const server = args[0];
        if (message.author.id !== require('../../config.json').owner_id)return;
        if (!server || !client.guilds.cache.get(`${server}`))return message.reply("Podaj poprawnie ID serwera!");
        db.delete(`${server}_premium`);
        message.reply("Usunieto premium!");
    }
}