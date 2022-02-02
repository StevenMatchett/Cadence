// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const express = require('express')
var Ant = require('ant-plus');

function createWindow () {
  // Create the browser window.
  createExpress();

  const stick = new Ant.GarminStick2();

  findSensor(stick,1);
  // createExpress();
    
  const mainWindow = new BrowserWindow({
    width: 430,
    height: 1100,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

function findSensor(){
  const Ant = require('ant-plus');
  const stick = new Ant.GarminStick2();
  // const speedCadenceSensor = new Ant.CadenceSensor(stick);
  const speedCadenceScanner = new Ant.SpeedCadenceScanner(stick);
  speedCadenceScanner.on('speedData', data => {
    console.log(`id: ${data.DeviceID}`);
    console.dir(data);
  });
  speedCadenceScanner.on('cadenceData', data => {
    console.log(`id: ${data.DeviceID}`);
    console.dir(data);
  });
    
}






// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


function createExpress(){
  const app = express()
  const port = 3000

  app.get('/status', (req, res) => {
    res.send({sucess:true, cadence: Math.floor(Math.random() * 120)})
  })


  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}