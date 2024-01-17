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




// show Participants from firebase in the tiles on the screen
export const showItems = async function(){
    const databaseItems = await getDocs(collection(db, "runway"));
    var annie_garments = document.getElementById("annie_garments");
      annie_garments.innerHTML="";
    databaseItems.forEach((item) => {
      if (item.data().isPublic == false) {
      if   (item.data().firstName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) || item.data().lastName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) ){ //search bar for Tutors
        
//creates a new div for the row containing the name. We then added the name to the innerHTML of the div. 
        
        var row = document.createElement("div");
           row.setAttribute('class', "row");
        var info = document.createElement("div");
        info.setAttribute('class', "tile");
        var name = document.createElement("h1");
        var email = document.createElement("a");
          email.innerHTML = item.data().email;
        email.for = item.id;
        var catwalkLabel = document.createElement("p");
          catwalkLabel.innerHTML = "Catwalk Song:";
        var catwalk = document.createElement("p");
          catwalk.innerHTML = item.data().catwalk;
        catwalk.for = item.id;
          name.innerHTML = item.data().firstName + " " + item.data().lastName.substring(0,1) + "  ";
          name.for = item.id;
         info.appendChild(name);
        info.appendChild(email);
        info.appendChild(catwalkLabel);
        info.appendChild(catwalk);
        row.appendChild(info);

        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the sketch. We then check if there is an image submitted, and if so, it created a new image for the sketch and added it to the sketch div.
        var sketch  = document.createElement("div");
        sketch.setAttribute('class', "tile");
        sketch.innerHTML = "Sketch:";
        if (item.data().sketch != "" ) {
          var sketch_img = document.createElement("img");
          sketch_img.src = item.data().sketch;
          sketch.appendChild(sketch_img);
        }
        row.appendChild(sketch);
        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the twenty five percent completion photo. We then check if there is an image submitted, and if so, it created a new image for the 25 photo and added it to the 25 photo div.
        var twenty_five  = document.createElement("div");
        twenty_five.setAttribute('class', "tile");
        twenty_five.innerHTML = "25% deadline photo:";
         if (item.data().photo25 != "" ) {
          var twenty_five_img = document.createElement("img");
          twenty_five_img.src = item.data().photo25;
          twenty_five.appendChild(twenty_five_img);
         }
        row.appendChild(twenty_five);
        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the fifty percent completion photo. We then check if there is an image submitted, and if so, it created a new image for the 50 photo and added it to the 25 photo div.
        var fifty  = document.createElement("div");
        fifty.setAttribute('class', "tile");
        fifty.innerHTML = "50% deadline photo:";
        if (item.data().photo50 != "" ) {
        var fifty_img = document.createElement("img");
        fifty_img.src = item.data().photo50;
          fifty.appendChild(fifty_img);
        }
        row.appendChild(fifty);
        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the seventy five percent completion photo. We then check if there is an image submitted, and if so, it created a new image for the 75 photo and added it to the 75 photo div.
        var seventy_five  = document.createElement("div");
        seventy_five.setAttribute('class', "tile");
        seventy_five.innerHTML = "75% deadline photo:";
        if (item.data().photo75 != "" ) {
          var seventy_five_img = document.createElement("img");
          seventy_five_img.src = item.data().photo75;
          seventy_five.appendChild(seventy_five_img);
        }
        row.appendChild(seventy_five);
        // row.appendChild(document.createElement("br"));


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
