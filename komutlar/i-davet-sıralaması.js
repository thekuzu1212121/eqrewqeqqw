const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let invites = await message.guild.fetchInvites().catch(error => {
    return message.channel.send("Davetleri göremiyorum yeterli iznim yok");
  });

  invites = invites.array();

  let possibleinvites = [];
  invites.forEach(function(invites) {
    possibleinvites.push(`${invites.inviter.username}**(${invites.uses} davet)**`);
  });

  const embed = new Discord.RichEmbed()
    .setTitle(`**Thetis • Davet Sıralaması**`)
    .setColor("RANDOM")
    .setDescription(`${possibleinvites.join("\n")}`)
    .setFooter("Not: 1 den fazla aynı kullanıcı olabilir bu davet linkleri ile ilgilidir.")
    .setTimestamp();
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["davet-sırası"],
  permLevel: 0,
  kategori: "sunucu"
};

exports.help = {
  name: "davet-sıralaması",
  description: "Sunucunuza en çok kullanıcı getirenleri sıralar.",
  usage: "davet-sıralaması"
};
