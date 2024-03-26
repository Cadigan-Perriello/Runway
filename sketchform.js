// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
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

var sketch = "";

let form = document.getElementById("sketchForm");
//runs the below code when form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();
//sets js variables from the form
  let firstName = document.getElementById("firstNameS");
  let lastName = document.getElementById("lastNameS");
  let email = document.getElementById("emailS");
  //creates sketch object from the above variables
   addSketch(firstName.value, lastName.value, email.value, sketch);
  //reset form
  form.reset();
  let previewimg = document.getElementById("sketchimg");
  previewimg.style.display = "none";
}
);
//adds the sketch to the firebase
export const addSketch = async function(firstName, lastName, email, sketch){

  const databaseItems = await getDocs(collection(db, "runway"));
  try {
      var added = false;
      databaseItems.forEach((item) => {
        console.log(item.id);
        if (item.id != "password" && item.id != "admin-password"  
            && !item.id.includes("Date")){
                if (item.data().isPublic == false) {
                  console.log(item.data().lastName.toLowerCase(), item.data().firstName.toLowerCase(), item.data().email.toLowerCase());
                  console.log(lastName.toLowerCase(), firstName.toLowerCase(), email.toLowerCase());
                  if (item.data().firstName.toLowerCase().includes(firstName.toLowerCase()) &&
                item.data().lastName.toLowerCase().includes(lastName.toLowerCase()) &&     
                item.data().email.toLowerCase().includes(email.toLowerCase())){
                    const itemToUpdate = doc(db, "runway", item.id);
                    console.log("updating doc");
                    updateDoc(itemToUpdate, {
                      sketch: sketch
                    });
                    added = true;
        }
      }
      }
      });
      console.log(added);
      if (added == false) {
        console.log("adding doc");
        const docRef = await addDoc(collection(db, "runway"), {
          firstName: firstName,
          lastName:lastName,
          email:email,
          sketch: sketch,
          photo25: "",
          photo50: "",
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

// const fileInput = document.getElementById('sketch');

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
//             sketch = reader.result
//         });
//     }
// });

const fileInput = document.getElementById('sketch');

// Lister to the change event on the <input> element
fileInput.addEventListener('change', (event) => {
  // Get the selected image file
  const imageFile = event.target.files[0];
  if (imageFile) {
    document.getElementById('submitSketch').setAttribute('disabled', 'true');
    storeFile(imageFile);
  }
});

 async function storeFile(file) {
          var name = "sketch" + Date.now();
          console.log(name);
          var storageRef = ref(storage, name);
          await uploadBytes(storageRef, file).then((snapshot) => {
            console.log("file uploaded");
          });
            var test = await getUrl(storageRef);
            console.log(test);
            sketch = test;
            document.getElementById("submitSketch").disabled = false;
      }

  async function getUrl(storageRef){
    return await getDownloadURL(storageRef);
  }


//WIPES FIREBASE
//DO NOT RUN
// const databaseItems = await getDocs(collection(db, "runway"));
//     var garments = document.getElementById("garments");
//     garments.innerHTML="";
//     databaseItems.forEach((item) => {
//       deleteDoc(doc(db, "runway", item.id));
//     });

