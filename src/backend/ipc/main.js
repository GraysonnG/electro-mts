const { ipcMain } = require('electron')
const fs = require('fs')
const { openDialog } = require('../dialog')
const { launch } = require('../mts/launcher')
const { getPathDefaults } = require('../mts/path')
const { loadModInfos } = require('../mts/loader')
const { saveProfiles } = require('../mts/profiles')
const { saveConfigData, config, loadConfigData } = require('../mts/emtsconfig')

const { 
  CHANNELS: { 
    INIT,
    LAUNCH_MTS,
    OPEN_DIALOG,
    UPDATE_STATE,
  }, 
  ERROR: {
    CANT_FIND_STS
  } 
} = require('../../common/constants')


const register = (mainWindow) => {
  ipcMain.on(LAUNCH_MTS, async (_e, data) => {
    await saveProfiles(data.profiles)

    launch(data.stsDir, data.mtsDir, data.profiles.defaultList || "<default>")
  })
  
  ipcMain.on(OPEN_DIALOG, async (e, data) => {
    const paths = openDialog(data)
    loadModInfos(paths[0], mainWindow)
    saveConfigData({
      stsFolderLoc: paths[0]
    })
  })

  ipcMain.on(INIT, async (_e, _data) => {
    await loadConfigData()
    const stsPaths = getPathDefaults()

    if (config.data.stsFolderLoc && config.data.stsFolderLoc !== "") {
      stsPaths.push(config.data.stsFolderLoc)
    }

    try {
      for (let path of stsPaths) {
        if (fs.existsSync(path)) {
          loadModInfos(path, mainWindow)
          saveConfigData({
            stsFolderLoc: path
          })
          return;
        }
      }

      mainWindow.webContents.send(UPDATE_STATE, {
        error: CANT_FIND_STS
      })
    } catch (e) {
      console.error(e)
      mainWindow.webContents.send(UPDATE_STATE, {
        error: e
      })
    }
  })
}

module.exports = {
  register
}