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
const styles = require<any>("../../common/tabcontrol.css");

export class Intro extends React.Component<any, any> {
    render() {
        return (
            <section className={styles.tabContent}>
                CSS Grid Layout is a flexible layout system that allows you to arrange
                content into rows and columns. At first that might sound like tables, 
                but grid is so much more. With grid you can separate the content from
                the layout. You define row and column lines in CSS as opposed to hardcoding
                your content inside <code>&lt;tr&gt;</code> and <code>&lt;td&gt;</code>s.
                This means using media queries you can change how the rows and columns
                are defined, without changing the actual content. This page is an example:
                for small screen widths the grid has just one column so the tabs are displayed
                horizontally on the first row, for larger screens they're displayed vertically
                in the leftmost column.

                Grid offers even more than that. With the new unit <code>fr</code> you can define
                proportional sizes. You can easily set gaps between rows and columns with
                <code>grid-row-gap</code> and <code>grid-column-gap</code>. You can have
                elements span multiple rows and columns.
            </section>
        );
    }
}