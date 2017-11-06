import * as React from "react";
import {connect} from "react-redux";
import {RootState, store} from "./store";
import {updateFrame} from "./actions";

export interface Props {
    gold: number
}

export class _Game extends React.Component<Props, {}> {

    componentDidMount() {
        requestAnimationFrame(this.loop)
    }

    render() {
        return <div>
            <h1>It Works: {this.props.gold}</h1>
        </div>
    }

    lastTime = 0;

    loop = (t: number) => {
        const duration = t - this.lastTime;
        this.lastTime = t;
        store.dispatch(updateFrame(duration));
        requestAnimationFrame(this.loop)
    }

}

export const Game = connect((state: RootState) => ({
    gold: state.game.gold
}), {})(_Game);
