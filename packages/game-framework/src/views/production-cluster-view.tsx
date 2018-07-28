import * as React from "react";
import {getProductionCluster} from "../engine/production-cluster";
import {Button} from "../components/button";
import {showProductionClusterList} from "../engine/navigation";

export class ProductionClusterView extends React.Component<{
    id: number
}> {

    render() {
        const cluster = getProductionCluster(this.props.id);

        return <article className="gf-production-cluster-view">
            <Button action={showProductionClusterList} symbol="chevron-left"/>
            Name: {cluster.name}
        </article>
    }

}
