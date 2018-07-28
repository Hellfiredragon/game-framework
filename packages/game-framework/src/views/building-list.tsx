import * as React from "react";
import {getBuildingsByCategory} from "../engine/building";
import {Global} from "../engine/global";
import {getBuilding} from "../engine/building";
import {getResource} from "../engine/resource";
import {addBuilding, getCost, getProductionCluster, removeBuilding} from "../engine/production-cluster";
import {Button} from "../components/button";
import {enoughResources} from "../engine/inventory";
import {ResourceList} from "./resource-list";

export class BuildingListItem extends React.PureComponent<{
    clusterId: number,
    buildingId: number,
    enoughResources: boolean
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
            <Button action={this.handleClickPlusOne} symbol={"plus"} state={this.props.enoughResources ? "normal" : "disabled"}/>
            <Button action={this.handleClickMinusOne} symbol={"minus"} state={cluster.buildings[building.id] > 0 ? "normal" : "disabled"}/>
        </article>;
    }

}

export class BuildingList extends React.Component<{
    clusterId: number
}> {

    render() {
        const cluster = getProductionCluster(this.props.clusterId);
        const buildings = getBuildingsByCategory(Global.navigation.buildingCategory);

        return <article className="gf-building-list">
            {buildings.map(building => {
                return <BuildingListItem key={building.id}
                                         clusterId={this.props.clusterId}
                                         buildingId={building.id}
                                         enoughResources={enoughResources(cluster, getCost(cluster, building, 1))}/>
            })}
        </article>
    }

}
