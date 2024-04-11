// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

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
const storage = getStorage(app);

var photo50 = "";

let form = document.getElementById("50form");
//runs the below code when form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();
//sets js variables from the form
  let firstName = document.getElementById("firstName50");
  var d = new Date();
  let lastName = document.getElementById("lastName50");
  let email = document.getElementById("email50");
  //creates sketch object from the above variables
   add50(firstName.value, lastName.value, email.value, photo50, d.toString());
  //reset form
  form.reset();
  let previewimg = document.getElementById("photo50img");
  previewimg.style.display = "none";
}
);
//adds the sketch to the firebase
export const add50 = async function(firstName, lastName, email, photo50, date){

  const q = query(collection(db, "runway"), where("date", "==", null), where("isPublic", "==", false), where("firstName".toLowerCase(), "==", firstName.toLowerCase()), where("lastName".toLowerCase(), "==", lastName.toLowerCase()), where("email".toLowerCase(), "==", email.toLowerCase()));
  const querySnapshot = await getDocs(q);
  try {
      var added = false;
      querySnapshot.forEach((item) => {
        if (item.id != "password" && item.id != "admin-password"  ){
                    const itemToUpdate = doc(db, "runway", item.id);
                    console.log("updating doc");
                    updateDoc(itemToUpdate, {
                      photo50: photo50,
                      fiftyDate : date
                    });
                    console.log("hello");
                    added = true;
      }
      });
      console.log(added);
      if (added == false) {
        console.log("adding doc");
        const docRef = await addDoc(collection(db, "runway"), {
          firstName: firstName,
          lastName:lastName,
          email:email,
          sketch: "",
          photo25: "",
          fiftyDate : date,
          photo50: photo50,
          photo75: "",
          catwalk: "",
          isPublic: false
        });
      }
  }
  catch(e){
    console.log("Error adding item to the database: ", e);
  }  
}

const fileInput = document.getElementById('photo50');

fileInput.addEventListener('change', (event) => {
 // Get the selected image file
 const imageFile = event.target.files[0];
 if (imageFile) {
   document.getElementById('submit50').setAttribute('disabled', 'true');
   storeFile(imageFile);
 }
});


async function storeFile(file) {
         var name = "50photo" + Date.now();
         console.log(name);
         var storageRef = ref(storage, name);
         await uploadBytes(storageRef, file).then((snapshot) => {
           console.log("file uploaded");
         });
           var test = await getUrl(storageRef);
           console.log(test);
           photo50 = test;
           document.getElementById("submit50").disabled = false;
     }


 async function getUrl(storageRef){
   return await getDownloadURL(storageRef);
 }



// // Lister to the change event on the <input> element
//     fileInput.addEventListener('change', (event) => {
//     // Get the selected image file
//     const imageFile = event.target.files[0];
//     if (imageFile) {
//         const reader = new FileReader();
//         // Convert the image file to a string
//         reader.readAsDataURL(imageFile);
//         // FileReader will emit the load event when the data URL is ready
//         // Access the string using result property inside the callback function
//         reader.addEventListener('load', () => {
//             // Get the data URL string
//             photo25 = reader.result
//         });
//     }
// });



//WIPES FIREBASE
//DO NOT RUN
// const databaseItems = await getDocs(collection(db, "runway"));
//     var garments = document.getElementById("garments");
//     garments.innerHTML="";
//     databaseItems.forEach((item) => {
//       deleteDoc(doc(db, "runway", item.id));
//     });

