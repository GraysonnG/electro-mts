const { ipcMain } = require('electron')
const { openDialog } = require('../dialog')
const { launch } = require('../mts/launcher')
const { getPathDefaults } = require('../mts/path')
const { loadModInfos } = require('../mts/loader')

const register = (mainWindow) => {
  ipcMain.on('launch-mts', (_e, data) => {
    console.log(data)
    launch(data.stsDir, data.mtsDir)
  })
  
  ipcMain.on('open-dialog', async (e, data) => {
    const paths = openDialog(data)
    loadModInfos(paths[0], mainWindow)
  })

  ipcMain.on('init', async (_e, data) => {
    const stsPath = getPathDefaults()
    loadModInfos(stsPath, mainWindow)
  })
}

module.exports = {
  register
}