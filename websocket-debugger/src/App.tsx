import './App.css'
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import WebSocketDebuggerForm from "./DebugPage/WebSocketDebuggerForm.tsx";
// import DebugPageUI from "./DebugPage/DebugPageUI.tsx";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function App() {

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>


            {/*<DebugPageUI/>*/}
            <WebSocketDebuggerForm/>
            <br/>
            <br/>


        </ThemeProvider>
    )
}

export default App
