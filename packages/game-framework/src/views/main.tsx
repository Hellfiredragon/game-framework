import * as React from "react";
import {ProductionClusterList} from "./production-cluster-list";
import {Global} from "../engine/global";
import {ProductionClusterView} from "./production-cluster-view";
import {showProductionClusterList, showResearchList} from "../engine/navigation";
import {getResearchProduction} from "../engine/research";
import {getResource} from "../engine/resource";
import {formatNumber} from "../engine/render-utils";
import {Text} from "../components/text";
import {Button} from "../components/button";

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
            {researchProduction.map((amount, resourceId) => <ResearchProductionListItem key={resourceId} id={resourceId} amount={resources[resourceId]}
                                                                                        production={amount}/>)}
        </article>
    }

}

export class MainMenu extends React.PureComponent<{ main: string, sub: string }> {

    render() {
        const { main, sub } = this.props;
        return <article className="gf-main-menu">
            <section>
                <ResearchProductionList/>
            </section>
            <section>
                <Button action={showProductionClusterList} icon={"cogs"} state={main == "production-cluster" && sub == "overview" ? "active" : "normal"}/>
                <Button action={showResearchList} icon={"flask"} state={main == "research" && sub == "overview" ? "active" : "normal"}/>
            </section>
            <section>

            </section>
        </article>
    }

}

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
