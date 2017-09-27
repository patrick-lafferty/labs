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
const styles = require<any>("./alignment.css");

export class Alignment extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            justifyContent: "flex-start",          
            alignItems: "stretch"
        };
    }

    updateAlignment = (propertyName: string, value: string) => {
        let flex = document.querySelector("#basicFlexbox");
        
        if (flex != null && flex instanceof HTMLDivElement) {
            flex.style.setProperty(propertyName, value);
        }
    }

    onJustifyContentChange = (event: React.FormEvent<HTMLSelectElement>) => {
        this.setState({justifyContent: event.currentTarget.value});
        this.updateAlignment("--justify-content", event.currentTarget.value);
    }

    onAlignItemsChange = (event: React.FormEvent<HTMLSelectElement>) => {
        this.setState({alignItems: event.currentTarget.value});
        this.updateAlignment("--align-items", event.currentTarget.value);
    }

    render() {
        return (
            <section className={styles.tabContent}>
                <p className={styles.noMargin}>With flexbox you have many options on how to align flex items
                    horizontally and vertically. This demo has 5 fixed sized coloured divs to show how
                    the alignments behave.

                    Note: for flex-direction: row, justify-content refers to horizontal alignment, and align items
                    refers to vertical alignment. For flex-direction: column, swap the two.
                </p>

                <div className={styles.alignmentConfig}>
                    <label>Justify Content 
                        <select className={styles.alignmentOption} value={this.state.justifyContent} onChange={this.onJustifyContentChange}>
                            <option value="flex-start">flex-start</option>
                            <option value="flex-end">flex-end</option>
                            <option value="center">center</option>
                            <option value="space-between">space-between</option>
                            <option value="space-around">space-around</option>
                            <option value="space-evenly">space-evenly</option>
                        </select>
                    </label>

                    <label>Align Items 
                        <select className={styles.alignmentOption} value={this.state.alignItems} onChange={this.onAlignItemsChange}>
                            <option value="flex-start">flex-start</option>
                            <option value="flex-end">flex-end</option>
                            <option value="center">center</option>
                            <option value="baseline">baseline</option>
                            <option value="stretch">stretch</option>
                        </select>
                    </label>
                </div>

                <div id="basicFlexbox" className={styles.alignmentDemo}>
                    <div className={styles.tile0}></div>
                    <div className={styles.tile1}></div>
                    <div className={styles.tile2}></div>
                    <div className={styles.tile3}></div>
                    <div className={styles.tile4}></div>
                </div>
            </section>
        );
    }
}