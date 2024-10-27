const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  registerUser: (userData) => ipcRenderer.invoke('register-user', userData),
  cadastrarChamado: (chamadoData) => ipcRenderer.invoke('cadastro-chamado', chamadoData),
});
