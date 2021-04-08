# Metabase School

## Motivation

Almost a year ago (around Jan, 2020), some folks in our company who are good at writing SQL, decided to start an entry-level SQL class for everyone. We had a few classes where everyone will listen to the SQL experts, and then go to one of our frequently used querying tool - Redash, for practice. That's how "SQL master class" started. Everything happened in the same meeting room, face to face, like a computer class in college.

Then COVID-19 hits. The fully remote working policy develops. We immediately found it difficult to sustain the "SQL master class" remotely. Because, among the remote meeting tools we used at that time (a.k.a., Zoom or Google Meet), none of them enable the SQL experts to understand everyone's learning status at any time like the way it worked in non-remote circumstance. Any colleges who may struggle with getting the query right, won't be able to get immediate help because there're much more barriers to share queries with one another.

That's why "Metabase School" comes into play. It's **a realtime collaborative editor, integrated with Metabase API, which can let you write or see others' query and execute it to get the result**.


## Features

- Realtime collaborative editor, made with [Firebase Realtime Database](https://firebase.google.com/docs/database), [Firepad](https://github.com/FirebaseExtended/firepad), [Monaco Editor](https://microsoft.github.io/monaco-editor/) and [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react).
- Metabase API integrated, which enable you to query directly from your own Metabase.


## Requirements

- A [Metabase](https://www.metabase.com/) with following API endpoints available:
  - `POST` `/api/session`
  - `GET` `/api/user/current`
  - `GET` `/api/database`
  - `POST` `/api/dataset`
- Decide if you want to self-host Metabase School
  - [self-hosting](#Self-hosting)
  - [not to self-host](#Not-to-self-host)

### Self-hosting

- set up Firebase
- set up Netlify

### Not to self-host

go to https://metabase-school.netlify.app/


## Development

install [Netlify CLI](https://cli.netlify.com/)
