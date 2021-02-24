const { BrowserWindow } = require('electron')

const defaultProps = {
    width: 100,
    height: 100,
    show: false,
    webPreferences:{
        contextIsolation: false,
        nodeIntegration: true
    }
}

class Window extends BrowserWindow {
    constructor({ file, ...windowSettings }) {
        super({ ...defaultProps, ...windowSettings })

        this.loadFile(file)
        this.webContents.openDevTools()

        this.once('ready-to-show', () => {
            this.show()
        })
    }
}

module.exports = Window