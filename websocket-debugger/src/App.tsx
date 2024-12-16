import './App.css'
import {ThemeProvider, createTheme} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import WebSocketDebuggerForm from "./DebugPage/WebSocketDebuggerForm.tsx";
import {Sidebar, Menu, MenuItem, Submenu, Logo} from "react-mui-sidebar";
import {Container} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
// import Sidebar from "./DebugPage/Sidebar.tsx";
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
            <Container>
                <Grid container>
                    <Grid xs={3}>

                        <Sidebar
                            width={"100%"}
                            showProfile={false}
                        >
                            <Logo img={"Wobbuffet.webp"}>
                                Sockette
                            </Logo>
                            <Menu subHeading={"Active Sockets"}>
                                <MenuItem>
                                    Socket A
                                </MenuItem>
                                <MenuItem>Socket B</MenuItem>
                                <MenuItem>Socket C</MenuItem>


                            </Menu>

                        </Sidebar>

                    </Grid>
                    <Grid xs={8}>

                        <WebSocketDebuggerForm/>

                    </Grid>

                </Grid>
                {/*</div>*/}
                <br/>
                <br/>
            </Container>

        </ThemeProvider>
    )
}

export default App
