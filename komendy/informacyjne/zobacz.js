const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const config = require("../../config.json")
module.exports = {
    name: "zobacz",
    aliases: ['wyswietl', "wyświetl"],
    run: async (client, message, args) => {
        const wyw = new MessageEmbed()
        .setTitle(`__**TREŚĆ REKLAMY TEGO SERWERA**__ `)
        .setDescription("```"+ `${db.get(`${message.guild.id}_reklama`)}`.replace('null', `${db.get(`${message.guild.id}_do_weryfikacji`)}`.replace('null', 'Brak reklamy!')) + "```")
        .setColor(config.kolor);
      message.channel.send(wyw);

    }
}