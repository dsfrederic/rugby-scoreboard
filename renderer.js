const incrementBtns = document.getElementsByClassName('scoreBtn');
for(let i = 0; i < incrementBtns.length; i++) {
  incrementBtns[i].addEventListener('click', () => {
    window.electronAPI.addPoints(incrementBtns[i].textContent);
  });
}

const teamNameInput = document.getElementById('teamNameInput');
const teamNameBtn = document.getElementById('setTeamName');
teamNameBtn.addEventListener('click', () => {
  window.electronAPI.setTeamName(teamNameInput.value);
});