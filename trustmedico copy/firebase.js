// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCSc7whBNgd5-8D5dp3hBTpdEDgRTPjTJA",
  authDomain: "chrometrust.firebaseapp.com",
  projectId: "chrometrust",
  storageBucket: "chrometrust.appspot.com",
  messagingSenderId: "239013785880",
  appId: "1:239013785880:web:c673419cd54fa3577f6e6d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
  console.log(firebase);
  
  var db = firebase.firestore();

  
  chrome.runtime.onMessage.addListener((msg, sender, resp) => {
  
    if(msg.command == "post"){
      db.collection("cities").doc("test-doc").set({
          data: msg.data
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    }
    if(msg.command == "fetch"){
      var docRef = db.collection("cities").doc("LA");
      docRef.get().then(function(doc) {
          if (doc.exists) {
            //doc.data()
            resp({type: "result", status: "success", data: doc.data(), request: msg});
          } else {
              //No such document!
              resp({type: "result", status: "error", data: 'No such document!', request: msg});
          }
      }).catch(function(error) {
        //Error getting document:",error
        resp({type: "result", status: "error", data: error, request: msg});
      });
    }
  
    //submit  data..
    if(msg.command == "post"){
     //...
    }
  
    return true;
  
  
  })