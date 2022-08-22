import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDqfwsnzDF1CpZ9zIn5laQ-GFjFKIdCA98',
  authDomain: 'foodie-12003.firebaseapp.com',
  databaseURL: 'https://foodie-12003.firebaseio.com',
  projectId: 'foodie-12003',
  storageBucket: 'foodie-12003.appspot.com',
  appId: '1:956141990178:ios:c32b4d3b09210e6241f57b'
};

const config = {
  name: 'foodie'
};

await firebase.initializeApp(firebaseConfig, config);
