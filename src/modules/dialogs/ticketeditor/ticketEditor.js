const { ipcRenderer } = require('electron')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const url='http://tritol.bplaced.net'

var ticket_id

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function fetchData(){
    http = new XMLHttpRequest()
    http.onreadystatechange = function () {
        if(this.readyState == 4) {
            data = JSON.parse(this.responseText)
            if(data.length == 1){
                data = data[0]
                // fill user
                document.getElementById('ticket_user').innerHTML = data.name
                // fill subject
                document.getElementById('ticket_subject').innerHTML = data.subject
                // fill message
                document.getElementById('ticket_message').innerHTML = data.message
            }
        }
    }
    //http.open("GET", url + '/api/ticket/read.php?ticket_id=' + ticket_id)
    http.open('GET', url + '/api/ticket.php?ticket_id=' + ticket_id)
    http.send()  
}

function cancel(){
    ipcRenderer.send('close_ticket_editor', {ticket_id})
}

function save(){
    let message = document.getElementById('ticket_message').value
    let state = document.getElementById('ticket_state').value
    ipcRenderer.send('editor_save_fired', {ticket_id, message, state})
}

function _delete(){
    ipcRenderer.send('editor_delete_fired', {ticket_id})
}

ticket_id = getParameterByName("id")

document.getElementById("ticket_id").innerHTML = ticket_id

fetchData()