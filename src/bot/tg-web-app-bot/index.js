const TelegramBot = require('node-telegram-bot-api');
const token = '7011775641:AAFILk0PdjuQu_hvxnB2JKriJK59GbyL724';
const bot = new TelegramBot(token, {polling: true});
const webAppUrl = 'https://jovial-froyo-ee7a40.netlify.app';

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text) {
    await bot.sendMessage(chatId, 'F.A.Q.', {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Магазин', web_app:{url: webAppUrl}}]
        ]
      }
    })
  }
});
