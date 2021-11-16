const { ipcRenderer, contextBridge } = require('electron')
const { 
  CHANNELS: { 
    INIT,
    LAUNCH_MTS,
    OPEN_DIALOG,
    FAVORITE,
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
  },
  favorite: (modid) => {
    ipcRenderer.send(FAVORITE, {
      id: modid
    })
  }
})

contextBridge.exposeInMainWorld('ipcRenderer', {
  on: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => {
      callback(...args)
    })
  },
})

window.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById("app-title")
  title.innerText = `Electro MTS v${process.env.npm_package_version}`
})