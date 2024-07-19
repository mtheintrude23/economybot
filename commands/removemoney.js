const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if (!message.content.startsWith('m/')) return;

  let ownerID = '1219514896778133594'; // Thay 'Your ID' bằng ID của bạn
  if (message.author.id !== ownerID) return;

  let user = message.mentions.members.first() || message.author;

  if (isNaN(args[1])) return;

  db.subtract(`money_${message.guild.id}_${user.id}`, args[1]);
  let bal = await db.fetch(`money_${message.guild.id}_${user.id}`);

  let moneyEmbed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<a:Tick:1228712635856453712> Đã xóa ${args[1]} xu\n\nSố dư hiện tại: ${bal}`);
  message.channel.send(moneyEmbed);
};

module.exports.help = {
  name: "remove",
  aliases: ["rm"],
  description: "Lệnh này cho phép chủ sở hữu bot xóa một số tiền từ tài khoản người dùng"
};
