import React from "react";
import Pane from "./Pane";
import './styles.css';
class UI extends React.Component {
    constructor(props = {}) {
        super(props);
        this.panes = [];
    }
    render() {
        return (React.createElement("div", { style: { width: '100%', height: '100%', border: 'solid 1px black' } },
            React.createElement(Pane, null)));
    }
}
export default UI;
