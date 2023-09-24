import React from "react";
import Pane from "./Pane";
import './styles.css';
declare class UI extends React.Component {
    protected panes: Pane[];
    constructor(props?: {});
    render(): React.JSX.Element;
}
export default UI;
