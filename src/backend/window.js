const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  })

  mainWindow.loadFile(path.join(__dirname, "..", "..", "public", "index.html"))
  mainWindow.removeMenu()
  if (process.env.ROLLUP_WATCH) {
    mainWindow.webContents.openDevTools()
  }

  require("./ipc/main").register(mainWindow)

  return mainWindow
}

module.exports = {
  createWindow
}