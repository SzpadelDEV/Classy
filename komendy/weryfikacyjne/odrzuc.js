const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');
module.exports = {
    name: "odrzuc",
    aliases: [`odrzuć`],
    run: async (client, message, args) => {
        if (!message.member.roles.cache.get('746259342428209182'))return;
        if (!args[0] || !client.guilds.cache.get(args[0]))return message.reply("Podaj poprawnie ID serwera!");
        if (!db.get(`${args[0]}_do_weryfikacji`)) return message.reply("Ten serwer nie ma reklamy do weryfikacji");
        if (!args[1])return message.reply("Podaj powód");
        db.delete(`${args[0]}_do_weryfikacji`);
        message.reply("Odrzucono!");
        const odrzucone = new MessageEmbed()
        .setAuthor("Uwaga dot. reklamy!", "https://cdn.discordapp.com/emojis/747402960346021950.gif?v=1")
        .setDescription("Reklama serwera o ID: `" + args[0] + "` otrzymała uwagę z powodem: `" + args.slice(1).join(' ') +"`")
        .setFooter(`Weryfikator: ${message.author.tag}`, message.author.displayAvatarURL())
        .setColor("RED")
        client.channels.cache.get("746264838963200071").send(odrzucone);
    }
}