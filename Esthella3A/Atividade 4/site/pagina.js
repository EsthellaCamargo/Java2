document.addEventListener('DOMContentLoaded', function() {
    const cadastroBtn = document.getElementById('cadastroBtn');
    const estoqueBtn = document.getElementById('estoqueBtn');
    const vendasBtn = document.getElementById('vendasBtn');

    cadastroBtn.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'cadastro.html';
    });

    estoqueBtn.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'estoque.html';
    });

    vendasBtn.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'vendas.html';
    });
});