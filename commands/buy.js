const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('m/'))return;  

    let user = message.author;

    let author = db.fetch(`money_${message.guild.id}_${user.id}`)

    let Embed = new Discord.RichEmbed()
    .setColor("#FFFFFF")
    .setDescription(`<:failed:1231261075886833876> Bạn cần 2000 Mcash để mua Đồng VIP`);

    if (args[0] == 'dong') {
        if (author < 3500) return message.channel.send(Embed)
        
        db.fetch(`dong_${message.guild.id}_${user.id}`);
        db.set(`dong_${message.guild.id}_${user.id}`, true)

        let Embed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<a:Tick:1228712635856453712> Đã mua Đồng VIP với 3500 Mcash`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 3500)
        message.channel.send(Embed2)
    } else if(args[0] == 'giaynikes') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:failed:1231261075886833876> Bạn cần 600 Mcash để mua một đôi Giày Nikes`);

        if (author < 600) return message.channel.send(Embed2)
       
        db.fetch(`giaynikes_${message.guild.id}_${user.id}`)
        db.add(`giaynikes_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<a:Tick:1228712635856453712> Đã mua Giày Nikes với 600 Mcash`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 600)
        message.channel.send(Embed3)
    } else if(args[0] == 'xehoi') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:failed:1231261075886833876> Bạn cần 800 Mcash để mua một chiếc Xe Hơi`);

        if (author < 800) return message.channel.send(Embed2)
       
        db.fetch(`xehoi_${message.guild.id}_${user.id}`)
        db.add(`xehoi_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<a:Tick:1228712635856453712> Đã mua một chiếc Xe Hơi với 800 Mcash`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 800)
        message.channel.send(Embed3)
    } else if(args[0] == 'bietthu') {
        let Embed2 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:failed:1231261075886833876> Bạn cần 1200 Mcash để mua một căn Biệt Thự`);

        if (author < 1200) return message.channel.send(Embed2)
       
        db.fetch(`bietthu_${message.guild.id}_${user.id}`)
        db.add(`bietthu_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<a:Tick:1228712635856453712> Đã mua một căn Biệt Thự với 1200 Mcash`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 1200)
        message.channel.send(Embed3)
    } else {
        let embed3 = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .setDescription('<:failed:1231261075886833876> Nhập một món hàng để mua')
        message.channel.send(embed3)
    }

}
  
module.exports.help = {
    name:"buy",
    aliases: [""],
    description: "Lệnh này cho phép bạn mua các vật phẩm bằng Mcash"
}
