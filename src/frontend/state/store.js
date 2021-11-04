import { writable } from "svelte/store";

export const state = writable({
  modList: [],
  stsDir: "",
  mtsDir: "",
})

window.ipcRenderer.on('update-state', (payload) => {
  state.update(oldState => {
    return {
      ...oldState,
      ...payload
    }
  })
})