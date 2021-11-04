import { writable } from "svelte/store";

//region temp

const makeModInfo = () => {
  return {
    id: `${tempidcounter++}`,
    name: `ModName ${tempidcounter}`,
    checked: false,
    deps: []
  }
}

let tempidcounter = 0
let list = [];

for (let i = 0; i < 30; i++) {
  list.push(makeModInfo())
}

list[0].deps.push("5","9","7")
list[8].name = "Custom Mod Name"

//endregion


export const state = writable({
  modList: list,
  stsDir: "",
  mtsDir: "",
  filter: "",
})

window.ipcRenderer.on('update-state', (payload) => {
  state.update(oldState => {
    return {
      ...oldState,
      ...payload
    }
  })
})

export const toggleMod = (modId) => {
  state.update(s => {
    const list = [...s.modList];
    const mod = list
      .filter(m => m.id === modId)[0]

    mod.checked = !mod.checked

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