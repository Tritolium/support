const { app, Tray, Menu, ipcMain } = require('electron')

const Window = require('./src/modules/Window')
const ViewHandler = require('./src/modules/viewhandler').ViewHandler
require('./src/modules/eventhandler.js')

let mainWindow, reportDialog, tray

function main () {
    
    // create menu in toolbar
    tray = new Tray(require('path').join(__dirname,'support.png'))
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Anzeigen', type: 'normal', click: openMainWindow},
        { label: 'Melden', type: 'normal', click: ViewHandler.openReportDialog},
        { label: 'Schließen', type: 'normal', click: quitApp}
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('Support')
    /*let mainWindow = new Window({
        file: 'index.html'
    })*/
}

function openMainWindow(){
    Menu.setApplicationMenu(null)
    mainWindow = new Window({
        file: 'index.html'
    })
}

function quitApp(){
    if(process.platform !== 'darwin') {
        app.quit()
    }
}
/*
function openReportDialog(){
    reportDialog = new Window({
        file: './src/modules/dialogs/report.html',
        frame: false
    })
}
*/

app.on('window-all-closed', (event) => {
    event.preventDefault()
})

app.on('ready', main)