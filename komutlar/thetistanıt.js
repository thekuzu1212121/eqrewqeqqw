const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setDescription("**Linkler »**\n[Botu Ekle]("+process.env.botdavet+")\n[Website]("+process.env.botsite+")\n[Destek Sunucusu]("+process.env.desteksunucu+")")
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
  name: "davet",
  description: "Yardım kategorilerini gösterir.",
  usage: "botutanıt"
};
