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

  if (imagem) {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1]; // Obtém a string base64 após a vírgula

      try {
        const chamadoData = await window.electronAPI.cadastrarChamado({
          titulo,
          descricao,
          imagem: base64Image // Passa a imagem como string base64
        });

        alert('Chamado registrado com sucesso:', chamadoData);
        window.location.href = '../pages/homepage.html';
      } catch (error) {
        console.error('Erro ao cadastrar chamado:', error);
      }
    };

    reader.readAsDataURL(imagem); // Converte a imagem em base64
  } else {
    alert('Por favor, selecione uma imagem.');
  }
});
