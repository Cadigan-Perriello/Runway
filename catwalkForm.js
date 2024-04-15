// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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

var catwalk = "";

let form = document.getElementById("catwalkForm");
//runs the below code when form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();
//sets js variables from the form
  let firstName = document.getElementById("firstNameC");
  let lastName = document.getElementById("lastNameC");
  let email = document.getElementById("emailC");
  let catwalk = document.getElementById("catwalk");
  let catwalkTime = document.getElementById("catwalkTime");
    if (document.getElementById("catwalkTime") != null) {
    let catwalkLink = document.getElementById("catwalkLink");
    } else {
      let catwalkLink = "";
    }
    //creates sketch object from the above variables
   addCatwalk(firstName.value, lastName.value, email.value, catwalk.value, catwalkTime.value, catwalkLink.value);
  //reset form
  form.reset();
}
);
//adds the sketch to the firebase
export const addCatwalk = async function(firstName, lastName, email, catwalk, catwalkTime, catwalkLink){
  var firstNameLocal = firstName.toLowerCase();
  var lastNameLocal = lastName.toLowerCase();
  var emailLocal = email.toLowerCase();
  console.log(firstNameLocal,lastNameLocal, emailLocal);
  try {
      var added = false;
      const q = query(collection(db, "runway"), where("isPublic", "==", false), where("firstName", "==", firstNameLocal), where("lastName", "==", lastNameLocal), where("email", "==", emailLocal));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((item) => {
                    const itemToUpdate = doc(db, "runway", item.id);
                    console.log("updating doc");
                    updateDoc(itemToUpdate, {
                      catwalk: catwalk,
                      catwalkTime: catwalkTime,
                      catwalkLink: catwalkLink
                    });
                    added = true;
      });
      console.log(added);
      if (added == false) {
        console.log("adding doc");
        const docRef = await addDoc(collection(db, "runway"), {
          firstName: firstNameLocal,
          lastName:lastNameLocal,
          email:emailLocal,
          sketch: "",
          photo25: "",
          photo50: "",
          photo75: "",
          catwalk: catwalk,
          catwalkTime: catwalkTime,
          catwalkLink: catwalkLink,
          isPublic: false
        });
        sessionStorage.clear();
      }
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

