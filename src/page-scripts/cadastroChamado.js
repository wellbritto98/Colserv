const form = document.getElementById('cadastro-chamado');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const titulo = form.titulo.value;
  const descricao = form.descricao.value;

  console.log("Dados do chamado:");
  console.log("Título:", titulo);
  console.log("Descrição:", descricao);

  try {
    const chamadoData = await window.electronAPI.cadastrarChamado({
      titulo,
      descricao,
    });

    alert('Chamado registrado com sucesso:', chamadoData);
    window.location.href = '../pages/homepage.html';
  } catch (error) {
    console.error('Erro ao cadastrar chamado:', error);
  }
});
