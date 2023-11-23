var nomeEmpresa = "", setorEmpresa = "", nomeCliente = "", sobrenomeCliente = "", cnpjCliente = "", emailCliente = "", senhaCliente = "", clienteRemovido
const regEmpresa = new RegExp("[a-zA-Z\u00C0-\u017F]{3,14}")
const regNome = new RegExp("[a-zA-Z\u00C0-\u017F]{3,14}")
const regSobrenome = new RegExp("[a-zA-Z\u00C0-\u017F]{3,18}")
const regCnpj = new RegExp("[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}")
const regEmail = new RegExp("[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")
const regSenha = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}")
const selectSetor = ["Varejo Online", "Atacadista", "Centro de Distribuição", "Restaurante", "Construtora"]

const setor = document.getElementById("set")
adicionarSetor(setor)

//Macara para o input do CNPJ baseado no de CEP https://www.ramoncp.com.br/snippets/mascara-de-cep-para-input-em-js
const handleCnpj = (event) => {
  let input = event.target
  input.value = cnpjMask(input.value)
}

const cnpjMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{2})(\d)/, '$1.$2')
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
  value = value.replace(/\.(\d{3})(\d)/, '.$1/$2')
  value = value.replace(/(\d{4})(\d)/, '$1-$2')
  return value;
}

function adicionarSetor(select) {
  for (let i = 0; i < selectSetor.length; i++) {
    select.innerHTML += `<option value="${selectSetor[i]}"> ${selectSetor[i]} </option>`
  }

}

function validarCampos() {
  nomeEmpresa = document.getElementById("emp").value
  setorEmpresa = document.getElementById("set").value
  nomeCliente = document.getElementById("nom").value
  sobrenomeCliente = document.getElementById("sob").value
  cnpjCliente = document.getElementById("cnpj").value
  emailCliente = document.getElementById("email").value
  senhaCliente = document.getElementById("senha").value

  console.log(cnpjCliente)

  if (!regNome.test(nomeEmpresa)) {
    alert("Informe um nome de empresa válido.")
    return false
  }

  if (setorEmpresa === "") {
    alert("Selecione um setor.")
    return false
  }

  if (!regNome.test(nomeCliente)) {
    alert("Informe um nome de usuário válido.")
    return false
  }

  if (!regNome.test(sobrenomeCliente)) {
    alert("Informe um sobrenome válido.")
    return false
  }

  if (!regCnpj.test(cnpjCliente)) {
    alert("Informe um CNPJ válido.")
    return false
  }

  if (!regEmail.test(emailCliente)) {
    alert("Informe um e-mail válido.")
    return false
  }

  if (!regSenha.test(senhaCliente)) {
    alert("Informe uma senha forte (mínimo de 8 caracteres, incluindo letras e números).")
    return false
  }
  
  cadastrarCliente()
  return true
}

function formatarNome(cliente) {
  const nome = cliente.nome
  const sobrenome = cliente.sobrenome
  return nome.split(' ')
    .map(letra => letra[0].toUpperCase() + letra.substring(1).toLowerCase())
    .join(' ') + ' ' + sobrenome.split(' ')
      .map(letra => letra[0].toUpperCase() + letra.substring(1).toLowerCase())
      .join(' ')
}

function cadastrarCliente() {
  console.log("Cadastrar Cliente")
  nomeEmpresa = document.getElementById("emp").value
  setorEmpresa = document.getElementById("set").value
  nomeCliente = document.getElementById("nom").value
  sobrenomeCliente = document.getElementById("sob").value
  cnpjCliente = document.getElementById("cnpj").value
  emailCliente = document.getElementById("email").value
  senhaCliente = document.getElementById("senha").value

  const nomeFormatado = formatarNome({ nome: nomeCliente, sobrenome: sobrenomeCliente })
  
  const novoCliente = {
    empresa: nomeEmpresa,
    setor: setorEmpresa,
    nome: nomeFormatado,
    cnpj: cnpjCliente,
    email: emailCliente,
    senha: senhaCliente,
  };

  localStorage.setItem("cliente_nome", nomeFormatado)
  localStorage.setItem("cliente_empresa", nomeEmpresa)
  localStorage.setItem("cliente_setor", setorEmpresa)
  localStorage.setItem("cliente_cnpj", cnpjCliente)
  localStorage.setItem("cliente_email", emailCliente)
  localStorage.setItem(`cliente_`, JSON.stringify(novoCliente))
  alert("Cliente cadastrado com sucesso!")
  window.location.href = "perfil.html"
}

function validarLogin() {

}
