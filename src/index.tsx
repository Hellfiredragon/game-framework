import "../less/index.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {action, observable} from "mobx";
import {observer} from "mobx-react";

class GameState {

    @observable test: number = 1;

}

class Controller {
    constructor(private state: GameState) {

    }

    @action
    increase(state: GameState) {
        state.test += 1;
    }

}

@observer
class Test extends React.Component<{ state: GameState, controller?: Controller }> {

    controller: Controller = this.props.controller || new Controller(this.props.state);

    render() {
        const { state } = this.props;
        return <div>
            It Works {state.test}
            <button onClick={() => this.controller.increase(state)}>Click Me!</button>
        </div>
    }
}

const div = document.createElement("div");
document.body.appendChild(div);
ReactDOM.render(<Test state={new GameState()}/>, div);
