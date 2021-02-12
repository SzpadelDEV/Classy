const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const config = require("../../config.json")
const db = require("quick.db")
module.exports = {
    name: "pomoc",
    aliases: ['help', 'komendy'],
run: async (client, message) => {
    let prefix = config.prefix;
    if (db.get(`${message.guild.id}_prefix`)){
    prefix = db.get(`${message.guild.id}_prefix`)
    }
    if (message.author.id === "631501243759591505") {
        message.reply("Mondonno czemu kopiujesz?")
    }

     const pomoc_embed = new Discord.MessageEmbed()
     .setTitle("Menu pomocy!", "https://cdn.discordapp.com/emojis/616339705373523973.gif?v=1")
     .addField("Ogólne:", "<a:strzalka_bok:747402959251308574> `" + prefix + "pomoc` - *Pokazuje wszystkie komendy* \n<a:strzalka_bok:747402959251308574> `" + prefix + "zapros` - *Wysyła wszystkie linki*")
     .addField("Reklamowe:", "<a:strzalka_bok:747402959251308574> `" + prefix +  "kanal <#kanał>` - *Ustawia kanał z reklamami* \n<a:strzalka_bok:747402959251308574> `" + prefix + "reklama <treść>` - *Ustawia reklamę serwera*\n<a:strzalka_bok:747402959251308574> `" + prefix + "zobacz` - *Pokazuję treść reklamy twoje serwera*")
     .addField("Nasza Strona:", "<:strona_www:747402960040099881> https://bot-classy.pl/")
     .addField("Pola:", "`<>` • **WYMAGANE**\n`[]` • **OPCJONALNE**")
     .addField("Przydatne: `Kliknij`", "<a:biale_bok:747402959259959336> [`Serwer Support`](https://discord.gg/Yye6vrx) \n<a:biale_bok:747402959259959336> [`Link do bota`](https://discord.com/api/oauth2/authorize?client_id=746339267747512402&permissions=8&scope=bot)")
     .setColor(config.kolor)
     message.channel.send(pomoc_embed)
}
}