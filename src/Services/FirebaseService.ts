import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'UserIdToken';

const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.log('Error: failed saving data!');
  }
};

export async function signUp(name: string, email: string, password: string) {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async response => {
      const token = await response.user.getIdToken();
      firestore().collection('Users').doc(token).set({
        name,
        token
      });
      storeToken(token);
    })
    .catch(error => {
      if (error.code === 'auth/email-already-exists') {
        Alert.alert('SignUp', 'That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert('SignUp', 'That email address is invalid!');
      }
      console.error(error);
    });
}

export async function signIn(email: string, password: string) {
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(async response => {
      const token = await response.user.getIdToken();
      firestore().collection('Users').doc(token).update({
        token
      });
      storeToken(token);
    });
}

export async function checkIdToken() {
  const user = auth().currentUser;
  const userIdToken = await user.getIdToken();
  const savedToken = await AsyncStorage.getItem(TOKEN_KEY);
  return userIdToken === savedToken;
}
