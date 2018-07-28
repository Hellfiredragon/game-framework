import * as React from "react";
import {getBuildingsByCategory} from "../engine/building";
import {Global} from "../engine/global";
import {getBuilding} from "../engine/building";

export class BuildingListItem extends React.PureComponent<{
    id: number
}> {

    render() {
        const building = getBuilding(this.props.id);

        return <article className="gf-building-list-item">
            {building.name}
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
