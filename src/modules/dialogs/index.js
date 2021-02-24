const { ipcRenderer } = require('electron')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const url='http://tritol.bplaced.net'

function fetchData() {
    var http = new XMLHttpRequest()
    http.onreadystatechange = function () {
        if(this.readyState == 4) {
            var data = JSON.parse(this.responseText)
            var disContainer = document.getElementById('table_body')
            disContainer.innerHTML = ""
            for(var i = 0; i < data.length; i++){
                var tr = document.createElement('tr')
                var td_subject = document.createElement('td')
                var td_message = document.createElement('td')
                var td_active = document.createElement('td')
                td_subject.innerHTML = data[i].subject
                td_message.innerHTML = data[i].message
                if(data[i].active){
                    td_active.style.backgroundColor = 'green'
                } else {
                    td_active.style.backgroundColor = 'red'
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