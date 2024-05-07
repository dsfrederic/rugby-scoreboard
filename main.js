const { contentTracing } = require('electron');
const { app, BrowserWindow, ipcMain } = require('electron/main')
const { count } = require('node:console')
const path = require('node:path')

let team1 = { id: "1", name: 'Team 1', score: 0 };
let team2 = { id: "2", name: 'Team 2', score: 0 };

let teams = {
  1: {
    name: 'Team 1',
    score: 0
  },
  2: {
    name: 'Team 2',
    score: 0
  }
}

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

  ipcMain.on('add-points', (event, pointsToAdd, team) => {
    // Add points to the team
    teams[team].score += parseInt(pointsToAdd);
    
    console.log("Team " + team + " score: " + teams[team].score)

    controlWindow.webContents.send('data-refresh', teams)
    displayWindow.webContents.send('data-refresh', teams)
  })

  ipcMain.on('set-team-name', (event, teamName, team) => {
    teams[team].name = teamName;
    
    controlWindow.webContents.send('data-refresh', teams)
    displayWindow.webContents.send('data-refresh', teams)
  
  })

  ipcMain.on('reset', (event) => { 
    console.log("Reset values")

    let teams = {
      1: {
        name: 'Team 1',
        score: 0
      },
      2: {
        name: 'Team 2',
        score: 0
      }
    }

    controlWindow.webContents.send('data-refresh', teams)
    displayWindow.webContents.send('data-refresh', teams)
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