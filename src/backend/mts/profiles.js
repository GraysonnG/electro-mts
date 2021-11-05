const path = require("path")
const fs = require('fs')
const { LINUX, MAC, WINDOWS } = require('../../common/constants')

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
  }

  const configDir = path.join(baseDir, "ModTheSpire")

  if (fs.existsSync(configDir)) {
    return path.join(configDir, "mod_lists.json")
  }
}

const getProfiles = async () => {
  const configPath = getConfigPath()
  const profiles = fs.readFileSync(configPath).toString()
  return JSON.parse(profiles)
}

const saveProfiles = (profiles) => {
  const configPath = getConfigPath()
  const entries = Object.entries(profiles)
  const output = JSON.stringify(profiles, null, "  ")
  fs.writeFileSync(configPath, output)
}

module.exports = {
  getProfiles,
  saveProfiles
}