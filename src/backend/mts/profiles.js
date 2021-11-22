const path = require("path")
const fs = require('fs')
const { getConfigPath } = require("../config")

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
  console.log("Saving Profiles...")
  const configPath = getMtsConfigPath()
  const output = JSON.stringify(profiles, null, "  ")
  fs.writeFileSync(configPath, output)
}

module.exports = {
  getProfiles,
  saveProfiles
}