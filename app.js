"use strict";

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

console.log("started");

client.on("ready", () => {
    console.log(
        `Bot has started, with ${client.users.size} users, in ${
      client.channels.size
    } channels of ${client.guilds.size} guilds.`
    );

    client.user.setActivity(`use !color "color" to set your color!`);
});


const roleColorId = {
    "colors": ["red", "green", "blue", "yellow", "orange", "purple", "watermelon", "pink", "black", "invisible"],
    "roles": ["497571918174486538", "497572022323380235", "497571670832447499", "497571740881387580", "497572217614499841", "497571809168982025", "497571434303062038", "497572362242490368", "497572102170345474", "497570911873138710"]
}
let emptyString = "";

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command == "") {
        for (var color of roleColorId.colors) {
            emptyString += "\t" + color + "\n"
        }
        message.channel.send(`\`\`\`\nPlease enter your desired color from the list below with the command => "!color red"\n` +
            emptyString +
            `\`\`\``);
        emptyString = "";
    }

    let searchColor = roleColorId.colors.indexOf(command);

    if (searchColor >= 0) {
        for (var role of roleColorId.roles) {
            message.member.removeRole(role)
                .then()
                .catch(console.error)
        }
        console.log("removed role ids");
        let commandRole = roleColorId.roles[searchColor];
        message.member.addRole(commandRole)
            .then(console.log("added role " + roleColorId.colors[searchColor]))
            .catch(console.error);
    }
    if (command == "nickname") {
        message.member.setNickname(command)
            .then(console.log("nickname changed to: " + command))
            .catch(console.error);
    }

});
client.login(config.token);