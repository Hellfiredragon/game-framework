import * as React from "react";

export interface SelectBoxProps<T> {
    values: Array<T>
    selected: T
    name: (value: T) => string
    onSelect: (value: T) => void
}

export class SelectBox<T> extends React.Component<SelectBoxProps<T>, {
    open: boolean
}> {

    state = {
        open: false
    };

    handleClickSelected = () => {
        this.setState(state => ({ open: !state.open }))
    };

    handleClickValue = (value: T) => () => {
        if (this.props.onSelect) this.props.onSelect(value);
        this.setState(() => ({ open: false }));
    };

    render() {
        const { values, selected, name, onSelect } = this.props;
        const { open } = this.state;

        return <div className="select-box">
            <div className="selected" onClick={this.handleClickSelected}>
                <span>{name(selected)}</span>
                <span className="icon">v</span>
            </div>
            {open && <div className="values">
                {values.map(value => <div key={name(value)} onClick={this.handleClickValue(value)}>{name(value)}</div>)}
            </div>}
        </div>
    }

}
