const { MessageEmbed, discord } = require("discord.js");
const { cyan, red_light } = require("../../colours.json");
const db = require('quick.db');
const send = require('quick.hook');
const moment = require('moment');


module.exports = {
    name: "blacklist",
    aliases: ['blokada', 'bl'],
    run: async (client, message, args) => {
        const kanal = client.channels.cache.get("692734175324799016")
        if (message.author.id == "414536807334805506") {
            if (args[0] == 'dodaj') {
                const idbl = args[1]
                let powod = args.slice(2).join(' ');
                if (!idbl) return message.channel.send(`<@${message.author.id}> podaj ID osoby, którą mam dodać do blacklisty!`);
                if (!powod) {
                    powod = "Nie podano odpowiedniego powodu blacklisty!"
                }
                db.set(`blacklist_${idbl}`, `${powod}`)

                let blpeople = await client.users.cache.get(idbl);
                const embed3 = new MessageEmbed()
                .setColor("#ff0000")
                .setTitle("Dodawanie do blacklisty")
                .setDescription(`Pomyślnie dodałeś ( <@${idbl}> ) do blacklisty.\nNie może on od teraz używać komend Classy!`)
                message.channel.send(embed3);
                client.channels.cache.get("747175231461916734").send(`Użytkownik o id ${idbl} został dodany na blacklistę!\mPowód ${powod}`)
                return;
            }
            if (args[0] == 'usun') {
                const idbl = args[1]
                //let powod = args.slice(2).join(' ');
                if (!idbl) return message.channel.send(`<@${message.author.id}> podaj ID osoby, którą mam usunąć z blacklisty!`);
                //if(!powod){
                //  powod = "Nie podano"
                //}
                db.delete(`blacklist_${idbl}`)
                let blpeople = await client.users.cache.get(idbl);
                const embed2 = new MessageEmbed()
                .setColor("#34eb46")
                .setTitle("Usuwanie z blacklisty")
                .setDescription(`Pomyślnie usunąłeś ( <@${idbl}> ) z blacklisty.\nMoże on od teraz używać komend Classy!`)
                message.channel.send(embed2);
                return;
            }
        }
        if (message.author.id == "692734175324799016") {
            if (args[0] == 'dodaj') {
                const idbl = args[1]
                let powod = args.slice(2).join(' ');
                if (!idbl) return message.channel.send(`<@${message.author.id}> podaj ID osoby, którą mam dodać do blacklisty!`);
                if (!powod) {
                    powod = "Nie podano odpowiedniego powodu blacklisty!"
                }
                db.set(`blacklist_${idbl}`, `${powod}`)

                let blpeople = await client.users.cache.get(idbl);
                const embed1 = new MessageEmbed()
                .setColor("#ff0000")
                .setTitle("Dodawanie do blacklisty")
                .setDescription(`Pomyślnie dodałeś ( <@${idbl}> ) do blacklisty.\nNie może on od teraz używać komend Classy!`)
                message.channel.send(embed1)
                client.channels.cache.get("747175231461916734").send(`Użytkownik o id ${idbl} został dodany na blacklistę!\mPowód ${powod}`)
                return;
            }
            if (args[0] == 'usun') {
                const idbl = args[1]
                //let powod = args.slice(2).join(' ');
                if (!idbl) return message.channel.send(`<@${message.author.id}> podaj ID osoby, którą mam usunąć z blacklisty!`);
                //if(!powod){
                //  powod = "Nie podano"
                //}
                db.delete(`blacklist_${idbl}`)
                let blpeople = await client.users.cache.get(idbl);
                const embed = new MessageEmbed()
                .setColor("#34eb46")
                .setTitle("Usuwanie z blacklisty!")
                .setDescription(`Pomyślnie usunąłeś ( <@${idbl}> ) z blacklisty.\nMoże on od teraz używać komend Classy!`)
                message.channel.send(embed);
                return;
            }
        }

    }
}
