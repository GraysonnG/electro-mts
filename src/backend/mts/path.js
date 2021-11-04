const path = require('path')
const os = require('os')

const getPathDefaults = () => {
  let p = null
  switch (process.platform) {
    case 'linux':
      const homedir = os.homedir()
      p = path.join(os.homedir(), "/.steam/steam/steamapps/common/SlayTheSpire")
    case 'darwin':

    case 'win32':
  }

  return p;
}

module.exports = {
  getPathDefaults
}