import * as firebase from "firebase";
import "firebase/firestore";
import axios from "axios";

export function sendNotification(type, idEstudiante) {
  // const token = getToken(idEstudiante);
  if (firebase.apps.length === 0) {
    initializeFirebase();
  }
  const db = firebase.firestore();
  db.collection("users")
    .doc(idEstudiante.toString())
    .get()
    .then((storedUser) => {
      const notificationInfo = getInfo(type);
      const userInfo = storedUser.data();
      const data = {
        notification: {
          body: notificationInfo.body,
          title: notificationInfo.title,
        },
        priority: "high",
        data: {
          click_action: "FLUTTER_NOTIFICATION_CLICK",
          id: "1",
          status: "done",
        },
        to: userInfo.deviceToken,
      };
      let config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            "key=AAAAEnoc1Vw:APA91bE9OPU53Pl0eq2iy7BFILi6TEp2RqeevvFK6lvnRTDI-ciFTluhd7Xi6QdbtBNw15qopbVt2OhcrthZG3r5WJyNzuTLa2bihbIAuDGpC3FsvQtbEYaFJ2z79uAnr8yowKBdWCzh",
        },
      };
      axios.post("https://fcm.googleapis.com/fcm/send", data, config);
    });
  //
}
export function initializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyAnViZ4eEWEsA5bptc1QFn3YKqeIPe1qyE",
    authDomain: "emt-auth-288906.firebaseapp.com",
    databaseURL: "https://emt-auth-288906.firebaseio.com",
    projectId: "emt-auth-288906",
    storageBucket: "emt-auth-288906.appspot.com",
    messagingSenderId: "79358121308",
    appId: "1:79358121308:android:75bfdba013b91efaecdd99",
  };
  firebase.initializeApp(firebaseConfig);
}
function getInfo(type) {
  const info = {};
  if (type === "appointment_created") {
    info.title = "Cita registrada";
    info.body = "Hola, tienes una cita nueva";
  }
  return info;
}
