import * as React from "react";
import {getBuildingsByCategory} from "../engine/building";
import {Global} from "../engine/global";
import {getBuilding} from "../engine/building";
import {getResource} from "../engine/resource";
import {addBuilding, getCost, getProductionCluster, removeBuilding} from "../engine/production-cluster";
import {Button} from "../components/button";
import {enoughResources} from "../engine/inventory";
import {formatNumber} from "../engine/render-utils";
import {Text} from "../components/text";

export class CostListItem extends React.PureComponent<{
    id: number,
    amount: number
}> {

    render() {
        const { id, amount } = this.props;
        const resource = getResource(id);

        return <article className="gf-cost-list-item">
            <Text style="accent">{resource.name}:</Text> <Text>{formatNumber(amount)}</Text>
        </article>;
    }

}

export class CostList extends React.Component<{
    resources: number[]
}> {

    render() {
        const { resources } = this.props;
        return <article className="gf-cost-list">
            {resources.map((amount, id) => <CostListItem key={id} id={id} amount={amount}/>)}
        </article>
    }

}

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
            <CostList resources={cost}/>
            <Button action={this.handleClickPlusOne} icon={"plus"} state={this.props.enoughResources ? "normal" : "disabled"}/>
            <Button action={this.handleClickMinusOne} icon={"minus"} state={cluster.buildings[building.id] > 0 ? "normal" : "disabled"}/>
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
