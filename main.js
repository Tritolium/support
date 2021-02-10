const { app, BrowserWindow, Tray, Menu, clipboard } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
}

function quitApp(){
    if(process.platform !== 'darwin') {
        app.quit()
    }
}

let tray = null

app.on('ready', () => {
    tray = new Tray('./support.png')

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Anzeigen', type: 'normal', click: createWindow},
        { label: 'Beenden',  type: 'normal', click: quitApp}
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('Support')
})

app.on('window-all-closed', quitApp)

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})