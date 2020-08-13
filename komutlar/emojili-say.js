const Discord = require("discord.js");

const mapping = {
  " ": "  ",
  "0": "<a:0_:727125697184923689>",
  "1": "<a:1_:727125534395596822>",
  "2": "<a:2_:727125556499447818>",
  "3": "<a:3_:727125588455850034>",
  "4": "<a:4_:727125598295687200>",
  "5": "<a:5_:727125610517889044>",
  "6": "<a:6_:727125628574367825>",
  "7": "<a:7_:727129518032289813>",
  "8": "<a:8_:727125671326777387>",
  "9": "<a:9_:727125686325870593>",
  "!": "❕",
  "?": "❔",
  "#": "#️⃣",
  "*": "*️⃣"
};

"abcdefghijklmnopqr".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});
//Developer By CodeShare
exports.run = function(client, message, args) {
  let offlinesayi = message.guild.members.filter(
    m => m.user.presence.status === "offline"
  ).size;
  let offline =
    "**Çevrimdışı Kişi Sayısı :** " +
    `${offlinesayi}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ");
  let toplam = message.guild.memberCount;
  let sunucu =
    "**Sunucudaki Kişi Sayısı :** " +
    `${toplam}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ");
  let onlinesayi = message.guild.members.filter(
    only => only.presence.status != "offline"
  ).size;
  let online =
    "**Çevrimiçi Kişi Sayısı :** " +
    `${onlinesayi}`
      .split("")
      .map(c => mapping[c] || c)
      .join("");
  const embed = new Discord.RichEmbed()
    .setTitle("Sunucu İstatistikleri")
    .setColor("BLACK")
    .setDescription("" + sunucu + "\n \n" + online + "\n \n" + offline + "")
    .setFooter("");

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["onlinesayi"],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "Sunucudaki Online Kişileri Sayar",
  desscription: "say"
};
