var electron = require('electron');
var img = document.getElementById("preview");
var btt = document.getElementById("takeBtt");
var closeBtt = document.getElementById("closeBtt");
console.log(closeBtt);
var preloader = document.getElementById("preloader");
var ipcRenderer = electron.ipcRenderer;
function takeScreenshot() {
  preview.removeAttribute("src");
  preloader.style.visibility = "visible";
  btt.setAttribute("disabled", "disabled");
  var audio = new Audio('sound/shutter.mp3');
  audio.play();
  ipcRenderer.send('screencap', {});
}
function close() {
  ipcRenderer.send("close");
}
btt.onclick = takeScreenshot;
ipcRenderer.on("screencap-ready", function(ev, msg){
  preloader.style.visibility = "hidden";
  btt.removeAttribute("disabled");
  preview.src = msg;
});
closeBtt.onclick = close;
