const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const fs = require("fs")
const db = require("quick.db")

module.exports = {
    name: "dodaj",
    aliases: ['akceptuj', 'accept'],
run: async (client, message, args) => {
    if (!message.member.roles.cache.has("746259342428209182")) {
        const brak_prem = new Discord.MessageEmbed()
        .setAuthor("Odmowa dostępu!", "https://cdn.discordapp.com/emojis/747402962191646762.gif?v=1")
        .setDescription("`Nie jesteś weryfikatorem reklam!`")
        .setColor("FFFF00")
    return message.channel.send(brak_prem)
    }

    if (!args[0]) {
        return message.channel.send("Błąd poprawny schemat komendy: `,dodaj [ID] [Numer]`") 
    }

    if (!args[1]){return message.reply("Podaj numer reklamy");}

    if (!db.get(`reklama_${args[0]}`)){return message.reply("Ten serwer nie ma reklamy do weryfikacji");}

    if (!args[1]){return message.reply("Podaj numer reklamy");}

    if (db.get(`reklama_numer_${args[1]}`)){return message.reply("Ten numer jest zajęty!");}

    db.set(`reklama_numer_${args[1]}`, args[0])
    const dodana = new Discord.MessageEmbed()
    .setAuthor("Dodano Reklamę!", "https://cdn.discordapp.com/emojis/747402959838511137.gif?v=1")
    .setDescription("Dodano reklamę pod numer `" + `${args[1]}` + "`\n")
    .setColor("GREEN")
    message.channel.send(dodana)

    const dodaned = new Discord.MessageEmbed()
    .setAuthor("Reklama Dodana!", "https://cdn.discordapp.com/emojis/747402959838511137.gif?v=1")
    .setDescription("Reklama serwera `" + `${client.guilds.cache.get(args[0]).name}` + "`" + " " + "została **__DODANA__** pod numer" + "  `" + `${args[1]}` + "`") 
    .setFooter(`Weryfikator: ${message.author.tag}`, message.author.displayAvatarURL())
    .setColor("GREEN")
    client.channels.cache.get("746264838963200071").send(dodaned)
    db.delete(`${args[0]}_do_weryfikacji`);
}
}