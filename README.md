# Rapyd starlliner:backend

## Introduction

This is a backend relay API made for [Rapyd starliner app](https://github.com/8mn/rapyd-space-tour). It uses firebase(firestore) for database and makes request to rapyd API on behalf of client.


## Getting Started

- To get started, [git clone](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-clone) this repository onto your machine and open the working directory:
- Install the dependencies using `npm install`


```
git clone https://github.com/8mn/rapyd-backend-relay.git
cd rapyd-backend-relay
npm install
```

## Adding environment variables


1. If you haven't already, create your [Rapyd Client Portal](https://dashboard.rapyd.net/sign-up) account so you can access everything you need to get started.
2. Head over to Rapyd. From your sandbox account in the Rapyd Client Portal, locate your Secret key and Access key. You can find these by selecting 'Developers' from the left navigation. 
3. Copy and paste your access and secret key as shown below.

---

-  Spin up a new [Firebase](https://firebase.google.com/) project and download service account keys.
-  Follow the steps mentioned [here](https://stackoverflow.com/a/61844642) to convert your firebase service account to base 64 string

---

- `APP_URI` is url of the app when you deployed it, it is required for verifying signature sent by Rapyd webhook.
- If you want to use it locally, Follow this [article](https://medium.com/@BearerSH/consuming-webhooks-with-node-js-and-express-50e007fc7ae2) and use [ngrok](https://ngrok.com/).
- the url will of the form `THIS_APP_URL/hook`


- Rename the `.env.example` to `.env` and insert the above credentials like so:

```
ACCESS_KEY="YOUR_RAPYD_ACCESS_KEY"
SECRET_KEY="YOUR_RAPYD_SECRET_KEY"
APP_URI=""
GOOGLE_CONFIG_BASE64=""

```

## Running the App


```
npm run start
```

the web server will now be accessible at https://localhost:5000

## Contact

If you have any questions/suggestions, Contact me 
- My Email: `hey@mnsh.me`
- Twitter: [@oimanish](https://twitter.com/oimanish)