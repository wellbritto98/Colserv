const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'src', 'chamados')); // Diretório onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Nome do arquivo original
  }
});

const upload = multer({ storage });

// Rota de cadastro de chamado
app.post('/cadastro-chamado', upload.single('imagem'), (req, res) => {
  // Verifica se o arquivo foi enviado
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo foi enviado');
  }

  // Exemplo de como salvar o arquivo no diretório "src/chamados"
  fs.rename(req.file.path, path.join(__dirname, 'src', 'chamados', req.file.originalname), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao salvar a imagem');
    } else {
      res.send('Chamado cadastrado com sucesso');
    }
  });
});

// Outras rotas e configurações do servidor...

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
