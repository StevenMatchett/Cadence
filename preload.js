// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {

  addOnlick("vol-up", "/volume/up")
  addOnlick("vol-down", "/volume/down") 
  addOnlick("power", "/power") 
  addOnlick("back", '/nav/back')
  addOnlick("up", "/nav/up") 
  addOnlick("down", "/nav/down") 
  addOnlick("left", "/nav/left") 
  addOnlick("right", "/nav/right") 
  addOnlick("enter", "/nav/enter") 
})

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        callApi("/nav/up")
    }
    else if (e.keyCode == '40') {
        // down arrow
        callApi("/nav/down")
    }
    else if (e.keyCode == '37') {
       // left arrow
       callApi("/nav/left")
    }
    else if (e.keyCode == '39') {
       // right arrow
       callApi("/nav/right")
    } else if (e.keyCode == '13') {
      // enter
      callApi("/nav/enter")
      e.stopPropagation();
    } else if (e.keyCode == '46'){
      callApi('/nav/back')
    }

}

function callApi(url){
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "http://localhost:3000" + url);
  oReq.send();
}

function addOnlick(id, url) {
  var button = document.getElementById(id);
  
  button.onclick = function(){
      callApi(url)
    	// fetch("http://localhost:3000/volume/up")
   }
}

