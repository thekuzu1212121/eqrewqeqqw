const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const astariusprefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  ///// YETKILI
  if (args[0] === "yetkili") {
    let yetkili = [
      `ᅠᅠᅠᅠᅠᅠ
» ${astariusprefix}yardım koruma • Koruma Sistemi
» ${astariusprefix}yardım seviye • Seviye Sistemi 
» ${astariusprefix}yardım moderasyon • Moderasyon #1
» ${astariusprefix}yardım moderasyon2 • Moderayon #2
» ${astariusprefix}yardım davet • Davet Sistemi
ᅠᅠᅠᅠᅠᅠ`
    ];
    const yetkilim = new Discord.RichEmbed()
      .setColor("BLUE")
      .setTitle("●▬▬▬▬๑「YETKILI」๑▬▬▬▬▬●")
.setThumbnail(process.env.miniresim)
    .setDescription(yetkili)
      .addField(
        "Linkler »",
"• **__[Botu Ekle]("+process.env.botdavet+")__**\n• **__[Destek Sunucusu]("+process.env.desteksunucu+")__**\n• **__[Website]("+process.env.botsite+")__**"
      )
      .setTimestamp()
      .setFooter(
        message.author.tag + " Tarafından istendi",
        message.author.avatarURL
      );
    message.channel.send(yetkilim);
    return;
  } else {
    var arg = args[0];
  }
  if (!args[0]) {
    var arg = args[0];
  }

  if (!args[0]) {
    var arg = args[0];
  }
  /////// YETKILI SON

  /////DAVET
  if (args[0] === "davet") {
    let davet = [
      `ᅠᅠᅠᅠᅠᅠ
» ${astariusprefix}davet-kanal • Davet log kanalını belirler.
» ${astariusprefix}davetler • Kullanıcı davetlerini gösterir.(Kanal ayarlanınca çalışır)
» ${astariusprefix}davet-sıralaması • Davet sıralamasını gösterir.
» ${astariusprefix}rütbe-ekle • Davet ile verilecek rütbe ekler.
» ${astariusprefix}rütbe-sil • Davet ile verilecek rütbeyi siler.
» ${astariusprefix}rütbe-liste • Davet ile verilecek rütbeleri listeler.
ᅠᅠᅠᅠᅠᅠ`
    ];
    const davetim = new Discord.RichEmbed()
      .setColor("BLUE")
      .setTitle("●▬▬▬▬๑「DAVET」๑▬▬▬▬▬●")
.setThumbnail(process.env.miniresim)
    .setDescription(davet)
      .addField(
        "Linkler »",
"• **__[Botu Ekle]("+process.env.botdavet+")__**\n• **__[Destek Sunucusu]("+process.env.desteksunucu+")__**\n• **__[Website]("+process.env.botsite+")__**"
      )
      .setTimestamp()
      .setFooter(
        message.author.tag + " Tarafından istendi",
        message.author.avatarURL
      );
    message.channel.send(davetim);
    return;
  } else {
    var arg = args[0];
  }
  if (!args[0]) {
    var arg = args[0];
  }

  if (!args[0]) {
    var arg = args[0];
  }
  /////// DAVET SON

  ///// KORUMA
  if (args[0] === "koruma") {
    let koruma = [
      `ᅠᅠᅠᅠᅠᅠ     
» ${astariusprefix}kanal-koruma • Kanal koruma sitemini açar/kapatır.
» ${astariusprefix}rol-koruma • Rol koruma sistemini açar/kapatır.
» ${astariusprefix}anti-raid • Sunucuya eklenen botları kickler.
» ${astariusprefix}self-koruma • Self botları korur.
» ${astariusprefix}sağtıkban • Sağtık Ban korumasını aktif eder.
ᅠᅠᅠᅠᅠᅠ
    `
    ];
    const korumam = new Discord.RichEmbed()
      .setColor("BLUE")
      .setTitle("●▬▬▬▬๑「KORUMA」๑▬▬▬▬▬●")
.setThumbnail(process.env.miniresim)
    .setDescription(koruma)
      .addField(
        "Linkler »",
"• **__[Botu Ekle]("+process.env.botdavet+")__**\n• **__[Destek Sunucusu]("+process.env.desteksunucu+")__**\n• **__[Website]("+process.env.botsite+")__**"
      )
      .setTimestamp()
      .setFooter(
        message.author.tag + " Tarafından istendi",
        message.author.avatarURL
      );
    message.channel.send(korumam);
    return;
  } else {
    var arg = args[0];
  }
  if (!args[0]) {
    var arg = args[0];
  }

  if (!args[0]) {
    var arg = args[0];
  }
  /////// KORUMA SON

  ///// SEVIYE
  if (args[0] === "seviye") {
    let seviye = [
      `
ᅠᅠᅠᅠᅠᅠ
» ${astariusprefix}seviye-ayarlar • Seviye ayarlarını gösterir.
» ${astariusprefix}seviye-aç • Seviye sistemini açar.
» ${astariusprefix}seviye-kapat • Seviye sistemini kapatır.
» ${astariusprefix}seviye-rol • Seviye rol belirlersiniz.
» ${astariusprefix}seviye-xp • Mesaj başına gelicek xp'yi belirlersiniz.
ᅠᅠᅠᅠᅠᅠ
    `
    ];
    const seviyes = new Discord.RichEmbed()
      .setColor("BLUE")
      .setTitle("●▬▬▬▬๑「SEVIYE」๑▬▬▬▬▬●")
.setThumbnail(process.env.miniresim)
    .setDescription(seviye)
      .addField(
        "Linkler »",
"• **__[Botu Ekle]("+process.env.botdavet+")__**\n• **__[Destek Sunucusu]("+process.env.desteksunucu+")__**\n• **__[Website]("+process.env.botsite+")__**"
      )
      .setTimestamp()
      .setFooter(
        message.author.tag + " Tarafından istendi",
        message.author.avatarURL
      );
    message.channel.send(seviyes);
    return;
  } else {
    var arg = args[0];
  }
  if (!args[0]) {
    var arg = args[0];
  }

  if (!args[0]) {
    var arg = args[0];
  }
  /////// SEVIYE SON

  ////// MODERASYON
  if (args[0] === "moderasyon") {
    let moderasyon = [
      `ᅠᅠᅠᅠᅠᅠ\n» ${astariusprefix}kuralyaz • Sunucunuza kural yazar.\n» ${astariusprefix}sunucutanıt • Sunucunuzu **[burada](https://discord.gg/GaVXSUp)** tanıtır.\n» ${astariusprefix}ban • Sunucudan yasaklar.\n» ${astariusprefix}unban • Yasağını kaldırır.\n» ${astariusprefix}kick • Sunucudan kickler.\n» ${astariusprefix}emojiler • Sunucudaki emojileri listeler.\n» ${astariusprefix}sil • Mesaj siler.\n» ${astariusprefix}rolbilgi • Rol bilgilerini gösterir.\n» ${astariusprefix}oylama • Oylama yapar.\n» ${astariusprefix}hatırlat • Hatırlatma yapar.\n» ${astariusprefix}süreliban • Süreli yasaklar.\n» ${astariusprefix}çekiliş • Çekiliş yapar.\n» ${astariusprefix}kanalkilit • Kanalı süreli kilitler.\n» ${astariusprefix}rolver • Kişiye rol verir.\n» ${astariusprefix}rolal • Kişinin rolünü alır.\n» ${astariusprefix}terfi • Kişiyi terfi eder.\n» ${astariusprefix}yavaşmod • Süreli yavaş modu açar.\n» ${astariusprefix}uyarı • Uyarı Sistemini Gösterir.\nᅠᅠᅠᅠᅠᅠ`
    ];
    const moderation = new Discord.RichEmbed()
      .setColor("BLUE")
      .setTitle("●▬▬▬▬๑「MODERASYON」๑▬▬▬▬▬●\n")
.setThumbnail(process.env.miniresim)
    .setDescription(moderasyon)
      .addField(
        "Linkler »",
"• **__[Botu Ekle]("+process.env.botdavet+")__**\n• **__[Destek Sunucusu]("+process.env.desteksunucu+")__**\n• **__[Website]("+process.env.botsite+")__**"
      )
      .setTimestamp()
      .setFooter(
        message.author.tag + " Tarafından istendi",
        message.author.avatarURL
      );
    message.channel.send(moderation);
    return;
  } else {
    var arg = args[0];
  }
  if (!args[0]) {
    var arg = args[0];
  }

  if (!args[0]) {
    var arg = args[0];
  }
  ///// MODERASYON SON
  if (args[0] === "moderasyon2") {
    let moderasyon2 = [
      `ᅠᅠᅠᅠᅠᅠ\n» ${astariusprefix}sunucu-kur • Hazırlanmış sunucuyu kurar.\n» ${astariusprefix}otorol-ayarla • Otorol ayarlar.\n» ${astariusprefix}otorol-mesajı • Otorol mesajını ayarlar.\n» ${astariusprefix}otorolkapat • Otorolü kapatır.\n» ${astariusprefix}küfür-engelle • Küfür engel açar.\n» ${astariusprefix}reklam-engel • Reklam engel açar.\n» ${astariusprefix}reklamban • Reklam ban sistemini açar.\n» ${astariusprefix}reklambankapat • Reklam ban sistemini kapatır.\n» ${astariusprefix}reklam-taraması • Reklam taraması yapar.\n» ${astariusprefix}capsengel • Capslock engel açar.\n» ${astariusprefix}sayaç • Sayaç sistemini gösterir.\n» ${astariusprefix}sa-as • Sa-As açar.\n» ${astariusprefix}modlog #kanal • Modlog kanalını belirler.\n» ${astariusprefix}güvenlik #kanal • Resimli güvenlik.\n» ${astariusprefix}ototag • Ototagı ayarlar.\n» ${astariusprefix}ever-engel • Everyoneyi engeller.\n» ${astariusprefix}giriş-kanal #kanal • Yazılı giriş kanalını belirler.\n» ${astariusprefix}çıkış-kanal #kanal • Yazılı çıkış kanalını belirler.\nᅠᅠᅠᅠᅠᅠ`
    ];
    const moderation2 = new Discord.RichEmbed()
      .setColor("BLUE")
      .setTitle("●▬▬▬▬๑「MODERASYON」๑▬▬▬▬▬●\n")
.setThumbnail(process.env.miniresim)
    .setDescription(moderasyon2)
      .addField(
        "Linkler »",
"• **__[Botu Ekle]("+process.env.botdavet+")__**\n• **__[Destek Sunucusu]("+process.env.desteksunucu+")__**\n• **__[Website]("+process.env.botsite+")__**"
      )
      .setTimestamp()
      .setFooter(
        message.author.tag + " Tarafından istendi",
        message.author.avatarURL
      );
    message.channel.send(moderation2);
    return;
  } else {
    var arg = args[0];
  }
  if (!args[0]) {
    var arg = args[0];
  }

  if (!args[0]) {
    var arg = args[0];
  }
  ///// MODERASYON SON

  
  
  
  

  //////////////////// GLOBAL COMMANDS
  /////MUZIK
  if (args[0] === "muzik") {
    let muzik = [
      `ᅠᅠᅠᅠᅠᅠ\n<a:uyari:726935688913748039> Bu botda cok fazla komut oldugundan kaynaklı müzikler pingli(gecikmeli) çalabilir. <a:uyari:726935688913748039>\n\n» ${astariusprefix}oynat • Youtubeda İstediğiniz Bir Şarkıyı Aratır Ve Oynatır.\n» ${astariusprefix}durdur • Oynatılan Şarkıyı Devam Etmek Üzere Durdurur.\n» ${astariusprefix}devamet • Duraklatılan Şarkıyı Devam Ettir.\n» ${astariusprefix}geç • Oynatılan Şarkıyı Geçer.\n» ${astariusprefix}kuyruk • Kuyruk’ta Olan Müzikleri Gösterir.\n» ${astariusprefix}tekrar • Oynatılan Müziği Tekrar Oynatır.\n» ${astariusprefix}ses • Ses Seviyesini Ayarlarsınız.\nᅠᅠᅠᅠᅠᅠ`
    ];
    const muzik2 = new Discord.RichEmbed()
      .setColor("BLUE")
      .setTitle("●▬▬▬▬๑「MUZIK」๑▬▬▬▬▬●\n")
.setThumbnail(process.env.miniresim)
    .setDescription(muzik)
      .addField(
        "Linkler »",
"• **__[Botu Ekle]("+process.env.botdavet+")__**\n• **__[Destek Sunucusu]("+process.env.desteksunucu+")__**\n• **__[Website]("+process.env.botsite+")__**"
      )
      .setTimestamp()
      .setFooter(
        message.author.tag + " Tarafından istendi",
        message.author.avatarURL
      );
    message.channel.send(muzik2);
    return;
  } else {
    var arg = args[0];
  }
  if (!args[0]) {
    var arg = args[0];
  }

  if (!args[0]) {
    var arg = args[0];
  }
  /// MUZIK SON
  /////KULLANICI
  if (args[0] === "kullanıcı") {
    let kullanici = [
      ` ᅠᅠᅠᅠᅠᅠ\n» ${astariusprefix}seviyem • Seviyenizi gösterir.\n» ${astariusprefix}avatar • Avatarını gösterir.\n» ${astariusprefix}sunucubilgi • Sunucu bilgilerini gösterir.\n» ${astariusprefix}havadurumu • Hava Durumunu gösterir.\n» ${astariusprefix}yasaklar • Yasaklı kişileri gösterir.\n» ${astariusprefix}üyedurum • Üye durum gösterir.\n» ${astariusprefix}döviz • Döviz kurlarını gösterir.\n» ${astariusprefix}korona • Korona virüs durumunu gösterir.\n» ${astariusprefix}saat • Saati gösterir.\n» ${astariusprefix}youtube • Aradığınızı bulur.\n» ${astariusprefix}servericon • Sunucu resmini gösterir.\n» ${astariusprefix}say • Üyelerin sayısal durumu.\n» ${astariusprefix}hesapla • Toplama yapar.\n» ${astariusprefix}kısalt • Link kısaltır.\n» ${astariusprefix}banner • Yazınızı banner yapar.\n» ${astariusprefix}kanalbilgi • Kanalın bilgisini gösterir. \n» ${astariusprefix}istatistik • Bot istatistiklerini gösterir.\nᅠᅠᅠᅠᅠᅠ`
    ];
    const kullanici2 = new Discord.RichEmbed()
      .setColor("BLUE")
      .setTitle("●▬▬▬▬๑「KULLANICI」๑▬▬▬▬▬●\n")
.setThumbnail(process.env.miniresim)
    .setDescription(kullanici)
      .addField(
        "Linkler »",
   "• **__[Botu Ekle]("+process.env.botdavet+")__**\n• **__[Destek Sunucusu]("+process.env.desteksunucu+")__**\n• **__[Website]("+process.env.botsite+")__**"
      )
      .setTimestamp()
      .setFooter(
        message.author.tag + " Tarafından istendi",
        message.author.avatarURL
      );
    message.channel.send(kullanici2);
    return;
  } else {
    var arg = args[0];
  }
  if (!args[0]) {
    var arg = args[0];
  }

  if (!args[0]) {
    var arg = args[0];
  }
  /// KULLANICI SON

  ////EGLENCE
  if (args[0] === "eğlence") {
    let eglence = [
      `ᅠᅠᅠᅠᅠ\n» ${astariusprefix}herkesecay • Herkese çay ısmarlar.\n» ${astariusprefix}aşkölçer • Aşkınızı Ölçer.\n» ${astariusprefix}stresçarkı • Stres Çarkı Çevirirsiniz.\n» ${astariusprefix}alkışla • Alkışla gif'ini paylaşır.\n» ${astariusprefix}yazı-tura • Yazı-Tura Oynarsınız.\n» ${astariusprefix}tkm • Botla Taş Kagıt Makas Oynarsınız.\n» ${astariusprefix}cayic • Çay içmenizi sağlar.\nᅠᅠᅠᅠᅠ`
    ];
    const eglence2 = new Discord.RichEmbed()
      .setColor("BLUE")
      .setTitle("●▬▬▬▬๑「EĞLENCE」๑▬▬▬▬▬●\n")
.setThumbnail(process.env.miniresim)
    .setDescription(eglence)
      .addField(
        "Linkler »",
"• **__[Botu Ekle]("+process.env.botdavet+")__**\n• **__[Destek Sunucusu]("+process.env.desteksunucu+")__**\n• **__[Website]("+process.env.botsite+")__**"
    )
      .setTimestamp()
      .setFooter(
        message.author.tag + " Tarafından istendi",
        message.author.avatarURL
      );
    message.channel.send(eglence2);
    return;
  } else {
    var arg = args[0];
  }
  if (!args[0]) {
    var arg = args[0];
  }

  if (!args[0]) {
    var arg = args[0];
  }
  /// EGLENCE SON
  const astariusyardım = new Discord.RichEmbed()
    .setTitle("●▬▬▬▬๑「YARDIM」๑▬▬▬▬▬●")
  .setColor("RANDOM")
  .setThumbnail(process.env.miniresim)
  .setDescription(
      `ᅠᅠᅠᅠᅠᅠ\n» ${astariusprefix}hata-bildir • Hatalı komutları bildirir.\n» ${astariusprefix}davet • Botun davet bağlantısını atar.\n» ${astariusprefix}yapımcı • Yapımcı hakkında bilgi verir.\n\n» ${astariusprefix}yardım kullanıcı • Kullanıcı komutları gösterir.\n» ${astariusprefix}yardım muzik • Muzik komutlarını gösterir.\n» ${astariusprefix}yardım eğlence • Eğlence komutları gösterir.\n» ${astariusprefix}yardım yetkili • Yetkili komutları gösterir.\nᅠᅠᅠᅠᅠᅠ`
    )
    .addField(
      "Linkler »",
   "• **__[Botu Ekle]("+process.env.botdavet+")__**\n• **__[Destek Sunucusu]("+process.env.desteksunucu+")__**\n• **__[Website]("+process.env.botsite+")__**"   
    )
  .setImage("https://i.hizliresim.com/IWtJ4t.jpg")
    .setTimestamp()
    .setFooter(
      message.author.tag + " Tarafından istendi",
      message.author.avatarURL
    );
  message.channel.send(astariusyardım);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "kategorili yardım menüsü",
  usage: "yardım <kategori>"
};
