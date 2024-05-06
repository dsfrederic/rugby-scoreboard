const incrementBtn = document.getElementById('incrementBtn')
const counterValue = document.getElementById('counterValue')
incrementBtn.addEventListener('click', () => {
  window.electronAPI.incrementOne()
})