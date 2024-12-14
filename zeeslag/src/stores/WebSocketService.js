import {Client} from '@stomp/stompjs'
import { jwtDecode } from "jwt-decode";

class WebSocketService {
    constructor(endpoint, token) {
        this.client = null;
        this.isConnected = false;
        this.endpoint = endpoint;
        this.token = token;
        this.subscriptions = new Map();
    }

    connect(onConnectCallback, onDisconnectCallback, onErrorCallback) {
        const decodedToken = jwtDecode(this.token);
        this.username = decodedToken.sub;


        this.client = new Client({
            brokerURL: this.endpoint,
            connectHeaders: {
                Authorization: `Bearer ${this.token}`
            },
            onConnect: () => {
                this.isConnected = true;
                console.log("Websocket connected");
                if (onConnectCallback) onConnectCallback(this.username);
            },
            onDisconnect : () => {
                this.isConnected = false;
                console.log("Websocket disconnected");
                if (onDisconnectCallback) onDisconnectCallback();

            },
            onStompError: (error) => {
                console.error("Stomp error: ", error);
                if (onErrorCallback) onErrorCallback(error);

            },
            onWebSocketError: (error) => {
                console.error("Websocket error: ", error);
                if (onErrorCallback) onErrorCallback(error);
            }
        });

        this.client.activate()
        console.log('WebSocket client status: ', this.client.active);

    }

    disconnnect() {
        if (this.client) {
            this.client.deactivate()
            this.isConnected = false;
        }
    }

    subscribe(destination, callback) {
        if (this.client && this.isConnected) {
            const subscription = this.client.subscribe(destination, (message) => {
                if (message && message.body) {
                    callback(message.body)
                    console.log('Received message: ', message.body);
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

    sendMessage(destination, message) {
        if (this.client && this.isConnected) {
            this.client.publish({
                destination,
                body: JSON.stringify(message),
            });
             console.log("Message sent: ", message.body)
        } else {
            console.error("Websocket is not connected")
        }
    }

}

export default WebSocketService;