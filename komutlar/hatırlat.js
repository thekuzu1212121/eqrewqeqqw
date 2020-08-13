const Discord = require("discord.js");
const ms = require("ms");
const main = require("../ayarlar.json");
var prefix = main.prefix;

module.exports.run = async (Main, message, args) => {

      let reminderTime = args[0];
      if(!reminderTime) return message.channel.send(`**Yanlış Kullanım!**\n**Geçerli Kullanım Örneği:** ${prefix}hatırlat 10min Uyan!!\n(min = Dakika)`);


      let Bilgi = new Discord.RichEmbed()
      .setColor('#ffffff')
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
      .setDescription("**Hatırlatıcı Başarıyla Ayarlandı.**")

      .setTimestamp()

      message.channel.send(Bilgi);

      let reminder = args.slice(1).join(" ");
      
      setTimeout(function(){
        let Zamanlayıcı = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .addField("Hatırlatıcı", `\`\`\`${reminder}\`\`\``)
        .setTimestamp()

        message.channel.send(Zamanlayıcı);
      }, ms(reminderTime));


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'hatırlat'
};