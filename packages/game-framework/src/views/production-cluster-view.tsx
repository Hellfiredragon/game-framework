import * as React from "react";
import {getProductionCluster} from "../engine/production-cluster";
import {Button} from "../components/button";
import {
    showBuildingList,
    showProductionClusterList,
} from "../engine/navigation";
import {Global} from "../engine/global";
import {BuildingCategories, BuildingCategorySymbols, getBuildingsByCategory} from "../engine/building";

export class BuildingMenu extends React.PureComponent<{
    buildingCategory: string
}> {

    render() {
        const { buildingCategory } = this.props;
        return <article className="gf-building-menu">
            {BuildingCategories.map(category =>
                <Button key={category}
                        action={() => showBuildingList(category)}
                        symbol={BuildingCategorySymbols[category]}
                        state={buildingCategory == category ? "active" : "normal"}/>
            )}
        </article>
    }

}

export class BuildingList extends React.Component {

    render() {
        const buildings = getBuildingsByCategory(Global.navigation.buildingCategory);

        return <article className="gf-building-list">
            {buildings.map(b => b.name)}
        </article>
    }

}

export class ProductionClusterView extends React.Component<{
    id: number
}> {

    render() {
        const cluster = getProductionCluster(this.props.id);

        return <article className="gf-production-cluster-view">
            <BuildingMenu buildingCategory={Global.navigation.buildingCategory}/>
            <Button action={showProductionClusterList} symbol="chevron-left"/>
            Name: {cluster.name}
            <BuildingList/>
        </article>
    }

}
