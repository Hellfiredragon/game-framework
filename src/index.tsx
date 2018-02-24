import "../less/index.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {useStrict} from "mobx";
import {observer} from "mobx-react";
import {GameState} from "./game-state";
import {start} from "./game-loop";
import {chooseTab} from "./game-actions";
import {Tab, TabList} from "./components/tabs";

useStrict(true);

@observer
class Game extends React.Component {

    render() {
        const state = GameState();

        return <div>
            <TabList selected={state.selectedTab} onChooseTab={chooseTab}>
                    <Tab text={"Menu1"}>
                        It Works!
                    </Tab>
                    <Tab text={"Menu1"}>
                        Yessssss!
                    </Tab>
            </TabList>
        </div>
    }
}

const div = document.createElement("div");
document.body.appendChild(div);
ReactDOM.render(<Game/>, div, function () {
    start();
});
