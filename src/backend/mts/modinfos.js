const path = require('path')
const fs = require('fs')
const fsPromises = fs.promises
const StreamZip = require('node-stream-zip')
const { config } = require('./emtsconfig')
const { getModDataFromSteam, getModDataManual } = require('./mts')

const getModInfoFromMTSJSON = (mtsJSON, dir, fileName, tags = [], local = true) => {
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
      tags,
      local
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
    const jarPaths = files
      .map(file => {
        return {
          full: path.join(modsFolder, file),
          fileName: file
        }
      })
      .filter(path => {
        try {
          return fs.lstatSync(path.full).isFile()
        } catch (e) {
          console.error(path, e)
          return false
        }
      })

    const infos = (await Promise.all(jarPaths.map(async path => {
      const zip = new StreamZip.async({ file: path.full })
      try {
        const mtsJSON = await zip.entryData('ModTheSpire.json')
        return getModInfoFromMTSJSON(mtsJSON.toString('utf8'), path.full, path.fileName)
      } catch (e) {
        console.error(path)
        return {}
      }
    }))).filter(info => info !== {})

    return infos
  } catch (e) {
    console.error(e)
    return []
  }
}

const getInfosFromWorkshopFolderMods = async (mtsDir, stsDir) => {
  let data;
  try {
    data = await getModDataFromSteam(mtsDir, stsDir)
  } catch (e) {
    data = await getModDataManual(mtsDir, stsDir)
  }

  return Promise.all(data.map(async modData => {
    const mod = fs.readdirSync(modData.path)
      .filter(file => (file.toLowerCase().endsWith(".jar")))[0]
    const modJarPath = path.join(modData.path, mod)

    const zip = new StreamZip.async({ file: modJarPath })
    const mtsJSON = await zip.entryData('ModTheSpire.json')

    return getModInfoFromMTSJSON(mtsJSON.toString('utf8'), modJarPath, mod, modData.tags, false)
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
    } else {
      if (info.tags) {
        modInfoMap.get(info.id).tags.push(...info.tags)
      }
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