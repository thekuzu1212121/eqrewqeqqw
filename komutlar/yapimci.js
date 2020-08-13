const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setDescription(
      "» **Yapımcı**\n» <@714451348212678658>\n» **Yapımcı Yaşı**\n» 15\n\n» __İletişim__\n» <a:discord:727310935114383452> [Buraya Tıkla!](https://discord.gg/GaVXSUp)\n» <:instagram:727311518923882636> [Buraya Tıkla!](https://instagram.com/alonedesiqn)\n» <:youtube:727310835973619712> [Buraya Tıkla!](https://youtube.com/c/alonedesign)\nᅠᅠᅠᅠᅠ"
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
  name: "yapımcı",
  description: "Yardım kategorilerini gösterir.",
  usage: "yapımcı"
};
