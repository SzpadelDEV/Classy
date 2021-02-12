const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: "premium_nadaj",
    aliases: ['prem-dodaj', 'prem_dodaj', 'prem-nadaj', 'prem_nadaj'],
    run: async (client, message, args) => {
        const server = args[0];
        if (message.author.id !== require('../../config.json').owner_id)return;
        if (!server || !client.guilds.cache.get(`${server}`))return message.reply("Podaj poprawnie ID serwera!");
        db.set(`${server}_premium`, `true`);
        message.reply("Nadano premium!");
    }
}