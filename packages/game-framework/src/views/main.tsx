import * as React from "react";
import * as classNames from "classnames";
import {Button} from "../components/button";
import {ProductionClusterList} from "./production-cluster-list";
import {Global} from "../engine/global";
import {ProductionClusterView} from "./production-cluster-view";
import {showProductionClusterList, showResearchList} from "../engine/navigation";

export class MainMenu extends React.PureComponent<{ page: string }> {

    render() {
        const { page } = this.props;
        return <article className="gf-main-menu">
            <Button action={showProductionClusterList} icon={"cogs"} state={page.indexOf("production-cluster") == -1 ? "normal" : "active"}/>
            <Button action={showResearchList} icon={"flask"} state={page.indexOf("research") == -1 ? "normal" : "active"}/>
        </article>
    }

}

export class Main extends React.Component {

    render() {
        const { main, sub } = Global.navigation;
        let body: JSX.Element;
        switch (main) {
            default:
                switch (sub) {
                    default:
                        body = <ProductionClusterList/>;
                        break;
                    case "details":
                        body = <ProductionClusterView id={Global.navigation.id}/>;
                        break;
                }
                break;
            case "research":
                body = <h1>It Works</h1>;
                break;
        }

        return <article className="gf-main">
            <MainMenu page={Global.navigation.main}/>
            <div className="gf-main-content">
            {body}
            </div>
        </article>
    }

}
