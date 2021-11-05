const path = require('path')
const os = require('os')

const getPathDefaults = () => {
  let p = null
  switch (process.platform) {
    case 'linux':
      const homedir = os.homedir()
      p = path.join(os.homedir(), "/.steam/steam/steamapps/common/SlayTheSpire")
      break;
    case 'darwin':
      break;
    case 'win32':
      p = path.join("D:/Steam/steamapps/common/SlayTheSpire/")
      break;
  }

  return p;
}

module.exports = {
  getPathDefaults
}