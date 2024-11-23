export class WebSocketAdaptor {
    socketUrl = null; // socket-url
    socket = null;  // new socket pending handshake of connection

    constructor(socketUrl, handlerCB, token) {

        socketUrl = `ws://localhost:8080/ws/chat`

        this.socketUrl = socketUrl;
        this.socketUrl = socketUrl.replace("http://", "ws://");
        //  this.socket = new SockJS(this.socketUrl);
    }

    async authenticateAndConnect() {
        const authUrl = "http://localhost:8080/api/auth/authentication"
        const token = localStorage.getItem("token")
        try {
            const response = await fetch(authUrl, {
                method: "POST",
                headers:
                    {
                        "Authorization": `Bearer ${token}`
                    }
            })

            console.log("The token is received: " + token);
            if (!token) {
                throw new Error("Token not found in localstorage. Please log in");
            }

            if (response.ok) {
                this.socket = new WebSocket(this.socketUrl);

                this.socket.onopen = () => console.log("Open socket");
                this.socket.onmessage = (msg) => handlerCB(msg.data);
                this.socket.onerror = (err) => console.log(err);
                this.socket.onclose = () => console.log("WebSocket connection closed");

                console.log(`Created announcements adaptor on ${this.socketUrl}`);

                return this.socket;
            } else {
                console.error("Authentication failed");
                return null
            }
        } catch (error) {
            console.error("Error during authentication: ", error)
            return null;
        }
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