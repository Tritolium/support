const { ipcRenderer } = require('electron')

document.getElementById('fname').value = require('../eventhandler').EventHandler.user.name

document.getElementById('reportform').onsubmit = function (evt) {
    let name    = document.getElementById('fname').value
    let subject = document.getElementById('fsubject').value
    let message = document.getElementById('fmessage').value
    ipcRenderer.send('report_fired', {name, subject, message})
}

function cancel() {
    ipcRenderer.send('report_canceled')
}