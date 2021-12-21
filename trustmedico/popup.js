var firebaseConfig = {
    apiKey: "AIzaSyCSc7whBNgd5-8D5dp3hBTpdEDgRTPjTJA",
    authDomain: "chrometrust.firebaseapp.com",
    projectId: "chrometrust",
    storageBucket: "chrometrust.appspot.com",
    messagingSenderId: "239013785880",
    appId: "1:239013785880:web:c673419cd54fa3577f6e6d"
};

firebase.initializeApp(firebaseConfig);

//chrome.extension.getBackgroundPage().console.log(firebase);

var db = firebase.firestore();
//var database = firebase.database();

function addExtension(){
    console.log("working");
    var title = encodeURIComponent(document.getElementById('title').value);
    var url = encodeURIComponent(document.getElementById('url').value);

    db.collection("Fake news").add({
        url: url,
        title: title,
        positives: 0,
        negatives: 0
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

function onPageDetailsReceived(pageDetails) {
    document.getElementById('title').value = pageDetails.title;
    document.getElementById('url').value = pageDetails.url;
    
    db.collection("Fake news").add({
        url: pageDetails.url,
        title: pageDetails.title,
        positives: 1,
        negatives: 1
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    //database.ref("Fake news").doc(pageDetails.title).set({
    //    url: pageDetails.url
    //})
}

window.addEventListener('load', function(evt) {
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('addEvent').addEventListener('submit', addExtension);
        });

    document.getElementById('addEvent').addEventListener('submit', addExtension);

    chrome.runtime.getBackgroundPage(function(eventPage) {

        eventPage.getPageDetails(onPageDetailsReceived);
    });
});
