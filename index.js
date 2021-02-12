const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require("./config.json");
const fs = require("fs")
const db = require("quick.db")

const client = new Client();
client.config = config;

["commands", "aliases"].forEach(x => (client[x] = new Collection()));

["./handler/komendy.js"].forEach(x => require(x)(client));

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} załadowany!`)
    client.user.setPresence({ activity: { name: 'Classy 1.0 ┃ ,pomoc' }, status: 'online' })
    let numer = 1
      setInterval(() => {
          client.guilds.cache.forEach(g => {
              if (!db.get(`${g.id}_kanal`)) return;
              if (!client.channels.cache.get(db.get(`${g.id}_kanal`))) return;
              const channel = client.channels.cache.get(db.get(`${g.id}_kanal`));
              const aktualna_reklama = db.get('aktualna_reklama');        
              const aktualne_id = db.get(`reklama_numer_${aktualna_reklama}`);
              const aktualna_reklama_tresc = db.get(`reklama_${aktualne_id}`);
              //if (!db.get(`reklama_${aktualne_id}`)){
                  //channel.send(`
                  //**Numer:** ( ${aktualna_reklama} ) ** ||** **ID"** ( ${aktualne_id} ) ** ||** **CYKL:** ( KOLEJKA )\n${db.get(`reklama_${config.id_serwera_support}`)}`);
                  if (db.get(`reklama_${aktualne_id}`)){
                  channel.send(`
                  **Numer:** ( ${aktualna_reklama} ) ** ||** **ID:** ( ${aktualne_id} ) ** ||** **CYKL:** ( KOLEJKA )
                  ${aktualna_reklama_tresc}`);
              }
          })
          console.log(db.get('aktualna_reklama') + 1);
          db.set('aktualna_reklama', db.get('aktualna_reklama') + 1);
          if (!db.get(`reklama_numer_${db.get('aktualna_reklama')}`)) db.set('aktualna_reklama', 1); console.log("Resetowanie kolejki"); db.set('dlugosc_kolejki', `${new Date().getHours()} : ${new Date().getMinutes()}`)
      }, 600000)
  })

  client.on("message", async message => {
    const prefix = `,`;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        bl = db.get(`blacklist_${message.author.id}`)
        if(bl) {
            return message.channel.send("JESTEŚ NA BLACKLIST :d powód " + bl)
        }
        command.run(client, message, args);
    }
});
client.on('message', async message => {
    const prefix = `<@!${client.user.id}>`;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        bl = db.get(`blacklist_${message.author.id}`)
        if(bl) {
            return message.channel.send("JESTEŚ NA BLACKLIST :d powód " + bl)
        }
        command.run(client, message, args);
    }
})
client.on("message", async message => {
    if (!message.guild) return;
    if (!db.get(`${message.guild.id}_prefix`)) return;
    const prefix = db.get(`${message.guild.id}_prefix`);
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        bl = db.get(`blacklist_${message.author.id}`)
        if(bl) {
            return message.channel.send("JESTEŚ NA BLACKLIST :d powód " + bl)
        }
        command.run(client, message, args);
    }
});

client.on('message', async(message)=>{
    if (message.content === "<@!746339267747512402>") {
        const emb123 = MessageEmbed()
        .setTitle("Ping Bota!")
        .setDescription("Cześć! Oznaczyłeś mnie więc pewnie potrzebujesz pomocy!\n\nMój prefix to `,`\nAby uzyskać listę moich komend wpisz `,pomoc`!")
        .setFooter("Classy - Twój innowacyjny bot reklamowy!")
        message.channel.send(emb123)
    }
});

setInterval(() => {
    client.guilds.cache.forEach(servers_each => {
        
    })
}, 10000)

client.on("guildCreate", async guild => {
    const channel = guild.channels.cache.filter(channel => channel.type !== 'category' && channel.type !== 'dm' && channel.type !== 'unknown').first();
    const invite = await channel.createInvite().url

    const dolaczyl = new MessageEmbed()
    .setAuthor("Bot Dołączył")
    .setThumbnail(guild.iconURL())
    .addField('Właściciel', `${guild.owner.displayName} (${guild.ownerID})`, true)
    .addField('Osoby', `${guild.members.cache.size}`, true)
    .setColor("GREEN")

    const logChannel = await client.channels.cache.get('746110836753432652');

    logChannel.send(dolaczyl)
})

client.on("guildDelete", async guild => {

    const wyszedl = new MessageEmbed()
    .setAuthor("Bot Wyszedł")
    .setThumbnail(guild.iconURL())
    .addField('Właściciel', `${guild.owner.displayName} (${guild.ownerID})`, true)
    .addField('Osoby', `${guild.members.cache.size}`, true)
    .setColor("RED")
    db.delete(`${guild.id}_kanal`)
    db.delete(`${guild.id}_do_weryfikacji`)
    db.delete(`${guild.id}_reklama`)

    const logChannel = await client.channels.cache.get('746110836753432652');

    logChannel.send(wyszedl)
})

client.login(config.token);
