const Discord = require("discord.js"); 
const db = require('quick.db') 
exports.run = (client, message, params) => { 
  const embed = new Discord.RichEmbed() 
  .setColor("RANDOM") 
  .setAuthor(`${client.user.username}`, client.user.avatarURL) 
  .addField('💥 Sunucu Adı;',` ${ message.guild.name}`) 
  .addField('🏳 Sunucu Bölgesi;', ` ${message.guild.region}`) 
  .addField(`👥 Üye Bilgileri`,`Toplam • ${message.guild.memberCount}\nÇevrimiçi • ${message.guild.members.filter(m => m.user.presence.status === "online").size}\nRahatsız Etmeyin • ${message.guild.members.filter(m => m.user.presence.status === 'dnd').size} \nBoşta • ${message.guild.members.filter(m => m.user.presence.status === 'idle').size} \nÇevrimdışı • ${message.guild.members.filter(m => m.user.presence.status === 'offline').size}`)
  .addField('👑 Sunucu Sahibi;', ` ${message.guild.owner}`) 
  .addField('💬 Kanal Sayısı;',` ${message.guild.channels.size} kanal`) 
  .addField('💫 Oluşturulma Tarihi;', message.guild.createdAt)
  .setFooter(`${client.user.username}`) 
  .setTimestamp() 
  message.channel.send(embed) }; 
exports.conf = { 
  enabled: true, 
  guildOnly: false, 
  aliases: ["serverinfo"], 
  kategori: "sunucu", 
  permLevel: 0 }; 

exports.help = { 
  name: 'sunucubilgi', 
  description: 'Sunucu hakkında bilgi verir.', 
  usage: '-sunucubilgi', };
