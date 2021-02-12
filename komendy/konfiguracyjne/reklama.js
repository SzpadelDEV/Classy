const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const fs = require("fs")
const db = require("quick.db")
const config = require("../../config.json")

module.exports = {
    name: "reklama",
    aliases: ['r', 'reklama-ustaw', 'r-u'],
run: async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_GUILD') && !message.member.hasPermission('ADMINISTRATOR')){
        const errEmbed = new MessageEmbed
        .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/747402962191646762.gif?v=1")
        .setDescription("Nie masz uprawnień `MANAGE-CHANNELS`")
        .setColor("RED")
        return message.channel.send(errEmbed);
    }
    
    if (!db.get(`${message.guild.id}_kanal`) || !message.guild.channels.cache.get(db.get(`${message.guild.id}_kanal`))){
        const brak_kanal = new Discord.MessageEmbed()
        .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/747402962191646762.gif?v=1")
        .setDescription("`Oznacz najpierw kanał!`")
        .setColor("RED")
        return await message.channel.send(brak_kanal)
    }

    if (args.join(" ").length < 25){
        return message.channel.send(new MessageEmbed()
        .setColor("RED")
        .setDescription("<a:uwaga:747402959159296041> **Reklama musi mieć co najmniej** __`25`__ **znaków!**"))
    }
    
    if (!args[0]) {
        const brak = new Discord.MessageEmbed()
        .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/747402962191646762.gif?v=1")
        .setDescription("`Podaj treść reklamy`")
        .setColor("RED")
    return message.channel.send(brak)
    }

    if (db.get(`${message.guild.id}_do_weryfikacji`)){
        const errEmbed = new Discord.MessageEmbed()
        .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/747402962191646762.gif?v=1")
        .setDescription("Reklama oczekuję na weryfikację")
        .setColor("RED")
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        return message.channel.send(errEmbed);
    }

    if (`${args}`.includes('discord.gg')) {
        const ehhhh = new Discord.MessageEmbed()
        .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/747402962191646762.gif?v=1")
        .setDescription("`W reklamie nie może być linku z zaproszeniem, ponieważ bot doda je sam!`")
        .setColor("RED")
        return message.channel.send(ehhhh)
    }

    client.channels.cache.get(db.get(`${message.guild.id}_kanal`)).createInvite({maxAge: 0})
    .then(invite => {

    db.set(`${message.guild.id}_do_weryfikacji`, args.join(" "))
    const wyslano = new Discord.MessageEmbed()
    .setAuthor("Ustawiono", "https://cdn.discordapp.com/emojis/747402961549787197.gif?v=1")
    .setDescription("`Reklama została wysłana do weryfikacji!`")
    .setColor(0x2ecc71)
    message.channel.send(wyslano)
   
    const wery = new Discord.MessageEmbed()
    .setAuthor("Nowa reklama", "https://cdn.discordapp.com/emojis/747402959985311775.gif?v=1")
    .addField("Serwer:", `${message.guild.name} | ${message.guild.id}`)
    .addField("Osoba:", `${message.author.tag} | ${message.author.id}`)
    .setDescription("``` " + `${args.join(" ")}` + `\n https://discord.gg/${invite.code}` + "```")
    .addField("Zaproszenie: `Kliknij`", `[**Zaproszenie**](https://discord.gg/${invite.code})`)
    .setColor(config.kolor)
    client.channels.cache.get("747174168436408350").send(wery)
    db.set(`reklama_${message.guild.id}`, `${args.join(" ")}\nhttps://discord.gg/${invite.code}`)
    })
}
}