const { ipcMain } = require('electron')
const { openDialog } = require('../dialog')
const { launch } = require('../mts/launcher')
const { getStateFromPath } = require('../mts/state')
const { getPathDefaults } = require('../mts/path')
const { getModInfos } = require('../mts/modinfos')

const register = (mainWindow) => {
  ipcMain.on('launch-mts', (_e, data) => {
    console.log(data)
    launch(data.stsDir, data.mtsDir)

    // save to disk the stsdir
  })
  
  ipcMain.on('open-dialog', (e, data) => {
    const paths = openDialog(data)
    try {
      const payload = getStateFromPath(paths[0])

      // validate payload

      mainWindow.webContents.send('update-state', payload)
    } catch (e) {
      mainWindow.webContents.send('be-error', e)
    }
  })

  ipcMain.on('init', async (_e, data) => {
    const stsPath = getPathDefaults()
    const pathState = getStateFromPath(stsPath)
    const modList = await getModInfos(pathState)

    console.log(modList.length)

    mainWindow.webContents.send('update-state', {
      ...pathState,
      modList
    })
  })
}

module.exports = {
  register
}