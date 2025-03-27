const nomeInput = document.getElementById('nome');
const cargoInput = document.getElementById('cargo');
const cadastrarBotao = document.getElementById('cadastrar');
const listaFuncionariosTabela = document.getElementById('listaFuncionarios');

let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];

function atualizarListaFuncionarios() {
    listaFuncionariosTabela.innerHTML = '';
    funcionarios.forEach(funcionario => {
        const linha = listaFuncionariosTabela.insertRow();
        const colunaNome = linha.insertCell(0);
        const colunaCargo = linha.insertCell(1);

        colunaNome.textContent = funcionario.nome;
        colunaCargo.textContent = funcionario.cargo;
    });
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
}

function cadastrarFuncionario() {
    const nome = nomeInput.value;
    const cargo = cargoInput.value;

    if (nome && cargo) {
        funcionarios.push({ nome, cargo });
        atualizarListaFuncionarios();
        nomeInput.value = '';
        cargoInput.value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

cadastrarBotao.addEventListener('click', cadastrarFuncionario);

atualizarListaFuncionarios();