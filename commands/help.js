const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('m/'))return;  

    let embed = new Discord.RichEmbed()
    .setTitle("Trung Tâm Trợ Giúp Economy Bot [Prefix m/]")
    .addField("Lệnh Kinh Tế", "`work` `beg` `rob` `pay` `balance` `profile` `withdraw` `deposit` `daily` `weekly` `store` `buy` `sell`")
    .addField("Lệnh Cờ Bạc", "`roulette` `slots`")
    .addField("Lệnh Kinh Tế Bổ Sung", "`storeinfo [item]`")
    .setColor("#FFFFFF");
    message.channel.send(embed);
}

module.exports.help = {
  name: "help",
  aliases: [""],
  description: "Lệnh này hiển thị các lệnh có sẵn trong bot"
}
