
  import firebase from 'firebase'
  import 'firebase/firestore'
  
  
  const firebaseConfig = {
    apiKey: "AIzaSyCaM8JHLcvQ3YlrM3DUZNBo_rkSV2PK46o",
    authDomain: "tiburones-ca4a5.firebaseapp.com",
    databaseURL: "https://tiburones-ca4a5.firebaseio.com",
    projectId: "tiburones-ca4a5",
    storageBucket: "tiburones-ca4a5.appspot.com",
    messagingSenderId: "660577640788",
    appId: "1:660577640788:web:dacf18d8f00dc23732e8c1",
    measurementId: "G-2WYG1B8R8B"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();



  export{firebase}