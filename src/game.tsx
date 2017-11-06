import * as React from "react";
import {connect} from "react-redux";
import {RootState, saveStorage} from "./store";
import {resetGame, updateFrame} from "./actions";

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
            <button onClick={resetGame}>Reset</button>
        </div>
    }

    lastTime = 0;
    lastTimeSaved = 0;

    loop = (t: number) => {
        const duration = t - this.lastTime;
        this.lastTime = t;
        this.lastTimeSaved += duration;
        if (this.lastTimeSaved > 10000) {
            saveStorage();
            this.lastTimeSaved = 0;
        }
        updateFrame(duration);
        requestAnimationFrame(this.loop)
    }

}

export const Game = connect((state: RootState) => ({
    gold: state.game.gold
}), {})(_Game);
