import * as React from "react";
import * as classNames from "classnames";
import {Border} from "./border";

export type ButtonState = "active" | "normal" | "disabled" | undefined;

export interface ButtonProps {
    state?: ButtonState
    action: () => void
    text?: string
    symbol?: string
}

export class Button extends React.PureComponent<ButtonProps> {

    render(): React.ReactNode {
        const { state, action, symbol, text } = this.props;
        const myState: ButtonState = state || "normal";

        const cls = classNames(
            "gf-button", "gf-" + myState, symbol && "gf-symbol"
        );

        return <div className={cls} onClick={myState == "normal" ? action : undefined}>
            <Border/>
            {text || <span className={"fas fa-" + symbol}/>}
        </div>
    }

}
