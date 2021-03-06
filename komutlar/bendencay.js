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
      .setAuthor(
        "Koca Yürekli " + message.author.username + " Herkese Çay Aldı!"
      )
      .setColor(3447003)
      .setTimestamp()
      .setDescription("")
      .setImage(
        `https://cdn.discordapp.com/attachments/724755934227857479/726059236408426547/tenor.gif`
      );
    return message.channel.sendEmbed(sunucubilgi);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["herkesecay", "herkeseçay", "herkesd-cay"],
  permLevel: 0
};
exports.help = {
  name: "herkeseçay",
  description: "Herkese Çay Verir",
  usage: "herkeseçay"
};
