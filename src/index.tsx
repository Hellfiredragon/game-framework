import "../less/index.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {action, observable, useStrict} from "mobx";
import {observer} from "mobx-react";
import {GameState} from "./game-state";
import {start} from "./game-loop";

useStrict(true);

@observer
class Test extends React.Component {

    render() {
        return <div>
            It Works {GameState.test.toFixed(0)}
        </div>
    }
}

const div = document.createElement("div");
document.body.appendChild(div);
ReactDOM.render(<Test/>, div, function () {
    start();
});
