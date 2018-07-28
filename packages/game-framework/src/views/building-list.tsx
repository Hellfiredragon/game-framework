import * as React from "react";
import {getBuildingsByCategory} from "../engine/building";
import {Global} from "../engine/global";
import {getBuilding} from "../engine/building";
import {getResource} from "../engine/resource";
import {addBuilding, getCost, getProductionCluster, removeBuilding} from "../engine/production-cluster";
import {Button} from "../components/button";
import {enoughResources} from "../engine/inventory";

export class ResourceListItem extends React.PureComponent<{
    id: number,
    amount: number
}> {

    render() {
        const { id, amount } = this.props;
        const resource = getResource(id);

        return <article className="gf-resource-list-item">
            {resource.name}: {amount}
        </article>;
    }

}

export class ResourceList extends React.Component<{
    resources: number[]
}> {

    render() {
        const { resources } = this.props;
        return <article className="gf-resource-list">
            {resources.map((amount, id) => <ResourceListItem key={id} id={id} amount={amount}/>)}
        </article>
    }

}

export class BuildingListItem extends React.PureComponent<{
    clusterId: number,
    buildingId: number
}> {

    handleClickPlusOne = () => {
        const cluster = getProductionCluster(this.props.clusterId);
        const building = getBuilding(this.props.buildingId);

        addBuilding(cluster, building, 1);
        this.forceUpdate();
    };

    handleClickMinusOne = () => {
        const cluster = getProductionCluster(this.props.clusterId);
        const building = getBuilding(this.props.buildingId);

        removeBuilding(cluster, building, 1);
        this.forceUpdate();
    };

    render() {
        const cluster = getProductionCluster(this.props.clusterId);
        const building = getBuilding(this.props.buildingId);
        const currentLevel = cluster.buildings[building.id] || 0;
        const cost = getCost(cluster, building, 1);

        return <article className="gf-building-list-item">
            {building.name} ({currentLevel})
            <ResourceList resources={cost}/>
            <Button action={this.handleClickPlusOne} symbol={"plus"} state={enoughResources(cluster, cost) ? "normal" : "disabled"}/>
            <Button action={this.handleClickMinusOne} symbol={"minus"} state={cluster.buildings[building.id] > 0 ? "normal" : "disabled"}/>
        </article>;
    }

}

export class BuildingList extends React.Component<{
    clusterId: number
}> {

    render() {
        const buildings = getBuildingsByCategory(Global.navigation.buildingCategory);

        return <article className="gf-building-list">
            {buildings.map(b => <BuildingListItem key={b.id} buildingId={b.id} clusterId={this.props.clusterId}/>)}
        </article>
    }

}
