import * as firebase from 'firebase';

let fireaseConfig = {
    apiKey: "AIzaSyAu9ryP29t_ey5zYrlyOcvFOtACY9O5KPs",
    authDomain: "projettut-3b738.firebaseapp.com",
    databaseURL: "https://projettut-3b738.firebaseio.com",
    projectId: "projettut-3b738",
    storageBucket: "projettut-3b738.appspot.com",
    messagingSenderId: "393046745449"
  };
 let app = firebase.initializeApp(fireaseConfig);

  export const bdd = app.database();