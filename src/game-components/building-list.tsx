import * as React from "react";
import {Building} from "../buildings";

export class BuildingList extends React.Component<{ buildings: Building[] }> {

    render() {
        return <div className="building-list">
            {this.props.buildings.map(building => <BuildingListItem key={building.id} item={building}/>)}
        </div>
    }

}

export class BuildingListItem extends React.Component<{ item: Building }> {
    render() {
        return <div className="building-list-item">
            {this.props.item.name}
        </div>
    }
}
