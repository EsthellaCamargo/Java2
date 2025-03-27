const nomeProdutoInput = document.getElementById('nomeProduto');
const quantidadeInput = document.getElementById('quantidade');
const precoInput = document.getElementById('preco');
const adicionarBotao = document.getElementById('adicionar');
const produtosVendaTabela = document.getElementById('produtos-venda').getElementsByTagName('tbody')[0];
const valorTotalSpan = document.getElementById('valor-total');
const historicoVendasTabela = document.getElementById('historico-vendas').getElementsByTagName('tbody')[0];
const finalizarBotao = document.getElementById('finalizar');
const estoqueTabela = document.getElementById('estoque').getElementsByTagName('tbody')[0];

let produtosVenda = [];
let historicoVendas = JSON.parse(localStorage.getItem('historicoVendas')) || [];
let estoque = JSON.parse(localStorage.getItem('estoque')) || [];

function atualizarEstoqueTabela() {
    estoqueTabela.innerHTML = '';
    estoque.forEach(produto => {
        let linha = estoqueTabela.insertRow();
        let colunaNome = linha.insertCell(0);
        let colunaQuantidade = linha.insertCell(1);

        colunaNome.textContent = produto.nome;
        colunaQuantidade.textContent = produto.quantidade;
    });
}

function atualizarProdutosVenda() {
    produtosVendaTabela.innerHTML = '';
    let total = 0;
    produtosVenda.forEach(produto => {
        let linha = produtosVendaTabela.insertRow();
        let colunaNome = linha.insertCell(0);
        let colunaQuantidade = linha.insertCell(1);
        let colunaPreco = linha.insertCell(2);
        let colunaTotal = linha.insertCell(3);

        colunaNome.textContent = produto.nome;
        colunaQuantidade.textContent = produto.quantidade;
        colunaPreco.textContent = produto.preco.toFixed(2);
        colunaTotal.textContent = produto.total.toFixed(2);

        total += produto.total;
    });
    valorTotalSpan.textContent = total.toFixed(2);
}

function adicionarProduto() {
    const nome = nomeProdutoInput.value;
    const quantidade = parseInt(quantidadeInput.value);
    const preco = parseFloat(precoInput.value);

    if (nome && quantidade > 0 && preco > 0) {
        const total = quantidade * preco;
        produtosVenda.push({ nome, quantidade, preco, total });
        atualizarProdutosVenda();
        nomeProdutoInput.value = '';
        quantidadeInput.value = '';
        precoInput.value = '';
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function finalizarVenda() {
    const data = new Date().toLocaleString();
    produtosVenda.forEach(produto => {
        historicoVendas.push({ ...produto, data });
        atualizarEstoque(produto.nome, produto.quantidade);
    });
    localStorage.setItem('historicoVendas', JSON.stringify(historicoVendas));
    produtosVenda = [];
    atualizarProdutosVenda();
    atualizarHistoricoVendas();
}

function atualizarEstoque(nomeProduto, quantidadeVendida) {
    estoque = estoque.map(produto => {
        if (produto.nome === nomeProduto) {
            produto.quantidade -= quantidadeVendida;
        }
        return produto;
    });
    localStorage.setItem('estoque', JSON.stringify(estoque));
    atualizarEstoqueTabela();
}

function atualizarHistoricoVendas() {
    historicoVendasTabela.innerHTML = '';
    historicoVendas.forEach(venda => {
        let linha = historicoVendasTabela.insertRow();
        let colunaNome = linha.insertCell(0);
        let colunaQuantidade = linha.insertCell(1);
        let colunaPreco = linha.insertCell(2);
        let colunaTotal = linha.insertCell(3);
        let colunaData = linha.insertCell(4);

        colunaNome.textContent = venda.nome;
        colunaQuantidade.textContent = venda.quantidade;
        colunaPreco.textContent = venda.preco.toFixed(2);
        colunaTotal.textContent = venda.total.toFixed(2);
        colunaData.textContent = venda.data;
    });
}

adicionarBotao.addEventListener('click', adicionarProduto);
finalizarBotao.addEventListener('click', finalizarVenda);

atualizarEstoqueTabela();
atualizarProdutosVenda();
atualizarHistoricoVendas();