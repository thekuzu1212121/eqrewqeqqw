const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setDescription(
      "<a:uyari:726935688913748039> KURALLAR <a:uyari:726935688913748039>ᅠᅠᅠᅠᅠ\n<a:1_:727125534395596822> • Din, dil, ırk veya cinsiyet ayrımı içeren söylemler\n<a:2_:727125556499447818> • Siyasi ya da dini sohbetler başlatmakv ve içinde bulunmak\n<a:3_:727125588455850034> • Herhangi bir kimseyi hedef alan hakaretlerde bulunmak\n<a:4_:727125598295687200> • Her türlü satış ve reklam içerikli paylaşımlar\n<a:5_:727125610517889044> • Flood, Spam, vb. yapmak\n<a:6_:727125628574367825> • Kişisel kavgaları Discord sohbet kanallarına taşımak\n<a:7_:727129518032289813> • +18 içerikli paylaşımlar yapmak\n<a:8_:727125671326777387>• Yazışma kanalları amacı dışında kullanmak\n<a:9_:727125686325870593> • Özel karakter içeren (etiketlenemeyen) isimler kullanmak\n<a:1_:727125534395596822><a:0_:727125697184923689> • Herhangi bir şekilde reklam yapmak\n<a:1_:727125534395596822><a:1_:727125534395596822> • Argo kelimeler kullanmak\n<a:1_:727125534395596822><a:2_:727125556499447818> • Cinsel avatarlar yasaktır.\nᅠᅠᅠᅠᅠ"
    )
    .setFooter(`${client.user.username}`, client.user.avatarURL)
    .setTimestamp();
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "kuralyaz",
  description: "Yardım kategorilerini gösterir.",
  usage: "yapımcı"
};
