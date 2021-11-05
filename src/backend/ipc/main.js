const { ipcMain } = require('electron')
const fs = require('fs')
const { openDialog } = require('../dialog')
const { launch } = require('../mts/launcher')
const { getPathDefaults } = require('../mts/path')
const { loadModInfos } = require('../mts/loader')
const { saveProfiles } = require('../mts/profiles')

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
  })

  ipcMain.on(INIT, async (_e, _data) => {
    const stsPaths = getPathDefaults()

    for (let path of stsPaths) {
      if (fs.existsSync(path)) {
        loadModInfos(path, mainWindow)
        return;
      }
    }

    mainWindow.webContents.send(UPDATE_STATE, {
      error: CANT_FIND_STS
    })
  })
}

module.exports = {
  register
}