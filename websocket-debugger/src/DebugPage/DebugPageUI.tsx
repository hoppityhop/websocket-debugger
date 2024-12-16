import SockJS from "sockjs-client";
import React, {useEffect, useState} from "react";
import Stomp from "stompjs";
import {
    Box, Button,
    Checkbox,
    Divider,
    FormControlLabel,
    TextField
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'


const DebugPageUI = () => {

    return (
        <>
            {/*Make a div aligned generally to the left*/}
            <div style={{
                // width: '50vw',
                textAlign: "left",
                height: '100%'}}>
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
                        />
                    </Grid>
                    <Grid xs={4}>
                        <Button variant="contained"
                                sx={{my: 1, marginLeft: '15%'}}>
                            Connect
                        </Button>
                    </Grid>
                </Grid>

                <br/>
                <Grid container>

                    <Grid xs={3}>
                        <b>Connection Type</b>
                    </Grid>
                    <Grid xs={3}>
                        <FormControlLabel control={<Checkbox/>}
                                          label={"STOMP"}/>
                    </Grid>
                    <Grid xs={3}>
                        <FormControlLabel control={<Checkbox/>}
                                          label={"SockJS"}/>
                    </Grid>
                </Grid>
                <br/>
                <h2>STOMP Connection</h2>
                <Divider/>
                <br/>
                <Grid container>
                    <Grid xs={8}>
                        <TextField
                            fullWidth={true}
                            // multiline
                            // rows={8}
                            // maxRows={10}
                            placeholder={
                                `
   {
        "header1" : "value",
        "header2" : "value",
        ...
   }`}
                            InputLabelProps={{shrink: true}}
                            label={"Connection Headers (JSON String)"}

                        />
                    </Grid>
                </Grid>
                <br/>
                <Grid container>
                    <Grid xs={6}>
                        <TextField
                            fullWidth
                            label={"Subscription Destination"}
                            placeholder={"/topic/fake"}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid xs={1}></Grid>
                    <Grid xs={2}>
                        <Button variant="contained"
                                sx={{my: 1, marginLeft: '15%'}}>
                            Subscribe
                        </Button>
                    </Grid>
                </Grid>
                <br/>

                <Grid container>
                    <Grid xs={8}>
                        <TextField
                            fullWidth={true}
                            // multiline
                            // rows={8}
                            // maxRows={10}
                            placeholder={
                                `
   {
        "header1" : "value",
        "header2" : "value",
        ...
   }`}
                            InputLabelProps={{shrink: true}}
                            label={"Message Headers (JSON String)"}

                        />
                    </Grid>
                </Grid>
                <br/>
                <Grid container>
                    <Grid xs={6}>
                        <TextField
                            fullWidth
                            label={"Send Destination"}
                            placeholder={"/topic/fake"}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid xs={1}></Grid>
                </Grid>
                <br/>
                <Divider/>
                <br/>
                <Grid container>
                    <Grid xs={8}>
                        <TextField
                            fullWidth={true}
                            rows={8}
                            maxRows={10}
                            placeholder={
                                `Message to send to the server`}
                            InputLabelProps={{shrink: true}}
                            label={"Message Content"}

                        />
                    </Grid>
                    <Grid xs={4}>
                        <Button variant="contained"
                                sx={{my: 1, marginLeft: '15%'}}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default DebugPageUI;
