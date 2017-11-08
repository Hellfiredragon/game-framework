import * as React from "react";
import {saveStorage, Store} from "./store";
import {addWorker, chooseStartBuilding, removeWorker, updateFrame} from "./actions";
import {Bucket, Building, Dict, GameStages, Inventory, Product} from "./state";
import {dictEquals} from "./utils";
import classNames = require("classnames");

export const Icon: React.SFC<{
    icon: string,
    onClick?: () => void
}> = (props) => {
    const classes = ["fa", "fa-fw", "fa-" + props.icon];
    if (props.onClick) classes.push("clickable");
    return <span className={classNames(classes)} onClick={props.onClick}/>
};

export const BucketComponent: React.SFC<{
    text: string,
    value: Bucket
}> = (props) => {
    const { text, value } = props;
    const { current, max } = value;
    return <div className="bucket">
        {text}: {current.toPrecision(3)} / {max}
    </div>
};

export interface ResourceRowProps {
    resources: Dict<number>
}

export class ResourceRow extends React.Component<ResourceRowProps, {}> {

    shouldComponentUpdate(nextProps: ResourceRowProps) {
        return !dictEquals(this.props, nextProps)
    }

    render() {
        const { resources } = this.props;
        const keys = Object.keys(resources);
        return <div className="resources-row">
            {keys.map(key => <div key={key}>
                {key}: {resources[key].toFixed(0)}
            </div>)}
        </div>;
    }

}

export const ProductComponent: React.SFC<{ product: Product }> = (props) => {
    const { product } = props;
    return <div className="product">
        <h2>{product.name}</h2>
        <ResourceRow resources={product.consumes}/>
        <div>
            Worker: {product.worker}
            <Icon icon="plus" onClick={() => addWorker(product)}/>
            <Icon icon="minus" onClick={() => removeWorker(product)}/>
        </div>
        <BucketComponent text="Time" value={product.time}/>
    </div>
};

export const BuildingComponent: React.SFC<{
    building: Building
}> = (props) => {
    const { building } = props;
    return <div className="building">
        <h1>{building.name}</h1>
        {building.products.map(product =>
            <ProductComponent key={product.name} product={product}/>)}
    </div>
};

export const InventoryComponent: React.SFC<{
    inventory: Inventory
}> = (props) => {
    const { inventory } = props;
    const keys = Object.keys(inventory.values);
    return <div className="inventory">
        {keys.map(k => <div key={k}>{k}: {inventory.values[k]}</div>)}
    </div>
};

export const BuildStartBuildingsComponent: React.SFC<{
    resources: Building[],
    building: Building
}> = (props) => {
    const { building, resources } = props;
    return <div className="build-building clickable" onClick={() => chooseStartBuilding(props)}>
        <h1>{building.name}</h1>
        <h2>{resources.map(x => x.name).join(", ")}</h2>
    </div>
};

export class SelectStartBuildingStage extends React.Component<{}, {}> {
    render() {
        const { start } = Store.game;
        return <div className="select-start-building-stage">
            {start.map(s =>
                <BuildStartBuildingsComponent key={s.building.name} {...s}/>
            )}
        </div>
    }

}

export class MainStage extends React.Component<{}, {}> {
    render() {
        const { worker, buildings, inventory } = Store.game;
        return <div className="main-stage">
            <BucketComponent text="Worker" value={worker}/>
            <InventoryComponent inventory={inventory}/>
            {buildings.map(building =>
                <BuildingComponent key={building.name} building={building}/>
            )}
        </div>
    }
}

export class Game extends React.Component<{}, {}> {

    componentDidMount() {
        requestAnimationFrame(this.loop)
    }

    render() {
        const { stage, gold } = Store.game;
        let content: JSX.Element;
        switch (stage) {
            case GameStages.SelectStartBuilding:
                content = <SelectStartBuildingStage/>;
                break;
            default:
                content = <MainStage/>;
        }
        return <div className="game">
            <div>Gold: {gold}</div>
            {content}
        </div>;
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
        updateFrame(duration / 1000);
        this.forceUpdate(this.continueLoop);
    };

    continueLoop = () => {
        requestAnimationFrame(this.loop)
    };
}
