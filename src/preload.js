const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  registerUser: (userData) => ipcRenderer.invoke('register-user', userData),
  loginUser: (userData) => ipcRenderer.invoke('login-user', userData),
  listUsers: () => ipcRenderer.invoke('list-users'),
});
