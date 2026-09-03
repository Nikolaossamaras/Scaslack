require("dotenv").config();

const axios = require("axios");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});


app.command("/scaslack-ping", async ({ command, ack, respond }) => {
  const start = Date.now();

  await ack();

  const latency = Date.now() - start;

  await respond({
    text: `Ping Pong!\nLatency: ${latency}ms`
  });
});



app.command("/scaslack-help", async ({ ack, respond }) => {
  await ack();

  await respond({
    text:
`Available Commands:

/scaslack-ping - Check bot latency
/scaslack-catfact - Get a cat fact
/scaslack-joke - Get a random joke
/scaslack-weather [city] - Get weather information for a specified city
/scaslack-waifu [character] - Get a waifu image (character is optional if not provided, a random waifu will be returned, \n be aware that some character are not available because they don not have a tag in the waifu.im API)`
  });
});



app.command("/scaslack-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://catfact.ninja/fact"
    );

    await respond({
      text: `Cat Fact:\n${response.data.fact}`
    });

  } catch (err) {

    console.log(
      "CAT FACT ERROR:",
      err.response?.data || err.message
    );

    await respond({
      text: "Failed to fetch a cat fact."
    });
  }
});




app.command("/scaslack-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
    );

    await respond({
      text: `${response.data.setup}\n\n${response.data.punchline}╰(*°▽°*)╯`
    });

  } catch (err) {

    console.log(
      "JOKE ERROR:",
      err.response?.data || err.message
    );

    await respond({
      text: "Failed to fetch a joke."
    });
  }
});


app.command("/scaslack-weather", async ({ ack, respond, command }) => {
  await ack();

  const city = command.text.trim();

  if (!city) {
    await respond({
      text: "Please provide a city name.\nUsage: /scaslack-weather [city]"
    });
    return;
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(city)}` +
      `&APPID=${apiKey}` +
      `&units=metric`;

    console.log("Weather URL:", url.replace(apiKey, "HIDDEN"));

    const response = await axios.get(url);

    const weather = response.data;

    const weatherInfo =
`🌤️ Weather in ${weather.name}, ${weather.sys.country}

🌡️ Temperature: ${weather.main.temp}°C
🤔 Feels like: ${weather.main.feels_like}°C
💧 Humidity: ${weather.main.humidity}%
💨 Wind: ${weather.wind.speed} m/s
☁️ Weather: ${weather.weather[0].description}`;

    await respond({
      text: weatherInfo
    });

  } catch (err) {
    console.error("WEATHER ERROR:");
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
    console.error("Message:", err.message);

    await respond({
      text: `Weather API error: ${
        err.response?.data?.message || err.message
      }`
    });
  }
});



app.command("/scaslack-waifu", async ({ ack, respond, command }) => {
  await ack();

  const character = command.text.trim();

  try {
    let response;

    if (!character) {
      // No character -> random SFW waifu
      response = await axios.get(
        "https://api.waifu.im/images",
        {
          params: {
            IncludedTags: "waifu",
            IsNsfw: false
          }
        }
      );
    } else {
      // Character -> convert "Marin Kitagawa" to "marin-kitagawa"
      const tag = character
        .toLowerCase()
        .replace(/\s+/g, "-");

      response = await axios.get(
        "https://api.waifu.im/images",
        {
          params: {
            IncludedTags: tag,
            IsNsfw: false
          }
        }
      );
    }

    if (!response.data.items || response.data.items.length === 0) {
      await respond({
        text: `Couldn't find "${character}" `
      });
      return;
    }

    // Pick a random image
    const randomImage =
      response.data.items[
        Math.floor(Math.random() * response.data.items.length)
      ];

    await respond({
      text: character
        ? ` ${character}\n${randomImage.url}`
        : ` Random waifu\n${randomImage.url}`
    });

  } catch (err) {

    console.error("WAIFU ERROR");
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
    console.error("Message:", err.message);

    await respond({
      text: "Failed to fetch a waifu "
    });
  }
});
  



(async () => {
  try {

    await app.start();

    console.log(" SCASLACK bot is running!");
    console.log("OpenWeather key loaded:", !!process.env.OPENWEATHER_API_KEY);
    console.log("https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=" + process.env.OPENWEATHER_API_KEY);

  } catch (err) {

    console.error("Failed to start bot:", err);

  }
})();
