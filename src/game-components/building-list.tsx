import * as React from "react";
import {Building} from "../game-model/buildings";

export class BuildingListItem extends React.Component<{
    item: Building,
    onClick: () => void
}> {
    render() {
        return <div className="building-list-item" onClick={this.props.onClick}>
            {this.props.item.name}
        </div>
    }
}

export class BuildingDetails extends React.Component<{
    item: Building
}> {
    render() {
        const { item } = this.props;
        return <div className="building-details">
            <div>{item.name}</div>
            <div>Energy: {item.energy}</div>
            <div>
                <div>Upgrade Cost:</div>
                {item.cost.filter(x => x.value >= 1).map((cost, i) => <div key={i}>
                    {cost.key.name}: {cost.value.toFixed(0)} ({cost.increase.toFixed(1)})
                </div>)}
            </div>
        </div>
    }
}

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
                <BuildingDetails item={this.props.buildings[this.state.selected]}/>
            </article>
        </div>
    }

}
