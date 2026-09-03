# Scaslack
> Scaslack my own first Slack bot made for stardance 2026

# What is it?

Simply put it's a bot for slack that features diffrent commands in order to help and entertain the user 

# Commands

| commands | Description |
| --- | --- |
| /scaslack-help | shows the commands that are available |
| /scaslack-ping | Shows the latency of the bot |
| /scaslack-catfact | Gives you a random fact about cats |
| /scaslack-joke | Generates a random Joke |
| /scaslack-weather [City] | Outputs the weather of the city you have inputted |
| /scaslack-waifu [character] | Outputs a picture of the waifu (anime character) you have inputted , if you didn't then a random character will be generated |

# Code

This bot is written in **JavaScript** and uses diffrent Apis in order to complete it's commands

The bot uses:
- **Slack Bolt** — to interact with Slack
- **Axios** — to make API requests
- **OpenWeatherMap API** — for weather information
- **Waifu.im API** — for SFW anime images
- **Cat Fact API** — for cat facts
- **Official Joke API** — for random jokes
- **Hackclub Nest

# Setup

## 1st Step — Create Slack app (bot)

Go to the Slack Api app dashboard : https://api.slack.com/apps and click **Create New App -> From scratch**

Give your app (bot) a name . I called mine scaslack

Select the Slack workspace where you want to install the bot and then press **create app**

## 2nd Step — Enable Socket Mode

Click **Socket Mode** from the left sidebar

scroll down and turn **Enable Socket Mode** on
<center>
   <img width="793" height="389" alt="image" src="https://github.com/user-attachments/assets/7c0a8554-9c1c-410b-9161-b4806648446c" />
</center>


Socket Mode allows the bot to communicate with Slack using a WebSocket, meaning you don't need to host a public URL.

### Create an App level token

1.Go to **basic Information**
2.Scroll down to **App-Level Tokens**
3.Click **Generate Token and Scopes**
4.Give the token a name , for example:
`scaslack`
5.Add a the scope:
connections:write
6.click **Generate**
7.copy the token.It starts with:
xapp-

**Keep this token private**

<img width="544" height="377" alt="image" src="https://github.com/user-attachments/assets/542b7a7f-20b8-4d5a-a8e2-865135278754" />


## 3rd Step — Add Bot Permissions

Go to **OAuth & Permissions**

under **Bot Token Scopes** add:

chat:write
commands
app_mentions:read
channels:history

<img width="742" height="426" alt="image" src="https://github.com/user-attachments/assets/541730ce-a7d3-4ecb-90eb-97f65a85436c" />

These permissions allow the bot to send messages , use slash commands, read mentions and access the channel history

## 4th Step — Install the App

In  **OAuth & Permissions**

Click **Install to Workspace** and approve the requested permissions

after that you will receive a **Bot User OAuth Token**

It starts with:
xoxb-

copy it and keep it private


## 5th Step — Create the Slash Commands

Go to **Slash Commands**

Click **Create New command**

Create this commands:

| commands |
| --- |
| /scaslack-help |
| /scaslack-ping |
| /scaslack-catfact |
| /scaslack-joke |
| /scaslack-weather [City] |
| /scaslack-waifu [character] |

> read the commands section to learn what each of them does

<img width="722" height="427" alt="image" src="https://github.com/user-attachments/assets/3baf0790-855b-499e-977e-1e0943c081fc" />



## 6th Step — Create the `.env` File

In the same folder as your [JavaScript file](https://github.com/Nikolaossamaras/Scaslack/blob/main/index.js) , create a **.env** file

Put your tokens and API key's inside like this:
```text
SLACK_BOT_TOKEN=xoxb-your-token

SLACK_APP_TOKEN=xapp-your-token

OPENWEATHER_API_KEY=your-openweather-key
```
**Never share these tokens or upload your `.env` file to GitHub or any other platform**

In order for github to ignore the file you need to create a **.gitignore** file

Your **.gitignore** file must contain: 
```text
node_modules

.env
```
## 7th Step — Install the Dependencies

Open a terminal in your project folder and run:

`npm install @slack/bolt axios dotenv`

## 8th Step — Run the Bot

Start the bot with:

`node index.js`

> if you changed the javascript file name replace index with your new file name

If everything is done correctly you should see:

`⚡ SCASLACK bot is running!`
in the terminal


Your bot should now be ready to use in Slack!

# How to upload the bot to Nest
## 1st step - SSH into the server
Make sure you have a Nest account.

SSH in with your credentials. You should land as root (your prompt will look like root@username:~#).

## 2nd step - Connect to the server

paste this command to the terminal:

`ssh USER@SERVER`

you can find your USER@SERVER here:

<img width="731" height="320" alt="image" src="https://github.com/user-attachments/assets/b62f0f01-e081-499b-ab20-425d51706823" />

## 3rd step - Check Node.js

run this command to check your Node.js version

`node –version` 

if you don't have node.js installed run this command first:

`winget install OpenJS.NodeJS.LTS`

> this command install Node.js to your PC

## 4th step - Check npm

run this command to check your npm version

`npm –version`

## 5th step - Go to the bot folder

run this command in order to go to your bot folder

`cd ~/PROJECT_FOLDER`

replace PROJECT_FOLDER with the name of your folder where the files for the bot are

## 6th step - Install dependencies

run this command to install npm

`npm install`

## 7th step - Start the bot with PM2

run this command to start the bot

`pm2 start npm –name “BOT_NAME” – start`

replace BOT_Name with your bot's name

## 8th step - Check PM2

run this command to check PM2

`pm2 status`

## 9th step -Save the PM2 process list

run this command to save PM2

`pm2 save`

## 10th step - Configure PM2 to start automatically after a reboot

This will make the bot start even after the server has been rebooted

`pm2 startup`

## 11th step -  Run the command PM2 gives you

the last command should give you a command which you need to run

## 12th step - save again

`pm2 save`

# Credits

-[hackclub](https://hackclub.com) - provided with guide to make the bot

# Licence
This project is under the Mit Licence

