const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('m/')) return;  

    const embed = new Discord.RichEmbed()
    .setDescription(`**Nhập Tùy Chọn Bảng Xếp Hạng**\n\nBảng Xếp Hạng Tiền: m/leaderboard coins\nBảng Xếp Hạng Nikes: m/leaderboard nikes\nBảng Xếp Hạng Xe Hơi: m/leaderboard car\nBảng Xếp Hạng Biệt Thự: m/leaderboard mansion`)
    .setColor("#FFFFFF");

    if(!args[0]) return message.channel.send(embed);

    if (args[0] == 'coins') {
        let money = db.startsWith(`money_${message.guild.id}`, { sort: '.data'});
        let content = "";

        for (let i = 0; i < money.length; i++) {
            let user = bot.users.get(money[i].ID.split('_')[2]).username;
            content += `${i+1}. ${user} ~ ${money[i].data}\n`;
        }

        const embed = new Discord.RichEmbed()
        .setDescription(`**Bảng Xếp Hạng Tiền Của ${message.guild.name}**\n\n${content}`)
        .setColor("#FFFFFF");

        message.channel.send(embed);
    } else if(args[0] == 'nikes') {
        let nike = db.startsWith(`nikes_${message.guild.id}`, { sort: '.data'});
        let content = "";

        for (let i = 0; i < nike.length; i++) {
            let user = bot.users.get(nike[i].ID.split('_')[2]).username;
            content += `${i+1}. ${user} ~ ${nike[i].data}\n`;
        }

        const embed = new Discord.RichEmbed()
        .setDescription(`**Bảng Xếp Hạng Nikes Của ${message.guild.name}**\n\n${content}`)
        .setColor("#FFFFFF");

        message.channel.send(embed);
    } else if(args[0] == 'car') {
        let cars = db.startsWith(`car_${message.guild.id}`, { sort: '.data'});
        let content = "";

        for (let i = 0; i < cars.length; i++) {
            let user = bot.users.get(cars[i].ID.split('_')[2]).username;
            content += `${i+1}. ${user} ~ ${cars[i].data}\n`;
        }

        const embed = new Discord.RichEmbed()
        .setDescription(`**Bảng Xếp Hạng Xe Hơi Của ${message.guild.name}**\n\n${content}`)
        .setColor("#FFFFFF");

        message.channel.send(embed);
    } else if(args[0] == 'mansion') {
        let mansions = db.startsWith(`house_${message.guild.id}`, { sort: '.data'});
        let content = "";

        for (let i = 0; i < mansions.length; i++) {
            let user = bot.users.get(mansions[i].ID.split('_')[2]).username;
            content += `${i+1}. ${user} ~ ${mansions[i].data}\n`;
        }

        const embed = new Discord.RichEmbed()
        .setDescription(`**Bảng Xếp Hạng Biệt Thự Của ${message.guild.name}**\n\n${content}`)
        .setColor("#FFFFFF");

        message.channel.send(embed);
    }
};

module.exports.help = {
    name: "leaderboard",
    aliases: ["leader", "lb"],
    description: "Lệnh này hiển thị bảng xếp hạng cho các danh mục khác nhau"
};
