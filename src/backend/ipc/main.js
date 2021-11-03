const { ipcMain } = require('electron')
const { launch } = require('../mts/launcher')

ipcMain.on('launch-mts', (_e, data) => {
  console.log(data)
  launch(null, null)
})