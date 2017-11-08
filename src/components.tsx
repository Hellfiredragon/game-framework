import * as React from "react";
import {AllProducts, Building, Product} from "./state";
import {addBuyer, addCart, addSeller, addWorker, removeBuyer, removeCart, removeSeller, removeWorker} from "./actions";
import {BUY_FACTOR, SELL_FACTOR} from "./config";
import classNames = require("classnames");

export class Icon extends React.PureComponent<{ icon: string, onClick?: () => void }, {}> {
    render() {
        const { icon, onClick } = this.props;
        const classes = ["fa", "fa-fw", "fa-" + icon];
        if (onClick) classes.push("clickable");
        return <span className={classNames(classes)} onClick={onClick}/>
    }
}

export class GoldIcon extends React.PureComponent<{}, {}> {
    render() {
        return <span className="gold"/>
    }
}

export class WorkerBox extends React.PureComponent<{ worker: number, product: Product }, {}> {

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

export class RouteSection extends React.Component<{ building: Building, target: Building }, {}> {

    render() {
        const { building, target } = this.props;
        return <div className="route-section">
            <h1>{target.name}</h1>
            {building.inventory.map((amount, productId) =>
                <RouteBox key={productId} building={building}
                          carts={(building.routes[target.id] || {})[productId] || 0}
                          targetId={target.id} productId={productId}/>
            )}
        </div>
    }

}

export class RouteBox extends React.PureComponent<{ building: Building, carts: number, targetId: number, productId: number }, {}> {

    handlePlus = () => addCart(this.props.building, this.props.targetId, this.props.productId);
    handleMinus = () => removeCart(this.props.building, this.props.targetId, this.props.productId);

    render() {
        const { productId, carts } = this.props;
        return <div className="route">
            {AllProducts[productId].name}: {carts}
            <Icon icon="plus" onClick={this.handlePlus}/>
            <Icon icon="minus" onClick={this.handleMinus}/>
        </div>
    }
}

export class SaleComponent extends React.PureComponent<{ seller: number, building: Building, productId: number }, {}> {

    handlePlus = () => addSeller(this.props.building, this.props.productId);
    handleMinus = () => removeSeller(this.props.building, this.props.productId);

    render() {
        const { seller, productId } = this.props;
        const product = AllProducts[productId];
        return <div className="sale">
            {product.name}: {seller || 0}
            <Icon icon="plus" onClick={this.handlePlus}/>
            <Icon icon="minus" onClick={this.handleMinus}/>
            ({Math.ceil(product.value * SELL_FACTOR)} <GoldIcon/>)
        </div>
    }
}

export class PurchaseComponent extends React.PureComponent<{ buyer: number, building: Building, productId: number }, {}> {

    handlePlus = () => addBuyer(this.props.building, this.props.productId);
    handleMinus = () => removeBuyer(this.props.building, this.props.productId);

    render() {
        const { buyer, productId } = this.props;
        const product = AllProducts[productId];
        return <div className="purchase">
            {product.name}: {buyer}
            <Icon icon="plus" onClick={this.handlePlus}/>
            <Icon icon="minus" onClick={this.handleMinus}/>
            ({Math.ceil(product.value * BUY_FACTOR)} <GoldIcon/>)
        </div>
    }
}
