import {Client} from '@stomp/stompjs'

class WebSocketService {
    constructor(endpoint) {
        this.client = null;
        this.isConnected = false;
        this.endpoint = endpoint;
        this.token = null;
        this.subscriptions = new Map();
    }

    connect(token) {

        this.token = token;

        this.client = new Client({
            brokerURL: this.endpoint,
            connectHeaders: {
                Authorization: `Bearer ${this.token}`
            },
            debug: (str) => {
                console.log("Stomp debug: ", str)
            },
            onConnect: () => {
                this.isConnected = true;
                console.log("Websocket connected");

            },
            onDisconnect : () => {
                this.isConnected = false;
                console.log("Websocket disconnected");

            },
            onStompError: (error) => {
                console.error("Stomp error: ", error);

            },
            onWebSocketError: (error) => {
                console.error("Websocket error: ", error);
            }
        });

        this.client.activate()
        console.log('WebSocket client status: ', this.client.active);

    }

    disconnnect() {
        if (this.client) {
            this.client.deactivate()
            this.isConnected = false;
            console.log("Disconnected")
        }
    }

    subscribe(destination, callback) {
        if (this.client && this.isConnected) {
            const subscription = this.client.subscribe(destination, (message) => {
                if (message) {
                        callback(message)
                } else {
                    console.error("Empty message received")
                }
            });
            this.subscriptions.set(destination, subscription)
        } else {
            console.error("Websocket is not connected")
        }
    }

    unsubscribe(destination) {
        const subscription = this.subscriptions.get(destination);
        if (subscription) {
            subscription.unsubscribe()
            this.subscriptions.delete(destination);
        }
    }

    sendMessage(destination, message, headers = {}) {
        if (this.client && this.isConnected) {
            this.client.publish({
                destination,
                headers,
                body: JSON.stringify(message),
            });
             console.log("Message sent: ", JSON.stringify(message) )
        } else {
            console.error("Websocket is not connected")
        }
    }
    handleMessage(message) {
        // Handle the game message (you can modify this as per your needs)
        console.log("Message received:", message);
    }
}
export default WebSocketService


