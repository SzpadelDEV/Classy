const Discord = require("discord.js")
const { MessageEmbed, VoiceChannel } = require("discord.js")
const fs = require("fs")
const db = require('quick.db')

module.exports = {
    name: "kanal",
    aliases: ['kanał', 'k-ustaw', 'kanal-ustaw'],
    run: async (client, message, args) => {
    const kanal = message.mentions.channels.first()

    if (!message.member.hasPermission('MANAGE_GUILD') && !message.member.hasPermission('ADMINISTRATOR')){
        const errEmbed = new MessageEmbed
        .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/747402962191646762.gif?v=1")
        .setDescription("Nie masz uprawnień `MANAGE-CHANNELS`")
        .setColor("RED")
        return message.channel.send(errEmbed);
    }

    if (!kanal){
        const blad = new Discord.MessageEmbed()
        .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/747402962191646762.gif?v=1")
        .setDescription("`Oznacz kanał!`")
        .setColor("RED")
    return message.channel.send(blad)
    }

    if (!message.guild.channels.cache.get(message.mentions.channels.first().id)){
        const errEmbed1 = new MessageEmbed()
        .setAuthor("Błąd", "https://cdn.discordapp.com/emojis/747402962191646762.gif?v=1")
        .setDescription("Oznacz kanał z tego serwera")
        .setColor("RED")
        return message.channel.send(errEmbed1);
    }

    if (message.mentions.channels.first().type === VoiceChannel){
        const errEmbed = new MessageEmbed()
        .setAuthor("Błąd", "https://cdn.discordapp.com/emojis/747402962191646762.gif?v=1")
        .setDescription("Kanał nie może być kanałem głosowym!")
        .setColor("RED")
        return message.channel.send(errEmbed);
    }
    if (db.get(`${message.guild.id}_kanal`)){
        db.set('usuniete_kanaly_reklam', db.get('usuniete_kanaly_reklam') +` || ${db.get(`${message.guild.id}_kanal`)}`);
        db.set('usuniete_kanaly_reklam', db.get('usuniete_kanaly_reklam').split(message.mentions.channels.first().id))
    }

    const sucess = new Discord.MessageEmbed()
    .setDescription("<a:tak_gratulacje:747402961549787197> **Pomyślnie** ustawiono kanał do reklam!")
    .setColor(0x2ecc71)
    message.channel.send(sucess)

    kanal.setTopic('Tu wysyła reklamy **Classy** <a:uwaga:747402959159296041>')

        const log_ustawione = new MessageEmbed()
        .setTitle("Ustawiono kanał reklam")
        .addFields(
            {name: "Serwer", value: `${message.guild.name} (${message.guild.id})`, inline: true},
            {name: "Osoba", value: `${message.author.tag} (${message.author.id})`, inline: true},
        )
        client.channels.cache.get("747175231461916734").send(log_ustawione)
        db.set(`${message.guild.id}_kanal`, message.mentions.channels.first().id)
    }
}
