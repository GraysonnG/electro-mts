const path = require('path')

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

    return {
      stsDir: stsPath,
      mtsDir: mtsPath
    }
  }
}