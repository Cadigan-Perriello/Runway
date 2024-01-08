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

let form = document.getElementById("50form");
let sketch = document.getElementByID("sketch");
let twenty_five = document.getElementByID("photo25");
let fifty = document.getElementByID("photo50");
let seventy_five = document.getElementByID("photo75");

  sketch.addEventListener('change', function () {
    displayPicture(this, sketch);
  });
  twenty_five.addEventListener('change', function () {
    displayPicture(this, photo25);
  });
  fifty.addEventListener('change', function () {
    displayPicture(this, photo50);
  });
  seventy_five.addEventListener('change', function () {
    displayPicture(this, photo75);
  });

 function displayPicture(input, image) {
    if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById('image').setAttribute('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
 //  }
 // }
