var email = "", senha = ""


function fazerLogin() {
  const emailLogin = document.getElementById("emailLogin").value
  const senhaLogin = document.getElementById("senhaLogin").value

  const clienteSalvo = JSON.parse(localStorage.getItem("cliente_"))

  if (clienteSalvo && clienteSalvo.email === emailLogin && clienteSalvo.senha === senhaLogin) {
    alert("Login bem-sucedido!")
    window.location.href = "perfil.html"
  } else {
    alert("Credenciais inválidas. Por favor, tente novamente.")
  }
}
