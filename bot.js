////// ASTARIUS
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`Bot Aktif!`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000); // 5 Dakika
/////// ASTARIUS
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
require("./util/eventLoader.js")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
//client.on("debug", e => {
// console.log(chalk.bgBlue.green(e.replace(regToken, "that was redacted")));
//});

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});
client.login(ayarlar.token);
//// ETIKET
client.on("message", message => {
  if (message.content === `<@733230068159217694>`) {
    const etiketcevap = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Thetis")
      .setDescription(
        `Thetis Bot,discord.js kütüphanesi ile yapılmıştır.\nSizlere \`Koruma, Eğlence, Moderasyon, Müzik, Kullanıcı, Davet, Seviye\` sistemlerini ücretsiz sunan discord botudur.\n\n**Yardım Komudum: **\`${prefix}\`yardım`
      )
      .setFooter(`Prefixim : ${prefix}`);
    return message.channel.send(etiketcevap);
  }
});
/// KURUCU EKLEME MESAJ
client.on("guildCreate", async guild => {
  const chypercode = new Discord.RichEmbed()

    .setColor("RANDOM")
    .setDescription(
      "Beni eklediğiniz için teşekkür ederim!\nBotun düzgün çalışması için lütfen **bot rolünü** en üste taşıyın!\nAksi takdirde bot çalışmaz!\n\n`Bu mesaj sadece discord kurucusuna atılmıştır.`"
    )
    .setFooter("Thetis");
  guild.owner.send(chypercode);
});
//////////////////////////////////////////////////////////////////////////////////

//-----------------------KOMUTLAR-----------------------\\

/// GIRIS CIKIS  -  YAZILI
client.on("guildMemberAdd", async member => {
  let girenKisi = client.users.get(member.id);
  let girisKanal = client.channels.get(db.fetch(`hgK_${member.guild.id}`));
  let Güvenli = `Güvenli <a:evet:726943601208197170>`;
  let Şüpheli = `Şüpheli <a:uyari:726935688913748039>`;

  const ktarih = new Date().getTime() - girenKisi.createdAt.getTime();
  var kontrol;
  if (ktarih > 2629800000) kontrol = Güvenli;
  if (ktarih < 2629800001) kontrol = Şüpheli;
  let kanal = await db.fetch(`hgK_${member.guild.id}`);
  if (!kanal) return;
  const giris = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(
      `<a:elmas:726935401553461299> ${member} Adlı kullanıcı sunucuya katıldı!\n\n:busts_in_silhouette: **Yeni Kullanıcı Sayısı** • \`${member.guild.memberCount}\`\n:bust_in_silhouette: **Kullanıcı ID** • \`${member.user.id}\`\n:shield: **Güvenlik Durumu** • ${kontrol}`
    );
  client.channels.get(kanal).send(giris);
});
client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`baybayK_${member.guild.id}`);
  if (!kanal) return;
  const cikis = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(
`:x: ${member} Adlı kullanıcı sunucudan ayrıldı!\n\n:busts_in_silhouette: **Yeni Kullanıcı Sayısı** • \`${member.guild.memberCount}\`\n:bust_in_silhouette: **Kullanıcı ID** • \`${member.user.id}\``
    );
  client.channels.get(kanal).send(cikis);
});






//-----------------------emojili kayıt--------------------\\
//-----------------------emojili kayıt--------------------\\
//-----------------------emojili kayıt--------------------\\
const events = {
  MESSAGE_REACTION_ADD: "messageReactionAdd",
  MESSAGE_REACTION_REMOVE: "messageReactionRemove"
};
client.on("raw", async event => {
  if (!events.hasOwnProperty(event.t)) return;
  const { d: data } = event;
  const anto = client.users.get(data.user_id);
  const channel =
    client.channels.get(data.channel_id) || (await anto.createDM());
  if (channel.messages.has(data.message_id)) return;
  const message = await channel.fetchMessage(data.message_id);
  const emojiKey = data.emoji.id
    ? `${data.emoji.name}:${data.emoji.id}`
    : data.emoji.name;
  const reaction = message.reactions.get(emojiKey);
  client.emit(events[event.t], reaction, anto);
});
client.on("messageReactionAdd", (reaction, user) => {
  if (reaction.message.id == "727916325196005377") {
    //Geçerli olması istediğiniz mesajın ID'sini yazabilirsiniz.
    if (reaction.emoji.name == "thetis") {
      //Dilediğini emojiyi koyabilirsiniz.
      reaction.message.guild.members
        .get(user.id)
        .addRole(reaction.message.guild.roles.find("name", "► Kullanıcılar ◄")); //Dilediğiniz rolün adını yazabilirsiniz.
    }

    if (reaction.emoji.name == "thetis") {
      //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members
        .get(user.id)
        .removeRole(
          reaction.message.guild.roles.find("name", "Lütfen Kayıt Olunuz❗")
        ); //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.name == "html") {
      //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members
        .get(user.id)
        .addRole(reaction.message.guild.roles.find("name", "</>・Html")); //Dilediğiniz rolün adını yazabilirsiniz.
    }
    if (reaction.emoji.name == "Emoji") {
      //Dilediğiniz emojiyi koyabilirsiniz.
      reaction.message.guild.members
        .get(user.id)
        .addRole(reaction.message.guild.roles.find("name", "rol")); //Dilediğiniz rolün adını yazabilirsiniz.
    }
  }
});
//--------------------emojili kayıt son-------------------\\
//--------------------emojili kayıt son-------------------\\
//--------------------emojili kayıt son-------------------\\

//-----------------------Sayaç-----------------------\\
//-----------------------Sayaç-----------------------\\
//-----------------------Sayaç-----------------------\\

client.on("guildMemberAdd", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const sayac1 = new Discord.RichEmbed()
  .setDescription(`:loudspeaker: :inbox_tray: Kullanıcı katıldı. \` ${sayac}\` kişi olmamıza \`${sayac -
      member.guild.members.size}\` kişi kaldı! :white_check_mark: \`${
      member.user.username
    }\``)
   const skanal31 = member.guild.channels.find("name", skanal9);
    if (!skanal31) return;
    skanal31.send(sayac1)
});

client.on("guildMemberRemove", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const sayac2 = new Discord.RichEmbed()
.setDescription(    
  `:loudspeaker: :outbox_tray: Kullanıcı ayrıldı. \` ${sayac}\` kişi olmamıza \`${sayac -
      member.guild.members.size}\` kişi kaldı! :x: \`${member.user.username}\``)
    const skanal31 = member.guild.channels.find("name", skanal9);
    if (!skanal31) return;
    skanal31.send(sayac2)
});

//-----------------------Sayaç Son-----------------------\\
//-----------------------Sayaç Son-----------------------\\
//-----------------------Sayaç Son-----------------------\\

//-----------------------SunucuKur-----------------------\\
//-----------------------SunucuKur-----------------------\\

//sunucu-kur1.js
//sunucu-kur2.js

//-----------------------SunucuKur Son-----------------------\\
//-----------------------SunucuKur Son-----------------------\\
//-----------------------SunucuKur Son-----------------------\\
//-----------------------SunucuKur Son-----------------------\\

//-----------------------Sa-As-----------------------\\
//-----------------------Sa-As-----------------------\\
//-----------------------Sa-As-----------------------\\
//-----------------------Sa-As-----------------------\\

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "sa") {
      msg.reply(`Aleyküm selam hoşgeldin,nasılsın?`);
    }
  }
});

client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "hi") {
      msg.reply("Hi bro");
    }
  }
});

//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\
//-----------------------Sa-As Son-----------------------\\
//-----------------------Büyük Harf-----------------------\\
//-----------------------Büyük Harf-----------------------\\
//-----------------------Büyük Harf-----------------------\\
//-----------------------Büyük Harf-----------------------\\

client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(
                `Bu sunucuda Caps Lock Engelleme sistemi kullanılıyor.Bu yüzden mesajını sildim!`
              )
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});

//-----------------------Büyük Harf Son-----------------------\\
//-----------------------Büyük Harf Son-----------------------\\
//-----------------------Büyük Harf Son-----------------------\\
//-----------------------Büyük Harf Son-----------------------\\

//-----------------------Eklendim-Atıldım-----------------------\\
//-----------------------Eklendim-Atıldım-----------------------\\
//-----------------------Eklendim-Atıldım-----------------------\\
//-----------------------Eklendim-Atıldım-----------------------\\

//-----------------------Eklendim-Atıldım Son-----------------------\\
//-----------------------Eklendim-Atıldım Son-----------------------\\
//-----------------------Eklendim-Atıldım Son-----------------------\\
//-----------------------Eklendim-Atıldım Son-----------------------\\

//-----------------------Reklam Engel Link Engel-----------------------\\
//-----------------------Reklam Engel Link Engel-----------------------\\
//-----------------------Reklam Engel Link Engell-----------------------\\
//-----------------------Reklam Engel Link Engel-----------------------\\

client.on("message", async message => {
  let aktif = await db.fetch(`reklamEngelcodeshare_${message.channel.id}`);
  if (!aktif) return;
  let reklamlar = [
    "discord.app",
    "discord.gg",
    "discordapp",
    "discordgg",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az",
    ".cf",
    ".me",
    ".in"
  ];
  let kelimeler = message.content.slice(" ").split(/ +/g);
  if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {
    if (message.member.hasPermission("BAN_MEMBERS")) return;
    message.delete();
    message.reply("Reklamları engelliyorum!").then(msg => msg.delete(7000));
  }
});
client.on("messageUpdate", async (oldMsg, newMsg) => {
  let aktif = await db.fetch(`reklamEngelcodeshare_${oldMsg.channel.id}`);
  if (!aktif) return;
  let reklamlar = [
    "discord.app",
    "discord.gg",
    "discordapp",
    "discordgg",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az",
    ".cf",
    ".me",
    ".in"
  ];
  let kelimeler = newMsg.content.slice(" ").split(/ +/g);
  if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {
    if (newMsg.member.hasPermission("BAN_MEMBERS")) return;
    newMsg.delete();
    oldMsg.reply("Reklamları engelliyorum!").then(msg => msg.delete(7000));
  }
});

//-----------------------Reklam Engel Son-----------------------\\
//-----------------------Reklam Engel Son-----------------------\\
//-----------------------Reklam Engel Son-----------------------\\
//-----------------------Reklam Engel Son-----------------------\\

//----------------------REKLAM BAN SİSTEMİ---------------------\\
//----------------------REKLAM BAN SİSTEMİ---------------------\\
//----------------------REKLAM BAN SİSTEMİ---------------------\\

client.on("message", async message => {
  let kişiuyari = await db.fetch(
    `uyarisayisi_${message.author.id}${message.guild.id}`
  );
  let sınır = await db.fetch(`reklamsınır_${message.guild.id}`);
  let reklambanayar = await db.fetch(`reklambanayar_${message.guild.id}`);
  let kullanici = message.member;
  const reklambankelimeler = [
    "discord.app",
    "discord.gg",
    "invite",
    "discordapp",
    "discordgg"
  ];
  if (reklambanayar == "kapali") return;
  if (reklambanayar == "acik") {
    if (
      reklambankelimeler.some(word =>
        message.content.toLowerCase().includes(word)
      )
    ) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        db.add(`uyarisayisi_${message.author.id}${message.guild.id}`, 1);
        let reklambanuyari = new Discord.RichEmbed()
          .addField(
            `Reklam Ban Sistemi Tarafından Discord Reklamı Engellendi :thumbsup:`,
            `Sunucu Reklamını Atan Kişi: **${message.author.tag}**\nUyarı Sayısı: **${kişiuyari}/${sınır}**`
          )
          .setTimestamp()
          .setFooter(`${client.user.username}`, client.user.avatarURL);
        message.channel
          .send(reklambanuyari)
          .then(message => message.delete(10000));
        if (kişiuyari == sınır) {
          message.delete();
          kullanici.ban({
            reason: `${client.user.username} Reklam Oto Ban Sistemi`
          });
          db.set(`uyarisayisi_${message.author.id}${message.guild.id}`, 1);
          let yeteramkreklamban = new Discord.RichEmbed()
            .addField(
              `Reklam Ban Sistemi Reklam Yapan Kişiyi Banladı :white_check_mark:`,
              `Reklamdan Banlanan Kişi: **${kullanici}**`
            )
            .setTimestamp(new Date())
            .setFooter(
              `${client.user.username} Blocker`,
              client.user.avatarURL
            );
          message.channel.send(yeteramkreklamban);
        }
      }
    }
  }
});

//------------------REKLAM BAN SİSTEMİ SON---------------------\\
//------------------REKLAM BAN SİSTEMİ SON---------------------\\
//------------------REKLAM BAN SİSTEMİ SON---------------------\\

//-----------------------Modlog-----------------------\\
//-----------------------Modlog-----------------------\\
//-----------------------Modlog-----------------------\\
//-----------------------Modlog-----------------------\\
client.on("channelCreate", async channel => {
  const c = channel.guild.channels.get(
    db.fetch(`codeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.RichEmbed()
    .addField(
      `Kanal oluşturuldu`,
      ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n► ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("channelDelete", async channel => {
  const c = channel.guild.channels.get(
    db.fetch(`codeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  let embed = new Discord.RichEmbed()
    .addField(
      `Kanal silindi`,
      ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n��� ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );

  c.send(embed);
});

client.on("channelNameUpdate", async channel => {
  const c = channel.guild.channels.get(
    db.fetch(`codeminglog_${channel.guild.id}`)
  );
  if (!c) return;
  var embed = new Discord.RichEmbed()
    .addField(
      `Kanal İsmi değiştirildi`,
      ` Yeni İsmi: \`${channel.name}\`\n► ID: ${channel.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${channel.client.user.username}#${channel.client.user.discriminator}`,
      channel.client.user.avatarURL
    );
  c.send(embed);
});

client.on("emojiCreate", emoji => {
  const c = emoji.guild.channels.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

  let embed = new Discord.RichEmbed()
    .addField(
      `Emoji oluşturuldu`,
      ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\n► ID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiDelete", emoji => {
  const c = emoji.guild.channels.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

  let embed = new Discord.RichEmbed()
    .addField(
      `Emoji silindi`,
      ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\n► ID: ${emoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${emoji.client.user.username}#${emoji.client.user.discriminator}`,
      emoji.client.user.avatarURL
    );

  c.send(embed);
});
client.on("emojiUpdate", (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.get(
    db.fetch(`codeminglog_${newEmoji.guild.id}`)
  );
  if (!c) return;

  let embed = new Discord.RichEmbed()
    .addField(
      `Emoji güncellendi`,
      ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\n► ID: ${oldEmoji.id}`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`,
      newEmoji.client.user.avatarURL
    );

  c.send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  const channel = guild.channels.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `Kullanıcı banlandı`,
      ` İsmi: \`${user.username}\`\n ID: **${
        user.id
      }**\n Sebep: **${entry.reason || "Belirtmedi"}**\n Banlayan: **${
        entry.executor.username
      }#${entry.executor.discriminator}**`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${entry.executor.username}#${entry.executor.discriminator} tarafından`,
      entry.executor.avatarURL
    );

  channel.send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  const channel = guild.channels.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
    .addField(
      `Kullanıcının banı açıldı`,
      ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`
    )
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${entry.executor.username}#${entry.executor.discriminator} tarafından`,
      entry.executor.avatarURL
    );

  channel.send(embed);
});
client.on("messageDelete", async message => {
  if (message.author.bot) return;

  const channel = message.guild.channels.get(
    db.fetch(`codeminglog_${message.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.RichEmbed()
    .setAuthor(
      `${message.author.username}#${message.author.discriminator}`,
      message.author.avatarURL
    )
    .setTitle("Mesaj silindi")
    .addField(
      `Silinen mesaj : ${message.content}`,
      `Kanal: ${message.channel.name}`
    )
    //  .addField(`Kanal:`,`${message.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${message.client.user.username}#${message.client.user.discriminator}`,
      message.client.user.avatarURL
    );

  channel.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (oldMessage.content == newMessage.content) return;

  const channel = oldMessage.guild.channels.get(
    db.fetch(`codeminglog_${oldMessage.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.RichEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ", `${oldMessage.content}`)
    .addField("Yeni mesaj : ", `${newMessage.content}`)
    .addField("Kanal : ", `${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(
      `${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,
      `${oldMessage.client.user.avatarURL}`
    );

  channel.send(embed);
});

client.on("roleCreate", async role => {
  const channel = role.guild.channels.get(
    db.fetch(`codeminglog_${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.RichEmbed()
    .addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)
    .setTimestamp()
    .setColor("RANDOM")
    .addField("Rol renk kodu : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed);
});

client.on("roleDelete", async role => {
  const channel = role.guild.channels.get(
    db.fetch(`codeminglog_${role.guild.id}`)
  );
  if (!channel) return;

  let embed = new Discord.RichEmbed()
    .addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)
    .setTimestamp()
    .setColor("RANDOM")
    .addField("Rol renk kodu : ", `${role.hexColor}`)
    .setFooter(
      `${role.client.user.username}#${role.client.user.discriminator}`,
      role.client.user.avatarURL
    );

  channel.send(embed);
});
client.on("voiceStateUpdate", (oldMember, newMember) => {
  // if (!logA[oldMember.guild.id]) return;

  if (db.has(`codeminglog_${oldMember.guild.id}`) === false) return;

  var kanal = oldMember.guild.channels.get(
    db
      .fetch(`codeminglog_${oldMember.guild.id}`)
      .replace("<#", "")
      .replace(">", "")
  );
  if (!kanal) return;

  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;

  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        `${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`
      );
    kanal.send(embed);
  } else if (newUserChannel === undefined) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        `${newMember.user.tag} adlı kullanıcı sesli kanaldan çıkış yaptı!`
      );
    kanal.send(embed);
  }
});

//-----------------------Modlog Son-----------------------\\
//-----------------------Modlog Son-----------------------\\
//-----------------------Modlog Son-----------------------\\
//-----------------------Modlog Son-----------------------\\

//--------------------ROL KORUMA

client.on("roleCreate", async (rolee, member, guild) => {
  let rolkoruma = await db.fetch(`rolk_${rolee.guild.id}`);
  if (rolkoruma == "acik") {
    rolee.delete();
    const embed = new Discord.RichEmbed()
      .setDescription(
        "Sunucunuzda yeni bir rol oluşturuludu! fakat geri silindi! (Rol Koruma Sistemi)"
      )
      .setColor("BLACK");
    rolee.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});

client.on("channelDelete", async channel => {
  if (!channel.guild.me.hasPermission("MANAGE_CHANNELS")) return;
  let guild = channel.guild;
  const logs = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" });
  let member = guild.members.get(logs.entries.first().executor.id);
  if (!member) return;
  if (member.hasPermission("ADMINISTRATOR")) return;
  channel
    .clone(channel.name, true, true, "Kanal silme koruması sistemi")
    .then(async klon => {
      if (!db.has(`korumalog_${guild.id}`)) return;
      let logs = guild.channels.find(
        ch => ch.id === db.fetch(`korumalog_${guild.id}`)
      );
      if (!logs) return db.delete(`korumalog_${guild.id}`);
      else {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Silinen Kanal: <#${klon.id}> (Yeniden oluşturuldu!)\nSilen Kişi: ${member.user}`
          )
          .setColor("RED")
          .setAuthor(member.user.tag, member.user.displayAvatarURL);
        logs.send(embed);
      }
      await klon.setParent(channel.parent);
      await klon.setPosition(channel.position);
    });
});

//--------------------ROL KORUMA SON-----------------\\

//------------------OTOROL ---------------------------\\

client.on("guildMemberAdd", async member => {
  let kanal = db.fetch(`codemingkanal_${member.guild.id}`);
  let rol = db.fetch(`codemingrol_${member.guild.id}`);
  let mesaj = db.fetch(`codemingmesaj_${member.guild.id}`);

  if (!kanal) return;
  member.addRole(rol);
  if (!mesaj) {
    const otorol1 = new Discord.RichEmbed()
        .setDescription(":loudspeaker: :inbox_tray: Otomatik rol verildi seninle beraber **`" +
          member.guild.memberCount +
          "`** kişiyiz! <a:evet:726943601208197170> hoşgeldin! **`" +
          member.user.username +
          "`**")
    client.channels.get(kanal).send(otorol1);
  } else {
    var mesajs = mesaj
      .replace("-uye-", `${member.author.tag}`)
      .replace("-uyetag-", `${member.author.username}`)
      .replace("-server-", `${member.guild.name}`)
      .replace(
        "-rol-",
        member.guild.roles.get(db.fetch(`codemingrol_${member.guild.id}`)).name
      )
      .replace(
        "-onlineuyesayısı-",
        member.guild.members.filter(s => s.presenceStatus === "online").size
      )
      .replace("-botsayisi-", member.guild.members.filter(s => s.bot).size)
      .replace("-kanalsayisi-", member.guild.channels.size)
      .replace("-uyesayisi-", member.guild.memberCount)
      .replace("-bolge-", member.guild.region);

    client.channels.get(kanal).send(mesajs);
  }
});

//-------------OTOROL SON------------------\\

//------------------KÜFÜR ENGEL-----------------\\

client.on("message", async msg => {
  //const args = msg.content.slice.split(' ');
  const args = msg.content.trim().split(/ +/g);
  const fAK = await db.fetch(`filtreAK_${msg.guild.id}`);
  let mesaj = args.slice(1).join(" ");
  const filtre = await db.fetch(`filtre_${msg.guild.id}`);
  const kufur = [
    "mk",
    "göt",
    "amk",
    "amq",
    "aq",
    "orospu",
    "oruspu",
    "oç",
    "sikerim",
    "yarrak",
    "piç",
    "amq",
    "sik",
    "amcık",
    "çocu",
    "sex",
    "seks",
    "amına",
    "orospu çocuğu",
    "sg",
    "siktir git"
  ];

  const reklam = [
    ".ml",
    "discord.gg",
    "invite",
    "discordapp",
    "discordgg",
    ".com",
    ".net",
    ".xyz",
    ".tk",
    ".pw",
    ".io",
    ".me",
    ".gg",
    "www.",
    "https",
    "http",
    ".gl",
    ".org",
    ".com.tr",
    ".biz",
    ".party",
    ".rf.gd",
    ".az",
    "glitch.me",
    "glitch.com",
    "gg.gg",
    "gq"
  ];

  let kufures = await db.fetch(`kuyarr_${msg.author.id}`);
  let linkes = await db.fetch(`luyarr_${msg.author.id}`);
  let ads = msg.author.id;
  if (fAK == "açık") {
    const fltr = filtre;
    if (fltr.some(word => msg.content.includes(word))) {
      if (!msg.member.hasPermission("BAN_MEMBERS")) {
        msg.delete();

        var k = new Discord.RichEmbed()
          .setColor("#01CFFE")
          .setAuthor("Filtre Sistemi")
          .setDescription(
            `Bu sunucuda yasaklanmış bir kelimeyi kullandınız, bu yüzden mesajınızı sildim.`
          );
        msg.channel.send(k).then(message => message.delete(5000));

        return;
      }
    }
  }

  if (!msg.guild) return;

  if (db.has(`küfürE_${msg.guild.id}`) === true) {
    if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();

        var k = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setAuthor("Küfür Engeli!")
          .setDescription(
            `Hey <@${msg.author.id}>, Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!`
          );
        db.add(`kuyarr_${msg.author.id}`, 1);
        msg.channel.send(k).then(message => message.delete(5000));
      }
    }
  }
});

//-------------------KÜFÜR ENGEL SON-----------------------\\

//------------------OTOTAG SİSTEMİ--------------------\\

client.on("guildMemberAdd", async member => {
  let frenzy_ibrahim = await db.fetch(`Frenzy?Code?Ototag_${member.guild.id}`);
  let frenzykanal = await db.fetch(
    `Frenzy?Code?OtotagKanal_${member.guild.id}`
  );
  if (!frenzy_ibrahim || !frenzykanal) return;

  member.setNickname(`${frenzy_ibrahim} ${member.user.username}`);
  client.channels
    .get(frenzykanal)
    .send(
      `**${member.user.username}** Adlı Kullanıcıya Otomatik Tag Verildi! <a:tik1:727233745693704202>`
    );
});

//------------OTOTAG SİSTEMİ SON-----------------\\

//----------------Self Bot Koruma------------------\\

client.on("message", message => {
  var antiraid = db.fetch(`sunucular.${message.guild.id}.spamkoruma`);
  if (!antiraid) return;
  if (message.author.bot) return;
  message.guild.fetchMember(message.author).then(member => {
    if (member.hasPermission("BAN_MEMBERS")) return;
    var b = [];
    var aut = [];
    setTimeout(() => {
      message.channel.fetchMessages({ limit: 10 }).then(m => {
        m.forEach(a => {
          if (m.filter(v => v.content === a.content).size > m.size / 2) {
            message.guild.fetchMember(m.author).then(member2 => {
              if (member2.hasPermission("BAN_MEMBERS")) return;
              b.push(a);
              aut.push(a.author);
            });
          }
        });
        if (!b.includes(":warning: | `Self` Botlar Susturulacak.")) {
          işlem();
        } else {
        }

        function işlem() {
          if (b.length > 5) {
            message.channel.send(":warning: | `Self` Botlar Susturulacak.");
            aut.forEach(a => {
              message.channel.overwritePermissions(a, {
                SEND_MESSAGES: false
              });
            });
            message.channel.send(" | `Self` botlar susturuldu.");
          } else return;
        }
      });
    });
  });
});

//----------------Self bot koruma son----------------\\
//SAĞTIK BAN

client.on("guildBanAdd", async function(guild, user) {
  let koruma = await db.fetch(`koruma_${user.guild.id}`);
  if (koruma == "kapali") return;
  if (koruma == "acik") {
    const entry = await guild
      .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
      .then(audit => audit.entries.first());
    const yetkili = await guild.members.get(entry.executor.id);
    setTimeout(async () => {
      let logs = await guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD" });
      if (logs.entries.first().executor.bot) return;

      let kisi = guild.guild.member(entry.executor);
      kisi.roles
        .filter(a => a.hasPermission("ADMINISTRATOR"))
        .forEach(x => kisi.removeRole(x.id));
      kisi.roles
        .filter(a => a.hasPermission("MANAGE_CHANNELS"))
        .forEach(x => kisi.removeRole(x.id));
      kisi.roles
        .filter(a => a.hasPermission("MANAGE_ROLES"))
        .forEach(x => kisi.removeRole(x.id));
      kisi.kick();

      //SAĞTIK BAN SON

      //////////////////////////////////////////////////// EMOJİ KORUMA

      client.on("emojiDelete", async function(emoji, kisi) {
        const i = await db.fetch(`emojikoruma_${emoji.guild.id}`, true);
        if (i) {
          const entry = await emoji.guild
            .fetchAuditLogs({ type: "EMOJİ_DELETE" })
            .then(audit => audit.entries.first());

          let kisi = emoji.guild.member(entry.executor);
          kisi.roles
            .filter(a => a.hasPermission("ADMINISTRATOR"))
            .forEach(x => kisi.removeRole(x.id));
          kisi.roles
            .filter(a => a.hasPermission("MANAGE_CHANNELS"))
            .forEach(x => kisi.removeRole(x.id));
          kisi.roles
            .filter(a => a.hasPermission("MANAGE_ROLES"))
            .forEach(x => kisi.removeRole(x.id));
          kisi.kick();

          const deleter = emoji.executor;
          const id = emoji.executor.id;

          if (id === client.user.id || id === emoji.guild.ownerID) return;

          emoji.guild.members.forEach(async function(members) {
            if (members.id !== id) return;
            members.roles.forEach(role => {
              if (
                role.hasPermission(8) ||
                role.hasPermission("MANAGE_EMOJIS")
              ) {
                members.removeRole(role.id);
              }
            });
          });
        }
      });

      guild.owner.send(
        `** <@${yetkili.id}> İsimili Yetkili <@${user.id}>** Adlı Kişiyi Banladı Ve Yetkilerini Aldım.`
      );
    }, 2000);
  }
});

//////////////////////////////////////////////////// EMOJİ KORUMA SON

//////////////////////////////////////////////// KANAL KORUMA

client.on("channelCreate", async (channel, member, guild) => {
  let kanal = await db.fetch(`kanalk_${channel.guild.id}`);
  if (kanal == "acik") {
    channel.delete();
    const embed = new Discord.RichEmbed()
      .setDescription(
        "Sunucunuzda yeni bir kanal oluşturuludu! fakat geri silindi! ( Kanal Koruma Sistemi ) "
      )
      .setColor("BLACK");
    channel.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});

//////////////////////////////////////////////// KANAL KORUMA SON

//İNVİTE SİSTEMİ

const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.get(d);
  const sasad = member.guild.members.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`Bulunamadı!\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels
      .get(kanal)
      .send(
        `**${member}** adlı kullanıcı aramızdan ayrıldı. davet eden: **Bulunamadı!**`
      );
    return;
  } else {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`${sa.tag}\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels
      .get(kanal)
      .send(
        `**${member}** adlı kullanıcı aramızdan ayrıldı. davet eden: **${sa.tag}**`
      );

    if (!veri) return;

    if (sasad.roles.has(veri)) {
      if (sayı2 <= veri12) {
        sasad.removeRole(veri);
        return;
      }
    }
    if (sasad.roles.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) {
        sasad.removeRole(veri2);
        return;
      }
    }
  }
});

client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.get(invite.inviter.id);
    const davetçi = client.users.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member}\`\` **adlı şahıs sunucuya katıldı.\nŞahsı davet eden:** \`\`${davetçi.tag}\`\` **Toplam \`\`${sayı2}\`\` daveti oldu!**`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels
      .get(kanal)
      .send(
        `**${member}** adlı kullanıcı aramıza katıldı. davet eden: **${davetçi.tag}** Toplam **${sayı2}** daveti oldu !`
      );
    if (!veri) return;

    if (!sasad.roles.has(veri)) {
      if (sayı2 => veri12) {
        sasad.addRole(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.addRole(veri2);
        return;
      }
    }
  });
});

//İNVİTE SİSTEMİ SON

//ANTİ RAİD SİSTEMİ

//BOT ENGEL,anti-baskın yada anti-raid
client.on("guildMemberAdd", async member => {
  let kanal =
    (await db.fetch(`antiraidK_${member.guild.id}`)) == "anti-raid-aç";
  if (!kanal) return;
  var cod = member.guild.owner;
  if (member.user.bot === true) {
    if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
      let are = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL)
        .setDescription(
          `**${member.user.tag}** (${member.id}) adlı bota bir yetkili izin verdi eğer kaldırmak istiyorsanız **${prefix}bot-izni kaldır botun_id**.`
        );
      cod.send(are);
    } else {
      let izinverilmemişbot = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setThumbnail(member.user.avatarURL)
        .setDescription(
          "**" +
            member.user.tag +
            "**" +
            " (" +
            member.id +
            ") " +
            "adlı bot sunucuya eklendi ve banladım eğer izin vermek istiyorsanız **" +
            prefix +
            "bot-izni ver botid**"
        );
      member.ban(); // Eğer sunucudan atmak istiyorsanız ban kısmını kick yapın
      cod.send(izinverilmemişbot);
    }
  }
});

//ANTİ RAİD SİSTEMİ SON

//EVERYONE ENGEL

let ehengel = JSON.parse(
  fs.readFileSync("./ayarlar/everhereengel.json", "utf8")
);
client.on("message", async function(msg) {
  if (!msg.guild) {
  } else {
    if (!ehengel[msg.guild.id]) {
    } else {
      if (ehengel[msg.guild.id].sistem == false) {
      } else if (ehengel[msg.guild.id].sistem == true) {
        if (msg.author.id == msg.guild.ownerID) {
        } else {
          if (msg.content.includes("@everyone")) {
            msg.delete();
            msg
              .reply("Maalesef `everyone` atmana izin veremem!")
              .then(msj => msj.delete(3200));
          } else {
          }
          if (msg.content.includes("@here")) {
            msg.delete();
            msg
              .reply("maalesef `here` atmana izin veremem!")
              .then(msj => msj.delete(3200));
          } else {
          }
        }
      }
    }
  }
});

//EVERYONE ENGEL SON

//MÜZİK SİSTEMİ

const youTube = require("simple-youtube-api");
const Ytdl = require("ytdl-core");
const youtube = new YouTube("AIzaSyCplRqNijPLgyYQooXSzsoYK6B9XXp0708");

client.on("message", async message => {
  if (!message.guild) return;

  var prefix = ayarlar.prefix;

  var args = message.content.substring(prefix.length).split(" ");
  if (!message.content.startsWith(prefix)) return;
  var searchString = args.slice(1).join(" ");
  var url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  var serverQueue = queue.get(message.guild.id);

  switch (args[0].toLowerCase()) {
    case "oynat":
      var voiceChannel = message.member.voiceChannel;

      const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          "Dinlemek istediğin şarkıyı yazmalısın! (Şarkı ismi veya Youtube URLsi)"
        );
      if (!url) return message.channel.send(embed);

      const voiceChannelAdd = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Lütfen herhangi bir sesli kanala katılınız.`);
      if (!voiceChannel) return message.channel.send(voiceChannelAdd);
      var permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT")) {
        const warningErr = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            `Herhangi bir sesli kanala katılabilmek için yeterli iznim yok.`
          );
        return message.channel.send(warningErr);
      }
      if (!permissions.has("SPEAK")) {
        const musicErr = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            `Müzik açamıyorum/şarkı çalamıyorum çünkü kanalda konuşma iznim yok veya mikrofonum kapalı.`
          );
        return message.channel.send(musicErr);
      }
      if (
        url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)
      ) {
        var playlist = await youtube.getPlaylist(url);
        var videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
          var video2 = await youtube.getVideoByID(video.id);
          await handleVideo(video2, message, voiceChannel, true);
        }
        const PlayingListAdd = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            `[${playlist.title}](https://www.youtube.com/watch?v=${playlist.id}) İsimli şarkı oynatma listesine Eklendi.`
          );
        return message.channel.send(PlayingListAdd);
      } else {
        try {
          var video = await youtube.getVideo(url);
        } catch (error) {
          try {
            var videos = await youtube.searchVideos(searchString, 10);

            var r = 1;

            var video = await youtube.getVideoByID(videos[r - 1].id);
          } catch (err) {
            console.error(err);
            const songNope = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setDescription(`Aradığınız isimde bir şarkı bulamadım.`);
            return message.channel.send(songNope);
          }
        }
        return handleVideo(video, message, voiceChannel);
      }
      break;
    case "tekrar":
      const e = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(e);
      const p = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(p);

      var u = serverQueue.songs[0];

      /*var pla = await youtube.getPlaylist(u);
      var v = await pla.getVideos();*/
      var vi2 = await youtube.getVideoByID(u.id);
      await handleVideo(vi2, message, voiceChannel, true);
      const PlayingListAdd = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `[${u.title}](https://www.youtube.com/watch?v=${u.id}) İsimli şarkı bitince tekrar oynatılacak.`
        );
      return message.channel.send(PlayingListAdd);

      break;
    case "geç":
      const err0 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(err0);
      const err05 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(err05);
      const songSkip = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şarkı başarıyla geçildi!`);
      serverQueue.connection.dispatcher.end("");
      message.channel.send(songSkip);
      return undefined;
      break;
    case "kapat":
      const err1 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(err1);
      const err2 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(err2);
      serverQueue.songs = [];
      const songEnd = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şarkı başarıyla durduruldu ve odadan ayrıldım!`);
      serverQueue.connection.dispatcher.end("");
      message.channel.send(songEnd);
      return undefined;
      break;
    case "ses":
      const asd1 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(asd1);
      const asd2 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(asd2);

      if (!args[1])
        return message.reply("Ses seviyesi ayarlamak için bir sayı yaz!");
      serverQueue.volume = args[1];
      if (args[1] > 10)
        return message.channel.send(
          `Ses seviyesi en fazla \`10\` olarak ayarlanabilir.`
        );
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
      const volumeLevelEdit = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Ayarlanan Ses Seviyesi: **${args[1]}**`);
      return message.channel.send(volumeLevelEdit);
      break;
    case "kuyruk":
      var siralama = 0;
      const a = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Bir sesli kanalda değilsin.`);
      if (!message.member.voiceChannel) return message.channel.send(a);
      const b = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(b);

      var k = serverQueue.songs
        .map(
          song =>
            `${++siralama} - [${song.title}](https://www.youtube.com/watch?v=${
              song.id
            })`
        )
        .join("\n")
        .replace(
          serverQueue.songs[0].title,
          `**${serverQueue.songs[0].title}**`
        );

      const kuyruk = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("Şarkı Kuyruğu", k);
      return message.channel.send(kuyruk);
      break;
    case "durdur":
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        const asjdhsaasjdha = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(`Şarkı başarıyla duraklatıldı!`);
        return message.channel.send(asjdhsaasjdha);
      }
      return message.channel.send("Şuanda herhangi bir şarkı çalmıyor.");
      break;
    case "devamet":
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        const asjdhsaasjdhaadssad = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(`Şarkı başarıyla devam ettiriliyor...`);
        return message.channel.send(asjdhsaasjdhaadssad);
      }
      return message.channel.send("Şuanda herhangi bir şarkı çalmıyor.");

      return undefined;
      break;
  }
  async function handleVideo(video, message, voiceChannel, playlist = false) {
    var serverQueue = queue.get(message.guild.id);
    //console.log(video);
    var song = {
      id: video.id,
      title: video.title,
      durationh: video.duration.hours,
      durationm: video.duration.minutes,
      durations: video.duration.seconds,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      thumbnail: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
      requester: message.author.id
    };
    if (!serverQueue) {
      var queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 3,
        playing: true
      };
      queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`Ses kanalına giremedim HATA: ${error}`);
        queue.delete(message.guild.id);
        return message.channel.send(`Ses kanalına giremedim HATA: ${error}`);
      }
    } else {
      serverQueue.songs.push(song);
      //console.log(serverQueue.songs);
      if (playlist) return undefined;

      const songListBed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `[${song.title}](https://www.youtube.com/watch?v=${song.id}) isimli şarkı kuyruğa eklendi!`
        );
      return message.channel.send(songListBed);
    }
    return undefined;
  }
  function play(guild, song) {
    var serverQueue = queue.get(guild.id);

    if (!song) {
      queue.delete(guild.id);
      return;
    }
    //console.log(serverQueue.songs);

    const dispatcher = serverQueue.connection
      .playStream(ytdl(song.url))
      .on("end", reason => {
        if (
          reason ===
          "İnternetten kaynaklı bir sorun yüzünden şarkılar kapatıldı."
        );
        else console.log(reason);
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    const playingBed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle(
        "**Thetis Müzik Sistemi**",
        `https://i.postimg.cc/BnQCzh2s/861acd45b3d34f97265ac7161fbb6763.png`
      )
      .setAuthor(
        `Şuanda Oynatılıyor`,
        "https://davidjhinson.files.wordpress.com/2015/05/youtube-icon.png"
      )
      .setDescription(`[${song.title}](${song.url})`)
      .addField("Şarkı Süresi", `${song.durationm}:${song.durations}`, true)
      .addField("Şarkıyı Açan Kullanıcı", `<@${song.requester}>`, true)
      .setThumbnail(song.thumbnail);
    serverQueue.textChannel.send(playingBed);
  }
});

//MÜZİK SİSTEMİ SON

//SEVİYE SİSTEMİ

client.on("message", async message => {
  let prefix = ayarlar.prefix;

  var id = message.author.id;
  var gid = message.guild.id;

  let hm = await db.fetch(`seviyeacik_${gid}`);
  let kanal = await db.fetch(`svlog_${gid}`);
  let xps = await db.fetch(`verilecekxp_${gid}`);
  let seviyerol = await db.fetch(`svrol_${gid}`);
  let rollvl = await db.fetch(`rollevel_${gid}`);

  if (!hm) return;
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  var xp = await db.fetch(`xp_${id}_${gid}`);
  var lvl = await db.fetch(`lvl_${id}_${gid}`);
  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  if (!lvl) {
    if (xps) {
      db.set(`xp_${id}_${gid}`, xps);
    }
    db.set(`xp_${id}_${gid}`, 4);
    db.set(`lvl_${id}_${gid}`, 1);
    db.set(`xpToLvl_${id}_${gid}`, 100);
  } else {
    if (xps) {
      db.add(`xp_${id}_${gid}`, xps);
    }
    db.add(`xp_${id}_${gid}`, 4);

    if (xp > xpToLvl) {
      db.add(`lvl_${id}_${gid}`, 1);
      db.add(
        `xpToLvl_${id}_${gid}`,
        (await db.fetch(`lvl_${id}_${gid}`)) * 100
      );
      if (kanal) {
        client.channels
          .get(kanal.id)
          .send(
            message.member.user.username +
              "** Seviye Atladı! Yeni seviyesi; `" +
              lvl +
              "` Tebrikler! :tada: **"
          );
      }
    }

    if (seviyerol) {
      if (lvl >= rollvl) {
        message.guild.member(message.author.id).addRole(seviyerol);
        if (kanal) {
          client.channels
            .get(kanal.id)
            .send(
              message.member.user.username +
                "** Yeni Seviyesi **" +
                rollvl +
                "**  seviyeye ulaştı ve " +
                seviyerol +
                " Rolünü kazandı! :tada: **"
            );
        }
      }
    }
  }
});

//SEVİYE SİSTEMİ SON


// EKLENDIM-ATILDIM
client.on("guildCreate", guild => {
let add = client.channels.get("738940490166173756")
const eklendim = new Discord.RichEmbed()

.setTitle(`Sunucuya Eklendim`)
.setTimestamp()
.setColor("GREEN")
.setThumbnail(guild.iconURL)
.addField(`Sunucu İsmi`,guild.name)
.addField(`Sunucu ID`, guild.id)
.addField(`Kurucu`,guild.owner.user.tag)
.addField(`Kurucu ID`,guild.owner.user.id)
.addField(`Üye Sayısı`,guild.memberCount)

add.send(eklendim)

});

client.on("guildDelete", guild => {
let remove = client.channels.get("738940490166173756")
const atildim = new Discord.RichEmbed()

.setTitle(`Sunucudan Atıldım`)
.setTimestamp()
.setColor("RED")
.setThumbnail(guild.iconURL)
.addField(`Sunucu İsmi`,guild.name)
.addField(`Sunucu ID`, guild.id)
.addField(`Kurucu`,guild.owner.user.tag)
.addField(`Kurucu ID`,guild.owner.user.id) 
.addField(`Üye Sayısı`,guild.memberCount)

remove.send(atildim)

});



//// GUVENLIK
client.on("guildMemberAdd", async member => {
  let girenKisi = client.users.get(member.id);
  let girisKanal = client.channels.get(db.fetch(`astaG${member.guild.id}`));
  let Güvenli = `Güvenli!`;
  let Şüpheli = `Güvenli Değil!`;

  const ktarih = new Date().getTime() - girenKisi.createdAt.getTime();
  var kontrol;
  if (ktarih > 2629800000) kontrol = Güvenli;
  if (ktarih < 2629800001) kontrol = Şüpheli;
  let kanal = await db.fetch(`astaG${member.guild.id}`);
  if (!kanal) return;
  const giris = new Discord.RichEmbed()
    .setColor("GREEN")
  .setTitle("Thetis Güvenlik Sistemi")
.setDescription(`:bust_in_silhouette: **Kullanıcı** • \`${member.user.tag}\`\n:rosette: **Kullanıcı ID** • \`${member.user.id}\`\n:shield: **Güvenlik Durumu** • \`${kontrol}\``)
  client.channels.get(kanal).send(giris);
});
client.on('guildDelete', async(guild) => {

await db.delete(`astaG${guild.id}`)
})

















