const { ipcMain } = require('electron')
const { openDialog } = require('../dialog')
const { launch } = require('../mts/launcher')
const { loadModInfos } = require('../mts/loader')
const { saveProfiles } = require('../mts/profiles')
const { saveConfigData, config } = require('../config')

const { 
  CHANNELS: { 
    INIT,
    LAUNCH_MTS,
    OPEN_DIALOG,
    FAVORITE,
    WINDOW_EVENT,
    SAVE_PROFILES,
    REFRESH_MODS,
  },
} = require('../../common/constants')
const { handleWindowEvent } = require('./window')
const { init, refresh } = require('../emts')

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

  ipcMain.on(INIT, (_e, _data) => {
    init(mainWindow)
  })

  ipcMain.on(REFRESH_MODS, (_e, _data) => {
    refresh(mainWindow)
  })

  ipcMain.on(FAVORITE, async (_e, data) => {
    const favorites = config.data.favorites

    if (favorites.includes(data.id)) {
      const index = favorites.indexOf(data.id)
      if (index > -1) {
        favorites.splice(index, 1)
      }
    } else {
      favorites.push(data.id)
    }

    saveConfigData({favorites})
  })

  ipcMain.on(WINDOW_EVENT, (_e, data) => {
    handleWindowEvent(mainWindow, data.type)
  })

  ipcMain.on(SAVE_PROFILES, async (_e, profiles) => {
    await saveProfiles(profiles)
  })
}

module.exports = {
  register
}