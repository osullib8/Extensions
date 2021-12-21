console.log("extension ready?");

chrome.runtime.onMessage.addListener(recieved);

function recieved(request, sender, sedResponse){
    console.log(request.txt);
    if(request.txt === "hello"){
        let paragraphs = document.getElementsByTagName('p');
        for (elt of paragraphs) {
            elt.style['background-color'] = '#FF00FF';
        }
    }
}