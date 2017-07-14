import * as React from "react";
const styles = require<any>("./labbar.css");

export interface LabBarProps {name: string};

export class LabBar extends React.Component<LabBarProps, any> {
    render() {
        return (
            <header className={styles.header}>
                <div className={styles.toolbar}>
                    <a href="#" className={styles.labsBreadcrumb}>Labs ></a>
                    <h1 className={styles.name}>{this.props.name} Lab</h1>
                </div>
            </header>
        );
    }
}