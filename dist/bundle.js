/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*\r\nMIT License\r\nCopyright (c) 2017 Patrick Lafferty\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the \"Software\"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n*/\r\n\r\n.tabcontrol__tabBlock__2Fg2ydYiYG {\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.tabcontrol__tabControl__1zBNCRK8xK {\r\n    display: grid;\r\n    width: 80%;\r\n    height:100%;\r\n    margin: auto;\r\n    padding: 2rem;\r\n\r\n    grid-template-columns: auto 1fr;\r\n\r\n    grid-column-gap: 1.5rem;\r\n}\r\n\r\n.tabcontrol__noMargin__3gEpWBMOfT {\r\n    margin-top: 0rem;\r\n}\r\n\r\n.tabcontrol__tabContent__2262kYOG7c {\r\n    background: white;\r\n    font-family: \"Exo 2\";\r\n    padding: 1.5rem;\r\n    border-radius: 2px;\r\n    line-height: 1.62em;\r\n    height: 100%;\r\n}\r\n\r\n@media (max-width: 640px) {\r\n    .tabcontrol__tab__1C-0V7Uihr {\r\n        margin: 0.5em 0.5em 0em 0em;\r\n        box-shadow: 0px 3px 3px rgba(0,0,0,0.25);\r\n    }\r\n\r\n    .tabcontrol__tabBlock__2Fg2ydYiYG {\r\n        flex-direction: row;\r\n    }\r\n\r\n    .tabcontrol__tabControl__1zBNCRK8xK {\r\n        width: 95%;\r\n        padding: unset;\r\n        grid-template-rows: auto 1fr;\r\n        grid-row-gap: 1.5rem;\r\n        grid-template-columns: unset;\r\n        grid-column-gap: unset;\r\n    }\r\n}\r\n\r\n@media (max-width: 360px) {\r\n    .tabcontrol__tab__1C-0V7Uihr {\r\n        margin: 0.5em 0.2em 0em 0em;\r\n    }\r\n\r\n    .tabcontrol__tabControl__1zBNCRK8xK {\r\n        padding: 0rem;\r\n    }\r\n}", ""]);

// exports
exports.locals = {
	"tabBlock": "tabcontrol__tabBlock__2Fg2ydYiYG",
	"tabControl": "tabcontrol__tabControl__1zBNCRK8xK",
	"noMargin": "tabcontrol__noMargin__3gEpWBMOfT",
	"tabContent": "tabcontrol__tabContent__2262kYOG7c",
	"tab": "tabcontrol__tab__1C-0V7Uihr"
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-0!./tabcontrol.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-0!./tabcontrol.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--3-0!./app.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--3-0!./app.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Button; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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

var styles = __webpack_require__(24);
;
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        var _this = _super.call(this, props) || this;
        _this.mouseDown = function () {
            _this.setState({ clicked: true });
        };
        _this.animationEnd = function () {
            _this.setState({ clicked: false });
        };
        _this.state = {
            clicked: false
        };
        return _this;
    }
    Button.prototype.render = function () {
        var className = "";
        if (this.state.clicked) {
            className = styles.clickedButton;
        }
        else {
            className = styles.button;
        }
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", { onMouseDown: this.mouseDown, onAnimationEnd: this.animationEnd, className: className, "data-tab-name": this.props.name }, this.props.name));
    };
    return Button;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_app__ = __webpack_require__(9);
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



__webpack_require__(42);
__webpack_require__(44);
__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"](__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__components_app__["a" /* App */], null), document.getElementById("root"));


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__labcard__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__browser__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__labviewer__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__labs_grid_grid_lab__ = __webpack_require__(30);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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




var styles = __webpack_require__(5);
//labs

;
;
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        /*
        is called whenever window.onpopstate fires, also when
        the app is first mounted
        */
        _this.stateChanged = function () {
            var route = "", hash = window.location.hash;
            if (hash.startsWith("#")) {
                route = hash.substr(1);
            }
            _this.setState({ route: route, previous: "", direct: true });
        };
        _this.click = function (e) {
            var el = e.target;
            /*
            Click can be called for many other elements besides the lab cards,
            like a child of a card, or not even a card at all.
    
            each lab card holds the route to go to it, so if a descendent of
            the card was clicked we need to get the card to get the route
            */
            var labCard = el.closest("section[data-group='lab-card']");
            if (labCard != null) {
                var route = labCard.dataset.cardRoute;
                window.history.pushState({}, "", "#" + route);
                _this.setState({ route: route, previous: "", direct: false });
            }
            else if ("tabName" in el.dataset && el.dataset.tabName == "Labs >") {
                window.history.pushState({}, "", "#");
                _this.setState({ route: "", previous: _this.state.route, direct: false });
            }
        };
        _this.state = {
            route: "",
            previous: "",
            direct: false //true if the user directly navigated to www..../#something, false otherwise
        };
        window.onpopstate = _this.stateChanged;
        _this.labRoutes = new Map([
            ["Grid", { name: "Grid", component: __WEBPACK_IMPORTED_MODULE_4__labs_grid_grid_lab__["a" /* GridLab */] }],
        ]);
        _this.tiles = [__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__labcard__["a" /* LabCard */], { key: "Grid", name: "Grid", route: "Grid", previewImage: "./images/grid-card-preview.png" })];
        return _this;
    }
    /*
    The user might have directly linked a lab, so we need
    to check the url and change state accordingly
    */
    App.prototype.componentDidMount = function () {
        this.stateChanged();
    };
    App.prototype.render = function () {
        var content = null;
        if (this.state.route == "" && this.state.previous == "") {
            content = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */], { offscreen: false, children: this.tiles });
        }
        else {
            var labRoute = "", className = styles.offscreenApp;
            if (this.state.route == "") {
                /*
                we went from a lab back to the main screen
                */
                labRoute = this.state.previous;
                className = styles.onscreenApp;
            }
            else {
                /*
                we went from the main screen to a lab
                */
                labRoute = this.state.route;
            }
            if (this.state.direct) {
                className = styles.directOffscreenApp;
            }
            if (this.labRoutes.has(labRoute)) {
                var route = this.labRoutes.get(labRoute);
                /*
                component needs to be capitalized in order to use it in the following statement
                see https://facebook.github.io/react/docs/jsx-in-depth.html#choosing-the-type-at-runtime
                */
                var Component = route.component;
                var viewer = __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__labviewer__["a" /* LabViewer */], { name: route.name, lab: __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Component, null) });
                /*
                content will be a flexbox with twice the width of the screen,
                with the browser and viewer both taking up half of it,
                with an animation moving between the two
                */
                content =
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: className },
                        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__browser__["a" /* Browser */], { offscreen: true, children: this.tiles }),
                        viewer);
            }
        }
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { onClick: this.click }, content));
    };
    return App;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LabCard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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

var styles = __webpack_require__(11);
;
/*
A lab card component is a tile that previews a webapp with a heading and image,
to be added to a grid component
*/
var LabCard = (function (_super) {
    __extends(LabCard, _super);
    function LabCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LabCard.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("section", { "data-group": "lab-card", "data-card-route": this.props.route, className: styles.tile },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", { className: styles.secondaryContent }, this.props.name),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.primaryContent },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("img", { src: this.props.previewImage }))));
    };
    return LabCard;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--3-0!./labcard.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--3-0!./labcard.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*\r\nMIT License\r\nCopyright (c) 2017 Patrick Lafferty\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the \"Software\"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n*/\r\n.labcard__primaryContent__308G9S8MGL {\r\n    height: 10rem;\r\n    background: white;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.labcard__secondaryContent__2edl8ZqkaZ {\r\n    background: var(--secondary-colour);\r\n    color: var(--secondary-text);\r\n    margin: 0rem;\r\n    font-family: \"Oswald\";\r\n    font-size: 2em;\r\n    padding: 0.7em 1.5em;\r\n}\r\n\r\n.labcard__tile__20dz3qgZzQ {\r\n    width: 20rem;\r\n    box-shadow: 0px 3px 3px rgba(0,0,0,0.25);\r\n    cursor: pointer;\r\n}\r\n\r\n@media (max-width: 360px) {\r\n    .labcard__tile__20dz3qgZzQ {\r\n        width: unset;\r\n    }\r\n}\r\n\r\n@media (min-width: 361px) and (max-width: 640px) {\r\n    .labcard__tile__20dz3qgZzQ {\r\n        width: 15rem;\r\n    }\r\n}", ""]);

// exports
exports.locals = {
	"primaryContent": "labcard__primaryContent__308G9S8MGL",
	"secondaryContent": "labcard__secondaryContent__2edl8ZqkaZ",
	"tile": "labcard__tile__20dz3qgZzQ"
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Browser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__appbar__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_grid__ = __webpack_require__(17);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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



var styles = __webpack_require__(20);
;
/*
A Browser renders the main app bar along with a grid of tiles
*/
var Browser = (function (_super) {
    __extends(Browser, _super);
    function Browser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Browser.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.browser },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__appbar__["a" /* AppBar */], null),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.preamble },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, "Labs are interactive demos focused on one specific concept. Click on the cards below to view the labs.")),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__common_grid__["a" /* Grid */], { children: this.props.children })));
    };
    return Browser;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppBar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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

var styles = __webpack_require__(5);
/*
An AppBar is a simple header positioned at the top of the page
*/
var AppBar = (function (_super) {
    __extends(AppBar, _super);
    function AppBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppBar.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.toolbar },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", { className: styles.name }, "Web Tech Labs")));
    };
    return AppBar;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*\r\nMIT License\r\nCopyright (c) 2017 Patrick Lafferty\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the \"Software\"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n*/\r\n.app__toolbar__3lBEW4mh6J {\r\n    background: var(--primary-dark);\r\n    margin: 0rem 0rem 1rem 0rem;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.app__name__2cJrCg1RHZ {\r\n    color: var(--secondary-text);\r\n    font-family: \"Oswald\";\r\n    font-size: 4rem;\r\n    margin: 0rem;\r\n}\r\n\r\n@media (max-width: 400px) {\r\n    .app__name__2cJrCg1RHZ {\r\n        font-size: 2rem;\r\n    }\r\n\r\n}\r\n\r\n.app__offscreenApp__1Rvq0FpX-X {\r\n    flex-wrap: nowrap;\r\n    display: flex;\r\n    width: 200%;\r\n\r\n    animation-name: app__slideOut__1MyjihOfrD;\r\n    animation-duration: 1s;\r\n    animation-fill-mode: forwards;\r\n    /*will-change: transform;*/\r\n}\r\n\r\n.app__directOffscreenApp__EVAjr08XaF {\r\n    animation-duration: 0s;\r\n}\r\n\r\n.app__onscreenApp__12q2MqcRcQ {\r\n    \r\n    animation-name: app__slideIn__ViSS919gzY;\r\n    animation-duration: 1s;\r\n}\r\n\r\n@keyframes app__slideOut__1MyjihOfrD {\r\n    0% {\r\n        transform: translateX(0%);\r\n    }\r\n\r\n    100% {\r\n        transform: translateX(-50%);\r\n    }\r\n}\r\n\r\n@keyframes app__slideIn__ViSS919gzY {\r\n    0% {\r\n        transform: translateX(-50%);\r\n    }\r\n\r\n    100% {\r\n        transform: translateX(0%);\r\n    }\r\n}", ""]);

// exports
exports.locals = {
	"toolbar": "app__toolbar__3lBEW4mh6J",
	"name": "app__name__2cJrCg1RHZ",
	"offscreenApp": "app__offscreenApp__1Rvq0FpX-X",
	"slideOut": "app__slideOut__1MyjihOfrD",
	"directOffscreenApp": "app__directOffscreenApp__EVAjr08XaF app__offscreenApp__1Rvq0FpX-X",
	"onscreenApp": "app__onscreenApp__12q2MqcRcQ app__offscreenApp__1Rvq0FpX-X",
	"slideIn": "app__slideIn__ViSS919gzY"
};

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Grid; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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

var styles = __webpack_require__(18);
;
/*
The grid component renders tiles in an evenly spaced css grid
*/
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.grid }, this.props.children));
    };
    return Grid;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-0!./grid.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-0!./grid.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*\r\nMIT License\r\nCopyright (c) 2017 Patrick Lafferty\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the \"Software\"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n*/\r\n.grid__grid__3CpU-UIjGh {\r\n    display: grid;\r\n    background: var(--primary-colour);\r\n    padding: 2rem;\r\n    margin: auto;\r\n    width: 80%;\r\n\r\n    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));\r\n    grid-auto-rows: repeat(auto-fill, min-max(5em, 1fr));\r\n\r\n    grid-column-gap: 2rem;\r\n    grid-row-gap: 2rem;\r\n}\r\n\r\n@media (max-width: 400px) {\r\n    .grid__grid__3CpU-UIjGh {\r\n        width: 90%;\r\n        padding: 0rem;\r\n\r\n        grid-template-columns: 1fr;\r\n\r\n    }\r\n}\r\n\r\n@media (max-width: 640px) {\r\n    .grid__grid__3CpU-UIjGh {\r\n        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));\r\n    }\r\n}", ""]);

// exports
exports.locals = {
	"grid": "grid__grid__3CpU-UIjGh"
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--3-0!./browser.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--3-0!./browser.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*\r\nMIT License\r\nCopyright (c) 2017 Patrick Lafferty\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the \"Software\"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n*/\r\n.browser__browser__3iM0eD7UoE {\r\n    flex: 1 0 50%;\r\n}\r\n\r\n.browser__preamble__28nP65xTAY {\r\n    display: flex;\r\n    font-size: 1.5em;\r\n    justify-content: center;\r\n}", ""]);

// exports
exports.locals = {
	"browser": "browser__browser__3iM0eD7UoE",
	"preamble": "browser__preamble__28nP65xTAY"
};

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LabViewer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__labbar__ = __webpack_require__(23);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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


var styles = __webpack_require__(28);
;
/*
A LabViewer renders a Lab with a LabBar at the top of the screen
*/
var LabViewer = (function (_super) {
    __extends(LabViewer, _super);
    function LabViewer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LabViewer.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.labViewer },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__labbar__["a" /* LabBar */], { name: this.props.name }),
            this.props.lab));
    };
    return LabViewer;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LabBar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_button__ = __webpack_require__(6);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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


var styles = __webpack_require__(26);
;
/*
LabBar represents the top app bar with the lab's name and
a button "Lab >" that goes back to the main screen
*/
var LabBar = (function (_super) {
    __extends(LabBar, _super);
    function LabBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //<button className={styles.labsBreadcrumb}>Labs ></button>
    LabBar.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("header", { className: styles.header },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.toolbar },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__common_button__["a" /* Button */], { name: "Labs >" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", { className: styles.name },
                    this.props.name,
                    " Lab"))));
    };
    return LabBar;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-0!./button.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-0!./button.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*\r\nMIT License\r\nCopyright (c) 2017 Patrick Lafferty\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the \"Software\"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n*/\r\n\r\n.button__button__30_4D_T3of {\r\n    padding: 1em;\r\n    margin: 0.5em 0em;\r\n    z-index: 1;\r\n\r\n    border-radius: 2px;\r\n    border: none;\r\n    background: var(--secondary-colour);\r\n    color: var(--secondary-text);\r\n    \r\n    text-transform: uppercase;\r\n    font-family: \"Exo 2\";\r\n    \r\n    overflow: hidden;\r\n    cursor: pointer;\r\n}\r\n\r\n@media (max-width: 640px) {\r\n    .button__button__30_4D_T3of {\r\n        margin: 0em 0.5em;\r\n    }\r\n}\r\n\r\n.button__clickedButton__3hMQklffgt {\r\n\r\n    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);\r\n\r\n    animation-name: button__secondaryEffect__1KT2NPsrKy;\r\n    animation-duration: 0.35s;\r\n\r\n    position: relative;\r\n}\r\n\r\n.button__clickedButton__3hMQklffgt::before {\r\n    top: 0;\r\n    bottom: 0;\r\n    left: 25%;\r\n    position: absolute;\r\n    width: 50%;\r\n    z-index: -1;\r\n\r\n    content: \"\";\r\n    \r\n    opacity: 0;\r\n    border-radius: 100%;\r\n    background-image: radial-gradient(circle at center,\r\n                rgba(var(--secondary-dark-rgb), 0.5) 0, \r\n                rgba(var(--secondary-dark-rgb), 0.5) 60%, \r\n                rgba(var(--secondary-colour-rgb), 0.3));\r\n\r\n    animation-name: button__primaryEffect__2A4ttp9g2U;\r\n    animation-duration: 0.35s;\r\n    animation-fill-mode: forwards;\r\n}\r\n\r\n/*\r\nChanges the background colour of the button from light\r\nto dark and back, only visible from the left and right sides\r\nsince the primary effect covers it\r\n*/\r\n@keyframes button__secondaryEffect__1KT2NPsrKy {\r\n    0% {\r\n        background: var(--secondary-colour);\r\n    }\r\n    50% {\r\n        background: rgba(var(--secondary-dark-rgb), 0.8);\r\n    }\r\n    100% {\r\n        background: var(--secondary-colour);\r\n    }\r\n}\r\n\r\n/*\r\na radial gradient that grows and flashes from fully\r\ntransparent to opaque and back again\r\n*/\r\n@keyframes button__primaryEffect__2A4ttp9g2U {\r\n    0% {\r\n        opacity: 0;\r\n        transform: scale(1, 1);\r\n    }\r\n    50% {\r\n        opacity: 1;\r\n    }\r\n    100% {\r\n        opacity: 0;\r\n        transform: scale(1.7, 1.7);\r\n    }\r\n}", ""]);

// exports
exports.locals = {
	"button": "button__button__30_4D_T3of",
	"clickedButton": "button__clickedButton__3hMQklffgt button__button__30_4D_T3of",
	"secondaryEffect": "button__secondaryEffect__1KT2NPsrKy",
	"primaryEffect": "button__primaryEffect__2A4ttp9g2U"
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--3-0!./labbar.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--3-0!./labbar.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*\r\nMIT License\r\nCopyright (c) 2017 Patrick Lafferty\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the \"Software\"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n*/\r\n.labbar__header__38w_BgyMRT {\r\n    background: var(--primary-dark);\r\n    margin: 0rem 0rem 1rem 0rem;\r\n    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.labbar__toolbar__3oPz5z2Axy {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    width: 50%;\r\n}\r\n\r\n.labbar__name__rwq6kQjkXC {\r\n    color: var(--secondary-text);\r\n    font-family: \"Oswald\";\r\n    font-size: 4em;\r\n    margin: 0rem;\r\n}\r\n\r\n.labbar__labsBreadcrumb__WBLW93Wg6A {\r\n    padding-left: 2rem;\r\n    font-size: 3em;\r\n}\r\n\r\n\r\n@media (max-width: 360px) {\r\n    .labbar__toolbar__3oPz5z2Axy {\r\n        width: 90%;\r\n    }\r\n}\r\n\r\n@media (min-width: 361px) and (max-width: 640px) {\r\n    .labbar__toolbar__3oPz5z2Axy {\r\n        width: 70%;\r\n    }\r\n}", ""]);

// exports
exports.locals = {
	"header": "labbar__header__38w_BgyMRT",
	"toolbar": "labbar__toolbar__3oPz5z2Axy",
	"name": "labbar__name__rwq6kQjkXC",
	"labsBreadcrumb": "labbar__labsBreadcrumb__WBLW93Wg6A labbar__name__rwq6kQjkXC"
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--3-0!./labviewer.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--3-0!./labviewer.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*\r\nMIT License\r\nCopyright (c) 2017 Patrick Lafferty\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the \"Software\"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n*/\r\n\r\n.labviewer__labViewer__1kHZ7kviU7 {\r\n    flex: 1 0 50%;\r\n}", ""]);

// exports
exports.locals = {
	"labViewer": "labviewer__labViewer__1kHZ7kviU7"
};

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GridLab; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_tabcontrol__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__basics__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__areas__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__references__ = __webpack_require__(39);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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






var styles = __webpack_require__(40);
/*
The GridLab demonstrates different properties and uses of CSS Grid
*/
var GridLab = (function (_super) {
    __extends(GridLab, _super);
    function GridLab(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            contents: new Map([
                ["Intro", __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__intro__["a" /* Intro */], null)],
                ["Basics", __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_3__basics__["a" /* Basics */], null)],
                ["Areas", __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4__areas__["a" /* Areas */], null)],
                ["References", __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_5__references__["a" /* References */], null)]
            ])
        };
        return _this;
    }
    GridLab.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("article", { className: styles.lab },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__common_tabcontrol__["a" /* TabControl */], { contents: this.state.contents })));
    };
    return GridLab;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabControl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__button__ = __webpack_require__(6);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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


var styles = __webpack_require__(4);
;
;
var TabControl = (function (_super) {
    __extends(TabControl, _super);
    function TabControl(props) {
        var _this = _super.call(this, props) || this;
        _this.click = function (e) {
            var el = e.target;
            if (el.dataset.tabName) {
                var tabName_1 = el.dataset.tabName;
                var clickedTab = _this.state.tabs.find(function (tab) { return tab == tabName_1; });
                if (clickedTab) {
                    _this.setState({ content: clickedTab });
                    e.stopPropagation();
                }
            }
        };
        var tabs = [];
        props.contents.forEach(function (_, key) { return tabs.push(key); });
        _this.state = {
            content: tabs[0],
            tabs: tabs
        };
        return _this;
    }
    TabControl.prototype.render = function () {
        var tabs = this.state.tabs.map(function (name) { return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__button__["a" /* Button */], { key: name, name: name }); });
        var content = this.props.contents.get(this.state.content);
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("section", { className: styles.tabControl, onClick: this.click },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.tabBlock }, tabs),
            content));
    };
    return TabControl;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Intro; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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

var styles = __webpack_require__(4);
var Intro = (function (_super) {
    __extends(Intro, _super);
    function Intro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Intro.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("section", { className: styles.tabContent },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", { className: styles.noMargin },
                "CSS Grid Layout is a flexible layout system that allows you to arrange content into rows and columns. At first that might sound like tables, but grid is so much more. With grid you can separate the content from the layout. You define row and column lines in CSS as opposed to hardcoding your content inside ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "<tr>"),
                " and ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "<td>"),
                "s. This means using media queries you can change how the rows and columns are defined, without changing the actual content. This page is an example: for small screen widths the grid has just one column so the tabs are displayed horizontally on the first row, for larger screens they're displayed vertically in the leftmost column. Grid offers even more than that. With the new unit ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "fr"),
                " you can define proportional sizes. You can easily set gaps between rows and columns with",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "grid-row-gap"),
                " and ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("code", null, "grid-column-gap"),
                ". You can have elements span multiple rows and columns.")));
    };
    return Intro;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Basics; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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

var styles = __webpack_require__(34);
var Basics = (function (_super) {
    __extends(Basics, _super);
    function Basics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Basics.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("section", { className: styles.tabContent },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", { className: styles.noMargin }, "This is a basic grid example with various coloured divs. The blue div spans 3 columns, the green div spans an area of 2x2 cells, the red div spans 2 rows, and the remaining divs are the same size. If you are using Firefox, try inspecting the grid below. In the \"display: grid\" property there is a # symbol between display and grid. Click on it to see the gridlines and try changing the grid-row/grid-column/grid-area values of the divs."),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.demoGrid },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.tile0 }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.tile1 }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.tile2 }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.tile3 }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.tile4 }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.tile5 }))));
    };
    return Basics;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--3-0!./basics.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--3-0!./basics.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports
exports.i(__webpack_require__(3), undefined);

// module
exports.push([module.i, "/*\r\nMIT License\r\nCopyright (c) 2017 Patrick Lafferty\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the \"Software\"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n*/\r\n\r\n.basics__tabContent__1j0oN9oOkm {\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.basics__noMargin__2y20e4FL4F {\r\n}\r\n\r\n.basics__demoGrid__3c7VbfZxvI {\r\n    display: grid;\r\n    height: 100%;\r\n\r\n    grid-template-columns: repeat(4, 1fr);\r\n    grid-row-gap: 1em;\r\n    grid-column-gap: 1em;\r\n}\r\n\r\n.basics__tile__1o_aC4sC8Q {\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n.basics__tile0__1wXFVsA37Q {\r\n    background: blue;\r\n    grid-column: 1/4;\r\n}\r\n\r\n.basics__tile1__31WRNv5Usx {\r\n    background: red;\r\n    grid-row: 1/3;\r\n    grid-column: 4/5;\r\n}\r\n\r\n.basics__tile2__3aZpCXg8lJ {\r\n    background: green;\r\n    grid-area: 2/1/4/3;\r\n}\r\n\r\n.basics__tile3__p4GlJbUt8N {\r\n    background: yellow;\r\n}\r\n\r\n.basics__tile4__1b5fio7p_o {\r\n    background: purple;\r\n}\r\n\r\n.basics__tile5__TcMacShAub {\r\n    background: orange;\r\n}\r\n\r\n.basics__tile6__1b2Jbe7N-2 {\r\n    background: brown;\r\n}\r\n\r\n.basics__tile7__2vAkUpDsds {\r\n    background: slateblue;\r\n}\r\n", ""]);

// exports
exports.locals = {
	"tabContent": "basics__tabContent__1j0oN9oOkm " + __webpack_require__(3).locals["tabContent"] + "",
	"noMargin": "basics__noMargin__2y20e4FL4F " + __webpack_require__(3).locals["noMargin"] + "",
	"demoGrid": "basics__demoGrid__3c7VbfZxvI",
	"tile": "basics__tile__1o_aC4sC8Q",
	"tile0": "basics__tile0__1wXFVsA37Q",
	"tile1": "basics__tile1__31WRNv5Usx",
	"tile2": "basics__tile2__3aZpCXg8lJ",
	"tile3": "basics__tile3__p4GlJbUt8N",
	"tile4": "basics__tile4__1b5fio7p_o",
	"tile5": "basics__tile5__TcMacShAub",
	"tile6": "basics__tile6__1b2Jbe7N-2",
	"tile7": "basics__tile7__2vAkUpDsds"
};

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Areas; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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

var styles = __webpack_require__(37);
;
;
var Cell = (function (_super) {
    __extends(Cell, _super);
    function Cell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cell.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: this.props.className },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", null, this.props.caption)));
    };
    return Cell;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));
var Areas = (function (_super) {
    __extends(Areas, _super);
    function Areas(props) {
        var _this = _super.call(this, props) || this;
        _this.layouts = new Map([
            ["oneSidebarLeft",
                { className: styles.oneSidebarLeft,
                    label: "One Sidebar Left" }],
            ["oneSidebarRight",
                { className: styles.oneSidebarRight,
                    label: "One Sidebar Right" }],
            ["singleColumn",
                { className: styles.singleColumn,
                    label: "Single Column" }],
            ["twoSidebars",
                { className: styles.twoSidebars,
                    label: "Two Sidebars" }],
        ]);
        _this.radioButtons = [];
        _this.onLayoutInput = function () {
            var element = document.querySelector("input[type=radio]:checked");
            if (element != null && element instanceof HTMLInputElement) {
                _this.setState({ layout: _this.layouts.get(element.value) });
            }
        };
        _this.onGapInput = function (e) {
            var areasSection = document.querySelector("#areas");
            if (e.currentTarget.name == "rowGap") {
                areasSection.style.setProperty('--rowGap', e.currentTarget.value + 'em');
            }
            else {
                areasSection.style.setProperty('--columnGap', e.currentTarget.value + 'em');
            }
        };
        _this.state = {
            layout: _this.layouts.get("oneSidebarLeft")
        };
        _this.layouts.forEach(function (layout, key) {
            _this.radioButtons.push((__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", { key: key, htmlFor: key },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { name: "layout", id: key, defaultChecked: layout == _this.state.layout ? true : undefined, value: key, type: "radio", onInput: _this.onLayoutInput }),
                layout.label)));
        });
        return _this;
    }
    Areas.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("section", { id: "areas", className: styles.tabContent },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", { className: styles.noMargin },
                "Grid Areas are a convenient way to define rectangular areas where content can be layed out. This example shows how by just modifying a few lines of only the grid's css (and leaving the children's css and html untouched*) the layout of the whole page can be transformed.",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("br", null),
                "*with the exception of the two sidebar layout which hides sidebar2 if a layout without it is selected"),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.layouts }, this.radioButtons),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: styles.layouts },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null,
                    "Row gap: ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { defaultValue: "0", onInput: this.onGapInput, name: "rowGap", type: "range", min: "0", max: "10" })),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("label", null,
                    "Column gap: ",
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("input", { defaultValue: "0", onInput: this.onGapInput, name: "columnGap", type: "range", min: "0", max: "10" }))),
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", { className: this.state.layout.className },
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Cell, { className: styles.header, caption: "Header" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Cell, { className: styles.sidebar, caption: "Sidebar" }),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Cell, { className: styles.content, caption: "Content" }),
                this.state.layout.label == "Two Sidebars" ?
                    __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Cell, { className: styles.sidebar2, caption: "Sidebar2" })
                    : null,
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](Cell, { className: styles.footer, caption: "Footer" }))));
    };
    return Areas;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(38);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--3-0!./areas.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js??ref--3-0!./areas.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports
exports.i(__webpack_require__(3), undefined);

// module
exports.push([module.i, "/*\r\nMIT License\r\nCopyright (c) 2017 Patrick Lafferty\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the \"Software\"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n*/\r\n\r\n.areas__tabContent__3PIkKU2O_g {\r\n    display: flex;\r\n    flex-direction: column;\r\n}\r\n\r\n.areas__noMargin__-0ulJr36Vq {\r\n}\r\n\r\n.areas__layouts__2t8Scg0uUd {\r\n    display: flex;\r\n    justify-content: space-around;\r\n}\r\n\r\n#areas__areas__3fQ8xnlz9m {\r\n    --rowGap: 0em;\r\n    --columnGap: 0em;\r\n}\r\n\r\n.areas__oneSidebarLeft__36gtwouQB5 {\r\n    display: grid;\r\n    grid-template-areas: \r\n        \"header header\"\r\n        \"sidebar content\"\r\n        \"footer footer\";\r\n    grid-template-rows: 10rem 1fr 10rem;\r\n    grid-template-columns: 1fr 3fr;\r\n    height: 100%;\r\n    grid-row-gap: var(--rowGap);\r\n    grid-column-gap: var(--columnGap);\r\n}\r\n\r\n.areas__oneSidebarRight__FWBzNUJjj1 {\r\n    display: grid;\r\n    grid-template-areas: \r\n        \"header header\"\r\n        \"content sidebar\"\r\n        \"footer footer\";\r\n    grid-template-rows: 10rem 1fr 10rem;\r\n    grid-template-columns: 3fr 1fr;\r\n    height: 100%;\r\n    grid-row-gap: var(--rowGap);\r\n    grid-column-gap: var(--columnGap);\r\n}\r\n\r\n.areas__singleColumn__2cZ_SruNgH {\r\n    display: grid;\r\n    grid-template-areas:\r\n        \"header\"\r\n        \"content\"\r\n        \"sidebar\"\r\n        \"footer\";\r\n    grid-template-rows: 10rem 1fr 1fr 10rem;\r\n    grid-template-columns: 1fr;\r\n    height: 100%;\r\n    grid-row-gap: var(--rowGap);\r\n    grid-column-gap: var(--columnGap);\r\n}\r\n\r\n.areas__twoSidebars__21LncOyuSZ {\r\n    display: grid;\r\n    grid-template-areas:\r\n        \"header header header\"\r\n        \"sidebar content sidebar2\"\r\n        \"footer footer footer\";\r\n    grid-template-rows: 10rem 1fr 10rem;\r\n    grid-template-columns: 1fr 2fr 1fr;\r\n    height: 100%;\r\n    grid-row-gap: var(--rowGap);\r\n    grid-column-gap: var(--columnGap);\r\n}\r\n\r\n.areas__cell__2_iQJTtOrb {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.areas__header__QfRDCojGeJ {\r\n    grid-area: header;\r\n    background-color: darkturquoise;\r\n}\r\n\r\n.areas__sidebar__3wuBiQl2s4 {\r\n    grid-area: sidebar;\r\n    background-color: cornflowerblue;\r\n}\r\n\r\n.areas__content__1wT9rjKM7f {\r\n    grid-area: content;\r\n    background-color: blue;\r\n}\r\n\r\n.areas__sidebar2__TkcRCZXfm7 {\r\n    grid-area: sidebar2;\r\n    background-color: fuchsia;\r\n}\r\n\r\n.areas__footer__d7yNuENFW3 {\r\n    grid-area: footer;\r\n    background-color: purple;\r\n}", ""]);

// exports
exports.locals = {
	"tabContent": "areas__tabContent__3PIkKU2O_g " + __webpack_require__(3).locals["tabContent"] + "",
	"noMargin": "areas__noMargin__-0ulJr36Vq " + __webpack_require__(3).locals["noMargin"] + "",
	"layouts": "areas__layouts__2t8Scg0uUd",
	"areas": "areas__areas__3fQ8xnlz9m",
	"oneSidebarLeft": "areas__oneSidebarLeft__36gtwouQB5",
	"oneSidebarRight": "areas__oneSidebarRight__FWBzNUJjj1",
	"singleColumn": "areas__singleColumn__2cZ_SruNgH",
	"twoSidebars": "areas__twoSidebars__21LncOyuSZ",
	"cell": "areas__cell__2_iQJTtOrb",
	"header": "areas__header__QfRDCojGeJ areas__cell__2_iQJTtOrb",
	"sidebar": "areas__sidebar__3wuBiQl2s4 areas__cell__2_iQJTtOrb",
	"content": "areas__content__1wT9rjKM7f areas__cell__2_iQJTtOrb",
	"sidebar2": "areas__sidebar2__TkcRCZXfm7 areas__cell__2_iQJTtOrb",
	"footer": "areas__footer__d7yNuENFW3 areas__cell__2_iQJTtOrb"
};

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return References; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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

var styles = __webpack_require__(4);
var References = (function (_super) {
    __extends(References, _super);
    function References() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    References.prototype.render = function () {
        return (__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("section", { className: styles.tabContent },
            __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("p", { className: styles.noMargin },
                "The ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout" }, "Mozilla Developer Network"),
                "is my go-to place for CSS docs. The link has a good reference and 11 guides on different grid aspects.",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("br", null),
                "The ",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "https://drafts.csswg.org/css-grid/" }, "Grid Layout Spec"),
                " is also a great reference.",
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("br", null),
                __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", { href: "http://cssgridgarden.com/" }, "The CSS Grid Garden"),
                " is an interesting interactive tutorial on grids.")));
    };
    return References;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]));



/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(41);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--3-0!./lab.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js??ref--3-0!./lab.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".lab__lab__3cEc4KfWgS {\r\n    height: 100%;\r\n}", ""]);

// exports
exports.locals = {
	"lab": "lab__lab__3cEc4KfWgS"
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--3-0!./colours.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--3-0!./colours.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*\r\nMIT License\r\nCopyright (c) 2017 Patrick Lafferty\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the \"Software\"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n*/\r\n:root {\r\n\r\n    --primary-colour: #03a9f4;\r\n    --primary-light: #67daff;\r\n    --primary-dark: #007ac1;\r\n    --primary-text: #000000;\r\n\r\n    --secondary-colour: #5e35b1;\r\n    --secondary-light: #9162e4;\r\n    --secondary-dark: #280680;\r\n    --secondary-text: #ffffff;\r\n\r\n    /*\r\n    Occasionally we want to change the alpha of the above colours.\r\n    Since you can't do rgba(#aaaaaa, alpha), the workaround is to store\r\n    the triplet in another variable.\r\n\r\n    See https://stackoverflow.com/questions/40010597/how-do-i-apply-opacity-to-a-css-color-variable\r\n    */\r\n    --secondary-colour-rgb: 94, 53, 177;\r\n    --secondary-light-rgb: 145, 98, 228;\r\n    --secondary-dark-rgb: 40, 6, 128;\r\n    \r\n}", ""]);

// exports


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(45);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--3-0!./body.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--3-0!./body.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "/*\r\nMIT License\r\nCopyright (c) 2017 Patrick Lafferty\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the \"Software\"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE.\r\n*/\r\nbody {\r\n    margin: 0rem;\r\n    width: 100%;\r\n    background: var(--primary-colour);\r\n    overflow-x: hidden;\r\n    font-size: 1em;\r\n}\r\n\r\n@media (max-width: 360px) {\r\n    body {\r\n        font-size: 0.5em;\r\n    }\r\n}\r\n\r\n@media (min-width: 361px) and (max-width: 640px) {\r\n    body {\r\n        font-size: 0.75em;\r\n    }\r\n}", ""]);

// exports


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map