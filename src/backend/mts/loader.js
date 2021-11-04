const { getModInfos } = require("./modinfos")
const { getStateFromPath } = require("./state")
const CHANNEL = "update-state"

const loadModInfos = async (stsPath, window) => {
  try {
    const paths = getStateFromPath(stsPath)
    const modList = await getModInfos(paths)

    window.webContents.send(CHANNEL, {
      ...paths,
      modList,
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