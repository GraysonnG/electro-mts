const path = require('path')
const fs = require('fs')
const StreamZip = require('node-stream-zip')
const child = require('child_process')
const STEAM_WORKSHOP = "com.evacipated.cardcrawl.modthespire.steam.SteamWorkshop"

module.exports = {
  async getModDataFromSteam(mtsDir, stsDir) {
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
            const path = data[i + 2]
            const tags = data[i + 4]?.split(',')

            if (path && tags) {
              output.push({
                path,
                tags,
              })
            }
          }
  
          process.chdir(oldDir)
          resolve(output)
        })
      })
    }

    return await execFilePromise()
  },
  async getModDataManual(mtsDir, stsDir) {
    const wksDir = path.join(mtsDir, "..", "..")
    const modData = fs.readdirSync(wksDir).map(folder => {
      return {
        path: path.join(wksDir, folder),
        tags: []
      }
    })

    return modData
  },
  async getMTSVersion(mtsPath) {
    const zip = new StreamZip.async({ file: mtsPath })
    const versionData = await zip.entryData("META-INF/version.prop")
    const version = versionData.toString('utf8').split("=")[1].replace("\r\n", "")
    return version
  }
}