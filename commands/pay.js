const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith('m/')) return;  

  let user = message.mentions.members.first(); 
  let member = db.fetch(`money_${message.guild.id}_${message.author.id}`);

  let embed1 = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:failed:1231261075886833876> Hãy đề cập đến ai đó để trả tiền`);

  if (!user) {
    return message.channel.send(embed1);
  }

  let embed2 = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:failed:1231261075886833876> Hãy nhập số tiền để trả`);

  if (!args[1]) {
    return message.channel.send(embed2);
  }

  let embed3 = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:failed:1231261075886833876> Bạn không thể trả số tiền âm cho ai đó`);

  if (message.content.includes('-')) { 
    return message.channel.send(embed3);
  }

  let embed4 = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:failed:1231261075886833876> Bạn không có đủ tiền`);

  if (member < args[1]) {
    return message.channel.send(embed4);
  }

  let embed5 = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<a:Tick:1228712635856453712> Bạn đã trả cho ${user.user.username} ${args[1]} xu`);

  message.channel.send(embed5);
  db.add(`money_${message.guild.id}_${user.id}`, args[1]);
  db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1]);
}

module.exports.help = {
  name: "pay",
  aliases: [""],
  description: "Lệnh này cho phép người dùng trả tiền cho người khác"
}
