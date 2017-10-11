$(document).ready(() => init());

let logsTableBody;
let logServerStatus;

function init() {
    logsTableBody = $('#logs').find('tbody');
    logServerStatus = $('#logServerStatus');

    websocketConnect();

    $('#clearLogs').click(() => logsTableBody.html(''));
}

function websocketConnect()
{
    logServerStatus.html('Connecting');

    const url = 'ws://localhost:8002';
    const ws = new WebSocket(url);
    
    ws.onopen = () => {
        logServerStatus.html('Connected'); 
    }

    ws.onclose = e => {
        if(e == 1000) {
            logServerStatus.html('Closed');
        } else {
            logServerStatus.html('Closed unexpectedly');
            setTimeout(() => websocketConnect(), 5000);
        }
    }
    
    ws.onmessage = e => {
        if(e.data instanceof Blob) {
            const reader = new FileReader();

            reader.readAsText(e.data);
            reader.addEventListener('loadend', e => {
                const json = e.srcElement.result;
                const log = JSON.parse(json);
                addLog(log);
            });
        } else {
            addLog(e.data);
        }
    }
}

function addLog(log) {
    if(typeof log == 'object') {
        const levelLowerCase = log.level_name.toLowerCase(); 
        const logDate = new Date(log.datetime.date);
        const logTime = pad(logDate.getHours(), 2) + ':' + pad(logDate.getMinutes(), 2) + ':' + pad(logDate.getSeconds(), 2);

        logsTableBody.prepend(`
            <tr>
                <td>${logTime}</td>
                <td class="level level--${levelLowerCase}">${log.level_name}</td>
                <td>${log.message}</td>
            </tr>
        `);
    } else {
        console.log(`Non-object log: ${log}`);
    }
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}