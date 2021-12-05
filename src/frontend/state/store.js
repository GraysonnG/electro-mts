import { writable } from "svelte/store";
import { CHANNELS } from '../../common/constants';

export const state = writable({
  loading: true,
  modList: [],
  stsDir: "",
  mtsDir: "",
  mtsVersion: "",
  filter: "",
  launchEnabled: true,
  error: undefined,
  warning: undefined,
  detailId: null,
  profiles: null
})

export const modlistHistory = (() => {
  const { subscribe, set, update } = writable({
    index: -1,
    actions: []
  })

  return {
    addAction: (modid, checked) => {
      return update(history => {
        const actions = [...history.actions]
        const index = history.index + 1

        actions.splice(index, 1, {
          modid,
          checked
        })

        return {
          actions,
          index,
        }
      })
    },
    redoAction: () => {
      return update(history => {
        if (history.index === history.actions - 1) return history

        const action = history.actions[history.index + 1]

        state.update(state => {
          const mod = state.modList.find(mod => mod.id === action.modid)
          mod.checked = action.checked

          return state
        })

        return {
          ...history,
          index: history.index + 1
        }
      })
    },
    undoAction: () => {
      return update(history => {
        if (history.index < 0) return history

        const action = history.actions[history.index]

        state.update(state => {
          const mod = state.modList.find(mod => mod.id === action.modid)
          mod.checked = !action.checked

          return state
        })

        return {
          ...history,
          index: history.index - 1
        }
      })
    },
    clear: () => {
      return set({
        index: -1,
        actions: []
      })
    }
  }
})()

// data in
window.ipcRenderer.on(CHANNELS.UPDATE_STATE, (payload) => {
  state.update(oldState => {
    return {
      ...oldState,
      ...payload
    }
  })

  sortModlistBy("favorited")
  enableProfile()
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

export const toggleMod = (modId, checked = null) => {
  modifyModList(list => {
    const mod = list.filter(m => m.id === modId)[0]
    if (mod) {
      mod.checked = checked !== null ? checked : !mod.checked
      modlistHistory.addAction(mod.id, mod.checked)

      if (mod.checked) enableDependencies(mod)
    }
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

export const enableProfile = (profileName) => {
  modlistHistory.clear()
  state.update(s => {
    if (s.profiles && s.profiles.lists) {
      const profiles = s.profiles
      const profileModnames = profiles.lists[profileName || s.profiles.defaultList]

      s.modList.forEach(mod => {
        let check = false
        profileModnames.forEach(modname => {
          if (mod.fileName === modname || mod.id === modname) {
            check = true
          }
        })
        mod.checked = check
      })
    }

    return s
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