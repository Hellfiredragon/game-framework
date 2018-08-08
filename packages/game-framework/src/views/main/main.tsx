import * as React from "react";
import {ProductionClusterList} from "../production-cluster-list";
import {Global} from "../../engine/global";
import {ProductionClusterView} from "../production-cluster-view";
import {MainMenu} from "./main-menu";

export class Main extends React.Component {

    render() {
        const { main, sub, id } = Global.navigation;
        let body: JSX.Element;
        switch (main) {
            default:
                switch (sub) {
                    default:
                        body = <ProductionClusterList/>;
                        break;
                    case "details":
                        body = <ProductionClusterView id={id}/>;
                        break;
                }
                break;
            case "research":
                body = <h1>It Works</h1>;
                break;
        }

        return <article className="gf-main">
            <MainMenu main={main} sub={sub}/>
            <div className="gf-main-content">
                {body}
            </div>
        </article>
    }

}
