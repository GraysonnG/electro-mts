const { dialog } = require("electron")
const path = require("path")


const openDialog = (data) => {
  const root = path.parse(process.cwd()).root

  return dialog.showOpenDialogSync({
    ...data,
    defaultPath: root
  })
}

module.exports = {
  openDialog
}