import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {GameState} from "./game-state";
import {start} from "./game-loop";
import {BottomLine, CenterPanel, HeaderLine, LeftPanel, RightPanel} from "./layout/default-layout";

@observer
class Game extends React.Component {

    render() {
        const state = GameState();

        return <div>
            <HeaderLine>
                It Works!
            </HeaderLine>
            <LeftPanel>
                It Works!
            </LeftPanel>
            <CenterPanel>
                It Works!
            </CenterPanel>
            <RightPanel>
                It Works!
            </RightPanel>
            <BottomLine>
                Ha, foxed!
            </BottomLine>
        </div>
    }
}

const div = document.createElement("div");
document.body.appendChild(div);
ReactDOM.render(<Game/>, div, function () {
    start();
});
