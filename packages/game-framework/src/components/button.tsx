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

export class Button extends React.Component<ButtonProps> {

    lastState: ButtonState = "normal";

    shouldComponentUpdate(nextProps: Readonly<ButtonProps>): boolean {
        return nextProps.state != this.lastState;
    }

    render(): React.ReactNode {
        const { state, action, symbol, text } = this.props;
        this.lastState = state;
        const cls = classNames(
            "gf-button", "gf-" + state, symbol && "gf-symbol"
        );

        return <div className={cls} onClick={state == "normal" ? action : undefined}>
            <Border/>
            {text || <span className={"fas fa-" + symbol}/>}
        </div>
    }

}
