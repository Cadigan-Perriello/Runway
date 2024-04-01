// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDLCmQ9Wv-VJcczaPZlSKSDA-rYbxtDyt4",
  authDomain: "runway-3afab.firebaseapp.com",
  projectId: "runway-3afab",
  storageBucket: "runway-3afab.appspot.com",
  messagingSenderId: "397910373324",
  appId: "1:397910373324:web:b20e7f879fa8cfd9c3a369"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let sketch = document.getElementById("sketch");
let twenty_five = document.getElementById("photo25");
let fifty = document.getElementById("photo50");
let seventy_five = document.getElementById("photo75");

  sketch.addEventListener('change', function () {
    displayPicture(this);
  });
  twenty_five.addEventListener('change', function () {
    displayPicture(this);
  });
  fifty.addEventListener('change', function () {
    displayPicture(this);
  });
  seventy_five.addEventListener('change', function () {
    displayPicture(this);
  });

 function displayPicture(input) {
    if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById(input.id + 'img').setAttribute('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
    localStorage.clear();
  }
 }
