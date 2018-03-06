import * as React from "react";
import {Cluster} from "../game-model/cluster";
import {ProductionClusterList} from "../game-components/cluster-list";

export interface ClusterViewProps {
    items: Cluster[]
}

export class ClusterView extends React.Component<ClusterViewProps, {
    selected: Cluster
}> {

    state = { selected: this.props.items[0] };

    componentWillReceiveProps(newProps: ClusterViewProps) {
        this.setState(() => ({ selected: newProps.items[0] }))
    }

    handleSelect = (selected: Cluster) => {
        this.setState(() => ({ selected }))
    };

    render() {
        const { selected } = this.state;

        return <div className="cluster-view">
            <div className="top">
                {selected.name}
            </div>
            <div className="left">
                <ProductionClusterList items={this.props.items} onSelect={this.handleSelect}/>
            </div>
            <div className="main">
                <table>
                    <tbody>
                    <tr>
                        <td>Resource A</td>
                        <td>x1</td>
                        <td>9000</td>
                        <td>20k/s</td>
                    </tr>
                    <tr>
                        <td>Resource B</td>
                        <td>x2</td>
                        <td>7000</td>
                        <td>20k/s</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="right">
                <table>
                    <tbody>
                    <tr>
                        <td>Technology A</td>
                    </tr>
                    <tr>
                        <td>Technology B</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    }
}
