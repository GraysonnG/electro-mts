const path = require('path')
const fs = require('fs')
const { ERROR: { CANT_FIND_STS } } = require('../../common/constants')

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

    if (!fs.existsSync(mtsPath)) throw CANT_FIND_STS

    return {
      stsDir: stsPath,
      mtsDir: mtsPath
    }
  }
}