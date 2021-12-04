const { getModInfos } = require("./modinfos")
const { getStateFromPath } = require("./state")
const { CHANNELS: { UPDATE_STATE } } = require("../../common/constants")

const loadModInfos = async (stsPath, window) => {
  try {
    const paths = getStateFromPath(stsPath)
    const modList = await getModInfos(paths)

    return modList
  } catch (e) {
    console.error(e)
    window.webContents.send(UPDATE_STATE, {
      error: e
    })
    return []
  }
}

module.exports = {
  loadModInfos
}