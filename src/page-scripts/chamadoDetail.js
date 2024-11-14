document.addEventListener("DOMContentLoaded", () => {
    // Recupera o chamado armazenado no localStorage
    const chamado = JSON.parse(localStorage.getItem("chamado"));
    const atualizarBtn = document.getElementById("atualizar-btn");

    // Valores originais para comparação
    const tituloOriginal = chamado.titulo;
    const descricaoOriginal = chamado.descricao;
    const statusOriginal = chamado.status;
    const imagemOriginal = chamado.imagem;

    if (chamado) {
        // Preenche os campos do formulário com os dados do chamado
        document.getElementById("titulo").value = chamado.titulo;
        document.getElementById("descricao").value = chamado.descricao;
        document.getElementById("status").value = chamado.status;
        document.getElementById("createdAt").value = new Date(chamado.createdAt).toLocaleDateString();

        // Configura a imagem, se existir
        const imagemElement = document.getElementById("imagem");
        if (chamado.imagem) {
            imagemElement.src = `file://${chamado.imagem}`; // URL absoluta para garantir o carregamento
            console.log("Imagem carregada:", imagemElement.src); // Log para verificar o caminho da imagem
        } else {
            imagemElement.alt = "Imagem não disponível";
            console.log("Imagem não disponível no chamado.");
        }
    } else {
        console.error("Chamado não encontrado no localStorage.");
    }

    // Função para verificar mudanças nos campos e habilitar/desabilitar o botão
    function checkForChanges() {
        const tituloAtual = document.getElementById("titulo").value;
        const descricaoAtual = document.getElementById("descricao").value;
        const statusAtual = document.getElementById("status").value;
        const imagemAtual = document.getElementById("imagem").src;

        // Habilita o botão se algum campo for diferente do valor original
        atualizarBtn.disabled = !(
            tituloAtual !== tituloOriginal ||
            descricaoAtual !== descricaoOriginal ||
            statusAtual !== statusOriginal ||
            imagemAtual !== imagemOriginal
        );
    }

    // Monitora mudanças em cada campo para habilitar/desabilitar o botão "Atualizar"
    document.getElementById("titulo").addEventListener("input", checkForChanges);
    document.getElementById("descricao").addEventListener("input", checkForChanges);
    document.getElementById("status").addEventListener("input", checkForChanges);

    // Previsualização da nova imagem selecionada e habilitação do botão
    document.getElementById("imagemInput").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("imagem").src = e.target.result; // Atualiza a imagem de visualização
                checkForChanges(); // Verifica se a imagem foi alterada
            };
            reader.readAsDataURL(file);
        }
    });

    // Lógica do botão "Atualizar"
    atualizarBtn.addEventListener("click", async () => {
        const titulo = document.getElementById("titulo").value;
        const descricao = document.getElementById("descricao").value;
        const status = document.getElementById("status").value;
        const imagem = document.getElementById("imagem").src;

        try {
            // Chama o método de atualização da API do Electron
            const updatedChamado = await window.electronAPI.atualizarChamado({
                id: chamado.id,
                titulo,
                descricao,
                status,
                imagem,
            });

            console.log("Chamado atualizado com sucesso:", updatedChamado);

            // Atualiza o localStorage com o chamado atualizado
            localStorage.setItem("chamado", JSON.stringify(updatedChamado));
            atualizarBtn.disabled = true; // Desabilita o botão novamente após a atualização

            // Exibe a mensagem de sucesso
            showSuccessAlert("Chamado atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o chamado:", error);

            // Exibe a mensagem de erro
            showErrorAlert("Erro ao atualizar o chamado. Tente novamente.");
        }
    });
});

// Funções de alerta de sucesso e erro
function showSuccessAlert(message) {
    const successAlert = document.getElementById('success-alert');
    const successMessage = document.getElementById('success-message');
    successMessage.textContent = message;
    successAlert.classList.remove('hidden');
}

function showErrorAlert(message) {
    const errorAlert = document.getElementById('error-alert');
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorAlert.classList.remove('hidden');
}
