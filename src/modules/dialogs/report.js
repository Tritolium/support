const { ipcRenderer } = require('electron')

document.getElementById('reportform').onsubmit = function (evt) {
    let subject = document.getElementById('fsubject').value
    let message = document.getElementById('fmessage').value
    ipcRenderer.send('report_fired', {subject, message})
}

function cancel() {
    ipcRenderer.send('report_canceled')
}