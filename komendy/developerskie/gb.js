const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: "global-ban",
    aliases: ['gban', 'global-ban', "gb"],
    run: async (client, message, args) => {
        if (message.author.id !== config.owner_id) return;
        if (!message.mentions.users.first()) message.reply("Oznacz osobę");
        if (!args[1]) return message.reply("Podaj powód");
        const gb = new MessageEmbed()
        .setTitle("Global ban")
        .addFields(
            {name: "Osoba", value: `${message.mentions.users.first().tag} (${message.mentions.users.first().id})`},
            {name: 'Powód', value: args.join(" ")},
        )
        .setColor("RED")
        client.channels.cache.get("747175231461916734").send(gb);
        client.guilds.cache.forEach(guild => {
            const osoba = guild.members.cache.get(message.mentions.users.first().id)
            osoba.ban({reason: `GLOBAL BAN || ${args.join(" ").slice(1)}`}).catch(e => {})
                console.log(`${guild.name} [${guild.id}] || Brak permisji do banowania!`)
        })
    }
}