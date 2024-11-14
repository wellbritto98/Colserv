const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { registerIpcHandlers } = require('./controllers/userController');
const { cadastrarChamado, getAllChamados, atualizarChamado } = require('./controllers/chamadoController');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Verificar estado de login antes de carregar a página
  mainWindow.once('ready-to-show', async () => {
    console.log('Verificando estado de login...');
    const userCredentials = await mainWindow.webContents.executeJavaScript('localStorage.getItem("userCredentials")');
    console.log('Estado de login:', userCredentials);
    if (userCredentials) {
      console.log('Usuário logado, redirecionando para homepage...');
      await mainWindow.loadFile(path.join(__dirname, 'pages', 'homepage.html'));
    } else {
      console.log('Nenhum usuário logado, redirecionando para signin...');
      await mainWindow.loadFile(path.join(__dirname, 'pages', 'signin.html'));
    }
  });
    

  // Load the index.html of the app.
  await mainWindow.loadFile(path.join(__dirname, 'pages', 'signin.html'));

  // Load the index.html of the app.
  await mainWindow.loadFile(path.join(__dirname, 'pages', 'signin.html'));

 
};

app.whenReady().then(() => {
  createWindow();
  registerIpcHandlers(); // Registrar handlers do IPC
  cadastrarChamado(); // Cadastrar chamado
  getAllChamados(); // Buscar todos os chamados
  atualizarChamado(); // Atualizar chamado

  // No macOS, reabra a janela quando o ícone do dock for clicado e não houver outras janelas abertas.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Feche o aplicativo quando todas as janelas forem fechadas, exceto no macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});