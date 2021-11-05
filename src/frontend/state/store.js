import { writable } from "svelte/store";

export const state = writable({
  modList: [],
  stsDir: "",
  mtsDir: "",
  filter: "",
  launchEnabled: true,
  error: undefined,
  detailId: null,
  profiles: null
})

window.ipcRenderer.on('update-state', (payload) => {
  state.update(oldState => {
    return {
      ...oldState,
      ...payload
    }
  })
})

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

export const sendToLauncher = (s) => {


  // const final = {
  //   ...s,
  //   profiles: {
  //     defaultList: s.profiles.defaultList
  //     lists: {

  //     }
  //   }
  // }

  window.launcher.launchMts(s)
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