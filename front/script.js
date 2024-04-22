function startCountdown() {
  var timeInput = document.getElementById('timeInput');
  var time = parseInt(timeInput.value);

  if (isNaN(time) || time <= 0) {
    alert('Por favor, digite um valor válido para o tempo.');
    return;
  }

  setTimeout(function() {
    alert('Tempo limite de uso do smartphone esgotado. A tela será bloqueada.');
    lockScreen();
  }, time * 1000); // Converte para milissegundos
}

function lockScreen() {
  document.body.style.overflow = 'hidden'; // Bloqueia a rolagem da tela
}
