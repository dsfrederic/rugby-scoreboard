const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    incrementOne: () => ipcRenderer.send('increment-one')
})

ipcRenderer.on('counter-updated', (event, counter) => {
    const counterValue = document.getElementById('counterValue');
    counterValue.textContent = counter;
});