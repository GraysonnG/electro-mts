const path = require('path')
const os = require('os')

const { LINUX, MAC, WINDOWS } = require('../../common/constants')

const getPathDefaults = () => {
  let p = []
  switch (process.platform) {
    case LINUX:
      const homedir = os.homedir()
      p.push(path.join(os.homedir(), "/.steam/steam/steamapps/common/SlayTheSpire"))
      break;
    case MAC:
      // where the heck is sts installed on macos?
      break;
    case WINDOWS:
      p.push(path.join("D:/Steam/steamapps/common/SlayTheSpire/"))
      p.push(path.join("C:/Program Files (x86)/Steam/steamapps/common/SlayTheSpire/"))
      p.push(path.join("D:/Program Files (x86)/Steam/steamapps/common/SlayTheSpire/"))
      break;
  }

  return p;
}

module.exports = {
  getPathDefaults
}