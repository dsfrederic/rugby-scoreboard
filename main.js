const { app, BrowserWindow, ipcMain } = require('electron/main')
const { count } = require('node:console')
const path = require('node:path')

counter = 0

function createWindow () {
  const displayWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    frame: false,
    // fullscreen: true, //TODO:  Uncomment this line to make the display window full screen
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