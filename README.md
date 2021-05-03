# Metabase School

## Motivation

Almost a year ago (around Jan 2020), some folks from my company ([Arc](https://arc.dev) & [Codementor](https://www.codementor.io/)), who are good at writing SQL, decided to start an entry-level SQL class for everyone. We had a few classes where everyone will listen to the SQL experts, and then go to one of our frequently used querying tool, Redash, for practice. That's how "SQL master class" started. Everything happened in the same meeting room, face-to-face, like a computer class in college.

Then COVID-19 hit, and we transitioned to a fully remote work policy. We immediately found it difficult to sustain "SQL master class" remotely. The remote tools we used (a.k.a., Zoom or Google Meet) didn't allow the SQL experts to understand everyone's learning status at any given time the way they could in a non-remote environment. Colleagues who were struggling with getting the query right couldn't get immediate help — there's just too high of a barrier to sharing queries with one another remotely.

That's how "Metabase School" was born. It's **a real-time collaborative editor, integrated with the Metabase API, which lets multiple people write, view, and execute queries together**.


## Features

- Real-time collaborative editor, made with [Firebase Realtime Database](https://firebase.google.com/docs/database), [Firepad](https://github.com/FirebaseExtended/firepad), [Monaco Editor](https://microsoft.github.io/monaco-editor/) and [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react).
- Integrated [Metabase API](https://www.metabase.com/docs/latest/api-documentation.html), which enables you to query directly from your own Metabase.

Click the image below to see a demo video: [![](https://user-images.githubusercontent.com/12913401/114265344-dc44e400-9a22-11eb-9171-a9e01fcdfdac.png)](https://user-images.githubusercontent.com/12913401/114265050-304ec900-9a21-11eb-9d6c-0e04d6f9f553.mp4)

## Requirements

- A [Metabase](https://www.metabase.com/) instance with the following API endpoints:
  - `POST` `/api/session`
  - `GET` `/api/user/current`
  - `GET` `/api/database`
  - `POST` `/api/dataset`
- Decide if you want to self-host Metabase School
  - [Not to self-host](#Not-to-self-host)
  - [Self-hosting](#Self-hosting)

### Self-hosting

Metabase School uses [Netlify](https://www.netlify.com/) & [Netlify Functions](https://www.netlify.com/products/functions/) to host the site and provide APIs that interact with your Metabase API.

As for the collaborative code editor, it leverages Firebase Realtime Database to make it work.


**Set up Firebase**

- Create a [Firebase](https://console.firebase.google.com/) project
- Go to **Project settings > Service Accounts**, hit **Generate new private key**. A JSON config file should be downloaded.
- Go to **Realtime Database**, and create your database in **locked mode**.
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
- Login with the exact credential you used for your Metabase, and you're good to go!

### Not to self-host

- Go to https://metabase-school.netlify.app/
- Put in your Metabase API host
- Login with the exact credentials you use for your Metabase, and you're good to go!


## Development

### Installation
- Clone this repo
- Install dependencies
```sh
npm i
```
- Install [Netlify CLI](https://cli.netlify.com/)
```sh
npm i -g netlify-cli
```

### Configure environment variables
- Rename `.env.development.example` to `.env.development` then update the values in it. This file is for Netlify Functions.
- Rename `.env.local.example` to `.env.local` then update the values in it. This file is for Next.js.

### Start developing

```sh
ntl dev
```
