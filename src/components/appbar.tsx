import * as React from "react";
const styles = require<any>("./app.css");

export class AppBar extends React.Component<any, any> {
    render() {
        return (
            <div className={styles.toolbar}>
                <h1 className={styles.name}>Web Tech Labs</h1>
            </div>
        );
    }
}
