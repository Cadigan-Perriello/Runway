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
//create form
let form = document.getElementById("50form");
//runs the below code when form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();
//sets js variables from the form
  let firstName = document.getElementById("firstName50");
  var d = new Date();
  let lastName = document.getElementById("lastName50");
  let email = document.getElementById("email50");
  //run function that adds above variables to the firebase
   add50(firstName.value, lastName.value, email.value, photo50, d.toString());
  //reset form so information clears after submission
  form.reset();
  //set picture that shows up under form
  let previewimg = document.getElementById("photo50img");
  previewimg.style.display = "none";
}
);
//adds the image to the firebase
export const add50 = async function(firstName, lastName, email, photo50, date){
 var firstNameLocal = firstName.toLowerCase();
  var lastNameLocal = lastName.toLowerCase();
  var emailLocal = email.toLowerCase();
  try {
      var added = false;
      //query for name and email that match will the submitted form  
      const q = query(collection(db, "runway"), where("isPublic", "==", false), where("firstName", "==", firstNameLocal), where("lastName", "==", lastNameLocal), where("email", "==", emailLocal));
      const querySnapshot = await getDocs(q);
      //if there's a match, update the firebase document with the new 50% photo and date
      querySnapshot.forEach((item) => {
          const itemToUpdate = doc(db, "runway", item.id);
                    updateDoc(itemToUpdate, {
                      photo50: photo50,
                      fiftyDate : date
                    });
                    added = true;
      });
      //if query returns no match (no matching name and email in the firebase), add a new document to the firebase with the submitted name, email, 50 image, and submission date
      if (added == false) {
        console.log("adding doc");
        const docRef = await addDoc(collection(db, "runway"), {
          firstName: firstNameLocal,
          lastName:lastNameLocal,
          email:emailLocal,
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

//when a photo is uploaded on the 50 form
 fileInput.addEventListener('change', (event) => {
  // Get the selected image file and disable the submit button, so they can't submit the form until the photo is uploaded to firestore
  const imageFile = event.target.files[0];
  if (imageFile) {
    document.getElementById('submit50').setAttribute('disabled', 'true');
    //run function that uploads image to Firebase
    storeFile(imageFile);
  }
});

//create unique name for the image, store it in Firestore, and get URL that will be uploaded to the Firebase
async function storeFile(file) {
         var name = "50photo" + Date.now();
         var storageRef = ref(storage, name);
         await uploadBytes(storageRef, file).then((snapshot) => {
           console.log("file uploaded");
         });
           var photoURL = await getUrl(storageRef);
           photo50 = photoURL;
           document.getElementById("submit50").disabled = false;
     }

//return the URL to the image stored in Firestore
 async function getUrl(storageRef){
   return await getDownloadURL(storageRef);
 }
