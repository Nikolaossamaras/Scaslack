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
          "/scaslack-help - Display this help message."
  });
});