const {
  parseResult,
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
  toJson,
  isUrl,
  range,
  argsGet,
} = require("./functions");

exports.sendProses = async (bot, ctx) => {
  // let chatId = msg.chat.id;
  let botReply = "Wait a minute..";
  bot.telegram
    .sendMessage(ctx.chat.id, botReply, {
      reply_to_message_id: ctx.message.message_id,
    })
    .then((result) => {
      setTimeout(() => {
        bot.telegram.deleteMessage(ctx.chat.id, result.message_id);
      }, 10 * 500);
    })
    .catch((err) => console.log(err));
};
exports.sendProsesWithMsg = async (msg, bot, ctx) => {
  let botReply = msg;
  bot.telegram
    .sendMessage(ctx.chat.id, botReply, {
      reply_to_message_id: ctx.message.message_id,
    })
    .then((result) => {
      setTimeout(() => {
        bot.telegram.deleteMessage(ctx.chat.id, result.message_id);
      }, 10 * 500);
    })
    .catch((err) => console.log(err));
};
exports.format = async (seconds) => {
  function pad(s) {
    return (s < 10 ? `0` : ``) + s;
  }
  var hours = Math.floor(seconds / 6060);
  var minutes = Math.floor((seconds % 6060) / 60);
  var seconds = Math.floor(seconds % 60);
  return pad(hours) + ` H,` + pad(minutes) + ` M,` + pad(seconds) + ` S`;
};

exports.sendText = async (bot, ctx, teks) => {
  bot.telegram.sendMessage(ctx.chat.id, teks, {
    reply_markup: {
      inline_keyboard: [[{ text: "Back", callback_data: "help" }]],
    },
    parse_mode: "Markdown",
    disable_web_page_preview: "true",
  });
};
exports.sendsearch = async (bot, ctx) => {
  // let chatId = msg.chat.id;
  let botReply = "Searching, wait a moment..";
  bot.telegram
    .sendMessage(ctx.chat.id, botReply, {
      reply_to_message_id: ctx.message.message_id,
    })
    .then((result) => {
      setTimeout(() => {
        bot.telegram.deleteMessage(ctx.chat.id, result.message_id);
      }, 10 * 500);
    })
    .catch((err) => console.log(err));
};
exports.sendDonation = async (bot, ctx) => {
  ctx.replyWithPhoto(
    { url: `https://i.ibb.co/bJ9h2Ts/IMG-20221110-163838.jpg` },
    {
      caption: `• DANA
⤷ 6282196930963

• Telkomsel Credit
⤷ 6282196930963

Very Thanks for Your donation. 😁`,
      reply_markup: {
        inline_keyboard: [[{ text: "Back🔙", callback_data: "start" }]],
      },
      parse_mode: "Markdown",
    }
  );
};
exports.sendHelp = async (bot, ctx) => {
  ctx.replyWithPhoto(
    { url: `https://i.ibb.co/LdX4zxC/IMG-20221110-065335.jpg` },
    {
      caption: `Please select the menu below\n\n`,
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Downloader📁", callback_data: "downloadermenu" },
            { text: "Fun🐻", callback_data: "funmenu" },
          ],
          [
            { text: "Search🔎", callback_data: "searchmenu" },
            { text: "NSFW👀", callback_data: "nsfwmenu" },
            { text: "SFW😁", callback_data: "sfwmenu" },
          ],
          [{ text: "Group📢", callback_data: "groupmenu" }],
          [{ text: "Back🔙", callback_data: "start" }],
        ],
      },
      parse_mode: "Markdown",
      disable_web_page_preview: "true",
    }
  );
};
exports.sendStart = async (bot, ctx, name) => {
  ctx.replyWithPhoto(
    { url: `https://i.ibb.co/FHFb1nJ/Untitled4-20230106120445.png` },
    {
      caption: `Hello ${
        name || "kak"
      }! Im a multifunction bot build with nodejs by [my master](t.me/rizzlogy).`,
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Donation💰", callback_data: "donasi" },
            { text: "Ping🚀", callback_data: "ping" },
            { text: "Info Bot🤖", callback_data: "info" },
          ],
          [{ text: "Start Anonymous Chat", callback_data: "anonymous" }],
          [
            { text: "Rizzy Website", url: "https://rizfurr.ml" },
            { text: "Owner Bot🙍", url: "t.me/" + config.ownerusername },
          ],
          [{ text: "Menu📚", callback_data: "menu" }],
        ],
      },
      parse_mode: "Markdown",
      disable_web_page_preview: "true",
    }
  );
};

exports.getPosition = async (userId, _dir) => {
  let position = null;
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      position = i;
    }
  });
  return position;
};
