var cluster = require('cluster');
var menubar = require('menubar');
var path = require('path');
var dir = path.join(process.cwd(), 'public');
var icon = path.join(process.cwd(), 'icon.png');
var screencap = require('adb-screencap').default;
var DEBUG = true;
var electron = require('electron');
var ipcMain = electron.ipcMain;
var ADB = require('adbjs').default;
var adb = new ADB();
var mb = menubar({
  dir:dir, width:360, height:540, 
  "always-on-top": true, icon: icon
});
mb.on('after-create-window', function(){
  if(DEBUG) mb.window.openDevTools();
});
ipcMain.on("screencap", function(ev, arg){
  screencap(function(err, path){
    ev.sender.send("screencap-ready", path);
  }, arg.id);
});
ipcMain.on("close", function(){
  console.log("Thank you! Come again");
  mb.window.close();
})
ipcMain.on("get-devices", function(ev, arg){
  var devices = adb.devices();
  ev.sender.send("devices", devices);
});
