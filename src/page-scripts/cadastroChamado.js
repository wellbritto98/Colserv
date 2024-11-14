const form = document.getElementById('cadastro-chamado');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const titulo = form.titulo.value;
  const descricao = form.descricao.value;
  const imagem = form.imagem.files[0];

  // Converter a imagem para base64
  const reader = new FileReader();
  reader.readAsDataURL(imagem);

  reader.onload = async () => {
    try {
      const chamadoData = await window.electronAPI.cadastrarChamado({
        titulo,
        descricao,
        imagem: reader.result // Enviando a imagem como base64
      });

      alert('Chamado registrado com sucesso:', chamadoData);
      window.location.href = '../pages/homepage.html';
    } catch (error) {
      console.error('Erro ao cadastrar chamado:', error);
    }
  };

  reader.onerror = (error) => {
    console.error('Erro ao ler a imagem:', error);
  };
});

