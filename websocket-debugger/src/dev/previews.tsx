import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import DebugPageUI from "../DebugPage/DebugPageUI.tsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview
                path="/DebugPageUI">
                <DebugPageUI/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
