const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('launcher', {
  launchMts: (data) => {
    ipcRenderer.send('launch-mts', data)
  },
  openDialog: (data) => {
    ipcRenderer.send('open-dialog', data)
  },
  init: () => {
    ipcRenderer.send('init', {})
  }
})

contextBridge.exposeInMainWorld('ipcRenderer', {
  on: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => {
      console.log(args)
      callback(...args)
    })
  },
})