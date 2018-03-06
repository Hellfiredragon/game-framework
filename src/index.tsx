import "../less/index.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {useStrict} from "mobx";
import {observer} from "mobx-react";
import {GameState} from "./game-state";
import {start} from "./game-loop";
import {Tab, TabList} from "./components/tab-list";
import {getProductionCluster} from "./game-model/cluster";
import {ClusterView} from "./game-views/cluster-view";
import {ClusterBuildingView} from "./game-views/cluster-building-view";

useStrict(true);

@observer
class Game extends React.Component {

    render() {
        const state = GameState();

        return <div className="game-container">
            <TabList>
                <Tab text={"Cluster View"}>
                    <ClusterView
                        items={state.ownedClusters.map((b, id) => getProductionCluster(id))}/>
                </Tab>
                <Tab text={"Cluster Building View"}>
                    <ClusterBuildingView
                        items={state.ownedClusters.map((b, id) => getProductionCluster(id))}/>
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
