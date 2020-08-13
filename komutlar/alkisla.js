const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
exports.run = (client, message, params) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**");
    return message.author.sendEmbed(ozelmesajuyari);
  }
  if (message.channel.type !== "dm") {
    const sunucubilgi = new Discord.RichEmbed()
      .setAuthor(message.author.username + " Alkışladı!")
      .setColor(3447003)
      .setTimestamp()
      .setDescription("")
      .setImage(
        `https://media.tenor.com/images/eddc46440619ff55593ac3782c0434d6/tenor.gif`
      );
    return message.channel.sendEmbed(sunucubilgi);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["alkisla", "alkişla", "alkısla"],
  permLevel: 0
};
exports.help = {
  name: "alkışla",
  description: "Alkisla Gifini paylasir",
  usage: "alkışla"
};
