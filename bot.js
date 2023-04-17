require("./lib/prototype.js");
const { Telegraf } = require("telegraf");
const fetch = require("node-fetch");
const yts = require("yt-search");
const moment = require("moment-timezone");
const updateLogger = require("telegraf-update-logger");
const os = require("os");
const { exec, spawn, execSync } = require("child_process");
const speed = require(`performance-now`);
const ikyyh = new (require("ikyy"))();
const clph = require("caliph-api");
const setTag = require("node-id3");
const chalk = require("chalk");
const spin = require("spinnies");
const { promisify } = require("util");
const _gis = require("g-i-s");
const gis = promisify(_gis);
const cfonts = require("cfonts");
const delay = require("delay");
const fs = require("fs");
const ms = require("ms");
const pino = require("pino");
const nou = require("node-os-utils");
const nekos = require("nekos.life");
const neko = new nekos();
const util = require("util");
const transllate = require("@vitalets/google-translate-api");
const afk = JSON.parse(fs.readFileSync("./json/afk.json"));
const simi = JSON.parse(fs.readFileSync("./json/simi.json"));
const ban = JSON.parse(fs.readFileSync("./json/ban.json"));
const {
  sendVideo,
  cekStatus,
  banner,
  success,
  Sukses,
  GetFotoProfile,
  pushname,
  gmt,
  weton,
  week,
  date,
  waktu,
  formatBytes,
  clearTmp,
  status,
  toJson,
  isUrl,
  range,
  toBuffer,
  parseResult,
} = require("./lib/functions");
const {
  sendProses,
  format,
  sendText,
  sendsearch,
  sendDonation,
  sendHelp,
  sendStart,
  getPosition,
} = require("./lib/log");
const { toAudio } = require("./lib/converter");
const fig = JSON.parse(fs.readFileSync("./json/config.json"));
const { admin_id } = require("./lib/owner.js");
const express = require("express");
const scdl = require("scdl-api");
let formats = (bytesToSize = function (bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
});

//spinner
const Spinnies = require("spinnies");
const spinnies = new Spinnies({
  spinner: {
    interval: 200,
    frames: ["∙∙∙", "●∙∙", "∙●∙", "∙∙●", "∙∙∙"],
  },
});

//Global & App Configure
global.config = fig[0];
global.l = pino(config.pino);
global.bot = new Telegraf(config.BotToken);
const client = bot.telegram;
global.app = express();
global.PORT = process.env.PORT || 3030;

const cekBan = async (ctx) => {
  aw = getPosition(ban, await ctx.message.from.id);
  return aw;
};

const univ = config.unicode.head;
const error = `https://telegra.ph/file/4ab397f49255b2a79f687.jpg`;
const uptime = process.uptime();
const timestamp = speed();
const latensi = speed() - timestamp;
const tutid = moment().millisecond();
//welcome and leave
bot.on("new_chat_members", async (rizz) => {
  var message = rizz.message;
  var groupname = message.chat.title;
  var groupmembers = await bot.telegram.getChatMembersCount(message.chat.id);
  for (x of message.new_chat_members) {
    var pp_user = await GetFotoProfile(bot, x.id);
    var full_name = pushname(x).full_name;

    console.log(
      chalk.whiteBright("*"),
      chalk.cyanBright("[JOINED]"),
      chalk.whiteBright(full_name),
      chalk.greenBright("join in"),
      chalk.whiteBright(groupname)
    );
    await rizz.replyWithPhoto(
      { url: pp_user },
      {
        caption: `Selamat datang @${pushname(x).username}
di group ${groupname}

${config.unicode.arrow} Info User
${univ} ID : ${x.id}
${univ} Nama: ${full_name}
${univ} Bot : ${x.is_bot}`,
        parse_mode: "Markdown",
      }
    );
  }
});

bot.on("left_chat_member", async (rizz) => {
  var message = rizz.message;
  var groupname = message.chat.title;
  var groupmembers = await bot.telegram.getChatMembersCount(message.chat.id);
  var pp_user = await GetFotoProfile(bot, message.left_chat_member.id);
  var full_name = pushname(message.left_chat_member).full_name;
  console.log(
    chalk.whiteBright("*"),
    chalk.cyanBright("[LEAVE]"),
    chalk.whiteBright(full_name),
    chalk.greenBright("leave from"),
    chalk.whiteBright(groupname)
  );
  await rizz.replyWithPhoto(
    { url: `${pp_user}` },
    {
      caption: `GoodBye @${pushname(message.left_chat_member).username}
 
${config.unicode.arrow} Info User
${univ} ID : ${message.left_chat_member.id}
${univ} Nama: ${full_name}
${univ} Bot : ${message.left_chat_member.is_bot}`,
      parse_mode: "Markdown",
    }
  );
});
const monoscape = (text) => {
  return "`" + text + "`";
};

bot.catch((err, ctx) => {
  console.error(
    `Ooops, encountered an error for ${ctx.updateType}. err=%s`,
    err
  );
});

bot.use(async (ctx, next) => {
  console.time(`Processing update ${ctx.update.update_id}`);
  await next()
  console.timeEnd(`Processing update ${ctx.update.update_id}`);
})

bot.use(
  updateLogger({
    colors: {
      id: chalk.red,
      chat: chalk.yellow,
      user: chalk.green,
      type: chalk.bold,
    },
  })
);

// Ignore all pending `callback_query` events.
bot.use(async function disposeCallbackQuery(ctx, next) {
  if (!ctx.callbackQuery) return next();
  await next();
  return ctx.answerCbQuery();
});

/*+*+*+*+*+*+*+*+* ACTION *+*+*+*+*+*+*+*+*+*+*/
const cekWaktuBan = (_dir) => {
  setInterval(() => {
    let position = null;
    Object.keys(_dir).forEach((i) => {
      if (Date.now() >= _dir[i].time) {
        position = i;
      }
    });
    if (position !== null) {
      bot.telegram.sendMessage(
        _dir[position].id,
        "*Mute* Kamu sudah dibuka\n*Mohon jangan spam lagi!*",
        { parse_mode: "Markdown" }
      );
      _dir.splice(getPosition(ban, _dir[position].id), 1);
    }
  }, 1000);
};

bot.action("donasi", (ctx) => {
  if (cekStatus(ctx.update.callback_query.from.id, ban)) return;
  sendDonation(bot, ctx);
});
bot.action("info", (ctx) => {
  if (cekStatus(ctx.update.callback_query.from.id, ban)) return;
  ctx.deleteMessage();
  bot.telegram.sendMessage(
    ctx.chat.id,
    `Info Bot ${bot.botInfo.first_name}

• Username Bot : ${bot.botInfo.username}
• Name Bot  : ${bot.botInfo.first_name}
• Can bots be added to groups? ${bot.botInfo.can_join_groups ? "Yes" : "No"}
• Do bots read chat groups? ${
      bot.botInfo.can_read_all_group_messages ? "Yes" : "No"
    }`,
    {
      reply_markup: {
        keyboard: [
          [
            { text: "Creator Bot", callback_data: "credit" },
            { text: "Source Code Bot", callback_data: "script" },
          ],
          [{ text: "Eliminate Keyboards" }],
        ],
        resize_keyboard: true,
      },
    }
  );
});
bot.hears("Creator Bot", (ctx) => {
  if (cekStatus(ctx.message.from.id, ban)) return;
  bot.telegram.sendMessage(ctx.chat.id, "[My Master~](t.me/rizzlogy)", {
    reply_markup: {
      inline_keyboard: [[{ text: "Back!", callback_data: "start" }]],
    },
    parse_mode: "Markdown",
  });
});
bot.hears("Source Code Bot", (ctx) => {
  if (cekStatus(ctx.message.from.id, ban)) return;
  bot.telegram.sendMessage(
    ctx.chat.id,
    "The source code of this bot is still private!",
    {
      reply_markup: {
        inline_keyboard: [[{ text: "Back!", callback_data: "start" }]],
      },
      parse_mode: "Markdown",
    }
  );
});
bot.hears("Eliminate Keyboards", (ctx) => {
  if (cekStatus(ctx.message.from.id, ban)) return;
  bot.telegram.sendMessage(ctx.chat.id, "Keyboard removed...", {
    reply_markup: {
      remove_keyboard: true,
    },
  });
});
bot.action("afk", (ctx) => {
  if (cekStatus(ctx.update.callback_query.from.id, ban)) return;
  ctx.deleteMessage();
  if (!ctx.chat.type.includes("group")) {
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Perintah ini hanya dapat digunakan dalam group",
      {
        reply_markup: {
          inline_keyboard: [[{ text: "Back!", callback_data: "start" }]],
        },
        parse_mode: "Markdown",
      }
    );
    return;
  }
  afk.push("@" + pushname(ctx.from).username);
  fs.writeFileSync("./json/afk.json", JSON.stringify(afk));
  console.log("@" + pushname(ctx.from).username);
  ini_txt =
    "Anda telah afk. \nJika ada yang tag kamu bot akan memberitahukan bahwa kamu off\nJika ingin kembali dari afk ketik hai di sini";
  ctx.reply(ini_txt);
});
bot.action("downloadermenu", (ctx) => {
  if (cekStatus(ctx.update.callback_query.from.id, ban)) return;
  ctx.deleteMessage();
  sendText(bot, ctx, `${univ} Downloader Menu\n\n` + downloadermenu);
});
bot.action("nsfwmenu", (ctx) => {
  if (cekStatus(ctx.update.callback_query.from.id, ban)) return;
  ctx.deleteMessage();
  sendText(bot, ctx, `${univ} Nsfw Menu\n\n` + nsfwmenu);
});
bot.action("sfwmenu", (ctx) => {
  if (cekStatus(ctx.update.callback_query.from.id, ban)) return;
  ctx.deleteMessage();
  sendText(bot, ctx, `${univ} Sfw Menu\n\n` + sfwmenu);
});
bot.action("ping", async (ctx) => {
  ctx.deleteMessage();
  var { totalGb, usedGb, freeGb } = await nou.drive.info();
  const tmenu = `
› Hostname : ${os.hostname()}
› Arch : ${os.arch()}
› CPU : ${os.cpus()[0].model}${
    os.cpus().length > 1 ? " (" + os.cpus().length + "x)" : ""
  }
› Release : ${os.release()}
› Version : ${os.version()}
› Memory : ${formats(os.totalmem() - os.freemem())} / ${bytesToSize(
    os.totalmem()
  )}
› Total Storage : ${totalGb} GB
› Used : ${usedGb} GB
› Free : ${freeGb} GB
› Platform : ${os.platform()}
› Ping : ${tutid} ms
› Speed : ${latensi.toFixed(4)} Second

`;
  bot.telegram.sendMessage(ctx.chat.id, tmenu, {
    reply_markup: {
      inline_keyboard: [[{ text: "Back!", callback_data: "start" }]],
    },
    parse_mode: "Markdown",
  });
});
bot.action("funmenu", (ctx) => {
  if (cekStatus(ctx.update.callback_query.from.id, ban)) return;
  ctx.deleteMessage();
  sendText(bot, ctx, `${univ} Fun Menu\n\n` + funmenu);
});
bot.action("searchmenu", (ctx) => {
  if (cekStatus(ctx.update.callback_query.from.id, ban)) return;
  ctx.deleteMessage();
  sendText(bot, ctx, `${univ} Search Menu\n\n` + searchmenu);
});
bot.action("groupmenu", (ctx) => {
  if (cekStatus(ctx.update.callback_query.from.id, ban)) return;
  ctx.deleteMessage();
  sendText(bot, ctx, `${univ} Group Menu\n\n` + groupmenu);
});

bot.action("adminmenu", (ctx) => {
  if (cekStatus(ctx.update.callback_query.from.id, ban)) return;
  ctx.deleteMessage();
  sendText(bot, ctx, `${univ} Admin Menu\n\n` + adminmenu);
});

bot.action("start", async (ctx) => {
  if (cekStatus(ctx.update.callback_query.from.id, ban)) return;
  var full_name = pushname(ctx.from).full_name;
  sendStart(bot, ctx, full_name);
});

bot.action(["help", "menu"], (ctx) => {
  if (cekStatus(ctx.update.callback_query.from.id, ban)) return;
  sendHelp(bot, ctx);
});

bot.start(async (ctx) => {
  if (cekStatus(ctx.message.from.id, ban)) return;
  var full_name = pushname(ctx.from).full_name;
  sendStart(bot, ctx, full_name);
});

bot.help((ctx) => {
  if (cekStatus(ctx.message.from.id, ban)) return;
  sendHelp(bot, ctx);
});

bot.action("anonymous", async (rizz) => {
  if (cekStatus(rizz.update.callback_query.from.id, ban)) return;
  rizz.deleteMessage();
  if (rizz.chat.type.includes("group"))
    return bot.telegram.sendMessage(
      rizz.chat.id,
      `Perintah Ini hanya Bisa Digunakan Chat Pribadi!`
    );
  bot.telegram.sendMessage(
    rizz.chat.id,
    "Hai Kak, Selamat Datang di Anonymous Chat\n\nKetik /search untuk mencari Teman Chat anda"
  );
});

/*_*_*_*_*_*_*_* END ACTION *_*_*_*_*_*_*_*/

this.anonymous = this.anonymous ? this.anonymous : {};
this.spam = this.spam ? this.spam : {};

/*-*-*-*-*-*-*- case prefix + -*-*-*-*-*-*-*/
bot.on("message", async (rizz) => {
  try {
    if (rizz.message.from.is_bot) return;
    let q = rizz.message.text || rizz.message.caption || "";
    let command = q.toLowerCase().split(" ")[0] || "";
    let args = q.split(" ").slice(1);
    var prefix = (q
      .toLowerCase()
      .match(/^[`,°•><π÷×¶∆£¢€¥®™✓=|~!?#$%^&.\/\\©^]/gi) || ["-"])[0];
    const name = pushname(rizz.message.from);
    const qe = args.join(" ");
    let messageId = rizz.message.message_id;
    const from = rizz.chat.id;
    const sender = name.username;
    const sender2 = rizz.message.from.id;
    let userId = rizz.from.id;
    let isOwner = admin_id.find(({ id }) => id == userId) ? true : false;
    if (cekStatus(rizz.message.from.id, ban)) return console.log("User banned");

    const reply = async (text) => {
      bot.telegram.sendMessage(rizz.chat.id, text, {
        reply_to_message_id: rizz.message.message_id,
        reply_markup: {
          inline_keyboard: [[{ text: "Back Menu", callback_data: "start" }]],
        },
        parse_mode: "Markdown",
        disable_web_page_preview: "true",
      });
    };

    const replyMenu = async (text) => {
      bot.telegram.sendMessage(rizz.chat.id, text, {
        reply_markup: {
          inline_keyboard: [[{ text: "Menu", callback_data: "start" }]],
        },
        parse_mode: "Markdown",
        disable_web_page_preview: "true",
      });
    };

    const costum = async (id, text, inline) => {
      bot.telegram.sendMessage(id, text, {
        reply_markup: {
          inline_keyboard: [
            //EXAMPLE -- custom(from,`Hai` , [{text: 'button 1' , callback_data: 'script'}])
            inline,
          ],
        },
        parse_mode: "Markdown",
        disable_web_page_preview: "true",
      });
    };

    const reply2 = async (text) => {
      await rizz.replyWithChatAction("typing");
      bot.telegram.sendMessage(from, text, {
        parse_mode: "Markdown",
        reply_to_message_id: rizz.message.message_id,
      });
    };

    const msg = async (text) => {
      await rizz.replyWithChatAction("typing");
      bot.telegram.sendMessage(from, text, { parse_mode: "Markdown" });
    };

    const getLink = async (file_id) => {
      try {
        return (await bot.telegram.getFileLink(file_id)).href;
      } catch {
        throw "Error while get url";
      }
    };

    const isImage = rizz.message.hasOwnProperty("photo");
    const isText = rizz.message.hasOwnProperty("text");
    const isVideo = rizz.message.hasOwnProperty("video");
    const isAudio = rizz.message.hasOwnProperty("audio");
    const isSticker = rizz.message.hasOwnProperty("sticker");
    const isContact = rizz.message.hasOwnProperty("contact");
    const isLocation = rizz.message.hasOwnProperty("location");
    const isDocument = rizz.message.hasOwnProperty("document");
    const isAnimation = rizz.message.hasOwnProperty("animation");
    const isMedia =
      isImage ||
      isVideo ||
      isAudio ||
      isSticker ||
      isContact ||
      isLocation ||
      isDocument ||
      isAnimation;
    const Quoted = rizz.message.reply_to_message || {};
    const isQuotedImage = Quoted.hasOwnProperty("photo");
    const isQuotedVideo = Quoted.hasOwnProperty("video");
    const isQuotedAudio = Quoted.hasOwnProperty("audio");
    const isQuotedSticker = Quoted.hasOwnProperty("sticker");
    const isQuotedContact = Quoted.hasOwnProperty("contact");
    const isQuotedLocation = Quoted.hasOwnProperty("location");
    const isQuotedDocument = Quoted.hasOwnProperty("document");
    const isQuotedAnimation = Quoted.hasOwnProperty("animation");
    const isQuoted = rizz.message.hasOwnProperty("reply_to_message");
    var file_id = "";
    cekWaktuBan(ban);
    if (isQuoted) {
      file_id = isQuotedImage
        ? rizz.message.reply_to_message.photo[
            rizz.message.reply_to_message.photo.length - 1
          ].file_id
        : isQuotedVideo
        ? rizz.message.reply_to_message.video.file_id
        : isQuotedAudio
        ? rizz.message.reply_to_message.audio.file_id
        : isQuotedSticker
        ? rizz.message.reply_to_message.sticker.file_id
        : isQuotedDocument
        ? rizz.message.reply_to_message.document.file_id
        : isQuotedAnimation
        ? rizz.message.reply_to_message.animation.file_id
        : "";
    } else {
      file_id = isImage
        ? rizz.message.photo[rizz.message.photo.length - 1].file_id
        : isVideo
        ? rizz.message.video.file_id
        : isAudio
        ? rizz.message.audio.file_id
        : isDocument
        ? rizz.message.document.file_id
        : isSticker
        ? rizz.message.sticker.file_id
        : isAnimation
        ? rizz.message.animation.file_id
        : "";
    }
    var mediaLink = file_id != "" ? await getLink(file_id) : "";
    const isCmd = q.startsWith(prefix);
    const isGroup = rizz.chat.type.includes("group");
    const isPrivate = rizz.chat.type.includes("private");
    const groupName = isGroup ? rizz.chat.title : "";

    let admin = [];
    const cekadmin = isGroup
      ? await bot.telegram.getChatAdministrators(from)
      : "";
    for (let i of cekadmin) {
      admin.push(i.user.id);
    }
    const isAdmin = isGroup ? admin.includes(sender2) : false;

    //anonymous
    if (!isGroup && !isCmd) {
      let rm = Object.values(this.anonymous).find(
        (room) =>
          [room.c, room.b].includes(sender2) && room.state === "CHATTING"
      );
      if (rm) {
        let other = [rm.c, rm.b].find((user) => user !== sender2);
        isImage
          ? bot.telegram.sendPhoto(
              other,
              { url: mediaLink },
              { caption: q ? q : "" }
            )
          : isSticker
          ? bot.telegram.sendSticker(other, { url: mediaLink })
          : isDocument
          ? bot.telegram.sendDocument(other, {
              url: mediaLink,
              filename: rizz.message.document.file_name,
            })
          : isAnimation
          ? bot.telegram.sendAnimation(other, { url: mediaLink })
          : isVideo
          ? bot.telegram.sendVideo(other, {
              url: mediaLink,
              filename: rizz.message.video.file_name,
            })
          : isAudio
          ? bot.telegram.sendAudio(other, {
              url: mediaLink,
              filename: rizz.message.audio.file_name,
            })
          : isLocation
          ? bot.telegram.sendLocation(
              other,
              rizz.message.location.latitude,
              rizz.message.location.longitude
            )
          : isText
          ? bot.telegram.sendMessage(other, q, { parse_mode: "Markdown" })
          : "";
      }
    }
    if (sender in this.spam) {
      this.spam[sender].count++;
      if (rizz.message.date - this.spam[sender].totalspam > 5) {
        if (this.spam[sender].count > 5) {
          if (isGroup) {
            reply2(
              "*Terdeteksi " +
                sender +
                " Spam kamu akan dimute selama 10 menit*"
            );
            bot.telegram.banChatMember(from, sender2, {
              until_date: Date.now() + ms("10m"),
            });
            this.spam[sender].count = 0;
            this.spam[sender].totalspam = rizz.message.date;
            return;
          }
          reply2(
            "*Terdeteksi " + sender + " Spam kamu akan dimute selama 10 menit*"
          );
          ban.push({ id: sender2, time: Date.now() + ms("10m") });
          fs.writeFileSync("./json/ban.json", JSON.stringify(ban));
        }
        this.spam[sender].count = 0;
        this.spam[sender].totalspam = rizz.message.date;
      }
    } else this.spam[sender] = { jid: sender, count: 0, totalspam: 0 };
    if (afk.includes(q)) {
      ini_txt = "Maaf user yang anda tag sedang afk. ";
      reply(ini_txt);
      return;
    }
    if (afk.includes("@" + name.username)) {
      reply("Anda telah keluar dari mode afk.");
      afs = afk.indexOf("@" + name.username);
      afk.splice(afs, 1);
      fs.writeFileSync("./json/afk.json", JSON.stringify(afk));
      return;
    }

    switch (command) {
      case prefix + "gempaterkini":
        {
          dataarr = await toJson(
            "https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json"
          ).then((a) => a.Infogempa.gempa);

          let header = `*Gempa Bumi Terkini* 🌍\n\n`;
          for (let i of dataarr)
            header += `🕐 Waktu: ${i.Tanggal}, ${i.Jam}\n⛰️ Magnitude: ${i.Magnitude} SR\n🕳️ Kedalaman: ${i.Kedalaman}\n🌆 Lokasi: ${i.Wilayah}\n📍 Koordinat: ${i.Lintang} - ${i.Bujur}\n🌊 Potensi: *${i.Potensi}*\n\n===================\n\n`;

          return msg(header.trim());
        }
        break;
      case prefix + "delete":
      case prefix + "del":
      case prefix + "d":
        if (!isQuoted) return reply2(monoscape(`Reply pesan bot`));
        if (
          !rizz.message.reply_to_message.from.username == bot.botInfo.username
        )
          return reply2(
            monoscape(
              `Hanya dapat menghapus pesan dari bot ${bot.botInfo.username}`
            )
          );
        try {
          rizz.deleteMessage(rizz.message.reply_to_message.message_id);
          reply2("`Sukses menghapus pesan`");
        } catch {
          reply2("gagal");
        }
        break;
      case prefix + "gimage":
        if (!qe)
          return reply2(`Nyari apa kak?\nContoh: ${prefix + command} kuda`);
        sendsearch(bot, rizz);
        let results = (await gis(args.join(" "))) || [];
        let { url } = (res =
          results[Math.floor(Math.random() * results.length)] || {});
        if (!res) return reply2("Gambar tidak ditemukan");
        await rizz.replyWithChatAction("upload_photo");
        rizz.replyWithPhoto(
          {
            url: url,
            filename: "gimage.jpg",
          },
          { caption: "Nih" }
        );
        break;
      case prefix + "pin":
        if (!isGroup && !isAdmin) return reply2("`Khusus Admin and group`");
        if (!isQuoted) return reply(`reply pesan yang ingin dipin`);
        bot.telegram.pinChatMessage(
          from,
          rizz.message.reply_to_message.message_id
        );
        reply2(monoscape(`Sukses Pin pesan`));
        break;
      case "$":
        if (!isOwner)
          return rizz.reply("Perintah ini hanya untuk owner bot!", {
            reply_to_message_id: messageId,
          });

        if (!qe)
          return rizz.reply("Masukkan kode yang mau di execute!", {
            reply_to_message_id: messageId,
          });

        var exe = execSync(qe);
        var res = util.format(exe.toString() || "done!");
        try {
          rizz.reply(res, { reply_to_message_id: messageId });
        } catch (e) {
          rizz.reply(util.format(e.message), {
            reply_to_message_id: messageId,
          });
        }
        break;
      case ">":
      case ">>":
        if (!isOwner)
          return rizz.reply("Perintah ini hanya untuk owner bot!", {
            reply_to_message_id: messageId,
          });
        if (!qe)
          return rizz.reply("Masukkan kode javascript!", {
            reply_to_message_id: messageId,
          });
        try {
          let result = eval(
            `( async () => { ${command == ">>" ? "return " + qe : qe} })()`
          );
          if (result instanceof Promise) result = await result;
          if (typeof result !== "string")
            result = util.inspect(result, { depth: 5 });
          rizz.reply(result, { reply_to_message_id: messageId });
        } catch (err) {
          rizz.reply("Error: " + err, { reply_to_message_id: messageId });
        }
        break;
      case prefix + "cekadmin":
      case prefix + "admin":
        try {
          ad = await bot.telegram.getChatAdministrators(from);
          an = "*INFO ADMIN GROUP " + groupName + "*\n\n";
          for (let i of ad) {
            an += `Username: @${i.user.username}\n`;
            an += `Status: ${i.status}\n`;
            if (i.status == "administrator") {
              an += `Edit Group? *${i.can_be_edited ? "Boleh" : "Dilarang"}*
`;
              an += `Edit Chat? *${i.can_manage_chat ? "Boleh" : "Dilarang"}*
`;
              an += `Ganti Info Group? *${
                i.can_change_info ? "Boleh" : "Dilarang"
              }*
`;
              an += `Hapus Pesan member? *${
                i.can_delete_messages ? "Boleh" : "Dilarang"
              }*
`;
              an += `Undang Orang? *${
                i.can_invite_users ? "Boleh" : "Dilarang"
              }*
`;
              an += `Block Member? *${
                i.can_restrict_members ? "Boleh" : "Dilarang"
              }*
`;
              an += `Pin Pesan? *${i.can_pin_messages ? "Boleh" : "Dilarang"}*
`;
              an += `Promote Member? *${
                i.can_promote_members ? "Boleh" : "Dilarang"
              }*
`;
              an += `Kelola obrolan video? *${
                i.can_manage_voice_chats ? "Boleh" : "Dilarang"
              }*
\n\n`;
            } else {
              an += `*Pemilik Group Bebas melakukan apa pun*\n`;
            }
          }
          reply2(an);
        } catch (e) {
          reply("Harus Digrub!");
        }
        break;
      case prefix + "leave":
      case prefix + "stop":
        if (!isPrivate)
          return reply(`Perintah Ini hanya Bisa Digunakan Chat Pribadi!`);
        let reme = Object.values(this.anonymous).find((room) =>
          room.check(sender2)
        );
        if (!reme) {
          bot.telegram.sendMessage(
            from,
            `[⚠️] Kamu belum pernah mulai chat! ❌`
          );
          return;
        }
        bot.telegram.sendMessage(from, `[✅] Berhasil memberhentikan chat`);
        delete this.anonymous[reme.id];
        let erh = reme.other(sender2);
        if (erh) {
          bot.telegram.sendMessage(
            erh,
            `[⚠️] Sesi chat ini telah diberhentikan oleh teman chat kamu`
          );
        }
        break;
      case prefix + "next":
      case prefix + "skip":
        if (!isPrivate)
          return reply(`Perintah Ini hanya Bisa Digunakan Chat Pribadi!`);
        let rom = Object.values(this.anonymous).find((room) =>
          room.check(sender2)
        );
        if (!rom) {
          bot.telegram.sendMessage(
            from,
            `[⚠️] Kamu belum pernah memulai chat! ❌`,
            { reply_to_message_id: rizz.message.message_id }
          );
          return;
        }
        let other = rom.other(sender2);
        if (other) {
          bot.telegram.sendMessage(
            other,
            `[⚠️] Sesi chat ini telah diberhentikan oleh teman chat kamu! ❌`
          );
        }
        delete this.anonymous[rom.id];
      case prefix + "search":
        if (!isPrivate)
          return reply(`Perintah Ini hanya Bisa Digunakan Chat Pribadi!`);
        if (Object.values(this.anonymous).find((room) => room.check(sender2)))
          return reply("Kamu masih berada di dalam anonymous chat");
        let room = Object.values(this.anonymous).find(
          (room) => room.state === "WAITING" && !room.check(sender2)
        );
        if (room) {
          bot.telegram.sendMessage(
            room.c,
            `Pasangan Ditemukan 🐼\n${prefix}skip -- cari pasangan baru\n${prefix}stop -- hentikan dialog ini`,
            { parse_mode: "Markdown" }
          );
          room.b = sender2;
          room.state = "CHATTING";
          bot.telegram.sendMessage(
            from,
            `Pasangan Ditemukan 🐼\n${prefix}skip -- cari pasangan baru\n${prefix}stop -- hentikan dialog ini`,
            { reply_to_message_id: rizz.message.message_id }
          );
        } else {
          let ifd = +new Date();
          this.anonymous[ifd] = {
            id: ifd,
            c: sender2,
            b: "",
            state: "WAITING",
            check: function (who = "") {
              return [this.c, this.b].includes(who);
            },
            other: function (who = "") {
              return who === this.c ? this.b : who === this.b ? this.c : "";
            },
          };
          reply2("`[🔎] Mohon tunggu sedang mencari teman chat`");
        }
        break;
      case prefix + "afk":
        if (!isGroup) return reply("Gunakan Perintah ini di group");
        alasan = args.join(" ");
        afk.push("@" + name.username);
        fs.writeFileSync("./json/afk.json", JSON.stringify(afk));
        console.log("@" + name.username);
        ini_txt =
          "Anda telah afk. \nJika ada yang tag kamu bot akan memberitahukan bahwa kamu off\nJika ingin kembali dari afk ketik hai di sini";
        reply(ini_txt);
        break;
      case prefix + "tiktok":
        if (!qe) return reply(`Kirim perintah ${command} link`);
        if (!isUrl(qe)) return reply(mess.error.Iv);
        if (!qe.includes("vt.tiktok.com") && !qe.includes("tiktok.com"))
          return reply("Link yang kamu berikan tidak valid");
        sendsearch(bot, rizz);
        rizz.replyWithChatAction("upload_video");
        axios
          .get(
            `https://developers.tiklydown.me/api/download?url=${encodeURIComponent(
              qe
            )}`
          )
          .then((dats) => {
            if (dats.status !== 200) return reply(dats.message);
            var datas = dats.data;
            var caption = `${datas.title || "Nih Kak"}\n\nVideo by ${
              datas.author.name
            } In TikTok`;
            filename = Date.now() + ".mp4";
            sendVideo(rizz, `${datas.video.noWatermark}`, filename, caption);
          })
          .catch(() => rizz.reply("Maaf Terjadi Kesalahan"));
        break;
      case prefix + "loli":
        sendsearch(bot, rizz);
        paq = await toJson(`https://api-lolis.vercel.app/loli`);
        rizz.replyWithPhoto(
          {
            url: paq.url,
            filename: "kitten.jpg",
          },
          {
            caption: "Pedo yh bg 🤨📸",
            reply_to_message_id: rizz.message.message_id,
          }
        );
        break;
      case prefix + "donasi":
        sendDonation(bot, rizz);
        break;
      case prefix + "owoner":
        reply(`[My Master](t.me/rizzlogy)`);
        break;
      case prefix + "info":
        bot.telegram.sendMessage(
          from,
          ` Info Bot ${bot.botInfo.first_name}

• Username Bot : 
 ${bot.botInfo.username}
• Name Bot : ${bot.botInfo.first_name}
• Can bots be added to groups? ${bot.botInfo.can_join_groups ? "Yes" : "No"}
• Do bots read chat groups? ${
            bot.botInfo.can_read_all_group_messages ? "Yes" : "No"
          }`,
          {
            reply_to_message_id: rizz.message.message_id,
            reply_markup: {
              keyboard: [
                [
                  { text: "Creator Bot", callback_data: "credit" },
                  { text: "Source Code Bot", callback_data: "script" },
                ],
                [{ text: "Eliminate Keyboards" }],
              ],
              resize_keyboard: true,
              parse_mode: "html",
            },
          }
        );
        break;
      case prefix + "soundcloud":
        try {
          if (!qe) return rizz.reply(`Kirim perintah ${command} link`);
          if (!isUrl(qe))
            return rizz.reply("Link yang kamu berikan tidak valid");
          if (
            !qe.includes("soundcloud.com") &&
            !qe.includes("m.soundcloud.com") &&
            !qe.includes("on.soundcloud.com")
          )
            return rizz.reply("Link yang kamu berikan tidak valid");
          await sendsearch(bot, rizz);
          let data = await scdl.soundcloud(qe);
          let title = data.title;
          await rizz.replyWithPhoto(
            {
              source: await toBuffer(data.media.artwork_url),
              filename: title + ".jpg",
            },
            {
              caption: `「 SoundCloud Downloader 」\n\n≻ Title: ${data.title}\n≻ Artist: ${data.artist}\n≻ Likes: ${data.likes}\n≻ Comment: ${data.comment}\n≻ Reposts: ${data.reposts}\n≻ Playback: ${data.playback}\n≻ Duration: ${data.duration}\n≻ Created At: ${data.createdAt}\n≻ Download: ${data.media.stream_url}\n\nWait a minute! bot is creating thumbnail & wmetadata...`,
              reply_to_message_id: rizz.message.message_id,
            }
          );
          rizz.replyWithChatAction("upload_photo");

          const tags = {
            title: data.title,
            artist: data.artist,
            album: data.artist,
            APIC: {
              mime: "image/jpg",
              imageBuffer: await toBuffer(data.media.artwork_url),
            },
            TRCK: "1",
          };
          await rizz.replyWithChatAction("typing");
          await rizz.reply(
            "Creating Thumbnail & Metadata Success, Bot Sending File Audio..."
          );
          const success = setTag.write(
            tags,
            await toBuffer(data.media.stream_url)
          );

          await rizz
            .replyWithAudio(
              {
                source: success,
                filename: title + ".mp3",
              },
              { reply_to_message_id: rizz.message.message_id }
            )
            .catch((e) => {
              rizz.reply("Link Invalid");
              console.log(e);
            });
          rizz.replyWithChatAction("upload_audio");
        } catch (e) {
          rizz.reply("Maaf terjadi kesalahan");
          console.error(e);
        }
        break;
      case prefix + "ytmp3":
        try {
          if (!qe) return rizz.reply(`Kirim perintah ${command} link`);
          if (!isUrl(qe))
            return rizz.reply("Link yang kamu berikan tidak valid");
          if (!qe.includes("youtu.be") && !qe.includes("youtube.com"))
            return rizz.reply("Link yang kamu berikan tidak valid");
          await sendsearch(bot, rizz);
          const data = await ikyyh.yt.ytmp4(qe);
          let { title, thumb, channel, result, desc } = data;
          await rizz.replyWithPhoto(
            {
              source: await toBuffer(thumb),
              filename: title + ".jpg",
            },
            {
              caption: `「 YOUTUBE MP3 」\n\n≻ Title: ${title}\n≻ Artist: ${channel}\n≻ Download: ${result}\n\nWait a minute! bot is creating thumbnail & metadata...`,
              reply_to_message_id: rizz.message.message_id,
            }
          );
          rizz.replyWithChatAction("upload_photo");
          const tags = {
            title: title || "Unknown",
            artist: channel || "Unknown",
            album: channel || "Unknown",
            APIC: {
              mime: "image/jpg",
              imageBuffer: await toBuffer(thumb),
            },
            TRCK: "1",
          };
          await rizz.replyWithChatAction("typing");
          await rizz.reply(
            "Creating Thumbnail & Metadata Success, Bot Sending File Audio..."
          );
          const success = setTag.write(
            tags,
            await toAudio(await toBuffer(result), "mp3")
          );

          await rizz
            .replyWithAudio(
              {
                source: success,
                filename: title + ".mp3",
              },
              { reply_to_message_id: rizz.message.message_id }
            )
            .catch((e) => {
              rizz.reply("Link Invalid");
              console.log(e);
            });
          rizz.replyWithChatAction("upload_audio");
        } catch (e) {
          rizz.reply("Maaf terjadi kesalahan");
          console.error(e);
        }
        break;
      case prefix + "ping":
      case prefix + "p":
        var { totalGb, usedGb, freeGb } = await nou.drive.info();
        const tmenu = `
› Hostname : ${os.hostname()}
› Arch : ${os.arch()}
› CPU : ${os.cpus()[0].model}${
          os.cpus().length > 1 ? " (" + os.cpus().length + "x)" : ""
        }
› Release : ${os.release()}
› Version : ${os.version()}
› Memory : ${formats(os.totalmem() - os.freemem())} / ${bytesToSize(
          os.totalmem()
        )}
› Total Storage : ${totalGb} GB
› Used : ${usedGb} GB
› Free : ${freeGb} GB
› Platform : ${os.platform()}
› Ping : ${tutid} ms
› Speed : ${latensi.toFixed(4)} Second

`;
        bot.telegram.sendMessage(rizz.chat.id, tmenu, {
          reply_to_message_id: rizz.message.message_id,
          reply_markup: {
            inline_keyboard: [[{ text: "Back!", callback_data: "start" }]],
          },
          parse_mode: "Markdown",
        });
        break;
      case prefix + "yts":
      case prefix + "ytsearch":
        if (!qe) {
          message = "Please enter text, for example: /ytsearch snowman";
          rizz.reply(message);
        } else {
          sendProses(bot, rizz);
          try {
            terus = "❒ 「 YOUTUBE SEARCH」\n\n";
            res = await yts(`${qe}`);
            for (let i = 0; i < 5; i++) {
              terus += `NOMOR: ${i}
• Judul : ${res.all[i].title}
• ID Video : ${res.all[i].videoId}
• Views : ${res.all[i].views}
• Di Upload Pada : ${res.all[i].ago}
• Durasi : ${res.all[i].timestamp}
• Channel : ${res.all[i].author.name}
• Link Channel : ${res.all[i].author.url}
• Link Video : ${res.all[i].url}`;
            }
            bot.telegram.sendMessage(from, terus);
          } catch {
            rizz.reply(`Pastikan judul sudah benar!`);
          }
        }
        break;
      case prefix + "happymod":
      case prefix + "hmod":
        if (!qe) return reply2(`Contoh Penggunaan :\n${command} pubg`);
        await sendsearch(bot, rizz);
        head = "*Happymod Search*\n\n";
        var { status, result } = await clph.search.happymod(qe);
        if (status != 200) return reply2(`Apk ${qe} Not Found!`);
        n = 0;
        for (let i of result)
          head += `(${(n += 1)}). ${i.title}\n• App Link : ${i.link}\n\n`;
        reply2(head.trim());
        break;
      case prefix + "pinterest":
        if (!qe) return msg("Mau Cari apa?");
        sendsearch(bot, rizz);
        try {
          await clph.search
            .pin(qe)
            .then((result) => {
              json = result[Math.floor(Math.random() * result.length)];
              console.log(json);
              rizz.replyWithPhoto(
                {
                  url: json,
                  filename: "rizz.jpg",
                },
                { reply_to_message_id: rizz.message.message_id }
              );
            })
            .catch((e) => console.log(e));
        } catch (e) {
          console.log(e);
        }
        break;
      case prefix + "e621search":
        if (!qe)
          return rizz.reply(
            `Masukkan Artistnya!\nContoh: ${command} oouyuki_benten`
          );
        sendsearch(bot, rizz);
        try {
          await toJson(`https://yiff.rizzdev.my.id/api/get-random?tags=${qe}`).then(
            (res) => {
              var { artist, character, species, score, info, static } =
                res.yiff.metadata;
              let inicaption = `𝐑𝐀𝐍𝐃𝐎𝐌 𝐄𝟔𝟐𝟏.𝐍𝐄𝐓\n\n≻ 𝐀𝐫𝐭𝐢𝐬𝐭: ${
                artist.join(", ").trim() || "𝐍𝐨 𝐃𝐚𝐭𝐚"
              }\n≻ 𝐂𝐡𝐚𝐫𝐚𝐜𝐭𝐞𝐫: ${
                character.join(", ").trim() || "𝐍𝐨 𝐃𝐚𝐭𝐚"
              }\n≻ 𝐒𝐩𝐞𝐜𝐢𝐞𝐬: ${
                species.join(", ").trim() || "𝐍𝐨 𝐃𝐚𝐭𝐚"
              }\n≻ 𝐒𝐜𝐨𝐫𝐞: 𝐔𝐩 ${score.up}, 𝐃𝐨𝐰𝐧 ${score.down}, 𝐓𝐨𝐭𝐚𝐥 ${
                score.total
              }\n≻ 𝐖𝐢𝐝𝐭𝐡: ${info.width}\n≻ 𝐇𝐞𝐢𝐠𝐡𝐭: ${info.height}\n≻ 𝐒𝐢𝐳𝐞: ${
                info.size
              }\n≻ 𝐂𝐫𝐞𝐚𝐭𝐞𝐝 𝐀𝐭: ${info.created_at}\n≻ 𝐔𝐩𝐝𝐚𝐭𝐞𝐝 𝐀𝐭: ${
                info.updated_at
              }\n≻ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: ${info.description || "𝐍𝐨 𝐃𝐚𝐭𝐚"}`;

              if (/webp|gif/gi.test(info.ext)) {
                rizz.replyWithChatAction("upload_video");
                rizz.replyWithVideo(
                  {
                    url: `${static.url}`,
                    filename: "e621API-STATIC." + info.ext,
                  },
                  {
                    caption: inicaption,
                    reply_to_message_id: rizz.message.message_id,
                  }
                );
              } else if (/jpg|png|jpeg/gi.test(info.ext)) {
                rizz.replyWithChatAction("upload_photo");
                rizz.replyWithPhoto(
                  {
                    url: `${static.url}`,
                    filename: "e621API-STATIC." + info.ext,
                  },
                  {
                    caption: inicaption,
                    reply_to_message_id: rizz.message.message_id,
                  }
                );
              }
            }
          );
        } catch (e) {
          msg("Artist/tags Tidak Ditemukan!");
          console.log(e);
        }
        break;
      case prefix + "ytmp4":
        try {
          if (!qe) return rizz.reply(`Kirim perintah ${command} link`);
          if (!isUrl(qe))
            return rizz.reply("Link yang kamu berikan tidak valid");
          if (!qe.includes("youtu.be") && !qe.includes("youtube.com"))
            return rizz.reply("Link yang kamu berikan tidak valid");
          await sendsearch(bot, rizz);
          const data = await ikyyh.yt.ytmp4(qe);
          let { title, thumb, channel, result, desc } = data;
          await rizz.replyWithPhoto(
            {
              source: await toBuffer(thumb),
              filename: "rizz.jpg",
            },
            {
              caption: `「 YOUTUBE MP4 」\n\n≻ Title: ${title}\n≻ Artist: ${channel}\n≻ Download: ${result}\n\n`,
              reply_to_message_id: rizz.message.message_id,
            }
          );
          rizz.replyWithChatAction("upload_photo");

          await rizz
            .replyWithVideo(
              {
                source: await toBuffer(result),
                filename: "rizz.mp4",
              },
              { reply_to_message_id: rizz.message.message_id }
            )

            .catch((e) => {
              rizz.reply("Link Invalid");
              console.log(e);
            });
          rizz.replyWithChatAction("upload_video");
        } catch (e) {
          rizz.reply("Maaf terjadi kesalahan");
          console.error(e);
        }
        break;
      case prefix + "randomwaifu":
        await sendsearch(bot, rizz);
        var hasil = await toJson(`https://api.waifu.pics/sfw/waifu`);
        rizz.replyWithChatAction("upload_photo");
        var nah = hasil.url;
        rizz.replyWithPhoto(
          { url: nah },
          {
            caption: "Source : " + nah,
            parse_mode: "Markdown",
            disable_web_page_preview: "true",
          }
        );
        break;
      case prefix + "randomneko":
        await sendsearch(bot, rizz);
        var hasil = await toJson(`https://api.waifu.pics/sfw/neko`);
        rizz.replyWithChatAction("upload_photo");
        var nah = hasil.url;
        rizz.replyWithPhoto(
          { url: nah },
          {
            caption: "Source : " + nah,
            parse_mode: "Markdown",
            disable_web_page_preview: "true",
          }
        );
        break;
      case prefix + "waifu":
      case prefix + "neko":
        await sendsearch(bot, rizz);
        var hasil = await toJson(
          `https://api.waifu.pics/nsfw/${command.slice(5)}`
        );
        rizz.replyWithChatAction("upload_photo");
        var nah = hasil.url;
        rizz.replyWithPhoto(
          { url: nah },
          {
            caption: "Source : " + nah,
            parse_mode: "Markdown",
            disable_web_page_preview: "true",
          }
        );
        break;
      case prefix + "tes":
        console.log(rizz);
        reply2("Udah Nyala Yeaj");
        break;
      case prefix + "menu":
        sendHelp(bot, rizz);
        break;
      case prefix + "simioff":
        if (simi.includes(sender)) return reply("sudah mati sebelumnya");
        simi.push(sender);
        fs.writeFileSync("json/simi.json", JSON.stringify(simi));
        reply("Sukses Mematikan Simsimi");
        break;
      case prefix + "simion":
        if (!simi.includes(sender)) return reply("sudah hidup sebelumnya");
        simi.splice(sender, 1);
        fs.writeFileSync("./json/simi.json", JSON.stringify(simi));
        reply("Sukses Menghidupkan Simsimi");
        break;
      default:
        if (!isGroup && !isCmd && !isMedia) {
          if (simi.includes(sender)) return;
          await rizz.replyWithChatAction("typing");
          anu = await toJson(`https://api.simsimi.net/v2/?text=${q}&lc=id`);
          if (anu.error) return;
          simsi = anu.success;
          rizz.reply(
            `${simsi
              .replace(
                "Jawaban untuk ini adalah dilarang",
                "aku dilarang untuk berkata kasar sama ownerku kak maaf ya"
              )
              .replace("Rizzy", name.username)
              .replace(/simi/gi, "Rizzy")
              .replace(
                /Jangan berkata kasar!!!dong/gi,
                "bacot kontol sok kata kasar loe " + name.username
              )
              .replace(/bangchan/gi, "RizzyFuzz")
              .replace(/simsimi/gi, "Rizzy")
              .replace(
                /please enter the text - text=hello/gi,
                `Ada apa kak ${name.username}`
              )
              .replace(
                /Aku tidak mengerti apa yang kamu katakan.Tolong ajari aku./gi,
                "Maaf Rizzy tidak paham 😔"
              )}`
          );
          console.log(
            chalk.whiteBright(""),
            chalk.cyanBright("[ SIMI ]"),
            chalk.whiteBright(q),
            chalk.greenBright("from"),
            chalk.whiteBright(name.username)
          );
          console.log(
            chalk.whiteBright(""),
            chalk.cyanBright("[ BOT ]"),
            chalk.whiteBright(
              simsi
                .replace(
                  "Jawaban untuk ini adalah dilarang",
                  "aku dilarang untuk berkata kasar sama onerku kak, maaf ya"
                )
                .replace("Tiara", name.username)
                .replace(/simi/gi, "Rizzy")
                .replace(
                  /Jangan berkata kasar!!!dong/gi,
                  "bacot kontol sok kata kasar loe " + name.username
                )
                .replace(/bangchan/gi, "RizzyFuzz")
                .replace(/simsimi/gi, "Rizzy")
                .replace(
                  /please enter the text - text=hello/gi,
                  `Ada apa kak ${name.username}`
                )
                .replace(
                  /Aku tidak mengerti apa yang kamu katakan.Tolong ajari aku./gi,
                  "Maaf Rizzy tidak paham 😔"
                )
            ),
            chalk.greenBright("from"),
            chalk.whiteBright(user.username)
          );
        } //simi simi
    }
  } catch (e) {
    console.log(
      chalk.whiteBright("├"),
      chalk.cyanBright("[  ERROR  ]"),
      chalk.redBright(e)
    );
    if (rizz) rizz.reply(util.format(e)).catch(() => {});
  }
});

bot
  .launch({
    dropPendingUpdates: true,
  })
  .catch((e) => {
    console.log(
      "Failed connect to Telegram API, please check your bot token!\nStack Error: " +
        e
    );
  });

app.set("json spaces", 2);
app.set("trust proxy", 1);

app.all("/", async (req, res) => {
  try {
    let clientInfo = await client.getMe();
    res.status(200).json({
      status: 200,
      message: "Bot Successfully Connected to Telegram API",
      clientInfo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 500,
      message:
        "Failed to Connect to Telegram API, Please Check Your Bot Token!",
    });
  }
});

console.log(banner.string);
spinnies.add("spinner-1", { text: "Connecting..." });
setTimeout(() => {
  spinnies.succeed("spinner-1", {
    text: `Bot connected to: ${bot.botInfo.username}`,
  });
}, 1000);
setTimeout(() => {
  spinnies.add("spinner-2", { text: `Connecting To Server..` });
  app.listen(PORT, () => {
    spinnies.succeed("spinner-2", { text: `App Running On PORT: ${PORT}` });
  });
  bot.telegram.getMe().then((getme) => {
    console.log(chalk.greenBright(" ================================"));
    console.log(chalk.greenBright(" │ + Owner    : RizzyFuzz"));
    console.log(chalk.greenBright(" │ + Bot Name : " + getme.first_name || ""));
    console.log(chalk.greenBright(" │ + Version  : 1.0.0"));
    console.log(chalk.greenBright(" │ + Host     : " + os.hostname() || ""));
    console.log(chalk.greenBright(" │ + Platfrom : " + os.platform() || ""));
    console.log(chalk.greenBright(" │ + Prefix   : Multi Prefix"));
    console.log(chalk.greenBright(" ================================"));
    console.log(chalk.whiteBright("╭─── [ LOG ]"));
  });
}, 1000);
//! Clear tmp
clearTmp();

process.on("uncaughtException", function (err) {
  console.error(err);
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
