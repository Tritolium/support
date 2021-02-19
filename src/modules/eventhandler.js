const { ipcMain } = require('electron')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const { ViewHandler } = require('./viewhandler')

const url='http://tritol.bplaced.net'

var reportDialog;

ipcMain.on('report_fired', (evt, arg) =>{
    http = new XMLHttpRequest()
    http.onreadystatechange = function() {
        if(this.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.response)
        }
    }
    http.open("POST", url + '/api/ticket/create.php')
    http.send(JSON.stringify({'name': arg.name, 'subject': arg.subject, 'message': arg.message}))
    ViewHandler.closeReportDialog()
})

ipcMain.on('report_canceled', () => {
    ViewHandler.closeReportDialog()
})