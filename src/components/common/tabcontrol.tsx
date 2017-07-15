/*
MIT License
Copyright (c) 2017 Patrick Lafferty
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import * as React from "react";
import {Button} from "./button";
const styles = require<any>("./tabcontrol.css");


/*
The TabControl has a column of buttons("tabs") and a content area
which displays content based on the last pressed tab
*/
export interface TabControlProps {contents: Map<string, JSX.Element>};
interface TabControlState {content: string, tabs: string[]};
export class TabControl extends React.Component<TabControlProps, TabControlState> {

    constructor(props: TabControlProps) {
        super(props);
        let tabs : string[] = [];

        props.contents.forEach((_, key) => tabs.push(key));

        this.state = {
            content: tabs[0],
            tabs: tabs
        };

    }

    click = (e : React.MouseEvent<HTMLElement>) => {
        let el = e.target as HTMLElement;

        if (el.dataset.tabName) {
            let tabName = el.dataset.tabName;

            let clickedTab = this.state.tabs.find(tab => tab == tabName);

            if (clickedTab) {
                this.setState({content: clickedTab});
                e.stopPropagation();
            }
        }

    };

    render() {
        let tabs = this.state.tabs.map(name => <Button key={name} name={name}/>);
        let content = this.props.contents.get(this.state.content);

        return (
            <section className={styles.tabControl}
                    onClick={this.click}>
                <div className={styles.tabBlock}>
                    {tabs}
                </div>
                {content}
            </section>
        )
    }
}