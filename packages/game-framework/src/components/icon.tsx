import * as React from "react";
import * as classNames from "classnames";

export interface Props {
    icon: string;
}

export class Icon extends React.PureComponent<Props> {

    render(): React.ReactNode {
        const { icon } = this.props;

        const cls = classNames(
            "gf-icon",
            "fas",
            "fa-" + icon
        );

        return <span className={cls}/>
    }

}
