# Metabase School

## Motivation

Almost a year ago (around Jan, 2020), some folks in our company who are good at writing SQL, decided to start an entry-level SQL class for everyone. We had a few classes where everyone will listen to the SQL experts, and then go to one of our frequently used querying tool - Redash, for practice. That's how "SQL master class" started. Everything happened in the same meeting room, face to face, like a computer class in college.

Then COVID-19 hits. The fully remote working policy develops. We immediately found it difficult to sustain the "SQL master class" remotely. Because, among the remote meeting tools we used at that time (a.k.a., Zoom or Google Meet), none of them enable the SQL experts to understand everyone's learning status at any time like the way it worked in non-remote circumstance. Any colleges who may struggle with getting the query right, won't be able to get immediate help because there're much more barriers to share queries with one another.

That's why "Metabase School" comes into play. It's **a realtime collaborative editor, integrated with Metabase API, which can let you write or see others' query and execute it to get the result**.


## Features

- Realtime collaborative editor, made with [Firebase Realtime Database](https://firebase.google.com/docs/database), [Firepad](https://github.com/FirebaseExtended/firepad), [Monaco Editor](https://microsoft.github.io/monaco-editor/) and [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react).
- [Metabase API](https://www.metabase.com/docs/latest/api-documentation.html) integrated, which enable you to query directly from your own Metabase.


## Requirements

- A [Metabase](https://www.metabase.com/) with following API endpoints available:
  - `POST` `/api/session`
  - `GET` `/api/user/current`
  - `GET` `/api/database`
  - `POST` `/api/dataset`
- Decide if you want to self-host Metabase School
  - [not to self-host](#Not-to-self-host)
  - [self-hosting](#Self-hosting)

### Self-hosting

Metabase School uses Netlify & Netlify Functions to host the site itself and provide APIs that interact with your Metabase API.

As to the collaborative code editor, it leveraged Firebase Realtime Database to make it work.


**Set up Firebase**

- Create a [Firebase](https://console.firebase.google.com/) project
- Go to **Project settings > Service Accounts**, hit **Generate new private key**. A JSON config file should be downloaded.
- Go to **Realtime Database**, create your database in **locked mode**.
- In **Realtime Database > Rules > Edit**, replace it with:
```json
{
  "rules": {
    "classrooms": {
      ".read": "auth.admin_username === 'YOUR_HARD_CODED_USERNAME'",
      ".write": "auth.admin_username === 'YOUR_HARD_CODED_USERNAME'"
    }
  }
}
```

**Set up Netlify**

- Fork this repository and [deploy it to Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/)
- Configure environment variables in **Site settings > Build & deploy > Environment** (see example below) then redeploy.
```sh
# Replace them with values in the JSON config file (from Firebase)
FB_SERVICE_ACCOUNT_TYPE=<YOUR_SERVICE_ACCOUNT_TYPE>
FB_SERVICE_ACCOUNT_PROJECT_ID=<YOUR_SERVICE_ACCOUNT_PROJECT_ID>
FB_SERVICE_ACCOUNT_PRIVATE_KEY_ID=<YOUR_SERVICE_ACCOUNT_PRIVATE_KEY_ID>
FB_SERVICE_ACCOUNT_PRIVATE_KEY=<YOUR_SERVICE_ACCOUNT_PRIVATE_KEY>
FB_SERVICE_ACCOUNT_CLIENT_EMAIL=<YOUR_SERVICE_ACCOUNT_CLIENT_EMAIL>
FB_SERVICE_ACCOUNT_CLIENT_ID=<YOUR_SERVICE_ACCOUNT_CLIENT_ID>
FB_SERVICE_ACCOUNT_AUTH_URI=<YOUR_SERVICE_ACCOUNT_AUTH_URI>
FB_SERVICE_ACCOUNT_TOKEN_URI=<YOUR_SERVICE_ACCOUNT_TOKEN_URI>
FB_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL=<YOUR_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL>
FB_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL=<YOUR_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL>

# The value should be the same as the one in your Realtime Database Rules
ADMIN_USERNAME=<YOUR_HARD_CODED_USERNAME>

# Values can be found in your Firebase project settings
FB_DATABASE_URL=<YOUR_FIREBASE_DATABASE_URL>
NEXT_PUBLIC_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
NEXT_PUBLIC_FIREBASE_PROJECT_NAME=<YOUR_FIREBASE_PROJECT_NAME>
NEXT_PUBLIC_FIREBASE_DATABASE_URL=<YOUR_FIREBASE_DATABASE_URL>

# Your Metabase API host
NEXT_PUBLIC_METABASE_API_HOST=<YOUR_METABASE_API_HOST>
```
- Visit your Netlify app
- Login with the exact credential you used for your Metabase
- You're good to go

### Not to self-host

- Go to https://metabase-school.netlify.app/
- Put in your Metabase API host
- Login with the exact credential you used for your Metabase
- You're good to go


## Development

### Installation
- clone this repo
- install dependencies
```sh
npm i
```
- install [Netlify CLI](https://cli.netlify.com/)
```sh
npm i -g netlify-cli
```

### Configure environment variables
- Rename `.env.development.example` to `.env.development` then update the values in it. This file is for Netlify Functions.
- Rename `.env.local.example` to `.env.local` then update the values in it. This file is for Next.js.

### Start developing

```sh
npm run dev
```
