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

//changes date
export const initialSketchesDate = async function(initial_sketch_date){

    console.log("changing date");
    const docRef =   doc(db, "runway", "25CompletitionDate");
    await updateDoc(docRef, {
      date: String(initial_sketch_date.value)
    });
}

//changes 25% completion due date
export const date25 = async function(date25){

    console.log("changing date");
    const docRef =   doc(db, "runway", "25CompletitionDate");
    await updateDoc(docRef, {
      date: String(date25.value)
    });
}

//changes 50% completion due date
export const date50 = async function(date50){

    console.log("changing date");
    const docRef =   doc(db, "runway", "50CompletitionDate");
    await updateDoc(docRef, {
      date: String(date50.value)
    });
}

//changes 75% completion due date
export const date75 = async function(date75){

    console.log("changing date");
    const docRef =   doc(db, "runway", "75CompletitionDate");
    await updateDoc(docRef, {
      date: String(date75.value)
    });
}

//changes 100% completion due date
export const date100 = async function(date100){

    console.log("changing date");
    const docRef =   doc(db, "runway", "100CompletitionDate");
    await updateDoc(docRef, {
      date: String(date100.value)
    });
}

//changes Catwalk Song Selection due date
export const songDate = async function(songDate){

    console.log("changing date");
    const docRef =   doc(db, "runway", "CatwalkSongSelectionDate");
    await updateDoc(docRef, {
      date: String(songDate.value)
    });
}

//changes First Year Runway Workshop date
export const firstYearWorkshop = async function(firstYearWorkshop){

    console.log("changing date");
    const docRef =   doc(db, "runway", "FirstYearWorkshopDate");
    await updateDoc(docRef, {
      date: String(firstYearWorkshop.value)
    });
}


//changes particpant password
export const changeParticipantPassword = async function(password){
  try{
    console.log("changing password");
    const docRef =   doc(db, "runway", "password");
    await updateDoc(docRef, {
      password: password.value
    });
  }
  catch(e){
    console.log("Error changing password in the database: ", e);
  } 

  document.getElementById("new_password").value ="";
}

//changes admin password
export const changeAdminPassword = async function(admin_password){
  try{
    console.log("changing password");
    const docRef =   doc(db, "runway", "admin-password");
    await updateDoc(docRef, {
      password: admin_password.value
    });
  }
  catch(e){
    console.log("Error changing password in the database: ", e);
  } 

  document.getElementById("new_admin_password").value ="";
}

//checks if password is correct for Annie
export const AnniePassCheck = async function(){

  const docRef = doc(db, "runway", "admin-password")
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    while(prompt("please enter your password","") != docSnap.data().password) {
      continue;
    }
    return;
  }
}

//checks if password is correct for current and former participants
export const passCheck = async function(){

  const docRef = doc(db, "runway", "password")
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    while(prompt("please enter your password","") != docSnap.data().password) {
      continue;
    }
    return;
  }
}

var year_list = [];

// show garments from firebase in the tiles on the screen
export const showItems = async function(){
    const databaseItems = await getDocs(collection(db, "runway"));
    var garments = document.getElementById("garments");
    garments.innerHTML="";
  //go through each firebase object that isn't a password
    databaseItems.forEach((item) => {
      if (item.id != "password" && item.id != "admin-password" && item.data().isPublic == true){
    //check search bar for matching first name, last name, or material
      if (item.data().firstName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) || item.data().lastName.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) || item.data().material.toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) ){
        //check years that are clicked
                if(year_list.includes(item.data().year) || year_list.length==0 ){ 
                  //create tile (row) with name, image, inspiration, and material
                    var row = document.createElement("div");
                    row.setAttribute('class', "row");
                      var name = document.createElement("h1");
                      name.innerHTML = item.data().firstName + " " + item.data().lastName;
                      name.for = item.id;
                      row.appendChild(name);
                      row.appendChild(document.createElement("br"));

                      var image = document.createElement("img");
                      image.src = item.data().img;
                      row.appendChild(image);

                      row.appendChild(document.createElement("br"));
                  
                      var inspiration = document.createElement("p");
                      inspiration.innerHTML = "Inspiration: " + item.data().inspiration;
                      inspiration.for = item.id;
                  
                      row.appendChild(inspiration);
                      row.appendChild(document.createElement("br"));
              
                      var year = document.createElement("p");
                      year.innerHTML = "Year: " + item.data().year;
                      year.for = item.id;
                      row.appendChild(year);

                               
                      var material = document.createElement("p");
                      year.innerHTML = "Main Material: " + item.data().material;
                      material.for = item.id;
                      row.appendChild(material);

                  //add tile to the garments div
                  garments.appendChild(row);
                }
                
            }
        console.log(item.id + ", " + item.data().firstName.toLowerCase());
      }
    })
}



//behind the scenes - checklist (creates a list that contains the clicked years)
export const year_list_add = function(){
    year_list = []
    if (document.getElementById("2018").checked) {
        year_list.push("2018")
    }
    if (document.getElementById("2019").checked) {
        year_list.push("2019")
    }
    if (document.getElementById("2020").checked) {
        year_list.push("2020")
    }
    if (document.getElementById("2021").checked) {
        year_list.push("2021")
    }
    if (document.getElementById("2022").checked) {
        year_list.push("2022")
    }
    if (document.getElementById("2023").checked) {
        year_list.push("2023")
    }
  showItems();
}


