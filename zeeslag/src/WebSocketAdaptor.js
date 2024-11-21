export class WebSocketAdaptor {
    socketUrl = null; // socket-url
    socket = null;  // new socket pending handshake of connection
    handler = null;

    constructor(socketUrl, handlerCB) {
        const token = localStorage.getItem('token');
        console.log("The token is received: " + token);

        if (!token) {
            throw new Error("Token not found in localstorage. Please log in");
        }

        this.socketUrl = socketUrl;
        this.handler = handlerCB;

        this.socketUrl = socketUrl.replace("http://", "ws://");
        //this.socketUrl = socketUrl.replace("ws://","http://");
        //  this.socket = new SockJS(this.socketUrl);
        this.connect();
    }
    connect() {
        this.socket = new WebSocket(this.socketUrl);

        this.socket.onopen = () => console.log("Open socket");
        this.socket.onmessage = (msg) => handlerCB(msg.data);
        this.socket.onerror = (err) => console.log(err);
        this.socket.onclose = () => console.log("Closed socket");

        console.log(`Created announcements adaptor on ${this.socketUrl}`);
    }

    sendMessage(message) {
        console.log("New announcement:", message);
        this.socket.send(message);
    }

    closeConnection() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
            console.log("WebSocket connection closed.");
        }
    }
}