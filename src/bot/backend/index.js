const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '7011775641:AAFILk0PdjuQu_hvxnB2JKriJK59GbyL724';
const webAppUrl = 'https://capable-lily-b51c6e.netlify.app';

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // if (text === '/start') {
    // await bot.sendMessage(chatId, 'lsflkf;', {
    //   reply_markup: {
    //     keyboard: [
    //       [{text: 'fuck', web_app: {url: webAppUrl + '/form'}}]
    //     ]
    //   }
    // })

    await bot.sendMessage(chatId, 'Текст', {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Перейти в магазин', web_app: {url: webAppUrl}}]
        ]
      }
    })
  // }

  // if (msg?.web_app_data?.data) {
  //   try {
  //     const data = JSON.parse(msg.web_app_data.data);

  //     await bot.sendMessage(chatId, `Страна - ${data?.country}`);
  //     await bot.sendMessage(chatId, `Улица - ${data?.street}`);
      
  //     setTimeout(async () => {
  //       await bot.sendMessage(chatId, 'Вот и все ребятки!!');
  //     }, 3000)
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
});

app.post('/web-data', async (req, res) => {
  const {queryId, product, totalPrice} = req.body;
  try {
    await tg.answerWebAppQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Успешная покупка',
      input_message_content: {
        message_text: `Поздравляю с покупкой стоимость ${totalPrice}!`
      }
    });

    return res.status(200).json({});
  } catch(e) {
    await tg.answerWebAppQuery(queryId, {
      type: 'article',
      id: queryId,
      title: 'Не удалось купить',
      input_message_content: {
        message_text: 'Не удалось купить'
      }
    });

    return res.status(500).json({});
  }
})

const PORT = 8080;
app.listen(port, () => {
  console.log(`Server started on port ${PORT}`);
})
