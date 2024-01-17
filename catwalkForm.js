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

let form = document.getElementById("catwalkForm");
//runs the below code when form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();
//sets js variables from the form
  let firstName = document.getElementById("firstNameC");
  let lastName = document.getElementById("lastNameC");
  let email = document.getElementById("emailC");
  let catwalk = document.getElementById("catwalkC");
  //creates catwalk object from the above variables
  addCatwalk(firstName, lastName, catwalk);
  //reset inputs in form
  form.reset();
}
);
//adds the catwalk song to the firebase
export const addCatwalk = async function(firstName, lastName, email, catwalk){
  try{
    console.log("adding document");
    const docRef = await addDoc(collection(db, "runway"), {
      firstName: firstName.value,
      lastName:lastName.value,
      email: email.value,
      catwalk: catwalk.value,
      isPublic: false
    });
  }
  catch(e){
    console.log("Error adding item to the database: ", e);
  }  
}


//WIPES FIREBASE
//DO NOT RUN
// const databaseItems = await getDocs(collection(db, "runway"));
//     var garments = document.getElementById("garments");
//     garments.innerHTML="";
//     databaseItems.forEach((item) => {
//       deleteDoc(doc(db, "runway", item.id));
//     });

