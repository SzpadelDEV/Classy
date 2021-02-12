const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: "prefix",
    run: async (client, message, args) => {
        
        if (!message.member.hasPermission('ADMINISTRATOR')){
            const errEmbed = new MessageEmbed()
            .setDescription("Do użycia tej komendy potrzebujesz uprawnień `ADMINISTRATOR`")
            .setColor("RED")
            return message.channel.send(errEmbed);
        }
        if (!args[0]) return message.channel.send("<a:uwaga:747402959159296041> **Prawidłowe uzycie komendy: `,prefix <prefix_serwera>` / reset: `,prefix reset`**")
        if (args[0] === 'reset'){
            db.delete(`${message.guild.id}_prefix`)
            const usunieto = new MessageEmbed()
            .setDescription("<a:odmowa_dostepu:747402960346021950> **Pomyślnie zresetowano prefix dla tego serwera!**")
            .setColor("YELLOW")
            return message.channel.send(usunieto);
        }
        if (`${args.join("")}`.length > 3){
            const errorEmbed = new MessageEmbed()
            .setDescription("<a:uwaga:747402959159296041> **Prefix może mieć maksymalnie `3` znaki!**")
            .setColor("RED")
            return message.channel.send(errorEmbed);
        }
        db.set(`${message.guild.id}_prefix`, args.join(" "));
        const ustawione = new MessageEmbed()
        .setDescription("<a:super_gratulacje:747402959838511137> **Ustawiono prefix `" + args.join(" ") + "` dla tego serwera**")
        .setColor("GREEN")
        message.channel.send(ustawione);
    }
}