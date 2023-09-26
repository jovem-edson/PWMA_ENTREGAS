

var usuarios = [
  { nome: "usuario1", senha: "senha1" },
  { nome: "usuario2", senha: "senha2" },
  { nome: "usuario3", senha: "senha3" }
];

var dadosEntregas = document.getElementById('divEntregas');
const listaEntregas = [
  "ID: 18174975557 | Status: Entregue | Mercado Livre",
  "ID: 20263338775 | Status: Destinatário Ausente | Amazon",
  "ID: 38082629894 | Status: Em Rota de Entrega | Mercado Livre",
  "ID: 07432313165 | Status: Aguardando Coleta da Transportadora | Amazon",
  "ID: 37830122183 | Status: Entregue | Amazon",
  "ID: 81467788479 | Status: Aguardando Coleta da Transportadora | Shopee",
  "ID: 67601155530 | Status: Em Rota de Entrega | Mercado Livre",
  "ID: 97644064792 | Status: Em Rota de Entrega | Amazon",
  "ID: 88915858588 | Status: Em Rota de Entrega | Mercado Livre"
];


function validarUsuario(nome, senha) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].nome === nome && usuarios[i].senha === senha) {
      return true;
    }
  }
  return false;
}

function cadastrarUsuario(nome, senha) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].nome === nome) {
      return false;
    }
  }

  usuarios.push({ nome: nome, senha: senha });
  return true;
}

function logar() {
  var tentNome = window.prompt('Insira seu Nome');
  nomeUsuario = tentNome
  var tentSenha = window.prompt('Insira sua senha');
  res = document.getElementById('resultado')
 res.innerHTML = `<p>Olá, <strong>${nomeUsuario}</strong>! Bem vindo ao E&G Express!<br> Estamos te redirecionando para sua área,<br> aguarde um instante... &#129299 &#128511;` 
}

/*
function cadastrar() {
  let novoNome = window.prompt('Insira um novo nome de usuário');
  let novaSenha = window.prompt('Insira uma nova senha');
  res = document.getElementById('resultado')
 res.innerHTML = `<p>Olá, <strong>${nomeUsuario}</strong>! Bem vindo ao E&G Express!<br>Estamos te redirecionando para sua área, aguarde um instante... &#129299 &#128511;` 
}  */
    

function resgatarUsuario() {
  var nomeUsuario = localStorage.getItem("nomeUsuario");
  if (nomeUsuario) {
  document.getElementById("nomeUsuario").textContent = "Nome do Usuário: " + nomeUsuario;
        } else {
            // Lida com a situação em que o nome do usuário não está definido
            document.getElementById("nomeUsuario").textContent = "Nome do Usuário não definido.";
        }
}

function mostraEntregas() {
  
  const list = document.getElementById("list");
  const labelEntrega = document.createElement("p");
  labelEntrega.innerText = "Histórico de Encomendas";
  document.getElementById("divEntregas").appendChild(labelEntrega);
  for (i = 0; i < listaEntregas.length; i++) {
    list.innerHTML += `<li>${listaEntregas[i]}</li>`;
  }

}

//Essa função serve para ter um pequeno delay nas páginas de login e cadastro
function redirecionar() {
    setTimeout(function() {
        window.location.href = 'profile.html'; 
    }, 3000); // 3000 milissegundos (3 segundos)
}
