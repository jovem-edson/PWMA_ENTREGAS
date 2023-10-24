var idProduto = 0;
var nomeProduto
var precoProduto

var produtos = []


console.log(produtos)

function adicionarProduto() {

  idProduto++;
  nomeProduto = document.getElementById("nomeProduto").value;
  precoProduto = Number(document.getElementById("precoProduto").value);

  if (nomeProduto && precoProduto) {
    produtos.push({
      id: idProduto,
      nome: nomeProduto,
      preco: precoProduto
    });
    gerarTabela()

  } else {
    alert("Por favor, preencha os campos corretamente.");
  }



  console.log(tabela.innerHTML)
}


function gerarTabela() {
  var tabela = document.getElementById("tabela");
  tabela.innerHTML = ""
  nomeProduto.value = ""
  precoProduto.value = ""

  for (var i = 0; i < produtos.length; i++) {
    tabela.innerHTML +=
      `<tr>
                <td class="center">${produtos[i].id}</td>
                <td>${produtos[i].nome}</td>
                <td>${produtos[i].preco} R$</td>
                <td class="center">
                    <img onclick="alterarProduto(${i})" src="img/editar.png">
                    <img onclick="removerProduto(${i})" src="img/bin.png">
                </td>
            </tr>`;
  }
}




function alterarProduto(posicao) {
  alert("Alterar Produto");
  const novoNome = document.getElementById("nomeProduto")
  const novoPreco = document.getElementById("precoProduto")


  produtos[posicao].nome = prompt("Digite o novo nome do produto");
  produtos[posicao].preco = Number(prompt("Digite o novo preço do produto"));


  novoNome.value = produtos[posicao].nome
  novoPreco.value = produtos[posicao].preco

  if (novoNome.value && novoPreco.value) {
    produtos[posicao] = {
      id: produtos[posicao].id,
      nome: novoNome.value,
      preco: Number(novoPreco.value)
    };

    gerarTabela()
  } else {
    alert("Por favor, preencha os campos corretamente.");
  }


}

function removerProduto(index) {
  produtos.splice(index, 1);
  gerarTabela()
}