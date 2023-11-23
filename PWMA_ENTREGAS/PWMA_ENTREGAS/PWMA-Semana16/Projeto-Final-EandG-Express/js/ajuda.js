var nome = "", email = "", senhaCliente = "", clienteRemovido
const regNome = new RegExp("[a-zA-Z\u00C0-\u017F]{3,14}")
const regEmail = new RegExp("[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+")

function validarCampos() {
  nome = document.getElementById("nome").value
  email = document.getElementById("email").value

  if (!regNome.test(nome)) {
    alert("Informe um nome de usuário válido.");
    return false
  }

  if (!regEmail.test(emailCliente)) {
    alert("Informe um e-mail válido.")
    return false
  }

  alert("Mensagem enviada com sucesso")
  return true
};