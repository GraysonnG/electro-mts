const child = require('child_process')

const launch = (stsPath, mtsPath) => {
  const sts = stsPath
  const mts = mtsPath

  try {
    const oldDir = process.cwd()
    process.chdir(sts)
    console.log("Switching process working dir:", process.cwd())
    child.execFile('java', ['-jar', mts])
  } catch (e) {
    console.error(e)
  }
}


module.exports = {
  launch
}