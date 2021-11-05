import { writable } from "svelte/store";

export const state = writable({
  modList: [],
  stsDir: "",
  mtsDir: "",
  filter: "",
  launchEnabled: true,
  error: undefined,
  detailId: null,
})

window.ipcRenderer.on('update-state', (payload) => {
  state.update(oldState => {
    return {
      ...oldState,
      ...payload
    }
  })
})

const enableDependencies = (mod) => {
  if (mod.deps) {
    state.update(s => {
      mod.deps.forEach(depName => {
        s.modList.forEach(smod => {
          if (smod.id === depName) {
            smod.checked = true
          }
        })
      })
  
      return s
    })
  }
}

export const toggleMod = (modId) => {
  state.update(s => {
    const list = [...s.modList];
    const mod = list
      .filter(m => m.id === modId)[0]

    mod.checked = !mod.checked

    if (mod.checked) {
      enableDependencies(mod)
    }

    return {
      ...s,
      modList: list
    }
  })
}

export const unselectAllMods = () => {
  state.update(s => {
    const list = [...s.modList]
    list.forEach(m => { m.checked = false })
    
    return {
      ...s,
      modList: list
    }
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

export const setLaunchEnabled = (flag) => {
  state.update(s => {
    return {
      ...s,
      launchEnabled: flag
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