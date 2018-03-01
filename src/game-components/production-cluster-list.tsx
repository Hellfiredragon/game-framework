import * as React from "react";
import {ProductionCluster} from "../game-model/production-cluster";
import {ProductionClusterItem} from "./production-cluster-item";

export interface ProductionClusterListProps {
    items: ProductionCluster[],
    onSelect: (productionCluster: ProductionCluster) => void
}

export class ProductionClusterList extends React.Component<ProductionClusterListProps> {

    handleSelect = (selected: ProductionCluster) => {
        const { onSelect } = this.props;
        if (onSelect) onSelect(selected);
    };

    render() {
        return <div className="production-cluster-list">
            {this.props.items.map(x => <ProductionClusterItem key={x.id} item={x} onSelect={this.handleSelect}/>)}
        </div>
    }
}
