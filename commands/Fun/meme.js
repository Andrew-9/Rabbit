const Discord = require("discord.js");
const axios = require("axios").default;

module.exports = {
 name: "meme",
 aliases: [],
 description: "Sends a random meme",
 category: "Fun",
 usage: "meme",
 run: async (client, message, args) => {
  try {
   const options = {
    method: "GET",
    url: `https://reddit.com/r/dankmemes/random/.json`,
   };
   axios.request(options).then((response) => {
    let meme = response.data[0].data.children[0].data;
    message.channel.startTyping();
    const embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setTitle(meme.title)
     .setURL(`https://reddit.com${meme.permalink}`)
     .setImage(meme.url)
     .setFooter(
      `👍 ${meme.ups} | 💬 ${meme.num_comments} | Requested by ${message.author.username}`,
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     );
     message.channel.stopTyping();
    message.lineReply(embed);
   });
  } catch (err) {
   console.log(err);
   message.lineReply("<:errorcode:868245243357712384> **| Oops Something went wrong...**");
  }
 },
};
