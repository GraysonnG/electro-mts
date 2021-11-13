const path = require('path')
const child = require('child_process')
const STEAM_WORKSHOP = "com.evacipated.cardcrawl.modthespire.steam.SteamWorkshop"

module.exports = {
  async getModData(mtsDir, stsDir) {
    const bigArg = `${mtsDir}${path.delimiter}${path.join(stsDir, "desktop-1.0.jar")}`

    const execFilePromise = () => {
      return new Promise((resolve, reject) => {
        const oldDir = process.cwd()
        process.chdir(stsDir)
        child.execFile('java', ['-cp', bigArg, STEAM_WORKSHOP], (err, out, _) => {
          if (err) {
            process.chdir(oldDir)
            return reject(err)
          }
  
          const data = out.toString().split('\n').map(prop => (prop.replace('\r', '')))
          const output = []
  
          for (let i = 0; i < data.length; i+=5) {
            try {
              output.push({
                path: data[i + 2],
                tags: data[i + 4].split(',')
              })
            } catch (e) {
              // haha fuck me right
              console.error(e)
            }
          }
  
          process.chdir(oldDir)
          resolve(output)
        })
      })
    }

    return await execFilePromise()
  }
}