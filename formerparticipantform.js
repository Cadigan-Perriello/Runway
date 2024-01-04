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

var picture = "";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let form = document.getElementById("formerform");

//runs the below code when form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();

//sets js variables from the form
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let inspiration = document.getElementById("inspiration");
  let year = document.getElementById("year");
  let material = document.getElementById("material");
  
  

  //creates garment object from the above variables
  addGarment(firstName, lastName, inspiration, year, material);

    form.reset();
  
}
);

//adds the garment to the firebase
export const addGarment = async function(firstName, lastName, inspiration, year, material){
  try{
    console.log("adding document");
    const docRef = await addDoc(collection(db, "runway"), {

      firstName: firstName.value,
      lastName:lastName.value,
      inspiration: inspiration.value,
      year: year.value,
      material: material.value,
      img: picture,
      isPublic: true
    });
  }
  catch(e){
    console.log("Error adding item to the database: ", e);
  }  
}

const fileInput = document.getElementById('file');

// Lister to the change event on the <input> element
    fileInput.addEventListener('change', (event) => {
    // Get the selected image file
    const imageFile = event.target.files[0];

    if (imageFile) {
        const reader = new FileReader();

        // Convert the image file to a string
        reader.readAsDataURL(imageFile);

        // FileReader will emit the load event when the data URL is ready
        // Access the string using result property inside the callback function
        reader.addEventListener('load', () => {
            // Get the data URL string
            picture = reader.result
        });
    }
});



//WIPES FIREBASE
//DO NOT RUN
// const databaseItems = await getDocs(collection(db, "runway"));
//     var garments = document.getElementById("garments");
//     garments.innerHTML="";
//     databaseItems.forEach((item) => {
//       deleteDoc(doc(db, "runway", item.id));
//     });
      