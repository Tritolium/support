const { app, Tray, Menu } = require('electron')

const Window = require('./src/modules/Window')

let mainWindow, dialog, tray

function main () {
    
    // create menu in toolbar
    tray = new Tray('./support.png')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Anzeigen', type: 'normal', click: openMainWindow},
        { label: 'Schließen', type: 'normal', click: quitApp}
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('Support')
    /*let mainWindow = new Window({
        file: 'index.html'
    })*/
}

function openMainWindow(){
    mainWindow = new Window({
        file: 'index.html'
    })
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