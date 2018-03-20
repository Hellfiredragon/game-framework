import * as React from "react";

const HeaderHeight = "40px";
const PaneWidth = "200px";
const Border = "1px solid black";

export class HeaderLine extends React.Component {
    render() {
        return <div style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: HeaderHeight,
            border: Border
        }}>
            {this.props.children}
        </div>
    }
}

export class BottomLine extends React.Component {
    render() {
        return <div style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: HeaderHeight,
            border: Border
        }}>
            {this.props.children}
        </div>
    }
}

export class LeftPanel extends React.Component {
    render() {
        return <div style={{
            position: "absolute",
            left: 0,
            top: HeaderHeight,
            bottom: HeaderHeight,
            width: PaneWidth,
            border: Border
        }}>
            {this.props.children}
        </div>
    }
}

export class RightPanel extends React.Component {
    render() {
        return <div style={{
            position: "absolute",
            right: 0,
            top: HeaderHeight,
            bottom: HeaderHeight,
            width: PaneWidth,
            border: Border
        }}>
            {this.props.children}
        </div>
    }
}

export class CenterPanel extends React.Component {
    render() {
        return <div style={{
            position: "absolute",
            top: HeaderHeight,
            left: PaneWidth,
            right: PaneWidth,
            bottom: HeaderHeight,
            border: Border
        }}>
            {this.props.children}
        </div>
    }
}
