import firebase from "gatsby-plugin-firebase"

export async function Login(username: string, password: string) {
  const user = await firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
  return user
}

export async function SignUp(username: string, password: string) {
  const user = await firebase
    .auth()
    .createUserWithEmailAndPassword(username, password)
  return user
}

export async function Logout() {
  const user = firebase.auth().signOut()
  return user
}
