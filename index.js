require("dotenv").config();
const fetch = require("node-fetch");
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
// const bot2 = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const weatherToken = process.env.WEATHER_API_TOKEN;

const weatherURL = new URL("https://api.openweathermap.org/data/2.5/weather");

weatherURL.searchParams.set("APPID", weatherToken);
weatherURL.searchParams.set("zip", "78747,us");
weatherURL.searchParams.set("units", "imperial");

const getWeatherData = async () => {
  const resp = await fetch(weatherURL.toString());
  const body = await resp.json();
  return body;
};

const GenerateWeatherMessage = ({ name, weather, main }) => {
  const message = `The weather in ${name}: ${weather[0].description}. Current temperature is ${main.temp}, with a low of ${main.temp_min} and a high of ${main.temp_max}`;

  return message;
};

const main = async () => {
  const weatherData = await getWeatherData();
  const weatherMessage = GenerateWeatherMessage(weatherData);

  bot.sendMessage(parseInt(process.env.TELEGRAM_CHAT_ID), weatherMessage);

  //   bot2.on("message", msg => {
  //     console.log(msg);
  //     bot2.sendMessage(msg.chat.id, "Hello dear user");
  //     console.log(typeof msg.chat.id);
  //   });
};

main();
