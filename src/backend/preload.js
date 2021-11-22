const { ipcRenderer, contextBridge } = require('electron')
const { 
  CHANNELS: { 
    INIT,
    LAUNCH_MTS,
    OPEN_DIALOG,
    FAVORITE,
    WINDOW_EVENT
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

contextBridge.exposeInMainWorld('titleBar', {
  title: `Electro MTS v${process.env.npm_package_version}`,
  minimize: () => {
    ipcRenderer.send(WINDOW_EVENT, {
      type: 'min'
    })
  },
  maximize: () => {
    ipcRenderer.send(WINDOW_EVENT, {
      type: 'max'
    })
  },
  unmaximize: () => {
    ipcRenderer.send(WINDOW_EVENT, {
      type: 'unmax'
    })
  },
  close: () => {
    ipcRenderer.send(WINDOW_EVENT, {
      type: 'close'
    })
  }
})

window.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById("app-title")
  title.innerText = `Electro MTS v${process.env.npm_package_version}`
})