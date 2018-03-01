import * as React from "react";
import {ProductionCluster} from "../game-model/production-cluster";
import {ProductionClusterList} from "./production-cluster-list";

export interface ProductionClusterViewProps {
    items: ProductionCluster[]
}

export class ProductionClusterView extends React.Component<ProductionClusterViewProps, {
    selected: ProductionCluster
}> {

    state = { selected: this.props.items[0] };

    componentWillReceiveProps(newProps: ProductionClusterViewProps) {
        this.setState(() => ({ selected: newProps.items[0] }))
    }

    handleSelect = (selected: ProductionCluster) => {
        this.setState(() => ({ selected }))
    };

    render() {
        const { selected } = this.state;

        return <div className="production-cluster-view">
            <div className="top">
                {selected.name}
            </div>
            <div className="left">
                <ProductionClusterList items={this.props.items} onSelect={this.handleSelect}/>
            </div>
            <div className="main">
                <table>
                    <tbody>
                    <tr>
                        <td>Resource A</td>
                        <td>x1</td>
                        <td>9000</td>
                        <td>20k/s</td>
                    </tr>
                    <tr>
                        <td>Resource B</td>
                        <td>x2</td>
                        <td>7000</td>
                        <td>20k/s</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="right">
                <table>
                    <tbody>
                    <tr>
                        <td>Technology A</td>
                    </tr>
                    <tr>
                        <td>Technology B</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    }
}
