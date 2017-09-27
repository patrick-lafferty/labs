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
                <p className={styles.noMargin}>CSS Flexbox Layout is a flexible layout system that allows you to arrange
                items linearly along either a single (possibly wrapped) row or column.
                It offers full control over how the items are laid out horizontally and vertically.
                Flex items can be proportionally sized, where they expand to fill the flexbox's size
                according to their flex-grow values, they can be fixed size, or a combination of both:
                giving a minimum fixed size and then dividing up the remaining space proportionally.

                Flexbox offers a great alternative to positioning items with floats.
                They make centering text (or any content in general) horizontally and vertically a breeze.
                As of September 2017 Flexbox boasts a <a href="http://caniuse.com/#feat=flexbox">very high</a> 
                support across all browsers, over 90% (the holdouts being mostly IE versions < 9, with some 
                minor incompatibilities on IE >= 10 and UC Browser for Android).
            </section>
        );
    }
}