import * as React from "react";
import * as classNames from "classnames";

export interface Props {
    style?: string;
}

export class Text extends React.PureComponent<Props> {

    render(): React.ReactNode {
        const { style } = this.props;

        const cls = classNames(
            "gf-text",
            style && "gf-" + style
        );

        return <span className={cls}>{this.props.children}</span>
    }

}
