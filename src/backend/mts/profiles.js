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

  return baseDir
}

const getMtsConfigPath = () => {
  const configPath = getConfigPath()
  const mtsConfigPath = path.join(configPath, "ModTheSpire")

  if (fs.existsSync(mtsConfigPath)) {
    return path.join(mtsConfigPath, "mod_lists.json")
  }
  
  throw new Error(`Could not find MTS Config at: ${path.join(mtsConfigPath, "mod_lists.json")}`)
}

const getProfiles = async () => {
  const configPath = getMtsConfigPath()
  const profiles = fs.readFileSync(configPath).toString()
  return JSON.parse(profiles)
}

const saveProfiles = (profiles) => {
  const configPath = getMtsConfigPath()
  const output = JSON.stringify(profiles, null, "  ")
  fs.writeFileSync(configPath, output)
}

module.exports = {
  getConfigPath,
  getProfiles,
  saveProfiles
}