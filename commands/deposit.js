const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith('m/')) return;

  let user = message.author;

  let member = db.fetch(`money_${message.guild.id}_${user.id}`);
  let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`);

  if (args[0] == 'all') {
    let money = await db.fetch(`money_${message.guild.id}_${user.id}`);
    let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`);

    let embedbank = new Discord.RichEmbed()
      .setColor('#FFFFFF')
      .setDescription("<:failed:1231261075886833876> Bạn không có tiền để gửi");

    if (money === 0) return message.channel.send(embedbank);

    db.add(`bank_${message.guild.id}_${user.id}`, money);
    db.subtract(`money_${message.guild.id}_${user.id}`, money);
    let embed5 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`<a:Tick:1228712635856453712> Bạn đã gửi tất cả tiền của mình vào ngân hàng`);
    message.channel.send(embed5);

  } else {

    let embed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`<:failed:1231261075886833876> Vui lòng chỉ định số tiền để gửi`);

    if (!args[0]) {
      return message.channel.send(embed2)
        .catch(err => console.log(err));
    }
    let embed3 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`<:failed:1231261075886833876> Bạn không thể gửi số tiền âm`);

    if (message.content.includes('-')) {
      return message.channel.send(embed3);
    }
    let embed4 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`<:failed:1231261075886833876> Bạn không có đủ tiền để gửi`);

    if (member < args[0]) {
      return message.channel.send(embed4);
    }

    let embed5 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`<a:Tick:1228712635856453712> Bạn đã gửi ${args[0]} Mcash vào ngân hàng`);

    message.channel.send(embed5);
    db.add(`bank_${message.guild.id}_${user.id}`, args[0]);
    db.subtract(`money_${message.guild.id}_${user.id}`, args[0]);
  }
}

module.exports.help = {
  name: "deposit",
  aliases: ["dep"],
  description: "Lệnh này cho phép bạn gửi tiền vào ngân hàng"
}
