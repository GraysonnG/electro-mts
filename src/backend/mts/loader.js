const { getModInfos } = require("./modinfos")
const { getProfiles } = require("./profiles")
const { getStateFromPath } = require("./state")
const CHANNEL = "update-state"

const loadModInfos = async (stsPath, window) => {
  try {
    const paths = getStateFromPath(stsPath)
    const modList = await getModInfos(paths)
    const profiles = await getProfiles()

    window.webContents.send(CHANNEL, {
      ...paths,
      modList,
      profiles,
      error: undefined
    })
  } catch (e) {
    window.webContents.send(CHANNEL, {
      error: e
    })
  }
}

module.exports = {
  loadModInfos
}