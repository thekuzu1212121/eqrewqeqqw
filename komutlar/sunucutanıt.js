const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField(
        ":warning: Uyarı :warning:",
        "`+sunucutanıt` adlı komutu özel mesajlarda kullanamazsın."
      );
    return message.author.sendEmbed(ozelmesajuyari);
  }
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(
      "Bu Komutu kullanmanız için `Sunucu_Yönet` Yetkisine sahip olmalısınız."
    );
  let kullanildii = JSON.parse(fs.readFileSync("./sunucutanıt.json", "utf8"));
  if (!kullanildii[message.guild.id])
    kullanildii[message.guild.id] = {
      gunlukkullanim: 0
    };
  if (kullanildii[message.guild.id].gunlukkullanim == 0) {
    const embed = new Discord.RichEmbed()
      .setTitle("Tanıtım Başarılı!")
      .setDescription(
        "Sunucun [Burada](https://discord.gg/GaVXSUp) tanıtıldı.\nBu komudu tekrar ``12 Saat`` sonra kullanabilirsin.\nᅠᅠᅠᅠᅠ"
      )
      .setColor("GREEN");
    message.channel.sendEmbed(embed);
    message.channel.createInvite({ maxAge: 0 }).then(invite => {
      const embed = new Discord.RichEmbed()
        .addField(`⚜ Sunucu Sahibi`, message.author.tag, true)
        .addField(`⭐ Sunucu İsmi`, message.guild.name, true)
        .addField(`📊 Sunucudakı Üye Sayısı`, message.guild.members.size, true)
        .addField(`📮 Sunucu Davet Linki`, invite.url, true)
        .setFooter(`Botu eklemek için ⚡ t!davet`)
        .setColor("RANDOM")
        .setThumbnail(message.guild.iconURL);
      client.channels.get("729474880306675732").send(embed);
    });
    kullanildii[message.guild.id].gunlukkullanim = 1;

    fs.writeFile("./sunucutanıt.json", JSON.stringify(kullanildii), err => {
      if (err) console.error(err);
    });
    return;
  }
  setTimeout(async () => {
    kullanildii[message.guild.id].gunlukkullanim = 0;
    fs.writeFile("./sunucutanıt.json", JSON.stringify(kullanildii), err => {
      if (err) console.error(err);
    });
  }, ms("12h"));

  if (kullanildii[message.guild.id].gunlukkullanim == 1) {
    message.channel.send({
      embed: {
        description:
          "**Başarısız Tanıtım** \n\nBu komut daha önceden kullanılmış.\nBu komudu ``12 Saat``de 1 kullanabilirsin.\nᅠᅠᅠᅠᅠ"
      }
    });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucutanıt"],
  permLevel: 2
};
exports.help = {
  name: "sunucunutanıt",
  description: "Sunuzunuzu Tanıtmak İçin En Uygun Kod!",
  usage: "sunucutanıt"
};
