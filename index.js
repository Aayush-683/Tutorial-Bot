const Discord = require("discord.js")
const bot = new Discord.Client()
const PREFIX = "YOUR_PREFIX_HERE"

bot.login("TOKEN_HERE")

bot.on("ready", () => {
    console.log("Moderation bot by Oofy is booted up :D")
});

bot.on("message", message => {
    if(message.author.bot) return;
    if (message.content.indexOf(PREFIX) !== 0) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase()
        if (cmd === "help") {
            const helpEmbed = new Discord.MessageEmbed()
                    .setTitle(`${bot.user.username}'s Help Menu`)
                    .setDescription(`**PREFIX - \`${PREFIX}\`**`)
                    .addField("`ping`", "Check my latency to discord servers :D")
                    .addField("`kick`", `Kick someone for being disgracefull\n**Usage: ${PREFIX}kick [@USER] <REASON>**`)
                    .addField("`ban`", `Ban someone for being naughty\n**Usage: ${PREFIX}ban [@USER] <REASON>**`)
                    .addField("`add`", `Add a role to a user\n**Usage: ${PREFIX}add [@USER] [ROLE]**`)
                    .addField("`remove`", `Remove a role from a user\n**Usage: ${PREFIX}remove [@USER] [ROLE]**`)
                    .addField("`purge`", `Delete messages in bulk and be lazy :P\n**Usage: ${PREFIX}purge [AMOUNT]**`)
                    .addField("`rps`", `A fun rps command lel\n**Usage: ${PREFIX}rps [rock / paper / scissors]**`)
            message.channel.send(helpEmbed)
        }

        if (cmd === "ping") {
            message.channel.send(`Pong!\n**Took ${Date.now() - message.createdTimestamp}ms**`)
        }

        if (cmd === "kick") {
            if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Missing Permissions... [Kick members]").then(msg => msg.delete({ timeout : 10000}))
                const member = message.mentions.members.first()
                if(!member) return message.channel.send("You need to mention someone...").then(msg => msg.delete({ timeout : 10000}))
                if (!member.kickable) return message.channel.send("Unable to kick the user... check my role and perms lol").then(msg => msg.delete({ timeout : 10000}))
                const reason = args.slice(1).join(" ")
                if(member) {
                    if(!reason) return member.kick().then(member => {message.channel.send(`**${member.user.tag} was kicked**`);
                })

                if(reason) return member.kick(reason).then(member => {message.channel.send(`**${member.user.tag} was kicked**\n> Reason - \`${reason}\``);
            })
          }
        }

        if (cmd === "ban") {
            if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Missing Permissions... [Ban members]").then(msg => msg.delete({ timeout : 10000}))
                const member = message.mentions.members.first()
                if(!member) return message.channel.send("You need to mention someone...").then(msg => msg.delete({ timeout : 10000}))
                if (!member.bannable) return message.channel.send("Unable to ban the user... check my role and perms lol").then(msg => msg.delete({ timeout : 10000}))
                const reason = args.slice(1).join(" ")
                if(member) {
                    if(!reason) return member.ban().then(member => {message.channel.send(`**${member.user.tag} was kicked**`);
                })

                if(reason) return member.ban(reason).then(member => {message.channel.send(`**${member.user.tag} was kicked**\n> Reason - \`${reason}\``);
            })
          }
        }

        if (cmd === "add") {
            if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("Missing Permissions... [Manage roles]").then(msg => msg.delete({ timeout : 10000}))
            const member = message.mentions.members.first()
            if (!member) return message.channel.send("You need to mention someone :/").then(msg => msg.delete({ timeout : 10000}))
            const add = args.slice(1).join(" ")
            if (!add) return message.channel.send("You didn't gimme a role lol").then(msg => msg.delete({ timeout : 10000}))
            const roleADD = message.guild.roles.cache.find(role => role.name === add)
            if (!roleADD) return message.channel.send(`A role called \`${add}\` doesn't exists!`).then(msg => msg.delete({ timeout : 10000}))
            if (member.roles.cache.get(roleADD.id)) return message.channel.send("User already has that role ;/").then(msg => msg.delete({ timeout : 10000}))
            member.roles.add(roleADD).then(member => {
                message.channel.send(`${add} was added to ${member.displayName}`)
            })
        }

        if (cmd === "remove") {
            if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("Missing Permissions... [Manage roles]").then(msg => msg.delete({ timeout : 10000}))
            const member = message.mentions.members.first()
            if (!member) return message.channel.send("You need to mention someone :/").then(msg => msg.delete({ timeout : 10000}))
            const add = args.slice(1).join(" ")
            if (!add) return message.channel.send("You didn't gimme a role lol").then(msg => msg.delete({ timeout : 10000}))
            const roleADD = message.guild.roles.cache.find(role => role.name === add)
            if (!roleADD) return message.channel.send(`A role called \`${add}\` doesn't exists!`).then(msg => msg.delete({ timeout : 10000}))
            if (!member.roles.cache.get(roleADD.id)) return message.channel.send("User doesn't have that role either ways ;/").then(msg => msg.delete({ timeout : 10000}))
            member.roles.remove(roleADD).then(member => {
                message.channel.send(`${add} was removed from ${member.displayName}`)
            })
        }

        if (cmd === "purge") {
            if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Missing Permissions... [Manage messages]").then(msg => msg.delete({ timeout : 10000}))
            const number = args.join(" ")
            if (!number) return message.channel.send("You haven't specified amount of messages to purge :/").then(msg => msg.delete({ timeout : 10000}))
            message.channel.bulkDelete(number).catch(console.error)
            message.channel.send(`Delete ${number} messages!`).then(msg => msg.delete({ timeout : 2000}))
        }

        if (cmd === "rps") {
            const choice = [
                "rock",
                "paper",
                "scissors"
            ]
            const msg2 = args.join(" ");
            const res = choice[Math.floor(Math.random() * choice.length)]

            let msg = msg2.toLowerCase().trim()

            if(msg === "rock" || msg === "paper" || msg === "scissor") {

            var first = "You choosed " + msg + " and i choosed " + res + " so, "

            var second;

            if(msg === res) second = "its a Draw:neutral_face:!!"

            else if(msg === "scissor" && res === "paper") second ="l lose :pensive:"

            else if(msg === "paper" && res === "rock") second = "l lose :confused:"

            else if(msg === "rock" && res === "scissor") second = "l lose :tired_face:"

            else second = "I won :smirk: "

            reply = first + second

        } else{

          reply = `You did not choosed any options :/\n**Usage: ${PREFIX}rps [rock / paper / scissors]**`
        }

        message.channel.send(`${reply}`)
      }
    
})
