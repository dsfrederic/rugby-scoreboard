const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

counter = 0

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('add-points', (event, pointsToAdd) => {
    counter += parseInt(pointsToAdd, 10);;
    event.sender.send('counter-updated', counter);
  })

  mainWindow.loadFile('index.html')
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