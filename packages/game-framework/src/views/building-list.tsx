import * as React from "react";
import {getBuildingsByCategory} from "../engine/building";
import {Global} from "../engine/global";
import {getBuilding} from "../engine/building";
import {getResource} from "../engine/resource";

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
    id: number
}> {

    render() {
        const building = getBuilding(this.props.id);

        return <article className="gf-building-list-item">
            {building.name}
            <ResourceList resources={building.cost}/>
        </article>;
    }

}

export class BuildingList extends React.Component {

    render() {
        const buildings = getBuildingsByCategory(Global.navigation.buildingCategory);

        return <article className="gf-building-list">
            {buildings.map(b => <BuildingListItem key={b.id} id={b.id}/>)}
        </article>
    }

}
