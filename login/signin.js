// Seleciona o ícone do olho (para mostrar/ocultar a senha) e o armazena na variável 'btn'
let btn = document.querySelector('.fa-eye');

// Adiciona um ouvinte de eventos ao ícone do olho para detectar cliques
btn.addEventListener('click', () => {
  // Seleciona o campo de entrada da senha
  let inputSenha = document.querySelector('#senha');
  
  // Verifica o tipo de entrada do campo de senha
  if (inputSenha.getAttribute('type') == 'password') {
    // Se o tipo for 'password', altera para 'text' para exibir a senha
    inputSenha.setAttribute('type', 'text');
  } else {
    // Se o tipo for 'text', altera para 'password' para ocultar a senha
    inputSenha.setAttribute('type', 'password');
  }
});

// Função que será executada ao clicar no botão de "Entrar"
function entrar() {
  // Seleciona o campo de entrada do usuário e o rótulo correspondente
  let usuario = document.querySelector('#usuario');
  let userLabel = document.querySelector('#userLabel');
  
  // Seleciona o campo de entrada da senha e o rótulo correspondente
  let senha = document.querySelector('#senha');
  let senhaLabel = document.querySelector('#senhaLabel');
  
  // Seleciona a div onde as mensagens de erro serão exibidas
  let msgError = document.querySelector('#msgError');
  
  // Cria uma lista para armazenar usuários válidos
  let listaUser = [];
  
  // Objeto para armazenar o usuário que for validado
  let userValid = {
    nome: '',
    user: '',
    senha: ''
  };
  
  // Recupera a lista de usuários armazenada no localStorage
  listaUser = JSON.parse(localStorage.getItem('listaUser'));
  
  // Percorre a lista de usuários e verifica se os dados de login coincidem
  listaUser.forEach((item) => {
    if (usuario.value == item.userCad && senha.value == item.senhaCad) {
      // Se coincidir, armazena os dados no objeto userValid
      userValid = {
        nome: item.nomeCad,
        user: item.userCad,
        senha: item.senhaCad
      };
    }
  });
  
  // Verifica se os dados de entrada coincidem com algum usuário válido
  if (usuario.value == userValid.user && senha.value == userValid.senha) {
    // Se sim, redireciona para a página principal
    window.location.href = '../front/index.html';
    
    // Gera um token aleatório para autenticação
    let mathRandom = Math.random().toString(16).substr(2);
    let token = mathRandom + mathRandom;
    
    // Armazena o token e o usuário logado no localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('userLogado', JSON.stringify(userValid));
  } else {
    // Se os dados estiverem incorretos, exibe mensagens de erro
    userLabel.setAttribute('style', 'color: red');
    usuario.setAttribute('style', 'border-color: red');
    senhaLabel.setAttribute('style', 'color: red');
    senha.setAttribute('style', 'border-color: red');
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = 'Usuário ou senha incorretos';
    usuario.focus(); // Foca no campo de usuário para facilitar a correção
  }
}
