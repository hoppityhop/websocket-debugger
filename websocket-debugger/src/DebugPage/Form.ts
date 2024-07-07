import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {useEffect, useState} from 'react';

const WebSocketDebuggerForm = () => {
    const [connected, setConnected] = useState(false);
    const [sockjs, setSockjs] = useState(false);
    const [stomp, setStomp] = useState(false);
    const [url, setUrl] = '';
    const [stompConnectHeader, setStompConnectHeader] = '';
    const [stompSubscribeDestination, setStompSubscribeDestination] = '';
    const [stompSendHeader, setStompSendHeader] = '';
    const [stompSendDestination, setStompSendDestination] = '';
    const [messageContent, setMessageContent] = '';
    const [messages, setMessages] = '';

    /**
     * Connects to the server.
     */
    const connect = () => {
        try {
            /** @type {WebSocket | SockJS} */
            let client;

            if (stomp) {
                if (sockjs) {
                    client = Stomp.over(new SockJS(url));
                } else {
                    client = Stomp.client(url);
                }


                let connectHeader: {} = {};

                if (stompConnectHeader.length !== 0) {
                    try {
                        connectHeader = JSON.parse(stompConnectHeader);
                    } catch (error) {
                        console.error('Invalid JSON for connect header', error);
                        //TODO add error message log to the console at the bottom

                    }

                }

                client.connect(connectHeader, () => {
                    setConnected(true);
                    //TODO print success with url, connectHeader
                    //TODO What other content in the success log?
                });


            } else {
                if (sockjs) {
                    client = new SockJS(url);

                } else {
                    client = new WebSocket(url);
                }

                client.binaryType = 'arraybuffer';

                client.onopen = (e: Event) => {
                    console.debug('Connect success %o', e);
                    // TODO that.info(`Connect success, url = ${that.state.url}`);
                    setConnected(true)
                };

                client.onmessage = (e: MessageEvent) => {
                    console.debug('Receive message %o', e);
                    // TODO that.info(`Receive message: ${e.data}`);
                };

                client.onerror = (e: Event) => {
                    console.error('Connect error %o', e);
                    // TODO that.error(`Connect error, url = ${that.state.url}`);
                    setConnected(false);
                };
            }

            // client = client;

        } catch (error) {
            console.error('Connection error', error);
            //TODO add error message log to the console at the bottom
            return;
        }
    };

    /**
     * Disconnect from the server.
     */

    /**
     * Send a message to the server.
     */

    /**
     * Subscribe to a destination.
     */

    /**
     * Get a Subscriber Callback
     */

    /**
     * handle a change in the URL
     */

    /**
     * handle a change in the connection type
     */

    /**
     *
     */

    /**
     * Handle stomp connect header change
     */

    /**
     * Handle stomp subscribe destination change
     */

    /**
     * Handle stomp send header change
     */

    /**
     * Handle stomp send destination change
     */

    /**
     * Handle message content change
     */

}

export default WebSocketDebuggerForm;
