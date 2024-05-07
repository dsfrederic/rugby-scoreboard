const { app, BrowserWindow, ipcMain } = require('electron/main')
const { count } = require('node:console')
const path = require('node:path')

counter = 0
teamName = "Team 1"

function createWindow() {
  const displayWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    frame: false,
    // fullscreen: true, 
  })

  const controlWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  ipcMain.on('add-points', (event, pointsToAdd) => {
    counter += parseInt(pointsToAdd, 10);

    if (counter < 0) {
      counter = 0;
    }

    event.sender.send('counter-updated', counter);
    if (displayWindow) {
      displayWindow.webContents.send('counter-updated', counter)
    }


  })

  ipcMain.on('set-team-name', (event, teamName) => {
    teamName = teamName;
    event.sender.send('team-name-updated', teamName);
    if (displayWindow) {
      displayWindow.webContents.send('team-name-updated', teamName)
    }
  })

  ipcMain.on('reset', (event) => { 
    counter = 0;
    teamName = "Team 1";
    event.sender.send('counter-updated', counter);
    if (displayWindow) {
      displayWindow.webContents.send('counter-updated', counter)
      displayWindow.webContents.send('team-name-updated', teamName);
    }
  })

  displayWindow.loadFile('display.html')
  controlWindow.loadFile('control.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})