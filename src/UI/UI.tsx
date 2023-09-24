import React from "react";

import Pane from "./Pane";

import './styles.css';

class UI extends React.Component {

    protected panes: Pane[] = [];

    constructor(props = {}) {
        super(props);
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%', border: 'solid 1px black' }}>
                <Pane>
                    
                </Pane>
            </div>
        );
    }
}

export default UI;