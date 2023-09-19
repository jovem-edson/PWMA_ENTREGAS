var usuarios = [
  { nome: "usuario1", senha: "senha1" },
  { nome: "usuario2", senha: "senha2" },
  { nome: "usuario3", senha: "senha3" }
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
  let tentNome = window.prompt('Insira seu Nome');
  let tentSenha = window.prompt('Insira sua senha');
  res = document.getElementById('resultado')

  res.innerHTML = `<p>Olá, <strong>${tentNome}</strong>! Bem vindo ao E&G Express! &#129299 &#128511;`
}

function cadastrar() {
  let novoNome = window.prompt('Insira um novo nome de usuário');
  let novaSenha = window.prompt('Insira uma nova senha');

  if (novoNome.trim() === "" || novaSenha.trim() === "") {
    window.alert('Nome de usuário ou senha inválidos...');
  } else {
    if (cadastrarUsuario(novoNome, novaSenha)) {
      window.alert('Usuário cadastrado com sucesso!');
    } else {
      window.alert('Nome de usuário já existe. Tente novamente.');
    }
  }
}
