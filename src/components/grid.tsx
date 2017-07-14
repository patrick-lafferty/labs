import * as React from "react";

const styles = require<any>("./grid.css");

export interface GridProps {children: React.Component[]};

/*
The grid component renders lab components in an evenly spaced css grid
*/
export class Grid extends React.Component<any, any> {
    render() {
        return (
            <div className={styles.grid}>
                {this.props.children}
            </div>
        );
    }
}