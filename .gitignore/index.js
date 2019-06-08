const Discord = require('discord.js');
const bot = new Discord.Client();
var PREFIX = "p."
const fs = require('fs')
const urban = require("relevant-urban");
const_embed = new Discord.RichEmbed()
var tokenp = "NTg0Mzc4NDMyNjU0MTQ3NjA0.XPKDAw.P0C_FlO4f8BZKduZeGN1QJwvYZY"
var tokenu = "MzQ4MDY0OTkxNTE5NDQwODk3.XO5ZrA.MUFrJlBFfZ5EJcP8P2CD5ePMQDk"
var tokenz = "NTc1NzYwMTc5OTQxODY3NTMy.XPKDRg.oUARmaEA4O2YugD9k79Hg91nLnY"
const warns = JSON.parse(fs.readFileSync('./warns.json'))
const moment = require('moment')
//EVENEMENTS
bot.on('ready', () => {
    console.log(`Prêt a travailler`);
  });
  
  /*bot.on('ready', function() {
    bot.user.setActivity("p.help pour de l'aide !")
  });*/

bot.login(tokenp)

//say en embed
bot.on('message', async message => {
    if(message.content.startsWith(PREFIX + "saye")) {
        message.delete()
      var args = message.content.split(" ").slice(1);
      var msge = args.join(' ');
  
      if(!msge) return message.channel.send('Veuillez indiquer le contenu du message a envoyer')
      let saye_embed = new Discord.RichEmbed()
      .setTitle('**Message**')
      .setColor('FF0000')
      .setThumbnail(message.author.avatarURL)
      .setDescription(msge)
      message.channel.send(saye_embed)
    }
  })

/*Kick*/
bot.on('message', function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLowerCase() === PREFIX + 'kick') {
    message.delete()
     if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande.**")
     let member = message.mentions.members.first()
     if (!member) return message.channel.send("**Veuillez mentionner un utilisateur.**")
     let reason = args.slice(2).join(' ')
        if (!reason) return message.channel.send("Veuillez indiquer une raison")
     if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("**Vous ne pouvez pas kick cet utilisateur.**")
     if (!member.kickable) return message.channel.send("**Je ne peux pas exclure cet utilisateur.**")
     member.kick(reason)
     var kick_embed = new Discord.RichEmbed()
     .setTitle(member.user.username + " ** a été kick du serveur**")
     .setThumbnail("https://www.seek-team.com/uploads/media/avatar/0001/56/thumb_55215_avatar_xl.jpeg")
     .setColor("F9A200")
     .setDescription("**Motif : ** " + reason)
     .addField("**Modérateur : ** " + message.author.username, "_Il pourra revenir à l'aide d'une nouvelle invitation._")
     message.channel.send(kick_embed)
  }
})

/*Ban*/
bot.on('message', function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLocaleLowerCase() === PREFIX + 'ban') {
    message.delete()
     if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande**")
     let member = message.mentions.members.first()
     if (!member) return message.channel.send("**Veuillez mentionner un utilisateur**")
     let reason = args.slice(2).join(' ')
     if (!reason) return message.channel.send("**Veuillez indiquer une raison**")
     if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("**Vous ne pouvez pas bannir cet utilisateur**")
     if (!member.bannable) return message.channel.send("**Je ne peux pas bannir cet utilisateur**")
     message.guild.ban(member, "Motif : " + reason + " Modérateur : " + message.author.username)
     var ban_embed = new Discord.RichEmbed()
     .setTitle(member.user.username + " ** a été ban du serveur**")
     .setColor("FF0000")
     .setThumbnail("https://www.seek-team.com/uploads/media/avatar/0001/56/thumb_55215_avatar_xl.jpeg")
     .setDescription("**Motif : **" + reason)
     .addField("**Modérateur : **" + message.author.username, "_Il pourra revenir seulement si il est unban, et avec une nouvelle invitation._")
     message.channel.send(ban_embed)
     console.log(member.user.username + " a été banni du serveur par : " + message.author.username)
     if(member.guild.id === "507890637354434563")
     var logs_embed = new Discord.RichEmbed()
      .setTitle(member.user.username + " ** a été ban**")
      .setColor("61d1f6")
      .setDescription("**Modérateur : ** " + message.author.username)
      .addField("**Motif : ** " + reason, "_Il pourra être unban dans les paramètres du serveur_")
      bot.channels.get('549202086999359489').send(logs_embed)
  }
})

  //recrutement
bot.on('message', async message => {
    if(message.content === PREFIX + "rc") {
        message.delete()
        let rc_embed = new Discord.RichEmbed()
        .setTitle("**Recrutements P4L**")
        .setThumbnail("https://www.seek-team.com/uploads/media/avatar/0001/56/thumb_55215_avatar_xl.jpeg")
        .setColor("17FF00")
        .setDescription("Les recrutements P4L Joueurs sont fermés pour le moment et aucune date n'a été donnée pour les prochaines sessions.")
    message.channel.send(rc_embed)
    }
})


//saye normal
bot.on('message', async message => {
    if(message.content === PREFIX + "say") {
        message.delete()
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Vous n'avez les permissions nécéssaires pour faire cette commande.**")
        var args = message.content.split(" ").slice(1);
        var msge1 = args.join(' ');
        if(!msge1) return message.channel.send("Veuillez indiquer le contenu du message.")
        message.channel.send(msge1)
    }
})

//mp all member
bot.on('message', async message => {
if(message.content === PREFIX + "mpall") {
  message.delete()
  var args = message.content.split(" ").slice(1);


  if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("❌ Tu n'as pas la permission d'utiliser cette commande!");

  var mpall = new Discord.RichEmbed()
  .setTitle("**P4L E-SPORT**")
  .setColor("61d1f6")
  .setThumbnail("https://www.seek-team.com/uploads/media/avatar/0001/56/thumb_55215_avatar_xl.jpeg")
  .setDescription("https://discord.gg/3Shw6Jk")
  message.delete()
  message.guild.members.map(m => m.send(mpall))
  console.log('mp envoyé')
}
})

//mp member
bot.on('message', async message => {
  if(message.content === PREFIX + "mp") {

  }
})

//warn
bot.on("message", function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLowerCase() === PREFIX + "warn") {
    message.delete()
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande**")
      let member = message.mentions.members.first()
      if (!member) return message.channel.send("**Veuillez mentionner un membre**")
      if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("**Vous ne pouvez pas warn ce membre**")
      let reason = args.slice(2).join(' ')
      if (!reason) return message.channel.send("**Veuillez indiquer une raison**")
      if (!warns[member.id]) {
          warns[member.id] = []
      }
      warns[member.id].unshift({
          reason: reason,
          date: Date.now,
          mod: message.author.id
      })
      fs.writeFileSync('./warns.json', JSON.stringify(warns))
      var warn_embed = new Discord.RichEmbed()
      .setTitle(member.user.username + " ** a été warn**")
      .setColor("F7FF00")
      .setThumbnail("https://www.seek-team.com/uploads/media/avatar/0001/56/thumb_55215_avatar_xl.jpeg")
      .setDescription("**Motif : ** " + reason)
      .addField("**Modérateur : ** " + message.author.username, "_Au bout de 3 warns, ban de 1 semaine !_")
      message.channel.send(warn_embed)
      if(member.guild.id === "507890637354434563")
      var logs_embed = new Discord.RichEmbed()
      .setTitle(member.user.username + " ** a été warn**")
      .setColor("61d1f6")
      .setDescription("**Modérateur : ** " + message.author.username)
      .addField("**Motif : ** " + reason, "_Il pourra être unwarn avec la commande p.unwarn_")
      bot.channels.get('549202086999359489').send(logs_embed)
  }
})

//unwarn
bot.on("message", function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)
if (args[0].toLowerCase() === PREFIX + "unwarn") {
  message.delete()
  let member = message.mentions.members.first()
  if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande.**")
  if(!member) return message.channel.send("**Membre introuvable**")
  if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("**Vous ne pouvez pas unwarn ce membre.**")
  if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("**Je ne pas unwarn ce membre.**")
  if(!warns[member.id] || !warns[member.id].length) return message.channel.send("**Ce membre n'a actuellement aucun warns.**")
  warns[member.id].shift()
  fs.writeFileSync('./warns.json', JSON.stringify(warns))
  var unwarn_embed = new Discord.RichEmbed()
  .setTitle("**Le dernier warn de ** " + member.user.username + " ** a été retiré.**")
  .setColor("3AFF00")
  .setThumbnail("https://www.seek-team.com/uploads/media/avatar/0001/56/thumb_55215_avatar_xl.jpeg")
  .setDescription("**Modérateur : ** " + message.author.username)
  message.channel.send(unwarn_embed)
  if(member.guild.id === "507890637354434563")
  var logs_embed = new Discord.RichEmbed()
  .setTitle(member.user.username + " ** a été unwarn**")
  .setColor("61d1f6")
  .setDescription("**Modérateur : ** " + message.author.username)
  bot.channels.get('549202086999359489').send(logs_embed)
}
})

//infractions
bot.on("message", function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)
if (args[0].toLowerCase() === PREFIX + "infractions") {
  message.delete()
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
  let member = message.mentions.members.first()
  if (!member) return message.channel.send("Veuillez mentionner un membre")
  let infraction_embed = new Discord.RichEmbed()
      .setAuthor(member.user.username, member.user.displayAvatarURL)
      .setColor("FF0000")
      .addField("Warns de l'utilisateur", ((warns[member.id] && warns[member.id].length) ? warns[member.id].slice(0, 10).map(e => e.reason) : "Ce membre n'a aucun warns"))
      .setTimestamp()
  message.channel.send(infraction_embed)
}
})

//mute
bot.on('message', function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

if (args[0].toLowerCase() === PREFIX + "mute") {
  message.delete()
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande**")
  let member = message.mentions.members.first()
  if (!member) return message.channel.send("**Membre introuvable**")
  let reason = args.slice(2).join(' ')
      if (!reason) return message.channel.send("**Veuillez indiquer une raison**")
  if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("**Vous ne pouvez pas mute ce membre**")
  if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("**Je ne peux pas mute ce membre**")
  let muterole = message.guild.roles.find(role => role.name === 'Muted')
  if (muterole) {
      member.addRole(muterole)
      member.removeRole("521270067254788127")
      member.removeRole("582208495320039425")
      member.removeRole("582208524638224384")
      member.removeRole("582214578440503297")
      member.removeRole("582218474466574354")
      member.removeRole("582208466144460801")
      member.removeRole("582214485419229184")
      var mute_embed = new Discord.RichEmbed()
      .setTitle(member.user.username + " ** a été mute**")
      .setColor("F0FF00")
      .setThumbnail("https://www.seek-team.com/uploads/media/avatar/0001/56/thumb_55215_avatar_xl.jpeg")
      .setDescription("**Motif : ** " + reason)
      .addField("**Modérateur : ** " + message.author.username, "_Il pourra être unmute par un modérateur à l'aide de la commande p.unmute_")
      if(member.guild.id === "507890637354434563")
      var logs_embed = new Discord.RichEmbed()
      .setTitle(member.user.username + " ** a été mute**")
      .setColor("61d1f6")
      .setDescription("**Modérateur : ** " + message.author.username)
      .addField("**Motif : ** " + reason, "_Il pourra être unmute avec la commande p.unmute_")
      bot.channels.get('549202086999359489').send(logs_embed)
      message.channel.send(mute_embed)
  }
  else {
      message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
          message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
              channel.overwritePermissions(role, {
                  SEND_MESSAGES: false
              })
          })
          member.addRole(role)
          message.channel.send(member + ' a été mute :white_check_mark:')
      })
  }
}
})

//unmute
bot.on("message", function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)
if (args[0].toLowerCase() === PREFIX + "unmute") {
  message.delete()
  if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande.**")
  let member = message.mentions.members.first()
  if(!member) return message.channel.send("Membre introuvable")
  if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("**Vous ne pouvez pas unmute ce membre.**")
  if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("**Je ne pas unmute ce membre.**")
  let muterole = message.guild.roles.find(role => role.name === 'Muted')
  if(muterole && member.roles.has(muterole.id)) 
  member.removeRole(muterole)
  member.addRole("521270067254788127")
  var unmute_embed = new Discord.RichEmbed()
  .setTitle(member.user.username + " ** a été unmute**")
  .setColor("61d1f6")
  .setThumbnail("https://www.seek-team.com/uploads/media/avatar/0001/56/thumb_55215_avatar_xl.jpeg")
  .setDescription("**Modérateur : ** " + message.author.username)
  message.channel.send(unmute_embed)
  if(member.guild.id === "507890637354434563")
  var logs_embed = new Discord.RichEmbed()
  .setTitle(member.user.username + " ** a été unmute**")
  .setColor("62FA00")
  .setDescription("**Modérateur : ** " + message.author.username)
  bot.channels.get('549202086999359489').send(logs_embed)
}
})

//clear
bot.on('message', function (message) {
  if (!message.guild) return
  let args = message.content.trim().split(/ +/g)

  if (args[0].toLowerCase() === PREFIX + "clear") {
    message.delete()
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
      let count = args[1]
      if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
      if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
      if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
      message.channel.bulkDelete(parseInt(count) + 1)
  }
})

//pub discord
bot.on('message', message => {
  const discord_pub = "https://discord.gg/"
  if(message.content.startsWith(discord_pub) ) {
    message.delete()
    let args = message.content.trim().split(/ +/g)
    const memberss = message.author.username
    let member = message.author.username
    let pub_embed = new Discord.RichEmbed()
    .setTitle('**Publicités discord**')
    .setThumbnail('https://upload.wikimedia.org/wikipedia/fr/thumb/0/05/Discord.svg/1024px-Discord.svg.png')
    .setColor('7AFF33')
    .addField(member + " ** Les publicités discord sont interdites sur ce channel ** ", "_De même les publicités en message privé sont aussi interdites et sanctionnable d'un ban temporaire de 2 jours._" )
    message.channel.send(pub_embed)
    var logs1_embed = new Discord.RichEmbed()
    .setTitle("**Message supprimé**")
    .setColor("61d1f6")
    .setDescription("**Auteur du message : ** " + message.author.username)
    .addField("**Modérateur : ** " + "P4L-BOT", "_Contenu du message : _ " + "Publicité Discord")
    bot.channels.get('549202086999359489').send(logs1_embed)
  }
})

//BF
bot.on('message', message => {
  let args = message.content.trim().split(/ +/g)
  if (args[0].toLowerCase() === PREFIX + "bf") {
    message.delete()
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Vous n'avez les permissions nécéssaires pour faire cette commande.**")
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("**Veuillez mentionner un membre**")
    var bf20_embed = new Discord.RichEmbed()
    .setDescription(member + " pour les demandes de buildfight, de duo, et de squad, merci de te rendre sur le salon " + "<#508360459787960330>" + ".")
    .setColor("61d1f6")
    .setThumbnail("https://www.seek-team.com/uploads/media/avatar/0001/56/thumb_55215_avatar_xl.jpeg")
    .setFooter("Code : P4L - BOT")
    message.channel.send(bf20_embed)
  }
})



//publicités youtube
bot.on('message', message => {
  const youtube_pub = "https://youtu.be/"
  let member = message.author.username
  if (message.content.startsWith(youtube_pub)) {
    message.delete()
    let member = message.author.username
    let youtube_embed = new Discord.RichEmbed()
    .setTitle('**Publicité youtube**')
    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/b/b2/YouTube_logo_%282013-2015%29.png')
    .setColor('61d1f6')
    .addField(member + " ** Les publicités youtubes sont interdites sur ce channel ** ", "_De même les publicités en message privé sont aussi interdites et sanctionnable d'un ban temporaire de 2 jours._")
    message.channel.send(youtube_embed)
    if(member.guild.id === "507890637354434563")
    var logs1_embed = new Discord.RichEmbed()
    .setTitle("**Message supprimé**")
    .setColor("FA7D00")
    .setDescription("**Auteur du message : ** " + message.author.username)
    .addField("**Modérateur : ** " + "P4L-BOT", "_Contenu du message : _ " + "Publicité YouTube")
    bot.channels.get('549202086999359489').send(logs1_embed)
  }
})

//invite
bot.on('message', message => {
  if(message.content === PREFIX +"invite") {
    message.delete()
    var invite_embed = new Discord.RichEmbed()
    .setTitle("**P4L E-SPORT**")
    .setColor("7AFF33")
    .setThumbnail("https://www.seek-team.com/uploads/media/avatar/0001/56/thumb_55215_avatar_xl.jpeg")
    .setDescription("https://discord.gg/3Shw6Jk")
  message.channel.send(invite_embed)
  }
})

//Fake ban
bot.on('message', message => {
  let args = message.content.trim().split(/ +/g)
  if (args[0].toLowerCase() === PREFIX + "banid") {
    message.delete()
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Vous n'avez pas les permissions nécéssaires pour utiliser cette commande.**")
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("**Veuillez mentionner un membre**")
    message.channel.send(member + " ** a été ban du serveur. :ballot_box_with_check: **")
  }
})

//commandes
bot.on('message', message => {
  if(message.content === PREFIX + "commandes") {
    message.delete()
    let member = message.author
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**Vous n'avez pas la permission d'utiliser cette commande.**")
    var command_embed = new Discord.RichEmbed()
    .setTitle("**P4L E-SPORT**")
    .setColor("61d1f6")
    .setThumbnail("https://www.seek-team.com/uploads/media/avatar/0001/56/thumb_55215_avatar_xl.jpeg")
    .setDescription("**Voici la liste des commandes du bot : **")
    .addField("**Bannir un membre**", "_p.ban [membre] [raison]_")
    .addField("**Kick un membre**", "_p.kick [member] [raison]_")
    .addField("**Warn un membre**", "_p.warn [member] [raison]_")
    .addField("**Regarder les warns d'un membre**", "_p.infractions [member]_")
    .addField("**Unwarn**", "_p.unwarn [member]_")
    .addField("**Mute**", "_p.mute [member] [raison]_")
    .addField("**Unmute**", "_p.unmute [member]_")
    .addField("**Bloquer les demandes de bf sur général**", "_p.bf [member]_")
    .addField("**Recrutements P4L**", "_p.rc_")
    .addField("**Répéter un message avec le bot**", "_p.saye [message]_")
    member.createDM().then(channel => {
      channel.send(command_embed)
      let member = message.author.username
      message.channel.send("**" + member + "** **, tu as reçu en message privé les commandes du bot !**")
    })
  }
})

bot.on('message', message => {
  if(message.content === PREFIX + "avatar") {
    message.delete()
    message.channel.send(message.author.avatarURL)
  }
})


//userinfo
bot.on('message', message => {
    if(message.content.startsWith(PREFIX + "userinfo")) {
      message.delete()
    let member = message.mentions.members.first() || message.member;
    if(!member) return message.channel.send("Veuillez mentionnez un membre")
    var user_embed = new Discord.RichEmbed()
    .setTitle(message.author.username)
    .setColor("61d1f6")
    .setThumbnail(member.user.avatarURL)
    .addField("**Nom du compte : ** ", member.user.username)
    .addField("**ID du membre : ** ", member.id)
    .addField("**A rejoins le serveur le**", moment.utc(member.joinedAt).format('L') + " (à " + moment.utc(member.joinedAt).format('LTS') + ")")
    .addField("**Création du compte ** ", moment.utc(member.user.createdAt).format("L") + " (à " + moment.utc(member.user.createdAt).format('LTS') + ")")
    message.channel.send(user_embed)
  }
})


//blacklist
bot.on('message', message => {
  let blacklist = ["bf"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.channel.id === "507902007047356417")
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var bf_embed = new Discord.RichEmbed()
      .setTitle("**Demandes de Buildfight**")
      .setThumbnail("https://images-ext-1.discordapp.net/external/bFUYDR8XD4pzOH1MrUfFOLTbdmHLiW1jUlEm2ejJl_4/https/pbs.twimg.com/media/DrFx2X5W4AIxz1j.jpg")
      .setColor("61d1f6")
      .setDescription(message.author.username + " ** pour les demandes de buildfight, de duo, de squad, ou de mooving zone, merci de te rendre sur le salon : ** " + "<#508360459787960330>")
      .setFooter("Code : P4L-BOT")
      message.channel.send(bf_embed)
      var logs_embed = new Discord.RichEmbed()
      .setTitle("**Un message a été supprimé**")
      .setColor("61d1f6")
      .setDescription("**Channel : ** " + message.channel.name)
      .addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
      .setTimestamp()
    bot.channels.get('549202086999359489').send(logs_embed)
    }
  }
})

bot.on('message', message => {
  let blacklist = ["buildfight"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      if(message.channel.id === "507902007047356417"){
      message.delete()
      var bf_embed = new Discord.RichEmbed()
      .setTitle("**Demandes de Buildfight**")
      .setThumbnail("https://images-ext-1.discordapp.net/external/bFUYDR8XD4pzOH1MrUfFOLTbdmHLiW1jUlEm2ejJl_4/https/pbs.twimg.com/media/DrFx2X5W4AIxz1j.jpg")
      .setColor("61d1f6")
      .setDescription(message.author.username + " ** pour les demandes de buildfight, de duo, de squad, ou de mooving zone, merci de te rendre sur le salon : ** " + "<#508360459787960330>")
      .setFooter("Code : P4L-BOT")
      message.channel.send(bf_embed)
      var logs_embed = new Discord.RichEmbed()
      .setTitle("**Un message a été supprimé**")
      .setColor("61d1f6")
      .setDescription("**Channel : ** " + message.channel.name)
      .addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
      .setTimestamp()
    bot.channels.get('549202086999359489').send(logs_embed)
    }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["connard"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["salope"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["enculé"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["batard"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["pute"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["salopard"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["nique ta mère"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["Pétasse"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["Catin"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["Pédé"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["PD"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["Pédale"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["petite bite"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["couille morte"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["shemale"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["Nègre"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["Nazi"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["hitler"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["bâtards"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["sucer des bites"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["sucé des bites"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', async message => {
  let args = message.content.trim().split(/ +/g)
  if(message.channel.id === "586891785649782784") 
  if(message.content.startsWith(PREFIX + "def")) {
    if (!args[0]) return message.channel.send(`***Veuillez spécifiez un mot.!***`);

    let res = await urban(args.join(' ')).catch(e => {
        return message.channel.send("***Désolé, je ne trouve pas ce mot ***");
    });

    const def_embed = new Discord.RichEmbed()
        .setColor('RANDOM') 
        .setTitle(res.word) 
        .setURL(res.urbanURL) 
        .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
        .addField('Author', res.author, true) 
        .addField('Rating', `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`)

    if (res.tags.length > 0 && res.tags.join(', ').length < 1024) {
        def_embed.addField('Tags', res.tags.join(', '), true) 
    }

    message.channel.send(def_embed); 
  }
})

bot.on('message', message => {
  let blacklist = ["connasse"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["Slae suceuse de bite"]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})

bot.on('message', message => {
  let blacklist = ["Mieux vaut être radicalisé que ridiculisé."]
  let foundInText = false;
  for (var i in blacklist) {
    if(message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
    if(foundInText) {
      message.delete()
      var insulte_embed = new Discord.RichEmbed()
      .setTitle("**Insultes**")
      .setThumbnail("http://www.val2c.fr/wp-content/uploads/2018/06/panneau-attention-614x539.png")
      .setColor("FF0000")
      .setDescription(message.author.username + " ** les insultes sont interdites, merci de surveiller ton language.**")
      .setFooter("Code : P4L-BOT")
      message.channel.send(insulte_embed)
      if(message.guild.id === "507890637354434563") {
      var logs_embed = new Discord.RichEmbed()
.setTitle("**Un message a été supprimé**")
.setColor("61d1f6")
.setDescription("**Channel : ** " + message.channel.name)
.addField("**Contenu du message : ** " + message.content, "**Auteur : ** " + message.author.username)
.setTimestamp()
bot.channels.get('549202086999359489').send(logs_embed)
      }
    }
  }
})
