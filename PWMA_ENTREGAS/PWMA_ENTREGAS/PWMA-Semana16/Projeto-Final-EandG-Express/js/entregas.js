var idEntrega = 0
var nomeProduto = "", descricaoProduto = "", dataPostagem = "", cidadeCliente = "", ufCliente = "", cepCliente = "", enderecoCliente = "", numCliente = "", previsaoEntrega = "", clienteRemovido
const regNome = new RegExp("[a-zA-Z\u00C0-\u017F]{3,14}")
const regDescricao = new RegExp("[a-zA-Z\u00C0-\u017F]{3,18}")
const regCidade = new RegExp("[a-zA-Z\u00C0-\u017F]{5,16}")
const regCep = new RegExp("[0-9]{5}-[0-9]{3}")
const regEndereco = new RegExp("[a-zA-Z\u00C0-\u017F]{5,30}")
const regNum = new RegExp("[0-9]{1,5}")
const selectUf = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]


document.addEventListener("DOMContentLoaded", function () {
  const nomeCliente = localStorage.getItem("cliente_nome")

  if (nomeCliente) {
    const saudacao = document.getElementById("boasVindas")
    saudacao.textContent = `Olá ${nomeCliente} !`
  }
})

//Macara para o input do CEP https://www.ramoncp.com.br/snippets/mascara-de-cep-para-input-em-js
const handleZipCode = (event) => {
  let input = event.target
  input.value = zipCodeMask(input.value)
}

const zipCodeMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{5})(\d)/, '$1-$2')
  return value
}

function apiViaCEP(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.logradouro != undefined && data.localidade != undefined && data.uf != undefined) {
        document.getElementById("end").value = data.logradouro
        document.getElementById("cid").value = data.localidade
        document.getElementById("uf").value = data.uf
      }
    })
    .catch(error => alert('Erro ao buscar o endereço:', error))
}

function gerarFormulario() {
  var entregas = document.getElementById("entregas")
  entregas.innerHTML = ""
  var formulario = document.getElementById("formulario")
  formulario.innerHTML = `
    <form>
        <div class="mb-3 col-md-8">
          <label for="nomPro">Nome do Produto:*</label>
          <input id="nomPro" type="text" name="NomeProduto" size="35" class="form-control" required>
        </div>

        <div class="mb-3 col-md-8">
          <label for="desc">Descrição:*</label>
          <input id="desc" type="text" size="35" name="Descricao" class="form-control" required>
        </div>

        <div class="mb-3 col-md-8">
          <label for="dat">Data de Postagem:*</label>
          <input id="dat" type="date" name="Data" class="form-control" required>
        </div>

        <div class="row mb-3 g-3">
          <div class="col-auto col-md-6">
            <label for="cid">Cidade Destino:*</label>
            <input id="cid" type="text" size="40" name="Cidade" class="form-control" required>
          </div>

          <div class="col-auto col-md-2">
            <label for="uf" clas="form-label">UF:*</label>
            <select id="uf" class="form-select">
              <option selected disabled hidden style='display: none' value=''></option>
            </select>
          </div>
        </div>

        <div class="mb-3 col-md-8">
          <label for="cep">CEP:*</label>
          <input id="cep" maxlength="9" onkeyup="handleZipCode(event)" type="text" name="Cep" class="form-control" placeholder="xxxxx-xxx">
        </div>

        <div class="row mb-3 g-3">
          <div class="col-auto col-md-6">
            <label for="end">Endereço de Entrega:*</label>
            <input id="end" type="text" size="40" maxlength="40" name="Endereco" class="form-control" required>
          </div>

          <div class="col-auto col-md-2">
            <label for="num">Nº:*</label>
            <input id="num" type="number" size="5" maxlength="5" name="Numero" class="form-control" required>
          </div>
        </div>

      </form>
      <div class="row mt-3 mb-5 g-3">
      <div class="col-auto">
        <button type="submit" class="btn btn-dark" onclick="cadastrarEntrega()">Incluir</button>
      </div>`

  // chamando o select da UF
  const estadoUf = document.getElementById("uf")
  adicionarUf(estadoUf)

  //Fzendo a ponte com a máscara do input de CEP
  document.getElementById('cep').onkeyup = function(event) {
    handleZipCode(event)
    document.getElementById('cep').value = zipCodeMask(document.getElementById('cep').value)
  }

  //enviando o cep do formulario para a função do viacep
  document.getElementById('cep').addEventListener('blur', function() {
    const cep = document.getElementById('cep').value
    if (cep.length === 9) {
      apiViaCEP(cep)
    }
  })

}

function adicionarUf(select) {
  for (var i = 0; i < selectUf.length; i++) {
    select.innerHTML += `<option value="${selectUf[i]}"> ${selectUf[i]} </option>`
  }
}

function formatarData(cliente) {
  const dataCliente = cliente.data
  const ano = dataCliente.split('-')[0]
  const mes = dataCliente.split('-')[1]
  const dia = dataCliente.split('-')[2]
  return dia + '/' + mes + '/' + ano

}

function cadastrarEntrega() {

  idEntrega++
  nomeProduto = document.getElementById("nomPro").value
  descricaoProduto = document.getElementById("desc").value
  dataPostagem = document.getElementById("dat").value
  cidadeCliente = document.getElementById("cid").value
  ufCliente = document.getElementById("uf").value
  cepCliente = document.getElementById("cep").value
  enderecoCliente = document.getElementById("end").value
  numCliente = document.getElementById("num").value

  if (regNome.test(nomeProduto) && regDescricao.test(descricaoProduto) && dataPostagem && regCidade.test(cidadeCliente) && ufCliente && regCep.test(cepCliente) && regEndereco.test(enderecoCliente) && regNum.test(numCliente)) {


    const novaEntrega = {
      id: idEntrega,
      nome: nomeProduto,
      descricao: descricaoProduto,
      data: dataPostagem,
      cidade: cidadeCliente,
      uf: ufCliente,
      cep: cepCliente,
      endereco: enderecoCliente,
      num: numCliente,
    }

    localStorage.setItem(`entrega_${idEntrega}`, JSON.stringify(novaEntrega))
    alert("Entrega cadastrada com sucesso!")
    limparCampos()
  } else {
    alert("Por favor, preencha os campos corretamente.")
  }

}

function gerarTabela() {
  var formulario = document.getElementById("formulario")
  formulario.innerHTML = ""

  var entregas = document.getElementById("entregas")
  entregas.innerHTML = ""
  var ultimoIdEnt = ultimoIdEntrega()

  entregas.innerHTML +=
    `<div class="table-responsive">
            <table class="table table-bordered table-hover align-middle">
                <thead class="bg-dark text-light text-center align-middle">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Produto</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Data de Postagem</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">UF</th>
                        <th scope="col">CEP</th>
                        <th scope="col">Endereço de Entrega</th>
                        <th scope="col">Número</th>
                        <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody id="tabela" class="text-center align-middle"></tbody>
            </table>
        </div>`


  for (var i = 1; i <= ultimoIdEnt; i++) {
    const key = `entrega_${i}`
    const entregaLS = localStorage.getItem(key)

    if (entregaLS) {
      const entregaObj = JSON.parse(entregaLS)

      document.getElementById("tabela").innerHTML +=
        `<tr>
                    <td>${entregaObj.id}</td>
                    <td id="nomeEntrega">${entregaObj.nome}</td>
                    <td id="descricaoEntrega">${entregaObj.descricao}</td>
                    <td id="dataPostagemEntrega">${formatarData(entregaObj)}</td>
                    <td id="cidadeEntrega">${entregaObj.cidade}</td>
                    <td id="ufEntrega">${entregaObj.uf}</td>
                    <td id="cepEntrega">${entregaObj.cep}</td>
                    <td id="enderecoEntrega">${entregaObj.endereco}</td>
                    <td id="numeroEntrega">${entregaObj.num}</td>
                    <td>
                    
                        <i class="fas fa-sync-alt" onclick="alterarEntrega('${key}')" role="button"></i>
                         <i class="fas fa-trash-alt" onclick="removerEntrega('${key}')" role="button"></i>
                    </td>
                </tr>`
    }
  }
}

function alterarEntrega(key) {
  var ultimaEntrega = localStorage.getItem(key)
  var entregas = document.getElementById("entregas")
  entregas.innerHTML = ""
  var formulario = document.getElementById("formulario")
  formulario.innerHTML = `
    <form>
        <div class="mb-3 col-md-8">
          <label for="novoNomPro">Nome do Produto:*</label>
          <input id="novoNomPro" type="text" name="NomeProduto" size="35" class="form-control" required>
        </div>

        <div class="mb-3 col-md-8">
          <label for="novaDescricao">Descrição:*</label>
          <input id="novaDescricao" type="text" size="35" name="Descricao" class="form-control" required>
        </div>

        <div class="mb-3 col-md-8">
          <label for="novaDataPostagem">Data de Postagem:*</label>
          <input id="novaDataPostagem" type="date" name="Data" class="form-control" required>
        </div>

        <div class="row mb-3 g-3">
          <div class="col-auto col-md-6">
            <label for="cid">Cidade Destino:*</label>
            <input id="cid" type="text" size="40" name="Cidade" class="form-control" required>
          </div>

          <div class="col-auto col-md-2">
            <label for="uf" clas="form-label">UF:*</label>
            <select id="uf" class="form-select">
              <option selected disabled hidden style='display: none' value=''></option>
            </select>
          </div>
        </div>

        <div class="mb-3 col-md-8">
          <label for="cep">CEP:*</label>
          <input id="cep" maxlength="9" onkeyup="handleZipCode(event)" type="text" name="cep" class="form-control" placeholder="xxxxx-xxx">
        </div>

        <div class="row mb-3 g-3">
          <div class="col-auto col-md-6">
            <label for="end">Endereço de Entrega:*</label>
            <input id="end" type="text" size="40" maxlength="40" name="Endereco" class="form-control" required>
          </div>

          <div class="col-auto col-md-2">
            <label for="novoNumCliente">Nº:*</label>
            <input id="novoNumCliente" type="number" size="5" maxlength="5" name="Numero" class="form-control" required>
          </div>
        </div>

      </form>
      <div class="row mt-3 mb-5 g-3">
      <div class="col-auto">
        <button type="submit" class="btn btn-dark" onclick="confirmaAlteracao('${key}')">Confirmar</button>
      </div>`

  retomarCampos(key)
  
  // chamando o select da UF
  const novoEstadoUf = document.getElementById("uf")
  adicionarUf(novoEstadoUf)

  //Fzendo a ponte com a máscara do input de CEP
  document.getElementById('cep').onkeyup = function(event) {
    handleZipCode(event)
    document.getElementById('cep').value = zipCodeMask(document.getElementById('cep').value)
  }

  //enviando o cep do formulario para a função do viacep
  document.getElementById('cep').addEventListener('blur', function() {
    const novoCep = document.getElementById('cep').value
    if (novoCep.length === 9) {
      apiViaCEP(novoCep)
    }
  })

  }

function confirmaAlteracao(key) {
  console.log("Chave fornecida:", key)
  var entregaLS = localStorage.getItem(key)
  var entregaAntiga = JSON.parse(entregaLS)
    
    console.log(entregaAntiga.id)
    const novoNome = document.getElementById("novoNomPro").value
    const novaDescricao = document.getElementById("novaDescricao").value
    const novaDataPostagem = document.getElementById("novaDataPostagem").value
    const novaCidadeCliente = document.getElementById("cid").value
    const novaUfCliente = document.getElementById("uf").value
    const novoCepCliente = document.getElementById("cep").value
    const novoEnderecoCliente = document.getElementById("end").value
    const novoNumCliente = document.getElementById("novoNumCliente").value

    if (regNome.test(novoNome) && regDescricao.test(novaDescricao) && novaDataPostagem && regCidade.test(novaCidadeCliente) && novaUfCliente && regCep.test(novoCepCliente) && regEndereco.test(novoEnderecoCliente) && regNum.test(novoNumCliente)) {

      const entregaAtualizada = {
        id: entregaAntiga.id,
        nome: novoNome,
        descricao: novaDescricao,
        data: novaDataPostagem,
        cidade: novaCidadeCliente,
        uf: novaUfCliente,
        cep: novoCepCliente,
        endereco: novoEnderecoCliente,
        num: novoNumCliente,
      }

      // aq atualiza o cliente no localStorage
      localStorage.setItem(key, JSON.stringify(entregaAtualizada))

      gerarTabela()

    } else {
      alert("Por favor, preencha os campos corretamente.")

    }
    }

function removerEntrega(key) {
  const apagarId = JSON.parse(localStorage.getItem(key)).id
  console.log("remove")
  localStorage.removeItem(key)

  for (var i = apagarId + 1; i <= idEntrega; i++) {
    const chaveAtual = `entrega_${i}`
    const chaveNova = `entrega_${i - 1}`
    const entregaLS = localStorage.getItem(chaveAtual)

    if (entregaLS) {
      localStorage.removeItem(chaveAtual)
      localStorage.setItem(chaveNova, entregaLS)
    }
  }

  idEntrega--
  gerarTabela()
}

function retomarCampos(key) {
  entregaSelecionada = JSON.parse(localStorage.getItem(key))
  const dataDesformatada =
  entregaSelecionada.data.split("/")[2] + "-" +
  entregaSelecionada.data.split("/")[1] + "-" +
  entregaSelecionada.data.split("/")[0]
  console.log(dataDesformatada)
  
  document.getElementById("novoNomPro").value = entregaSelecionada.nome
  document.getElementById("novaDescricao").value = entregaSelecionada.descricao
  document.getElementById("novaDataPostagem").value = entregaSelecionada.data
  document.getElementById("cid").value = entregaSelecionada.cidade
  console.log(entregaSelecionada.uf)
  document.getElementById("uf").value = entregaSelecionada.uf
  document.getElementById("cep").value = entregaSelecionada.cep
  document.getElementById("end").value = entregaSelecionada.endereco
  document.getElementById("novoNumCliente").value = entregaSelecionada.num
}

function limparCampos() {
  document.getElementById("nomPro").value = ""
  document.getElementById("desc").value = ""
  document.getElementById("dat").value = ""
  document.getElementById("cid").value = ""
  document.getElementById("uf").value = ""
  document.getElementById("cep").value = ""
  document.getElementById("end").value = ""
  document.getElementById("num").value = ""
}

function apagarTabela() {
  var i = 0
  while (i < localStorage.length) {
    const key = localStorage.key(i)
    if (key.startsWith('cliente_')) {
      localStorage.removeItem(key)
    } else {
      i++
    }
  }
  idCliente = 0
  gerarTabela()
}

function ultimoIdEntrega() {
  var ultimoId = 0
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith('entrega_')) {
      const entrega = JSON.parse(localStorage.getItem(key))
      if (entrega.id > ultimoId) {
        ultimoId = entrega.id
      }
    }
  }

  return ultimoId
}

document.addEventListener('DOMContentLoaded', function() {
  idEntrega = ultimoIdEntrega()
})