// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const express = require('express')
const find = require('local-devices');

function createWindow () {
  // Create the browser window.
  findTV();
  createExpress();
  // createExpress();
    
  const mainWindow = new BrowserWindow({
    width: 430,
    height: 1100,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
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




// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


const Samsung = require('samsung-tv-control').default
const { KEYS } = require('samsung-tv-control/lib/keys')
const { APPS } = require('samsung-tv-control/lib/apps')
let loaded = false;
let config = {}

let runKey = (key) => {
  const control = new Samsung(config)

  control.turnOn()
  control
    .isAvaliable()
    .then(() => {
      // Send key to TV
      control.sendKey(key, function(err, res) {
          if (err) {
            throw new Error(err)
          } else {
            console.log(res)
          }
      
      });
    })
    .catch(e => console.error(e))
  
}

function getConfig(ip, mac){
  return {
    debug: true, // Default: false
    ip: ip,
    mac: mac.replace(/:/g, ""),
    name: 'NodeJS-Test', // Default: NodeJS
    port: 8001, // Default: 8002
    token: '12345678',
  }
}

async function findTV(){

  let devices = await find();
  for (let device of devices){
    try {
      let configCandidate = getConfig(device.ip, device.mac);
      const control = new Samsung(configCandidate)
      control.turnOn()
      if (await control.isAvaliable()){
        config = configCandidate;
      }
    } catch (e) {
      console.log("failed to connect", device.ip)
    }
  }
  console.log(config)
}


function createExpress(){
  const app = express()
  const port = 3000

  app.get('/ready', (req, res) => {
    console.log(config)
    if (config.ip){
      res.json({...config,})
    } else {
      res.send()
    }
  })

  app.get('/volume/up', (req, res) => {
    runKey(KEYS.KEY_VOLUP);
    res.send({sucess:true})
  })
  
  app.get('/volume/down', (req, res) => {
    runKey(KEYS.KEY_VOLDOWN);
    res.send({sucess:true})
  })

  app.get('/nav/left', (req, res) => {
    runKey(KEYS.KEY_LEFT);
    res.send({sucess:true})
  })

  app.get('/nav/right', (req, res) => {
    runKey(KEYS.KEY_RIGHT);
    res.send({sucess:true})
  })

  app.get('/nav/down', (req, res) => {
    runKey(KEYS.KEY_DOWN);
    res.send({sucess:true})
  })

  app.get('/nav/up', (req, res) => {
    runKey(KEYS.KEY_UP);
    res.send({sucess:true})
  })

  app.get('/nav/menu', (req, res) => {
    runKey(KEYS.KEY_MENU);
    res.send({sucess:true})
  })

  app.get('/nav/back', (req, res) => {
    runKey(KEYS.KEY_BACK_MHP);
    res.send({sucess:true})
  })

  app.get('/nav/enter', (req, res) => {
    runKey(KEYS.KEY_ENTER);
    res.send({sucess:true})
  })

  app.get('/nav/back', (req, res) => {
    runKey(KEYS.KEY_BACK_MHP);
    res.send({sucess:true})
  })

  app.get('/power', (req, res) => {
    runKey(KEYS.KEY_POWER);
    res.send({sucess:true})
  })


  

  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}