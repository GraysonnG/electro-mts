const path = require('path')
const fs = require('fs')
const fsPromises = fs.promises
const StreamZip = require('node-stream-zip')

const setFileOwnership = async (filePath) => {
  try {
    const { fd } = await fsPromises.open(filePath, 'r')
    fs.fchmod(fd, 0o444, err => {
      if (err) {
        throw err
      }
    })
  } catch (e) {
    console.error(e)
  }

}

const getModInfoFromMTSJSON = (mtsJSON) => {
  try {
    const data = JSON.parse(mtsJSON)
    return {
      id: data.modid,
      name: data.name,
      author: data.author ? data.author : data.author_list.join(", "),
      version: data.version,
      description: data.description,
      checked: false,
      deps: data.dependencies
    }
  } catch (e) {
    console.log(mtsJSON)
    console.error(e)
    return {}
  }
}

const getInfosFromStsFolderMods = async (stsPath) => {
  const modsFolder = path.join(stsPath, "mods")
  try {
    const files = fs.readdirSync(modsFolder)
    const infos = Promise.all(files.map(async file => {
      const zip = new StreamZip.async({ file: path.join(modsFolder, file)})
      const mtsJSON = await zip.entryData('ModTheSpire.json')
      return getModInfoFromMTSJSON(mtsJSON.toString("utf8"))
    }))

    return infos
  } catch (e) {
    console.error(e)
    return []
  }
}

const getInfosFromWorkshopFolderMods = async (mtsDir) => {
  const wksDir = path.join(mtsDir, "..", "..")
  const folders = fs.readdirSync(wksDir)
  return Promise.all(folders.map(async folder => {
    const modDir = path.join(wksDir, folder)
    const mod = fs.readdirSync(modDir).filter(file => (
      file.toLowerCase().endsWith(".jar")
    ))[0]
    const modJarPath = path.join(modDir, mod)
    setFileOwnership(modJarPath)
    const zip = new StreamZip.async({ file: modJarPath })
    const mtsJSON = await zip.entryData('ModTheSpire.json')
    return getModInfoFromMTSJSON(mtsJSON.toString())
  })).catch(e => {
    console.log(e)
  })
}


const getModInfos = async (paths) => {
  const workshopInfos = await getInfosFromWorkshopFolderMods(paths.mtsDir)
  const modsInfos = await getInfosFromStsFolderMods(paths.stsDir)

  const modInfoMap = new Map();

  // TODO: Figure out which one is newer and use that one

  modsInfos.forEach(info => {
    modInfoMap.set(info.id, info)
  })

  workshopInfos.forEach(info => {
    if (!modInfoMap.has(info.id)) {
      modInfoMap.set(info.id, info)
    }
  })

  const outInfos = Array.from(modInfoMap.values())
    .filter(info => (Object.keys(info).length !== 0))

  // console.log(outInfos)

  return [
    ...outInfos
  ]
  
  // return list
}

module.exports = {
  getModInfos
}