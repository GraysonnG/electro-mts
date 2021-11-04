export const filterMods = (list, text) => {

  return list
    .filter(mod => (
      mod.id.toLowerCase().includes(text.toLowerCase()) || 
      mod.name.toLowerCase().includes(text.toLowerCase())
    ))
}