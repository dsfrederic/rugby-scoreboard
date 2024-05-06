const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    addPoints: (pointsToAdd) => ipcRenderer.send('add-points', pointsToAdd)
})

ipcRenderer.on('counter-updated', (event, counter) => {
    const counterValue = document.getElementById('counterValue');
    counterValue.textContent = counter;
});