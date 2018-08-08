import * as React from "react";
import {Global} from "../../engine/global";
import {getResearchProduction} from "../../engine/research";
import {getResource} from "../../engine/resource";
import {formatNumber} from "../../engine/render-utils";
import {Text} from "../../components/text";

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
