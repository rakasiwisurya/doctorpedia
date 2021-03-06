// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initializeApp} from 'firebase/app';
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';
// import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCluBPBb8xEnD6n8yrD3M2xmEuw3v_6mQ8',
  authDomain: 'doctorpedia-adad7.firebaseapp.com',
  projectId: 'doctorpedia-adad7',
  storageBucket: 'doctorpedia-adad7.appspot.com',
  messagingSenderId: '611098833886',
  appId: '1:611098833886:web:b7d498eef2acdf9b22a34f',
  measurementId: 'G-DT3KEV1K32',
  databaseURL:
    'https://doctorpedia-adad7-default-rtdb.asia-southeast1.firebasedatabase.app',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const firebaseAnalytics = getAnalytics(firebaseApp);

initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export {firebaseApp};
