import "../less/index.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {useStrict} from "mobx";
import {observer} from "mobx-react";
import {GameState} from "./game-state";
import {start} from "./game-loop";
import {Tab, TabList} from "./components/tab-list";
import {BuildingList} from "./game-components/building-list";
import {EnergyBuildings, ProductionBuildings, ResourceBuildings} from "./game-model/buildings";
import {ProductionClusterView} from "./game-components/production-cluster-view";
import {getProductionCluster, ProductionCluster} from "./game-model/production-cluster";
import {ProductionClusterBuildingView} from "./game-components/production-cluster-building-view";

useStrict(true);

@observer
class Game extends React.Component {

    render() {
        const state = GameState();

        return <div className="game-container">
            <TabList>
                <Tab text={"Product Cluster View"}>
                    <ProductionClusterView
                        items={state.availableProductionClusters.map(id => getProductionCluster(id))}/>
                </Tab>
                <Tab text={"Production Cluster Building View"}>
                    <ProductionClusterBuildingView
                        items={state.availableProductionClusters.map(id => getProductionCluster(id))}/>
                </Tab>
            </TabList>
        </div>
    }
}

const div = document.createElement("div");
document.body.appendChild(div);
ReactDOM.render(<Game/>, div, function () {
    start();
});
