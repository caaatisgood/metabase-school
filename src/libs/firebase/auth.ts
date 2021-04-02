import firebase from './init'

export const signIn = async (token: string) => {
  firebase.auth().signInWithCustomToken(token)
}
