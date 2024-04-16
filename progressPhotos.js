// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";


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

const sketchRef = doc(db, "runway", "Sketch DeadlineDate");
const sketchSnap = await getDoc(sketchRef);

const twentyFiveRef = doc(db, "runway", "25% DeadlineDate");
const twentyFiveSnap = await getDoc(twentyFiveRef);

const fiftyRef = doc(db, "runway", "50% DeadlineDate");
const fiftySnap = await getDoc(fiftyRef);

const seventyFiveRef = doc(db, "runway", "75% DeadlineDate");
const seventyFiveSnap = await getDoc(seventyFiveRef);


export const getProgressData = async function(){
  //sessionStorage.clear();
  if (sessionStorage.getItem("progress_data") !== null){
    var progressProfiles = JSON.parse(sessionStorage.getItem("progress_data"));
    console.log("data already stored sessionly");
    showProgressItems(progressProfiles);
  }else{
    getFirebaseData();
  }
  }

export const getFirebaseData = async function(){
  const q = query(collection(db, "runway"), where("isPublic", "==", false));
  var progressProfiles = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((item) => {
    if (item.id != "password" && item.id != "admin-password"){
      progressProfiles.push(item.data().firstName, item.data().lastName, item.data().email, item.data().sketch, item.data().photo25, item.data().photo50, item.data().photo75, item.data().catwalk, item.id, item.data().sketchDate, item.data().twentyFiveDate,item.data().fiftyDate, item.data().seventyFiveDate, item.data().catwalkTime, item.data().catwalkLink);
    }
    })
    sessionStorage.setItem("progress_data", JSON.stringify(progressProfiles));
    console.log("data stored sessionly");
    showProgressItems(progressProfiles);
}


// show Participants from firebase in the tiles on the screen 
export const showProgressItems = async function(progressProfiles){
    var annie_garments = document.getElementById("annie_garments");
    annie_garments.innerHTML="";
    for (let i = 0; i < progressProfiles.length; i+=15) {
      if (progressProfiles[i].toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) || progressProfiles[i+1].toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) ){ //search bar for Garments
                    
//creates a new div for the row containing the name. We then added the name to the innerHTML of the div. 

        var row = document.createElement("div");
           row.setAttribute('class', "row");
        
           
        var info = document.createElement("div");
        info.setAttribute('class', "tile");
        var name = document.createElement("h1");
          name.innerHTML = progressProfiles[i] + " " + progressProfiles[i+1].substring(0,1) + "  ";
        var email = document.createElement("a");
          email.innerHTML = progressProfiles[i+2];
          email.href = "mailto:"+ progressProfiles[i+2];
        //email.for = item.id;
        var catwalkLabel = document.createElement("h3");
          catwalkLabel.innerHTML = "Song Choice:";
        var catwalk = document.createElement("p");
          catwalk.innerHTML = progressProfiles[i+7]; 
        var timeLabel = document.createElement("h3");
          timeLabel.innerHTML = "Time:";
        var catwalkTime = document.createElement("p");
          if (progressProfiles[i+13] != null) {
            catwalkTime.innerHTML = progressProfiles[i+13];
          } else {
            catwalkTime.innerHTML = "";
          }
        var linkLabel = document.createElement("h3");
        linkLabel.innerHTML = "Link:";
          var catwalkLink = document.createElement("p");
          if (progressProfiles[i+14] != null) {
            catwalkLink.innerHTML = progressProfiles[i+14];
          } else {
            catwalkLink.innerHTML = "";
          }

        //catwalk.for = item.id;

          //name.for = item.id;
        info.appendChild(name);
        info.appendChild(email);
        info.appendChild(catwalkLabel);
        info.appendChild(catwalk);
        info.appendChild(timeLabel);
        info.appendChild(catwalkTime);
        info.appendChild(linkLabel);
        info.appendChild(catwalkLink);
        row.appendChild(info);

        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the sketch. We then check if there is an image submitted, and if so, it created a new image for the sketch and added it to the sketch div.
        var sketch  = document.createElement("div");
        sketch.setAttribute('class', "tile");
        if (progressProfiles[i+9] != null){
          var submissionDateSketch = progressProfiles[i+9].substring(0,21) 
        } else {
          submissionDateSketch = "";
        }
        // "Sketch Deadline Date:" + "<br>" + sketchSnap.data().date + "<br>" +
        sketch.innerHTML = "Sketch:";
        if (progressProfiles[i+3] != "" ) {
          var sketch_img = document.createElement("img");
          sketch_img.src = progressProfiles[i+3];
          sketch.appendChild(sketch_img);
          sketch.appendChild(deleteSketch);
        }
        row.appendChild(sketch);
  

        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the twenty five percent completion photo. We then check if there is an image submitted, and if so, it created a new image for the 25 photo and added it to the 25 photo div.
        var twenty_five  = document.createElement("div");
        twenty_five.setAttribute('class', "tile");
        if (progressProfiles[i+10] != null){
          var submissionDate25 = progressProfiles[i+10].substring(0,21) 
        } else {
          submissionDate25 = "";
        }
        // "25% Deadline Date:" + "<br>" + twentyFiveSnap.data().date + "<br>" + 
        twenty_five.innerHTML ="25% Photo";
         if (progressProfiles[i+4] != "" ) {
      
          var twenty_five_img = document.createElement("img");
          twenty_five_img.src = progressProfiles[i+4];
          twenty_five.appendChild(twenty_five_img);
          twenty_five.appendChild(delete25);
         }
         row.appendChild(twenty_five);
      
        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the fifty percent completion photo. We then check if there is an image submitted, and if so, it created a new image for the 50 photo and added it to the 25 photo div.
        var fifty  = document.createElement("div");
        fifty.setAttribute('class', "tile");
        if (progressProfiles[i+11] != null){
          var submissionDate50 = progressProfiles[i+11].substring(0,21) 
        } else {
          submissionDate50 = "";
        }
        // "50% Deadline Date:" + "<br>" + fiftySnap.data().date + "<br>" +
        fifty.innerHTML = "50% Photo";
        if (progressProfiles[i+5] != "" ) {
          var fifty_img = document.createElement("img");
          fifty_img.src = progressProfiles[i+5];
          fifty.appendChild(fifty_img);
          fifty.appendChild(delete50);
        }
        row.appendChild(fifty);
    
        // row.appendChild(document.createElement("br"));
        //creates a new div for the row containing the seventy five percent completion photo. We then check if there is an image submitted, and if so, it created a new image for the 75 photo and added it to the 75 photo div.
        var seventy_five  = document.createElement("div");
        seventy_five.setAttribute('class', "tile");
        if (progressProfiles[i+12] != null){
          var submissionDate75 = progressProfiles[i+12].substring(0,21) 
        } else {
          submissionDate75 = "";
        }
        // "75% Deadline Date:" + "<br>" + seventyFiveSnap.data().date + "<br>" + 
        seventy_five.innerHTML = "75% Photo";
        if (progressProfiles[i+6] != "" ) {
          var seventy_five_img = document.createElement("img");
          seventy_five_img.src = progressProfiles[i+6];
          seventy_five.appendChild(seventy_five_img);
          seventy_five.appendChild(delete75);
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

          }
    }
}
