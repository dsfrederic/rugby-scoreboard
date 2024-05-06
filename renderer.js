const incrementBtns = document.getElementsByClassName('scoreBtn');
for(let i = 0; i < incrementBtns.length; i++) {
  incrementBtns[i].addEventListener('click', () => {
    window.electronAPI.addPoints(incrementBtns[i].textContent);
  });
}