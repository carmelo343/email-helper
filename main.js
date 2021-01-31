require('electron-reloader')(module);
const { app, BrowserWindow, ipcMain } = require('electron');
const emailFactory = require('./email-factory');

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();;
  }
});


ipcMain.on('create-email', (e, formData) => {
  let email = emailFactory.createEmail(formData);
  e.sender.send('create-email-success', email);
});