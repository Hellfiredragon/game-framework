import * as React from "react";
import {Building} from "../buildings";

export class BuildingList extends React.Component<{
    buildings: Building[]
}, {
    selected: number
}> {

    state = { selected: 0 };

    componentWillReceiveProps() {
        this.setState(() => ({ selected: 0 }))
    }

    handleSelectBuilding = (selected: number) => () => {
        this.setState(() => ({ selected }))
    };

    render() {
        return <div className="building-list">
            <header>
                {this.props.buildings.map((building, i) =>
                    <BuildingListItem key={building.id} item={building} onClick={this.handleSelectBuilding(i)}/>
                )}
            </header>
            <article>
                {this.state.selected}
            </article>
        </div>
    }

}

export class BuildingListItem extends React.Component<{ item: Building, onClick: () => void }> {
    render() {
        return <div className="building-list-item" onClick={this.props.onClick}>
            {this.props.item.name}
        </div>
    }
}
