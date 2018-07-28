import * as React from "react";
import * as classNames from "classnames";
import {Button} from "../components/button";
import {Border} from "../components/border";
import {ProductionClusterList} from "./production-cluster-list";
import {Global} from "../engine/global";
import {ProductionClusterView} from "./production-cluster-view";
import {showProductionClusterList, showResearchList} from "../engine/navigation";

export class MainMenu extends React.Component<{ page: string }> {

    render() {
        const { page } = this.props;
        return <div>
            <Button action={showProductionClusterList} symbol={"cogs"} state={page.indexOf("production-cluster") == -1 ? "normal" : "active"}/>
            <Button action={showResearchList} symbol={"flask"} state={page.indexOf("research") == -1 ? "normal" : "active"}/>
        </div>
    }

}

export class Main extends React.Component {

    render() {
        let body: JSX.Element;
        switch (Global.navigation.page) {
            case "production-cluster/overview":
                body = <ProductionClusterList/>;
                break;
            case "production-cluster/item":
                body = <ProductionClusterView id={Global.navigation.id}/>;
                break;
            case "research/overview":
                body = <h1>It Works!</h1>;
                break;
            default:
                body = <ProductionClusterList/>;
        }

        return <article className="gf-main">
            <MainMenu page={Global.navigation.page}/>
            {body}
        </article>
    }

}
