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
const styles = require<any>("./areas.css");

interface Layout {className: string, label: string};

interface CellProps {className: string, caption: string};

class Cell extends React.Component<CellProps, any> {
    render() {
        return (
            <div className={this.props.className}>
                <p>{this.props.caption}</p>
            </div>
        );
    }
}

export class Areas extends React.Component<any, any> {
    layouts = new Map<string, Layout>([
        ["oneSidebarLeft", 
            {className: styles.oneSidebarLeft, 
                label: "One Sidebar Left"}],
        ["oneSidebarRight", 
            {className: styles.oneSidebarRight, 
                label: "One Sidebar Right"}],
        ["singleColumn", 
            {className: styles.singleColumn, 
                label: "Single Column"}],
        ["twoSidebars", 
            {className: styles.twoSidebars, 
                label: "Two Sidebars"}],
    ]);

    radioButtons : JSX.Element[] = [];

    constructor(props: any) {
        super(props);

        this.state = {
            layout: this.layouts.get("oneSidebarLeft")
        };

        this.layouts.forEach((layout, key) => {
            this.radioButtons.push((
                <label key={key} htmlFor={key} >
                        <input name="layout" id={key} defaultChecked={layout == this.state.layout ? true : undefined}
                            value={key} type="radio" onChange={this.onLayoutChange}/>
                    {layout.label}</label>
            ));
        });
    }

    onLayoutChange = () => {
        let element = document.querySelector("input[type=radio]:checked");

        if (element != null && element instanceof HTMLInputElement) {
            this.setState({layout: this.layouts.get(element.value)!});
        }
    }

    onGapInput = (e : React.FormEvent<HTMLInputElement>) => {
        let areasSection = document.querySelector("#areas") as HTMLElement;

        if (e.currentTarget.name == "rowGap") {
            areasSection.style.setProperty('--rowGap', e.currentTarget.value + 'em');
        }
        else {
            areasSection.style.setProperty('--columnGap', e.currentTarget.value + 'em');
        }
    }

    render() {
        return (
            <section id="areas" className={styles.tabContent}>
                <p className={styles.noMargin}>
                    Grid Areas are a convenient way to define rectangular areas
                    where content can be layed out. This example shows how by just
                    modifying a few lines of only the grid's css (and leaving 
                    the children's css and html untouched*) the layout of the whole
                    page can be transformed.

                    <br />
                    *with the exception of the two sidebar layout which hides
                    sidebar2 if a layout without it is selected
                </p>

                <div className={styles.layouts}>
                    {this.radioButtons}    
                </div>

                <div className={styles.layouts}>
                    <label>Row gap: <input defaultValue="0" onInput={this.onGapInput} name="rowGap" type="range" min="0" max="10"/></label>
                    <label>Column gap: <input defaultValue="0" onInput={this.onGapInput} name="columnGap" type="range" min="0" max="10"/></label>
                </div>

                <div className={this.state.layout.className}>
                    <Cell className={styles.header} caption="Header"/>
                    <Cell className={styles.sidebar} caption="Sidebar"/>
                    <Cell className={styles.content} caption="Content"/>
                    {this.state.layout.label == "Two Sidebars" ?
                        <Cell className={styles.sidebar2} caption="Sidebar2"/>
                        : null
                    }
                    <Cell className={styles.footer} caption="Footer"/>
                </div>
            </section>
        );
    }
}