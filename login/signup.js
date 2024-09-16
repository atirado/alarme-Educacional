// Seleciona os ícones para mostrar/ocultar a senha e a confirmação da senha
let btn = document.querySelector('#verSenha');
let btnConfirm = document.querySelector('#verConfirmSenha');

// Seleciona os campos de entrada e suas respectivas labels
let nome = document.querySelector('#nome');
let labelNome = document.querySelector('#labelNome');
let usuario = document.querySelector('#usuario');
let labelUsuario = document.querySelector('#labelUsuario');
let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let confirmSenha = document.querySelector('#confirmSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');

// Inicializa variáveis de validação
let validNome = false;
let validUsuario = false;
let validSenha = false;
let validConfirmSenha = false;

// Seleciona os elementos para exibir mensagens de erro e sucesso
let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

// Valida o campo de nome enquanto o usuário digita
nome.addEventListener('keyup', () => {
  if (nome.value.length <= 2) {
    labelNome.setAttribute('style', 'color: red');
    labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres';
    nome.setAttribute('style', 'border-color: red');
    validNome = false;
  } else {
    labelNome.setAttribute('style', 'color: green');
    labelNome.innerHTML = 'Nome';
    nome.setAttribute('style', 'border-color: green');
    validNome = true;
  }
});

// Valida o campo de usuário enquanto o usuário digita
usuario.addEventListener('keyup', () => {
  if (usuario.value.length <= 4) {
    labelUsuario.setAttribute('style', 'color: red');
    labelUsuario.innerHTML = 'Usuário *Insira no mínimo 5 caracteres';
    usuario.setAttribute('style', 'border-color: red');
    validUsuario = false;
  } else {
    labelUsuario.setAttribute('style', 'color: green');
    labelUsuario.innerHTML = 'Usuário';
    usuario.setAttribute('style', 'border-color: green');
    validUsuario = true;
  }
});

// Valida o campo de senha enquanto o usuário digita
senha.addEventListener('keyup', () => {
  if (senha.value.length <= 5) {
    labelSenha.setAttribute('style', 'color: red');
    labelSenha.innerHTML = 'Senha *Insira no mínimo 6 caracteres';
    senha.setAttribute('style', 'border-color: red');
    validSenha = false;
  } else {
    labelSenha.setAttribute('style', 'color: green');
    labelSenha.innerHTML = 'Senha';
    senha.setAttribute('style', 'border-color: green');
    validSenha = true;
  }
});

// Valida se a confirmação da senha coincide com a senha
confirmSenha.addEventListener('keyup', () => {
  if (senha.value != confirmSenha.value) {
    labelConfirmSenha.setAttribute('style', 'color: red');
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem';
    confirmSenha.setAttribute('style', 'border-color: red');
    validConfirmSenha = false;
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green');
    labelConfirmSenha.innerHTML = 'Confirmar Senha';
    confirmSenha.setAttribute('style', 'border-color: green');
    validConfirmSenha = true;
  }
});

// Função para realizar o cadastro do usuário
function cadastro() {
  if (validNome && validUsuario && validSenha && validConfirmSenha) {
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');
    
    listaUser.push({
      nomeCad: nome.value,
      userCad: usuario.value,
      senhaCad: senha.value
    });

    localStorage.setItem('listaUser', JSON.stringify(listaUser));
    
    msgSuccess.setAttribute('style', 'display: block');
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>';
    msgError.setAttribute('style', 'display: none');
    msgError.innerHTML = '';
    
    setTimeout(() => {
      window.location.href = '../login/signin.html';
    }, 5500);
  } else {
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
    msgSuccess.innerHTML = '';
    msgSuccess.setAttribute('style', 'display: none');
  }
}

// Adiciona eventos para mostrar/ocultar a senha e a confirmação da senha
btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha');
  
  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text');
  } else {
    inputSenha.setAttribute('type', 'password');
  }
});

btnConfirm.addEventListener('click', () => {
  let inputConfirmSenha = document.querySelector('#confirmSenha');
  
  if (inputConfirmSenha.getAttribute('type') == 'password') {
    inputConfirmSenha.setAttribute('type', 'text');
  } else {
    inputConfirmSenha.setAttribute('type', 'password');
  }
});
