const path = require('path')
const fs = require('fs')
const fsPromises = fs.promises
const StreamZip = require('node-stream-zip')
const { config } = require('./emtsconfig')
const { getModData } = require('./mts')

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

const getModInfoFromMTSJSON = (mtsJSON, dir, fileName, genres = []) => {
  try {
    const data = JSON.parse(mtsJSON)
    if (data.name === "ModTheSpire") throw "Ignoring MTS"

    const id = data.modid
    let favorited = false

    config.data.favorites.forEach(mid => {
      if (mid === id) {
        favorited = true
      }
    })

    return {
      id,
      name: data.name,
      author: data.author ? data.author : data.author_list.join(", "),
      version: data.version,
      description: data.description,
      checked: false,
      installDir: dir,
      fileName,
      deps: data.dependencies,
      favorited,
      genres
    }
  } catch (e) {
    console.error(`\n\n${dir}`)
    console.error(mtsJSON)
    console.error(e)
    return {}
  }
}

const getInfosFromStsFolderMods = async (stsPath) => {
  const modsFolder = path.join(stsPath, "mods")
  try {
    const files = fs.readdirSync(modsFolder)
    const infos = Promise.all(files.map(async file => {
      const jarPath = path.join(modsFolder, file)
      const zip = new StreamZip.async({ file: jarPath})
      const mtsJSON = await zip.entryData('ModTheSpire.json')
      return getModInfoFromMTSJSON(mtsJSON.toString("utf8"), jarPath, file)
    }))

    return infos
  } catch (e) {
    console.error(e)
    return []
  }
}

const getInfosFromWorkshopFolderMods = async (mtsDir, stsDir) => {

  const data = await getModData(mtsDir, stsDir)

  return Promise.all(data.map(async modData => {
    const mod = fs.readdirSync(modData.path)
      .filter(file => (file.toLowerCase().endsWith(".jar")))[0]
    const modJarPath = path.join(modData.path, mod)

    const zip = new StreamZip.async({ file: modJarPath })
    const mtsJSON = await zip.entryData('ModTheSpire.json')

    return getModInfoFromMTSJSON(mtsJSON.toString('utf8'), modJarPath, mod, modData.genres)
  })).catch(e => {
    console.error(e)
  })
}


const getModInfos = async (paths) => {
  const workshopInfos = await getInfosFromWorkshopFolderMods(paths.mtsDir, paths.stsDir)
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

  return [
    ...outInfos
  ]
}

module.exports = {
  getModInfos
}