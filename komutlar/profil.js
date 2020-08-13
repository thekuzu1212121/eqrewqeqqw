const Discord = require("discord.js");
const db = require("quick.db");
const moment = require('moment')
module.exports.run = async (client, message, args) => {
  
let user = message.mentions.users.first() || message.author;
  
let kişi;
if(message.mentions.users.first()) {
kişi = message.mentions.users.first();
} else {
kişi = message.author;
}
var tarih = ''
if(moment(kişi.createdAt).format('MM') === '01') {
var tarih = `${moment(kişi.createdAt).format('DD')} Ocak ${moment(kişi.createdAt).format('YYYY HH:mm')} `
}
if(moment(kişi.createAt).format('MM') === '02') {
var tarih = `${moment(kişi.createdAt).format('DD')} Şubat ${moment(kişi.createdAt).format('YYYY HH:mm')} `
}
if(moment(kişi.createdAt).format('MM') === '03') {
var tarih = `${moment(kişi.createdAt).format('DD')} Mart ${moment(kişi.createdAt).format('YYYY HH:mm')} `
}
if(moment(kişi.createdAt).format('MM') === '04') {
var tarih = `${moment(kişi.createdAt).format('DD')} Nisan ${moment(kişi.createdAt).format('YYYY HH:mm')} `
}
if(moment(kişi.createdAt).format('MM') === '05') {
var tarih = `${moment(kişi.createdAt).format('DD')} Mayıs ${moment(kişi.createdAt).format('YYYY HH:mm')} `
}
if(moment(kişi.createdAt).format('MM') === '06') {
var tarih = `${moment(kişi.createdAt).format('DD')} Haziran ${moment(kişi.createdAt).format('YYYY HH:mm')} `
}
if(moment(kişi.createdAt).format('MM') === '07') {
var tarih = `${moment(kişi.createdAt).format('DD')} Temmuz ${moment(kişi.createdAt).format('YYYY HH:mm')} `
}
if(moment(kişi.createdAt).format('MM') === '08') {
var tarih = `${moment(kişi.createdAt).format('DD')} Ağustos ${moment(kişi.createdAt).format('YYYY HH:mm')} `
}
if(moment(kişi.createdAt).format('MM') === '09') {
var tarih = `${moment(kişi.createdAt).format('DD')} Eylül ${moment(kişi.createdAt).format('YYYY HH:mm')} `
}
if(moment(kişi.createdAt).format('MM') === '10') {
var tarih = `${moment(kişi.createdAt).format('DD')} Ekim ${moment(kişi.createdAt).format('YYYY HH:mm')} `
}
if(moment(kişi.createdAt).format('MM') === '11') {
var tarih = `${moment(kişi.createdAt).format('DD')} Kasım ${moment(kişi.createdAt).format('YYYY HH:mm')} `
}
if(moment(kişi.createdAt).format('MM') === '12') {
var tarih = `${moment(kişi.createdAt).format('DD')} Aralık ${moment(kişi.createdAt).format('YYYY HH:mm')} `
}
  
let aylartoplam = {
"01": "Ocak",
"02": "Şubat",
"03": "Mart",
"04": "Nisan",
"05": "Mayıs",
"06": "Haziran",
"07": "Temmuz",
"08": "Ağustos",
"09": "Eylül",
"10": "Ekim",
"11": "Kasım",
"12": "Aralık"
}
let aylar = aylartoplam 
let user2 = message.guild.member(kişi.id)
let userinfo = {};
userinfo.od1 = message.guild.members.get(kişi.id).user.presence.game || "Oynadığı Bir Oyun Yok"
userinfo.bot = user.bot.toString()
.replace("false", `Hayır`)
.replace("true", `Evet`)  
 var Durum = kişi.presence.status;
var durm = (Durum == "online" ? ('Çevrimiçi') : (Durum == "offline" ? ('Çevrimdışı') : (Durum == "idle" ? ('Boşta') : (Durum == "dnd" ? ('Rahatsız Etmeyin') : ("Bir Şeyler Ters Gitti")))))
const embed = new Discord.RichEmbed()
.setColor('BLUE')
.setThumbnail(kişi.avatarURL) 
.setDescription(`
Hesap Tam İsmi: \`${kişi.username}\`

Hesap ID'si: \`${kişi.id}\`

Hesap Kuruluş Tarihi: \`${tarih}\`

Sunucuya Katılma Tarihi: \`${moment(user2.joinedAt).format('DD')} ${aylar[moment(user2.joinedAt).format('MM')]} ${moment(user2.joinedAt).format('YYYY HH:mm')}\`

Sunucunun Kaçıncı Üyesi: \`${message.guild.members.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp).map(e => e.id).indexOf(kişi.id) +1}\`

Durumu: \`${durm}\`

Şuanda Oynadığı Oyun: \`${userinfo.od1}\`
`)
message.channel.send(embed)
  
};
module.exports.conf = {
aliases: ['kullanıcı-bilgi','profil','kullanıcı-info','member-info'],
permLevel: 0,
enabled: true,
guildOnly: false, 
};
module.exports.help = {
name: "kullanıcıbilgi",
description: "Profil",
usage: "profil"
};
