export const filterMods = (list, text) => {

  return list
    .filter(mod => (
      mod.id.toLowerCase().includes(text.toLowerCase()) || 
      mod.name.toLowerCase().includes(text.toLowerCase()) ||
      mod.author.toLowerCase().includes(text.toLowerCase()) ||
      hasTag(text.toLowerCase(), mod.tags)
    ))
}

const hasTag = (tag, tags) => {
  for (let t of tags) {
    if (tag === t.toLowerCase()) {
      return true
    }
  }

  return false
}