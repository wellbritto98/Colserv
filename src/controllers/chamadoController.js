const { ipcMain } = require('electron');
const prisma = require('../db'); // Importar a instância do Prisma
const path = require('path'); // Certifique-se de que path está importado corretamente
const fs = require('fs'); // Importar fs para manipulação de arquivos

const cadastrarChamado = () => {
  ipcMain.handle('cadastro-chamado', async (event, chamadoData) => {
    try {
      const { titulo, descricao, imagem } = chamadoData;
  
      // Converter base64 para buffer
      const base64Data = imagem.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
  
      // Salvar a imagem no diretório
      const chamadosDir = path.join(__dirname, '..', 'chamados');
      if (!fs.existsSync(chamadosDir)) {
        fs.mkdirSync(chamadosDir);
      }
  
      const imagemPath = path.join(chamadosDir, `${Date.now()}_imagem.jpg`);
      fs.writeFileSync(imagemPath, buffer);
  
      // Salvar o chamado no banco de dados
      const newChamado = await prisma.chamado.create({
        data: {
          titulo,
          descricao,
          imagem: imagemPath // Caminho da imagem no disco
        },
      });
  
      return { id: newChamado.id, titulo: newChamado.titulo, descricao: newChamado.descricao, imagem: newChamado.imagem };
    } catch (error) {
      console.error('Erro ao cadastrar chamado:', error);
      throw error;
    }
  });
};

module.exports = { cadastrarChamado };
