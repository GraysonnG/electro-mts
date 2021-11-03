const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('launcher', {
  launchMts: (data) => {
    ipcRenderer.send('launch-mts', data)
  }
})
