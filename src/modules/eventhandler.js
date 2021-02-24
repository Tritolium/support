const { ipcMain } = require('electron')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const { ViewHandler, MainWindow } = require('./viewhandler')

const url='http://tritol.bplaced.net'

ipcMain.on('login_fired', (evt, arg) => {
    http = new XMLHttpRequest()
    http.onreadystatechange = function() {
        if(this.readyState == 4){
            let serverresponse = JSON.parse(this.responseText).response
            if(serverresponse == 'login_successful'){
                ViewHandler.closeLoginDialog()
                ViewHandler.hideLogin()
                // TODO save name for ticket
            }
            //TODO on login failed info message
        }
    }
    http.open("POST", url + '/api/login.php')
    http.send(JSON.stringify({'name': arg.name, 'password': arg.password}))
})

ipcMain.on('login_canceled', () => {
    ViewHandler.closeLoginDialog()
})

ipcMain.on('report_fired', (evt, arg) => {
    http = new XMLHttpRequest()
    http.onreadystatechange = function() {
        if(this.readyState == 4) {
            ViewHandler.reloadMainWindow()
            ViewHandler.closeReportDialog()
            console.log(this.responseText)
        }
    }
    http.open("POST", url + '/api/ticket/create.php')
    http.send(JSON.stringify({'name': arg.name, 'subject': arg.subject, 'message': arg.message}))
})

ipcMain.on('report_canceled', () => {
    ViewHandler.closeReportDialog()
})

module.exports.EventHandler = {
    logout : function(){
        //TODO handle logout with server
    }
}