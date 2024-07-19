const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('m!')) return;  

  let user = message.author;

  function isOdd(num) { 
    return num % 2 === 1;
  }

  let colour = args[0];
  let money = parseInt(args[1]);
  let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`);

  let random = Math.floor(Math.random() * 37);

  let moneyhelp = new Discord.EmbedBuilder()
    .setColor("#FFFFFF")
    .setDescription(`<:failed:1231261075886833876> Vui lòng chỉ định một số tiền để cược | m!roulette <color> <amount>`);

  let moneymore = new Discord.EmbedBuilder()
    .setColor("#FFFFFF")
    .setDescription(`<:failed:1231261075886833876> Bạn đang cược nhiều hơn số tiền hiện có`);

  let colorbad = new Discord.EmbedBuilder()
    .setColor("#FFFFFF")
    .setDescription(`<:failed:1231261075886833876> Chỉ định một màu | Đỏ [1.5x] Đen [2x] Xanh [15x]`);

  if (!colour) return message.channel.send(colorbad);
  colour = colour.toLowerCase();
  if (!money) return message.channel.send(moneyhelp); 
  if (money > moneydb) return message.channel.send(moneymore);

  if (colour === "b" || colour.includes("black")) colour = 0;
  else if (colour === "r" || colour.includes("red")) colour = 1;
  else if (colour === "g" || colour.includes("green")) colour = 2;
  else return message.channel.send(colorbad);

  if (random === 0 && colour === 2) { // Xanh
    money *= 15;
    db.add(`money_${message.guild.id}_${user.id}`, money);
    let moneyEmbed1 = new Discord.EmbedBuilder()
      .setColor("#FFFFFF")
      .setDescription(`<:Tick:1228712635856453712> Bạn đã thắng ${money} Mcash\n\nHệ số: 15x`);
    message.channel.send(moneyEmbed1);
    console.log(`${message.author.tag} Thắng ${money} trên màu xanh`);
  } else if (isOdd(random) && colour === 1) { // Đỏ
    money = parseInt(money * 1.5);
    db.add(`money_${message.guild.id}_${user.id}`, money);
    let moneyEmbed2 = new Discord.EmbedBuilder()
      .setColor("#FFFFFF")
      .setDescription(`<:Tick:1228712635856453712> Bạn đã thắng ${money} Mcash\n\nHệ số: 1.5x`);
    message.channel.send(moneyEmbed2);
  } else if (!isOdd(random) && colour === 0) { // Đen
    money = parseInt(money * 2);
    db.add(`money_${message.guild.id}_${user.id}`, money);
    let moneyEmbed3 = new Discord.EmbedBuilder()
      .setColor("#FFFFFF")
      .setDescription(`<:Tick:1228712635856453712> Bạn đã thắng ${money} Mcash\n\nHệ số: 2x`);
    message.channel.send(moneyEmbed3);
  } else { // Thua
    db.subtract(`money_${message.guild.id}_${user.id}`, money);
    let moneyEmbed4 = new Discord.EmbedBuilder()
      .setColor("#FFFFFF")
      .setDescription(`<:failed:1231261075886833876> Bạn đã thua ${money} Mcash\n\nHệ số: 0x`);
    message.channel.send(moneyEmbed4);
  }
};

module.exports.help = {
  name: "roulette",
  aliases: ["roul"],
  description: "Cược tiền vào màu đỏ, đen hoặc xanh trong trò roulette"
};
