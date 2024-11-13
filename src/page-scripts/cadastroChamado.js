const form = document.getElementById('cadastro-chamado');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const titulo = form.titulo.value;
  const descricao = form.descricao.value;
  const imagem = form.imagem.files[0];

  console.log("Dados do chamado:");
  console.log("Título:", titulo);
  console.log("Descrição:", descricao);
  console.log("Imagem:", imagem);

  try {
    const chamadoData = await window.electronAPI.cadastrarChamado({
      titulo,
      descricao,
      imagem
    });

    alert('Chamado registrado com sucesso:', chamadoData);
    window.location.href = '../pages/homepage.html';
  } catch (error) {
    console.error('Erro ao cadastrar chamado:', error);
  }
});
