import * as React from "react";
import * as classNames from "classnames";
import {Button} from "../components/button";
import {ProductionClusterList} from "./production-cluster-list";
import {Global} from "../engine/global";
import {ProductionClusterView} from "./production-cluster-view";
import {showProductionClusterList, showResearchList} from "../engine/navigation";
import {getResearchProduction} from "../engine/research";
import {formatNumber} from "../engine/render-utils";
import {calcProduction} from "../engine/production-cluster";
import {getResource} from "../engine/resource";
import {Text} from "../components/text";

export class ResearchProductionListItem extends React.PureComponent<{
    id: number;
    amount: number;
    production: number;
}> {

    render() {
        const { id, amount, production } = this.props;
        const resource = getResource(id);
        const productionStyle = production > 0 ? "green" : production < 0 ? "red" : "grey";

        return <article className="gf-resource-list-item">
            <Text style="accent">{resource.name}:</Text> <Text>{formatNumber(amount)}</Text> <Text
            style={productionStyle}>({formatNumber(production)}/s)</Text>
        </article>;
    }

}

export class ResearchProductionList extends React.Component {

    render() {
        const resources = Global.resources;
        const researchProduction = getResearchProduction();
        return <article className="gf-research-production">
            {researchProduction.map((amount, resourceId) => <ResearchProductionListItem id={resourceId} amount={resources[resourceId]} production={amount}/>)}
        </article>
    }

}

export class MainMenu extends React.Component<{ page: string }> {

    render() {
        const { page } = this.props;
        return <article className="gf-main-menu">
            <section>
                <ResearchProductionList/>
            </section>
            <section>
                <Button action={showProductionClusterList} icon={"cogs"} state={page.indexOf("production-cluster") == -1 ? "normal" : "active"}/>
                <Button action={showResearchList} icon={"flask"} state={page.indexOf("research") == -1 ? "normal" : "active"}/>
            </section>
            <section>

            </section>
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
