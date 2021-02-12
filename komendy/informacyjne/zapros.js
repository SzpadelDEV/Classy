const { MessageEmbed, Collector } = require("discord.js")
const config = require("../../config.json")
const Cooldown_zapros = new Set();

module.exports = {
    name: "zapros",
    aliases: ['zaproś', 'linki'],
run: async (client, message) => {
    if (Cooldown_zapros.has(message.author.id)) return;
    Cooldown_zapros.add(message.author.id)
    message.delete()
    const wybierz_link = new MessageEmbed()
    .setAuthor("Wybierz link", "https://cdn.discordapp.com/emojis/735155450315669525.gif?v=1")
    .setDescription("<:dodaj_bota:747402959159296133> <= **Bot Classy**\n <:link_suppport:747402959482257508> <= **Serwer Support**")
    .setColor(config.kolor)
    const filter = (reaction, user) => {
        return user.id == message.author.id
    }
    message.channel.send(wybierz_link).then(check => {
        let status =  0
        check.react("747402959159296133"), check.react("747402959482257508") ; const collector = check.createReactionCollector(filter, { time: 20000 })
        collector.on("collect", (reaction, user) => {
            if (reaction.emoji == "747402959159296133" && user.id == message.author.id) {
                status = 1
                const user = new MessageEmbed()
                .setAuthor("Link zaproszenia do bota", "https://cdn.discordapp.com/emojis/735510778651738142.png?v=1")
                .setDescription("> https://discord.com/api/oauth2/authorize?client_id=746339267747512402&permissions=8&scope=bot")
                .setColor(config.kolor)
                message.author.send(user)
                collector.stop()
            }
            if (reaction.emoji == "747402959482257508" && user.id == message.author.id) {
                status = 1
                const user2 = new MessageEmbed()
                .setAuthor("Link do serwera Support", "https://cdn.discordapp.com/emojis/735510516344029185.png?v=1")
                .setDescription("> https://discord.gg/jd")
                .setColor(config.kolor)
                message.author.send(user2)
                collector.stop()
            }
    })
    
    collector.on("end", collected => {
        if (status == 1) {
            return check.edit(wybierz_link.setAuthor("Wysłano na PW", config.tak)), check.reactions.removeAll()
        } else {
        check.edit(wybierz_link.setAuthor("Czas na reakcje minął!", config.nie)), check.reactions.removeAll()

        }
    })
    })
    setTimeout(() => {
        Cooldown_zapros.delete(message.author.id)
    }, 20000);
}
}
