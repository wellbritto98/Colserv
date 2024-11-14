const { ipcMain } = require('electron');
const prisma = require('../db'); // Importar a instância do Prisma
const fs = require('fs');
const path = require('path');

// Função para cadastrar um chamado
const cadastrarChamado = () => {
  ipcMain.handle('cadastro-chamado', async (event, chamadoData) => {
    try {
      const { titulo, descricao, imagem } = chamadoData;

      const imageDir = path.join(__dirname, 'images');
      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir);
      }

      const imageFileName = `${Date.now()}_${titulo.replace(/\s+/g, '_')}.png`;
      const imagePath = path.join(imageDir, imageFileName);
      const imageData = Buffer.isBuffer(imagem) ? imagem.toString('base64') : imagem;
      fs.writeFileSync(imagePath, imageData, 'base64');

      const newChamado = await prisma.chamado.create({
        data: {
          titulo,
          descricao,
          imagem: imagePath,
          status: 'ABERTO',
        },
      });

      return { id: newChamado.id, titulo: newChamado.titulo, descricao: newChamado.descricao, imagem: newChamado.imagem };
    } catch (error) {
      console.error('Erro ao cadastrar chamado:', error);
      throw error;
    }
  });
};

// Função para buscar todos os chamados
const getAllChamados = () => {
  ipcMain.handle('get-chamados', async (event) => {
    try {
      const chamados = await prisma.chamado.findMany();
      console.log(chamados);
      return chamados;
    } catch (error) {
      console.error('Erro ao buscar chamados:', error);
      throw error;
    }
  });
};

// Função para atualizar um chamado existente
const atualizarChamado = () => {
  ipcMain.handle('atualizar-chamado', async (event, { id, titulo, descricao, status, imagem }) => {
    try {
      const updateData = { titulo, descricao, status };

      // Verifica se há uma nova imagem para atualizar
      if (imagem) {
        const imageDir = path.join(__dirname, 'images');
        if (!fs.existsSync(imageDir)) {
          fs.mkdirSync(imageDir);
        }

        const imageFileName = `${Date.now()}_${titulo.replace(/\s+/g, '_')}.png`;
        const imagePath = path.join(imageDir, imageFileName);
        const imageData = Buffer.isBuffer(imagem) ? imagem.toString('base64') : imagem;
        fs.writeFileSync(imagePath, imageData, 'base64');

        // Adiciona o caminho da nova imagem ao objeto de atualização
        updateData.imagem = imagePath;
      }

      // Atualiza o chamado no banco de dados
      const updatedChamado = await prisma.chamado.update({
        where: { id },
        data: updateData,
      });

      return updatedChamado;
    } catch (error) {
      console.error('Erro ao atualizar chamado:', error);
      throw error;
    }
  });
};

module.exports = { cadastrarChamado, getAllChamados, atualizarChamado };
