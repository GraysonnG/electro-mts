const path = require('path')
const fs = require('fs')
const { LINUX, MAC, WINDOWS } = require('../../common/constants')

const config = {
  data: {}
}

const getConfigPath = () => {
  let baseDir;
  switch (process.platform) {
    case LINUX:
      let home = process.env.HOME
      baseDir = path.join(home, ".config")
      break;
    case WINDOWS:
      let appdata = process.env.LOCALAPPDATA
      if (!appdata) {
        appdata = process.env.APPDATA
      }
      baseDir = appdata
      break;
    case MAC:
      // where the heck is mts config on mac?
      break;
  }

  return baseDir
}

const saveConfigData = (data) => {
  const configPath = getConfigPath()
  const eMtsConfigFolderPath = path.join(configPath, "ElectroModTheSpire")
  const eMtsConfigPath = path.join(eMtsConfigFolderPath, "config.json")

  if (!fs.existsSync(eMtsConfigFolderPath)) {
    fs.mkdirSync(eMtsConfigFolderPath)
  }

  fs.writeFileSync(eMtsConfigPath, JSON.stringify({
    ...config.data,
    ...data
  }))
}

const loadConfigData = () => {
  const configPath = getConfigPath()
  const eMtsConfigFolderPath = path.join(configPath, "ElectroModTheSpire")
  const eMtsConfigPath = path.join(eMtsConfigFolderPath, "config.json")

  if (fs.existsSync(eMtsConfigPath)) {
    config.data = JSON.parse(fs.readFileSync(eMtsConfigPath).toString())
  } else {
    const package = {
      favorites: [],
      stsFolderLoc: "",
    }
    saveConfigData(package)
    config.data = package
  }

  // throw new Error(`Could not find EMTS Config at: ${eMtsConfigPath}`)  
}

module.exports = {
  config,
  getConfigPath,
  loadConfigData,
  saveConfigData,
}