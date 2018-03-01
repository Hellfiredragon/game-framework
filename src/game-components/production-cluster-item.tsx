import * as React from "react";
import {ProductionCluster} from "../game-model/production-cluster";

export class ProductionClusterItem extends React.Component<{
    item: ProductionCluster
    onSelect: (productionCluster: ProductionCluster) => void
}> {

    handleClick = () => {
        const { item, onSelect } = this.props;
        if (onSelect) onSelect(item);
    };

    render() {
        const { item } = this.props;
        return <div className="production-cluster-item" onClick={this.handleClick}>
            <table>
                <tbody>
                <tr>
                    <td colSpan={2}>{item.name}</td>
                </tr>
                <tr>
                    <td>Energy</td>
                    <td>9999/10000 (100%)</td>
                </tr>
                <tr>
                    <td>R.P.</td>
                    <td>10k/s</td>
                </tr>
                </tbody>
            </table>
        </div>
    }
}
