import React, {Fragment} from "react";
import {
    Category,
    Component,
    Variant,
    Palette,
} from "@react-buddy/ide-toolbox";
import MUIPalette from "@react-buddy/palette-mui";
import {Button} from "@mui/material";

export const PaletteTree = () => (
    <Palette>
        <Category name="App">
            <Component name="Loader">
                <Variant>
                    <ExampleLoaderComponent/>
                </Variant>
            </Component>
        </Category>
        <MUIPalette/>
        <Category name="Inputs">
            <Component name="Button">
                <Variant name="ConnectButton">
                    <Button variant="contained" sx={{my: 1, marginLeft: '15%'}}>
                        Connect
                    </Button>
                </Variant>
            </Component>
        </Category>
    </Palette>
);

export function ExampleLoaderComponent() {
    return (
        <Fragment>Loading...</Fragment>
    );
}
