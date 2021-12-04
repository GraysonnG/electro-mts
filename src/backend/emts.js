const fs = require('fs')
const { loadConfigData } = require("./config")
const { loadModInfos } = require('./mts/loader')
const { getMTSVersion } = require('./mts/mts')
const { getPathDefaults } = require("./mts/path")
const { getProfiles } = require('./mts/profiles')
const { getStateFromPath } = require('./mts/state')
const { 
  CHANNELS: {
    UPDATE_STATE
  },
  ERROR: {
    CANT_FIND_STS
  }
} = require("../common/constants")

const getValidStsPath = async () => {
  const config = await loadConfigData()
  const stsPaths = getPathDefaults()

  if (config.data.stsFolderLoc && config.data.stsFolderLoc !== "") {
    stsPaths.push(config.data.stsFolderLoc)
  }

  for (let stsPath of stsPaths) {
    if (fs.existsSync(stsPath)) {
      return stsPath
    }
  }

  return undefined
}

const init = async (window) => {
  try {
    const stsPath = await getValidStsPath()

    if (stsPath) {
      const paths = getStateFromPath(stsPath)
      const modList = await loadModInfos(stsPath, window)
      const profiles = await getProfiles()
      const mtsVersion = await getMTSVersion(paths.mtsDir)

      window.webContents.send(UPDATE_STATE, {
        error: undefined,
        loading: false,
        modList,
        mtsVersion,
        ...paths,
        profiles
      })
    } else {
      window.webContents.send(UPDATE_STATE, {
        error: CANT_FIND_STS
      })
    }
  } catch (e) {
    console.error(e)
    window.webContents.send(UPDATE_STATE, {
      error: e
    })
  }
}

const refresh = async (window) => {
  try {
    const stsPath = await getValidStsPath()
  
    if (stsPath) {
      const modList = await loadModInfos(stsPath, window)

      window.webContents.send(UPDATE_STATE, {
        error: undefined,
        loading: false,
        modList,
      })
    } else {
      window.webContents.send(UPDATE_STATE, {
        error: CANT_FIND_STS
      })
    }
  
  } catch (e) {
    console.error(e)
    window.webContents.send(UPDATE_STATE, {
      warning: e
    })
  }
}

module.exports = {
  init,
  refresh,
}