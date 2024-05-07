const incrementBtns = document.getElementsByClassName('scoreBtn');
for(let i = 0; i < incrementBtns.length; i++) {
  incrementBtns[i].addEventListener('click', () => {
    window.electronAPI.addPoints(incrementBtns[i].textContent, incrementBtns[i].getAttribute('team'));
  });
}

const teamNameInput = document.getElementsByClassName('teamNameInput');
const teamNameBtn = document.getElementsByClassName('teamNameBtn');
for(let i = 0; i < teamNameBtn.length; i++) {
  teamNameBtn[i].addEventListener('click', () => {
    window.electronAPI.setTeamName(teamNameInput[i].value, teamNameBtn[i].getAttribute('team'));
  });
}

const resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () => {
  window.electronAPI.reset();
});