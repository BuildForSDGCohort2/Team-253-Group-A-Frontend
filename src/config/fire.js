import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBtZUiDNaq9gbwzrivzSis85ubbPBxJ4Do",
  authDomain: "test2-cb2e1.firebaseapp.com",
  databaseURL: "https://test2-cb2e1.firebaseio.com",
  projectId: "test2-cb2e1",
  storageBucket: "test2-cb2e1.appspot.com",
  messagingSenderId: "217166646094",
  appId: "1:217166646094:web:b75fd4efe572d163d86c1f"
};
// Initialize Firebase

const fire = firebase.initializeApp(firebaseConfig);

export default fire;