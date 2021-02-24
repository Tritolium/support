const { app, Tray, Menu, ipcMain } = require('electron')

const { ViewHandler } = require('./src/modules/viewhandler')
require('./src/modules/eventhandler.js')

let tray

function main () {
    
    // create menu in toolbar
    tray = new Tray(require('path').join(__dirname,'support.png'))
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Anzeigen', type: 'normal', click: ViewHandler.openMainWindow},
        { label: 'Melden', type: 'normal', click: ViewHandler.openReportDialog},
        { label: 'Schließen', type: 'normal', click: quitApp}
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('Support')
}

function quitApp(){
    if(process.platform !== 'darwin') {
        app.quit()
    }
}

app.on('window-all-closed', (event) => {
    event.preventDefault()
})

app.on('ready', main)