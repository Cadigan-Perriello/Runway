// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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

const docRef_25 = doc(db, "runway", "25% DeadlineDate");
const docSnap_25 = await getDoc(docRef_25);

const docRef_sketch = doc(db, "runway", "Sketch DeadlineDate");
const docSnap_sketch = await getDoc(docRef_sketch);

const docRef_50 = doc(db, "runway", "50% DeadlineDate");
const docSnap_50 = await getDoc(docRef_50);

const docRef_75 = doc(db, "runway", "75% DeadlineDate");
const docSnap_75 = await getDoc(docRef_75);



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
        var sketch_date_deadline = "";
        if (docSnap_sketch.exists()){
          sketch_date_deadline = docSnap_sketch.data().date;
        }

        sketch.innerHTML = "Sketch:" + "Sketch deadline date:" + sketch_date_deadline;
        if (item.data().sketch != "" ) {
          var deleteSketch = document.createElement("button");
          deleteSketch.setAttribute('id', "deleteSketch");
          deleteSketch.innerText = "X";
          deleteSketch.onclick = function() {
            if(confirm("Remove " + item.data().firstName + 's sketch?') == true) {
            console.log("removing");
            const itemToComplete = doc(db, "runway", item.id);
            updateDoc(itemToComplete, {
              sketch: ""
            });
            showItems();
          }
          }
          sketch.appendChild(deleteSketch);
          var sketch_img = document.createElement("img");
          sketch_img.src = item.data().sketch;
          sketch.appendChild(sketch_img);
        }
        row.appendChild(sketch);
  

        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the twenty five percent completion photo. We then check if there is an image submitted, and if so, it created a new image for the 25 photo and added it to the 25 photo div.
        var twenty_five  = document.createElement("div");
        twenty_five.setAttribute('class', "tile");
        var twenty_five_date_deadline = "";
        if (docSnap_25.exists()){
          twenty_five_date_deadline = docSnap_25.data().date;
        }
        twenty_five.innerHTML = "25% deadline photo:" + "25% deadline date:" + twenty_five_date_deadline;

         if (item.data().photo25 != "" ) {
          var delete25 = document.createElement("button");
          delete25.setAttribute('id', "delete25");
          delete25.innerText = "X"
          delete25.onclick = function() {
            if(confirm("Remove " + item.data().firstName + 's 25% photo?') == true) {
            console.log("removing");
            const itemToComplete = doc(db, "runway", item.id);
            updateDoc(itemToComplete, {
              photo25: ""
            });
            showItems();
          }
          }
          twenty_five.appendChild(delete25);
          var twenty_five_img = document.createElement("img");
          twenty_five_img.src = item.data().photo25;
          twenty_five.appendChild(twenty_five_img);
         }
         row.appendChild(twenty_five);
      
        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the fifty percent completion photo. We then check if there is an image submitted, and if so, it created a new image for the 50 photo and added it to the 25 photo div.
        var fifty  = document.createElement("div");
        fifty.setAttribute('class', "tile");
        var fifty_date_deadline = "";
        if (docSnap_50.exists()){
          fifty_date_deadline = docSnap_50.data().date;
        }
        fifty.innerHTML = "50% deadline photo:" + "50% deadline date:" + fifty_date_deadline;
        if (item.data().photo50 != "" ) {
          var delete50 = document.createElement("button");
          delete50.setAttribute('id', "delete50");
          delete50.innerText = "X"
          delete50.onclick = function() {
            if(confirm("Remove " + item.data().firstName + 's 50% photo?') == true) {
            console.log("removing");
            const itemToComplete = doc(db, "runway", item.id);
            updateDoc(itemToComplete, {
              photo50: ""
            });
            showItems();
          }
          }
          fifty.appendChild(delete50);
          var fifty_img = document.createElement("img");
          fifty_img.src = item.data().photo50;
          fifty.appendChild(fifty_img);
        }
        row.appendChild(fifty);
    
        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the seventy five percent completion photo. We then check if there is an image submitted, and if so, it created a new image for the 75 photo and added it to the 75 photo div.
        var seventy_five  = document.createElement("div");
        seventy_five.setAttribute('class', "tile");
        var seventy_five_date_deadline = "";
        if (docSnap_75.exists()){
          seventy_five_date_deadline = docSnap_75.data().date;
        }
        seventy_five.innerHTML = "75% deadline photo:" + "75% deadline date:" + seventy_five_date_deadline;
        if (item.data().photo75 != "" ) {
          var delete75 = document.createElement("button");
          delete75.setAttribute('id', "delete75");
          delete75.innerText = "X"
          delete75.onclick = function() {
            if(confirm("Remove " + item.data().firstName + 's 75% photo?') == true) {
            console.log("removing");
            const itemToComplete = doc(db, "runway", item.id);
            updateDoc(itemToComplete, {
              photo75: ""
            });
            showItems();
          }
          }
          seventy_five.appendChild(delete75);
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

         var deleteProfile = document.createElement("button");
         deleteProfile.setAttribute('id', "deleteProfile");
         deleteProfile.innerText = "X";
         deleteProfile.onclick = function() {
              if(confirm("Remove " + item.data().firstName + 's profile?') == true) {
              console.log("removing");
              deleteDoc(doc(db, "runway", item.id));
              const itemToComplete = doc(db, "runway", item.id);
            showItems();
            }
           }
           row.appendChild(deleteProfile);

  
            }
      }
    })
}
