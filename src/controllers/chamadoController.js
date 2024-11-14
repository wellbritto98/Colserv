const { ipcMain } = require('electron');
const prisma = require('../db'); // Importar a instância do Prisma

const cadastrarChamado = () => {
  ipcMain.handle('cadastro-chamado', async (event, chamadoData) => {
    try {
      const { titulo, descricao, imagem} = chamadoData;

      // Cria o chamado no banco de dados
      const newChamado = await prisma.chamado.create({
        data: {
          titulo,
          descricao,
          imagem: imagem,
        },
      });

      return { id: newChamado.id, titulo: newChamado.titulo, descricao: newChamado.descricao, imagem: newChamado.imagem};
    } catch (error) {
      console.error('Erro ao cadastrar chamado:', error);
      throw error;
    }
  });
};

const getAllChamados = () => {
  ipcMain.handle('get-chamados', async (event) => {
    try {
      const chamados = await prisma.chamado.findMany();

      return chamados;
    } catch (error) {
      console.error('Erro ao buscar chamados:', error);
      throw error;
    }
  });
};

module.exports = { cadastrarChamado, getAllChamados };
