const { ipcRenderer } = require("electron");

document.getElementById('loginform').onsubmit = function (evt) {
    let name = document.getElementById('fname').value;
    let password = document.getElementById('fpassword').value;
    ipcRenderer.send('login_fired', {name, password})
}

function cancel() {
    ipcRenderer.send('login_canceled')
}