const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('m/'))return;  

  let user = message.author;

  let timeout = 86400000;
  let amount = 200;

  let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
    let timeEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:failed:1231261075886833876> Bạn đã nhận phần thưởng hàng ngày\n\nBạn có thể nhận lại sau ${time.hours} giờ ${time.minutes} phút ${time.seconds} giây`);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<a:Tick:1228712635856453712> Bạn đã nhận được phần thưởng hàng ngày là ${amount} Mcash`);
    message.channel.send(moneyEmbed)
    db.add(`money_${message.guild.id}_${user.id}`, amount)
    db.set(`daily_${message.guild.id}_${user.id}`, Date.now())
  }
};

module.exports.help = {
  name: "daily",
  aliases: ["day"],
  description: "Lệnh này cho phép bạn nhận phần thưởng hàng ngày"
};
