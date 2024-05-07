const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    addPoints: (pointsToAdd, team) => ipcRenderer.send('add-points', pointsToAdd, team),
    setTeamName: (teamName, team) => ipcRenderer.send('set-team-name', teamName, team),
    reset: () => ipcRenderer.send('reset')
})

ipcRenderer.on('data-refresh', (event, teams) => {
    const teamNames = document.getElementsByClassName('teamName');
    for(let teamName of teamNames) {
        let teamId = teamName.getAttribute('team');
        teamName.textContent = teams[teamId].name;
        console.log("teamName: " + teamName.textContent + " teamId: " + teamId);
    }

    const teamScores = document.getElementsByClassName('teamScore');
    for(let teamScore of teamScores) {
        let teamId = teamScore.getAttribute('team');
        teamScore.textContent = teams[teamId].score;
    }
});