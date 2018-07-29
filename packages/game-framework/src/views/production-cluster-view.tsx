import * as React from "react";
import {calcProduction, getProductionCluster} from "../engine/production-cluster";
import {Button} from "../components/button";
import {
    showBuildingList,
    showProductionClusterList,
} from "../engine/navigation";
import {Global} from "../engine/global";
import {BuildingCategories, BuildingCategorySymbols, getBuildingsByCategory} from "../engine/building";
import {BuildingList} from "./building-list";
import {Text} from "../components/text";
import {formatNumber} from "../engine/render-utils";
import {getResource} from "../engine/resource";

export class ResourceProductionListItem extends React.PureComponent<{
    id: number;
    amount: number;
    production: number;
}> {

    render() {
        const { id, amount, production } = this.props;
        const resource = getResource(id);
        const productionStyle = production > 0 ? "production" : production < 0 ? "consumption" : "neutral";

        return <article className="gf-resource-list-item">
            <Text style="accent">{resource.name}:</Text> <Text>{formatNumber(amount)}</Text> <Text style={productionStyle}>({formatNumber(production)}/s)</Text>
        </article>;
    }

}

export class ResourceProductionList extends React.Component<{
    clusterId: number;
}> {

    render() {
        const cluster = getProductionCluster(this.props.clusterId);
        const production = calcProduction(cluster);

        return <article className="gf-resource-list">
            {cluster.resources.map((amount, id) => <ResourceProductionListItem key={id} id={id} amount={amount} production={production[id]}/>)}
        </article>
    }

}

export class BuildingMenu extends React.PureComponent<{
    buildingCategory: string
}> {

    render() {
        const { buildingCategory } = this.props;
        return <article className="gf-building-menu">
            {BuildingCategories.map(category =>
                <Button key={category}
                        action={() => showBuildingList(category)}
                        icon={BuildingCategorySymbols[category]}
                        state={buildingCategory == category ? "active" : "normal"}/>
            )}
        </article>
    }

}

export class ProductionClusterView extends React.Component<{
    id: number
}> {

    render() {
        const cluster = getProductionCluster(this.props.id);

        return <article className="gf-production-cluster-view">
            <header>
                <Button action={showProductionClusterList} icon="chevron-left"/>
                <Text>{cluster.name}</Text>
            </header>
            <BuildingMenu buildingCategory={Global.navigation.buildingCategory}/>
            <ResourceProductionList clusterId={cluster.id}/>
            <BuildingList clusterId={cluster.id}/>
        </article>
    }

}
