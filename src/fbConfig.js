import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const settings = { timestampsInSnapshots: true }

// Initialize Firebase
var config = {
  
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
firebase.initializeApp(config);
firebase.firestore().settings(settings)

const storage = firebase.storage();
export {
  storage, firebase as default
}
