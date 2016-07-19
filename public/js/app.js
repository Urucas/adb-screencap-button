var electron = require('electron');
var img = document.getElementById("preview");
var btt = document.getElementById("takeBtt");
var closeBtt = document.getElementById("closeBtt");
var preloader = document.getElementById("preloader");
var select = document.getElementById("devices");
var ipcRenderer = electron.ipcRenderer;
var devices;
function takeScreenshot() {
  preview.removeAttribute("src");
  preloader.style.visibility = "visible";
  btt.setAttribute("disabled", "disabled");
  var audio = new Audio('sound/shutter.mp3');
  audio.play();
  ipcRenderer.send('screencap', {id:select.value});
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
ipcRenderer.send("get-devices");
ipcRenderer.on("devices", function(ev, data) {
  devices = data;
  for(i in data) {
    var device = data[i];
    var option = document.createElement("option");
    option.value = device.id;
    option.innerText = device.model + " - " + device.id;
    select.appendChild(option);
  }
})
