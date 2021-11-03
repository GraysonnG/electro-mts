const { app } = require("electron")
const path = require('path')
const electronReload = require('electron-reload')
const { createWindow } = require("./src/backend/window")

electronReload(path.join(__dirname, "public"), {})

app.on('ready', createWindow)