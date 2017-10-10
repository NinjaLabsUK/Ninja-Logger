$(document).ready(() => init());

let logsTableBody;

function init() {
    const ws = new WebSocket('ws://localhost:8002');
    
    ws.onopen = () => console.log("Connection opened");
    
    ws.onmessage = e => {
        console.log(e.data);
        addLog(e.data);
    }
    
    logsTableBody = $('#logs').find('tbody');
}

function addLog(message) {
    logsTableBody.prepend(`
        <tr>
            <td>0</td>
            <td>DEBUG</td>
            <td>${message}</td>
        </tr>
    `);
}