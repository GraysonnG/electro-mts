const child = require('child_process')

const launch = (stsPath, mtsPath) => {
  const sts = stsPath || "D:\\Steam\\steamapps\\common\\SlayTheSpire"
  const mts = mtsPath || "D:\\Steam\\steamapps\\workshop\\content\\646570\\1605060445\\ModTheSpire.jar"

  try {
    const oldDir = process.cwd()
    process.chdir(sts)
    child.execFile('java', ['-jar', mts])
    process.chdir(oldDir)
  } catch (e) {
    console.error(e)
  }
}


module.exports = {
  launch
}