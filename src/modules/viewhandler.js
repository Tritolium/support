const { BrowserWindow, Menu, app } = require('electron')
const Window = require('./window')
/**
 * @type {BrowserWindow} reportDialog
 */
var mainWindow, loginDialog, reportDialog

module.exports.ViewHandler = {

    // Login dialog
    openLoginDialog : function(){
        loginDialog = new Window({
            height: 100,
            width: 300,
            file: require('path').join(__dirname, 'dialogs/login/login.html'),
            frame: false
        })
    },

    closeLoginDialog : function(){
        loginDialog.close()
        loginDialog = null
    },

    // Main Window
    openMainWindow : function(){
        var template = [
            {
                label: 'User',
                submenu: [
                    {
                        label: 'Login',
                        id: 'login',
                        click() {
                            require('./viewhandler').ViewHandler.openLoginDialog()
                        }
                    },
                    {
                        label: 'Logout',
                        id: 'logout',
                        enabled: false,
                        click() {
                            require('./eventhandler').EventHandler.logout()
                            require('./viewhandler').ViewHandler.showLogin()
                        }
                    }
                ]
            },
            {
                label: 'App',
                submenu: [
                    {
                        label: 'Quit',
                        click() {
                            app.quit()
                        }
                    }
                ]
            }
        ]
        var menu = new Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
        mainWindow = new Window({
            height: 310,
            width: 300,
            file: require('path').join(__dirname, 'dialogs/index/index.html')
        })
        mainWindow.on('closed', () => {
            mainWindow = null
        })
    },

    reloadMainWindow : function(){
        if(mainWindow != null){
            mainWindow.webContents.send('new_ticket')
        }
    },

    hideLogin : function(){
        Menu.getApplicationMenu().getMenuItemById('login').enabled = false
        Menu.getApplicationMenu().getMenuItemById('logout').enabled = true
    },

    showLogin : function(){
        Menu.getApplicationMenu().getMenuItemById('login').enabled = true
        Menu.getApplicationMenu().getMenuItemById('logout').enabled = false
    },

    // Report dialog
    openReportDialog : function(){
        reportDialog = new Window({
            height: 310,
            width: 300,
            file: require('path').join(__dirname, 'dialogs/report/report.html'),
            frame: false
        })
    },

    closeReportDialog : function(){
        reportDialog.close()
        reportDialog = null
    }
}
module.exports.ReportDialog = reportDialog