const { ipcMain } = require('electron')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const { ViewHandler } = require('./viewhandler')
const { EventHandler } = require('./eventhandler')

const url='http://tritol.bplaced.net'

ipcMain.on('login_fired', (evt, arg) => {
    http = new XMLHttpRequest()
    http.onreadystatechange = function() {
        if(this.readyState == 4){
            let serverresponse = JSON.parse(this.responseText).response
            console.log(serverresponse)
            if(serverresponse == 'login_successful'){
                ViewHandler.closeLoginDialog()
                ViewHandler.hideLogin()
                require('./eventhandler').EventHandler.user.name = arg.name
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
    let outgoing = JSON.stringify({'name': require('./eventhandler').EventHandler.user.name, 'subject': arg.subject, 'message': arg.message})
    console.log(outgoing)
    http.send(outgoing)
})

ipcMain.on('report_canceled', () => {
    ViewHandler.closeReportDialog()
})

module.exports.EventHandler = {
    logout : function(){
        //TODO handle logout with server
    }
}

module.exports.EventHandler.user = {
    "name" : ""
}