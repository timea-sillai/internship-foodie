import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export async function signUp(name: string, email: string, password: string) {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async response => {
      const userId = await response.user.getIdToken();
      firestore().collection('Users').doc(userId).set({
        name,
        userId
      });
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
  await auth().signInWithEmailAndPassword(email, password);
}
