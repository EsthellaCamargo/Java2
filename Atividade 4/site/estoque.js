const nomeProdutoInput = document.getElementById('nomeProduto');
const quantidadeInput = document.getElementById('quantidade');
const adicionarBotao = document.getElementById('adicionar');
const estoqueTabela = document.getElementById('estoque').getElementsByTagName('tbody')[0];

let estoque = JSON.parse(localStorage.getItem('estoque')) || [];

function atualizarEstoqueTabela() {
    estoqueTabela.innerHTML = '';
    estoque.forEach((produto, index) => {
        let linha = estoqueTabela.insertRow();
        let colunaNome = linha.insertCell(0);
        let colunaQuantidade = linha.insertCell(1);
        let colunaAcoes = linha.insertCell(2);

        colunaNome.textContent = produto.nome;
        colunaQuantidade.textContent = produto.quantidade;
        colunaAcoes.innerHTML = `<button onclick="removerProduto(${index})">Remover</button>`;
    });
    localStorage.setItem('estoque', JSON.stringify(estoque));
}

function adicionarProduto() {
    const nome = nomeProdutoInput.value;
    const quantidade = parseInt(quantidadeInput.value);

    if (nome && quantidade > 0) {
        estoque.push({ nome, quantidade });
        atualizarEstoqueTabela();
        nomeProdutoInput.value = '';
        quantidadeInput.value = '';
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function removerProduto(index) {
    estoque.splice(index, 1);
    atualizarEstoqueTabela();
}

adicionarBotao.addEventListener('click', adicionarProduto);

atualizarEstoqueTabela();