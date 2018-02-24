import * as React from "react";

export class TabList extends React.Component<{}, {
    selected: number
}> {

    state = { selected: 0 };

    handleClickTab = (selected: number) => () => {
        this.setState(() => ({ selected }))
    };

    render() {
        const children = React.Children.toArray(this.props.children) as React.ReactElement<{ children?: React.ReactNode, onClick: () => void }>[];

        return <div className="tab-list">
            <header>
                {children.map((child, i) => React.cloneElement(child, { onClick: this.handleClickTab(i) }))}
            </header>
            <article>
                {children[this.state.selected].props.children}
            </article>
        </div>
    }

}

export class Tab extends React.Component<{
    text: string,
    onClick?: () => void
}> {

    render() {
        return <div className="tab-title" onClick={this.props.onClick}>
            {this.props.text}
        </div>;
    }

}
