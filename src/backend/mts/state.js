const path = require('path')
const fs = require('fs')

module.exports = {
  getStateFromPath: (stsPath) => {
    const mtsPath = path.join(
      stsPath, 
      "..", // common
      "..", // steamapps
      "workshop", 
      "content",
      "646570",
      "1605060445",
      "ModTheSpire.jar"
    )

    if (!fs.existsSync(mtsPath)) throw "invalid-stspath"

    return {
      stsDir: stsPath,
      mtsDir: mtsPath
    }
  }
}