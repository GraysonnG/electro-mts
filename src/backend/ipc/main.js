const { ipcMain } = require('electron')
const { openDialog } = require('../dialog')
const { launch } = require('../mts/launcher')

const register = (mainWindow) => {
  ipcMain.on('launch-mts', (_e, data) => {
    console.log(data)
    launch(data.stsDir, data.workshopDir)

    // save to disk the stsdir
  })
  
  ipcMain.on('open-dialog', (e, data) => {
    const paths = openDialog(data)
    mainWindow.webContents.send('open-dialog-res', { paths })
    // e.returnValue = { paths }
  })
}

module.exports = {
  register
}