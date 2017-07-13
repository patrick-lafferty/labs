import * as React from "react";
const styles = require<any>('./test.css');

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<HelloProps, undefined> {
    render() {
        console.log(styles);
        return <h1 className={styles.thing}>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}