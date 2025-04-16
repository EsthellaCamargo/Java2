document.addEventListener('DOMContentLoaded', function() {
    const nomeProdutoInput = document.getElementById('nomeProduto');
    const quantidadeInput = document.getElementById('quantidade');
    const adicionarButton = document.getElementById('adicionar');
    const estoqueTableBody = document.querySelector('#estoque tbody');

    let estoque = JSON.parse(localStorage.getItem('estoque')) || [];

    function renderizarEstoque() {
        estoqueTableBody.innerHTML = '';
        estoque.forEach((produto, index) => {
            const newRow = document.createElement('tr');
            const nomeProdutoCell = document.createElement('td');
            const quantidadeCell = document.createElement('td');
            const acoesCell = document.createElement('td');
            const removerButton = document.createElement('button');

            nomeProdutoCell.textContent = produto.nome;
            quantidadeCell.textContent = produto.quantidade;

            removerButton.textContent = 'Remover';
            removerButton.addEventListener('click', function() {
                estoque.splice(index, 1);
                localStorage.setItem('estoque', JSON.stringify(estoque));
                renderizarEstoque();
            });

            acoesCell.appendChild(removerButton);
            newRow.appendChild(nomeProdutoCell);
            newRow.appendChild(quantidadeCell);
            newRow.appendChild(acoesCell);

            estoqueTableBody.appendChild(newRow);
        });
    }

    renderizarEstoque();

    adicionarButton.addEventListener('click', function() {
        const nomeProduto = nomeProdutoInput.value;
        const quantidade = parseInt(quantidadeInput.value);

        if (nomeProduto && !isNaN(quantidade)) {
            const produtoExistente = estoque.find(produto => produto.nome === nomeProduto);
            if (produtoExistente) {
                produtoExistente.quantidade += quantidade;
            } else {
                estoque.push({ nome: nomeProduto, quantidade: quantidade });
            }
            localStorage.setItem('estoque', JSON.stringify(estoque));
            renderizarEstoque();

            nomeProdutoInput.value = '';
            quantidadeInput.value = '';
        } else {
            alert('Por favor, insira um nome de produto válido e uma quantidade numérica.');
        }
    });
});