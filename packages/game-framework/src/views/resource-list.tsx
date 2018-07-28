import * as React from "react";
import {getResource} from "../engine/resource";
import {formatNumber} from "../engine/render-utils";

export class ResourceListItem extends React.PureComponent<{
    id: number,
    amount: number
}> {

    render() {
        const { id, amount } = this.props;
        const resource = getResource(id);

        return <article className="gf-resource-list-item">
            {resource.name}: {formatNumber(amount)}
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
