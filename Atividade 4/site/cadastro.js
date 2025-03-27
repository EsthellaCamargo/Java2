document.addEventListener('DOMContentLoaded', function() {
    const idInput = document.getElementById('id');
    const nomeInput = document.getElementById('nome');
    const cargoInput = document.getElementById('cargo');
    const cadastrarButton = document.getElementById('cadastrar');
    const listaFuncionarios = document.getElementById('listaFuncionarios');

    let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];

    function renderizarFuncionarios() {
        listaFuncionarios.innerHTML = '';
        funcionarios.forEach((funcionario, index) => { // Adiciona o índice como segundo parâmetro
            const newRow = document.createElement('tr');
            const idCell = document.createElement('td');
            const nomeCell = document.createElement('td');
            const cargoCell = document.createElement('td');
            const acoesCell = document.createElement('td'); // Nova célula para o botão
            const removerButton = document.createElement('button'); // Novo botão

            idCell.textContent = funcionario.id;
            nomeCell.textContent = funcionario.nome;
            cargoCell.textContent = funcionario.cargo;

            removerButton.textContent = 'Remover';
            removerButton.classList.add('btn', 'btn-danger', 'btn-sm'); // Adiciona classes Bootstrap
            removerButton.addEventListener('click', function() {
                funcionarios.splice(index, 1); // Remove o funcionário do array
                localStorage.setItem('funcionarios', JSON.stringify(funcionarios)); // Atualiza o localStorage
                renderizarFuncionarios(); // Atualiza a tabela
            });

            acoesCell.appendChild(removerButton); // Adiciona o botão à célula de ações
            newRow.appendChild(idCell);
            newRow.appendChild(nomeCell);
            newRow.appendChild(cargoCell);
            newRow.appendChild(acoesCell); // Adiciona a célula de ações à linha

            listaFuncionarios.appendChild(newRow);
        });
    }

    renderizarFuncionarios();

    cadastrarButton.addEventListener('click', function() {
        const id = idInput.value;
        const nome = nomeInput.value;
        const cargo = cargoInput.value;

        if (id && nome && cargo) {
            funcionarios.push({ id: id, nome: nome, cargo: cargo });
            localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
            renderizarFuncionarios();

            idInput.value = '';
            nomeInput.value = '';
            cargoInput.value = '';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});