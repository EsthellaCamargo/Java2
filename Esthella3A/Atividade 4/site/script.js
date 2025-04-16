document.addEventListener('DOMContentLoaded', function() {
    const cadastroBtn = document.querySelector('a[href="cadastro.html"]');
    const estoqueBtn = document.querySelector('a[href="estoque.html"]');
    const vendasBtn = document.querySelector('a[href="vendas.html"]');

    cadastroBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do link
        window.location.href = 'cadastro.html'; // Redireciona para cadastro.html
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