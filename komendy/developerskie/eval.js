const { owner_id, prefix } = require("../../config.json");
const { MessageEmbed } = require("discord.js")
const { inspect } = require("util")

module.exports = {
    name: "eval",
    aliases: ['evalution', 'e', "execute"],
    run: async (client, message, args) => {
        if(message.author.id == "692734175324799016") {
            try {
                let toEval = args.join(" ")
                let evaluated = inspect(eval(toEval, { depth: 0 }));

                if (!toEval) {
                    return message.channel.send(`Ta niepokojąca otchłań w tej komendzie to inaczej \`pustkowie\``);
                } else {
                    let hrStart = process.hrtime()
                    let hrDiff;
                    hrDiff = process.hrtime(hrStart);
                    const embed = new MessageEmbed()
                        .setTitle("Evalution")
                        .addField("Argument:", `\`\`\`${args.join(" ")}\`\`\``)
                        .addField("Odpowiedź:", `*Czas odpowiedzi: ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })
                    return message.channel.send(embed)
                }

            } catch (e) {
                return message.channel.send(`Błąd: \`${e.message}\``);
            }

        }
        if(message.author.id == "414536807334805506") {
            try {
                let toEval = args.join(" ")
                let evaluated = inspect(eval(toEval, { depth: 0 }));

                if (!toEval) {
                    return message.channel.send(`Ta niepokojąca otchłań w tej komendzie to inaczej \`pustkowie\``);
                } else {
                    let hrStart = process.hrtime()
                    let hrDiff;
                    hrDiff = process.hrtime(hrStart);
                    const embed = new MessageEmbed()
                        .setTitle("Evalution")
                        .addField("Argument:", `\`\`\`${args.join(" ")}\`\`\``)
                        .addField("Odpowiedź:", `*Czas odpowiedzi: ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })
                    return message.channel.send(embed)
                }

            } catch (e) {
                return message.channel.send(`Błąd: \`${e.message}\``);
            }

        }


        else {
            return message.reply("Nie wykryłem twojego ID w mojej bazie dla developerów. Jeśli jesteś developerem bota, skontaktuj się z `Axy$jas.dev#2343`").then(msg => msg.delete(5000))
        }
    }
}