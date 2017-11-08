import * as React from "react";
import {AllProducts, Building, Product} from "./state";
import {addBuyer, addCart, addSeller, addWorker, removeBuyer, removeCart, removeSeller, removeWorker} from "./actions";
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

export class WorkerBox extends React.Component<{ product: Product }, {}> {

    handlePlus = () => addWorker(this.props.product);
    handleMinus = () => removeWorker(this.props.product);

    render() {
        const { product } = this.props;
        return <div className="worker">
            Worker: {product.worker}
            <Icon icon="plus" onClick={this.handlePlus}/>
            <Icon icon="minus" onClick={this.handleMinus}/>
        </div>
    }
}

export class RouteComponent extends React.Component<{ building: Building, target: Building }, {}> {

    render() {
        const { building, target } = this.props;
        return <div className="route">
            <h1>{target.name}</h1>
            {building.inventory.map((amount, productId) => <div key={productId}>
                {AllProducts[productId].name}: {(building.routes[target.id] || {})[productId] || 0}
                <Icon icon="plus" onClick={() => addCart(building, target.id, productId)}/>
                <Icon icon="minus" onClick={() => removeCart(building, target.id, productId)}/>
            </div>)}
        </div>
    }
}

export class SaleComponent extends React.Component<{ building: Building, productId: number }, {}> {

    handlePlus = () => addSeller(this.props.building, this.props.productId);
    handleMinus = () => removeSeller(this.props.building, this.props.productId);

    render() {
        const { building, productId } = this.props;
        const product = AllProducts[productId];
        return <div className="sale">
            {product.name}: {building.sales[productId] || 0}
            <Icon icon="plus" onClick={this.handlePlus}/>
            <Icon icon="minus" onClick={this.handleMinus}/>
            ({Math.ceil(product.value * 0.8)} <GoldIcon/>)
        </div>
    }
}

export class PurchaseComponent extends React.Component<{ building: Building, productId: number }, {}> {

    handlePlus = () => addBuyer(this.props.building, this.props.productId);
    handleMinus = () => removeBuyer(this.props.building, this.props.productId);

    render() {
        const { building, productId } = this.props;
        const product = AllProducts[productId];
        return <div className="purchase">
            {product.name}: {building.purchases[productId] || 0}
            <Icon icon="plus" onClick={this.handlePlus}/>
            <Icon icon="minus" onClick={this.handleMinus}/>
            ({Math.ceil(product.value * 1.2)} <GoldIcon/>)
        </div>
    }
}
