$(document).ready(() => init());

let reader;
let logsTableBody;

function init() {
    const ws = new WebSocket('ws://localhost:8002');
    
    ws.onopen = () => console.log("Connection opened");
    
    ws.onmessage = e => {
        if(e.data instanceof Blob) {
            reader.readAsText(e.data);
            reader.addEventListener('loadend', e => {
                console.log(e);
                const text = e.srcElement.result;
                addLog(text);
            });
        } else {
            addLog(e.data);
        }
    }

    reader = new FileReader();
    
    logsTableBody = $('#logs').find('tbody');
}

function addLog(message) {
    if(message instanceof Blob) {
        reader.readAsText(message);
        reader.addEventListener('loadend', e => {
            const text = e.srcElement.result;
            console.log(text);
        });
    } else {
        logsTableBody.prepend(`
            <tr>
                <td>0</td>
                <td>DEBUG</td>
                <td>${message}</td>
            </tr>
        `);
    }
}