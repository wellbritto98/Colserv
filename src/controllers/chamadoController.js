const { ipcMain } = require('electron');
const prisma = require('../db'); // Importar a instância do Prisma
const fs = require('fs');
const path = require('path');

const cadastrarChamado = () => {
  ipcMain.handle('cadastro-chamado', async (event, chamadoData) => {
    try {
      const { titulo, descricao, imagem } = chamadoData;

      // Diretório onde as imagens serão salvas
      const imageDir = path.join(__dirname, 'images');
      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir); // Cria o diretório se não existir
      }

      // Caminho completo para salvar a imagem
      const imageFileName = `${Date.now()}_${titulo.replace(/\s+/g, '_')}.png`;
      const imagePath = path.join(imageDir, imageFileName);

      // Verifica se a imagem é um buffer e converte para base64, caso necessário
      const imageData = Buffer.isBuffer(imagem) ? imagem.toString('base64') : imagem;

      // Salva a imagem no diretório
      fs.writeFileSync(imagePath, imageData, 'base64');

      // Cria o chamado no banco de dados com o caminho da imagem
      const newChamado = await prisma.chamado.create({
        data: {
          titulo,
          descricao,
          imagem: imagePath, // Armazena o caminho da imagem no banco de dados
          status: 'ABERTO',
        },
      });

      return { 
        id: newChamado.id, 
        titulo: newChamado.titulo, 
        descricao: newChamado.descricao, 
        imagem: newChamado.imagem 
      };
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
      console.log(chamados)
      return chamados;
    } catch (error) {
      console.error('Erro ao buscar chamados:', error);
      throw error;
    }
  });
};

module.exports = { cadastrarChamado, getAllChamados };
