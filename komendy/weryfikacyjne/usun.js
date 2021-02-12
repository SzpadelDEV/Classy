const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const fs = require("fs")
const db = require("quick.db")

module.exports = {
    name: "usun",
    aliases: ['usuń'],
run: async (client, message, args) => {
    if (!message.member.roles.cache.has("746259342428209182")) {
        const brak_prem = new Discord.MessageEmbed()
        .setAuthor("Odmowa dostępu!", "https://cdn.discordapp.com/emojis/747402960346021950.gif?v=1")
        .setDescription("`Nie jesteś weryfikatorem reklam!`")
        .setColor("FFFF00")
    return await message.channel.send(brak_prem)
    }

    if (!args[0]) {
        const numerrek = new Discord.MessageEmbed()
        .setAuthor("Podaj Numer!", "https://cdn.discordapp.com/emojis/747402962191646762.gif?v=1")
        .setDescription("Podaj numer reklamy!")
        .setColor("0x8b8c8c")
        return await message.channel.send(numerrek)
    }

    if (!db.get(`reklama_numer_${args[0]}`)) { 
        const brak = new Discord.MessageEmbed()
        .setAuthor("Brak Reklamy!", "https://cdn.discordapp.com/emojis/747402962191646762.gif?v=1")
        .setDescription("Reklama o podanym numerze nie istnieje!")
        .setColor("0x8b8c8c")
    return await message.channel.send(brak) 
    }

    const usunieta = new Discord.MessageEmbed()
    .setAuthor("Usunięto Reklamę!", "https://cdn.discordapp.com/emojis/747402960182706206.gif?v=1")
    .setDescription("Usunięto reklamę o numerze `" + `${args[0]}` + "`")
    .setColor("GREEN")
    await message.channel.send(usunieta)

    const dodaned = new Discord.MessageEmbed()
    .setAuthor("Reklama Usunięta!", "https://cdn.discordapp.com/emojis/747402960182706206.gif?v=1")
    .setDescription("Reklama o numerze `" + `${args[0]}` + "`" + " " + "została **__USUNIĘTA__**") 
    .setFooter(`Weryfikator: ${message.author.tag}`, message.author.displayAvatarURL())
    .setColor("RED")
    client.channels.cache.get("746264838963200071").send(dodaned)
    db.delete(`reklama_numer_${args[0]}`)
}
}