import * as React from "react";
import {getProductionCluster} from "../engine/production-cluster";
import {Button} from "../components/button";
import {
    showBuildingList,
    showProductionClusterList,
} from "../engine/navigation";
import {Global} from "../engine/global";
import {BuildingCategories, BuildingCategorySymbols, getBuildingsByCategory} from "../engine/building";
import {BuildingList} from "./building-list";
import {ResourceList} from "./resource-list";
import {Text} from "../components/text";

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
            <ResourceList resources={cluster.resources}/>
            <BuildingList clusterId={cluster.id}/>
        </article>
    }

}
