const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    addPoints: (pointsToAdd) => ipcRenderer.send('add-points', pointsToAdd),
    setTeamName: (teamName) => ipcRenderer.send('set-team-name', teamName)
})

ipcRenderer.on('counter-updated', (event, counter) => {
    const counterValue = document.getElementById('counterValue');
    counterValue.textContent = counter;
});

ipcRenderer.on('team-name-updated', (event, name) => {
    const teamName = document.getElementById('teamName');
    teamName.textContent = name;
});