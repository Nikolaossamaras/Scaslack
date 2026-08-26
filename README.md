# Scaslack
> Scaslack my own first Slack bot made for stardance 2026

# What is it?

Simply put it's a bot for slack that features diffrent commands in order to help and entertain the user 

# Commands

| Command | Description |
| --- | --- |
| `/scaslack-ping` | Check the bot's latency |
| `/scaslack-help` | Show all available commands |
| `/scaslack-catfact` | Get a random cat fact |
| `/scaslack-joke` | Get a random joke |
| `/scaslack-weather [city]` | Get the current weather for a city |
| `/scaslack-waifu [character]` | Get a random SFW anime image |

# Code

This bot is written in **JavaScript** and uses diffrent Apis in order to complete it's commands

The bot uses:
- **Slack Bolt** — to interact with Slack
- **Axios** — to make API requests
- **OpenWeatherMap API** — for weather information
- **Waifu.im API** — for SFW anime images
- **Cat Fact API** — for cat facts
- **Official Joke API** — for random jokes

# Setup

## 1st Step — Create the Slack App

Go to the Slack Apps dashboard: https://api.slack.com/apps and click **Create New App → From scratch**.

Give your app a name. I called mine **scaslack**.

Select the Slack workspace where you want to install the bot, then click **Create App**.

## 2nd Step — Enable Socket Mode

Open **Socket Mode** from the left sidebar.

Turn **Enable Socket Mode** on.

Socket Mode allows the bot to communicate with Slack using a WebSocket, meaning you don't need to host a public URL.

### Create an App-Level Token

1. Go to **Basic Information**.
2. Scroll down to **App-Level Tokens**.
3. Click **Generate Token and Scopes**.
4. Give the token a name, for example:
   `scaslack-socket`
5. Add the scope:
   connections:write
6. Click **Generate**.
7. Copy the token. It starts with:
   xapp-

Keep this token private.

## 3rd Step — Add Bot Permissions

Go to **OAuth & Permissions**.

Under **Bot Token Scopes**, add:

chat:write
commands
app_mentions:read
channels:history

These permissions allow the bot to send messages, use slash commands, read mentions, and access channel messages.

## 4th Step — Install the App

Go back to **OAuth & Permissions**.

Click **Install to Workspace** and approve the requested permissions.

After installing, you will receive a **Bot User OAuth Token**.

It starts with:

xoxb-

Copy it and keep it private.

## 5th Step — Create the Slash Commands

Go to **Slash Commands** in the left sidebar.

Click **Create New Command**.

Create these commands:

Command | Description
/scaslack-ping | Check bot latency
/scaslack-help | Show available commands
/scaslack-catfact | Get a random cat fact
/scaslack-joke | Get a random joke
/scaslack-weather | Get weather information
/scaslack-waifu | Get a random SFW anime image

For the weather command, the user can enter a city after the command:

/scaslack-weather Athens

For the waifu command, they can optionally enter a character:

/scaslack-waifu Marin Kitagawa

Or just:

/scaslack-waifu

to get a random SFW anime image.

## 6th Step — Create the `.env` File

In the same folder as your JavaScript file, create a file called:

.env

Put your tokens and API key inside:

SLACK_BOT_TOKEN=xoxb-your-token
SLACK_APP_TOKEN=xapp-your-token
OPENWEATHER_API_KEY=your-openweather-key

**Never share these tokens or upload your `.env` file to GitHub.**

Your `.gitignore` should contain:

.env
node_modules/

## 7th Step — Install the Dependencies

Open a terminal in your project folder and run:

npm install @slack/bolt axios dotenv

## 8th Step — Run the Bot

Start the bot with:

node index.js

If everything is configured correctly, you should see:

⚡ SCASLACK bot is running!

Your bot should now be ready to use in Slack!

# Credits

-[hackclub](https://hackclub.com) - orovided with guide to make the bot

# Licence
This project is under the Mit Licence

