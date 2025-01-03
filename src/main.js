const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const { registerIpcHandlers } = require('./controllers/userController');

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
    const userCredentials = await mainWindow.webContents.executeJavaScript('localStorage.getItem("userCredentials")');
    if (userCredentials) {
      mainWindow.loadFile(path.join(__dirname, 'pages', 'signin.html'));
    } else {
      mainWindow.loadFile(path.join(__dirname, 'pages', 'signin.html'));
    }
  });

  // Load the index.html of the app.

  await mainWindow.loadFile(path.join(__dirname, 'pages', 'signin.html'));


  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  registerIpcHandlers(); // Registrar handlers do IPC

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