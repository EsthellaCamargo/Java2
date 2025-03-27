document.addEventListener('DOMContentLoaded', function() {
    const nomeFuncionarioInput = document.getElementById('nomeFuncionario');
    const nomeProdutoInput = document.getElementById('nomeProduto');
    const quantidadeInput = document.getElementById('quantidade');
    const precoInput = document.getElementById('preco');
    const adicionarButton = document.getElementById('adicionar');
    const produtosVendaTableBody = document.querySelector('#produtos-venda tbody');
    const valorTotalSpan = document.getElementById('valor-total');
    const finalizarButton = document.getElementById('finalizar');
    const historicoVendasTableBody = document.querySelector('#historico-vendas tbody');
    const estoqueTableBody = document.querySelector('#estoque tbody');

    let totalVenda = 0;
    let vendaAtual = [];

    function atualizarEstoqueTabela() {
        let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
        estoqueTableBody.innerHTML = ''; // Limpa a tabela

        estoque.forEach(produto => {
            const newRow = document.createElement('tr');
            const nomeProdutoCell = document.createElement('td');
            const quantidadeCell = document.createElement('td');

            nomeProdutoCell.textContent = produto.nome;
            quantidadeCell.textContent = produto.quantidade;

            newRow.appendChild(nomeProdutoCell);
            newRow.appendChild(quantidadeCell);
            estoqueTableBody.appendChild(newRow);
        });
    }

    atualizarEstoqueTabela(); // Carrega o estoque inicial na tabela

    adicionarButton.addEventListener('click', function() {
        const nomeFuncionario = nomeFuncionarioInput.value;
        const nomeProduto = nomeProdutoInput.value;
        const quantidade = parseInt(quantidadeInput.value);
        const preco = parseFloat(precoInput.value);

        if (nomeProduto && !isNaN(quantidade) && !isNaN(preco)) {
            let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
            const produtoEstoque = estoque.find(produto => produto.nome === nomeProduto);

            if (!produtoEstoque || produtoEstoque.quantidade < quantidade) {
                alert(`Estoque insuficiente para ${nomeProduto}.`);
                return;
            }

            const totalProduto = quantidade * preco;

            const newRow = document.createElement('tr');
            const nomeProdutoCell = document.createElement('td');
            const quantidadeCell = document.createElement('td');
            const precoCell = document.createElement('td');
            const totalCell = document.createElement('td');

            nomeProdutoCell.textContent = nomeProduto;
            quantidadeCell.textContent = quantidade;
            precoCell.textContent = preco.toFixed(2);
            totalCell.textContent = totalProduto.toFixed(2);

            newRow.appendChild(nomeProdutoCell);
            newRow.appendChild(quantidadeCell);
            newRow.appendChild(precoCell);
            newRow.appendChild(totalCell);

            produtosVendaTableBody.appendChild(newRow);

            totalVenda += totalProduto;
            valorTotalSpan.textContent = totalVenda.toFixed(2);

            vendaAtual.push({
                nomeFuncionario: nomeFuncionario,
                nomeProduto: nomeProduto,
                quantidade: quantidade,
                preco: preco,
                total: totalProduto
            });

            nomeProdutoInput.value = '';
            quantidadeInput.value = '';
            precoInput.value = '';
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });

    finalizarButton.addEventListener('click', function() {
        if (vendaAtual.length > 0) {
            const dataVenda = new Date();
            const dataFormatada = dataVenda.toLocaleString();

            vendaAtual.forEach(item => {
                const newRowHistorico = document.createElement('tr');
                const nomeFuncionarioCell = document.createElement('td');
                const nomeProdutoCell = document.createElement('td');
                const quantidadeCell = document.createElement('td');
                const precoCell = document.createElement('td');
                const totalCell = document.createElement('td');
                const dataCell = document.createElement('td');

                nomeFuncionarioCell.textContent = item.nomeFuncionario;
                nomeProdutoCell.textContent = item.nomeProduto;
                quantidadeCell.textContent = item.quantidade;
                precoCell.textContent = item.preco.toFixed(2);
                totalCell.textContent = item.total.toFixed(2);
                dataCell.textContent = dataFormatada;

                newRowHistorico.appendChild(nomeFuncionarioCell);
                newRowHistorico.appendChild(nomeProdutoCell);
                newRowHistorico.appendChild(quantidadeCell);
                newRowHistorico.appendChild(precoCell);
                newRowHistorico.appendChild(totalCell);
                newRowHistorico.appendChild(dataCell);

                historicoVendasTableBody.appendChild(newRowHistorico);

                atualizarEstoque(item.nomeProduto, item.quantidade);
            });

            produtosVendaTableBody.innerHTML = '';
            totalVenda = 0;
            valorTotalSpan.textContent = '0.00';
            vendaAtual = [];
        } else {
            alert('Adicione produtos à venda antes de finalizar.');
        }
    });

    function atualizarEstoque(nomeProduto, quantidadeVendida) {
        let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
        const produtoEstoque = estoque.find(produto => produto.nome === nomeProduto);

        if (produtoEstoque) {
            produtoEstoque.quantidade -= quantidadeVendida;
            localStorage.setItem('estoque', JSON.stringify(estoque));
            atualizarEstoqueTabela(); // Atualiza a tabela de estoque
        }
    }
});