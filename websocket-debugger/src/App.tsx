import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import WebSocketDebuggerForm from "./DebugPage/WebSocketDebuggerForm.tsx";
import DebugPageUI from "./DebugPage/DebugPageUI.tsx";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function App() {

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>


                <DebugPageUI/>
                <br/>
                <br/>


        </ThemeProvider>
    )
}

export default App
