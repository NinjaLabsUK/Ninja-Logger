const ws = new WebSocket('ws://localhost:8002');

ws.onopen = () => {
    console.log("Connection opened");
}

ws.onmessage = e => {
    console.log(e.data);
}