const { ipcMain } = require('electron')
const { openDialog } = require('../dialog')
const { launch } = require('../mts/launcher')
const { getStateFromPath } = require('../mts/state')

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
}

module.exports = {
  register
}