import * as React from "react";
import {saveStorage, Store} from "./store";
import {
    addCart,
    addSeller,
    addWorker,
    chooseStartBuilding,
    removeCart,
    removeSeller,
    removeWorker,
    updateFrame,
    updateTick
} from "./actions";
import {AllProducts, Bucket, Building, GameStages, Product} from "./state";
import classNames = require("classnames");

export const Icon: React.SFC<{
    icon: string,
    onClick?: () => void
}> = (props) => {
    const classes = ["fa", "fa-fw", "fa-" + props.icon];
    if (props.onClick) classes.push("clickable");
    return <span className={classNames(classes)} onClick={props.onClick}/>
};

export class GoldIcon extends React.PureComponent<{}, {}> {
    render() {
        return <span className="gold"/>
    }
}

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
    resources: number[]
}

export class ResourceRow extends React.Component<ResourceRowProps, {}> {

    render() {
        const { resources } = this.props;
        const keys = Object.keys(resources);
        return <div className="resources-row">
            {resources.map((resource, productId) => <div key={productId}>
                {AllProducts[productId].name}: {resource.toFixed(0)}
            </div>)}
        </div>;
    }

}

export const ProductComponent: React.SFC<{ product: Product }> = (props) => {
    const { product } = props;
    return <div className="product">
        <h1>{product.name} ({product.value} <GoldIcon/>)</h1>
        <ResourceRow resources={product.consumes}/>
        <div>
            Worker: {product.worker}
            <Icon icon="plus" onClick={() => addWorker(product)}/>
            <Icon icon="minus" onClick={() => removeWorker(product)}/>
        </div>
        <BucketComponent text="Time" value={product.time}/>
    </div>
};

export const RouteComponent: React.SFC<{ building: Building, target: Building }> = (props) => {
    const { building, target } = props;
    return <div className="route">
        <h1>{target.name}</h1>
        {building.inventory.map((amount, productId) => <div key={productId}>
            {AllProducts[productId].name}: {(building.routes[target.id] || {})[productId] || 0}
            <Icon icon="plus" onClick={() => addCart(building, target.id, productId)}/>
            <Icon icon="minus" onClick={() => removeCart(building, target.id, productId)}/>
        </div>)}
    </div>
};

export const SaleComponent: React.SFC<{ building: Building, productId: number }> = (props) => {
    const { building, productId } = props;
    return <div className="sale">
        {AllProducts[productId].name}: {building.sales[productId] || 0}
        <Icon icon="plus" onClick={() => addSeller(building, productId)}/>
        <Icon icon="minus" onClick={() => removeSeller(building, productId)}/>
    </div>
};

export interface BuildingComponentProps {
    building: Building
}

export class BuildingComponent extends React.Component<BuildingComponentProps, {}> {

    render() {
        const { building } = this.props;
        const { buildings } = Store.game;
        return <div className="building">
            <h1>{building.name}</h1>
            <h2>Inventory</h2>
            <ResourceRow resources={building.inventory}/>
            <h2>Products</h2>
            {building.products.map(product =>
                <ProductComponent key={product.name} product={product}/>
            )}
            <h2>Sales</h2>
            {building.inventory.map((amount, productId) =>
                <SaleComponent key={productId} building={building} productId={productId}/>)}
            <h2>Routes</h2>
            {buildings
                .filter(x => x != building)
                .map((target, i) =>
                    <RouteComponent key={i} building={building} target={target}/>
                )}
        </div>
    }
}

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
        const { worker, carts, buildings } = Store.game;
        return <div className="main-stage">
            <BucketComponent text="Workers" value={worker}/>
            <BucketComponent text="Carts" value={carts}/>
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
    lastTickTime = 0;

    loop = (t: number) => {
        const duration = t - this.lastTime;
        this.lastTime = t;
        this.lastTimeSaved += duration;
        if (this.lastTimeSaved > 10000) {
            saveStorage();
            this.lastTimeSaved = 0;
        }
        this.lastTickTime += duration;
        while (this.lastTickTime > 1000) {
            updateTick();
            this.lastTickTime -= 1000;
        }
        updateFrame(duration / 1000);
        this.forceUpdate(this.continueLoop);
    };

    continueLoop = () => {
        requestAnimationFrame(this.loop)
    };
}
