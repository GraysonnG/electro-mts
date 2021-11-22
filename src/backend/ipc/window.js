module.exports = {
  handleWindowEvent(win, eventType) {
    switch (eventType) {
      case 'min':
        win.minimize()
        break;
      case 'max':
        win.maximize()
        break;
      case 'unmax':
        win.unmaximize()
        break;
      case 'close':
        win.close()
        break;
    }
  }
}