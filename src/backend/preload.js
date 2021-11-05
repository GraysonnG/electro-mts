const { ipcRenderer, contextBridge } = require('electron')
const { 
  CHANNELS: { 
    INIT,
    LAUNCH_MTS,
    OPEN_DIALOG,
  }
} = require('../common/constants')

contextBridge.exposeInMainWorld('launcher', {
  launchMts: (data) => {
    ipcRenderer.send(LAUNCH_MTS, data)
  },
  openDialog: (data) => {
    ipcRenderer.send(OPEN_DIALOG, data)
  },
  init: () => {
    ipcRenderer.send(INIT, {})
  }
})

contextBridge.exposeInMainWorld('ipcRenderer', {
  on: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => {
      callback(...args)
    })
  },
})