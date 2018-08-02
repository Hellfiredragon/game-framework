import * as React from "react";
import {getExploredProductionCluster, getProductionCluster} from "../engine/production-cluster";
import {showProductionCluster} from "../engine/navigation";
import {Icon} from "../components/icon";
import {Text} from "../components/text";
import {Button} from "../components/button";

export class ProductionClusterListItem extends React.PureComponent<{
    id: number
}> {

    handleClick = () => {
        showProductionCluster(this.props.id);
    };

    render() {
        const cluster = getProductionCluster(this.props.id);

        return <div className="gf-production-cluster-list-item">
            <Button style="2x" text={cluster.name} action={this.handleClick}/>
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
