import { writable } from "svelte/store";
import { CHANNELS } from '../../common/constants';

export const state = writable({
  loading: true,
  modList: [],
  stsDir: "",
  mtsDir: "",
  filter: "",
  launchEnabled: true,
  error: undefined,
  detailId: null,
  profiles: null
})

// data in
window.ipcRenderer.on(CHANNELS.UPDATE_STATE, (payload) => {
  state.update(oldState => {
    return {
      ...oldState,
      ...payload
    }
  })

  sortModlistBy("favorited")
})

// data out
export const sendToLauncher = (s) => {
  window.launcher.launchMts(s)
}

const modifyModList = (callback) => {
  state.update(s => {
    const list = [...s.modList]
    
    callback(list)

    // update current profile with checked mods
    const profiles = {...s.profiles}

    profiles.lists[profiles.defaultList] = [
      ...list.filter(mod => mod.checked).map(mod => mod.fileName)
    ]
    
    return {
      ...s,
      profiles,
      modList: list
    }
  })
}

const enableDependencies = (mod) => {
  if (mod.deps) {
    modifyModList(list => {
      mod.deps.forEach(depName => {
        list.forEach(smod => {
          if (smod.id === depName) {
            smod.checked = true
          }
        })
      })
    })
  }
}

export const sortModlistBy = (propertyName, asc = true) => {
  state.update(s => {
    const newList = [...s.modList.sort((a, b) => {
      if (a[propertyName] > b[propertyName]) return asc ? -1 : 1
      if (a[propertyName] < b[propertyName]) return asc ? 1 : -1
      return 0
    })]

    return {
      ...s,
      modList: newList
    }
  })
}

export const toggleMod = (modId) => {
  modifyModList(list => {
    const mod = list.filter(m => m.id === modId)[0]
    mod.checked = !mod.checked

    if (mod.checked) enableDependencies(mod)
  })
}

export const enableModList = (...mods) => {
  modifyModList(list => {
    list.forEach(mod => {
      let check = false
      mods.forEach(m => {
        if (mod.fileName === m || mod.id === m) {
          check = true
        }
      })
      mod.checked = check
    })
  })
}

export const unselectAllMods = () => {
  modifyModList(list => {
    list.forEach(m => { m.checked = false })
  })
}

export const openDetails = (modid) => {
  state.update(s => {
    return {
      ...s,
      detailId: modid
    }
  })  
}

export const closeDetails = () => {
  state.update(s => {
    return {
      ...s,
      detailId: null
    }
  })  
}

export const setLaunchEnabled = (flag) => {
  state.update(s => {
    return {
      ...s,
      launchEnabled: flag
    }
  })
}

export const favoriteMod = (modid) => {
  window.launcher.favorite(modid)

  modifyModList(list => {
    list.forEach(mod => {
      if (mod.id === modid) {
        mod.favorited = !mod.favorited
      }
    })
  })

  sortModlistBy("name", false)
  sortModlistBy("favorited")
}