import * as React from "react";
import {Cluster} from "../game-model/cluster";
import {Resource, ResourceAmount} from "../game-model/resources";
import {SelectBox} from "../components/select-box";
import {GameState} from "../game-state";

const ProductionClusterSelectBox = SelectBox as new() => SelectBox<Cluster>;

export class ResourceAmountItem extends React.Component<{
    item: ResourceAmount
    onSelect: (resource: Resource) => void
}> {

    handleClick = () => {
        const { item, onSelect } = this.props;
        if (onSelect) onSelect(item.key);
    };

    render() {
        const { item } = this.props;
        return <div className="resource-amount-item" onClick={this.handleClick}>
            <div>{item.key.name}</div>
            <div>{item.value}</div>
        </div>
    }
}

export interface ClusterResourceListProps {
    values: Cluster[]
    selected: Cluster
    onSelect: (productionCluster: Cluster) => void
}

export class ClusterResourceList extends React.Component<ClusterResourceListProps> {

    handleSelect = (selected: Cluster) => {
        const { onSelect } = this.props;
        if (onSelect) onSelect(selected);
    };

    render() {
        const state = GameState();
        const { values, selected, onSelect } = this.props;

        return <div className="cluster-resource-list">
            <div className="header">
                <ProductionClusterSelectBox values={values} onSelect={onSelect} name={x => x.name} selected={selected}/>
            </div>
            <div className="content">
                <table>
                    <tbody>
                    {selected.availableResources.map(resource => {
                        if (state.clusterResources.length > selected.id) {
                            const resources = state.clusterResources[selected.id];
                            if (resources.length > resource.key.id) {
                                return <tr key={resource.key.id}>
                                    <td>{resource.key.name}</td>
                                    <td>{state.clusterResources[selected.id][resource.key.id]}</td>
                                </tr>
                            }
                        }
                        return null;
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    }
}
