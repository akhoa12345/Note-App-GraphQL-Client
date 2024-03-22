// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDFNxmj705I7o0aCAPoJu1EO8uYipLyY9I',
  authDomain: 'note-app-2f998.firebaseapp.com',
  projectId: 'note-app-2f998',
  storageBucket: 'note-app-2f998.appspot.com',
  messagingSenderId: '901165432542',
  appId: '1:901165432542:web:3dc984b0c81e44885bcc4f',
  measurementId: 'G-RSGR2DLEVN'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
