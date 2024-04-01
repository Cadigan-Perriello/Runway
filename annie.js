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

export const getProgressData = async function(){
  //localStorage.clear();
  if (localStorage.getItem("progress_data") !== null){
    var progressProfiles = JSON.parse(localStorage.getItem("progress_data"));
    console.log("data already stored locally");
    showItems(progressProfiles);
  }else{
    getFirebaseData();
  }
  }

export const getFirebaseData = async function(){
  const fullDatabase = await getDocs(collection(db, "runway"));
  var progressProfiles = [];
  fullDatabase.forEach((item) => {
    if (item.id != "password" && item.id != "admin-password" && item.data().isPublic == false){
      progressProfiles.push(item.data().firstName, item.data().lastName, item.data().email, item.data().sketch, item.data().photo25, item.data().photo50, item.data().photo75, item.data().catwalk);
    }
    })
    localStorage.setItem("progress_data", JSON.stringify(progressProfiles));
    console.log("data stored locally");
    showItems(progressProfiles);
}


// show Participants from firebase in the tiles on the screen 
export const showItems = async function(progressProfiles){
    var annie_garments = document.getElementById("annie_garments");
    annie_garments.innerHTML="";
    for (let i = 0; i < progressProfiles.length; i+=8) {
      if (progressProfiles[i].toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) || progressProfiles[i+1].toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) ){ //search bar for Tutors
        
//creates a new div for the row containing the name. We then added the name to the innerHTML of the div. 
        
        var row = document.createElement("div");
           row.setAttribute('class', "row");
        var info = document.createElement("div");
        info.setAttribute('class', "tile");
        var name = document.createElement("h1");
        var email = document.createElement("a");
          email.innerHTML = progressProfiles[i+2];
        //email.for = item.id;
        var catwalkLabel = document.createElement("p");
          catwalkLabel.innerHTML = "Catwalk Song:";
        var catwalk = document.createElement("p");
          catwalk.innerHTML = progressProfiles[i+7];
        //catwalk.for = item.id;
          name.innerHTML = progressProfiles[i] + " " + progressProfiles[i+1].substring(0,1) + "  ";
          //name.for = item.id;
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
        if (progressProfiles[i+3] != "" ) {
          var deleteSketch = document.createElement("button");
          deleteSketch.setAttribute('id', "deleteSketch");
          deleteSketch.innerText = "X";
          deleteSketch.onclick = function() {
            if(confirm("Remove " + progressProfiles[i] + "'s sketch?") == true) {
            deleteSubmission(progressProfiles[i+3], i, progressProfiles);
            }
          }
          sketch.appendChild(deleteSketch);
          var sketch_img = document.createElement("img");
          sketch_img.src = progressProfiles[i+3];
          sketch.appendChild(sketch_img);
        }
        row.appendChild(sketch);
  

        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the twenty five percent completion photo. We then check if there is an image submitted, and if so, it created a new image for the 25 photo and added it to the 25 photo div.
        var twenty_five  = document.createElement("div");
        twenty_five.setAttribute('class', "tile");
        twenty_five.innerHTML = "25% deadline photo:";
         if (progressProfiles[i+4] != "" ) {
          var delete25 = document.createElement("button");
          delete25.setAttribute('id', "delete25");
          delete25.innerText = "X"
          delete25.onclick = function() {
            if(confirm("Remove " + progressProfiles[i] + "'s 25% photo?") == true) {
              deleteSubmission(progressProfiles[i+4], i, progressProfiles);
          }
          }
          twenty_five.appendChild(delete25);
          var twenty_five_img = document.createElement("img");
          twenty_five_img.src = progressProfiles[i+4];
          twenty_five.appendChild(twenty_five_img);
         }
         row.appendChild(twenty_five);
      
        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the fifty percent completion photo. We then check if there is an image submitted, and if so, it created a new image for the 50 photo and added it to the 25 photo div.
        var fifty  = document.createElement("div");
        fifty.setAttribute('class', "tile");
        fifty.innerHTML = "50% deadline photo:";
        if (progressProfiles[i+5] != "" ) {
          var delete50 = document.createElement("button");
          delete50.setAttribute('id', "delete50");
          delete50.innerText = "X"
          delete50.onclick = function() {
            if(confirm("Remove " + progressProfiles[i] + "'s 50% photo?") == true) {
              deleteSubmission(progressProfiles[i+5], i, progressProfiles);
          }
          }
          fifty.appendChild(delete50);
          var fifty_img = document.createElement("img");
          fifty_img.src = progressProfiles[i+5];
          fifty.appendChild(fifty_img);
        }
        row.appendChild(fifty);
    
        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the seventy five percent completion photo. We then check if there is an image submitted, and if so, it created a new image for the 75 photo and added it to the 75 photo div.
        var seventy_five  = document.createElement("div");
        seventy_five.setAttribute('class', "tile");
        seventy_five.innerHTML = "75% deadline photo:";
        if (progressProfiles[i+6] != "" ) {
          var delete75 = document.createElement("button");
          delete75.setAttribute('id', "delete75");
          delete75.innerText = "X"
          delete75.onclick = function() {
            if(confirm("Remove " + progressProfiles[i] + "'s 75% photo?") == true) {
              deleteSubmission(progressProfiles[i+3], i, progressProfiles);
          }
          }
          seventy_five.appendChild(delete75);
          var seventy_five_img = document.createElement("img");
          seventy_five_img.src = progressProfiles[i+6];
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
         deleteProfile.onclick = async function() {
          if(confirm("Remove " + progressProfiles[i] + "'s profile?") == true) {
             console.log("removing profile");
             const fullDatabase = await getDocs(collection(db, "runway"));
             await fullDatabase.forEach((item) => {
               if (item.id != "password" && item.id != "admin-password" && item.data().isPublic == false){
                 if (item.data().firstName == progressProfiles[i] && item.data().lastName == progressProfiles[i+1]  && item.data().email == progressProfiles[i+2]){
                   deleteDoc(doc(db, "runway", item.id));
                   localStorage.clear();
                   getProgressData();
                   return;
               }
             }
           })
          }
        }
           row.appendChild(deleteProfile);
  
      }
    }
}

async function deleteSubmission(submission){
    console.log(submission);
    const fullDatabase = await getDocs(collection(db, "runway"));
    await fullDatabase.forEach((item) => {
      if (item.id != "password" && item.id != "admin-password" && item.data().isPublic == false){
        if (item.data().sketch == submission || item.data().photo25 == submission || item.data().photo50 == submission || item.data().photo75  == submission) {
          console.log("removing submission...id: " + item.id);
          const itemToComplete = doc(db, "runway", item.id);
          if (item.data().sketch == submission){
            console.log("deleting sketch..." + item.data().sketch);
            updateDoc(itemToComplete, {
              sketch: ""
              });
          } else if (item.data().photo25 == submission){
            console.log("deleting 25..." + item.data().photo25);
            updateDoc(itemToComplete, {
              photo25: ""
              });
          } else if (item.data().photo50 == submission){
            console.log("deleting 50..." + item.data().photo50);
            updateDoc(itemToComplete, {
              photo50: ""
              });
          } else if (item.data().photo75 == submission){
            console.log("deleting 75..." + item.data().photo75);
            updateDoc(itemToComplete, {
              photo75: ""
              });
          }
          localStorage.clear();
          getProgressData();
          return;
        }
      }
    })
}


