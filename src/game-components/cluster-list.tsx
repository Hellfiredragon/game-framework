import * as React from "react";
import {Cluster} from "../game-model/cluster";

export class ClusterItem extends React.Component<{
    item: Cluster
    onSelect: (productionCluster: Cluster) => void
}> {

    handleClick = () => {
        const { item, onSelect } = this.props;
        if (onSelect) onSelect(item);
    };

    render() {
        const { item } = this.props;
        return <div className="cluster-item" onClick={this.handleClick}>
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

export interface ProductionClusterListProps {
    items: Cluster[],
    onSelect: (productionCluster: Cluster) => void
}

export class ProductionClusterList extends React.Component<ProductionClusterListProps> {

    handleSelect = (selected: Cluster) => {
        const { onSelect } = this.props;
        if (onSelect) onSelect(selected);
    };

    render() {
        return <div className="cluster-list">
            {this.props.items.map(x => <ClusterItem key={x.id} item={x} onSelect={this.handleSelect}/>)}
        </div>
    }
}
