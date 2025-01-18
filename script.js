// Função para adicionar indicações
function adicionarIndicado() {
    let nome = document.getElementById('nome').value;
    let indicacoes = parseInt(document.getElementById('indicacoes').value);

    if (!nome || isNaN(indicacoes) || indicacoes <= 0) {
        alert("Por favor, preencha corretamente os campos!");
        return;
    }

    // Mensagem de confirmação antes de adicionar
    let confirmacao = confirm("Tem certeza que deseja adicionar as indicações?");
    if (!confirmacao) return;

    // Recupera os dados armazenados
    let dadosIndicacoes = JSON.parse(localStorage.getItem('indicacoes')) || [];

    // Verifica se o nome já existe e atualiza as indicações
    let pessoaExistente = dadosIndicacoes.find(p => p.nome === nome);
    if (pessoaExistente) {
        pessoaExistente.indicacoes += indicacoes;
    } else {
        dadosIndicacoes.push({ nome: nome, indicacoes: indicacoes });
    }

    // Salva novamente os dados no localStorage
    localStorage.setItem('indicacoes', JSON.stringify(dadosIndicacoes));

    // Atualiza a lista e o total de indicações
    atualizarLista();
}

// Função para atualizar a lista de indicações
function atualizarLista() {
    let dadosIndicacoes = JSON.parse(localStorage.getItem('indicacoes')) || [];
    let lista = document.getElementById('listaIndicacoes');
    let totalIndicacoes = 0;

    // Limpa a lista existente
    lista.innerHTML = '';

    // Adiciona cada pessoa na lista
    dadosIndicacoes.forEach((pessoa, index) => {
        let li = document.createElement('li');
        li.textContent = `${pessoa.nome} - Indicações: ${pessoa.indicacoes}`;

        // Botão de deletar
        let botaoDeletar = document.createElement('button');
        botaoDeletar.textContent = 'Deletar';
        botaoDeletar.classList.add('deletar');
        botaoDeletar.onclick = () => deletarIndicado(index);

        // Adiciona o botão de deletar ao item da lista
        li.appendChild(botaoDeletar);
        lista.appendChild(li);

        totalIndicacoes += pessoa.indicacoes;
    });

    // Atualiza o total de indicações
    document.getElementById('totalIndicacoes').textContent = totalIndicacoes;
}

// Função para deletar indicação
function deletarIndicado(index) {
    let confirmacao = confirm("Tem certeza que deseja deletar essa indicação?");
    if (!confirmacao) return;

    // Recupera os dados armazenados
    let dadosIndicacoes = JSON.parse(localStorage.getItem('indicacoes')) || [];

    // Deleta o item
    dadosIndicacoes.splice(index, 1);

    // Salva novamente os dados no localStorage
    localStorage.setItem('indicacoes', JSON.stringify(dadosIndicacoes));

    // Atualiza a lista e o total de indicações
    atualizarLista();
}

// Inicializa a lista de indicações quando a página carregar
window.onload = function() {
    atualizarLista();
};

