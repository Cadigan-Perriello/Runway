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




// show Tutors from firebase in the tiles on the screen
export const showItems = async function(){
    const databaseItems = await getDocs(collection(db, "runway"));
    var annie_garments = document.getElementById("annie_garments");
      annie_garments.innerHTML="";
    databaseItems.forEach((item) => {
      if (item.data().isPublic == false) {
      if   (item.data().firstName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) || item.data().lastName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) ){ //search bar for Tutors

        var row = document.createElement("div");
           row.setAttribute('class', "row");
        var name = document.createElement("h1");
          name.innerHTML = item.data().firstName + " " + item.data().lastName.substring(0,1);
          name.for = item.id;
         row.appendChild(name);
        
        row.appendChild(document.createElement("br"));

        var sketch  = document.createElement("div");
          sketch.setAttribute('class', "tile");
        sketch.innerHTML = "Sketch:";
        if (item.data().sketch != "" ) {
          sketch.src = item.data().sketch;
        }
        row.appendChild(sketch);
        row.appendChild(document.createElement("br"));
        
        var twenty_five  = document.createElement("div");
          twenty_five.setAttribute('class', "tile");
        twenty_five.innerHTML = "25% deadline photo:";
        if (item.data().photo25 != "" ) {
          twenty_five.src = item.data().photo25;
        }
        row.appendChild(twenty_five);
        row.appendChild(document.createElement("br"));

        var fifty  = document.createElement("div");
        fifty.setAttribute('class', "tile");
        fifty.innerHTML = "50% deadline photo:";
        if (item.data().photo50 != "" ) {
          fifty.src = item.data().photo50;
        }
        row.appendChild(fifty);
        row.appendChild(document.createElement("br"));

        var seventy_five  = document.createElement("div");
        seventy_five.setAttribute('class', "tile");

        seventy_five.innerHTML = "75% deadline photo:";
        if (item.data().photo75 != "" ) {
          seventy_five.src = item.data().photo75;
        }
        row.appendChild(seventy_five);
        row.appendChild(document.createElement("br"));


        // var final_row = document.createElement("div");
        // if (item.data().finalPhoto != "" ) {
        //  var final  = document.createElement("p");
        //  final.innerHTML = "Final photo:";
         
        //    final.src = item.data().finalPhoto;
         
        //    final_row.appendChild(final);
        //    final_row.appendChild(document.createElement("br"));
        //    garments.appendChild(final_row)
           
        //  }
       
        annie_garments.appendChild(row);
        
            }
      }
    })
}




