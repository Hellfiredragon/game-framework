import * as React from "react";
import {connect} from "react-redux";
import {RootState, saveStorage} from "./store";
import {updateFrame} from "./actions";
import {Bucket, Building, Product} from "./state";

export const Icon: React.SFC<{
    icon: string
}> = (props) => {
    return <span className={"fa fa-fw fa-" + props.icon}/>
};

export const BucketComponent: React.SFC<{
    text: string,
    value: Bucket
}> = (props) => {
    const { text, value } = props;
    const { current, max } = value;
    return <div className="bucket">
        {text}: {current} / {max}
    </div>
};

export const ProductComponent: React.SFC<{ value: Product }> = (props) => {
    const { name, worker, consumes, time } = props.value;
    return <div className="bucket worker">
        <div>{name}</div>
        <div>
            Worker: {worker}
            <Icon icon="plus"/>
            <Icon icon="minus"/>
        </div>
        <BucketComponent text="Time" value={time}/>
    </div>
};

export const BuildingComponent: React.SFC<{
    value: Building
}> = (props) => (<div className="building">
    {props.value.name}
    {props.value.products.map(product => <ProductComponent value={product}/>)}
</div>);

export interface Props {
    worker: Bucket,
    buildings: Building[]
}

export class _Game extends React.Component<Props, {}> {

    componentDidMount() {
        requestAnimationFrame(this.loop)
    }

    render() {
        const { worker, buildings } = this.props;
        return <div>
            <BucketComponent text="Worker" value={worker}/>
            {buildings.map(building => <BuildingComponent value={building}/>)}
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
    worker: state.game.worker,
    buildings: state.game.buildings
}), {})(_Game);
