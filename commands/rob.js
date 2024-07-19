const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith('m/')) return;  

  let user = message.mentions.members.first();
  if (!user) return message.channel.send("Vui lòng đề cập đến một người dùng để cướp tiền.");

  let targetUserMoney = await db.fetch(`money_${message.guild.id}_${user.id}`);
  let authorRobTime = await db.fetch(`rob_${message.guild.id}_${message.author.id}`);
  let authorMoney = await db.fetch(`money_${message.guild.id}_${message.author.id}`);

  let timeout = 600000; // 10 phút

  if (authorRobTime !== null && timeout - (Date.now() - authorRobTime) > 0) {
    let time = ms(timeout - (Date.now() - authorRobTime));

    let timeEmbed = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`<:Cross:618736602901905418> Bạn đã cướp tiền rồi\n\nThử lại sau ${time.minutes}m ${time.seconds}s`);
    return message.channel.send(timeEmbed);
  }

  if (authorMoney < 200) {
    let moneyEmbed = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`<:Cross:618736602901905418> Bạn cần ít nhất 200 xu trong ví để cướp tiền`);
    return message.channel.send(moneyEmbed);
  }

  if (targetUserMoney <= 0) {
    let moneyEmbed2 = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`<:Cross:618736602901905418> ${user.user.username} không có gì để bạn cướp`);
    return message.channel.send(moneyEmbed2);
  }

  let vip = await db.fetch(`bronze_${user.id}`);
  let random = vip ? Math.floor(Math.random() * 200) + 1 : Math.floor(Math.random() * 100) + 1;

  let embed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:Check:618736570337591296> Bạn đã cướp ${user} và lấy được ${random} xu`);

  message.channel.send(embed);

  db.subtract(`money_${message.guild.id}_${user.id}`, random);
  db.add(`money_${message.guild.id}_${message.author.id}`, random);
  db.set(`rob_${message.guild.id}_${message.author.id}`, Date.now());
};

module.exports.help = {
  name: "rob",
  aliases: [""],
  description: "Cướp tiền từ người dùng khác"
};
