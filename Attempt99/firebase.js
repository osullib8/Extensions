
var firebaseConfig = {
    apiKey: "AIzaSyCSc7whBNgd5-8D5dp3hBTpdEDgRTPjTJA",
    authDomain: "chrometrust.firebaseapp.com",
    projectId: "chrometrust",
    storageBucket: "chrometrust.appspot.com",
    messagingSenderId: "239013785880",
    appId: "1:239013785880:web:c673419cd54fa3577f6e6d"
    };
    firebase.initializeApp(firebaseConfig);  
    var db = firebase.firestore();
  
    
    chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
        if(msg.command == 'checkAuth'){
            var user = firebase.auth().currentUser;
            if (user) {
            // User is signed in.
            response({type: "auth", status: "success", message: user});
            } else {
            // No user is signed in.
            response({type: "auth", status: "no-auth", message: false});
            }
        }   
        if(msg.command == "post"){
            GetTrust(msg);
        } 
        if(msg.command == "login"){
            console.log(msg.data);
            var email = msg.data.e;
            var pass = msg.data.p;
            //Add seperate values for auth info here instead of fixed variables...
            firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
            response({type: "auth", status: "error", message: error});
            // ...
            });
            firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log(user);
                response({type: "auth", status: "success", message: user});
            } else {
                // No user is signed in.
            }
            });
        }
        return true;
    })

    async function GetTrust(msg) {
        var x = 0;
        var pos;
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const year = day * 365;
        const d = new Date();
        let years = Math.round(d.getTime() / year);
        
        db.collection("Fake news").where("url", "==", msg.url).get().then((doc) => {
            doc.forEach((doc) => {
                x = x + 1
            })
            if(x > 0){
                console.log("Document data:" + msg.url)
                db.collection("Fake news").where("url", "==", msg.url).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        db.collection("Fake news").where("url", "==", msg.url).get().then((querySnapshot) => {
                            querySnapshot.forEach((element) => {
                                var Fake = element.data();
                                pos = parseInt(Fake.positives) + 1
                            })
                        }).then(() => {
                            var Ref = db.collection("Fake news").doc(doc.id); 
                            return Ref.update({
                                marked: pos,
                                timestamp: d
                            })
                        })
                        .then(() => {
                            response({status: 'success'})
                        })
                        .catch((error) => {
                            chrome.extension.getBackgroundPage().console.log("Error getting documents: ", error);
                        });
                    });
                })
                .catch((error) => {
                    chrome.extension.getBackgroundPage().console.log("Error getting documents: ", error);
                });
            }else{
                console.log("yessir" + msg.url)
                db.collection("Fake news").add({
                    url: msg.url,
                    title: msg.title,
                    positives: 0,
                    negatives: 0,
                    marked: 1,
                    timestamp: d
                })
            }
        })
    }
