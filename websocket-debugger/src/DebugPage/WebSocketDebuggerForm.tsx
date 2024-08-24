// @ts-nocheck
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {useEffect, useState} from 'react';


const info = (message: string) => {
    //TODO Develop a more complex logging function when console is on the page
    console.log(`_INFO_: ${message}`);
}

const error = (message: string) => {
    //TODO Develop a more complex error logging function when console is on the page
    console.log(`_ERROR_: ${message}`);
}


const WebSocketDebuggerForm = () => {
    const [connected, setConnected] = useState(false);
    const [sockjs, setSockjs] = useState(false);
    const [stomp, setStomp] = useState(false);
    const [url, setUrl] = useState('');
    const [stompConnectHeader, setStompConnectHeader] = useState('');
    const [stompSubscribeDestination, setStompSubscribeDestination] = useState('');
    const [stompSendHeader, setStompSendHeader] = useState('');
    const [stompSendDestination, setStompSendDestination] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState([]);

    /**
     * Connects to the server.
     */
    export const connect = () => {
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

            this.client = client;

        } catch (error) {
            console.error('Connection error', error);
            //TODO add error message log to the console at the bottom
            return;
        }
    };

    /**
     * Disconnect from the server.
     */

    disconnectFromServer = () => {
        if (!connected) {
            error('Not connected');
            return;
        }

        try {
            if (stomp) {
                this.client.disconnect();

            } else {
                this.client.close();
            }
            //TODO log success
            console.log('Connection successfully closed.');
            setConnected(false);
        } catch (error: any) {
            console.log('Error closing connection', error);
            //TODO log error
            console.log(`Disconnect failed, message: ${error.message}, view the dev console for details.`)
        }
    }

    /**
     * Send a message to the server.
     */

    export const sendMessage = () => {
        try {
            if (stomp) {
                let sendHeader: {} = {};

                if (stompSendDestination.length === 0) {
                    error('No destination specified');
                    return;
                }

                if (stompSendHeader.length !== 0) {
                    try {
                        sendHeader = JSON.parse(stompSendHeader);
                    } catch (error) {
                        console.error(`Invalid JSON for the message header`, error);
                        error(`JSON format error for the message header: ${stompSendHeader}`);
                        return;
                    }
                }

                this.client.send(stompSendDestination, sendHeader, messageContent);
                info(`SEND STOMP message to ${stompSendDestination}, headers: ${stompSendHeader}, content: ${messageContent}`);
            } else {
                this.client.send(messageContent);
                info(`SEND message: ${messageContent}`);
            }
        } catch (error) {
            console.error('Error sending message', error);
            //TODO log error
            error(`Error sending message, message: ${error.message}, view the dev console for details.`)
        }
    }

    /**
     * Subscribe to a destination.
     */

    const subscribe = () => {
        if (stompSubscribeDestination.length === 0) {
            error('No destination specified');
            return;
        }

        if (!stomp) {
            error('Not a STOMP connection');
        }

        if (!connected) {
            error('Not connected');
            return;
        }

        try {
            this.client.subscribe(stompSubscribeDestination, getCallback(stompSubscribeDestination));
            info(`SUBSCRIBE to ${stompSubscribeDestination} was successful`);
        } catch (e) {
            console.error('Error subscribing', e);
            error(`Subscribe destination ${stompSubscribeDestination} failed, message: ${e.message}, view the dev console for details.`);
        }
    };
}

/**
 * Get a Subscriber Callback
 */

const getCallback = (destination) => {
    return content => {
        info(`RECEIVE message from ${destination}, content: ${content}`);
    }
}


/**
 * handle a change in the URL
 */


const handleUrlChange = e => {
    setUrl(e.target.value);
}


/**
 * handle a change in the connection type
 */

const handleConnectionTypeChange = (e) => {
    let sockjs = false;
    let stomp = false;
    for (const t of e) {
        if (t === 'SockJS') {
            sockjs = true;
        } else if (t === 'STOMP') {
            stomp = true;
        }
    }


    /**
     * Handle stomp connect header change
     */

    const handleStompConnectHeaderChange = e => {
        setStompConnectHeader(e.target.value);
    }

    /**
     * Handle stomp subscribe destination change
     */
    const handleStompSubscribeDestinationChange = e => {
        setStompSubscribeDestination(e.target.value);
    }
    /**
     * Handle stomp send header change
     */
    const handleStompSendHeaderChange = e => {
        setStompSendHeader(e.target.value);
    }

    /**
     * Handle stomp send destination change
     */
    const handleStompSendDestinationChange = e => {
        setStompSendDestination(e.target.value);
    }
    /**
     * Handle message content change
     */
    const handleMessageContentChange = e => {
        setMessageContent(e.target.value);
    }


    /**
     * Logging function
     */

    const log = (messages) => {
        const length = messages.length;
        const newMessage = messages.slice(0, length);
        newMessage.push(messages);
        setMessages(newMessage);
    }


    /**
     * Scroll to the bottom of the log console.
     */

    return (
        <>
            <h1>WebSocket Connection</h1>
            <div>
                dfjhsdfsdjfsdf
            </div>
        </>
    )

}

export default WebSocketDebuggerForm;
export {info, error, connect};
