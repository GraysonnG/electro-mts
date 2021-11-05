const { ipcMain } = require('electron')
const { openDialog } = require('../dialog')
const { launch } = require('../mts/launcher')
const { getPathDefaults } = require('../mts/path')
const { loadModInfos } = require('../mts/loader')
const { saveProfiles } = require('../mts/profiles')

const register = (mainWindow) => {
  ipcMain.on('launch-mts', async (_e, data) => {
    await saveProfiles(data.profiles)

    launch(data.stsDir, data.mtsDir, data.profiles.defaultList || "<default>")
  })
  
  ipcMain.on('open-dialog', async (e, data) => {
    const paths = openDialog(data)
    loadModInfos(paths[0], mainWindow)
  })

  ipcMain.on('init', async (_e, _data) => {
    const stsPath = getPathDefaults()
    loadModInfos(stsPath, mainWindow)
  })
}

module.exports = {
  register
}