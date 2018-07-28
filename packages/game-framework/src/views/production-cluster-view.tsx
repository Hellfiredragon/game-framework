import * as React from "react";
import {getProductionCluster, showProductionClusterList} from "../engine/production-cluster";
import {Button} from "../components/button";

export class ProductionClusterView extends React.Component<{
    id: number
}> {

    handleBackButtonClick = () => {
        showProductionClusterList();
    };

    render() {
        const cluster = getProductionCluster(this.props.id);

        return <article className="gf-production-cluster-view">
            <Button action={this.handleBackButtonClick} symbol="chevron-left"/>
            Name: {cluster.name}
        </article>
    }

}
