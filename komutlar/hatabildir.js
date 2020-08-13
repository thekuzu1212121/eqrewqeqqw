const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let hata = args.slice(0).join(" ");
  if (!hata) {
    const hata = new Discord.RichEmbed()
      .setColor("RED")
      .setDescription(`Hata Belirtmediniz!`);
    return message.channel.send(hata);
  }
  const embed = new Discord.RichEmbed()
    .setTitle(`Hata Bildirimi`)
    .setColor("BLUE")
    .setDescription(
      `**Hatayı Bildiren Kişi:** <@${message.author.id}> \n**Bildirdiği Hata** \`${hata}\``
    );
  client.channels.get("738940206824030238") .send(embed);

  const başarılı = new Discord.RichEmbed()
    .setColor("GREEN")
    .setDescription(`Hata Bildiriminiz Başarıyla Gönderildi.`);
  message.channel.send(başarılı);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "hata-bildir",
  description: "Bottaki Hataları Bildirmeye Yarar.",
  usage: "hata-bildir"
};
