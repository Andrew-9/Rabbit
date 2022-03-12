const { MessageEmbed, Collection } = require("discord.js");
const settings = require("../botconfig/settings.json");
//EXPORT ALL FUNCTIONS
module.exports.nFormatter = nFormatter;
module.exports.shuffle = shuffle;
module.exports.formatDate = formatDate;
module.exports.delay = delay;
module.exports.getRandomInt = getRandomInt;
module.exports.duration = duration;
module.exports.getRandomNum = getRandomNum;
module.exports.createBar = createBar;
module.exports.format = format;
module.exports.escapeRegex = escapeRegex;
module.exports.arrayMove = arrayMove;
module.exports.isValidURL = isValidURL;
module.exports.GetUser = GetUser;
module.exports.GetRole = GetRole;
module.exports.GetGlobalUser = GetGlobalUser;
module.exports.parseMilliseconds = parseMilliseconds;
module.exports.onCoolDown = onCoolDown;
module.exports.check_if_dj = check_if_dj;

function check_if_dj(client, member, song, message) {
  if(!client) return false;
  if (!member) member = message.member;
  var roleid = client.settings.get(member.guild.id, `djroles`)
  if (String(roleid) == "") return false;
  var isdj = false;
  for (let i = 0; i < roleid.length; i++) {
    if (!member.guild.roles.cache.get(roleid[i])) continue;
    if (member.roles.cache.has(roleid[i])) isdj = true;
  }
  if (!isdj && !member.permissions.has("ADMINISTRATOR") && song.user.id != member.id)
    return roleid.map(i=>`<@&${i}>`).join(", ");
  else
    return false;
}

// function customplaylistembed(lyrics, song) {
//     if (!lyrics) lyrics = "No Songs in the playlist!";
//     try {
//         let embeds = [];
//         let k = 1000;
//         for (let i = 0; i < lyrics.length; i += 1000) {
//             const current = lyrics.slice(i, k);
//             k += 1000;
//             const embed = new MessageEmbed()
//                 .setTitle("Custom Playlist")
//                 .setColor("#ff0070")
//                 .setDescription(current)
//             embeds.push(embed);
//         }
//         return embeds;
//     } catch (error) {
//         console.log(error)
//     }
// }

  module.exports.replacemsg = replacedefaultmessages
  /**
   * 
   * @param {*} text The Text that should be replaced, usually from /botconfig/settings.json
   * @param {*} options Those Options are what are needed for the replaceMent! Valid ones are: { 
   *   timeLeft: "",
   *   commandmemberpermissions: { memberpermissions: [] }, 
   *   commandalloweduserids: { alloweduserids: [] }, 
   *   commandrequiredroles: { requiredroles: [] }, 
   *   commandname: { name: "" }, 
   *   commandaliases: { aliases: [] }, 
   *   prefix: "",
   *   errormessage: { message: "" }
   *   errorstack: { stack: STACK }
   *   error: ERRORTYPE
   * }
   * @returns STRING
   */
  function replacedefaultmessages(text, o = {}){
      if(!text || text == undefined || text == null) throw "No Text for the replacedefault message added as First Parameter";
      const options = Object(o)
      if(!options || options == undefined || options == null) return String(text)
      return String(text)
        .replace(/%{timeleft}%/gi, options && options.timeLeft ? options.timeLeft.toFixed(1) : "%{timeleft}%")
        .replace(/%{commandname}%/gi, options && options.command && options.command.name ? options.command.name : "%{commandname}%")
        .replace(/%{commandaliases}%/gi, options && options.command && options.command.aliases ? options.command.aliases.map(v => `\`${v}\``).join(",") : "%{commandaliases}%")
        .replace(/%{prefix}%/gi, options && options.prefix ? options.prefix : "%{prefix}%")
        .replace(/%{commandmemberpermissions}%/gi, options && options.command && options.command.memberpermissions ? options.command.memberpermissions.map(v => `\`${v}\``).join(",") : "\`%{commandmemberpermissions}%\`")
        .replace(/%{commandalloweduserids}%/gi, options && options.command &&options.command.alloweduserids ? options.command.alloweduserids.map(v => `<@${v}>`).join(",") : "\`%{commandalloweduserids}%\`")
        .replace(/%{commandrequiredroles}%/gi, options && options.command &&options.command.requiredroles ? options.command.requiredroles.map(v => `<@&${v}>`).join(",") : "%{commandrequiredroles}%")
        .replace(/%{errormessage}%/gi, options && options.error && options.error.message ? options.error.message : options && options.error ? options.error : "%{errormessage}%")
        .replace(/%{errorstack}%/gi, options && options.error && options.error.stack ? options.error.stack : options && options.error && options.error.message ? options.error.message : options && options.error ? options.error : "%{errorstack}%")
        .replace(/%{error}%/gi, options && options.error ? options.error : "%{error}%")
  
  }
  
  /**
   * 
   * @param {*} message A DiscordMessage, with the client, information
   * @param {*} command The Command with the command.name
   * @returns BOOLEAN
   */
  
function onCoolDown(message, command) {
    if(!message || !message.client) throw "No Message with a valid DiscordClient granted as First Parameter";
    if(!command || !command.name) throw "No Command with a valid Name granted as Second Parameter";
    const client = message.client;
    if (!client.cooldowns.has(command.name)) {
      client.cooldowns.set(command.name, new Collection());
    }
    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || settings.default_cooldown_in_sec) * 1000;
    if (timestamps.has(message.member.id)) {
      const expirationTime = timestamps.get(message.member.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return timeLeft
      }
      else {
        timestamps.set(message.member.id, now); 
        setTimeout(() => timestamps.delete(message.member.id), cooldownAmount); 
        return false;
      }
    }
    else {
      timestamps.set(message.member.id, now);
      setTimeout(() => timestamps.delete(message.member.id), cooldownAmount);
      return false;
    }
  }
  
  /**
   * 
   * @param {*} milliseconds NUMBER | TIME IN MILLISECONDS
   * @returns Object of Formatted Time in Days to nanoseconds
   */
  function parseMilliseconds(milliseconds) {
      if (typeof milliseconds !== 'number') {
          throw new TypeError('Expected a number');
      }
  
      return {
          days: Math.trunc(milliseconds / 86400000),
          hours: Math.trunc(milliseconds / 3600000) % 24,
          minutes: Math.trunc(milliseconds / 60000) % 60,
          seconds: Math.trunc(milliseconds / 1000) % 60,
          milliseconds: Math.trunc(milliseconds) % 1000,
          microseconds: Math.trunc(milliseconds * 1000) % 1000,
          nanoseconds: Math.trunc(milliseconds * 1e6) % 1000
      };
  }
  
  /**
   * 
   * @param {*} string A WHOLE TEXT, checks if there is a URL IN IT
   * @returns BOOLEAN/THE URL
   */
  function isValidURL(string) {
    const args = string.split(" ");
    let url;
    for(const arg of args){
      try {
        url = new URL(arg);
        url = url.protocol === "http:" || url.protocol === "https:";
        break;
      } catch (_) {
        url = false;
      }
    }
    return url;
  };
  
  /**
   * 
   * @param {*} message a DISCORDMESSAGE with the Content and guild and client information
   * @param {*} arg //a argument, for search for example
   * @returns BOOLEAN/DISCORDUSER
   */
  function GetUser(message, arg){
    var errormessage = ":x: I failed finding that User...";
    return new Promise(async (resolve, reject) => {
      var args = arg, client = message.client;
      if(!client || !message) return reject("CLIENT IS NOT DEFINED")
      if(!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
      let user = message.mentions.users.first();
      if(!user && args[0] && args[0].length == 18) {
        user = await client.users.fetch(args[0])
        if(!user) return reject(errormessage)
        return resolve(user);
      }
      else if(!user && args[0]){
        let alluser = message.guild.members.cache.map(member=> String(member.user.tag).toLowerCase())
        user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
        user = message.guild.members.cache.find(me => String(me.user.tag).toLowerCase() == user)
        if(!user || user == null || !user.id) {
          alluser = message.guild.members.cache.map(member => String(member.displayName + "#" + member.user.discriminator).toLowerCase())
          user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
          user = message.guild.members.cache.find(me => String(me.displayName + "#" + me.user.discriminator).toLowerCase() == user)
          if(!user || user == null || !user.id) return reject(errormessage)
        }
        user = await client.users.fetch(user.user.id)
        if(!user) return reject(errormessage)
        return resolve(user);
      }
      else {
        user = message.mentions.users.first() || message.author;
        return resolve(user);
      }
    })
  }
  
  /**
   * 
   * @param {*} message a DISCORDMESSAGE with the Content and guild and client information
   * @param {*} arg //a argument, for search for example
   * @returns BOOLEAN/GUILDROLE
   */
  function GetRole(message, arg){
    var errormessage = ":x: I failed finding that Role...";
    return new Promise(async (resolve, reject) => {
      var args = arg, client = message.client;
      if(!client || !message) return reject("CLIENT IS NOT DEFINED")
      if(!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
      let user = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
      if(!user && args[0] && args[0].length == 18) {
        user = message.guild.roles.cache.get(args[0])
        if(!user) return reject(errormessage)
        return resolve(user);
      }
      else if(!user && args[0]){
        let alluser = message.guild.roles.cache.map(role => String(role.name).toLowerCase())
        user = alluser.find(r => r.split(" ").join("").includes(args.join("").toLowerCase()))
        user = message.guild.roles.cache.find(role => String(role.name).toLowerCase() === user)
        if(!user) return reject(errormessage)
        return resolve(user);
      }
      else {
        user = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
        if(!user) return reject(errormessage)
        return resolve(user);
      }
    })
  }
  
  
  /**
   * 
   * @param {*} message a DISCORDMESSAGE with the Content and guild and client information
   * @param {*} arg //a argument, for search for example
   * @returns BOOLEAN/DISCORDUSER
   */
  function GetGlobalUser(message, arg){
    var errormessage = ":x: I failed finding that User...";
    return new Promise(async (resolve, reject) => {
      var args = arg, client = message.client;
      if(!client || !message) return reject("CLIENT IS NOT DEFINED")
      if(!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
      let user = message.mentions.users.first();
      if(!user && args[0] && args[0].length == 18) {
        user = await client.users.fetch(args[0])
        if(!user) return reject(errormessage)
        return resolve(user);
      }
      else if(!user && args[0]){
        let alluser = [], allmembers = [];
        var guilds = Array.from(client.guilds.cache.values())
        for(const g of guilds){
          var members = Array.from(g.members.cache.values());
          for(const m of members) { alluser.push(m.user.tag); allmembers.push(m); }
        }
        user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
        user = allmembers.find(me => String(me.user.tag).toLowerCase() == user)
        if(!user || user == null || !user.id) {
          user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
          user = allmembers.find(me => String(me.displayName + "#" + me.user.discriminator).toLowerCase() == user)
          if(!user || user == null || !user.id) return reject(errormessage)
        }
        user = await client.users.fetch(user.user.id)
        if(!user) return reject(errormessage)
        return resolve(user);
      }
      else {
        user = message.mentions.users.first() || message.author;
        return resolve(user);
      }
    })
  }
  
  /**
   * 
   * @param {*} array Shuffles a given array (mix) 
   * @returns ARRAY
   */
  function shuffle(array) {
    try {
      var j, x, i;
      for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
      }
      return array;
    } catch (e) {
      console.log(String(e.stack))
    }
  }
  
  /**
   * 
   * @param {*} date Date format (Date.now())
   * @returns Formatted Date
   */
  function formatDate(date) {
    try {
      return new Intl.DateTimeFormat("en-US").format(date);
    } catch (e) {
      console.log(String(e.stack))
      return false;
    }
  }
  
  /**
   * 
   * @param {*} duration Number | Time in Milliseconds
   * @returns Object of Formatted Time in Days to milliseconds
   */
  function parseDuration(duration) {
    let remain = duration
    let days = Math.floor(remain / (1000 * 60 * 60 * 24))
    remain = remain % (1000 * 60 * 60 * 24)
  
    let hours = Math.floor(remain / (1000 * 60 * 60))
    remain = remain % (1000 * 60 * 60)
  
    let minutes = Math.floor(remain / (1000 * 60))
    remain = remain % (1000 * 60)
  
    let seconds = Math.floor(remain / (1000))
    remain = remain % (1000)
  
    let milliseconds = remain
  
    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds
    };
  }
  
  /**
   * 
   * @param {*} o Object of Time from days to nanoseconds/milliseconds
   * @param {*} useMilli Optional Boolean parameter, if it should use milliseconds or not in the showof
   * @returns Formatted Time
   */
  function formatTime(o, useMilli = false) {
    let parts = []
    if (o.days) {
      let ret = o.days + ' Day'
      if (o.days !== 1) {
        ret += 's'
      }
      parts.push(ret)
    }
    if (o.hours) {
      let ret = o.hours + ' Hr'
      if (o.hours !== 1) {
        ret += 's'
      }
      parts.push(ret)
    }
    if (o.minutes) {
      let ret = o.minutes + ' Min'
      if (o.minutes !== 1) {
        ret += 's'
      }
      parts.push(ret)
  
    }
    if (o.seconds) {
      let ret = o.seconds + ' Sec'
      if (o.seconds !== 1) {
        ret += 's'
      }
      parts.push(ret)
    }
    if (useMilli && o.milliseconds) {
      let ret = o.milliseconds + ' ms'
      parts.push(ret)
    }
    if (parts.length === 0) {
      return 'instantly'
    } else {
      return parts
    }
  }
  
  /**
   * 
   * @param {*} duration Number | Time in Millisceonds
   * @param {*} useMilli Optional Boolean parameter, if it should use milliseconds or not in the showof
   * @returns Formatted Time
   */
  function duration(duration, useMilli = false) {
    let time = parseDuration(duration)
    return formatTime(time, useMilli)
  }
  
  /**
   * 
   * @param {*} delayInms Number | Time in Milliseconds
   * @returns Promise, waiting for the given Milliseconds
   */
  function delay(delayInms) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(2);
        }, delayInms);
      });
    } catch (e) {
      console.log(String(e.stack))
    }
  }
  
  /**
   * 
   * @param {*} max Number | 0 - MAX
   * @returns Number
   */
  function getRandomInt(max) {
    try {
      return Math.floor(Math.random() * Math.floor(max));
    } catch (e) {
      console.log(String(e.stack))
    }
  }
  
  /**
   * 
   * @param {*} min Number | min - max
   * @param {*} max Number | min - max
   * @returns Number
   */
  function getRandomNum(min, max) {
    try {
      return Math.floor(Math.random() * Math.floor((max - min) + min));
    } catch (e) {
      console.log(String(e.stack))
    }
  }

     /**
   * 
   * @param {*} total Number | Time in Milliseconds
   * @param {*} current  Number | Time in Milliseconds | Current Music Position
   * @param {*} size Number | Amount of Letters in the Bar (SIZE) Default is: 25
   * @param {*} line EMOJI | the default line is: "▬"
   * @param {*} slider EMOJI | the default slider is: "🔷"
   * @returns STRING a BAR [▬▬▬▬▬🔷▬▬▬▬▬▬▬▬]
   */
  function createBar(total, current, size = 25, line = "▬", slider = "🔷") {
    try {
      if (!total) throw "MISSING MAX TIME";
      if (!current) return `**[ ${slider}${line.repeat(size - 1)} ]**`;
      let bar = current > total 
          ? [line.repeat(size / 2 * 2), (current / total) * 100] 
          : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) 
            + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
      if (!String(bar).includes(slider)) {
        return `**[ ${slider}${line.repeat(size - 1)} ]**`;
      } else{
        return `**[ ${bar[0]} ]**`;
      }
    } catch (e) {
      console.log(String(e.stack))
    }
  }
  
  /**
   * 
   * @param {*} millis Number | Time in Milliseconds 
   * @returns Formatted time in: HH:MM:SS HH only if bigger then 0
   */
  function format(millis) {
    try {
      var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = ((millis % 60000) / 1000).toFixed(0);
      if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    } catch (e) {
      console.log(String(e.stack))
    }
  }
  
  /**
   * 
   * @param {*} str String of message, not replacing pings 
   * @returns Only the Pinged message
   */
  function escapeRegex(str) {
    try {
      return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
  
  /**
   * 
   * @param {*} array ARRAY | Complete Array to work with 
   * @param {*} from NUMBER | Position of first ITEM
   * @param {*} to NUMBER | Position where to move it to
   * @returns ARRAY | the Moved Array
   */
  function arrayMove(array, from, to) {
    try {
      array = [...array];
      const startIndex = from < 0 ? array.length + from : from;
      if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = to < 0 ? array.length + to : to;
        const [item] = array.splice(from, 1);
        array.splice(endIndex, 0, item);
      }
      return array;
    } catch (e) {
      console.log(String(e.stack))
    }
  }
  
  /**
   * 
   * @param {*} num Number
   * @param {*} digits How many digits it should have: 10.231k == 3
   * @returns Formatted Number
   */
  function nFormatter(num, digits = 2) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }