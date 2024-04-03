// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
// TODO: import libraries for Cloud Firestore Database
// https://firebase.google.com/docs/firestore
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

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
//checks if the garments are loaded into local storage already, 
//and if not, calls the function to get them from Firebase
export const getGarmentData = async function(){
  // console.log(localStorage.getItem("garment_data"));
  //localStorage.clear();
  if (localStorage.getItem("garment_data") !== null){
    //console.log(localStorage.getItem("garment_data"));
    var localGarments = JSON.parse(localStorage.getItem("garment_data"));
    console.log("data already stored locally");
    showItems(localGarments);
    filterByYear(localGarments);
  }else{
    getFirebaseData();
  }
  }


  export const getGarmentDataAdmin = async function(){
    // console.log(localStorage.getItem("garment_data"));
    //localStorage.clear();
    if (localStorage.getItem("garment_data") !== null){
      //console.log(localStorage.getItem("garment_data"));
      var localGarments = JSON.parse(localStorage.getItem("garment_data"));
      console.log("data already stored locally");
      showUnapprovedFinalGarments(localGarments);
    }else{
      getFirebaseDataAdminPage();
    }
    }

   
//retrieves the garment data from Firebase and saves it to local storage
export const getFirebaseData = async function(){
  const fullDatabase = await getDocs(collection(db, "runway"));
  var localGarments = [];
  fullDatabase.forEach((item) => {
    if (item.id != "password" && item.id != "admin-password"){
      localGarments.push(item.data().firstName, item.data().lastName, item.data().img, item.data().inspiration, item.data().year, item.data().material, item.id, item.data().isPublic, item.data().isApproved);
    }
    })
    console.log(JSON.stringify(localGarments));
    localStorage.setItem("garment_data", JSON.stringify(localGarments));
    console.log("data stored locally");
    console.log(localGarments);
    showItems(localGarments);
    filterByYear(localGarments);
}


//retrieves the garment data from Firebase and saves it to local storage
export const getFirebaseDataAdminPage = async function(){
  const fullDatabase = await getDocs(collection(db, "runway"));
  var localGarments = [];
  fullDatabase.forEach((item) => {
    if (item.id != "password" && item.id != "admin-password"){
      localGarments.push(item.data().firstName, item.data().lastName, item.data().img, item.data().inspiration, item.data().year, item.data().material, item.id, item.data().isPublic, item.data().isApproved);
    }
    })
    console.log(JSON.stringify(localGarments));
    localStorage.setItem("garment_data", JSON.stringify(localGarments));
    console.log("data stored locally");
    console.log(localGarments);
    showUnapprovedFinalGarments(localGarments);
}

//will store the checked years
var year_list = [];

//creates filter by year checkboxes
export const filterByYear = async function(localGarments){
    var checkboxes = document.getElementById("checkboxes");
    checkboxes.innerHTML="";
    var years = [];
    for (let i = 0; i < localGarments.length; i+=9) {
      if(localGarments[i+4] != null && !years.includes(localGarments[i+4])) {
        years.push(localGarments[i+4]);
      }
      console.log(years)
    }
    years.sort();
    years.forEach((item) => {
      var row = document.createElement("input");
      row.type = "checkbox";
      row.className = "checkbox_class";
      row.value = (item);
      row.onclick = function(){
        year_list = []
        var checkboxes = document.getElementsByClassName("checkbox_class")
        for (var i = 0; i < checkboxes.length; i++) {
          console.log(checkboxes[i].value);

          if (checkboxes[i].checked) {
            year_list.push(checkboxes[i].value);
          }
        }
        showItems(localGarments);
      }
      var label = document.createElement("label");
      label.innerHTML = (item);
      checkboxes.appendChild(label);
      checkboxes.appendChild(row);
      checkboxes.appendChild(document.createElement("br"));
    })
}



//behind the scenes - checklist (creates a list that contains the clicked years)
export const year_list_add = function(){
  year_list = []
  var checkboxes = document.getElementsByClassName("checkbox_class")
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      year_list.push(checkboxes[i].value);
    }
  }
}



var row = document.createElement("div");
row.setAttribute('class', "deadline_tile");

//changes date
export const changeDate = async function(selectDate, selectInfo, id){

  console.log("changing date");
  const docRef =   doc(db, "runway", id);
  await updateDoc(docRef, {
    date: String(selectDate.value),
    info: String(selectInfo.value)
  });
}

//adds Event
export const addEvent = async function(EventName, SelectDate, EventInfo){
  console.log(EventName.value.toLowerCase())
  var EventNameValueId = EventName.value;
  if (!EventName.value.toLowerCase().includes("date")){
    EventNameValueId = EventName.value + "Date";
  }
  const docRef = await setDoc(doc(db, "runway", (EventNameValueId)), {
    name: (EventName.value),
    date: (SelectDate.value),
    info: (EventInfo.value)
  });
}


//displays Events on Homepage
export const displayEventsHome = async function (){
    console.log("displaying events on homepage")
    const databaseItems = await getDocs(collection(db, "runway"));
    var homeEvents = document.getElementById("homepage_events");
      homeEvents.innerHTML="";

    databaseItems.forEach((item) => {
      if (item.id.toLowerCase().includes("date")) {
      var row = document.createElement("div");
      row.setAttribute('class', "deadline_tile");
      var title = document.createElement("p");
      title.innerHTML = item.data().name;
      title.setAttribute('class', "deadline");
      var date = document.createElement("p");
      date.innerHTML = item.data().date;
      date.setAttribute('class', "date");
      var info = document.createElement("p");
      info.innerHTML = item.data().info;
      info.setAttribute('class', "date");

      
      
      row.appendChild(title);
      row.appendChild(date);
      row.appendChild(info);
      homeEvents.appendChild(row);
    }
    
    })
}



//displays Event on Navbar
export const displayEvents = async function(){
  console.log("displayingEvents")
  const databaseItems = await getDocs(collection(db, "runway"));
  var Sidenav = document.getElementById("mySidenav");
    Sidenav.innerHTML="";
    var closeButton = document.createElement('button');
    closeButton.innerHTML = "close"
    closeButton.setAttribute ('class', "close_button");
    closeButton.addEventListener('click', () => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
      
    })
    //creates input for name and date and submit button for adding an Event
    var row = document.createElement("div");
    row.setAttribute('class', "sidenav_row");
    var description = document.createElement("p");
    description.innerHTML = "add Event";
    var name_event = document.createElement("input");
    name_event.placeholder = "event name";
    name_event.setAttribute ('type', "text");
    var date_event = document.createElement("input");
    date_event.setAttribute ('type', "date");
    var info_event = document.createElement("input");
    info_event.placeholder = "additional information"
    info_event.setAttribute ('type', "text");
    const addEventButton = document.createElement('button');
    addEventButton.textContent = 'addEvent';
    addEventButton.addEventListener('click', () => {
      console.log ("adding Event");
      addEvent(name_event, date_event, info_event);
    })
    Sidenav.appendChild(closeButton);
    row.appendChild(description);
    row.appendChild(name_event);
    row.appendChild(date_event);
    row.appendChild(info_event);
    row.appendChild(addEventButton);
    Sidenav.appendChild(row);

    //goes through firebase and displays all items on the sidebar
    databaseItems.forEach((item) => {
      if (item.id.toLowerCase().includes("date")) {
        var text = document.createElement("p");
        text.innerHTML = item.data().name;
        var date = document.createElement("input");
        date.setAttribute('type', "date");
        var info = document.createElement("input");
        info.placeholder = "additional information";
        info.setAttribute('type', "text");
        const submitButton = document.createElement('button');
        submitButton.textContent = 'submit';
        submitButton.addEventListener('click', () => {
          console.log("New button clicked!");
          changeDate(date, info, item.id);
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete event';
        deleteButton.addEventListener('click', () =>{
          console.log("deleting event");
          deleteDoc(doc(db, "runway", (item.id)))
        })

      row.setAttribute('class', "sidenav_row");
      row.appendChild(text);
      row.appendChild(date);
      row.appendChild(info);
      row.appendChild(submitButton);
      row.appendChild(deleteButton);
      document.getElementById("mySidenav").appendChild(row);
      }
 
    })

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

// show garments from firebase in the tiles on the screen
export const showItems = async function(localGarments){
    console.log(localGarments);
     var garments = document.getElementById("garments");
     garments.innerHTML="";
  // //go through each firebase object that isn't a password, date, and is approved as final
     for (let i = 0; i < localGarments.length; i+=9) {
      console.log(localGarments[i]);
      if (localGarments[i+7] == true && localGarments[i+8] == true){
      if (localGarments[i].toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) || localGarments[i+3].toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) || localGarments[i+5].toLowerCase().includes(document.getElementById("filter_search").value.toLowerCase()) ){
        //check years that are clicked
                if(year_list.includes(localGarments[i+4]) || year_list.length==0 ){ 
                  //create tile (row) with name, image, inspiration, and material
                    var row = document.createElement("div");
                    row.setAttribute('class', "row");
                      var name = document.createElement("p");
                      name.innerHTML = localGarments[i] + " " + localGarments[i+1].substring(0, 1) + ".";
                      //name.for = item.id;
                      row.appendChild(name);
                      row.appendChild(document.createElement("br"));

                      var image = document.createElement("img");
                      image.src = localGarments[i+2];
                      row.appendChild(image);

                      row.appendChild(document.createElement("br"));
                  
                      var inspiration = document.createElement("p");
                      inspiration.innerHTML = "Inspiration: " + localGarments[i+3];
                      //inspiration.for = item.id;
                  
                      row.appendChild(inspiration);
                      row.appendChild(document.createElement("br"));
              
                      var year = document.createElement("p");
                      year.innerHTML = "Year: " + localGarments[i+4];
                      //year.for = item.id;
                      row.appendChild(year);

                               
                      var material = document.createElement("p");
                      year.innerHTML = "Main Material: " + localGarments[i+5];
                      //material.for = item.id;
                      row.appendChild(material);

                  //add tile to the garments div
                  garments.appendChild(row);
                }
                
            }
          }
           }
}

//displays the unapproved tiles in the Admin Page so annie can approve them
//localGarments.push(item.data().firstName, item.data().lastName, item.data().img, item.data().inspiration, item.data().year, item.data().material, item.id);

export const showUnapprovedFinalGarments = async function(localGarments){
  // console.log(localGarments);
  var SubmissionsCheck = document.getElementById("SubmissionsCheck");
  SubmissionsCheck.innerHTML="";
// //go through each firebase object that isn't a password or date, is a final submission, but is not approved yet by admin
   for (let i = 0; i < localGarments.length; i+=9) {
    // console.log(localGarments[i+9]);
    if (localGarments[i] != null && localGarments[i+7] == true && localGarments[i+8] == false){
      
                //create tile (row) with name, image, inspiration, and material
                  var row = document.createElement("div");
                  row.setAttribute('class', "row");
                    var name = document.createElement("p");
                    name.innerHTML = localGarments[i] + " " + localGarments[i+1].substring(0, 1) + ".";
                    //name.for = item.id;
                    row.appendChild(name);
                    row.appendChild(document.createElement("br"));

                    var image = document.createElement("img");
                    image.src = localGarments[i+2];
                    row.appendChild(image);

                    row.appendChild(document.createElement("br"));
                
                    var inspiration = document.createElement("p");
                    inspiration.innerHTML = "Inspiration: " + localGarments[i+3];
                    //inspiration.for = item.id;
                
                    row.appendChild(inspiration);
                    row.appendChild(document.createElement("br"));
            
                    var year = document.createElement("p");
                    year.innerHTML = "Year: " + localGarments[i+4];
                    //year.for = item.id;
                    row.appendChild(year);

                             
                    var material = document.createElement("p");
                    year.innerHTML = "Main Material: " + localGarments[i+5];
                    //material.for = item.id;
                    row.appendChild(material);

                var approve_button = document.createElement("button");
                approve_button.innerHTML = "approve";
                row.appendChild(approve_button);
                approve_button.onclick =async function() {
                  await approval(localGarments[i+5]);
                  // console.log(localGarments[i+6].isApproved.value);
                  console.log("Approved");
                };

                var decline_button = document.createElement("button");
                decline_button.innerHTML = "decline";
                row.appendChild(decline_button);
                decline_button.onclick =async function() {
                  deleteDoc(doc(db, "runway", localGarments[i+6]));
                  console.log("declined");
                };
              
            //add tile to the garments div
            SubmissionsCheck.appendChild(row);
          }
         }
}




async function approval(itemId) {
  await updateDoc(doc(db, "runway", itemId), {
    isApproved : true
  });
  location.reload();
}

