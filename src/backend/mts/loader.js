const { getModInfos } = require("./modinfos")
const { getProfiles } = require("./profiles")
const { getStateFromPath } = require("./state")
const { getMTSVersion } = require("./mts")
const { CHANNELS: { UPDATE_STATE } } = require("../../common/constants")

const loadModInfos = async (stsPath, window) => {
  try {
    const paths = getStateFromPath(stsPath)
    const modList = await getModInfos(paths)
    const profiles = await getProfiles()
    const mtsVersion = await getMTSVersion(paths.mtsDir)

    window.webContents.send(UPDATE_STATE, {
      ...paths,
      mtsVersion,
      loading: false,
      modList,
      profiles,
      error: undefined
    })
  } catch (e) {
    console.error(e)
    window.webContents.send(UPDATE_STATE, {
      error: e
    })
  }
}

module.exports = {
  loadModInfos
}