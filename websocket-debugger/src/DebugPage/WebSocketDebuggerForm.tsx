// @ts-nocheck
import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';
import {useEffect, useState} from 'react';
import {
    Button, Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    TextField
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import "./WebSocketDebuggerForm.less";

import dummyMessages from "../testData/messages"


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
    const [sockClient, setSockClient] = useState(null);

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
                    info(`Connection to STOMP server was successful, URL = ${url}, headers = ${stompConnectHeader}`);
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
                    // TODO that.
                    info(`Connect success, url = ${url}`);
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

            setSockClient(client);
        } catch (error) {
            console.error('Connection error', error);
            //TODO add error message log to the console at the bottom
            return;
        }
    };

    /**
     * Disconnect from the server.
     */

    const disconnectFromServer = () => {
        if (!connected) {
            error('Not connected');
            return;
        }

        try {
            if (stomp) {
                sockClient.disconnect();

            } else {
                sockClient.close();
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

    const sendMessage = () => {
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

                sockClient.send(stompSendDestination, sendHeader, messageContent);
                info(`SEND STOMP message to ${stompSendDestination}, headers: ${stompSendHeader}, content: ${messageContent}`);
            } else {
                sockClient.send(messageContent);
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
            sockClient.subscribe(stompSubscribeDestination, getCallback(stompSubscribeDestination));
            info(`SUBSCRIBE to ${stompSubscribeDestination} was successful`);
        } catch (e) {
            console.error('Error subscribing', e);
            error(`Subscribe destination ${stompSubscribeDestination} failed, message: ${e.message}, view the dev console for details.`);
        }
    };


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

        console.log(e.target.value)


        if (e.target.value === 'SockJS') {
            setSockjs(!sockjs);
        } else if (e.target.value === 'STOMP') {
            setStomp(!stomp);
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


    const info = (message: string) => {
        //TODO Develop a more complex logging function when console is on the page
        console.log(`_INFO_: ${message}`);
        log(`_INFO_: ${message}`);
    }

    const error = (message: string) => {
        //TODO Develop a more complex error logging function when console is on the page
        log(`_ERROR_: ${message}`);
    }


    /**
     * Logging function
     */

    const log = (messages) => {
        const length = messages.length;
        const newMessages = messages.slice(0, length);
        console.log(newMessage);
        newMessages.push(messages);
        setMessages(newMessages);
    }


    /**
     * Scroll to the bottom of the log console.
     */

    return (
        <>
            <div style={{
                width: '50vw',
                textAlign: "left",
                height: "100%"
            }}>
                <h2>WebSocket Connection</h2>
                <Divider/>
                <br/>
                <Grid container>
                    <Grid xs={8}>
                        <TextField
                            fullWidth
                            required
                            label={"WebSocket URL"}
                            placeholder={`"ws://" for raw WebSocket or "http:// or https://" for SockJS`}
                            InputLabelProps={{shrink: true}}
                            onChange={handleUrlChange}
                            disabled={connected}
                        />
                    </Grid>
                    {connected ?


                        (
                            <Grid xs={4}>
                                <Button variant="contained"
                                        sx={{my: 1, marginLeft: '15%'}}
                                        onClick={disconnectFromServer}
                                >

                                    Disconnect
                                </Button>
                            </Grid>)

                        : (<Grid xs={4}>
                            <Button variant="contained"

                                    sx={{my: 1, marginLeft: '15%'}}
                                    onClick={connect}
                            >

                                Connect
                            </Button>
                        </Grid>)

                    }
                </Grid>
                <br/>
                <Grid container>
                    <Grid xs={3}>
                        <b>Connection Type</b>
                    </Grid>

                    <FormGroup row>
                        <FormControlLabel control={<Checkbox

                            checked={stomp}
                            onChange={handleConnectionTypeChange}
                            disabled={connected}
                            value="STOMP"
                        />}
                                          label={"STOMP"}/>

                        <FormControlLabel control={<Checkbox

                            checked={sockjs}
                            onChange={handleConnectionTypeChange}
                            disabled={connected}
                            value="SockJS"
                        />}
                                          label={"SockJS"}/>
                    </FormGroup>
                </Grid>
                <br/>
                <h2>STOMP Connection</h2>
                <Divider/>
                <br/>
                <Grid container>
                    <Grid xs={8}>
                        <TextField
                            fullWidth={true}
                            multiline={true}
                            rows={4}
                            maxRows={10}
                            placeholder={
                                `
   {
        "header1" : "value",
        "header2" : "value",
        ...
   }`}
                            // InputLabelProps={{shrink: true}}
                            label={"STOMP Connection Headers (JSON String)"}
                            onChange={handleStompConnectHeaderChange}
                        />
                    </Grid>
                </Grid>
                <br/>
                <Grid container>
                    <Grid xs={6}>
                        <TextField
                            fullWidth
                            label={"STOMP Subscription Destination"}
                            placeholder={"/topic/fake"}
                            InputLabelProps={{shrink: true}}
                            onChange={handleStompSubscribeDestinationChange}
                        />
                    </Grid>
                    <Grid xs={1}></Grid>
                    <Grid xs={2}>
                        <Button variant="contained"
                                sx={{my: 1, marginLeft: '15%'}}
                                onClick={subscribe}
                                value={stompSubscribeDestination}
                        >
                            Subscribe
                        </Button>
                    </Grid>
                </Grid>
                <br/>
                <Grid container>
                    <Grid xs={8}>
                        <TextField
                            fullWidth={true}
                            multiline={true}
                            rows={4}
                            maxRows={10}
                            placeholder={
                                `
   {
        "header1" : "value",
        "header2" : "value",
        ...
   }`}
                            // InputLabelProps={{shrink: true}}
                            label={"STOMP Message Headers (JSON String)"}
                            onChange={handleStompSendHeaderChange}
                        />
                    </Grid>
                </Grid>
                <br/>
                <Grid container>
                    <Grid xs={6}>
                        <TextField
                            fullWidth
                            label={"STOMP Send Destination"}
                            placeholder={"/app/test"}
                            InputLabelProps={{shrink: true}}
                            onChange={handleStompSubscribeDestinationChange}
                        />
                    </Grid>
                </Grid>
                <br/>
                <Divider/>

                <Grid container>
                    <Grid xs={8}>
                        <TextField
                            fullWidth={true}
                            label={"Message Content"}
                            placeholder={"Message content in string form"}
                            InputLabelProps={{shrink: true}}
                            onChange={handleMessageContentChange}
                        ></TextField>

                    </Grid>
                    <Grid xs={3}>
                        <Button variant="contained"
                                sx={{my: 1, marginLeft: '15%'}}
                                onClick={subscribe}
                                value={stompSubscribeDestination}
                        >
                            SEND MESSAGE
                        </Button>
                    </Grid>
                </Grid>

                <br/>
                <Divider/>

                <div
                    className={"output"}
                >
                    <div className={"window"}>
                        <div className={"body"}>
                        <pre>
                            <div className={"comment"}># console output</div>

                            {dummyMessages.length == 0 &&
                                <div>$ <span className={"pulse"}>_</span></div>}

                            {messages.map((m, index) => <div key={index}>

                                    $&nbsp;
                                    <span
                                        className={"command"}>
                                    {m.message}
                                </span>

                                </div>
                            )}

                        </pre>
                        </div>
                    </div>


                </div>
            </div>


        </>
    )

}


export default WebSocketDebuggerForm;
