import "../less/index.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {action, observable, useStrict} from "mobx";
import {observer} from "mobx-react";
import {GameState} from "./game-state";
import {start} from "./game-loop";
import {startBoost, stopBoost} from "./game-actions";

useStrict(true);

@observer
class Test extends React.Component {

    render() {
        const state = GameState();

        return <div>
            <div>It Works: {state.test.toFixed(0)}</div>
            <div>Boost: {state.boostSec.toFixed(0)}
                <button onClick={startBoost}>Start</button>
                <button onClick={stopBoost}>Stop</button>
            </div>
        </div>
    }
}

const div = document.createElement("div");
document.body.appendChild(div);
ReactDOM.render(<Test/>, div, function () {
    start();
});
