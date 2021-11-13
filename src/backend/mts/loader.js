const { getModInfos } = require("./modinfos")
const { getProfiles } = require("./profiles")
const { getStateFromPath } = require("./state")
const { CHANNELS: { UPDATE_STATE } } = require("../../common/constants")

const loadModInfos = async (stsPath, window) => {
  try {
    const paths = getStateFromPath(stsPath)
    const modList = await getModInfos(paths)
    const profiles = await getProfiles()

    window.webContents.send(UPDATE_STATE, {
      ...paths,
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