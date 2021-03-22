const { ipcRenderer } = require('electron')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const url='http://tritol.bplaced.net'

var data

function fetchData() {
    var http = new XMLHttpRequest()
    http.onreadystatechange = function () {
        if(this.readyState == 4) {
            data = JSON.parse(this.responseText)
            var disContainer = document.getElementById('table_body')
            disContainer.innerHTML = ""
            for(var i = 0; i < data.length; i++){
                var tr = document.createElement('tr')

                //sets element id based on ticket_id from server

                tr.id = data[i].ticket_id;

                //adds listener to the tablerow to open an editor on doubleclick
                
                tr.ondblclick = (e) => {
                    let target_id = e.target.parentNode.id
                    ipcRenderer.send('open_ticket_editor', {target_id})
                }
                var td_subject = document.createElement('td')
                var td_message = document.createElement('td')
                var td_active = document.createElement('td')
                td_subject.innerHTML = data[i].subject
                td_message.innerHTML = data[i].message
                switch(data[i].state){
                    case '0':
                        td_active.style.backgroundColor = 'yellow'
                        break
                    case '1':
                        td_active.style.backgroundColor = 'orange'
                        break
                    case '2':
                        td_active.style.backgroundColor ='green'
                        break
                    case '3':
                        td_active.style.backgroundColor = 'red'
                        break
                }
                tr.appendChild(td_subject)
                tr.appendChild(td_message)
                tr.appendChild(td_active)
                disContainer.appendChild(tr)
            }
        }
    }
    http.open("GET", url + '/api/ticket/read.php')
    http.send()
}

ipcRenderer.on('new_ticket', (evt) => {
    fetchData()
})

fetchData()

