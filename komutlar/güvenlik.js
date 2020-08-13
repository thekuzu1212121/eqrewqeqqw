const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args, guild) => {
  
if(!message.member.hasPermission("MANAGE_GUILD")) {
  const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription('**Güvenlik kanalını ayarlamak için `Sunucuyu Yönet` İznine sahip olmalısın!')
return message.channel.send(embed)
}
let kinal = db.fetch(`astaG${message.guild.id}`)
if(db.has(`astaG${message.guild.id}`)) {
const embed = new Discord.RichEmbed()
.setColor('BLUE')
.setDescription(`**Güvenlik kanalı <#${kinal}> kanalı olarak ayarlandı!**`)
return message.channel.send(embed)
}
  
let kanal = message.mentions.channels.first();
  
if(!kanal) {
const embed = new Discord.RichEmbed()
.setColor('RED')
.setDescription(`**Güvenlik kanalın etiketlemedin! \`Doğru kullanım: ${ayarlar.prefix}guvenlik #kanal\`**`)
return message.channel.send(embed)
}
db.set(`astaG${message.guild.id}`, kanal.id);

const embed = new Discord.RichEmbed()
.setColor('GREEN')
.setiTtle("Astarius Güvenlik Sistemi")
.setDescription(`**Güvenlik kanalı ${kanal} olarak ayarlandı!**`)   
message.channel.send(embed)  
}; // Astarius Code Share
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['guvenlik-kanal','gkanal'],
permLevel: 0
};
exports.help = {
name: 'guvenlik',
description: 'Guvenlik kanalını ayarlamaya yarar.',
usage: 'guvenlik #kanal'
};