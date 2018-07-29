import * as React from "react";
import {getExploredProductionCluster, getProductionCluster} from "../engine/production-cluster";
import {showProductionCluster} from "../engine/navigation";
import {Icon} from "../components/icon";
import {Text} from "../components/text";

export class ProductionClusterListItem extends React.PureComponent<{
    id: number
}> {

    handleClick = () => {
        showProductionCluster(this.props.id);
    };

    render() {
        const cluster = getProductionCluster(this.props.id);

        return <div className="gf-production-cluster-list-item" onClick={this.handleClick}>
            <Icon icon="chevron-right"/>
            <Text>{cluster.name}</Text>
        </div>
    }

}

export class ProductionClusterList extends React.Component {

    render() {
        const clusters = getExploredProductionCluster();

        return <article className="gf-production-cluster-list">
            {clusters.map(cluster => <ProductionClusterListItem key={cluster.id} id={cluster.id}/>)}
        </article>
    }

}
