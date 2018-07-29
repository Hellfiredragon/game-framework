import * as React from "react";
import {getResource} from "../engine/resource";
import {formatNumber} from "../engine/render-utils";
import {Text} from "../components/text";

export class ResourceListItem extends React.PureComponent<{
    id: number,
    amount: number
}> {

    render() {
        const { id, amount } = this.props;
        const resource = getResource(id);

        return <article className="gf-resource-list-item">
            <Text style="accent">{resource.name}:</Text> <Text>{formatNumber(amount)}</Text>
        </article>;
    }

}

export class ResourceList extends React.Component<{
    resources: number[]
}> {

    render() {
        const { resources } = this.props;
        return <article className="gf-resource-list">
            {resources.map((amount, id) => <ResourceListItem key={id} id={id} amount={amount}/>)}
        </article>
    }

}
