const { app } = require("electron")
const path = require('path')
const electronReload = require('electron-reload')
const { createWindow } = require("./src/backend/window")

electronReload(path.join(__dirname, "public"), {})

app.on('ready', () => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})