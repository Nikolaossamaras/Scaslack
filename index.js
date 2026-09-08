require("dotenv").config();

const { App } = require("@slack/bolt");

const axios = require("axios");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/scaslack-ping", async ({ command, ack, say }) => {
  const now = Date.now();
  await ack();
  const latency = Date.now()-now;
  await respond({ text:`Pong! Latency: ${latency}ms` });
});

app.command("/scaslack-help", async ({ command , ack, say }) => {
  await ack();
  await respond({
    text: "Here are the available commands:\n" +
          "/scaslack-ping - Check the bot's latency.\n" +
          "/scaslack-help - Display this help message." +
          "/scaslack-catfact - Get a random cat fact.\n" +
          "/scaslack-joke - Get a random joke.\n" +
          "/scaslack-weather[city] - Get the current weather for a specified city.\n" +
          "/scaslack-waifu [character] - Get an image of a specified waifu character.\n"
  });
});

app.command("/scaslack-catfact", async ({ command, ack, say }) => {
  await ack();
  try {
    const response = await axios.get("https://catfact.ninja/fact");
    const fact = response.data.fact;
    await respond({text:`Here's a random cat fact: ${fact}`});
  }
  catch (error){
    await respond({text:"Sorry, I couldn't fetch a cat fact at the moment."});
  }
});

app.command("/scaslack-joke", async ({ command, ack, say }) => {
  await ack();
  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    const joke = response.data;
    await respond({text:`Here's a random joke: ${joke.setup} - ${joke.punchline}`});
  }
  catch (error){
    await respond({text:"Sorry, I couldn't fetch a joke at the moment."});
  }
});

app.command("/scaslack-weather", async ({ command, ack, say }) => {
  await ack();
  const city = command.text.trim();
  if (!city){
    await respond({text:"Please provide a city name. Usage: /scaslack-weather [city]"});
    return;
  }else{
    try {
      const Api_key =  process.env.OPENWEATHER_API_KEY;

      const url = 
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(city)}` +
      `&APPID=${apiKey}` +
      `&units=metric`;
    console.log("Weather URL:", url.replace(apiKey, "HIDDEN"));
    const reponse = await axios.get(url);
    const weather = reponse.data;

    const Weather_info =
    `Weather in ${weather.name}, ${weather.sys.country}
    Temperature: ${weather.main.temp}°C
    Feels like: ${weather.main.feels_like}°C
    Humidity: ${weather.main.humidity}%
    Wind: ${weather.wind.speed} m/s
    Weather: ${weather.weather[0].description}`;

    await respond({text: Weather_info});

    }catch(error){
    console.error("WEATHER ERROR:");
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
    console.error("Message:", err.message);
    await respond({text:`couldn't catch the weather in your City , please try again in a few minutes`})
    }
  }
});
