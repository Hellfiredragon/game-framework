import "../less/index.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {action, observable, useStrict} from "mobx";
import {observer} from "mobx-react";

useStrict(true);

const GameState = observable({
    test: 1
});

const increase = action(function () {
    GameState.test += 1;
});

@observer
class Test extends React.Component {

    render() {
        return <div>
            It Works {GameState.test}
            <button onClick={() => increase()}>Click Me!</button>
        </div>
    }
}

const gameLoop = action(function (ts: number) {
    GameState.test += 1;
    requestAnimationFrame(gameLoop);
});

requestAnimationFrame(gameLoop);

const div = document.createElement("div");
document.body.appendChild(div);
ReactDOM.render(<Test/>, div);
