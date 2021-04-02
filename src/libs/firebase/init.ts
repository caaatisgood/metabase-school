import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import config from '../../config'
import { window } from '../../libs/global'

let initialized = false

if (!initialized && window) {
  window.firebase = firebase
  firebase.initializeApp({
    apiKey: config.firebaseApiKey,
    databaseURL: config.firebaseDatabaseUrl,
    projectId: config.firebaseProjectName,
  })
  initialized = true
}

export default firebase
