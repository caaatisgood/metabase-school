import firebase from './firebase/init'

const getFirebaseRef = (ref: string): firebase.database.Reference =>
  firebase.database().ref(ref)

export default getFirebaseRef
