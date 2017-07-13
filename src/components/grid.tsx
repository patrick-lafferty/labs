import * as React from "react";

const styles = require<any>("./grid.css");

export interface GridProps {children: React.Component[]};

export class Grid extends React.Component<any, any> {
    render() {
        return (
            <div className={styles.grid}>
                {this.props.children}
            </div>
        );
    }
}