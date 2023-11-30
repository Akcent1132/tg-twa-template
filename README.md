
# Telegram mini app example 

Example Telegram Web Aplication for develop

## First steps

#### Creating application in Telegram BotFather

As long as technically, TWA applications are connected with Telegram bots, we should firstly create
a Telegram bot. To do this, you need to find the father of all
bots, the bot [BotFather](https://t.me/botfather) and use the command
`/newbot`, then go through the proposed process, specifying all the necessary data.

When the bot is created, it is required then to use the command `/newapp` and again go
through the procedure of creating another entity - the Telegram Mini Apps application,
linking it to the Telegram bot. From now on, the created application will
be available via a direct link of the form `https://t.me/{mybot}/{myapp}`.

```yaml
# .env
PORT=8080
BOT_TOKEN=
```
#### To install this boilerplate you need to run following commands
<br>

Clone the repository :

```bash
git clone https://github.com/Akcent1132/tg-twa-tmeplate
```

<br>

Install dependencies using Yarn or NPM or PNPM :

```bash
npm i
```
Run client app

```bash
npm start
```
<br />

#### Required steps
  valid `https` link is required

#### Localtunnel

[Localtunnel](https://github.com/localtunnel/localtunnel )  technology service that provide
 valid `https` link is required

```bash title="Example of getting a link"
lt --port 8080 
# your url is: https://web-apps-test.loca.lt
```

for first time , open link and paste your ip adress 

The main problem of this project is disabling the tunnel in case
the development server has been disabled.


#### vk-tunnel

stable technology service but in this case  [vk.com](https://vk.com/) auth required ( just sing up if you haven't account, its free and easy)

```bash title="Example of getting a link"
npm run tunnel 
# your url is: https://web-apps-test.loca.vk-some.com
```

#### Ngrok

Many newcomers to development may often have a question about how
easy it is to get a temporary URL for development that works on the `https` protocol
and has a valid SSL certificate. The solution to this problem is quite simple and common, developers
can use such a service as [ngrok](https://ngrok.com/). It has low development limits and allows you
to create applications comfortably.

Imagine that the application being developed is currently running at
`localhost:8080'. Then in order to open a tunnel to this
application, you need to use the following command:

```bash title="Example of getting a link"
ngrok http 8080
```

## tunnel service and client app should be run on same port (8080 in our case)
<br />

## Backend bot 

```shell
# create folder
mkdir my-bot

# enter folder
cd my-bot

# install Telegraf
npm install telegraf

# install typescript as a dev-dependency (optional, but recommended)
npm install --dev typescript

# initialise a typescript config
npx tsc --init

# create index.js or .ts file in root path 
touch index.js
```

```TS (Node)

import { Telegraf , Markup ,Telegram } from "telegraf";
//const { Telegraf , Markup ,Telegram } = require('telegraf');  try it if by import doesn't work

const { BOT_TOKEN } = process.env;
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');

const bot = new Telegraf(BOT_TOKEN); // or paste manual bot token
const api = new Telegram(BOT_TOKEN);

let nodePath = process.argv[0];
let appPath = process.argv[1];
let tagParam = process.argv[2];
let httpsTunnelUrl = process.argv[3];

let WEB_APP_URL = ""; // or paste url manual
if(tagParam === '--link' && WEB_APP_URL === "")  WEB_APP_URL = httpsTunnelUrl;

bot.on("/start", (ctx, next) => {
	return Promise.all([
		ctx.reply(
		"Launch mini app from keyboard!",
		Markup.keyboard([Markup.button.webApp("Launch", WEB_APP_URL)]).resize(),
	),
		next(),
	]);
});
bot.on("text", (ctx, next) => {
	return Promise.all([
		ctx.reply(
		"Launch mini app from keyboard!",
		Markup.keyboard([Markup.button.webApp("Launch", WEB_APP_URL)]).resize(),
	),
		next(),
	]);
});

api.getMe().then((data)=>{
console.log('link of your bot');
console.log('https://t.me/'+ data.username);
});

bot.launch();
```

To start your bot, run the following:

```shell
# Compile first, if you're using TS
npx tsc

# Run the bot
node index.js --link https_tunnel_url(from localtunnel or ngork)
```
Also you can do without domain and https if create telegram test account [Instruction manual](https://docs.telegram-mini-apps.com/docs/test-environment)

# License

The MIT License (MIT)

Copyright (c) 2023 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
