import * as React from "react";
import {Pages, showProductionClusterList, showResearchList} from "../../engine/navigation";
import {ResearchProductionList} from "./research-production-list";
import {Button} from "../../components/button";

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
