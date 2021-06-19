const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "USER"] });

const botIDs = ["832628454540181564", "832628454540181564"];
const channelIDs = ["832895303345635359", "855897662775230474"];
const botNames = ["Sniper Discord bot", "Official Venge Bot"];
let bots = [];
let channels = [];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  for (var i = 0; i < botIDs.length; i++) {
    if (!client.users.cache.get(botIDs[i])) {
      client.users
        .fetch(botIDs[i])
        .then((res) => {
          bots.push(res);
        })
        .catch(console.log("err"));
    } else {
      bots.push(client.users.cache.get(botIDs[i]));
    }
    if (!client.channels.cache.get(channelIDs[i])) {
      client.channels
        .fetch(channelIDs[i])
        .then((res) => {
          channels.push(res);
        })
        .catch(console.log("err"));
    } else {
      channels.push(client.channels.cache.get(channelIDs[i]));
    }
  }

  checkStatus();
});
async function checkStatus() {
  setTimeout(() => {
    let online = 0;
    for (var i = 0; i < bots.length; i++) {
      if (bots[i].presence.status != "offline"){
        online++;
        console.log("done")
      }else {
        console.log(bots[i].presence.status)
      }
      channels[i].setName(`${bots[i].presence.status == "offline" ? "🔴" : "🟢"} ${botNames[i]}`);
    }
    console.log(online)
    client.user.setActivity(`${online}/${botIDs.length} Online Venge Bots`, { type: "WATCHING" });
    checkStatus();
  }, 1000 * 60);
}

client.login(process.env.TOKEN);
