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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
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

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

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
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
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

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
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

function getNonce() {
	if (false) {
		return null;
	}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

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
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_css__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_less__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__main_less__);







new __WEBPACK_IMPORTED_MODULE_1__vue_js___default.a({
	el:"#app",
	data(){
		return {
			
		}
	},
	components:{
		App: __WEBPACK_IMPORTED_MODULE_2__App_js__["a" /* default */]
	},
	template:'<App />'
});


//  // npm run bulid  no   webpack ./main.js ./bulid.js

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(7);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!./node_modules/css-loader/dist/cjs.js!./css.css", function() {
		var newContent = require("!!./node_modules/css-loader/dist/cjs.js!./css.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, "\r\n\r\n\r\n\r\np{\r\n\tbackground:#ccc;\r\n}\r\n\r\nimg{\r\n\twidth: 300px;\r\n}", ""]);


/***/ }),
/* 8 */
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
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, function () { 'use strict';

  /*  */

  var emptyObject = Object.freeze({});

  // These helpers produce better VM code in JS engines due to their
  // explicitness and function inlining.
  function isUndef (v) {
    return v === undefined || v === null
  }

  function isDef (v) {
    return v !== undefined && v !== null
  }

  function isTrue (v) {
    return v === true
  }

  function isFalse (v) {
    return v === false
  }

  /**
   * Check if value is primitive.
   */
  function isPrimitive (value) {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      // $flow-disable-line
      typeof value === 'symbol' ||
      typeof value === 'boolean'
    )
  }

  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   */
  function isObject (obj) {
    return obj !== null && typeof obj === 'object'
  }

  /**
   * Get the raw type string of a value, e.g., [object Object].
   */
  var _toString = Object.prototype.toString;

  function toRawType (value) {
    return _toString.call(value).slice(8, -1)
  }

  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
  function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
  }

  function isRegExp (v) {
    return _toString.call(v) === '[object RegExp]'
  }

  /**
   * Check if val is a valid array index.
   */
  function isValidArrayIndex (val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val)
  }

  function isPromise (val) {
    return (
      isDef(val) &&
      typeof val.then === 'function' &&
      typeof val.catch === 'function'
    )
  }

  /**
   * Convert a value to a string that is actually rendered.
   */
  function toString (val) {
    return val == null
      ? ''
      : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
        ? JSON.stringify(val, null, 2)
        : String(val)
  }

  /**
   * Convert an input value to a number for persistence.
   * If the conversion fails, return original string.
   */
  function toNumber (val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n
  }

  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  function makeMap (
    str,
    expectsLowerCase
  ) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()]; }
      : function (val) { return map[val]; }
  }

  /**
   * Check if a tag is a built-in tag.
   */
  var isBuiltInTag = makeMap('slot,component', true);

  /**
   * Check if an attribute is a reserved attribute.
   */
  var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

  /**
   * Remove an item from an array.
   */
  function remove (arr, item) {
    if (arr.length) {
      var index = arr.indexOf(item);
      if (index > -1) {
        return arr.splice(index, 1)
      }
    }
  }

  /**
   * Check whether an object has the property.
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
  }

  /**
   * Create a cached version of a pure function.
   */
  function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str))
    })
  }

  /**
   * Camelize a hyphen-delimited string.
   */
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
  });

  /**
   * Capitalize a string.
   */
  var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  });

  /**
   * Hyphenate a camelCase string.
   */
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cached(function (str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
  });

  /**
   * Simple bind polyfill for environments that do not support it,
   * e.g., PhantomJS 1.x. Technically, we don't need this anymore
   * since native bind is now performant enough in most browsers.
   * But removing it would mean breaking code that was able to run in
   * PhantomJS 1.x, so this must be kept for backward compatibility.
   */

  /* istanbul ignore next */
  function polyfillBind (fn, ctx) {
    function boundFn (a) {
      var l = arguments.length;
      return l
        ? l > 1
          ? fn.apply(ctx, arguments)
          : fn.call(ctx, a)
        : fn.call(ctx)
    }

    boundFn._length = fn.length;
    return boundFn
  }

  function nativeBind (fn, ctx) {
    return fn.bind(ctx)
  }

  var bind = Function.prototype.bind
    ? nativeBind
    : polyfillBind;

  /**
   * Convert an Array-like object to a real Array.
   */
  function toArray (list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret
  }

  /**
   * Mix properties into target object.
   */
  function extend (to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to
  }

  /**
   * Merge an Array of Objects into a single Object.
   */
  function toObject (arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res
  }

  /* eslint-disable no-unused-vars */

  /**
   * Perform no operation.
   * Stubbing args to make Flow happy without leaving useless transpiled code
   * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
   */
  function noop (a, b, c) {}

  /**
   * Always return false.
   */
  var no = function (a, b, c) { return false; };

  /* eslint-enable no-unused-vars */

  /**
   * Return the same value.
   */
  var identity = function (_) { return _; };

  /**
   * Generate a string containing static keys from compiler modules.
   */
  function genStaticKeys (modules) {
    return modules.reduce(function (keys, m) {
      return keys.concat(m.staticKeys || [])
    }, []).join(',')
  }

  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   */
  function looseEqual (a, b) {
    if (a === b) { return true }
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        var isArrayA = Array.isArray(a);
        var isArrayB = Array.isArray(b);
        if (isArrayA && isArrayB) {
          return a.length === b.length && a.every(function (e, i) {
            return looseEqual(e, b[i])
          })
        } else if (a instanceof Date && b instanceof Date) {
          return a.getTime() === b.getTime()
        } else if (!isArrayA && !isArrayB) {
          var keysA = Object.keys(a);
          var keysB = Object.keys(b);
          return keysA.length === keysB.length && keysA.every(function (key) {
            return looseEqual(a[key], b[key])
          })
        } else {
          /* istanbul ignore next */
          return false
        }
      } catch (e) {
        /* istanbul ignore next */
        return false
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b)
    } else {
      return false
    }
  }

  /**
   * Return the first index at which a loosely equal value can be
   * found in the array (if value is a plain object, the array must
   * contain an object of the same shape), or -1 if it is not present.
   */
  function looseIndexOf (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i], val)) { return i }
    }
    return -1
  }

  /**
   * Ensure a function is called only once.
   */
  function once (fn) {
    var called = false;
    return function () {
      if (!called) {
        called = true;
        fn.apply(this, arguments);
      }
    }
  }

  var SSR_ATTR = 'data-server-rendered';

  var ASSET_TYPES = [
    'component',
    'directive',
    'filter'
  ];

  var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch'
  ];

  /*  */



  var config = ({
    /**
     * Option merge strategies (used in core/util/options)
     */
    // $flow-disable-line
    optionMergeStrategies: Object.create(null),

    /**
     * Whether to suppress warnings.
     */
    silent: false,

    /**
     * Show production mode tip message on boot?
     */
    productionTip: "development" !== 'production',

    /**
     * Whether to enable devtools
     */
    devtools: "development" !== 'production',

    /**
     * Whether to record perf
     */
    performance: false,

    /**
     * Error handler for watcher errors
     */
    errorHandler: null,

    /**
     * Warn handler for watcher warns
     */
    warnHandler: null,

    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],

    /**
     * Custom user key aliases for v-on
     */
    // $flow-disable-line
    keyCodes: Object.create(null),

    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * component. This is platform-dependent and may be overwritten.
     */
    isReservedTag: no,

    /**
     * Check if an attribute is reserved so that it cannot be used as a component
     * prop. This is platform-dependent and may be overwritten.
     */
    isReservedAttr: no,

    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: no,

    /**
     * Get the namespace of an element
     */
    getTagNamespace: noop,

    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: identity,

    /**
     * Check if an attribute must be bound using property, e.g. value
     * Platform-dependent.
     */
    mustUseProp: no,

    /**
     * Perform updates asynchronously. Intended to be used by Vue Test Utils
     * This will significantly reduce performance if set to false.
     */
    async: true,

    /**
     * Exposed for legacy reasons
     */
    _lifecycleHooks: LIFECYCLE_HOOKS
  });

  /*  */

  /**
   * unicode letters used for parsing html tags, component names and property paths.
   * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
   * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
   */
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

  /**
   * Check if a string starts with $ or _
   */
  function isReserved (str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F
  }

  /**
   * Define a property.
   */
  function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }

  /**
   * Parse simple path.
   */
  var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
  function parsePath (path) {
    if (bailRE.test(path)) {
      return
    }
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }

  /*  */

  // can we use __proto__?
  var hasProto = '__proto__' in {};

  // Browser environment sniffing
  var inBrowser = typeof window !== 'undefined';
  var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
  var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
  var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
  var isPhantomJS = UA && /phantomjs/.test(UA);
  var isFF = UA && UA.match(/firefox\/(\d+)/);

  // Firefox has a "watch" function on Object.prototype...
  var nativeWatch = ({}).watch;

  var supportsPassive = false;
  if (inBrowser) {
    try {
      var opts = {};
      Object.defineProperty(opts, 'passive', ({
        get: function get () {
          /* istanbul ignore next */
          supportsPassive = true;
        }
      })); // https://github.com/facebook/flow/issues/285
      window.addEventListener('test-passive', null, opts);
    } catch (e) {}
  }

  // this needs to be lazy-evaled because vue may be required before
  // vue-server-renderer can set VUE_ENV
  var _isServer;
  var isServerRendering = function () {
    if (_isServer === undefined) {
      /* istanbul ignore if */
      if (!inBrowser && !inWeex && typeof global !== 'undefined') {
        // detect presence of vue-server-renderer and avoid
        // Webpack shimming the process
        _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
      } else {
        _isServer = false;
      }
    }
    return _isServer
  };

  // detect devtools
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

  /* istanbul ignore next */
  function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
  }

  var hasSymbol =
    typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

  var _Set;
  /* istanbul ignore if */ // $flow-disable-line
  if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    _Set = Set;
  } else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = /*@__PURE__*/(function () {
      function Set () {
        this.set = Object.create(null);
      }
      Set.prototype.has = function has (key) {
        return this.set[key] === true
      };
      Set.prototype.add = function add (key) {
        this.set[key] = true;
      };
      Set.prototype.clear = function clear () {
        this.set = Object.create(null);
      };

      return Set;
    }());
  }

  /*  */

  var warn = noop;
  var tip = noop;
  var generateComponentTrace = (noop); // work around flow check
  var formatComponentName = (noop);

  {
    var hasConsole = typeof console !== 'undefined';
    var classifyRE = /(?:^|[-_])(\w)/g;
    var classify = function (str) { return str
      .replace(classifyRE, function (c) { return c.toUpperCase(); })
      .replace(/[-_]/g, ''); };

    warn = function (msg, vm) {
      var trace = vm ? generateComponentTrace(vm) : '';

      if (config.warnHandler) {
        config.warnHandler.call(null, msg, vm, trace);
      } else if (hasConsole && (!config.silent)) {
        console.error(("[Vue warn]: " + msg + trace));
      }
    };

    tip = function (msg, vm) {
      if (hasConsole && (!config.silent)) {
        console.warn("[Vue tip]: " + msg + (
          vm ? generateComponentTrace(vm) : ''
        ));
      }
    };

    formatComponentName = function (vm, includeFile) {
      if (vm.$root === vm) {
        return '<Root>'
      }
      var options = typeof vm === 'function' && vm.cid != null
        ? vm.options
        : vm._isVue
          ? vm.$options || vm.constructor.options
          : vm;
      var name = options.name || options._componentTag;
      var file = options.__file;
      if (!name && file) {
        var match = file.match(/([^/\\]+)\.vue$/);
        name = match && match[1];
      }

      return (
        (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
        (file && includeFile !== false ? (" at " + file) : '')
      )
    };

    var repeat = function (str, n) {
      var res = '';
      while (n) {
        if (n % 2 === 1) { res += str; }
        if (n > 1) { str += str; }
        n >>= 1;
      }
      return res
    };

    generateComponentTrace = function (vm) {
      if (vm._isVue && vm.$parent) {
        var tree = [];
        var currentRecursiveSequence = 0;
        while (vm) {
          if (tree.length > 0) {
            var last = tree[tree.length - 1];
            if (last.constructor === vm.constructor) {
              currentRecursiveSequence++;
              vm = vm.$parent;
              continue
            } else if (currentRecursiveSequence > 0) {
              tree[tree.length - 1] = [last, currentRecursiveSequence];
              currentRecursiveSequence = 0;
            }
          }
          tree.push(vm);
          vm = vm.$parent;
        }
        return '\n\nfound in\n\n' + tree
          .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
              ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
              : formatComponentName(vm))); })
          .join('\n')
      } else {
        return ("\n\n(found in " + (formatComponentName(vm)) + ")")
      }
    };
  }

  /*  */

  var uid = 0;

  /**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   */
  var Dep = function Dep () {
    this.id = uid++;
    this.subs = [];
  };

  Dep.prototype.addSub = function addSub (sub) {
    this.subs.push(sub);
  };

  Dep.prototype.removeSub = function removeSub (sub) {
    remove(this.subs, sub);
  };

  Dep.prototype.depend = function depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  };

  Dep.prototype.notify = function notify () {
    // stabilize the subscriber list first
    var subs = this.subs.slice();
    if (!config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort(function (a, b) { return a.id - b.id; });
    }
    for (var i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  };

  // The current target watcher being evaluated.
  // This is globally unique because only one watcher
  // can be evaluated at a time.
  Dep.target = null;
  var targetStack = [];

  function pushTarget (target) {
    targetStack.push(target);
    Dep.target = target;
  }

  function popTarget () {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
  }

  /*  */

  var VNode = function VNode (
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  };

  var prototypeAccessors = { child: { configurable: true } };

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  prototypeAccessors.child.get = function () {
    return this.componentInstance
  };

  Object.defineProperties( VNode.prototype, prototypeAccessors );

  var createEmptyVNode = function (text) {
    if ( text === void 0 ) text = '';

    var node = new VNode();
    node.text = text;
    node.isComment = true;
    return node
  };

  function createTextVNode (val) {
    return new VNode(undefined, undefined, undefined, String(val))
  }

  // optimized shallow clone
  // used for static nodes and slot nodes because they may be reused across
  // multiple renders, cloning them avoids errors when DOM manipulations rely
  // on their elm reference.
  function cloneVNode (vnode) {
    var cloned = new VNode(
      vnode.tag,
      vnode.data,
      // #7975
      // clone children array to avoid mutating original in case of cloning
      // a child.
      vnode.children && vnode.children.slice(),
      vnode.text,
      vnode.elm,
      vnode.context,
      vnode.componentOptions,
      vnode.asyncFactory
    );
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isComment = vnode.isComment;
    cloned.fnContext = vnode.fnContext;
    cloned.fnOptions = vnode.fnOptions;
    cloned.fnScopeId = vnode.fnScopeId;
    cloned.asyncMeta = vnode.asyncMeta;
    cloned.isCloned = true;
    return cloned
  }

  /*
   * not type checking this file because flow doesn't play well with
   * dynamically accessing methods on Array prototype
   */

  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);

  var methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
  ];

  /**
   * Intercept mutating methods and emit events
   */
  methodsToPatch.forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break
        case 'splice':
          inserted = args.slice(2);
          break
      }
      if (inserted) { ob.observeArray(inserted); }
      // notify change
      ob.dep.notify();
      return result
    });
  });

  /*  */

  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

  /**
   * In some cases we may want to disable observation inside a component's
   * update computation.
   */
  var shouldObserve = true;

  function toggleObserving (value) {
    shouldObserve = value;
  }

  /**
   * Observer class that is attached to each observed
   * object. Once attached, the observer converts the target
   * object's property keys into getter/setters that
   * collect dependencies and dispatch updates.
   */
  var Observer = function Observer (value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  };

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  Observer.prototype.walk = function walk (obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      defineReactive$$1(obj, keys[i]);
    }
  };

  /**
   * Observe a list of Array items.
   */
  Observer.prototype.observeArray = function observeArray (items) {
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  };

  // helpers

  /**
   * Augment a target Object or Array by intercepting
   * the prototype chain using __proto__
   */
  function protoAugment (target, src) {
    /* eslint-disable no-proto */
    target.__proto__ = src;
    /* eslint-enable no-proto */
  }

  /**
   * Augment a target Object or Array by defining
   * hidden properties.
   */
  /* istanbul ignore next */
  function copyAugment (target, src, keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      def(target, key, src[key]);
    }
  }

  /**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   */
  function observe (value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
      return
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (
      shouldObserve &&
      !isServerRendering() &&
      (Array.isArray(value) || isPlainObject(value)) &&
      Object.isExtensible(value) &&
      !value._isVue
    ) {
      ob = new Observer(value);
    }
    if (asRootData && ob) {
      ob.vmCount++;
    }
    return ob
  }

  /**
   * Define a reactive property on an Object.
   */
  function defineReactive$$1 (
    obj,
    key,
    val,
    customSetter,
    shallow
  ) {
    var dep = new Dep();

    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return
    }

    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key];
    }

    var childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }
        return value
      },
      set: function reactiveSetter (newVal) {
        var value = getter ? getter.call(obj) : val;
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        /* eslint-enable no-self-compare */
        if (customSetter) {
          customSetter();
        }
        // #7981: for accessor properties without setter
        if (getter && !setter) { return }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = !shallow && observe(newVal);
        dep.notify();
      }
    });
  }

  /**
   * Set a property on an object. Adds the new property and
   * triggers change notification if the property doesn't
   * already exist.
   */
  function set (target, key, val) {
    if (isUndef(target) || isPrimitive(target)
    ) {
      warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val
    }
    if (key in target && !(key in Object.prototype)) {
      target[key] = val;
      return val
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
      warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
        'at runtime - declare it upfront in the data option.'
      );
      return val
    }
    if (!ob) {
      target[key] = val;
      return val
    }
    defineReactive$$1(ob.value, key, val);
    ob.dep.notify();
    return val
  }

  /**
   * Delete a property and trigger change if necessary.
   */
  function del (target, key) {
    if (isUndef(target) || isPrimitive(target)
    ) {
      warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.splice(key, 1);
      return
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
      warn(
        'Avoid deleting properties on a Vue instance or its root $data ' +
        '- just set it to null.'
      );
      return
    }
    if (!hasOwn(target, key)) {
      return
    }
    delete target[key];
    if (!ob) {
      return
    }
    ob.dep.notify();
  }

  /**
   * Collect dependencies on array elements when the array is touched, since
   * we cannot intercept array element access like property getters.
   */
  function dependArray (value) {
    for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
      e = value[i];
      e && e.__ob__ && e.__ob__.dep.depend();
      if (Array.isArray(e)) {
        dependArray(e);
      }
    }
  }

  /*  */

  /**
   * Option overwriting strategies are functions that handle
   * how to merge a parent option value and a child option
   * value into the final value.
   */
  var strats = config.optionMergeStrategies;

  /**
   * Options with restrictions
   */
  {
    strats.el = strats.propsData = function (parent, child, vm, key) {
      if (!vm) {
        warn(
          "option \"" + key + "\" can only be used during instance " +
          'creation with the `new` keyword.'
        );
      }
      return defaultStrat(parent, child)
    };
  }

  /**
   * Helper that recursively merges two data objects together.
   */
  function mergeData (to, from) {
    if (!from) { return to }
    var key, toVal, fromVal;

    var keys = hasSymbol
      ? Reflect.ownKeys(from)
      : Object.keys(from);

    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      // in case the object is already observed...
      if (key === '__ob__') { continue }
      toVal = to[key];
      fromVal = from[key];
      if (!hasOwn(to, key)) {
        set(to, key, fromVal);
      } else if (
        toVal !== fromVal &&
        isPlainObject(toVal) &&
        isPlainObject(fromVal)
      ) {
        mergeData(toVal, fromVal);
      }
    }
    return to
  }

  /**
   * Data
   */
  function mergeDataOrFn (
    parentVal,
    childVal,
    vm
  ) {
    if (!vm) {
      // in a Vue.extend merge, both should be functions
      if (!childVal) {
        return parentVal
      }
      if (!parentVal) {
        return childVal
      }
      // when parentVal & childVal are both present,
      // we need to return a function that returns the
      // merged result of both functions... no need to
      // check if parentVal is a function here because
      // it has to be a function to pass previous merges.
      return function mergedDataFn () {
        return mergeData(
          typeof childVal === 'function' ? childVal.call(this, this) : childVal,
          typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
        )
      }
    } else {
      return function mergedInstanceDataFn () {
        // instance merge
        var instanceData = typeof childVal === 'function'
          ? childVal.call(vm, vm)
          : childVal;
        var defaultData = typeof parentVal === 'function'
          ? parentVal.call(vm, vm)
          : parentVal;
        if (instanceData) {
          return mergeData(instanceData, defaultData)
        } else {
          return defaultData
        }
      }
    }
  }

  strats.data = function (
    parentVal,
    childVal,
    vm
  ) {
    if (!vm) {
      if (childVal && typeof childVal !== 'function') {
        warn(
          'The "data" option should be a function ' +
          'that returns a per-instance value in component ' +
          'definitions.',
          vm
        );

        return parentVal
      }
      return mergeDataOrFn(parentVal, childVal)
    }

    return mergeDataOrFn(parentVal, childVal, vm)
  };

  /**
   * Hooks and props are merged as arrays.
   */
  function mergeHook (
    parentVal,
    childVal
  ) {
    var res = childVal
      ? parentVal
        ? parentVal.concat(childVal)
        : Array.isArray(childVal)
          ? childVal
          : [childVal]
      : parentVal;
    return res
      ? dedupeHooks(res)
      : res
  }

  function dedupeHooks (hooks) {
    var res = [];
    for (var i = 0; i < hooks.length; i++) {
      if (res.indexOf(hooks[i]) === -1) {
        res.push(hooks[i]);
      }
    }
    return res
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });

  /**
   * Assets
   *
   * When a vm is present (instance creation), we need to do
   * a three-way merge between constructor options, instance
   * options and parent options.
   */
  function mergeAssets (
    parentVal,
    childVal,
    vm,
    key
  ) {
    var res = Object.create(parentVal || null);
    if (childVal) {
      assertObjectType(key, childVal, vm);
      return extend(res, childVal)
    } else {
      return res
    }
  }

  ASSET_TYPES.forEach(function (type) {
    strats[type + 's'] = mergeAssets;
  });

  /**
   * Watchers.
   *
   * Watchers hashes should not overwrite one
   * another, so we merge them as arrays.
   */
  strats.watch = function (
    parentVal,
    childVal,
    vm,
    key
  ) {
    // work around Firefox's Object.prototype.watch...
    if (parentVal === nativeWatch) { parentVal = undefined; }
    if (childVal === nativeWatch) { childVal = undefined; }
    /* istanbul ignore if */
    if (!childVal) { return Object.create(parentVal || null) }
    {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal) { return childVal }
    var ret = {};
    extend(ret, parentVal);
    for (var key$1 in childVal) {
      var parent = ret[key$1];
      var child = childVal[key$1];
      if (parent && !Array.isArray(parent)) {
        parent = [parent];
      }
      ret[key$1] = parent
        ? parent.concat(child)
        : Array.isArray(child) ? child : [child];
    }
    return ret
  };

  /**
   * Other object hashes.
   */
  strats.props =
  strats.methods =
  strats.inject =
  strats.computed = function (
    parentVal,
    childVal,
    vm,
    key
  ) {
    if (childVal && "development" !== 'production') {
      assertObjectType(key, childVal, vm);
    }
    if (!parentVal) { return childVal }
    var ret = Object.create(null);
    extend(ret, parentVal);
    if (childVal) { extend(ret, childVal); }
    return ret
  };
  strats.provide = mergeDataOrFn;

  /**
   * Default strategy.
   */
  var defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  };

  /**
   * Validate component names
   */
  function checkComponents (options) {
    for (var key in options.components) {
      validateComponentName(key);
    }
  }

  function validateComponentName (name) {
    if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
      warn(
        'Invalid component name: "' + name + '". Component names ' +
        'should conform to valid custom element name in html5 specification.'
      );
    }
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + name
      );
    }
  }

  /**
   * Ensure all props option syntax are normalized into the
   * Object-based format.
   */
  function normalizeProps (options, vm) {
    var props = options.props;
    if (!props) { return }
    var res = {};
    var i, val, name;
    if (Array.isArray(props)) {
      i = props.length;
      while (i--) {
        val = props[i];
        if (typeof val === 'string') {
          name = camelize(val);
          res[name] = { type: null };
        } else {
          warn('props must be strings when using array syntax.');
        }
      }
    } else if (isPlainObject(props)) {
      for (var key in props) {
        val = props[key];
        name = camelize(key);
        res[name] = isPlainObject(val)
          ? val
          : { type: val };
      }
    } else {
      warn(
        "Invalid value for option \"props\": expected an Array or an Object, " +
        "but got " + (toRawType(props)) + ".",
        vm
      );
    }
    options.props = res;
  }

  /**
   * Normalize all injections into Object-based format
   */
  function normalizeInject (options, vm) {
    var inject = options.inject;
    if (!inject) { return }
    var normalized = options.inject = {};
    if (Array.isArray(inject)) {
      for (var i = 0; i < inject.length; i++) {
        normalized[inject[i]] = { from: inject[i] };
      }
    } else if (isPlainObject(inject)) {
      for (var key in inject) {
        var val = inject[key];
        normalized[key] = isPlainObject(val)
          ? extend({ from: key }, val)
          : { from: val };
      }
    } else {
      warn(
        "Invalid value for option \"inject\": expected an Array or an Object, " +
        "but got " + (toRawType(inject)) + ".",
        vm
      );
    }
  }

  /**
   * Normalize raw function directives into object format.
   */
  function normalizeDirectives (options) {
    var dirs = options.directives;
    if (dirs) {
      for (var key in dirs) {
        var def$$1 = dirs[key];
        if (typeof def$$1 === 'function') {
          dirs[key] = { bind: def$$1, update: def$$1 };
        }
      }
    }
  }

  function assertObjectType (name, value, vm) {
    if (!isPlainObject(value)) {
      warn(
        "Invalid value for option \"" + name + "\": expected an Object, " +
        "but got " + (toRawType(value)) + ".",
        vm
      );
    }
  }

  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   */
  function mergeOptions (
    parent,
    child,
    vm
  ) {
    {
      checkComponents(child);
    }

    if (typeof child === 'function') {
      child = child.options;
    }

    normalizeProps(child, vm);
    normalizeInject(child, vm);
    normalizeDirectives(child);

    // Apply extends and mixins on the child options,
    // but only if it is a raw options object that isn't
    // the result of another mergeOptions call.
    // Only merged options has the _base property.
    if (!child._base) {
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm);
      }
      if (child.mixins) {
        for (var i = 0, l = child.mixins.length; i < l; i++) {
          parent = mergeOptions(parent, child.mixins[i], vm);
        }
      }
    }

    var options = {};
    var key;
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField (key) {
      var strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);
    }
    return options
  }

  /**
   * Resolve an asset.
   * This function is used because child instances need access
   * to assets defined in its ancestor chain.
   */
  function resolveAsset (
    options,
    type,
    id,
    warnMissing
  ) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
      return
    }
    var assets = options[type];
    // check local registration variations first
    if (hasOwn(assets, id)) { return assets[id] }
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
    // fallback to prototype chain
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (warnMissing && !res) {
      warn(
        'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
        options
      );
    }
    return res
  }

  /*  */



  function validateProp (
    key,
    propOptions,
    propsData,
    vm
  ) {
    var prop = propOptions[key];
    var absent = !hasOwn(propsData, key);
    var value = propsData[key];
    // boolean casting
    var booleanIndex = getTypeIndex(Boolean, prop.type);
    if (booleanIndex > -1) {
      if (absent && !hasOwn(prop, 'default')) {
        value = false;
      } else if (value === '' || value === hyphenate(key)) {
        // only cast empty string / same name to boolean if
        // boolean has higher priority
        var stringIndex = getTypeIndex(String, prop.type);
        if (stringIndex < 0 || booleanIndex < stringIndex) {
          value = true;
        }
      }
    }
    // check default value
    if (value === undefined) {
      value = getPropDefaultValue(vm, prop, key);
      // since the default value is a fresh copy,
      // make sure to observe it.
      var prevShouldObserve = shouldObserve;
      toggleObserving(true);
      observe(value);
      toggleObserving(prevShouldObserve);
    }
    {
      assertProp(prop, key, value, vm, absent);
    }
    return value
  }

  /**
   * Get the default value of a prop.
   */
  function getPropDefaultValue (vm, prop, key) {
    // no default, return undefined
    if (!hasOwn(prop, 'default')) {
      return undefined
    }
    var def = prop.default;
    // warn against non-factory defaults for Object & Array
    if (isObject(def)) {
      warn(
        'Invalid default value for prop "' + key + '": ' +
        'Props with type Object/Array must use a factory function ' +
        'to return the default value.',
        vm
      );
    }
    // the raw prop value was also undefined from previous render,
    // return previous default value to avoid unnecessary watcher trigger
    if (vm && vm.$options.propsData &&
      vm.$options.propsData[key] === undefined &&
      vm._props[key] !== undefined
    ) {
      return vm._props[key]
    }
    // call factory function for non-Function types
    // a value is Function if its prototype is function even across different execution context
    return typeof def === 'function' && getType(prop.type) !== 'Function'
      ? def.call(vm)
      : def
  }

  /**
   * Assert whether a prop is valid.
   */
  function assertProp (
    prop,
    name,
    value,
    vm,
    absent
  ) {
    if (prop.required && absent) {
      warn(
        'Missing required prop: "' + name + '"',
        vm
      );
      return
    }
    if (value == null && !prop.required) {
      return
    }
    var type = prop.type;
    var valid = !type || type === true;
    var expectedTypes = [];
    if (type) {
      if (!Array.isArray(type)) {
        type = [type];
      }
      for (var i = 0; i < type.length && !valid; i++) {
        var assertedType = assertType(value, type[i]);
        expectedTypes.push(assertedType.expectedType || '');
        valid = assertedType.valid;
      }
    }

    if (!valid) {
      warn(
        getInvalidTypeMessage(name, value, expectedTypes),
        vm
      );
      return
    }
    var validator = prop.validator;
    if (validator) {
      if (!validator(value)) {
        warn(
          'Invalid prop: custom validator check failed for prop "' + name + '".',
          vm
        );
      }
    }
  }

  var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

  function assertType (value, type) {
    var valid;
    var expectedType = getType(type);
    if (simpleCheckRE.test(expectedType)) {
      var t = typeof value;
      valid = t === expectedType.toLowerCase();
      // for primitive wrapper objects
      if (!valid && t === 'object') {
        valid = value instanceof type;
      }
    } else if (expectedType === 'Object') {
      valid = isPlainObject(value);
    } else if (expectedType === 'Array') {
      valid = Array.isArray(value);
    } else {
      valid = value instanceof type;
    }
    return {
      valid: valid,
      expectedType: expectedType
    }
  }

  /**
   * Use function string name to check built-in types,
   * because a simple equality check will fail when running
   * across different vms / iframes.
   */
  function getType (fn) {
    var match = fn && fn.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : ''
  }

  function isSameType (a, b) {
    return getType(a) === getType(b)
  }

  function getTypeIndex (type, expectedTypes) {
    if (!Array.isArray(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1
    }
    for (var i = 0, len = expectedTypes.length; i < len; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i
      }
    }
    return -1
  }

  function getInvalidTypeMessage (name, value, expectedTypes) {
    var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', '));
    var expectedType = expectedTypes[0];
    var receivedType = toRawType(value);
    var expectedValue = styleValue(value, expectedType);
    var receivedValue = styleValue(value, receivedType);
    // check if we need to specify expected value
    if (expectedTypes.length === 1 &&
        isExplicable(expectedType) &&
        !isBoolean(expectedType, receivedType)) {
      message += " with value " + expectedValue;
    }
    message += ", got " + receivedType + " ";
    // check if we need to specify received value
    if (isExplicable(receivedType)) {
      message += "with value " + receivedValue + ".";
    }
    return message
  }

  function styleValue (value, type) {
    if (type === 'String') {
      return ("\"" + value + "\"")
    } else if (type === 'Number') {
      return ("" + (Number(value)))
    } else {
      return ("" + value)
    }
  }

  function isExplicable (value) {
    var explicitTypes = ['string', 'number', 'boolean'];
    return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
  }

  function isBoolean () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
  }

  /*  */

  function handleError (err, vm, info) {
    // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
    // See: https://github.com/vuejs/vuex/issues/1505
    pushTarget();
    try {
      if (vm) {
        var cur = vm;
        while ((cur = cur.$parent)) {
          var hooks = cur.$options.errorCaptured;
          if (hooks) {
            for (var i = 0; i < hooks.length; i++) {
              try {
                var capture = hooks[i].call(cur, err, vm, info) === false;
                if (capture) { return }
              } catch (e) {
                globalHandleError(e, cur, 'errorCaptured hook');
              }
            }
          }
        }
      }
      globalHandleError(err, vm, info);
    } finally {
      popTarget();
    }
  }

  function invokeWithErrorHandling (
    handler,
    context,
    args,
    vm,
    info
  ) {
    var res;
    try {
      res = args ? handler.apply(context, args) : handler.call(context);
      if (res && !res._isVue && isPromise(res) && !res._handled) {
        res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
        // issue #9511
        // avoid catch triggering multiple times when nested calls
        res._handled = true;
      }
    } catch (e) {
      handleError(e, vm, info);
    }
    return res
  }

  function globalHandleError (err, vm, info) {
    if (config.errorHandler) {
      try {
        return config.errorHandler.call(null, err, vm, info)
      } catch (e) {
        // if the user intentionally throws the original error in the handler,
        // do not log it twice
        if (e !== err) {
          logError(e, null, 'config.errorHandler');
        }
      }
    }
    logError(err, vm, info);
  }

  function logError (err, vm, info) {
    {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if ((inBrowser || inWeex) && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }

  /*  */

  var isUsingMicroTask = false;

  var callbacks = [];
  var pending = false;

  function flushCallbacks () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // Here we have async deferring wrappers using microtasks.
  // In 2.5 we used (macro) tasks (in combination with microtasks).
  // However, it has subtle problems when state is changed right before repaint
  // (e.g. #6813, out-in transitions).
  // Also, using (macro) tasks in event handler would cause some weird behaviors
  // that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
  // So we now use microtasks everywhere, again.
  // A major drawback of this tradeoff is that there are some scenarios
  // where microtasks have too high a priority and fire in between supposedly
  // sequential events (e.g. #4521, #6690, which have workarounds)
  // or even between bubbling of the same event (#6566).
  var timerFunc;

  // The nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore next, $flow-disable-line */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    timerFunc = function () {
      p.then(flushCallbacks);
      // In problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
    isUsingMicroTask = true;
  } else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // Use MutationObserver where native Promise is not available,
    // e.g. PhantomJS, iOS7, Android 4.4
    // (#6466 MutationObserver is unreliable in IE11)
    var counter = 1;
    var observer = new MutationObserver(flushCallbacks);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
    isUsingMicroTask = true;
  } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    // Fallback to setImmediate.
    // Techinically it leverages the (macro) task queue,
    // but it is still a better choice than setTimeout.
    timerFunc = function () {
      setImmediate(flushCallbacks);
    };
  } else {
    // Fallback to setTimeout.
    timerFunc = function () {
      setTimeout(flushCallbacks, 0);
    };
  }

  function nextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }

  /*  */

  var mark;
  var measure;

  {
    var perf = inBrowser && window.performance;
    /* istanbul ignore if */
    if (
      perf &&
      perf.mark &&
      perf.measure &&
      perf.clearMarks &&
      perf.clearMeasures
    ) {
      mark = function (tag) { return perf.mark(tag); };
      measure = function (name, startTag, endTag) {
        perf.measure(name, startTag, endTag);
        perf.clearMarks(startTag);
        perf.clearMarks(endTag);
        // perf.clearMeasures(name)
      };
    }
  }

  /* not type checking this file because flow doesn't play well with Proxy */

  var initProxy;

  {
    var allowedGlobals = makeMap(
      'Infinity,undefined,NaN,isFinite,isNaN,' +
      'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
      'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
      'require' // for Webpack/Browserify
    );

    var warnNonPresent = function (target, key) {
      warn(
        "Property or method \"" + key + "\" is not defined on the instance but " +
        'referenced during render. Make sure that this property is reactive, ' +
        'either in the data option, or for class-based components, by ' +
        'initializing the property. ' +
        'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
        target
      );
    };

    var warnReservedPrefix = function (target, key) {
      warn(
        "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
        'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
        'prevent conflicts with Vue internals' +
        'See: https://vuejs.org/v2/api/#data',
        target
      );
    };

    var hasProxy =
      typeof Proxy !== 'undefined' && isNative(Proxy);

    if (hasProxy) {
      var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
      config.keyCodes = new Proxy(config.keyCodes, {
        set: function set (target, key, value) {
          if (isBuiltInModifier(key)) {
            warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
            return false
          } else {
            target[key] = value;
            return true
          }
        }
      });
    }

    var hasHandler = {
      has: function has (target, key) {
        var has = key in target;
        var isAllowed = allowedGlobals(key) ||
          (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
        if (!has && !isAllowed) {
          if (key in target.$data) { warnReservedPrefix(target, key); }
          else { warnNonPresent(target, key); }
        }
        return has || !isAllowed
      }
    };

    var getHandler = {
      get: function get (target, key) {
        if (typeof key === 'string' && !(key in target)) {
          if (key in target.$data) { warnReservedPrefix(target, key); }
          else { warnNonPresent(target, key); }
        }
        return target[key]
      }
    };

    initProxy = function initProxy (vm) {
      if (hasProxy) {
        // determine which proxy handler to use
        var options = vm.$options;
        var handlers = options.render && options.render._withStripped
          ? getHandler
          : hasHandler;
        vm._renderProxy = new Proxy(vm, handlers);
      } else {
        vm._renderProxy = vm;
      }
    };
  }

  /*  */

  var seenObjects = new _Set();

  /**
   * Recursively traverse an object to evoke all converted
   * getters, so that every nested property inside the object
   * is collected as a "deep" dependency.
   */
  function traverse (val) {
    _traverse(val, seenObjects);
    seenObjects.clear();
  }

  function _traverse (val, seen) {
    var i, keys;
    var isA = Array.isArray(val);
    if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
      return
    }
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return
      }
      seen.add(depId);
    }
    if (isA) {
      i = val.length;
      while (i--) { _traverse(val[i], seen); }
    } else {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) { _traverse(val[keys[i]], seen); }
    }
  }

  /*  */

  var normalizeEvent = cached(function (name) {
    var passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
    name = once$$1 ? name.slice(1) : name;
    var capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
      name: name,
      once: once$$1,
      capture: capture,
      passive: passive
    }
  });

  function createFnInvoker (fns, vm) {
    function invoker () {
      var arguments$1 = arguments;

      var fns = invoker.fns;
      if (Array.isArray(fns)) {
        var cloned = fns.slice();
        for (var i = 0; i < cloned.length; i++) {
          invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
        }
      } else {
        // return handler return value for single handlers
        return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
      }
    }
    invoker.fns = fns;
    return invoker
  }

  function updateListeners (
    on,
    oldOn,
    add,
    remove$$1,
    createOnceHandler,
    vm
  ) {
    var name, def$$1, cur, old, event;
    for (name in on) {
      def$$1 = cur = on[name];
      old = oldOn[name];
      event = normalizeEvent(name);
      if (isUndef(cur)) {
        warn(
          "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
          vm
        );
      } else if (isUndef(old)) {
        if (isUndef(cur.fns)) {
          cur = on[name] = createFnInvoker(cur, vm);
        }
        if (isTrue(event.once)) {
          cur = on[name] = createOnceHandler(event.name, cur, event.capture);
        }
        add(event.name, cur, event.capture, event.passive, event.params);
      } else if (cur !== old) {
        old.fns = cur;
        on[name] = old;
      }
    }
    for (name in oldOn) {
      if (isUndef(on[name])) {
        event = normalizeEvent(name);
        remove$$1(event.name, oldOn[name], event.capture);
      }
    }
  }

  /*  */

  function mergeVNodeHook (def, hookKey, hook) {
    if (def instanceof VNode) {
      def = def.data.hook || (def.data.hook = {});
    }
    var invoker;
    var oldHook = def[hookKey];

    function wrappedHook () {
      hook.apply(this, arguments);
      // important: remove merged hook to ensure it's called only once
      // and prevent memory leak
      remove(invoker.fns, wrappedHook);
    }

    if (isUndef(oldHook)) {
      // no existing hook
      invoker = createFnInvoker([wrappedHook]);
    } else {
      /* istanbul ignore if */
      if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
        // already a merged invoker
        invoker = oldHook;
        invoker.fns.push(wrappedHook);
      } else {
        // existing plain hook
        invoker = createFnInvoker([oldHook, wrappedHook]);
      }
    }

    invoker.merged = true;
    def[hookKey] = invoker;
  }

  /*  */

  function extractPropsFromVNodeData (
    data,
    Ctor,
    tag
  ) {
    // we are only extracting raw values here.
    // validation and default values are handled in the child
    // component itself.
    var propOptions = Ctor.options.props;
    if (isUndef(propOptions)) {
      return
    }
    var res = {};
    var attrs = data.attrs;
    var props = data.props;
    if (isDef(attrs) || isDef(props)) {
      for (var key in propOptions) {
        var altKey = hyphenate(key);
        {
          var keyInLowerCase = key.toLowerCase();
          if (
            key !== keyInLowerCase &&
            attrs && hasOwn(attrs, keyInLowerCase)
          ) {
            tip(
              "Prop \"" + keyInLowerCase + "\" is passed to component " +
              (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
              " \"" + key + "\". " +
              "Note that HTML attributes are case-insensitive and camelCased " +
              "props need to use their kebab-case equivalents when using in-DOM " +
              "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
            );
          }
        }
        checkProp(res, props, key, altKey, true) ||
        checkProp(res, attrs, key, altKey, false);
      }
    }
    return res
  }

  function checkProp (
    res,
    hash,
    key,
    altKey,
    preserve
  ) {
    if (isDef(hash)) {
      if (hasOwn(hash, key)) {
        res[key] = hash[key];
        if (!preserve) {
          delete hash[key];
        }
        return true
      } else if (hasOwn(hash, altKey)) {
        res[key] = hash[altKey];
        if (!preserve) {
          delete hash[altKey];
        }
        return true
      }
    }
    return false
  }

  /*  */

  // The template compiler attempts to minimize the need for normalization by
  // statically analyzing the template at compile time.
  //
  // For plain HTML markup, normalization can be completely skipped because the
  // generated render function is guaranteed to return Array<VNode>. There are
  // two cases where extra normalization is needed:

  // 1. When the children contains components - because a functional component
  // may return an Array instead of a single root. In this case, just a simple
  // normalization is needed - if any child is an Array, we flatten the whole
  // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
  // because functional components already normalize their own children.
  function simpleNormalizeChildren (children) {
    for (var i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        return Array.prototype.concat.apply([], children)
      }
    }
    return children
  }

  // 2. When the children contains constructs that always generated nested Arrays,
  // e.g. <template>, <slot>, v-for, or when the children is provided by user
  // with hand-written render functions / JSX. In such cases a full normalization
  // is needed to cater to all possible types of children values.
  function normalizeChildren (children) {
    return isPrimitive(children)
      ? [createTextVNode(children)]
      : Array.isArray(children)
        ? normalizeArrayChildren(children)
        : undefined
  }

  function isTextNode (node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment)
  }

  function normalizeArrayChildren (children, nestedIndex) {
    var res = [];
    var i, c, lastIndex, last;
    for (i = 0; i < children.length; i++) {
      c = children[i];
      if (isUndef(c) || typeof c === 'boolean') { continue }
      lastIndex = res.length - 1;
      last = res[lastIndex];
      //  nested
      if (Array.isArray(c)) {
        if (c.length > 0) {
          c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
          // merge adjacent text nodes
          if (isTextNode(c[0]) && isTextNode(last)) {
            res[lastIndex] = createTextVNode(last.text + (c[0]).text);
            c.shift();
          }
          res.push.apply(res, c);
        }
      } else if (isPrimitive(c)) {
        if (isTextNode(last)) {
          // merge adjacent text nodes
          // this is necessary for SSR hydration because text nodes are
          // essentially merged when rendered to HTML strings
          res[lastIndex] = createTextVNode(last.text + c);
        } else if (c !== '') {
          // convert primitive to vnode
          res.push(createTextVNode(c));
        }
      } else {
        if (isTextNode(c) && isTextNode(last)) {
          // merge adjacent text nodes
          res[lastIndex] = createTextVNode(last.text + c.text);
        } else {
          // default key for nested array children (likely generated by v-for)
          if (isTrue(children._isVList) &&
            isDef(c.tag) &&
            isUndef(c.key) &&
            isDef(nestedIndex)) {
            c.key = "__vlist" + nestedIndex + "_" + i + "__";
          }
          res.push(c);
        }
      }
    }
    return res
  }

  /*  */

  function initProvide (vm) {
    var provide = vm.$options.provide;
    if (provide) {
      vm._provided = typeof provide === 'function'
        ? provide.call(vm)
        : provide;
    }
  }

  function initInjections (vm) {
    var result = resolveInject(vm.$options.inject, vm);
    if (result) {
      toggleObserving(false);
      Object.keys(result).forEach(function (key) {
        /* istanbul ignore else */
        {
          defineReactive$$1(vm, key, result[key], function () {
            warn(
              "Avoid mutating an injected value directly since the changes will be " +
              "overwritten whenever the provided component re-renders. " +
              "injection being mutated: \"" + key + "\"",
              vm
            );
          });
        }
      });
      toggleObserving(true);
    }
  }

  function resolveInject (inject, vm) {
    if (inject) {
      // inject is :any because flow is not smart enough to figure out cached
      var result = Object.create(null);
      var keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        // #6574 in case the inject object is observed...
        if (key === '__ob__') { continue }
        var provideKey = inject[key].from;
        var source = vm;
        while (source) {
          if (source._provided && hasOwn(source._provided, provideKey)) {
            result[key] = source._provided[provideKey];
            break
          }
          source = source.$parent;
        }
        if (!source) {
          if ('default' in inject[key]) {
            var provideDefault = inject[key].default;
            result[key] = typeof provideDefault === 'function'
              ? provideDefault.call(vm)
              : provideDefault;
          } else {
            warn(("Injection \"" + key + "\" not found"), vm);
          }
        }
      }
      return result
    }
  }

  /*  */



  /**
   * Runtime helper for resolving raw children VNodes into a slot object.
   */
  function resolveSlots (
    children,
    context
  ) {
    if (!children || !children.length) {
      return {}
    }
    var slots = {};
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var data = child.data;
      // remove slot attribute if the node is resolved as a Vue slot node
      if (data && data.attrs && data.attrs.slot) {
        delete data.attrs.slot;
      }
      // named slots should only be respected if the vnode was rendered in the
      // same context.
      if ((child.context === context || child.fnContext === context) &&
        data && data.slot != null
      ) {
        var name = data.slot;
        var slot = (slots[name] || (slots[name] = []));
        if (child.tag === 'template') {
          slot.push.apply(slot, child.children || []);
        } else {
          slot.push(child);
        }
      } else {
        (slots.default || (slots.default = [])).push(child);
      }
    }
    // ignore slots that contains only whitespace
    for (var name$1 in slots) {
      if (slots[name$1].every(isWhitespace)) {
        delete slots[name$1];
      }
    }
    return slots
  }

  function isWhitespace (node) {
    return (node.isComment && !node.asyncFactory) || node.text === ' '
  }

  /*  */

  function normalizeScopedSlots (
    slots,
    normalSlots,
    prevSlots
  ) {
    var res;
    var hasNormalSlots = Object.keys(normalSlots).length > 0;
    var isStable = slots ? !!slots.$stable : !hasNormalSlots;
    var key = slots && slots.$key;
    if (!slots) {
      res = {};
    } else if (slots._normalized) {
      // fast path 1: child component re-render only, parent did not change
      return slots._normalized
    } else if (
      isStable &&
      prevSlots &&
      prevSlots !== emptyObject &&
      key === prevSlots.$key &&
      !hasNormalSlots &&
      !prevSlots.$hasNormal
    ) {
      // fast path 2: stable scoped slots w/ no normal slots to proxy,
      // only need to normalize once
      return prevSlots
    } else {
      res = {};
      for (var key$1 in slots) {
        if (slots[key$1] && key$1[0] !== '$') {
          res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
        }
      }
    }
    // expose normal slots on scopedSlots
    for (var key$2 in normalSlots) {
      if (!(key$2 in res)) {
        res[key$2] = proxyNormalSlot(normalSlots, key$2);
      }
    }
    // avoriaz seems to mock a non-extensible $scopedSlots object
    // and when that is passed down this would cause an error
    if (slots && Object.isExtensible(slots)) {
      (slots)._normalized = res;
    }
    def(res, '$stable', isStable);
    def(res, '$key', key);
    def(res, '$hasNormal', hasNormalSlots);
    return res
  }

  function normalizeScopedSlot(normalSlots, key, fn) {
    var normalized = function () {
      var res = arguments.length ? fn.apply(null, arguments) : fn({});
      res = res && typeof res === 'object' && !Array.isArray(res)
        ? [res] // single vnode
        : normalizeChildren(res);
      return res && (
        res.length === 0 ||
        (res.length === 1 && res[0].isComment) // #9658
      ) ? undefined
        : res
    };
    // this is a slot using the new v-slot syntax without scope. although it is
    // compiled as a scoped slot, render fn users would expect it to be present
    // on this.$slots because the usage is semantically a normal slot.
    if (fn.proxy) {
      Object.defineProperty(normalSlots, key, {
        get: normalized,
        enumerable: true,
        configurable: true
      });
    }
    return normalized
  }

  function proxyNormalSlot(slots, key) {
    return function () { return slots[key]; }
  }

  /*  */

  /**
   * Runtime helper for rendering v-for lists.
   */
  function renderList (
    val,
    render
  ) {
    var ret, i, l, keys, key;
    if (Array.isArray(val) || typeof val === 'string') {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      if (hasSymbol && val[Symbol.iterator]) {
        ret = [];
        var iterator = val[Symbol.iterator]();
        var result = iterator.next();
        while (!result.done) {
          ret.push(render(result.value, ret.length));
          result = iterator.next();
        }
      } else {
        keys = Object.keys(val);
        ret = new Array(keys.length);
        for (i = 0, l = keys.length; i < l; i++) {
          key = keys[i];
          ret[i] = render(val[key], key, i);
        }
      }
    }
    if (!isDef(ret)) {
      ret = [];
    }
    (ret)._isVList = true;
    return ret
  }

  /*  */

  /**
   * Runtime helper for rendering <slot>
   */
  function renderSlot (
    name,
    fallback,
    props,
    bindObject
  ) {
    var scopedSlotFn = this.$scopedSlots[name];
    var nodes;
    if (scopedSlotFn) { // scoped slot
      props = props || {};
      if (bindObject) {
        if (!isObject(bindObject)) {
          warn(
            'slot v-bind without argument expects an Object',
            this
          );
        }
        props = extend(extend({}, bindObject), props);
      }
      nodes = scopedSlotFn(props) || fallback;
    } else {
      nodes = this.$slots[name] || fallback;
    }

    var target = props && props.slot;
    if (target) {
      return this.$createElement('template', { slot: target }, nodes)
    } else {
      return nodes
    }
  }

  /*  */

  /**
   * Runtime helper for resolving filters
   */
  function resolveFilter (id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity
  }

  /*  */

  function isKeyNotMatch (expect, actual) {
    if (Array.isArray(expect)) {
      return expect.indexOf(actual) === -1
    } else {
      return expect !== actual
    }
  }

  /**
   * Runtime helper for checking keyCodes from config.
   * exposed as Vue.prototype._k
   * passing in eventKeyName as last argument separately for backwards compat
   */
  function checkKeyCodes (
    eventKeyCode,
    key,
    builtInKeyCode,
    eventKeyName,
    builtInKeyName
  ) {
    var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
    if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
      return isKeyNotMatch(builtInKeyName, eventKeyName)
    } else if (mappedKeyCode) {
      return isKeyNotMatch(mappedKeyCode, eventKeyCode)
    } else if (eventKeyName) {
      return hyphenate(eventKeyName) !== key
    }
  }

  /*  */

  /**
   * Runtime helper for merging v-bind="object" into a VNode's data.
   */
  function bindObjectProps (
    data,
    tag,
    value,
    asProp,
    isSync
  ) {
    if (value) {
      if (!isObject(value)) {
        warn(
          'v-bind without argument expects an Object or Array value',
          this
        );
      } else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        var hash;
        var loop = function ( key ) {
          if (
            key === 'class' ||
            key === 'style' ||
            isReservedAttribute(key)
          ) {
            hash = data;
          } else {
            var type = data.attrs && data.attrs.type;
            hash = asProp || config.mustUseProp(tag, type, key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {});
          }
          var camelizedKey = camelize(key);
          var hyphenatedKey = hyphenate(key);
          if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
            hash[key] = value[key];

            if (isSync) {
              var on = data.on || (data.on = {});
              on[("update:" + key)] = function ($event) {
                value[key] = $event;
              };
            }
          }
        };

        for (var key in value) loop( key );
      }
    }
    return data
  }

  /*  */

  /**
   * Runtime helper for rendering static trees.
   */
  function renderStatic (
    index,
    isInFor
  ) {
    var cached = this._staticTrees || (this._staticTrees = []);
    var tree = cached[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree.
    if (tree && !isInFor) {
      return tree
    }
    // otherwise, render a fresh tree.
    tree = cached[index] = this.$options.staticRenderFns[index].call(
      this._renderProxy,
      null,
      this // for render fns generated for functional component templates
    );
    markStatic(tree, ("__static__" + index), false);
    return tree
  }

  /**
   * Runtime helper for v-once.
   * Effectively it means marking the node as static with a unique key.
   */
  function markOnce (
    tree,
    index,
    key
  ) {
    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
    return tree
  }

  function markStatic (
    tree,
    key,
    isOnce
  ) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== 'string') {
          markStaticNode(tree[i], (key + "_" + i), isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }

  function markStaticNode (node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }

  /*  */

  function bindObjectListeners (data, value) {
    if (value) {
      if (!isPlainObject(value)) {
        warn(
          'v-on without argument expects an Object value',
          this
        );
      } else {
        var on = data.on = data.on ? extend({}, data.on) : {};
        for (var key in value) {
          var existing = on[key];
          var ours = value[key];
          on[key] = existing ? [].concat(existing, ours) : ours;
        }
      }
    }
    return data
  }

  /*  */

  function resolveScopedSlots (
    fns, // see flow/vnode
    res,
    // the following are added in 2.6
    hasDynamicKeys,
    contentHashKey
  ) {
    res = res || { $stable: !hasDynamicKeys };
    for (var i = 0; i < fns.length; i++) {
      var slot = fns[i];
      if (Array.isArray(slot)) {
        resolveScopedSlots(slot, res, hasDynamicKeys);
      } else if (slot) {
        // marker for reverse proxying v-slot without scope on this.$slots
        if (slot.proxy) {
          slot.fn.proxy = true;
        }
        res[slot.key] = slot.fn;
      }
    }
    if (contentHashKey) {
      (res).$key = contentHashKey;
    }
    return res
  }

  /*  */

  function bindDynamicKeys (baseObj, values) {
    for (var i = 0; i < values.length; i += 2) {
      var key = values[i];
      if (typeof key === 'string' && key) {
        baseObj[values[i]] = values[i + 1];
      } else if (key !== '' && key !== null) {
        // null is a speical value for explicitly removing a binding
        warn(
          ("Invalid value for dynamic directive argument (expected string or null): " + key),
          this
        );
      }
    }
    return baseObj
  }

  // helper to dynamically append modifier runtime markers to event names.
  // ensure only append when value is already string, otherwise it will be cast
  // to string and cause the type check to miss.
  function prependModifier (value, symbol) {
    return typeof value === 'string' ? symbol + value : value
  }

  /*  */

  function installRenderHelpers (target) {
    target._o = markOnce;
    target._n = toNumber;
    target._s = toString;
    target._l = renderList;
    target._t = renderSlot;
    target._q = looseEqual;
    target._i = looseIndexOf;
    target._m = renderStatic;
    target._f = resolveFilter;
    target._k = checkKeyCodes;
    target._b = bindObjectProps;
    target._v = createTextVNode;
    target._e = createEmptyVNode;
    target._u = resolveScopedSlots;
    target._g = bindObjectListeners;
    target._d = bindDynamicKeys;
    target._p = prependModifier;
  }

  /*  */

  function FunctionalRenderContext (
    data,
    props,
    children,
    parent,
    Ctor
  ) {
    var this$1 = this;

    var options = Ctor.options;
    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    var contextVm;
    if (hasOwn(parent, '_uid')) {
      contextVm = Object.create(parent);
      // $flow-disable-line
      contextVm._original = parent;
    } else {
      // the context vm passed in is a functional context as well.
      // in this case we want to make sure we are able to get a hold to the
      // real context instance.
      contextVm = parent;
      // $flow-disable-line
      parent = parent._original;
    }
    var isCompiled = isTrue(options._compiled);
    var needNormalization = !isCompiled;

    this.data = data;
    this.props = props;
    this.children = children;
    this.parent = parent;
    this.listeners = data.on || emptyObject;
    this.injections = resolveInject(options.inject, parent);
    this.slots = function () {
      if (!this$1.$slots) {
        normalizeScopedSlots(
          data.scopedSlots,
          this$1.$slots = resolveSlots(children, parent)
        );
      }
      return this$1.$slots
    };

    Object.defineProperty(this, 'scopedSlots', ({
      enumerable: true,
      get: function get () {
        return normalizeScopedSlots(data.scopedSlots, this.slots())
      }
    }));

    // support for compiled functional template
    if (isCompiled) {
      // exposing $options for renderStatic()
      this.$options = options;
      // pre-resolve slots for renderSlot()
      this.$slots = this.slots();
      this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
    }

    if (options._scopeId) {
      this._c = function (a, b, c, d) {
        var vnode = createElement(contextVm, a, b, c, d, needNormalization);
        if (vnode && !Array.isArray(vnode)) {
          vnode.fnScopeId = options._scopeId;
          vnode.fnContext = parent;
        }
        return vnode
      };
    } else {
      this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
    }
  }

  installRenderHelpers(FunctionalRenderContext.prototype);

  function createFunctionalComponent (
    Ctor,
    propsData,
    data,
    contextVm,
    children
  ) {
    var options = Ctor.options;
    var props = {};
    var propOptions = options.props;
    if (isDef(propOptions)) {
      for (var key in propOptions) {
        props[key] = validateProp(key, propOptions, propsData || emptyObject);
      }
    } else {
      if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
      if (isDef(data.props)) { mergeProps(props, data.props); }
    }

    var renderContext = new FunctionalRenderContext(
      data,
      props,
      children,
      contextVm,
      Ctor
    );

    var vnode = options.render.call(null, renderContext._c, renderContext);

    if (vnode instanceof VNode) {
      return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
    } else if (Array.isArray(vnode)) {
      var vnodes = normalizeChildren(vnode) || [];
      var res = new Array(vnodes.length);
      for (var i = 0; i < vnodes.length; i++) {
        res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
      }
      return res
    }
  }

  function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
    // #7817 clone node before setting fnContext, otherwise if the node is reused
    // (e.g. it was from a cached normal slot) the fnContext causes named slots
    // that should not be matched to match.
    var clone = cloneVNode(vnode);
    clone.fnContext = contextVm;
    clone.fnOptions = options;
    {
      (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
    }
    if (data.slot) {
      (clone.data || (clone.data = {})).slot = data.slot;
    }
    return clone
  }

  function mergeProps (to, from) {
    for (var key in from) {
      to[camelize(key)] = from[key];
    }
  }

  /*  */

  /*  */

  /*  */

  /*  */

  // inline hooks to be invoked on component VNodes during patch
  var componentVNodeHooks = {
    init: function init (vnode, hydrating) {
      if (
        vnode.componentInstance &&
        !vnode.componentInstance._isDestroyed &&
        vnode.data.keepAlive
      ) {
        // kept-alive components, treat as a patch
        var mountedNode = vnode; // work around flow
        componentVNodeHooks.prepatch(mountedNode, mountedNode);
      } else {
        var child = vnode.componentInstance = createComponentInstanceForVnode(
          vnode,
          activeInstance
        );
        child.$mount(hydrating ? vnode.elm : undefined, hydrating);
      }
    },

    prepatch: function prepatch (oldVnode, vnode) {
      var options = vnode.componentOptions;
      var child = vnode.componentInstance = oldVnode.componentInstance;
      updateChildComponent(
        child,
        options.propsData, // updated props
        options.listeners, // updated listeners
        vnode, // new parent vnode
        options.children // new children
      );
    },

    insert: function insert (vnode) {
      var context = vnode.context;
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isMounted) {
        componentInstance._isMounted = true;
        callHook(componentInstance, 'mounted');
      }
      if (vnode.data.keepAlive) {
        if (context._isMounted) {
          // vue-router#1212
          // During updates, a kept-alive component's child components may
          // change, so directly walking the tree here may call activated hooks
          // on incorrect children. Instead we push them into a queue which will
          // be processed after the whole patch process ended.
          queueActivatedComponent(componentInstance);
        } else {
          activateChildComponent(componentInstance, true /* direct */);
        }
      }
    },

    destroy: function destroy (vnode) {
      var componentInstance = vnode.componentInstance;
      if (!componentInstance._isDestroyed) {
        if (!vnode.data.keepAlive) {
          componentInstance.$destroy();
        } else {
          deactivateChildComponent(componentInstance, true /* direct */);
        }
      }
    }
  };

  var hooksToMerge = Object.keys(componentVNodeHooks);

  function createComponent (
    Ctor,
    data,
    context,
    children,
    tag
  ) {
    if (isUndef(Ctor)) {
      return
    }

    var baseCtor = context.$options._base;

    // plain options object: turn it into a constructor
    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor);
    }

    // if at this stage it's not a constructor or an async component factory,
    // reject.
    if (typeof Ctor !== 'function') {
      {
        warn(("Invalid Component definition: " + (String(Ctor))), context);
      }
      return
    }

    // async component
    var asyncFactory;
    if (isUndef(Ctor.cid)) {
      asyncFactory = Ctor;
      Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
      if (Ctor === undefined) {
        // return a placeholder node for async component, which is rendered
        // as a comment node but preserves all the raw information for the node.
        // the information will be used for async server-rendering and hydration.
        return createAsyncPlaceholder(
          asyncFactory,
          data,
          context,
          children,
          tag
        )
      }
    }

    data = data || {};

    // resolve constructor options in case global mixins are applied after
    // component constructor creation
    resolveConstructorOptions(Ctor);

    // transform component v-model data into props & events
    if (isDef(data.model)) {
      transformModel(Ctor.options, data);
    }

    // extract props
    var propsData = extractPropsFromVNodeData(data, Ctor, tag);

    // functional component
    if (isTrue(Ctor.options.functional)) {
      return createFunctionalComponent(Ctor, propsData, data, context, children)
    }

    // extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    var listeners = data.on;
    // replace with listeners with .native modifier
    // so it gets processed during parent component patch.
    data.on = data.nativeOn;

    if (isTrue(Ctor.options.abstract)) {
      // abstract components do not keep anything
      // other than props & listeners & slot

      // work around flow
      var slot = data.slot;
      data = {};
      if (slot) {
        data.slot = slot;
      }
    }

    // install component management hooks onto the placeholder node
    installComponentHooks(data);

    // return a placeholder vnode
    var name = Ctor.options.name || tag;
    var vnode = new VNode(
      ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
      data, undefined, undefined, undefined, context,
      { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
      asyncFactory
    );

    return vnode
  }

  function createComponentInstanceForVnode (
    vnode, // we know it's MountedComponentVNode but flow doesn't
    parent // activeInstance in lifecycle state
  ) {
    var options = {
      _isComponent: true,
      _parentVnode: vnode,
      parent: parent
    };
    // check inline-template render functions
    var inlineTemplate = vnode.data.inlineTemplate;
    if (isDef(inlineTemplate)) {
      options.render = inlineTemplate.render;
      options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnode.componentOptions.Ctor(options)
  }

  function installComponentHooks (data) {
    var hooks = data.hook || (data.hook = {});
    for (var i = 0; i < hooksToMerge.length; i++) {
      var key = hooksToMerge[i];
      var existing = hooks[key];
      var toMerge = componentVNodeHooks[key];
      if (existing !== toMerge && !(existing && existing._merged)) {
        hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
      }
    }
  }

  function mergeHook$1 (f1, f2) {
    var merged = function (a, b) {
      // flow complains about extra args which is why we use any
      f1(a, b);
      f2(a, b);
    };
    merged._merged = true;
    return merged
  }

  // transform component v-model info (value and callback) into
  // prop and event handler respectively.
  function transformModel (options, data) {
    var prop = (options.model && options.model.prop) || 'value';
    var event = (options.model && options.model.event) || 'input'
    ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
    var on = data.on || (data.on = {});
    var existing = on[event];
    var callback = data.model.callback;
    if (isDef(existing)) {
      if (
        Array.isArray(existing)
          ? existing.indexOf(callback) === -1
          : existing !== callback
      ) {
        on[event] = [callback].concat(existing);
      }
    } else {
      on[event] = callback;
    }
  }

  /*  */

  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;

  // wrapper function for providing a more flexible interface
  // without getting yelled at by flow
  function createElement (
    context,
    tag,
    data,
    children,
    normalizationType,
    alwaysNormalize
  ) {
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = undefined;
    }
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType)
  }

  function _createElement (
    context,
    tag,
    data,
    children,
    normalizationType
  ) {
    if (isDef(data) && isDef((data).__ob__)) {
      warn(
        "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
        'Always create fresh vnode data objects in each render!',
        context
      );
      return createEmptyVNode()
    }
    // object syntax in v-bind
    if (isDef(data) && isDef(data.is)) {
      tag = data.is;
    }
    if (!tag) {
      // in case of component :is set to falsy value
      return createEmptyVNode()
    }
    // warn against non-primitive key
    if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
    ) {
      {
        warn(
          'Avoid using non-primitive value as key, ' +
          'use string/number value instead.',
          context
        );
      }
    }
    // support single function children as default scoped slot
    if (Array.isArray(children) &&
      typeof children[0] === 'function'
    ) {
      data = data || {};
      data.scopedSlots = { default: children[0] };
      children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }
    var vnode, ns;
    if (typeof tag === 'string') {
      var Ctor;
      ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
      if (config.isReservedTag(tag)) {
        // platform built-in elements
        vnode = new VNode(
          config.parsePlatformTagName(tag), data, children,
          undefined, undefined, context
        );
      } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
        // component
        vnode = createComponent(Ctor, data, context, children, tag);
      } else {
        // unknown or unlisted namespaced elements
        // check at runtime because it may get assigned a namespace when its
        // parent normalizes children
        vnode = new VNode(
          tag, data, children,
          undefined, undefined, context
        );
      }
    } else {
      // direct component options / constructor
      vnode = createComponent(tag, data, context, children);
    }
    if (Array.isArray(vnode)) {
      return vnode
    } else if (isDef(vnode)) {
      if (isDef(ns)) { applyNS(vnode, ns); }
      if (isDef(data)) { registerDeepBindings(data); }
      return vnode
    } else {
      return createEmptyVNode()
    }
  }

  function applyNS (vnode, ns, force) {
    vnode.ns = ns;
    if (vnode.tag === 'foreignObject') {
      // use default namespace inside foreignObject
      ns = undefined;
      force = true;
    }
    if (isDef(vnode.children)) {
      for (var i = 0, l = vnode.children.length; i < l; i++) {
        var child = vnode.children[i];
        if (isDef(child.tag) && (
          isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
          applyNS(child, ns, force);
        }
      }
    }
  }

  // ref #5318
  // necessary to ensure parent re-render when deep bindings like :style and
  // :class are used on slot nodes
  function registerDeepBindings (data) {
    if (isObject(data.style)) {
      traverse(data.style);
    }
    if (isObject(data.class)) {
      traverse(data.class);
    }
  }

  /*  */

  function initRender (vm) {
    vm._vnode = null; // the root of the child tree
    vm._staticTrees = null; // v-once cached trees
    var options = vm.$options;
    var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
    var renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(options._renderChildren, renderContext);
    vm.$scopedSlots = emptyObject;
    // bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
    vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
    // normalization is always applied for the public version, used in
    // user-written render functions.
    vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

    // $attrs & $listeners are exposed for easier HOC creation.
    // they need to be reactive so that HOCs using them are always updated
    var parentData = parentVnode && parentVnode.data;

    /* istanbul ignore else */
    {
      defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
        !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
      }, true);
      defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
        !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
      }, true);
    }
  }

  var currentRenderingInstance = null;

  function renderMixin (Vue) {
    // install runtime convenience helpers
    installRenderHelpers(Vue.prototype);

    Vue.prototype.$nextTick = function (fn) {
      return nextTick(fn, this)
    };

    Vue.prototype._render = function () {
      var vm = this;
      var ref = vm.$options;
      var render = ref.render;
      var _parentVnode = ref._parentVnode;

      if (_parentVnode) {
        vm.$scopedSlots = normalizeScopedSlots(
          _parentVnode.data.scopedSlots,
          vm.$slots,
          vm.$scopedSlots
        );
      }

      // set parent vnode. this allows render functions to have access
      // to the data on the placeholder node.
      vm.$vnode = _parentVnode;
      // render self
      var vnode;
      try {
        // There's no need to maintain a stack becaues all render fns are called
        // separately from one another. Nested component's render fns are called
        // when parent component is patched.
        currentRenderingInstance = vm;
        vnode = render.call(vm._renderProxy, vm.$createElement);
      } catch (e) {
        handleError(e, vm, "render");
        // return error render result,
        // or previous vnode to prevent render error causing blank component
        /* istanbul ignore else */
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } finally {
        currentRenderingInstance = null;
      }
      // if the returned array contains only a single node, allow it
      if (Array.isArray(vnode) && vnode.length === 1) {
        vnode = vnode[0];
      }
      // return empty vnode in case the render function errored out
      if (!(vnode instanceof VNode)) {
        if (Array.isArray(vnode)) {
          warn(
            'Multiple root nodes returned from render function. Render function ' +
            'should return a single root node.',
            vm
          );
        }
        vnode = createEmptyVNode();
      }
      // set parent
      vnode.parent = _parentVnode;
      return vnode
    };
  }

  /*  */

  function ensureCtor (comp, base) {
    if (
      comp.__esModule ||
      (hasSymbol && comp[Symbol.toStringTag] === 'Module')
    ) {
      comp = comp.default;
    }
    return isObject(comp)
      ? base.extend(comp)
      : comp
  }

  function createAsyncPlaceholder (
    factory,
    data,
    context,
    children,
    tag
  ) {
    var node = createEmptyVNode();
    node.asyncFactory = factory;
    node.asyncMeta = { data: data, context: context, children: children, tag: tag };
    return node
  }

  function resolveAsyncComponent (
    factory,
    baseCtor
  ) {
    if (isTrue(factory.error) && isDef(factory.errorComp)) {
      return factory.errorComp
    }

    if (isDef(factory.resolved)) {
      return factory.resolved
    }

    var owner = currentRenderingInstance;
    if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
      // already pending
      factory.owners.push(owner);
    }

    if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
      return factory.loadingComp
    }

    if (owner && !isDef(factory.owners)) {
      var owners = factory.owners = [owner];
      var sync = true;
      var timerLoading = null;
      var timerTimeout = null

      ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

      var forceRender = function (renderCompleted) {
        for (var i = 0, l = owners.length; i < l; i++) {
          (owners[i]).$forceUpdate();
        }

        if (renderCompleted) {
          owners.length = 0;
          if (timerLoading !== null) {
            clearTimeout(timerLoading);
            timerLoading = null;
          }
          if (timerTimeout !== null) {
            clearTimeout(timerTimeout);
            timerTimeout = null;
          }
        }
      };

      var resolve = once(function (res) {
        // cache resolved
        factory.resolved = ensureCtor(res, baseCtor);
        // invoke callbacks only if this is not a synchronous resolve
        // (async resolves are shimmed as synchronous during SSR)
        if (!sync) {
          forceRender(true);
        } else {
          owners.length = 0;
        }
      });

      var reject = once(function (reason) {
        warn(
          "Failed to resolve async component: " + (String(factory)) +
          (reason ? ("\nReason: " + reason) : '')
        );
        if (isDef(factory.errorComp)) {
          factory.error = true;
          forceRender(true);
        }
      });

      var res = factory(resolve, reject);

      if (isObject(res)) {
        if (isPromise(res)) {
          // () => Promise
          if (isUndef(factory.resolved)) {
            res.then(resolve, reject);
          }
        } else if (isPromise(res.component)) {
          res.component.then(resolve, reject);

          if (isDef(res.error)) {
            factory.errorComp = ensureCtor(res.error, baseCtor);
          }

          if (isDef(res.loading)) {
            factory.loadingComp = ensureCtor(res.loading, baseCtor);
            if (res.delay === 0) {
              factory.loading = true;
            } else {
              timerLoading = setTimeout(function () {
                timerLoading = null;
                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                  factory.loading = true;
                  forceRender(false);
                }
              }, res.delay || 200);
            }
          }

          if (isDef(res.timeout)) {
            timerTimeout = setTimeout(function () {
              timerTimeout = null;
              if (isUndef(factory.resolved)) {
                reject(
                  "timeout (" + (res.timeout) + "ms)"
                );
              }
            }, res.timeout);
          }
        }
      }

      sync = false;
      // return in case resolved synchronously
      return factory.loading
        ? factory.loadingComp
        : factory.resolved
    }
  }

  /*  */

  function isAsyncPlaceholder (node) {
    return node.isComment && node.asyncFactory
  }

  /*  */

  function getFirstComponentChild (children) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];
        if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
          return c
        }
      }
    }
  }

  /*  */

  /*  */

  function initEvents (vm) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;
    // init parent attached events
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      updateComponentListeners(vm, listeners);
    }
  }

  var target;

  function add (event, fn) {
    target.$on(event, fn);
  }

  function remove$1 (event, fn) {
    target.$off(event, fn);
  }

  function createOnceHandler (event, fn) {
    var _target = target;
    return function onceHandler () {
      var res = fn.apply(null, arguments);
      if (res !== null) {
        _target.$off(event, onceHandler);
      }
    }
  }

  function updateComponentListeners (
    vm,
    listeners,
    oldListeners
  ) {
    target = vm;
    updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
    target = undefined;
  }

  function eventsMixin (Vue) {
    var hookRE = /^hook:/;
    Vue.prototype.$on = function (event, fn) {
      var vm = this;
      if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          vm.$on(event[i], fn);
        }
      } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
        // optimize hook:event cost by using a boolean flag marked at registration
        // instead of a hash lookup
        if (hookRE.test(event)) {
          vm._hasHookEvent = true;
        }
      }
      return vm
    };

    Vue.prototype.$once = function (event, fn) {
      var vm = this;
      function on () {
        vm.$off(event, on);
        fn.apply(vm, arguments);
      }
      on.fn = fn;
      vm.$on(event, on);
      return vm
    };

    Vue.prototype.$off = function (event, fn) {
      var vm = this;
      // all
      if (!arguments.length) {
        vm._events = Object.create(null);
        return vm
      }
      // array of events
      if (Array.isArray(event)) {
        for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
          vm.$off(event[i$1], fn);
        }
        return vm
      }
      // specific event
      var cbs = vm._events[event];
      if (!cbs) {
        return vm
      }
      if (!fn) {
        vm._events[event] = null;
        return vm
      }
      // specific handler
      var cb;
      var i = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break
        }
      }
      return vm
    };

    Vue.prototype.$emit = function (event) {
      var vm = this;
      {
        var lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
          tip(
            "Event \"" + lowerCaseEvent + "\" is emitted in component " +
            (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
            "Note that HTML attributes are case-insensitive and you cannot use " +
            "v-on to listen to camelCase events when using in-DOM templates. " +
            "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
          );
        }
      }
      var cbs = vm._events[event];
      if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        var args = toArray(arguments, 1);
        var info = "event handler for \"" + event + "\"";
        for (var i = 0, l = cbs.length; i < l; i++) {
          invokeWithErrorHandling(cbs[i], vm, args, vm, info);
        }
      }
      return vm
    };
  }

  /*  */

  var activeInstance = null;
  var isUpdatingChildComponent = false;

  function setActiveInstance(vm) {
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    return function () {
      activeInstance = prevActiveInstance;
    }
  }

  function initLifecycle (vm) {
    var options = vm.$options;

    // locate first non-abstract parent
    var parent = options.parent;
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }

  function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
      var vm = this;
      var prevEl = vm.$el;
      var prevVnode = vm._vnode;
      var restoreActiveInstance = setActiveInstance(vm);
      vm._vnode = vnode;
      // Vue.prototype.__patch__ is injected in entry points
      // based on the rendering backend used.
      if (!prevVnode) {
        // initial render
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
      } else {
        // updates
        vm.$el = vm.__patch__(prevVnode, vnode);
      }
      restoreActiveInstance();
      // update __vue__ reference
      if (prevEl) {
        prevEl.__vue__ = null;
      }
      if (vm.$el) {
        vm.$el.__vue__ = vm;
      }
      // if parent is an HOC, update its $el as well
      if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
        vm.$parent.$el = vm.$el;
      }
      // updated hook is called by the scheduler to ensure that children are
      // updated in a parent's updated hook.
    };

    Vue.prototype.$forceUpdate = function () {
      var vm = this;
      if (vm._watcher) {
        vm._watcher.update();
      }
    };

    Vue.prototype.$destroy = function () {
      var vm = this;
      if (vm._isBeingDestroyed) {
        return
      }
      callHook(vm, 'beforeDestroy');
      vm._isBeingDestroyed = true;
      // remove self from parent
      var parent = vm.$parent;
      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
        remove(parent.$children, vm);
      }
      // teardown watchers
      if (vm._watcher) {
        vm._watcher.teardown();
      }
      var i = vm._watchers.length;
      while (i--) {
        vm._watchers[i].teardown();
      }
      // remove reference from data ob
      // frozen object may not have observer.
      if (vm._data.__ob__) {
        vm._data.__ob__.vmCount--;
      }
      // call the last hook...
      vm._isDestroyed = true;
      // invoke destroy hooks on current rendered tree
      vm.__patch__(vm._vnode, null);
      // fire destroyed hook
      callHook(vm, 'destroyed');
      // turn off all instance listeners.
      vm.$off();
      // remove __vue__ reference
      if (vm.$el) {
        vm.$el.__vue__ = null;
      }
      // release circular reference (#6759)
      if (vm.$vnode) {
        vm.$vnode.parent = null;
      }
    };
  }

  function mountComponent (
    vm,
    el,
    hydrating
  ) {
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
      {
        /* istanbul ignore if */
        if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
          vm.$options.el || el) {
          warn(
            'You are using the runtime-only build of Vue where the template ' +
            'compiler is not available. Either pre-compile the templates into ' +
            'render functions, or use the compiler-included build.',
            vm
          );
        } else {
          warn(
            'Failed to mount component: template or render function not defined.',
            vm
          );
        }
      }
    }
    callHook(vm, 'beforeMount');

    var updateComponent;
    /* istanbul ignore if */
    if (config.performance && mark) {
      updateComponent = function () {
        var name = vm._name;
        var id = vm._uid;
        var startTag = "vue-perf-start:" + id;
        var endTag = "vue-perf-end:" + id;

        mark(startTag);
        var vnode = vm._render();
        mark(endTag);
        measure(("vue " + name + " render"), startTag, endTag);

        mark(startTag);
        vm._update(vnode, hydrating);
        mark(endTag);
        measure(("vue " + name + " patch"), startTag, endTag);
      };
    } else {
      updateComponent = function () {
        vm._update(vm._render(), hydrating);
      };
    }

    // we set this to vm._watcher inside the watcher's constructor
    // since the watcher's initial patch may call $forceUpdate (e.g. inside child
    // component's mounted hook), which relies on vm._watcher being already defined
    new Watcher(vm, updateComponent, noop, {
      before: function before () {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'beforeUpdate');
        }
      }
    }, true /* isRenderWatcher */);
    hydrating = false;

    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm
  }

  function updateChildComponent (
    vm,
    propsData,
    listeners,
    parentVnode,
    renderChildren
  ) {
    {
      isUpdatingChildComponent = true;
    }

    // determine whether component has slot children
    // we need to do this before overwriting $options._renderChildren.

    // check if there are dynamic scopedSlots (hand-written or compiled but with
    // dynamic slot names). Static scoped slots compiled from template has the
    // "$stable" marker.
    var newScopedSlots = parentVnode.data.scopedSlots;
    var oldScopedSlots = vm.$scopedSlots;
    var hasDynamicScopedSlot = !!(
      (newScopedSlots && !newScopedSlots.$stable) ||
      (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
      (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
    );

    // Any static slot children from the parent may have changed during parent's
    // update. Dynamic scoped slots may also have changed. In such cases, a forced
    // update is necessary to ensure correctness.
    var needsForceUpdate = !!(
      renderChildren ||               // has new static slots
      vm.$options._renderChildren ||  // has old static slots
      hasDynamicScopedSlot
    );

    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render

    if (vm._vnode) { // update child tree's parent
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;

    // update $attrs and $listeners hash
    // these are also reactive so they may trigger child update if the child
    // used them during render
    vm.$attrs = parentVnode.data.attrs || emptyObject;
    vm.$listeners = listeners || emptyObject;

    // update props
    if (propsData && vm.$options.props) {
      toggleObserving(false);
      var props = vm._props;
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        var propOptions = vm.$options.props; // wtf flow?
        props[key] = validateProp(key, propOptions, propsData, vm);
      }
      toggleObserving(true);
      // keep a copy of raw propsData
      vm.$options.propsData = propsData;
    }

    // update listeners
    listeners = listeners || emptyObject;
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);

    // resolve slots + force update if has children
    if (needsForceUpdate) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }

    {
      isUpdatingChildComponent = false;
    }
  }

  function isInInactiveTree (vm) {
    while (vm && (vm = vm.$parent)) {
      if (vm._inactive) { return true }
    }
    return false
  }

  function activateChildComponent (vm, direct) {
    if (direct) {
      vm._directInactive = false;
      if (isInInactiveTree(vm)) {
        return
      }
    } else if (vm._directInactive) {
      return
    }
    if (vm._inactive || vm._inactive === null) {
      vm._inactive = false;
      for (var i = 0; i < vm.$children.length; i++) {
        activateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'activated');
    }
  }

  function deactivateChildComponent (vm, direct) {
    if (direct) {
      vm._directInactive = true;
      if (isInInactiveTree(vm)) {
        return
      }
    }
    if (!vm._inactive) {
      vm._inactive = true;
      for (var i = 0; i < vm.$children.length; i++) {
        deactivateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'deactivated');
    }
  }

  function callHook (vm, hook) {
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        invokeWithErrorHandling(handlers[i], vm, null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
  }

  /*  */

  var MAX_UPDATE_COUNT = 100;

  var queue = [];
  var activatedChildren = [];
  var has = {};
  var circular = {};
  var waiting = false;
  var flushing = false;
  var index = 0;

  /**
   * Reset the scheduler's state.
   */
  function resetSchedulerState () {
    index = queue.length = activatedChildren.length = 0;
    has = {};
    {
      circular = {};
    }
    waiting = flushing = false;
  }

  // Async edge case #6566 requires saving the timestamp when event listeners are
  // attached. However, calling performance.now() has a perf overhead especially
  // if the page has thousands of event listeners. Instead, we take a timestamp
  // every time the scheduler flushes and use that for all event listeners
  // attached during that flush.
  var currentFlushTimestamp = 0;

  // Async edge case fix requires storing an event listener's attach timestamp.
  var getNow = Date.now;

  // Determine what event timestamp the browser is using. Annoyingly, the
  // timestamp can either be hi-res (relative to page load) or low-res
  // (relative to UNIX epoch), so in order to compare time we have to use the
  // same timestamp type when saving the flush timestamp.
  // All IE versions use low-res event timestamps, and have problematic clock
  // implementations (#9632)
  if (inBrowser && !isIE) {
    var performance = window.performance;
    if (
      performance &&
      typeof performance.now === 'function' &&
      getNow() > document.createEvent('Event').timeStamp
    ) {
      // if the event timestamp, although evaluated AFTER the Date.now(), is
      // smaller than it, it means the event is using a hi-res timestamp,
      // and we need to use the hi-res version for event listener timestamps as
      // well.
      getNow = function () { return performance.now(); };
    }
  }

  /**
   * Flush both queues and run the watchers.
   */
  function flushSchedulerQueue () {
    currentFlushTimestamp = getNow();
    flushing = true;
    var watcher, id;

    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    queue.sort(function (a, b) { return a.id - b.id; });

    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index = 0; index < queue.length; index++) {
      watcher = queue[index];
      if (watcher.before) {
        watcher.before();
      }
      id = watcher.id;
      has[id] = null;
      watcher.run();
      // in dev build, check and stop circular updates.
      if (has[id] != null) {
        circular[id] = (circular[id] || 0) + 1;
        if (circular[id] > MAX_UPDATE_COUNT) {
          warn(
            'You may have an infinite update loop ' + (
              watcher.user
                ? ("in watcher with expression \"" + (watcher.expression) + "\"")
                : "in a component render function."
            ),
            watcher.vm
          );
          break
        }
      }
    }

    // keep copies of post queues before resetting state
    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();

    resetSchedulerState();

    // call component updated and activated hooks
    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);

    // devtool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
  }

  function callUpdatedHooks (queue) {
    var i = queue.length;
    while (i--) {
      var watcher = queue[i];
      var vm = watcher.vm;
      if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'updated');
      }
    }
  }

  /**
   * Queue a kept-alive component that was activated during patch.
   * The queue will be processed after the entire tree has been patched.
   */
  function queueActivatedComponent (vm) {
    // setting _inactive to false here so that a render function can
    // rely on checking whether it's in an inactive tree (e.g. router-view)
    vm._inactive = false;
    activatedChildren.push(vm);
  }

  function callActivatedHooks (queue) {
    for (var i = 0; i < queue.length; i++) {
      queue[i]._inactive = true;
      activateChildComponent(queue[i], true /* true */);
    }
  }

  /**
   * Push a watcher into the watcher queue.
   * Jobs with duplicate IDs will be skipped unless it's
   * pushed when the queue is being flushed.
   */
  function queueWatcher (watcher) {
    var id = watcher.id;
    if (has[id] == null) {
      has[id] = true;
      if (!flushing) {
        queue.push(watcher);
      } else {
        // if already flushing, splice the watcher based on its id
        // if already past its id, it will be run next immediately.
        var i = queue.length - 1;
        while (i > index && queue[i].id > watcher.id) {
          i--;
        }
        queue.splice(i + 1, 0, watcher);
      }
      // queue the flush
      if (!waiting) {
        waiting = true;

        if (!config.async) {
          flushSchedulerQueue();
          return
        }
        nextTick(flushSchedulerQueue);
      }
    }
  }

  /*  */



  var uid$2 = 0;

  /**
   * A watcher parses an expression, collects dependencies,
   * and fires callback when the expression value changes.
   * This is used for both the $watch() api and directives.
   */
  var Watcher = function Watcher (
    vm,
    expOrFn,
    cb,
    options,
    isRenderWatcher
  ) {
    this.vm = vm;
    if (isRenderWatcher) {
      vm._watcher = this;
    }
    vm._watchers.push(this);
    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$2; // uid for batching
    this.active = true;
    this.dirty = this.lazy; // for lazy watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression = expOrFn.toString();
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = noop;
        warn(
          "Failed watching path: \"" + expOrFn + "\" " +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        );
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get();
  };

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  Watcher.prototype.get = function get () {
    pushTarget(this);
    var value;
    var vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value
  };

  /**
   * Add a dependency to this directive.
   */
  Watcher.prototype.addDep = function addDep (dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };

  /**
   * Clean up for dependency collection.
   */
  Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var i = this.deps.length;
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  Watcher.prototype.update = function update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  Watcher.prototype.run = function run () {
    if (this.active) {
      var value = this.get();
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        var oldValue = this.value;
        this.value = value;
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue);
          } catch (e) {
            handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
          }
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  Watcher.prototype.evaluate = function evaluate () {
    this.value = this.get();
    this.dirty = false;
  };

  /**
   * Depend on all deps collected by this watcher.
   */
  Watcher.prototype.depend = function depend () {
    var i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  };

  /**
   * Remove self from all dependencies' subscriber list.
   */
  Watcher.prototype.teardown = function teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this);
      }
      var i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
    }
  };

  /*  */

  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };

  function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function initState (vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) { initProps(vm, opts.props); }
    if (opts.methods) { initMethods(vm, opts.methods); }
    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true /* asRootData */);
    }
    if (opts.computed) { initComputed(vm, opts.computed); }
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }

  function initProps (vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props = vm._props = {};
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    var keys = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    // root instance props should be converted
    if (!isRoot) {
      toggleObserving(false);
    }
    var loop = function ( key ) {
      keys.push(key);
      var value = validateProp(key, propsOptions, propsData, vm);
      /* istanbul ignore else */
      {
        var hyphenatedKey = hyphenate(key);
        if (isReservedAttribute(hyphenatedKey) ||
            config.isReservedAttr(hyphenatedKey)) {
          warn(
            ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
            vm
          );
        }
        defineReactive$$1(props, key, value, function () {
          if (!isRoot && !isUpdatingChildComponent) {
            warn(
              "Avoid mutating a prop directly since the value will be " +
              "overwritten whenever the parent component re-renders. " +
              "Instead, use a data or computed property based on the prop's " +
              "value. Prop being mutated: \"" + key + "\"",
              vm
            );
          }
        });
      }
      // static props are already proxied on the component's prototype
      // during Vue.extend(). We only need to proxy props defined at
      // instantiation here.
      if (!(key in vm)) {
        proxy(vm, "_props", key);
      }
    };

    for (var key in propsOptions) loop( key );
    toggleObserving(true);
  }

  function initData (vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {};
    if (!isPlainObject(data)) {
      data = {};
      warn(
        'data functions should return an object:\n' +
        'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      );
    }
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var methods = vm.$options.methods;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      {
        if (methods && hasOwn(methods, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a data property."),
            vm
          );
        }
      }
      if (props && hasOwn(props, key)) {
        warn(
          "The data property \"" + key + "\" is already declared as a prop. " +
          "Use prop default value instead.",
          vm
        );
      } else if (!isReserved(key)) {
        proxy(vm, "_data", key);
      }
    }
    // observe data
    observe(data, true /* asRootData */);
  }

  function getData (data, vm) {
    // #7573 disable dep collection when invoking data getters
    pushTarget();
    try {
      return data.call(vm, vm)
    } catch (e) {
      handleError(e, vm, "data()");
      return {}
    } finally {
      popTarget();
    }
  }

  var computedWatcherOptions = { lazy: true };

  function initComputed (vm, computed) {
    // $flow-disable-line
    var watchers = vm._computedWatchers = Object.create(null);
    // computed properties are just getters during SSR
    var isSSR = isServerRendering();

    for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get;
      if (getter == null) {
        warn(
          ("Getter is missing for computed property \"" + key + "\"."),
          vm
        );
      }

      if (!isSSR) {
        // create internal watcher for the computed property.
        watchers[key] = new Watcher(
          vm,
          getter || noop,
          noop,
          computedWatcherOptions
        );
      }

      // component-defined computed properties are already defined on the
      // component prototype. We only need to define computed properties defined
      // at instantiation here.
      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      } else {
        if (key in vm.$data) {
          warn(("The computed property \"" + key + "\" is already defined in data."), vm);
        } else if (vm.$options.props && key in vm.$options.props) {
          warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
        }
      }
    }
  }

  function defineComputed (
    target,
    key,
    userDef
  ) {
    var shouldCache = !isServerRendering();
    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = shouldCache
        ? createComputedGetter(key)
        : createGetterInvoker(userDef);
      sharedPropertyDefinition.set = noop;
    } else {
      sharedPropertyDefinition.get = userDef.get
        ? shouldCache && userDef.cache !== false
          ? createComputedGetter(key)
          : createGetterInvoker(userDef.get)
        : noop;
      sharedPropertyDefinition.set = userDef.set || noop;
    }
    if (sharedPropertyDefinition.set === noop) {
      sharedPropertyDefinition.set = function () {
        warn(
          ("Computed property \"" + key + "\" was assigned to but it has no setter."),
          this
        );
      };
    }
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function createComputedGetter (key) {
    return function computedGetter () {
      var watcher = this._computedWatchers && this._computedWatchers[key];
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value
      }
    }
  }

  function createGetterInvoker(fn) {
    return function computedGetter () {
      return fn.call(this, this)
    }
  }

  function initMethods (vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {
      {
        if (typeof methods[key] !== 'function') {
          warn(
            "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
            "Did you reference the function correctly?",
            vm
          );
        }
        if (props && hasOwn(props, key)) {
          warn(
            ("Method \"" + key + "\" has already been defined as a prop."),
            vm
          );
        }
        if ((key in vm) && isReserved(key)) {
          warn(
            "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
            "Avoid defining component methods that start with _ or $."
          );
        }
      }
      vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
    }
  }

  function initWatch (vm, watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }

  function createWatcher (
    vm,
    expOrFn,
    handler,
    options
  ) {
    if (isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === 'string') {
      handler = vm[handler];
    }
    return vm.$watch(expOrFn, handler, options)
  }

  function stateMixin (Vue) {
    // flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    var dataDef = {};
    dataDef.get = function () { return this._data };
    var propsDef = {};
    propsDef.get = function () { return this._props };
    {
      dataDef.set = function () {
        warn(
          'Avoid replacing instance root $data. ' +
          'Use nested data properties instead.',
          this
        );
      };
      propsDef.set = function () {
        warn("$props is readonly.", this);
      };
    }
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);

    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;

    Vue.prototype.$watch = function (
      expOrFn,
      cb,
      options
    ) {
      var vm = this;
      if (isPlainObject(cb)) {
        return createWatcher(vm, expOrFn, cb, options)
      }
      options = options || {};
      options.user = true;
      var watcher = new Watcher(vm, expOrFn, cb, options);
      if (options.immediate) {
        try {
          cb.call(vm, watcher.value);
        } catch (error) {
          handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
        }
      }
      return function unwatchFn () {
        watcher.teardown();
      }
    };
  }

  /*  */

  var uid$3 = 0;

  function initMixin (Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      // a uid
      vm._uid = uid$3++;

      var startTag, endTag;
      /* istanbul ignore if */
      if (config.performance && mark) {
        startTag = "vue-perf-start:" + (vm._uid);
        endTag = "vue-perf-end:" + (vm._uid);
        mark(startTag);
      }

      // a flag to avoid this being observed
      vm._isVue = true;
      // merge options
      if (options && options._isComponent) {
        // optimize internal component instantiation
        // since dynamic options merging is pretty slow, and none of the
        // internal component options needs special treatment.
        initInternalComponent(vm, options);
      } else {
        vm.$options = mergeOptions(
          resolveConstructorOptions(vm.constructor),
          options || {},
          vm
        );
      }
      /* istanbul ignore else */
      {
        initProxy(vm);
      }
      // expose real self
      vm._self = vm;
      initLifecycle(vm);
      initEvents(vm);
      initRender(vm);
      callHook(vm, 'beforeCreate');
      initInjections(vm); // resolve injections before data/props
      initState(vm);
      initProvide(vm); // resolve provide after data/props
      callHook(vm, 'created');

      /* istanbul ignore if */
      if (config.performance && mark) {
        vm._name = formatComponentName(vm, false);
        mark(endTag);
        measure(("vue " + (vm._name) + " init"), startTag, endTag);
      }

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }

  function initInternalComponent (vm, options) {
    var opts = vm.$options = Object.create(vm.constructor.options);
    // doing this because it's faster than dynamic enumeration.
    var parentVnode = options._parentVnode;
    opts.parent = options.parent;
    opts._parentVnode = parentVnode;

    var vnodeComponentOptions = parentVnode.componentOptions;
    opts.propsData = vnodeComponentOptions.propsData;
    opts._parentListeners = vnodeComponentOptions.listeners;
    opts._renderChildren = vnodeComponentOptions.children;
    opts._componentTag = vnodeComponentOptions.tag;

    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }

  function resolveConstructorOptions (Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
      var superOptions = resolveConstructorOptions(Ctor.super);
      var cachedSuperOptions = Ctor.superOptions;
      if (superOptions !== cachedSuperOptions) {
        // super option changed,
        // need to resolve new options.
        Ctor.superOptions = superOptions;
        // check if there are any late-modified/attached options (#4976)
        var modifiedOptions = resolveModifiedOptions(Ctor);
        // update base extend options
        if (modifiedOptions) {
          extend(Ctor.extendOptions, modifiedOptions);
        }
        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
        if (options.name) {
          options.components[options.name] = Ctor;
        }
      }
    }
    return options
  }

  function resolveModifiedOptions (Ctor) {
    var modified;
    var latest = Ctor.options;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
      if (latest[key] !== sealed[key]) {
        if (!modified) { modified = {}; }
        modified[key] = latest[key];
      }
    }
    return modified
  }

  function Vue (options) {
    if (!(this instanceof Vue)
    ) {
      warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
  }

  initMixin(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

  /*  */

  function initUse (Vue) {
    Vue.use = function (plugin) {
      var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
      if (installedPlugins.indexOf(plugin) > -1) {
        return this
      }

      // additional parameters
      var args = toArray(arguments, 1);
      args.unshift(this);
      if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
      } else if (typeof plugin === 'function') {
        plugin.apply(null, args);
      }
      installedPlugins.push(plugin);
      return this
    };
  }

  /*  */

  function initMixin$1 (Vue) {
    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
      return this
    };
  }

  /*  */

  function initExtend (Vue) {
    /**
     * Each instance constructor, including Vue, has a unique
     * cid. This enables us to create wrapped "child
     * constructors" for prototypal inheritance and cache them.
     */
    Vue.cid = 0;
    var cid = 1;

    /**
     * Class inheritance
     */
    Vue.extend = function (extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;
      var SuperId = Super.cid;
      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId]
      }

      var name = extendOptions.name || Super.options.name;
      if (name) {
        validateComponentName(name);
      }

      var Sub = function VueComponent (options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(
        Super.options,
        extendOptions
      );
      Sub['super'] = Super;

      // For props and computed properties, we define the proxy getters on
      // the Vue instances at extension time, on the extended prototype. This
      // avoids Object.defineProperty calls for each instance created.
      if (Sub.options.props) {
        initProps$1(Sub);
      }
      if (Sub.options.computed) {
        initComputed$1(Sub);
      }

      // allow further extension/mixin/plugin usage
      Sub.extend = Super.extend;
      Sub.mixin = Super.mixin;
      Sub.use = Super.use;

      // create asset registers, so extended classes
      // can have their private assets too.
      ASSET_TYPES.forEach(function (type) {
        Sub[type] = Super[type];
      });
      // enable recursive self-lookup
      if (name) {
        Sub.options.components[name] = Sub;
      }

      // keep a reference to the super options at extension time.
      // later at instantiation we can check if Super's options have
      // been updated.
      Sub.superOptions = Super.options;
      Sub.extendOptions = extendOptions;
      Sub.sealedOptions = extend({}, Sub.options);

      // cache constructor
      cachedCtors[SuperId] = Sub;
      return Sub
    };
  }

  function initProps$1 (Comp) {
    var props = Comp.options.props;
    for (var key in props) {
      proxy(Comp.prototype, "_props", key);
    }
  }

  function initComputed$1 (Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
      defineComputed(Comp.prototype, key, computed[key]);
    }
  }

  /*  */

  function initAssetRegisters (Vue) {
    /**
     * Create asset registration methods.
     */
    ASSET_TYPES.forEach(function (type) {
      Vue[type] = function (
        id,
        definition
      ) {
        if (!definition) {
          return this.options[type + 's'][id]
        } else {
          /* istanbul ignore if */
          if (type === 'component') {
            validateComponentName(id);
          }
          if (type === 'component' && isPlainObject(definition)) {
            definition.name = definition.name || id;
            definition = this.options._base.extend(definition);
          }
          if (type === 'directive' && typeof definition === 'function') {
            definition = { bind: definition, update: definition };
          }
          this.options[type + 's'][id] = definition;
          return definition
        }
      };
    });
  }

  /*  */



  function getComponentName (opts) {
    return opts && (opts.Ctor.options.name || opts.tag)
  }

  function matches (pattern, name) {
    if (Array.isArray(pattern)) {
      return pattern.indexOf(name) > -1
    } else if (typeof pattern === 'string') {
      return pattern.split(',').indexOf(name) > -1
    } else if (isRegExp(pattern)) {
      return pattern.test(name)
    }
    /* istanbul ignore next */
    return false
  }

  function pruneCache (keepAliveInstance, filter) {
    var cache = keepAliveInstance.cache;
    var keys = keepAliveInstance.keys;
    var _vnode = keepAliveInstance._vnode;
    for (var key in cache) {
      var cachedNode = cache[key];
      if (cachedNode) {
        var name = getComponentName(cachedNode.componentOptions);
        if (name && !filter(name)) {
          pruneCacheEntry(cache, key, keys, _vnode);
        }
      }
    }
  }

  function pruneCacheEntry (
    cache,
    key,
    keys,
    current
  ) {
    var cached$$1 = cache[key];
    if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
      cached$$1.componentInstance.$destroy();
    }
    cache[key] = null;
    remove(keys, key);
  }

  var patternTypes = [String, RegExp, Array];

  var KeepAlive = {
    name: 'keep-alive',
    abstract: true,

    props: {
      include: patternTypes,
      exclude: patternTypes,
      max: [String, Number]
    },

    created: function created () {
      this.cache = Object.create(null);
      this.keys = [];
    },

    destroyed: function destroyed () {
      for (var key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys);
      }
    },

    mounted: function mounted () {
      var this$1 = this;

      this.$watch('include', function (val) {
        pruneCache(this$1, function (name) { return matches(val, name); });
      });
      this.$watch('exclude', function (val) {
        pruneCache(this$1, function (name) { return !matches(val, name); });
      });
    },

    render: function render () {
      var slot = this.$slots.default;
      var vnode = getFirstComponentChild(slot);
      var componentOptions = vnode && vnode.componentOptions;
      if (componentOptions) {
        // check pattern
        var name = getComponentName(componentOptions);
        var ref = this;
        var include = ref.include;
        var exclude = ref.exclude;
        if (
          // not included
          (include && (!name || !matches(include, name))) ||
          // excluded
          (exclude && name && matches(exclude, name))
        ) {
          return vnode
        }

        var ref$1 = this;
        var cache = ref$1.cache;
        var keys = ref$1.keys;
        var key = vnode.key == null
          // same constructor may get registered as different local components
          // so cid alone is not enough (#3269)
          ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
          : vnode.key;
        if (cache[key]) {
          vnode.componentInstance = cache[key].componentInstance;
          // make current key freshest
          remove(keys, key);
          keys.push(key);
        } else {
          cache[key] = vnode;
          keys.push(key);
          // prune oldest entry
          if (this.max && keys.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode);
          }
        }

        vnode.data.keepAlive = true;
      }
      return vnode || (slot && slot[0])
    }
  };

  var builtInComponents = {
    KeepAlive: KeepAlive
  };

  /*  */

  function initGlobalAPI (Vue) {
    // config
    var configDef = {};
    configDef.get = function () { return config; };
    {
      configDef.set = function () {
        warn(
          'Do not replace the Vue.config object, set individual fields instead.'
        );
      };
    }
    Object.defineProperty(Vue, 'config', configDef);

    // exposed util methods.
    // NOTE: these are not considered part of the public API - avoid relying on
    // them unless you are aware of the risk.
    Vue.util = {
      warn: warn,
      extend: extend,
      mergeOptions: mergeOptions,
      defineReactive: defineReactive$$1
    };

    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick;

    // 2.6 explicit observable API
    Vue.observable = function (obj) {
      observe(obj);
      return obj
    };

    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(function (type) {
      Vue.options[type + 's'] = Object.create(null);
    });

    // this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base = Vue;

    extend(Vue.options.components, builtInComponents);

    initUse(Vue);
    initMixin$1(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
  }

  initGlobalAPI(Vue);

  Object.defineProperty(Vue.prototype, '$isServer', {
    get: isServerRendering
  });

  Object.defineProperty(Vue.prototype, '$ssrContext', {
    get: function get () {
      /* istanbul ignore next */
      return this.$vnode && this.$vnode.ssrContext
    }
  });

  // expose FunctionalRenderContext for ssr runtime helper installation
  Object.defineProperty(Vue, 'FunctionalRenderContext', {
    value: FunctionalRenderContext
  });

  Vue.version = '2.6.10';

  /*  */

  // these are reserved for web because they are directly compiled away
  // during template compilation
  var isReservedAttr = makeMap('style,class');

  // attributes that should be using props for binding
  var acceptValue = makeMap('input,textarea,option,select,progress');
  var mustUseProp = function (tag, type, attr) {
    return (
      (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
      (attr === 'selected' && tag === 'option') ||
      (attr === 'checked' && tag === 'input') ||
      (attr === 'muted' && tag === 'video')
    )
  };

  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

  var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

  var convertEnumeratedValue = function (key, value) {
    return isFalsyAttrValue(value) || value === 'false'
      ? 'false'
      // allow arbitrary string value for contenteditable
      : key === 'contenteditable' && isValidContentEditableValue(value)
        ? value
        : 'true'
  };

  var isBooleanAttr = makeMap(
    'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
    'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
    'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
    'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
    'required,reversed,scoped,seamless,selected,sortable,translate,' +
    'truespeed,typemustmatch,visible'
  );

  var xlinkNS = 'http://www.w3.org/1999/xlink';

  var isXlink = function (name) {
    return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
  };

  var getXlinkProp = function (name) {
    return isXlink(name) ? name.slice(6, name.length) : ''
  };

  var isFalsyAttrValue = function (val) {
    return val == null || val === false
  };

  /*  */

  function genClassForVnode (vnode) {
    var data = vnode.data;
    var parentNode = vnode;
    var childNode = vnode;
    while (isDef(childNode.componentInstance)) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data) {
        data = mergeClassData(childNode.data, data);
      }
    }
    while (isDef(parentNode = parentNode.parent)) {
      if (parentNode && parentNode.data) {
        data = mergeClassData(data, parentNode.data);
      }
    }
    return renderClass(data.staticClass, data.class)
  }

  function mergeClassData (child, parent) {
    return {
      staticClass: concat(child.staticClass, parent.staticClass),
      class: isDef(child.class)
        ? [child.class, parent.class]
        : parent.class
    }
  }

  function renderClass (
    staticClass,
    dynamicClass
  ) {
    if (isDef(staticClass) || isDef(dynamicClass)) {
      return concat(staticClass, stringifyClass(dynamicClass))
    }
    /* istanbul ignore next */
    return ''
  }

  function concat (a, b) {
    return a ? b ? (a + ' ' + b) : a : (b || '')
  }

  function stringifyClass (value) {
    if (Array.isArray(value)) {
      return stringifyArray(value)
    }
    if (isObject(value)) {
      return stringifyObject(value)
    }
    if (typeof value === 'string') {
      return value
    }
    /* istanbul ignore next */
    return ''
  }

  function stringifyArray (value) {
    var res = '';
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
        if (res) { res += ' '; }
        res += stringified;
      }
    }
    return res
  }

  function stringifyObject (value) {
    var res = '';
    for (var key in value) {
      if (value[key]) {
        if (res) { res += ' '; }
        res += key;
      }
    }
    return res
  }

  /*  */

  var namespaceMap = {
    svg: 'http://www.w3.org/2000/svg',
    math: 'http://www.w3.org/1998/Math/MathML'
  };

  var isHTMLTag = makeMap(
    'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot'
  );

  // this map is intentionally selective, only covering SVG elements that may
  // contain child elements.
  var isSVG = makeMap(
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
    true
  );

  var isPreTag = function (tag) { return tag === 'pre'; };

  var isReservedTag = function (tag) {
    return isHTMLTag(tag) || isSVG(tag)
  };

  function getTagNamespace (tag) {
    if (isSVG(tag)) {
      return 'svg'
    }
    // basic support for MathML
    // note it doesn't support other MathML elements being component roots
    if (tag === 'math') {
      return 'math'
    }
  }

  var unknownElementCache = Object.create(null);
  function isUnknownElement (tag) {
    /* istanbul ignore if */
    if (!inBrowser) {
      return true
    }
    if (isReservedTag(tag)) {
      return false
    }
    tag = tag.toLowerCase();
    /* istanbul ignore if */
    if (unknownElementCache[tag] != null) {
      return unknownElementCache[tag]
    }
    var el = document.createElement(tag);
    if (tag.indexOf('-') > -1) {
      // http://stackoverflow.com/a/28210364/1070244
      return (unknownElementCache[tag] = (
        el.constructor === window.HTMLUnknownElement ||
        el.constructor === window.HTMLElement
      ))
    } else {
      return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
    }
  }

  var isTextInputType = makeMap('text,number,password,search,email,tel,url');

  /*  */

  /**
   * Query an element selector if it's not an element already.
   */
  function query (el) {
    if (typeof el === 'string') {
      var selected = document.querySelector(el);
      if (!selected) {
        warn(
          'Cannot find element: ' + el
        );
        return document.createElement('div')
      }
      return selected
    } else {
      return el
    }
  }

  /*  */

  function createElement$1 (tagName, vnode) {
    var elm = document.createElement(tagName);
    if (tagName !== 'select') {
      return elm
    }
    // false or null will remove the attribute but undefined will not
    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
      elm.setAttribute('multiple', 'multiple');
    }
    return elm
  }

  function createElementNS (namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName)
  }

  function createTextNode (text) {
    return document.createTextNode(text)
  }

  function createComment (text) {
    return document.createComment(text)
  }

  function insertBefore (parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
  }

  function removeChild (node, child) {
    node.removeChild(child);
  }

  function appendChild (node, child) {
    node.appendChild(child);
  }

  function parentNode (node) {
    return node.parentNode
  }

  function nextSibling (node) {
    return node.nextSibling
  }

  function tagName (node) {
    return node.tagName
  }

  function setTextContent (node, text) {
    node.textContent = text;
  }

  function setStyleScope (node, scopeId) {
    node.setAttribute(scopeId, '');
  }

  var nodeOps = /*#__PURE__*/Object.freeze({
    createElement: createElement$1,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    setStyleScope: setStyleScope
  });

  /*  */

  var ref = {
    create: function create (_, vnode) {
      registerRef(vnode);
    },
    update: function update (oldVnode, vnode) {
      if (oldVnode.data.ref !== vnode.data.ref) {
        registerRef(oldVnode, true);
        registerRef(vnode);
      }
    },
    destroy: function destroy (vnode) {
      registerRef(vnode, true);
    }
  };

  function registerRef (vnode, isRemoval) {
    var key = vnode.data.ref;
    if (!isDef(key)) { return }

    var vm = vnode.context;
    var ref = vnode.componentInstance || vnode.elm;
    var refs = vm.$refs;
    if (isRemoval) {
      if (Array.isArray(refs[key])) {
        remove(refs[key], ref);
      } else if (refs[key] === ref) {
        refs[key] = undefined;
      }
    } else {
      if (vnode.data.refInFor) {
        if (!Array.isArray(refs[key])) {
          refs[key] = [ref];
        } else if (refs[key].indexOf(ref) < 0) {
          // $flow-disable-line
          refs[key].push(ref);
        }
      } else {
        refs[key] = ref;
      }
    }
  }

  /**
   * Virtual DOM patching algorithm based on Snabbdom by
   * Simon Friis Vindum (@paldepind)
   * Licensed under the MIT License
   * https://github.com/paldepind/snabbdom/blob/master/LICENSE
   *
   * modified by Evan You (@yyx990803)
   *
   * Not type-checking this because this file is perf-critical and the cost
   * of making flow understand it is not worth it.
   */

  var emptyNode = new VNode('', {}, []);

  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

  function sameVnode (a, b) {
    return (
      a.key === b.key && (
        (
          a.tag === b.tag &&
          a.isComment === b.isComment &&
          isDef(a.data) === isDef(b.data) &&
          sameInputType(a, b)
        ) || (
          isTrue(a.isAsyncPlaceholder) &&
          a.asyncFactory === b.asyncFactory &&
          isUndef(b.asyncFactory.error)
        )
      )
    )
  }

  function sameInputType (a, b) {
    if (a.tag !== 'input') { return true }
    var i;
    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
    return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
  }

  function createKeyToOldIdx (children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
      key = children[i].key;
      if (isDef(key)) { map[key] = i; }
    }
    return map
  }

  function createPatchFunction (backend) {
    var i, j;
    var cbs = {};

    var modules = backend.modules;
    var nodeOps = backend.nodeOps;

    for (i = 0; i < hooks.length; ++i) {
      cbs[hooks[i]] = [];
      for (j = 0; j < modules.length; ++j) {
        if (isDef(modules[j][hooks[i]])) {
          cbs[hooks[i]].push(modules[j][hooks[i]]);
        }
      }
    }

    function emptyNodeAt (elm) {
      return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function createRmCb (childElm, listeners) {
      function remove$$1 () {
        if (--remove$$1.listeners === 0) {
          removeNode(childElm);
        }
      }
      remove$$1.listeners = listeners;
      return remove$$1
    }

    function removeNode (el) {
      var parent = nodeOps.parentNode(el);
      // element may have already been removed due to v-html / v-text
      if (isDef(parent)) {
        nodeOps.removeChild(parent, el);
      }
    }

    function isUnknownElement$$1 (vnode, inVPre) {
      return (
        !inVPre &&
        !vnode.ns &&
        !(
          config.ignoredElements.length &&
          config.ignoredElements.some(function (ignore) {
            return isRegExp(ignore)
              ? ignore.test(vnode.tag)
              : ignore === vnode.tag
          })
        ) &&
        config.isUnknownElement(vnode.tag)
      )
    }

    var creatingElmInVPre = 0;

    function createElm (
      vnode,
      insertedVnodeQueue,
      parentElm,
      refElm,
      nested,
      ownerArray,
      index
    ) {
      if (isDef(vnode.elm) && isDef(ownerArray)) {
        // This vnode was used in a previous render!
        // now it's used as a new node, overwriting its elm would cause
        // potential patch errors down the road when it's used as an insertion
        // reference node. Instead, we clone the node on-demand before creating
        // associated DOM element for it.
        vnode = ownerArray[index] = cloneVNode(vnode);
      }

      vnode.isRootInsert = !nested; // for transition enter check
      if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
        return
      }

      var data = vnode.data;
      var children = vnode.children;
      var tag = vnode.tag;
      if (isDef(tag)) {
        {
          if (data && data.pre) {
            creatingElmInVPre++;
          }
          if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
            warn(
              'Unknown custom element: <' + tag + '> - did you ' +
              'register the component correctly? For recursive components, ' +
              'make sure to provide the "name" option.',
              vnode.context
            );
          }
        }

        vnode.elm = vnode.ns
          ? nodeOps.createElementNS(vnode.ns, tag)
          : nodeOps.createElement(tag, vnode);
        setScope(vnode);

        /* istanbul ignore if */
        {
          createChildren(vnode, children, insertedVnodeQueue);
          if (isDef(data)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
          }
          insert(parentElm, vnode.elm, refElm);
        }

        if (data && data.pre) {
          creatingElmInVPre--;
        }
      } else if (isTrue(vnode.isComment)) {
        vnode.elm = nodeOps.createComment(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      } else {
        vnode.elm = nodeOps.createTextNode(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      }
    }

    function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      var i = vnode.data;
      if (isDef(i)) {
        var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
        if (isDef(i = i.hook) && isDef(i = i.init)) {
          i(vnode, false /* hydrating */);
        }
        // after calling the init hook, if the vnode is a child component
        // it should've created a child instance and mounted it. the child
        // component also has set the placeholder vnode's elm.
        // in that case we can just return the element and be done.
        if (isDef(vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          insert(parentElm, vnode.elm, refElm);
          if (isTrue(isReactivated)) {
            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
          }
          return true
        }
      }
    }

    function initComponent (vnode, insertedVnodeQueue) {
      if (isDef(vnode.data.pendingInsert)) {
        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
        vnode.data.pendingInsert = null;
      }
      vnode.elm = vnode.componentInstance.$el;
      if (isPatchable(vnode)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
        setScope(vnode);
      } else {
        // empty component root.
        // skip all element-related modules except for ref (#3455)
        registerRef(vnode);
        // make sure to invoke the insert hook
        insertedVnodeQueue.push(vnode);
      }
    }

    function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      var i;
      // hack for #4339: a reactivated component with inner transition
      // does not trigger because the inner node's created hooks are not called
      // again. It's not ideal to involve module-specific logic in here but
      // there doesn't seem to be a better way to do it.
      var innerNode = vnode;
      while (innerNode.componentInstance) {
        innerNode = innerNode.componentInstance._vnode;
        if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
          for (i = 0; i < cbs.activate.length; ++i) {
            cbs.activate[i](emptyNode, innerNode);
          }
          insertedVnodeQueue.push(innerNode);
          break
        }
      }
      // unlike a newly created component,
      // a reactivated keep-alive component doesn't insert itself
      insert(parentElm, vnode.elm, refElm);
    }

    function insert (parent, elm, ref$$1) {
      if (isDef(parent)) {
        if (isDef(ref$$1)) {
          if (nodeOps.parentNode(ref$$1) === parent) {
            nodeOps.insertBefore(parent, elm, ref$$1);
          }
        } else {
          nodeOps.appendChild(parent, elm);
        }
      }
    }

    function createChildren (vnode, children, insertedVnodeQueue) {
      if (Array.isArray(children)) {
        {
          checkDuplicateKeys(children);
        }
        for (var i = 0; i < children.length; ++i) {
          createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
        }
      } else if (isPrimitive(vnode.text)) {
        nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
      }
    }

    function isPatchable (vnode) {
      while (vnode.componentInstance) {
        vnode = vnode.componentInstance._vnode;
      }
      return isDef(vnode.tag)
    }

    function invokeCreateHooks (vnode, insertedVnodeQueue) {
      for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
        cbs.create[i$1](emptyNode, vnode);
      }
      i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (isDef(i.create)) { i.create(emptyNode, vnode); }
        if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
      }
    }

    // set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    function setScope (vnode) {
      var i;
      if (isDef(i = vnode.fnScopeId)) {
        nodeOps.setStyleScope(vnode.elm, i);
      } else {
        var ancestor = vnode;
        while (ancestor) {
          if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
            nodeOps.setStyleScope(vnode.elm, i);
          }
          ancestor = ancestor.parent;
        }
      }
      // for slot content they should also get the scopeId from the host instance.
      if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        i !== vnode.fnContext &&
        isDef(i = i.$options._scopeId)
      ) {
        nodeOps.setStyleScope(vnode.elm, i);
      }
    }

    function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      for (; startIdx <= endIdx; ++startIdx) {
        createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
      }
    }

    function invokeDestroyHook (vnode) {
      var i, j;
      var data = vnode.data;
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
        for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
      }
      if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }

    function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (isDef(ch)) {
          if (isDef(ch.tag)) {
            removeAndInvokeRemoveHook(ch);
            invokeDestroyHook(ch);
          } else { // Text node
            removeNode(ch.elm);
          }
        }
      }
    }

    function removeAndInvokeRemoveHook (vnode, rm) {
      if (isDef(rm) || isDef(vnode.data)) {
        var i;
        var listeners = cbs.remove.length + 1;
        if (isDef(rm)) {
          // we have a recursively passed down rm callback
          // increase the listeners count
          rm.listeners += listeners;
        } else {
          // directly removing
          rm = createRmCb(vnode.elm, listeners);
        }
        // recursively invoke hooks on child component root node
        if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
          removeAndInvokeRemoveHook(i, rm);
        }
        for (i = 0; i < cbs.remove.length; ++i) {
          cbs.remove[i](vnode, rm);
        }
        if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
          i(vnode, rm);
        } else {
          rm();
        }
      } else {
        removeNode(vnode.elm);
      }
    }

    function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
      var oldStartIdx = 0;
      var newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

      // removeOnly is a special flag used only by <transition-group>
      // to ensure removed elements stay in correct relative positions
      // during leaving transitions
      var canMove = !removeOnly;

      {
        checkDuplicateKeys(newCh);
      }

      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
          oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
        } else if (isUndef(oldEndVnode)) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
          canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
          canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
          idxInOld = isDef(newStartVnode.key)
            ? oldKeyToIdx[newStartVnode.key]
            : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
          if (isUndef(idxInOld)) { // New element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          } else {
            vnodeToMove = oldCh[idxInOld];
            if (sameVnode(vnodeToMove, newStartVnode)) {
              patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
              oldCh[idxInOld] = undefined;
              canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
            } else {
              // same key but different element. treat as new element
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
            }
          }
          newStartVnode = newCh[++newStartIdx];
        }
      }
      if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }

    function checkDuplicateKeys (children) {
      var seenKeys = {};
      for (var i = 0; i < children.length; i++) {
        var vnode = children[i];
        var key = vnode.key;
        if (isDef(key)) {
          if (seenKeys[key]) {
            warn(
              ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
              vnode.context
            );
          } else {
            seenKeys[key] = true;
          }
        }
      }
    }

    function findIdxInOld (node, oldCh, start, end) {
      for (var i = start; i < end; i++) {
        var c = oldCh[i];
        if (isDef(c) && sameVnode(node, c)) { return i }
      }
    }

    function patchVnode (
      oldVnode,
      vnode,
      insertedVnodeQueue,
      ownerArray,
      index,
      removeOnly
    ) {
      if (oldVnode === vnode) {
        return
      }

      if (isDef(vnode.elm) && isDef(ownerArray)) {
        // clone reused vnode
        vnode = ownerArray[index] = cloneVNode(vnode);
      }

      var elm = vnode.elm = oldVnode.elm;

      if (isTrue(oldVnode.isAsyncPlaceholder)) {
        if (isDef(vnode.asyncFactory.resolved)) {
          hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
        } else {
          vnode.isAsyncPlaceholder = true;
        }
        return
      }

      // reuse element for static trees.
      // note we only do this if the vnode is cloned -
      // if the new node is not cloned it means the render functions have been
      // reset by the hot-reload-api and we need to do a proper re-render.
      if (isTrue(vnode.isStatic) &&
        isTrue(oldVnode.isStatic) &&
        vnode.key === oldVnode.key &&
        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
      ) {
        vnode.componentInstance = oldVnode.componentInstance;
        return
      }

      var i;
      var data = vnode.data;
      if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
        i(oldVnode, vnode);
      }

      var oldCh = oldVnode.children;
      var ch = vnode.children;
      if (isDef(data) && isPatchable(vnode)) {
        for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
        if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
      }
      if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
        } else if (isDef(ch)) {
          {
            checkDuplicateKeys(ch);
          }
          if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        } else if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
      } else if (oldVnode.text !== vnode.text) {
        nodeOps.setTextContent(elm, vnode.text);
      }
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
      }
    }

    function invokeInsertHook (vnode, queue, initial) {
      // delay insert hooks for component root nodes, invoke them after the
      // element is really inserted
      if (isTrue(initial) && isDef(vnode.parent)) {
        vnode.parent.data.pendingInsert = queue;
      } else {
        for (var i = 0; i < queue.length; ++i) {
          queue[i].data.hook.insert(queue[i]);
        }
      }
    }

    var hydrationBailed = false;
    // list of modules that can skip create hook during hydration because they
    // are already rendered on the client or has no need for initialization
    // Note: style is excluded because it relies on initial clone for future
    // deep updates (#7063).
    var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

    // Note: this is a browser-only function so we can assume elms are DOM nodes.
    function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
      var i;
      var tag = vnode.tag;
      var data = vnode.data;
      var children = vnode.children;
      inVPre = inVPre || (data && data.pre);
      vnode.elm = elm;

      if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
        vnode.isAsyncPlaceholder = true;
        return true
      }
      // assert node match
      {
        if (!assertNodeMatch(elm, vnode, inVPre)) {
          return false
        }
      }
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
        if (isDef(i = vnode.componentInstance)) {
          // child component. it should have hydrated its own tree.
          initComponent(vnode, insertedVnodeQueue);
          return true
        }
      }
      if (isDef(tag)) {
        if (isDef(children)) {
          // empty element, allow client to pick up and populate children
          if (!elm.hasChildNodes()) {
            createChildren(vnode, children, insertedVnodeQueue);
          } else {
            // v-html and domProps: innerHTML
            if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
              if (i !== elm.innerHTML) {
                /* istanbul ignore if */
                if (typeof console !== 'undefined' &&
                  !hydrationBailed
                ) {
                  hydrationBailed = true;
                  console.warn('Parent: ', elm);
                  console.warn('server innerHTML: ', i);
                  console.warn('client innerHTML: ', elm.innerHTML);
                }
                return false
              }
            } else {
              // iterate and compare children lists
              var childrenMatch = true;
              var childNode = elm.firstChild;
              for (var i$1 = 0; i$1 < children.length; i$1++) {
                if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                  childrenMatch = false;
                  break
                }
                childNode = childNode.nextSibling;
              }
              // if childNode is not null, it means the actual childNodes list is
              // longer than the virtual children list.
              if (!childrenMatch || childNode) {
                /* istanbul ignore if */
                if (typeof console !== 'undefined' &&
                  !hydrationBailed
                ) {
                  hydrationBailed = true;
                  console.warn('Parent: ', elm);
                  console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
                }
                return false
              }
            }
          }
        }
        if (isDef(data)) {
          var fullInvoke = false;
          for (var key in data) {
            if (!isRenderedModule(key)) {
              fullInvoke = true;
              invokeCreateHooks(vnode, insertedVnodeQueue);
              break
            }
          }
          if (!fullInvoke && data['class']) {
            // ensure collecting deps for deep class bindings for future updates
            traverse(data['class']);
          }
        }
      } else if (elm.data !== vnode.text) {
        elm.data = vnode.text;
      }
      return true
    }

    function assertNodeMatch (node, vnode, inVPre) {
      if (isDef(vnode.tag)) {
        return vnode.tag.indexOf('vue-component') === 0 || (
          !isUnknownElement$$1(vnode, inVPre) &&
          vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
        )
      } else {
        return node.nodeType === (vnode.isComment ? 8 : 3)
      }
    }

    return function patch (oldVnode, vnode, hydrating, removeOnly) {
      if (isUndef(vnode)) {
        if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
        return
      }

      var isInitialPatch = false;
      var insertedVnodeQueue = [];

      if (isUndef(oldVnode)) {
        // empty mount (likely as component), create new root element
        isInitialPatch = true;
        createElm(vnode, insertedVnodeQueue);
      } else {
        var isRealElement = isDef(oldVnode.nodeType);
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
          // patch existing root node
          patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
        } else {
          if (isRealElement) {
            // mounting to a real element
            // check if this is server-rendered content and if we can perform
            // a successful hydration.
            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
              oldVnode.removeAttribute(SSR_ATTR);
              hydrating = true;
            }
            if (isTrue(hydrating)) {
              if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                invokeInsertHook(vnode, insertedVnodeQueue, true);
                return oldVnode
              } else {
                warn(
                  'The client-side rendered virtual DOM tree is not matching ' +
                  'server-rendered content. This is likely caused by incorrect ' +
                  'HTML markup, for example nesting block-level elements inside ' +
                  '<p>, or missing <tbody>. Bailing hydration and performing ' +
                  'full client-side render.'
                );
              }
            }
            // either not server-rendered, or hydration failed.
            // create an empty node and replace it
            oldVnode = emptyNodeAt(oldVnode);
          }

          // replacing existing element
          var oldElm = oldVnode.elm;
          var parentElm = nodeOps.parentNode(oldElm);

          // create new node
          createElm(
            vnode,
            insertedVnodeQueue,
            // extremely rare edge case: do not insert if old element is in a
            // leaving transition. Only happens when combining transition +
            // keep-alive + HOCs. (#4590)
            oldElm._leaveCb ? null : parentElm,
            nodeOps.nextSibling(oldElm)
          );

          // update parent placeholder node element, recursively
          if (isDef(vnode.parent)) {
            var ancestor = vnode.parent;
            var patchable = isPatchable(vnode);
            while (ancestor) {
              for (var i = 0; i < cbs.destroy.length; ++i) {
                cbs.destroy[i](ancestor);
              }
              ancestor.elm = vnode.elm;
              if (patchable) {
                for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                  cbs.create[i$1](emptyNode, ancestor);
                }
                // #6513
                // invoke insert hooks that may have been merged by create hooks.
                // e.g. for directives that uses the "inserted" hook.
                var insert = ancestor.data.hook.insert;
                if (insert.merged) {
                  // start at index 1 to avoid re-invoking component mounted hook
                  for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                    insert.fns[i$2]();
                  }
                }
              } else {
                registerRef(ancestor);
              }
              ancestor = ancestor.parent;
            }
          }

          // destroy old node
          if (isDef(parentElm)) {
            removeVnodes(parentElm, [oldVnode], 0, 0);
          } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode);
          }
        }
      }

      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
      return vnode.elm
    }
  }

  /*  */

  var directives = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives (vnode) {
      updateDirectives(vnode, emptyNode);
    }
  };

  function updateDirectives (oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
      _update(oldVnode, vnode);
    }
  }

  function _update (oldVnode, vnode) {
    var isCreate = oldVnode === emptyNode;
    var isDestroy = vnode === emptyNode;
    var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
    var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

    var dirsWithInsert = [];
    var dirsWithPostpatch = [];

    var key, oldDir, dir;
    for (key in newDirs) {
      oldDir = oldDirs[key];
      dir = newDirs[key];
      if (!oldDir) {
        // new directive, bind
        callHook$1(dir, 'bind', vnode, oldVnode);
        if (dir.def && dir.def.inserted) {
          dirsWithInsert.push(dir);
        }
      } else {
        // existing directive, update
        dir.oldValue = oldDir.value;
        dir.oldArg = oldDir.arg;
        callHook$1(dir, 'update', vnode, oldVnode);
        if (dir.def && dir.def.componentUpdated) {
          dirsWithPostpatch.push(dir);
        }
      }
    }

    if (dirsWithInsert.length) {
      var callInsert = function () {
        for (var i = 0; i < dirsWithInsert.length; i++) {
          callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
        }
      };
      if (isCreate) {
        mergeVNodeHook(vnode, 'insert', callInsert);
      } else {
        callInsert();
      }
    }

    if (dirsWithPostpatch.length) {
      mergeVNodeHook(vnode, 'postpatch', function () {
        for (var i = 0; i < dirsWithPostpatch.length; i++) {
          callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
        }
      });
    }

    if (!isCreate) {
      for (key in oldDirs) {
        if (!newDirs[key]) {
          // no longer present, unbind
          callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
        }
      }
    }
  }

  var emptyModifiers = Object.create(null);

  function normalizeDirectives$1 (
    dirs,
    vm
  ) {
    var res = Object.create(null);
    if (!dirs) {
      // $flow-disable-line
      return res
    }
    var i, dir;
    for (i = 0; i < dirs.length; i++) {
      dir = dirs[i];
      if (!dir.modifiers) {
        // $flow-disable-line
        dir.modifiers = emptyModifiers;
      }
      res[getRawDirName(dir)] = dir;
      dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
    }
    // $flow-disable-line
    return res
  }

  function getRawDirName (dir) {
    return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
  }

  function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
    var fn = dir.def && dir.def[hook];
    if (fn) {
      try {
        fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
      } catch (e) {
        handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
      }
    }
  }

  var baseModules = [
    ref,
    directives
  ];

  /*  */

  function updateAttrs (oldVnode, vnode) {
    var opts = vnode.componentOptions;
    if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
      return
    }
    if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
      return
    }
    var key, cur, old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs || {};
    var attrs = vnode.data.attrs || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(attrs.__ob__)) {
      attrs = vnode.data.attrs = extend({}, attrs);
    }

    for (key in attrs) {
      cur = attrs[key];
      old = oldAttrs[key];
      if (old !== cur) {
        setAttr(elm, key, cur);
      }
    }
    // #4391: in IE9, setting type can reset value for input[type=radio]
    // #6666: IE/Edge forces progress value down to 1 before setting a max
    /* istanbul ignore if */
    if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
      setAttr(elm, 'value', attrs.value);
    }
    for (key in oldAttrs) {
      if (isUndef(attrs[key])) {
        if (isXlink(key)) {
          elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else if (!isEnumeratedAttr(key)) {
          elm.removeAttribute(key);
        }
      }
    }
  }

  function setAttr (el, key, value) {
    if (el.tagName.indexOf('-') > -1) {
      baseSetAttr(el, key, value);
    } else if (isBooleanAttr(key)) {
      // set attribute for blank value
      // e.g. <option disabled>Select one</option>
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        // technically allowfullscreen is a boolean attribute for <iframe>,
        // but Flash expects a value of "true" when used on <embed> tag
        value = key === 'allowfullscreen' && el.tagName === 'EMBED'
          ? 'true'
          : key;
        el.setAttribute(key, value);
      }
    } else if (isEnumeratedAttr(key)) {
      el.setAttribute(key, convertEnumeratedValue(key, value));
    } else if (isXlink(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      baseSetAttr(el, key, value);
    }
  }

  function baseSetAttr (el, key, value) {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && value !== '' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }

  var attrs = {
    create: updateAttrs,
    update: updateAttrs
  };

  /*  */

  function updateClass (oldVnode, vnode) {
    var el = vnode.elm;
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (
      isUndef(data.staticClass) &&
      isUndef(data.class) && (
        isUndef(oldData) || (
          isUndef(oldData.staticClass) &&
          isUndef(oldData.class)
        )
      )
    ) {
      return
    }

    var cls = genClassForVnode(vnode);

    // handle transition classes
    var transitionClass = el._transitionClasses;
    if (isDef(transitionClass)) {
      cls = concat(cls, stringifyClass(transitionClass));
    }

    // set the class
    if (cls !== el._prevClass) {
      el.setAttribute('class', cls);
      el._prevClass = cls;
    }
  }

  var klass = {
    create: updateClass,
    update: updateClass
  };

  /*  */

  var validDivisionCharRE = /[\w).+\-_$\]]/;

  function parseFilters (exp) {
    var inSingle = false;
    var inDouble = false;
    var inTemplateString = false;
    var inRegex = false;
    var curly = 0;
    var square = 0;
    var paren = 0;
    var lastFilterIndex = 0;
    var c, prev, i, expression, filters;

    for (i = 0; i < exp.length; i++) {
      prev = c;
      c = exp.charCodeAt(i);
      if (inSingle) {
        if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
      } else if (inDouble) {
        if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
      } else if (inTemplateString) {
        if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
      } else if (inRegex) {
        if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
      } else if (
        c === 0x7C && // pipe
        exp.charCodeAt(i + 1) !== 0x7C &&
        exp.charCodeAt(i - 1) !== 0x7C &&
        !curly && !square && !paren
      ) {
        if (expression === undefined) {
          // first filter, end of expression
          lastFilterIndex = i + 1;
          expression = exp.slice(0, i).trim();
        } else {
          pushFilter();
        }
      } else {
        switch (c) {
          case 0x22: inDouble = true; break         // "
          case 0x27: inSingle = true; break         // '
          case 0x60: inTemplateString = true; break // `
          case 0x28: paren++; break                 // (
          case 0x29: paren--; break                 // )
          case 0x5B: square++; break                // [
          case 0x5D: square--; break                // ]
          case 0x7B: curly++; break                 // {
          case 0x7D: curly--; break                 // }
        }
        if (c === 0x2f) { // /
          var j = i - 1;
          var p = (void 0);
          // find first non-whitespace prev char
          for (; j >= 0; j--) {
            p = exp.charAt(j);
            if (p !== ' ') { break }
          }
          if (!p || !validDivisionCharRE.test(p)) {
            inRegex = true;
          }
        }
      }
    }

    if (expression === undefined) {
      expression = exp.slice(0, i).trim();
    } else if (lastFilterIndex !== 0) {
      pushFilter();
    }

    function pushFilter () {
      (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
      lastFilterIndex = i + 1;
    }

    if (filters) {
      for (i = 0; i < filters.length; i++) {
        expression = wrapFilter(expression, filters[i]);
      }
    }

    return expression
  }

  function wrapFilter (exp, filter) {
    var i = filter.indexOf('(');
    if (i < 0) {
      // _f: resolveFilter
      return ("_f(\"" + filter + "\")(" + exp + ")")
    } else {
      var name = filter.slice(0, i);
      var args = filter.slice(i + 1);
      return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
    }
  }

  /*  */



  /* eslint-disable no-unused-vars */
  function baseWarn (msg, range) {
    console.error(("[Vue compiler]: " + msg));
  }
  /* eslint-enable no-unused-vars */

  function pluckModuleFunction (
    modules,
    key
  ) {
    return modules
      ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
      : []
  }

  function addProp (el, name, value, range, dynamic) {
    (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
    el.plain = false;
  }

  function addAttr (el, name, value, range, dynamic) {
    var attrs = dynamic
      ? (el.dynamicAttrs || (el.dynamicAttrs = []))
      : (el.attrs || (el.attrs = []));
    attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
    el.plain = false;
  }

  // add a raw attr (use this in preTransforms)
  function addRawAttr (el, name, value, range) {
    el.attrsMap[name] = value;
    el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
  }

  function addDirective (
    el,
    name,
    rawName,
    value,
    arg,
    isDynamicArg,
    modifiers,
    range
  ) {
    (el.directives || (el.directives = [])).push(rangeSetItem({
      name: name,
      rawName: rawName,
      value: value,
      arg: arg,
      isDynamicArg: isDynamicArg,
      modifiers: modifiers
    }, range));
    el.plain = false;
  }

  function prependModifierMarker (symbol, name, dynamic) {
    return dynamic
      ? ("_p(" + name + ",\"" + symbol + "\")")
      : symbol + name // mark the event as captured
  }

  function addHandler (
    el,
    name,
    value,
    modifiers,
    important,
    warn,
    range,
    dynamic
  ) {
    modifiers = modifiers || emptyObject;
    // warn prevent and passive modifier
    /* istanbul ignore if */
    if (
      warn &&
      modifiers.prevent && modifiers.passive
    ) {
      warn(
        'passive and prevent can\'t be used together. ' +
        'Passive handler can\'t prevent default event.',
        range
      );
    }

    // normalize click.right and click.middle since they don't actually fire
    // this is technically browser-specific, but at least for now browsers are
    // the only target envs that have right/middle clicks.
    if (modifiers.right) {
      if (dynamic) {
        name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
      } else if (name === 'click') {
        name = 'contextmenu';
        delete modifiers.right;
      }
    } else if (modifiers.middle) {
      if (dynamic) {
        name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
      } else if (name === 'click') {
        name = 'mouseup';
      }
    }

    // check capture modifier
    if (modifiers.capture) {
      delete modifiers.capture;
      name = prependModifierMarker('!', name, dynamic);
    }
    if (modifiers.once) {
      delete modifiers.once;
      name = prependModifierMarker('~', name, dynamic);
    }
    /* istanbul ignore if */
    if (modifiers.passive) {
      delete modifiers.passive;
      name = prependModifierMarker('&', name, dynamic);
    }

    var events;
    if (modifiers.native) {
      delete modifiers.native;
      events = el.nativeEvents || (el.nativeEvents = {});
    } else {
      events = el.events || (el.events = {});
    }

    var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
    if (modifiers !== emptyObject) {
      newHandler.modifiers = modifiers;
    }

    var handlers = events[name];
    /* istanbul ignore if */
    if (Array.isArray(handlers)) {
      important ? handlers.unshift(newHandler) : handlers.push(newHandler);
    } else if (handlers) {
      events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
    } else {
      events[name] = newHandler;
    }

    el.plain = false;
  }

  function getRawBindingAttr (
    el,
    name
  ) {
    return el.rawAttrsMap[':' + name] ||
      el.rawAttrsMap['v-bind:' + name] ||
      el.rawAttrsMap[name]
  }

  function getBindingAttr (
    el,
    name,
    getStatic
  ) {
    var dynamicValue =
      getAndRemoveAttr(el, ':' + name) ||
      getAndRemoveAttr(el, 'v-bind:' + name);
    if (dynamicValue != null) {
      return parseFilters(dynamicValue)
    } else if (getStatic !== false) {
      var staticValue = getAndRemoveAttr(el, name);
      if (staticValue != null) {
        return JSON.stringify(staticValue)
      }
    }
  }

  // note: this only removes the attr from the Array (attrsList) so that it
  // doesn't get processed by processAttrs.
  // By default it does NOT remove it from the map (attrsMap) because the map is
  // needed during codegen.
  function getAndRemoveAttr (
    el,
    name,
    removeFromMap
  ) {
    var val;
    if ((val = el.attrsMap[name]) != null) {
      var list = el.attrsList;
      for (var i = 0, l = list.length; i < l; i++) {
        if (list[i].name === name) {
          list.splice(i, 1);
          break
        }
      }
    }
    if (removeFromMap) {
      delete el.attrsMap[name];
    }
    return val
  }

  function getAndRemoveAttrByRegex (
    el,
    name
  ) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      var attr = list[i];
      if (name.test(attr.name)) {
        list.splice(i, 1);
        return attr
      }
    }
  }

  function rangeSetItem (
    item,
    range
  ) {
    if (range) {
      if (range.start != null) {
        item.start = range.start;
      }
      if (range.end != null) {
        item.end = range.end;
      }
    }
    return item
  }

  /*  */

  /**
   * Cross-platform code generation for component v-model
   */
  function genComponentModel (
    el,
    value,
    modifiers
  ) {
    var ref = modifiers || {};
    var number = ref.number;
    var trim = ref.trim;

    var baseValueExpression = '$$v';
    var valueExpression = baseValueExpression;
    if (trim) {
      valueExpression =
        "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
    }
    if (number) {
      valueExpression = "_n(" + valueExpression + ")";
    }
    var assignment = genAssignmentCode(value, valueExpression);

    el.model = {
      value: ("(" + value + ")"),
      expression: JSON.stringify(value),
      callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
    };
  }

  /**
   * Cross-platform codegen helper for generating v-model value assignment code.
   */
  function genAssignmentCode (
    value,
    assignment
  ) {
    var res = parseModel(value);
    if (res.key === null) {
      return (value + "=" + assignment)
    } else {
      return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
    }
  }

  /**
   * Parse a v-model expression into a base path and a final key segment.
   * Handles both dot-path and possible square brackets.
   *
   * Possible cases:
   *
   * - test
   * - test[key]
   * - test[test1[key]]
   * - test["a"][key]
   * - xxx.test[a[a].test1[key]]
   * - test.xxx.a["asa"][test1[key]]
   *
   */

  var len, str, chr, index$1, expressionPos, expressionEndPos;



  function parseModel (val) {
    // Fix https://github.com/vuejs/vue/pull/7730
    // allow v-model="obj.val " (trailing whitespace)
    val = val.trim();
    len = val.length;

    if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
      index$1 = val.lastIndexOf('.');
      if (index$1 > -1) {
        return {
          exp: val.slice(0, index$1),
          key: '"' + val.slice(index$1 + 1) + '"'
        }
      } else {
        return {
          exp: val,
          key: null
        }
      }
    }

    str = val;
    index$1 = expressionPos = expressionEndPos = 0;

    while (!eof()) {
      chr = next();
      /* istanbul ignore if */
      if (isStringStart(chr)) {
        parseString(chr);
      } else if (chr === 0x5B) {
        parseBracket(chr);
      }
    }

    return {
      exp: val.slice(0, expressionPos),
      key: val.slice(expressionPos + 1, expressionEndPos)
    }
  }

  function next () {
    return str.charCodeAt(++index$1)
  }

  function eof () {
    return index$1 >= len
  }

  function isStringStart (chr) {
    return chr === 0x22 || chr === 0x27
  }

  function parseBracket (chr) {
    var inBracket = 1;
    expressionPos = index$1;
    while (!eof()) {
      chr = next();
      if (isStringStart(chr)) {
        parseString(chr);
        continue
      }
      if (chr === 0x5B) { inBracket++; }
      if (chr === 0x5D) { inBracket--; }
      if (inBracket === 0) {
        expressionEndPos = index$1;
        break
      }
    }
  }

  function parseString (chr) {
    var stringQuote = chr;
    while (!eof()) {
      chr = next();
      if (chr === stringQuote) {
        break
      }
    }
  }

  /*  */

  var warn$1;

  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
  var RANGE_TOKEN = '__r';
  var CHECKBOX_RADIO_TOKEN = '__c';

  function model (
    el,
    dir,
    _warn
  ) {
    warn$1 = _warn;
    var value = dir.value;
    var modifiers = dir.modifiers;
    var tag = el.tag;
    var type = el.attrsMap.type;

    {
      // inputs with type="file" are read only and setting the input's
      // value will throw an error.
      if (tag === 'input' && type === 'file') {
        warn$1(
          "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
          "File inputs are read only. Use a v-on:change listener instead.",
          el.rawAttrsMap['v-model']
        );
      }
    }

    if (el.component) {
      genComponentModel(el, value, modifiers);
      // component v-model doesn't need extra runtime
      return false
    } else if (tag === 'select') {
      genSelect(el, value, modifiers);
    } else if (tag === 'input' && type === 'checkbox') {
      genCheckboxModel(el, value, modifiers);
    } else if (tag === 'input' && type === 'radio') {
      genRadioModel(el, value, modifiers);
    } else if (tag === 'input' || tag === 'textarea') {
      genDefaultModel(el, value, modifiers);
    } else if (!config.isReservedTag(tag)) {
      genComponentModel(el, value, modifiers);
      // component v-model doesn't need extra runtime
      return false
    } else {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "v-model is not supported on this element type. " +
        'If you are working with contenteditable, it\'s recommended to ' +
        'wrap a library dedicated for that purpose inside a custom component.',
        el.rawAttrsMap['v-model']
      );
    }

    // ensure runtime directive metadata
    return true
  }

  function genCheckboxModel (
    el,
    value,
    modifiers
  ) {
    var number = modifiers && modifiers.number;
    var valueBinding = getBindingAttr(el, 'value') || 'null';
    var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
    var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
    addProp(el, 'checked',
      "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
    );
    addHandler(el, 'change',
      "var $$a=" + value + "," +
          '$$el=$event.target,' +
          "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
      'if(Array.isArray($$a)){' +
        "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
            '$$i=_i($$a,$$v);' +
        "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
        "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
      "}else{" + (genAssignmentCode(value, '$$c')) + "}",
      null, true
    );
  }

  function genRadioModel (
    el,
    value,
    modifiers
  ) {
    var number = modifiers && modifiers.number;
    var valueBinding = getBindingAttr(el, 'value') || 'null';
    valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
    addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
    addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
  }

  function genSelect (
    el,
    value,
    modifiers
  ) {
    var number = modifiers && modifiers.number;
    var selectedVal = "Array.prototype.filter" +
      ".call($event.target.options,function(o){return o.selected})" +
      ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
      "return " + (number ? '_n(val)' : 'val') + "})";

    var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
    var code = "var $$selectedVal = " + selectedVal + ";";
    code = code + " " + (genAssignmentCode(value, assignment));
    addHandler(el, 'change', code, null, true);
  }

  function genDefaultModel (
    el,
    value,
    modifiers
  ) {
    var type = el.attrsMap.type;

    // warn if v-bind:value conflicts with v-model
    // except for inputs with v-bind:type
    {
      var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
      var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
      if (value$1 && !typeBinding) {
        var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
        warn$1(
          binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
          'because the latter already expands to a value binding internally',
          el.rawAttrsMap[binding]
        );
      }
    }

    var ref = modifiers || {};
    var lazy = ref.lazy;
    var number = ref.number;
    var trim = ref.trim;
    var needCompositionGuard = !lazy && type !== 'range';
    var event = lazy
      ? 'change'
      : type === 'range'
        ? RANGE_TOKEN
        : 'input';

    var valueExpression = '$event.target.value';
    if (trim) {
      valueExpression = "$event.target.value.trim()";
    }
    if (number) {
      valueExpression = "_n(" + valueExpression + ")";
    }

    var code = genAssignmentCode(value, valueExpression);
    if (needCompositionGuard) {
      code = "if($event.target.composing)return;" + code;
    }

    addProp(el, 'value', ("(" + value + ")"));
    addHandler(el, event, code, null, true);
    if (trim || number) {
      addHandler(el, 'blur', '$forceUpdate()');
    }
  }

  /*  */

  // normalize v-model event tokens that can only be determined at runtime.
  // it's important to place the event as the first in the array because
  // the whole point is ensuring the v-model callback gets called before
  // user-attached handlers.
  function normalizeEvents (on) {
    /* istanbul ignore if */
    if (isDef(on[RANGE_TOKEN])) {
      // IE input[type=range] only supports `change` event
      var event = isIE ? 'change' : 'input';
      on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
      delete on[RANGE_TOKEN];
    }
    // This was originally intended to fix #4521 but no longer necessary
    // after 2.5. Keeping it for backwards compat with generated code from < 2.4
    /* istanbul ignore if */
    if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
      on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
      delete on[CHECKBOX_RADIO_TOKEN];
    }
  }

  var target$1;

  function createOnceHandler$1 (event, handler, capture) {
    var _target = target$1; // save current target element in closure
    return function onceHandler () {
      var res = handler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, onceHandler, capture, _target);
      }
    }
  }

  // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
  // implementation and does not fire microtasks in between event propagation, so
  // safe to exclude.
  var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

  function add$1 (
    name,
    handler,
    capture,
    passive
  ) {
    // async edge case #6566: inner click event triggers patch, event handler
    // attached to outer element during patch, and triggered again. This
    // happens because browsers fire microtask ticks between event propagation.
    // the solution is simple: we save the timestamp when a handler is attached,
    // and the handler would only fire if the event passed to it was fired
    // AFTER it was attached.
    if (useMicrotaskFix) {
      var attachedTimestamp = currentFlushTimestamp;
      var original = handler;
      handler = original._wrapper = function (e) {
        if (
          // no bubbling, should always fire.
          // this is just a safety net in case event.timeStamp is unreliable in
          // certain weird environments...
          e.target === e.currentTarget ||
          // event is fired after handler attachment
          e.timeStamp >= attachedTimestamp ||
          // bail for environments that have buggy event.timeStamp implementations
          // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
          // #9681 QtWebEngine event.timeStamp is negative value
          e.timeStamp <= 0 ||
          // #9448 bail if event is fired in another document in a multi-page
          // electron/nw.js app, since event.timeStamp will be using a different
          // starting reference
          e.target.ownerDocument !== document
        ) {
          return original.apply(this, arguments)
        }
      };
    }
    target$1.addEventListener(
      name,
      handler,
      supportsPassive
        ? { capture: capture, passive: passive }
        : capture
    );
  }

  function remove$2 (
    name,
    handler,
    capture,
    _target
  ) {
    (_target || target$1).removeEventListener(
      name,
      handler._wrapper || handler,
      capture
    );
  }

  function updateDOMListeners (oldVnode, vnode) {
    if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
      return
    }
    var on = vnode.data.on || {};
    var oldOn = oldVnode.data.on || {};
    target$1 = vnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
    target$1 = undefined;
  }

  var events = {
    create: updateDOMListeners,
    update: updateDOMListeners
  };

  /*  */

  var svgContainer;

  function updateDOMProps (oldVnode, vnode) {
    if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
      return
    }
    var key, cur;
    var elm = vnode.elm;
    var oldProps = oldVnode.data.domProps || {};
    var props = vnode.data.domProps || {};
    // clone observed objects, as the user probably wants to mutate it
    if (isDef(props.__ob__)) {
      props = vnode.data.domProps = extend({}, props);
    }

    for (key in oldProps) {
      if (!(key in props)) {
        elm[key] = '';
      }
    }

    for (key in props) {
      cur = props[key];
      // ignore children if the node has textContent or innerHTML,
      // as these will throw away existing DOM nodes and cause removal errors
      // on subsequent patches (#3360)
      if (key === 'textContent' || key === 'innerHTML') {
        if (vnode.children) { vnode.children.length = 0; }
        if (cur === oldProps[key]) { continue }
        // #6601 work around Chrome version <= 55 bug where single textNode
        // replaced by innerHTML/textContent retains its parentNode property
        if (elm.childNodes.length === 1) {
          elm.removeChild(elm.childNodes[0]);
        }
      }

      if (key === 'value' && elm.tagName !== 'PROGRESS') {
        // store value as _value as well since
        // non-string values will be stringified
        elm._value = cur;
        // avoid resetting cursor position when value is the same
        var strCur = isUndef(cur) ? '' : String(cur);
        if (shouldUpdateValue(elm, strCur)) {
          elm.value = strCur;
        }
      } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
        // IE doesn't support innerHTML for SVG elements
        svgContainer = svgContainer || document.createElement('div');
        svgContainer.innerHTML = "<svg>" + cur + "</svg>";
        var svg = svgContainer.firstChild;
        while (elm.firstChild) {
          elm.removeChild(elm.firstChild);
        }
        while (svg.firstChild) {
          elm.appendChild(svg.firstChild);
        }
      } else if (
        // skip the update if old and new VDOM state is the same.
        // `value` is handled separately because the DOM value may be temporarily
        // out of sync with VDOM state due to focus, composition and modifiers.
        // This  #4521 by skipping the unnecesarry `checked` update.
        cur !== oldProps[key]
      ) {
        // some property updates can throw
        // e.g. `value` on <progress> w/ non-finite value
        try {
          elm[key] = cur;
        } catch (e) {}
      }
    }
  }

  // check platforms/web/util/attrs.js acceptValue


  function shouldUpdateValue (elm, checkVal) {
    return (!elm.composing && (
      elm.tagName === 'OPTION' ||
      isNotInFocusAndDirty(elm, checkVal) ||
      isDirtyWithModifiers(elm, checkVal)
    ))
  }

  function isNotInFocusAndDirty (elm, checkVal) {
    // return true when textbox (.number and .trim) loses focus and its value is
    // not equal to the updated value
    var notInFocus = true;
    // #6157
    // work around IE bug when accessing document.activeElement in an iframe
    try { notInFocus = document.activeElement !== elm; } catch (e) {}
    return notInFocus && elm.value !== checkVal
  }

  function isDirtyWithModifiers (elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers; // injected by v-model runtime
    if (isDef(modifiers)) {
      if (modifiers.number) {
        return toNumber(value) !== toNumber(newVal)
      }
      if (modifiers.trim) {
        return value.trim() !== newVal.trim()
      }
    }
    return value !== newVal
  }

  var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
  };

  /*  */

  var parseStyleText = cached(function (cssText) {
    var res = {};
    var listDelimiter = /;(?![^(]*\))/g;
    var propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function (item) {
      if (item) {
        var tmp = item.split(propertyDelimiter);
        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return res
  });

  // merge static and dynamic style data on the same vnode
  function normalizeStyleData (data) {
    var style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle
      ? extend(data.staticStyle, style)
      : style
  }

  // normalize possible array / string values into Object
  function normalizeStyleBinding (bindingStyle) {
    if (Array.isArray(bindingStyle)) {
      return toObject(bindingStyle)
    }
    if (typeof bindingStyle === 'string') {
      return parseStyleText(bindingStyle)
    }
    return bindingStyle
  }

  /**
   * parent component style should be after child's
   * so that parent component's style could override it
   */
  function getStyle (vnode, checkChild) {
    var res = {};
    var styleData;

    if (checkChild) {
      var childNode = vnode;
      while (childNode.componentInstance) {
        childNode = childNode.componentInstance._vnode;
        if (
          childNode && childNode.data &&
          (styleData = normalizeStyleData(childNode.data))
        ) {
          extend(res, styleData);
        }
      }
    }

    if ((styleData = normalizeStyleData(vnode.data))) {
      extend(res, styleData);
    }

    var parentNode = vnode;
    while ((parentNode = parentNode.parent)) {
      if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
        extend(res, styleData);
      }
    }
    return res
  }

  /*  */

  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function (el, name, val) {
    /* istanbul ignore if */
    if (cssVarRE.test(name)) {
      el.style.setProperty(name, val);
    } else if (importantRE.test(val)) {
      el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
    } else {
      var normalizedName = normalize(name);
      if (Array.isArray(val)) {
        // Support values array created by autoprefixer, e.g.
        // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
        // Set them one by one, and the browser will only set those it can recognize
        for (var i = 0, len = val.length; i < len; i++) {
          el.style[normalizedName] = val[i];
        }
      } else {
        el.style[normalizedName] = val;
      }
    }
  };

  var vendorNames = ['Webkit', 'Moz', 'ms'];

  var emptyStyle;
  var normalize = cached(function (prop) {
    emptyStyle = emptyStyle || document.createElement('div').style;
    prop = camelize(prop);
    if (prop !== 'filter' && (prop in emptyStyle)) {
      return prop
    }
    var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < vendorNames.length; i++) {
      var name = vendorNames[i] + capName;
      if (name in emptyStyle) {
        return name
      }
    }
  });

  function updateStyle (oldVnode, vnode) {
    var data = vnode.data;
    var oldData = oldVnode.data;

    if (isUndef(data.staticStyle) && isUndef(data.style) &&
      isUndef(oldData.staticStyle) && isUndef(oldData.style)
    ) {
      return
    }

    var cur, name;
    var el = vnode.elm;
    var oldStaticStyle = oldData.staticStyle;
    var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

    // if static style exists, stylebinding already merged into it when doing normalizeStyleData
    var oldStyle = oldStaticStyle || oldStyleBinding;

    var style = normalizeStyleBinding(vnode.data.style) || {};

    // store normalized style under a different key for next diff
    // make sure to clone it if it's reactive, since the user likely wants
    // to mutate it.
    vnode.data.normalizedStyle = isDef(style.__ob__)
      ? extend({}, style)
      : style;

    var newStyle = getStyle(vnode, true);

    for (name in oldStyle) {
      if (isUndef(newStyle[name])) {
        setProp(el, name, '');
      }
    }
    for (name in newStyle) {
      cur = newStyle[name];
      if (cur !== oldStyle[name]) {
        // ie9 setting to null has no effect, must use empty string
        setProp(el, name, cur == null ? '' : cur);
      }
    }
  }

  var style = {
    create: updateStyle,
    update: updateStyle
  };

  /*  */

  var whitespaceRE = /\s+/;

  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function addClass (el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
      } else {
        el.classList.add(cls);
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      if (cur.indexOf(' ' + cls + ' ') < 0) {
        el.setAttribute('class', (cur + cls).trim());
      }
    }
  }

  /**
   * Remove class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function removeClass (el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return
    }

    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
      } else {
        el.classList.remove(cls);
      }
      if (!el.classList.length) {
        el.removeAttribute('class');
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      var tar = ' ' + cls + ' ';
      while (cur.indexOf(tar) >= 0) {
        cur = cur.replace(tar, ' ');
      }
      cur = cur.trim();
      if (cur) {
        el.setAttribute('class', cur);
      } else {
        el.removeAttribute('class');
      }
    }
  }

  /*  */

  function resolveTransition (def$$1) {
    if (!def$$1) {
      return
    }
    /* istanbul ignore else */
    if (typeof def$$1 === 'object') {
      var res = {};
      if (def$$1.css !== false) {
        extend(res, autoCssTransition(def$$1.name || 'v'));
      }
      extend(res, def$$1);
      return res
    } else if (typeof def$$1 === 'string') {
      return autoCssTransition(def$$1)
    }
  }

  var autoCssTransition = cached(function (name) {
    return {
      enterClass: (name + "-enter"),
      enterToClass: (name + "-enter-to"),
      enterActiveClass: (name + "-enter-active"),
      leaveClass: (name + "-leave"),
      leaveToClass: (name + "-leave-to"),
      leaveActiveClass: (name + "-leave-active")
    }
  });

  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = 'transition';
  var ANIMATION = 'animation';

  // Transition property/event sniffing
  var transitionProp = 'transition';
  var transitionEndEvent = 'transitionend';
  var animationProp = 'animation';
  var animationEndEvent = 'animationend';
  if (hasTransition) {
    /* istanbul ignore if */
    if (window.ontransitionend === undefined &&
      window.onwebkittransitionend !== undefined
    ) {
      transitionProp = 'WebkitTransition';
      transitionEndEvent = 'webkitTransitionEnd';
    }
    if (window.onanimationend === undefined &&
      window.onwebkitanimationend !== undefined
    ) {
      animationProp = 'WebkitAnimation';
      animationEndEvent = 'webkitAnimationEnd';
    }
  }

  // binding to window is necessary to make hot reload work in IE in strict mode
  var raf = inBrowser
    ? window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : setTimeout
    : /* istanbul ignore next */ function (fn) { return fn(); };

  function nextFrame (fn) {
    raf(function () {
      raf(fn);
    });
  }

  function addTransitionClass (el, cls) {
    var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
    if (transitionClasses.indexOf(cls) < 0) {
      transitionClasses.push(cls);
      addClass(el, cls);
    }
  }

  function removeTransitionClass (el, cls) {
    if (el._transitionClasses) {
      remove(el._transitionClasses, cls);
    }
    removeClass(el, cls);
  }

  function whenTransitionEnds (
    el,
    expectedType,
    cb
  ) {
    var ref = getTransitionInfo(el, expectedType);
    var type = ref.type;
    var timeout = ref.timeout;
    var propCount = ref.propCount;
    if (!type) { return cb() }
    var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
    var ended = 0;
    var end = function () {
      el.removeEventListener(event, onEnd);
      cb();
    };
    var onEnd = function (e) {
      if (e.target === el) {
        if (++ended >= propCount) {
          end();
        }
      }
    };
    setTimeout(function () {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
  }

  var transformRE = /\b(transform|all)(,|$)/;

  function getTransitionInfo (el, expectedType) {
    var styles = window.getComputedStyle(el);
    // JSDOM may return undefined for transition properties
    var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
    var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
    var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
    var animationTimeout = getTimeout(animationDelays, animationDurations);

    var type;
    var timeout = 0;
    var propCount = 0;
    /* istanbul ignore if */
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0
        ? transitionTimeout > animationTimeout
          ? TRANSITION
          : ANIMATION
        : null;
      propCount = type
        ? type === TRANSITION
          ? transitionDurations.length
          : animationDurations.length
        : 0;
    }
    var hasTransform =
      type === TRANSITION &&
      transformRE.test(styles[transitionProp + 'Property']);
    return {
      type: type,
      timeout: timeout,
      propCount: propCount,
      hasTransform: hasTransform
    }
  }

  function getTimeout (delays, durations) {
    /* istanbul ignore next */
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }

    return Math.max.apply(null, durations.map(function (d, i) {
      return toMs(d) + toMs(delays[i])
    }))
  }

  // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
  // in a locale-dependent way, using a comma instead of a dot.
  // If comma is not replaced with a dot, the input will be rounded down (i.e. acting
  // as a floor function) causing unexpected behaviors
  function toMs (s) {
    return Number(s.slice(0, -1).replace(',', '.')) * 1000
  }

  /*  */

  function enter (vnode, toggleDisplay) {
    var el = vnode.elm;

    // call leave callback now
    if (isDef(el._leaveCb)) {
      el._leaveCb.cancelled = true;
      el._leaveCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data)) {
      return
    }

    /* istanbul ignore if */
    if (isDef(el._enterCb) || el.nodeType !== 1) {
      return
    }

    var css = data.css;
    var type = data.type;
    var enterClass = data.enterClass;
    var enterToClass = data.enterToClass;
    var enterActiveClass = data.enterActiveClass;
    var appearClass = data.appearClass;
    var appearToClass = data.appearToClass;
    var appearActiveClass = data.appearActiveClass;
    var beforeEnter = data.beforeEnter;
    var enter = data.enter;
    var afterEnter = data.afterEnter;
    var enterCancelled = data.enterCancelled;
    var beforeAppear = data.beforeAppear;
    var appear = data.appear;
    var afterAppear = data.afterAppear;
    var appearCancelled = data.appearCancelled;
    var duration = data.duration;

    // activeInstance will always be the <transition> component managing this
    // transition. One edge case to check is when the <transition> is placed
    // as the root node of a child component. In that case we need to check
    // <transition>'s parent for appear check.
    var context = activeInstance;
    var transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
      context = transitionNode.context;
      transitionNode = transitionNode.parent;
    }

    var isAppear = !context._isMounted || !vnode.isRootInsert;

    if (isAppear && !appear && appear !== '') {
      return
    }

    var startClass = isAppear && appearClass
      ? appearClass
      : enterClass;
    var activeClass = isAppear && appearActiveClass
      ? appearActiveClass
      : enterActiveClass;
    var toClass = isAppear && appearToClass
      ? appearToClass
      : enterToClass;

    var beforeEnterHook = isAppear
      ? (beforeAppear || beforeEnter)
      : beforeEnter;
    var enterHook = isAppear
      ? (typeof appear === 'function' ? appear : enter)
      : enter;
    var afterEnterHook = isAppear
      ? (afterAppear || afterEnter)
      : afterEnter;
    var enterCancelledHook = isAppear
      ? (appearCancelled || enterCancelled)
      : enterCancelled;

    var explicitEnterDuration = toNumber(
      isObject(duration)
        ? duration.enter
        : duration
    );

    if (explicitEnterDuration != null) {
      checkDuration(explicitEnterDuration, 'enter', vnode);
    }

    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(enterHook);

    var cb = el._enterCb = once(function () {
      if (expectsCSS) {
        removeTransitionClass(el, toClass);
        removeTransitionClass(el, activeClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, startClass);
        }
        enterCancelledHook && enterCancelledHook(el);
      } else {
        afterEnterHook && afterEnterHook(el);
      }
      el._enterCb = null;
    });

    if (!vnode.data.show) {
      // remove pending leave element on enter by injecting an insert hook
      mergeVNodeHook(vnode, 'insert', function () {
        var parent = el.parentNode;
        var pendingNode = parent && parent._pending && parent._pending[vnode.key];
        if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb
        ) {
          pendingNode.elm._leaveCb();
        }
        enterHook && enterHook(el, cb);
      });
    }

    // start enter transition
    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
      addTransitionClass(el, startClass);
      addTransitionClass(el, activeClass);
      nextFrame(function () {
        removeTransitionClass(el, startClass);
        if (!cb.cancelled) {
          addTransitionClass(el, toClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitEnterDuration)) {
              setTimeout(cb, explicitEnterDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    if (vnode.data.show) {
      toggleDisplay && toggleDisplay();
      enterHook && enterHook(el, cb);
    }

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }

  function leave (vnode, rm) {
    var el = vnode.elm;

    // call enter callback now
    if (isDef(el._enterCb)) {
      el._enterCb.cancelled = true;
      el._enterCb();
    }

    var data = resolveTransition(vnode.data.transition);
    if (isUndef(data) || el.nodeType !== 1) {
      return rm()
    }

    /* istanbul ignore if */
    if (isDef(el._leaveCb)) {
      return
    }

    var css = data.css;
    var type = data.type;
    var leaveClass = data.leaveClass;
    var leaveToClass = data.leaveToClass;
    var leaveActiveClass = data.leaveActiveClass;
    var beforeLeave = data.beforeLeave;
    var leave = data.leave;
    var afterLeave = data.afterLeave;
    var leaveCancelled = data.leaveCancelled;
    var delayLeave = data.delayLeave;
    var duration = data.duration;

    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(leave);

    var explicitLeaveDuration = toNumber(
      isObject(duration)
        ? duration.leave
        : duration
    );

    if (isDef(explicitLeaveDuration)) {
      checkDuration(explicitLeaveDuration, 'leave', vnode);
    }

    var cb = el._leaveCb = once(function () {
      if (el.parentNode && el.parentNode._pending) {
        el.parentNode._pending[vnode.key] = null;
      }
      if (expectsCSS) {
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, leaveClass);
        }
        leaveCancelled && leaveCancelled(el);
      } else {
        rm();
        afterLeave && afterLeave(el);
      }
      el._leaveCb = null;
    });

    if (delayLeave) {
      delayLeave(performLeave);
    } else {
      performLeave();
    }

    function performLeave () {
      // the delayed leave may have already been cancelled
      if (cb.cancelled) {
        return
      }
      // record leaving element
      if (!vnode.data.show && el.parentNode) {
        (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
      }
      beforeLeave && beforeLeave(el);
      if (expectsCSS) {
        addTransitionClass(el, leaveClass);
        addTransitionClass(el, leaveActiveClass);
        nextFrame(function () {
          removeTransitionClass(el, leaveClass);
          if (!cb.cancelled) {
            addTransitionClass(el, leaveToClass);
            if (!userWantsControl) {
              if (isValidDuration(explicitLeaveDuration)) {
                setTimeout(cb, explicitLeaveDuration);
              } else {
                whenTransitionEnds(el, type, cb);
              }
            }
          }
        });
      }
      leave && leave(el, cb);
      if (!expectsCSS && !userWantsControl) {
        cb();
      }
    }
  }

  // only used in dev mode
  function checkDuration (val, name, vnode) {
    if (typeof val !== 'number') {
      warn(
        "<transition> explicit " + name + " duration is not a valid number - " +
        "got " + (JSON.stringify(val)) + ".",
        vnode.context
      );
    } else if (isNaN(val)) {
      warn(
        "<transition> explicit " + name + " duration is NaN - " +
        'the duration expression might be incorrect.',
        vnode.context
      );
    }
  }

  function isValidDuration (val) {
    return typeof val === 'number' && !isNaN(val)
  }

  /**
   * Normalize a transition hook's argument length. The hook may be:
   * - a merged hook (invoker) with the original in .fns
   * - a wrapped component method (check ._length)
   * - a plain function (.length)
   */
  function getHookArgumentsLength (fn) {
    if (isUndef(fn)) {
      return false
    }
    var invokerFns = fn.fns;
    if (isDef(invokerFns)) {
      // invoker
      return getHookArgumentsLength(
        Array.isArray(invokerFns)
          ? invokerFns[0]
          : invokerFns
      )
    } else {
      return (fn._length || fn.length) > 1
    }
  }

  function _enter (_, vnode) {
    if (vnode.data.show !== true) {
      enter(vnode);
    }
  }

  var transition = inBrowser ? {
    create: _enter,
    activate: _enter,
    remove: function remove$$1 (vnode, rm) {
      /* istanbul ignore else */
      if (vnode.data.show !== true) {
        leave(vnode, rm);
      } else {
        rm();
      }
    }
  } : {};

  var platformModules = [
    attrs,
    klass,
    events,
    domProps,
    style,
    transition
  ];

  /*  */

  // the directive module should be applied last, after all
  // built-in modules have been applied.
  var modules = platformModules.concat(baseModules);

  var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

  /**
   * Not type checking this file because flow doesn't like attaching
   * properties to Elements.
   */

  /* istanbul ignore if */
  if (isIE9) {
    // http://www.matts411.com/post/internet-explorer-9-oninput/
    document.addEventListener('selectionchange', function () {
      var el = document.activeElement;
      if (el && el.vmodel) {
        trigger(el, 'input');
      }
    });
  }

  var directive = {
    inserted: function inserted (el, binding, vnode, oldVnode) {
      if (vnode.tag === 'select') {
        // #6903
        if (oldVnode.elm && !oldVnode.elm._vOptions) {
          mergeVNodeHook(vnode, 'postpatch', function () {
            directive.componentUpdated(el, binding, vnode);
          });
        } else {
          setSelected(el, binding, vnode.context);
        }
        el._vOptions = [].map.call(el.options, getValue);
      } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
        el._vModifiers = binding.modifiers;
        if (!binding.modifiers.lazy) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
          // Safari < 10.2 & UIWebView doesn't fire compositionend when
          // switching focus before confirming composition choice
          // this also fixes the issue where some browsers e.g. iOS Chrome
          // fires "change" instead of "input" on autocomplete.
          el.addEventListener('change', onCompositionEnd);
          /* istanbul ignore if */
          if (isIE9) {
            el.vmodel = true;
          }
        }
      }
    },

    componentUpdated: function componentUpdated (el, binding, vnode) {
      if (vnode.tag === 'select') {
        setSelected(el, binding, vnode.context);
        // in case the options rendered by v-for have changed,
        // it's possible that the value is out-of-sync with the rendered options.
        // detect such cases and filter out values that no longer has a matching
        // option in the DOM.
        var prevOptions = el._vOptions;
        var curOptions = el._vOptions = [].map.call(el.options, getValue);
        if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
          // trigger change event if
          // no matching option found for at least one value
          var needReset = el.multiple
            ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
            : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
          if (needReset) {
            trigger(el, 'change');
          }
        }
      }
    }
  };

  function setSelected (el, binding, vm) {
    actuallySetSelected(el, binding, vm);
    /* istanbul ignore if */
    if (isIE || isEdge) {
      setTimeout(function () {
        actuallySetSelected(el, binding, vm);
      }, 0);
    }
  }

  function actuallySetSelected (el, binding, vm) {
    var value = binding.value;
    var isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
      warn(
        "<select multiple v-model=\"" + (binding.expression) + "\"> " +
        "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
        vm
      );
      return
    }
    var selected, option;
    for (var i = 0, l = el.options.length; i < l; i++) {
      option = el.options[i];
      if (isMultiple) {
        selected = looseIndexOf(value, getValue(option)) > -1;
        if (option.selected !== selected) {
          option.selected = selected;
        }
      } else {
        if (looseEqual(getValue(option), value)) {
          if (el.selectedIndex !== i) {
            el.selectedIndex = i;
          }
          return
        }
      }
    }
    if (!isMultiple) {
      el.selectedIndex = -1;
    }
  }

  function hasNoMatchingOption (value, options) {
    return options.every(function (o) { return !looseEqual(o, value); })
  }

  function getValue (option) {
    return '_value' in option
      ? option._value
      : option.value
  }

  function onCompositionStart (e) {
    e.target.composing = true;
  }

  function onCompositionEnd (e) {
    // prevent triggering an input event for no reason
    if (!e.target.composing) { return }
    e.target.composing = false;
    trigger(e.target, 'input');
  }

  function trigger (el, type) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  }

  /*  */

  // recursively search for possible transition defined inside the component root
  function locateNode (vnode) {
    return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
      ? locateNode(vnode.componentInstance._vnode)
      : vnode
  }

  var show = {
    bind: function bind (el, ref, vnode) {
      var value = ref.value;

      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      var originalDisplay = el.__vOriginalDisplay =
        el.style.display === 'none' ? '' : el.style.display;
      if (value && transition$$1) {
        vnode.data.show = true;
        enter(vnode, function () {
          el.style.display = originalDisplay;
        });
      } else {
        el.style.display = value ? originalDisplay : 'none';
      }
    },

    update: function update (el, ref, vnode) {
      var value = ref.value;
      var oldValue = ref.oldValue;

      /* istanbul ignore if */
      if (!value === !oldValue) { return }
      vnode = locateNode(vnode);
      var transition$$1 = vnode.data && vnode.data.transition;
      if (transition$$1) {
        vnode.data.show = true;
        if (value) {
          enter(vnode, function () {
            el.style.display = el.__vOriginalDisplay;
          });
        } else {
          leave(vnode, function () {
            el.style.display = 'none';
          });
        }
      } else {
        el.style.display = value ? el.__vOriginalDisplay : 'none';
      }
    },

    unbind: function unbind (
      el,
      binding,
      vnode,
      oldVnode,
      isDestroy
    ) {
      if (!isDestroy) {
        el.style.display = el.__vOriginalDisplay;
      }
    }
  };

  var platformDirectives = {
    model: directive,
    show: show
  };

  /*  */

  var transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
  };

  // in case the child is also an abstract component, e.g. <keep-alive>
  // we want to recursively retrieve the real component to be rendered
  function getRealChild (vnode) {
    var compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
      return getRealChild(getFirstComponentChild(compOptions.children))
    } else {
      return vnode
    }
  }

  function extractTransitionData (comp) {
    var data = {};
    var options = comp.$options;
    // props
    for (var key in options.propsData) {
      data[key] = comp[key];
    }
    // events.
    // extract listeners and pass them directly to the transition methods
    var listeners = options._parentListeners;
    for (var key$1 in listeners) {
      data[camelize(key$1)] = listeners[key$1];
    }
    return data
  }

  function placeholder (h, rawChild) {
    if (/\d-keep-alive$/.test(rawChild.tag)) {
      return h('keep-alive', {
        props: rawChild.componentOptions.propsData
      })
    }
  }

  function hasParentTransition (vnode) {
    while ((vnode = vnode.parent)) {
      if (vnode.data.transition) {
        return true
      }
    }
  }

  function isSameChild (child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag
  }

  var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

  var isVShowDirective = function (d) { return d.name === 'show'; };

  var Transition = {
    name: 'transition',
    props: transitionProps,
    abstract: true,

    render: function render (h) {
      var this$1 = this;

      var children = this.$slots.default;
      if (!children) {
        return
      }

      // filter out text nodes (possible whitespaces)
      children = children.filter(isNotTextNode);
      /* istanbul ignore if */
      if (!children.length) {
        return
      }

      // warn multiple elements
      if (children.length > 1) {
        warn(
          '<transition> can only be used on a single element. Use ' +
          '<transition-group> for lists.',
          this.$parent
        );
      }

      var mode = this.mode;

      // warn invalid mode
      if (mode && mode !== 'in-out' && mode !== 'out-in'
      ) {
        warn(
          'invalid <transition> mode: ' + mode,
          this.$parent
        );
      }

      var rawChild = children[0];

      // if this is a component root node and the component's
      // parent container node also has transition, skip.
      if (hasParentTransition(this.$vnode)) {
        return rawChild
      }

      // apply transition data to child
      // use getRealChild() to ignore abstract components e.g. keep-alive
      var child = getRealChild(rawChild);
      /* istanbul ignore if */
      if (!child) {
        return rawChild
      }

      if (this._leaving) {
        return placeholder(h, rawChild)
      }

      // ensure a key that is unique to the vnode type and to this transition
      // component instance. This key will be used to remove pending leaving nodes
      // during entering.
      var id = "__transition-" + (this._uid) + "-";
      child.key = child.key == null
        ? child.isComment
          ? id + 'comment'
          : id + child.tag
        : isPrimitive(child.key)
          ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
          : child.key;

      var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
      var oldRawChild = this._vnode;
      var oldChild = getRealChild(oldRawChild);

      // mark v-show
      // so that the transition module can hand over the control to the directive
      if (child.data.directives && child.data.directives.some(isVShowDirective)) {
        child.data.show = true;
      }

      if (
        oldChild &&
        oldChild.data &&
        !isSameChild(child, oldChild) &&
        !isAsyncPlaceholder(oldChild) &&
        // #6687 component root is a comment node
        !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
      ) {
        // replace old child transition data with fresh one
        // important for dynamic transitions!
        var oldData = oldChild.data.transition = extend({}, data);
        // handle transition mode
        if (mode === 'out-in') {
          // return placeholder node and queue update when leave finishes
          this._leaving = true;
          mergeVNodeHook(oldData, 'afterLeave', function () {
            this$1._leaving = false;
            this$1.$forceUpdate();
          });
          return placeholder(h, rawChild)
        } else if (mode === 'in-out') {
          if (isAsyncPlaceholder(child)) {
            return oldRawChild
          }
          var delayedLeave;
          var performLeave = function () { delayedLeave(); };
          mergeVNodeHook(data, 'afterEnter', performLeave);
          mergeVNodeHook(data, 'enterCancelled', performLeave);
          mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
        }
      }

      return rawChild
    }
  };

  /*  */

  var props = extend({
    tag: String,
    moveClass: String
  }, transitionProps);

  delete props.mode;

  var TransitionGroup = {
    props: props,

    beforeMount: function beforeMount () {
      var this$1 = this;

      var update = this._update;
      this._update = function (vnode, hydrating) {
        var restoreActiveInstance = setActiveInstance(this$1);
        // force removing pass
        this$1.__patch__(
          this$1._vnode,
          this$1.kept,
          false, // hydrating
          true // removeOnly (!important, avoids unnecessary moves)
        );
        this$1._vnode = this$1.kept;
        restoreActiveInstance();
        update.call(this$1, vnode, hydrating);
      };
    },

    render: function render (h) {
      var tag = this.tag || this.$vnode.data.tag || 'span';
      var map = Object.create(null);
      var prevChildren = this.prevChildren = this.children;
      var rawChildren = this.$slots.default || [];
      var children = this.children = [];
      var transitionData = extractTransitionData(this);

      for (var i = 0; i < rawChildren.length; i++) {
        var c = rawChildren[i];
        if (c.tag) {
          if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
            children.push(c);
            map[c.key] = c
            ;(c.data || (c.data = {})).transition = transitionData;
          } else {
            var opts = c.componentOptions;
            var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
            warn(("<transition-group> children must be keyed: <" + name + ">"));
          }
        }
      }

      if (prevChildren) {
        var kept = [];
        var removed = [];
        for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
          var c$1 = prevChildren[i$1];
          c$1.data.transition = transitionData;
          c$1.data.pos = c$1.elm.getBoundingClientRect();
          if (map[c$1.key]) {
            kept.push(c$1);
          } else {
            removed.push(c$1);
          }
        }
        this.kept = h(tag, null, kept);
        this.removed = removed;
      }

      return h(tag, null, children)
    },

    updated: function updated () {
      var children = this.prevChildren;
      var moveClass = this.moveClass || ((this.name || 'v') + '-move');
      if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
        return
      }

      // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.
      children.forEach(callPendingCbs);
      children.forEach(recordPosition);
      children.forEach(applyTranslation);

      // force reflow to put everything in position
      // assign to this to avoid being removed in tree-shaking
      // $flow-disable-line
      this._reflow = document.body.offsetHeight;

      children.forEach(function (c) {
        if (c.data.moved) {
          var el = c.elm;
          var s = el.style;
          addTransitionClass(el, moveClass);
          s.transform = s.WebkitTransform = s.transitionDuration = '';
          el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
            if (e && e.target !== el) {
              return
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener(transitionEndEvent, cb);
              el._moveCb = null;
              removeTransitionClass(el, moveClass);
            }
          });
        }
      });
    },

    methods: {
      hasMove: function hasMove (el, moveClass) {
        /* istanbul ignore if */
        if (!hasTransition) {
          return false
        }
        /* istanbul ignore if */
        if (this._hasMove) {
          return this._hasMove
        }
        // Detect whether an element with the move class applied has
        // CSS transitions. Since the element may be inside an entering
        // transition at this very moment, we make a clone of it and remove
        // all other transition classes applied to ensure only the move class
        // is applied.
        var clone = el.cloneNode();
        if (el._transitionClasses) {
          el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
        }
        addClass(clone, moveClass);
        clone.style.display = 'none';
        this.$el.appendChild(clone);
        var info = getTransitionInfo(clone);
        this.$el.removeChild(clone);
        return (this._hasMove = info.hasTransform)
      }
    }
  };

  function callPendingCbs (c) {
    /* istanbul ignore if */
    if (c.elm._moveCb) {
      c.elm._moveCb();
    }
    /* istanbul ignore if */
    if (c.elm._enterCb) {
      c.elm._enterCb();
    }
  }

  function recordPosition (c) {
    c.data.newPos = c.elm.getBoundingClientRect();
  }

  function applyTranslation (c) {
    var oldPos = c.data.pos;
    var newPos = c.data.newPos;
    var dx = oldPos.left - newPos.left;
    var dy = oldPos.top - newPos.top;
    if (dx || dy) {
      c.data.moved = true;
      var s = c.elm.style;
      s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
      s.transitionDuration = '0s';
    }
  }

  var platformComponents = {
    Transition: Transition,
    TransitionGroup: TransitionGroup
  };

  /*  */

  // install platform specific utils
  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;

  // install platform runtime directives & components
  extend(Vue.options.directives, platformDirectives);
  extend(Vue.options.components, platformComponents);

  // install platform patch function
  Vue.prototype.__patch__ = inBrowser ? patch : noop;

  // public mount method
  Vue.prototype.$mount = function (
    el,
    hydrating
  ) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating)
  };

  // devtools global hook
  /* istanbul ignore next */
  if (inBrowser) {
    setTimeout(function () {
      if (config.devtools) {
        if (devtools) {
          devtools.emit('init', Vue);
        } else {
          console[console.info ? 'info' : 'log'](
            'Download the Vue Devtools extension for a better development experience:\n' +
            'https://github.com/vuejs/vue-devtools'
          );
        }
      }
      if (config.productionTip !== false &&
        typeof console !== 'undefined'
      ) {
        console[console.info ? 'info' : 'log'](
          "You are running Vue in development mode.\n" +
          "Make sure to turn on production mode when deploying for production.\n" +
          "See more tips at https://vuejs.org/guide/deployment.html"
        );
      }
    }, 0);
  }

  /*  */

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

  var buildRegex = cached(function (delimiters) {
    var open = delimiters[0].replace(regexEscapeRE, '\\$&');
    var close = delimiters[1].replace(regexEscapeRE, '\\$&');
    return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
  });



  function parseText (
    text,
    delimiters
  ) {
    var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
    if (!tagRE.test(text)) {
      return
    }
    var tokens = [];
    var rawTokens = [];
    var lastIndex = tagRE.lastIndex = 0;
    var match, index, tokenValue;
    while ((match = tagRE.exec(text))) {
      index = match.index;
      // push text token
      if (index > lastIndex) {
        rawTokens.push(tokenValue = text.slice(lastIndex, index));
        tokens.push(JSON.stringify(tokenValue));
      }
      // tag token
      var exp = parseFilters(match[1].trim());
      tokens.push(("_s(" + exp + ")"));
      rawTokens.push({ '@binding': exp });
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      rawTokens.push(tokenValue = text.slice(lastIndex));
      tokens.push(JSON.stringify(tokenValue));
    }
    return {
      expression: tokens.join('+'),
      tokens: rawTokens
    }
  }

  /*  */

  function transformNode (el, options) {
    var warn = options.warn || baseWarn;
    var staticClass = getAndRemoveAttr(el, 'class');
    if (staticClass) {
      var res = parseText(staticClass, options.delimiters);
      if (res) {
        warn(
          "class=\"" + staticClass + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div class="{{ val }}">, use <div :class="val">.',
          el.rawAttrsMap['class']
        );
      }
    }
    if (staticClass) {
      el.staticClass = JSON.stringify(staticClass);
    }
    var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
    if (classBinding) {
      el.classBinding = classBinding;
    }
  }

  function genData (el) {
    var data = '';
    if (el.staticClass) {
      data += "staticClass:" + (el.staticClass) + ",";
    }
    if (el.classBinding) {
      data += "class:" + (el.classBinding) + ",";
    }
    return data
  }

  var klass$1 = {
    staticKeys: ['staticClass'],
    transformNode: transformNode,
    genData: genData
  };

  /*  */

  function transformNode$1 (el, options) {
    var warn = options.warn || baseWarn;
    var staticStyle = getAndRemoveAttr(el, 'style');
    if (staticStyle) {
      /* istanbul ignore if */
      {
        var res = parseText(staticStyle, options.delimiters);
        if (res) {
          warn(
            "style=\"" + staticStyle + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div style="{{ val }}">, use <div :style="val">.',
            el.rawAttrsMap['style']
          );
        }
      }
      el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
    }

    var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
    if (styleBinding) {
      el.styleBinding = styleBinding;
    }
  }

  function genData$1 (el) {
    var data = '';
    if (el.staticStyle) {
      data += "staticStyle:" + (el.staticStyle) + ",";
    }
    if (el.styleBinding) {
      data += "style:(" + (el.styleBinding) + "),";
    }
    return data
  }

  var style$1 = {
    staticKeys: ['staticStyle'],
    transformNode: transformNode$1,
    genData: genData$1
  };

  /*  */

  var decoder;

  var he = {
    decode: function decode (html) {
      decoder = decoder || document.createElement('div');
      decoder.innerHTML = html;
      return decoder.textContent
    }
  };

  /*  */

  var isUnaryTag = makeMap(
    'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
    'link,meta,param,source,track,wbr'
  );

  // Elements that you can, intentionally, leave open
  // (and which close themselves)
  var canBeLeftOpenTag = makeMap(
    'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
  );

  // HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
  // Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
  var isNonPhrasingTag = makeMap(
    'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
    'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
    'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
    'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
    'title,tr,track'
  );

  /**
   * Not type-checking this file because it's mostly vendor code.
   */

  // Regular Expressions for parsing tags and attributes
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
  var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
  var startTagOpen = new RegExp(("^<" + qnameCapture));
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
  var doctype = /^<!DOCTYPE [^>]+>/i;
  // #7298: escape - to avoid being pased as HTML comment when inlined in page
  var comment = /^<!\--/;
  var conditionalComment = /^<!\[/;

  // Special Elements (can contain anything)
  var isPlainTextElement = makeMap('script,style,textarea', true);
  var reCache = {};

  var decodingMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&amp;': '&',
    '&#10;': '\n',
    '&#9;': '\t',
    '&#39;': "'"
  };
  var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
  var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

  // #5992
  var isIgnoreNewlineTag = makeMap('pre,textarea', true);
  var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

  function decodeAttr (value, shouldDecodeNewlines) {
    var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
    return value.replace(re, function (match) { return decodingMap[match]; })
  }

  function parseHTML (html, options) {
    var stack = [];
    var expectHTML = options.expectHTML;
    var isUnaryTag$$1 = options.isUnaryTag || no;
    var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
    var index = 0;
    var last, lastTag;
    while (html) {
      last = html;
      // Make sure we're not in a plaintext content element like script/style
      if (!lastTag || !isPlainTextElement(lastTag)) {
        var textEnd = html.indexOf('<');
        if (textEnd === 0) {
          // Comment:
          if (comment.test(html)) {
            var commentEnd = html.indexOf('-->');

            if (commentEnd >= 0) {
              if (options.shouldKeepComment) {
                options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
              }
              advance(commentEnd + 3);
              continue
            }
          }

          // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
          if (conditionalComment.test(html)) {
            var conditionalEnd = html.indexOf(']>');

            if (conditionalEnd >= 0) {
              advance(conditionalEnd + 2);
              continue
            }
          }

          // Doctype:
          var doctypeMatch = html.match(doctype);
          if (doctypeMatch) {
            advance(doctypeMatch[0].length);
            continue
          }

          // End tag:
          var endTagMatch = html.match(endTag);
          if (endTagMatch) {
            var curIndex = index;
            advance(endTagMatch[0].length);
            parseEndTag(endTagMatch[1], curIndex, index);
            continue
          }

          // Start tag:
          var startTagMatch = parseStartTag();
          if (startTagMatch) {
            handleStartTag(startTagMatch);
            if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
              advance(1);
            }
            continue
          }
        }

        var text = (void 0), rest = (void 0), next = (void 0);
        if (textEnd >= 0) {
          rest = html.slice(textEnd);
          while (
            !endTag.test(rest) &&
            !startTagOpen.test(rest) &&
            !comment.test(rest) &&
            !conditionalComment.test(rest)
          ) {
            // < in plain text, be forgiving and treat it as text
            next = rest.indexOf('<', 1);
            if (next < 0) { break }
            textEnd += next;
            rest = html.slice(textEnd);
          }
          text = html.substring(0, textEnd);
        }

        if (textEnd < 0) {
          text = html;
        }

        if (text) {
          advance(text.length);
        }

        if (options.chars && text) {
          options.chars(text, index - text.length, index);
        }
      } else {
        var endTagLength = 0;
        var stackedTag = lastTag.toLowerCase();
        var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
        var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
          endTagLength = endTag.length;
          if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
            text = text
              .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
              .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
          }
          if (shouldIgnoreFirstNewline(stackedTag, text)) {
            text = text.slice(1);
          }
          if (options.chars) {
            options.chars(text);
          }
          return ''
        });
        index += html.length - rest$1.length;
        html = rest$1;
        parseEndTag(stackedTag, index - endTagLength, index);
      }

      if (html === last) {
        options.chars && options.chars(html);
        if (!stack.length && options.warn) {
          options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
        }
        break
      }
    }

    // Clean up any remaining tags
    parseEndTag();

    function advance (n) {
      index += n;
      html = html.substring(n);
    }

    function parseStartTag () {
      var start = html.match(startTagOpen);
      if (start) {
        var match = {
          tagName: start[1],
          attrs: [],
          start: index
        };
        advance(start[0].length);
        var end, attr;
        while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
          attr.start = index;
          advance(attr[0].length);
          attr.end = index;
          match.attrs.push(attr);
        }
        if (end) {
          match.unarySlash = end[1];
          advance(end[0].length);
          match.end = index;
          return match
        }
      }
    }

    function handleStartTag (match) {
      var tagName = match.tagName;
      var unarySlash = match.unarySlash;

      if (expectHTML) {
        if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
          parseEndTag(lastTag);
        }
        if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
          parseEndTag(tagName);
        }
      }

      var unary = isUnaryTag$$1(tagName) || !!unarySlash;

      var l = match.attrs.length;
      var attrs = new Array(l);
      for (var i = 0; i < l; i++) {
        var args = match.attrs[i];
        var value = args[3] || args[4] || args[5] || '';
        var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
          ? options.shouldDecodeNewlinesForHref
          : options.shouldDecodeNewlines;
        attrs[i] = {
          name: args[1],
          value: decodeAttr(value, shouldDecodeNewlines)
        };
        if (options.outputSourceRange) {
          attrs[i].start = args.start + args[0].match(/^\s*/).length;
          attrs[i].end = args.end;
        }
      }

      if (!unary) {
        stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
        lastTag = tagName;
      }

      if (options.start) {
        options.start(tagName, attrs, unary, match.start, match.end);
      }
    }

    function parseEndTag (tagName, start, end) {
      var pos, lowerCasedTagName;
      if (start == null) { start = index; }
      if (end == null) { end = index; }

      // Find the closest opened tag of the same type
      if (tagName) {
        lowerCasedTagName = tagName.toLowerCase();
        for (pos = stack.length - 1; pos >= 0; pos--) {
          if (stack[pos].lowerCasedTag === lowerCasedTagName) {
            break
          }
        }
      } else {
        // If no tag name is provided, clean shop
        pos = 0;
      }

      if (pos >= 0) {
        // Close all the open elements, up the stack
        for (var i = stack.length - 1; i >= pos; i--) {
          if (i > pos || !tagName &&
            options.warn
          ) {
            options.warn(
              ("tag <" + (stack[i].tag) + "> has no matching end tag."),
              { start: stack[i].start, end: stack[i].end }
            );
          }
          if (options.end) {
            options.end(stack[i].tag, start, end);
          }
        }

        // Remove the open elements from the stack
        stack.length = pos;
        lastTag = pos && stack[pos - 1].tag;
      } else if (lowerCasedTagName === 'br') {
        if (options.start) {
          options.start(tagName, [], true, start, end);
        }
      } else if (lowerCasedTagName === 'p') {
        if (options.start) {
          options.start(tagName, [], false, start, end);
        }
        if (options.end) {
          options.end(tagName, start, end);
        }
      }
    }
  }

  /*  */

  var onRE = /^@|^v-on:/;
  var dirRE = /^v-|^@|^:/;
  var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  var stripParensRE = /^\(|\)$/g;
  var dynamicArgRE = /^\[.*\]$/;

  var argRE = /:(.*)$/;
  var bindRE = /^:|^\.|^v-bind:/;
  var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

  var slotRE = /^v-slot(:|$)|^#/;

  var lineBreakRE = /[\r\n]/;
  var whitespaceRE$1 = /\s+/g;

  var invalidAttributeRE = /[\s"'<>\/=]/;

  var decodeHTMLCached = cached(he.decode);

  var emptySlotScopeToken = "_empty_";

  // configurable state
  var warn$2;
  var delimiters;
  var transforms;
  var preTransforms;
  var postTransforms;
  var platformIsPreTag;
  var platformMustUseProp;
  var platformGetTagNamespace;
  var maybeComponent;

  function createASTElement (
    tag,
    attrs,
    parent
  ) {
    return {
      type: 1,
      tag: tag,
      attrsList: attrs,
      attrsMap: makeAttrsMap(attrs),
      rawAttrsMap: {},
      parent: parent,
      children: []
    }
  }

  /**
   * Convert HTML string to AST.
   */
  function parse (
    template,
    options
  ) {
    warn$2 = options.warn || baseWarn;

    platformIsPreTag = options.isPreTag || no;
    platformMustUseProp = options.mustUseProp || no;
    platformGetTagNamespace = options.getTagNamespace || no;
    var isReservedTag = options.isReservedTag || no;
    maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

    transforms = pluckModuleFunction(options.modules, 'transformNode');
    preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
    postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

    delimiters = options.delimiters;

    var stack = [];
    var preserveWhitespace = options.preserveWhitespace !== false;
    var whitespaceOption = options.whitespace;
    var root;
    var currentParent;
    var inVPre = false;
    var inPre = false;
    var warned = false;

    function warnOnce (msg, range) {
      if (!warned) {
        warned = true;
        warn$2(msg, range);
      }
    }

    function closeElement (element) {
      trimEndingWhitespace(element);
      if (!inVPre && !element.processed) {
        element = processElement(element, options);
      }
      // tree management
      if (!stack.length && element !== root) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          {
            checkRootConstraints(element);
          }
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead.",
            { start: element.start }
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else {
          if (element.slotScope) {
            // scoped slot
            // keep it in the children list so that v-else(-if) conditions can
            // find it as the prev node.
            var name = element.slotTarget || '"default"'
            ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
          }
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }

      // final children cleanup
      // filter out scoped slots
      element.children = element.children.filter(function (c) { return !(c).slotScope; });
      // remove trailing whitespace node again
      trimEndingWhitespace(element);

      // check pre state
      if (element.pre) {
        inVPre = false;
      }
      if (platformIsPreTag(element.tag)) {
        inPre = false;
      }
      // apply post-transforms
      for (var i = 0; i < postTransforms.length; i++) {
        postTransforms[i](element, options);
      }
    }

    function trimEndingWhitespace (el) {
      // remove trailing whitespace node
      if (!inPre) {
        var lastNode;
        while (
          (lastNode = el.children[el.children.length - 1]) &&
          lastNode.type === 3 &&
          lastNode.text === ' '
        ) {
          el.children.pop();
        }
      }
    }

    function checkRootConstraints (el) {
      if (el.tag === 'slot' || el.tag === 'template') {
        warnOnce(
          "Cannot use <" + (el.tag) + "> as component root element because it may " +
          'contain multiple nodes.',
          { start: el.start }
        );
      }
      if (el.attrsMap.hasOwnProperty('v-for')) {
        warnOnce(
          'Cannot use v-for on stateful component root element because ' +
          'it renders multiple elements.',
          el.rawAttrsMap['v-for']
        );
      }
    }

    parseHTML(template, {
      warn: warn$2,
      expectHTML: options.expectHTML,
      isUnaryTag: options.isUnaryTag,
      canBeLeftOpenTag: options.canBeLeftOpenTag,
      shouldDecodeNewlines: options.shouldDecodeNewlines,
      shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
      shouldKeepComment: options.comments,
      outputSourceRange: options.outputSourceRange,
      start: function start (tag, attrs, unary, start$1, end) {
        // check namespace.
        // inherit parent ns if there is one
        var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

        // handle IE svg bug
        /* istanbul ignore if */
        if (isIE && ns === 'svg') {
          attrs = guardIESVGBug(attrs);
        }

        var element = createASTElement(tag, attrs, currentParent);
        if (ns) {
          element.ns = ns;
        }

        {
          if (options.outputSourceRange) {
            element.start = start$1;
            element.end = end;
            element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
              cumulated[attr.name] = attr;
              return cumulated
            }, {});
          }
          attrs.forEach(function (attr) {
            if (invalidAttributeRE.test(attr.name)) {
              warn$2(
                "Invalid dynamic argument expression: attribute names cannot contain " +
                "spaces, quotes, <, >, / or =.",
                {
                  start: attr.start + attr.name.indexOf("["),
                  end: attr.start + attr.name.length
                }
              );
            }
          });
        }

        if (isForbiddenTag(element) && !isServerRendering()) {
          element.forbidden = true;
          warn$2(
            'Templates should only be responsible for mapping the state to the ' +
            'UI. Avoid placing tags with side-effects in your templates, such as ' +
            "<" + tag + ">" + ', as they will not be parsed.',
            { start: element.start }
          );
        }

        // apply pre-transforms
        for (var i = 0; i < preTransforms.length; i++) {
          element = preTransforms[i](element, options) || element;
        }

        if (!inVPre) {
          processPre(element);
          if (element.pre) {
            inVPre = true;
          }
        }
        if (platformIsPreTag(element.tag)) {
          inPre = true;
        }
        if (inVPre) {
          processRawAttrs(element);
        } else if (!element.processed) {
          // structural directives
          processFor(element);
          processIf(element);
          processOnce(element);
        }

        if (!root) {
          root = element;
          {
            checkRootConstraints(root);
          }
        }

        if (!unary) {
          currentParent = element;
          stack.push(element);
        } else {
          closeElement(element);
        }
      },

      end: function end (tag, start, end$1) {
        var element = stack[stack.length - 1];
        // pop stack
        stack.length -= 1;
        currentParent = stack[stack.length - 1];
        if (options.outputSourceRange) {
          element.end = end$1;
        }
        closeElement(element);
      },

      chars: function chars (text, start, end) {
        if (!currentParent) {
          {
            if (text === template) {
              warnOnce(
                'Component template requires a root element, rather than just text.',
                { start: start }
              );
            } else if ((text = text.trim())) {
              warnOnce(
                ("text \"" + text + "\" outside root element will be ignored."),
                { start: start }
              );
            }
          }
          return
        }
        // IE textarea placeholder bug
        /* istanbul ignore if */
        if (isIE &&
          currentParent.tag === 'textarea' &&
          currentParent.attrsMap.placeholder === text
        ) {
          return
        }
        var children = currentParent.children;
        if (inPre || text.trim()) {
          text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
        } else if (!children.length) {
          // remove the whitespace-only node right after an opening tag
          text = '';
        } else if (whitespaceOption) {
          if (whitespaceOption === 'condense') {
            // in condense mode, remove the whitespace node if it contains
            // line break, otherwise condense to a single space
            text = lineBreakRE.test(text) ? '' : ' ';
          } else {
            text = ' ';
          }
        } else {
          text = preserveWhitespace ? ' ' : '';
        }
        if (text) {
          if (!inPre && whitespaceOption === 'condense') {
            // condense consecutive whitespaces into single space
            text = text.replace(whitespaceRE$1, ' ');
          }
          var res;
          var child;
          if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
            child = {
              type: 2,
              expression: res.expression,
              tokens: res.tokens,
              text: text
            };
          } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
            child = {
              type: 3,
              text: text
            };
          }
          if (child) {
            if (options.outputSourceRange) {
              child.start = start;
              child.end = end;
            }
            children.push(child);
          }
        }
      },
      comment: function comment (text, start, end) {
        // adding anyting as a sibling to the root node is forbidden
        // comments should still be allowed, but ignored
        if (currentParent) {
          var child = {
            type: 3,
            text: text,
            isComment: true
          };
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          currentParent.children.push(child);
        }
      }
    });
    return root
  }

  function processPre (el) {
    if (getAndRemoveAttr(el, 'v-pre') != null) {
      el.pre = true;
    }
  }

  function processRawAttrs (el) {
    var list = el.attrsList;
    var len = list.length;
    if (len) {
      var attrs = el.attrs = new Array(len);
      for (var i = 0; i < len; i++) {
        attrs[i] = {
          name: list[i].name,
          value: JSON.stringify(list[i].value)
        };
        if (list[i].start != null) {
          attrs[i].start = list[i].start;
          attrs[i].end = list[i].end;
        }
      }
    } else if (!el.pre) {
      // non root node in pre blocks with no attributes
      el.plain = true;
    }
  }

  function processElement (
    element,
    options
  ) {
    processKey(element);

    // determine whether this is a plain element after
    // removing structural attributes
    element.plain = (
      !element.key &&
      !element.scopedSlots &&
      !element.attrsList.length
    );

    processRef(element);
    processSlotContent(element);
    processSlotOutlet(element);
    processComponent(element);
    for (var i = 0; i < transforms.length; i++) {
      element = transforms[i](element, options) || element;
    }
    processAttrs(element);
    return element
  }

  function processKey (el) {
    var exp = getBindingAttr(el, 'key');
    if (exp) {
      {
        if (el.tag === 'template') {
          warn$2(
            "<template> cannot be keyed. Place the key on real elements instead.",
            getRawBindingAttr(el, 'key')
          );
        }
        if (el.for) {
          var iterator = el.iterator2 || el.iterator1;
          var parent = el.parent;
          if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
            warn$2(
              "Do not use v-for index as key on <transition-group> children, " +
              "this is the same as not using keys.",
              getRawBindingAttr(el, 'key'),
              true /* tip */
            );
          }
        }
      }
      el.key = exp;
    }
  }

  function processRef (el) {
    var ref = getBindingAttr(el, 'ref');
    if (ref) {
      el.ref = ref;
      el.refInFor = checkInFor(el);
    }
  }

  function processFor (el) {
    var exp;
    if ((exp = getAndRemoveAttr(el, 'v-for'))) {
      var res = parseFor(exp);
      if (res) {
        extend(el, res);
      } else {
        warn$2(
          ("Invalid v-for expression: " + exp),
          el.rawAttrsMap['v-for']
        );
      }
    }
  }



  function parseFor (exp) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) { return }
    var res = {};
    res.for = inMatch[2].trim();
    var alias = inMatch[1].trim().replace(stripParensRE, '');
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      res.alias = alias.replace(forIteratorRE, '').trim();
      res.iterator1 = iteratorMatch[1].trim();
      if (iteratorMatch[2]) {
        res.iterator2 = iteratorMatch[2].trim();
      }
    } else {
      res.alias = alias;
    }
    return res
  }

  function processIf (el) {
    var exp = getAndRemoveAttr(el, 'v-if');
    if (exp) {
      el.if = exp;
      addIfCondition(el, {
        exp: exp,
        block: el
      });
    } else {
      if (getAndRemoveAttr(el, 'v-else') != null) {
        el.else = true;
      }
      var elseif = getAndRemoveAttr(el, 'v-else-if');
      if (elseif) {
        el.elseif = elseif;
      }
    }
  }

  function processIfConditions (el, parent) {
    var prev = findPrevElement(parent.children);
    if (prev && prev.if) {
      addIfCondition(prev, {
        exp: el.elseif,
        block: el
      });
    } else {
      warn$2(
        "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
        "used on element <" + (el.tag) + "> without corresponding v-if.",
        el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
      );
    }
  }

  function findPrevElement (children) {
    var i = children.length;
    while (i--) {
      if (children[i].type === 1) {
        return children[i]
      } else {
        if (children[i].text !== ' ') {
          warn$2(
            "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
            "will be ignored.",
            children[i]
          );
        }
        children.pop();
      }
    }
  }

  function addIfCondition (el, condition) {
    if (!el.ifConditions) {
      el.ifConditions = [];
    }
    el.ifConditions.push(condition);
  }

  function processOnce (el) {
    var once$$1 = getAndRemoveAttr(el, 'v-once');
    if (once$$1 != null) {
      el.once = true;
    }
  }

  // handle content being passed to a component as slot,
  // e.g. <template slot="xxx">, <div slot-scope="xxx">
  function processSlotContent (el) {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if (slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          el.rawAttrsMap['scope'],
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if (el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          el.rawAttrsMap['slot-scope'],
          true
        );
      }
      el.slotScope = slotScope;
    }

    // slot="xxx"
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
      }
    }

    // 2.6 v-slot syntax
    {
      if (el.tag === 'template') {
        // v-slot on <template>
        var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
        if (slotBinding) {
          {
            if (el.slotTarget || el.slotScope) {
              warn$2(
                "Unexpected mixed usage of different slot syntaxes.",
                el
              );
            }
            if (el.parent && !maybeComponent(el.parent)) {
              warn$2(
                "<template v-slot> can only appear at the root level inside " +
                "the receiving the component",
                el
              );
            }
          }
          var ref = getSlotName(slotBinding);
          var name = ref.name;
          var dynamic = ref.dynamic;
          el.slotTarget = name;
          el.slotTargetDynamic = dynamic;
          el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
        }
      } else {
        // v-slot on component, denotes default slot
        var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
        if (slotBinding$1) {
          {
            if (!maybeComponent(el)) {
              warn$2(
                "v-slot can only be used on components or <template>.",
                slotBinding$1
              );
            }
            if (el.slotScope || el.slotTarget) {
              warn$2(
                "Unexpected mixed usage of different slot syntaxes.",
                el
              );
            }
            if (el.scopedSlots) {
              warn$2(
                "To avoid scope ambiguity, the default slot should also use " +
                "<template> syntax when there are other named slots.",
                slotBinding$1
              );
            }
          }
          // add the component's children to its default slot
          var slots = el.scopedSlots || (el.scopedSlots = {});
          var ref$1 = getSlotName(slotBinding$1);
          var name$1 = ref$1.name;
          var dynamic$1 = ref$1.dynamic;
          var slotContainer = slots[name$1] = createASTElement('template', [], el);
          slotContainer.slotTarget = name$1;
          slotContainer.slotTargetDynamic = dynamic$1;
          slotContainer.children = el.children.filter(function (c) {
            if (!c.slotScope) {
              c.parent = slotContainer;
              return true
            }
          });
          slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
          // remove children as they are returned from scopedSlots now
          el.children = [];
          // mark el non-plain so data gets generated
          el.plain = false;
        }
      }
    }
  }

  function getSlotName (binding) {
    var name = binding.name.replace(slotRE, '');
    if (!name) {
      if (binding.name[0] !== '#') {
        name = 'default';
      } else {
        warn$2(
          "v-slot shorthand syntax requires a slot name.",
          binding
        );
      }
    }
    return dynamicArgRE.test(name)
      // dynamic [name]
      ? { name: name.slice(1, -1), dynamic: true }
      // static name
      : { name: ("\"" + name + "\""), dynamic: false }
  }

  // handle <slot/> outlets
  function processSlotOutlet (el) {
    if (el.tag === 'slot') {
      el.slotName = getBindingAttr(el, 'name');
      if (el.key) {
        warn$2(
          "`key` does not work on <slot> because slots are abstract outlets " +
          "and can possibly expand into multiple elements. " +
          "Use the key on a wrapping element instead.",
          getRawBindingAttr(el, 'key')
        );
      }
    }
  }

  function processComponent (el) {
    var binding;
    if ((binding = getBindingAttr(el, 'is'))) {
      el.component = binding;
    }
    if (getAndRemoveAttr(el, 'inline-template') != null) {
      el.inlineTemplate = true;
    }
  }

  function processAttrs (el) {
    var list = el.attrsList;
    var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
    for (i = 0, l = list.length; i < l; i++) {
      name = rawName = list[i].name;
      value = list[i].value;
      if (dirRE.test(name)) {
        // mark element as dynamic
        el.hasBindings = true;
        // modifiers
        modifiers = parseModifiers(name.replace(dirRE, ''));
        // support .foo shorthand syntax for the .prop modifier
        if (modifiers) {
          name = name.replace(modifierRE, '');
        }
        if (bindRE.test(name)) { // v-bind
          name = name.replace(bindRE, '');
          value = parseFilters(value);
          isDynamic = dynamicArgRE.test(name);
          if (isDynamic) {
            name = name.slice(1, -1);
          }
          if (
            value.trim().length === 0
          ) {
            warn$2(
              ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
            );
          }
          if (modifiers) {
            if (modifiers.prop && !isDynamic) {
              name = camelize(name);
              if (name === 'innerHtml') { name = 'innerHTML'; }
            }
            if (modifiers.camel && !isDynamic) {
              name = camelize(name);
            }
            if (modifiers.sync) {
              syncGen = genAssignmentCode(value, "$event");
              if (!isDynamic) {
                addHandler(
                  el,
                  ("update:" + (camelize(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
                if (hyphenate(name) !== camelize(name)) {
                  addHandler(
                    el,
                    ("update:" + (hyphenate(name))),
                    syncGen,
                    null,
                    false,
                    warn$2,
                    list[i]
                  );
                }
              } else {
                // handler w/ dynamic event name
                addHandler(
                  el,
                  ("\"update:\"+(" + name + ")"),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i],
                  true // dynamic
                );
              }
            }
          }
          if ((modifiers && modifiers.prop) || (
            !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
          )) {
            addProp(el, name, value, list[i], isDynamic);
          } else {
            addAttr(el, name, value, list[i], isDynamic);
          }
        } else if (onRE.test(name)) { // v-on
          name = name.replace(onRE, '');
          isDynamic = dynamicArgRE.test(name);
          if (isDynamic) {
            name = name.slice(1, -1);
          }
          addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
        } else { // normal directives
          name = name.replace(dirRE, '');
          // parse arg
          var argMatch = name.match(argRE);
          var arg = argMatch && argMatch[1];
          isDynamic = false;
          if (arg) {
            name = name.slice(0, -(arg.length + 1));
            if (dynamicArgRE.test(arg)) {
              arg = arg.slice(1, -1);
              isDynamic = true;
            }
          }
          addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
          if (name === 'model') {
            checkForAliasModel(el, value);
          }
        }
      } else {
        // literal attribute
        {
          var res = parseText(value, delimiters);
          if (res) {
            warn$2(
              name + "=\"" + value + "\": " +
              'Interpolation inside attributes has been removed. ' +
              'Use v-bind or the colon shorthand instead. For example, ' +
              'instead of <div id="{{ val }}">, use <div :id="val">.',
              list[i]
            );
          }
        }
        addAttr(el, name, JSON.stringify(value), list[i]);
        // #6887 firefox doesn't update muted state if set via attribute
        // even immediately after element creation
        if (!el.component &&
            name === 'muted' &&
            platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, 'true', list[i]);
        }
      }
    }
  }

  function checkInFor (el) {
    var parent = el;
    while (parent) {
      if (parent.for !== undefined) {
        return true
      }
      parent = parent.parent;
    }
    return false
  }

  function parseModifiers (name) {
    var match = name.match(modifierRE);
    if (match) {
      var ret = {};
      match.forEach(function (m) { ret[m.slice(1)] = true; });
      return ret
    }
  }

  function makeAttrsMap (attrs) {
    var map = {};
    for (var i = 0, l = attrs.length; i < l; i++) {
      if (
        map[attrs[i].name] && !isIE && !isEdge
      ) {
        warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
      }
      map[attrs[i].name] = attrs[i].value;
    }
    return map
  }

  // for script (e.g. type="x/template") or style, do not decode content
  function isTextTag (el) {
    return el.tag === 'script' || el.tag === 'style'
  }

  function isForbiddenTag (el) {
    return (
      el.tag === 'style' ||
      (el.tag === 'script' && (
        !el.attrsMap.type ||
        el.attrsMap.type === 'text/javascript'
      ))
    )
  }

  var ieNSBug = /^xmlns:NS\d+/;
  var ieNSPrefix = /^NS\d+:/;

  /* istanbul ignore next */
  function guardIESVGBug (attrs) {
    var res = [];
    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];
      if (!ieNSBug.test(attr.name)) {
        attr.name = attr.name.replace(ieNSPrefix, '');
        res.push(attr);
      }
    }
    return res
  }

  function checkForAliasModel (el, value) {
    var _el = el;
    while (_el) {
      if (_el.for && _el.alias === value) {
        warn$2(
          "<" + (el.tag) + " v-model=\"" + value + "\">: " +
          "You are binding v-model directly to a v-for iteration alias. " +
          "This will not be able to modify the v-for source array because " +
          "writing to the alias is like modifying a function local variable. " +
          "Consider using an array of objects and use v-model on an object property instead.",
          el.rawAttrsMap['v-model']
        );
      }
      _el = _el.parent;
    }
  }

  /*  */

  function preTransformNode (el, options) {
    if (el.tag === 'input') {
      var map = el.attrsMap;
      if (!map['v-model']) {
        return
      }

      var typeBinding;
      if (map[':type'] || map['v-bind:type']) {
        typeBinding = getBindingAttr(el, 'type');
      }
      if (!map.type && !typeBinding && map['v-bind']) {
        typeBinding = "(" + (map['v-bind']) + ").type";
      }

      if (typeBinding) {
        var ifCondition = getAndRemoveAttr(el, 'v-if', true);
        var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
        var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
        var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
        // 1. checkbox
        var branch0 = cloneASTElement(el);
        // process for on the main node
        processFor(branch0);
        addRawAttr(branch0, 'type', 'checkbox');
        processElement(branch0, options);
        branch0.processed = true; // prevent it from double-processed
        branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
        addIfCondition(branch0, {
          exp: branch0.if,
          block: branch0
        });
        // 2. add radio else-if condition
        var branch1 = cloneASTElement(el);
        getAndRemoveAttr(branch1, 'v-for', true);
        addRawAttr(branch1, 'type', 'radio');
        processElement(branch1, options);
        addIfCondition(branch0, {
          exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
          block: branch1
        });
        // 3. other
        var branch2 = cloneASTElement(el);
        getAndRemoveAttr(branch2, 'v-for', true);
        addRawAttr(branch2, ':type', typeBinding);
        processElement(branch2, options);
        addIfCondition(branch0, {
          exp: ifCondition,
          block: branch2
        });

        if (hasElse) {
          branch0.else = true;
        } else if (elseIfCondition) {
          branch0.elseif = elseIfCondition;
        }

        return branch0
      }
    }
  }

  function cloneASTElement (el) {
    return createASTElement(el.tag, el.attrsList.slice(), el.parent)
  }

  var model$1 = {
    preTransformNode: preTransformNode
  };

  var modules$1 = [
    klass$1,
    style$1,
    model$1
  ];

  /*  */

  function text (el, dir) {
    if (dir.value) {
      addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
    }
  }

  /*  */

  function html (el, dir) {
    if (dir.value) {
      addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
    }
  }

  var directives$1 = {
    model: model,
    text: text,
    html: html
  };

  /*  */

  var baseOptions = {
    expectHTML: true,
    modules: modules$1,
    directives: directives$1,
    isPreTag: isPreTag,
    isUnaryTag: isUnaryTag,
    mustUseProp: mustUseProp,
    canBeLeftOpenTag: canBeLeftOpenTag,
    isReservedTag: isReservedTag,
    getTagNamespace: getTagNamespace,
    staticKeys: genStaticKeys(modules$1)
  };

  /*  */

  var isStaticKey;
  var isPlatformReservedTag;

  var genStaticKeysCached = cached(genStaticKeys$1);

  /**
   * Goal of the optimizer: walk the generated template AST tree
   * and detect sub-trees that are purely static, i.e. parts of
   * the DOM that never needs to change.
   *
   * Once we detect these sub-trees, we can:
   *
   * 1. Hoist them into constants, so that we no longer need to
   *    create fresh nodes for them on each re-render;
   * 2. Completely skip them in the patching process.
   */
  function optimize (root, options) {
    if (!root) { return }
    isStaticKey = genStaticKeysCached(options.staticKeys || '');
    isPlatformReservedTag = options.isReservedTag || no;
    // first pass: mark all non-static nodes.
    markStatic$1(root);
    // second pass: mark static roots.
    markStaticRoots(root, false);
  }

  function genStaticKeys$1 (keys) {
    return makeMap(
      'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
      (keys ? ',' + keys : '')
    )
  }

  function markStatic$1 (node) {
    node.static = isStatic(node);
    if (node.type === 1) {
      // do not make component slot content static. this avoids
      // 1. components not able to mutate slot nodes
      // 2. static slot content fails for hot-reloading
      if (
        !isPlatformReservedTag(node.tag) &&
        node.tag !== 'slot' &&
        node.attrsMap['inline-template'] == null
      ) {
        return
      }
      for (var i = 0, l = node.children.length; i < l; i++) {
        var child = node.children[i];
        markStatic$1(child);
        if (!child.static) {
          node.static = false;
        }
      }
      if (node.ifConditions) {
        for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
          var block = node.ifConditions[i$1].block;
          markStatic$1(block);
          if (!block.static) {
            node.static = false;
          }
        }
      }
    }
  }

  function markStaticRoots (node, isInFor) {
    if (node.type === 1) {
      if (node.static || node.once) {
        node.staticInFor = isInFor;
      }
      // For a node to qualify as a static root, it should have children that
      // are not just static text. Otherwise the cost of hoisting out will
      // outweigh the benefits and it's better off to just always render it fresh.
      if (node.static && node.children.length && !(
        node.children.length === 1 &&
        node.children[0].type === 3
      )) {
        node.staticRoot = true;
        return
      } else {
        node.staticRoot = false;
      }
      if (node.children) {
        for (var i = 0, l = node.children.length; i < l; i++) {
          markStaticRoots(node.children[i], isInFor || !!node.for);
        }
      }
      if (node.ifConditions) {
        for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
          markStaticRoots(node.ifConditions[i$1].block, isInFor);
        }
      }
    }
  }

  function isStatic (node) {
    if (node.type === 2) { // expression
      return false
    }
    if (node.type === 3) { // text
      return true
    }
    return !!(node.pre || (
      !node.hasBindings && // no dynamic bindings
      !node.if && !node.for && // not v-if or v-for or v-else
      !isBuiltInTag(node.tag) && // not a built-in
      isPlatformReservedTag(node.tag) && // not a component
      !isDirectChildOfTemplateFor(node) &&
      Object.keys(node).every(isStaticKey)
    ))
  }

  function isDirectChildOfTemplateFor (node) {
    while (node.parent) {
      node = node.parent;
      if (node.tag !== 'template') {
        return false
      }
      if (node.for) {
        return true
      }
    }
    return false
  }

  /*  */

  var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*(?:[\w$]+)?\s*\(/;
  var fnInvokeRE = /\([^)]*?\);*$/;
  var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

  // KeyboardEvent.keyCode aliases
  var keyCodes = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    left: 37,
    right: 39,
    down: 40,
    'delete': [8, 46]
  };

  // KeyboardEvent.key aliases
  var keyNames = {
    // #7880: IE11 and Edge use `Esc` for Escape key name.
    esc: ['Esc', 'Escape'],
    tab: 'Tab',
    enter: 'Enter',
    // #9112: IE11 uses `Spacebar` for Space key name.
    space: [' ', 'Spacebar'],
    // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
    up: ['Up', 'ArrowUp'],
    left: ['Left', 'ArrowLeft'],
    right: ['Right', 'ArrowRight'],
    down: ['Down', 'ArrowDown'],
    // #9112: IE11 uses `Del` for Delete key name.
    'delete': ['Backspace', 'Delete', 'Del']
  };

  // #4868: modifiers that prevent the execution of the listener
  // need to explicitly return null so that we can determine whether to remove
  // the listener for .once
  var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

  var modifierCode = {
    stop: '$event.stopPropagation();',
    prevent: '$event.preventDefault();',
    self: genGuard("$event.target !== $event.currentTarget"),
    ctrl: genGuard("!$event.ctrlKey"),
    shift: genGuard("!$event.shiftKey"),
    alt: genGuard("!$event.altKey"),
    meta: genGuard("!$event.metaKey"),
    left: genGuard("'button' in $event && $event.button !== 0"),
    middle: genGuard("'button' in $event && $event.button !== 1"),
    right: genGuard("'button' in $event && $event.button !== 2")
  };

  function genHandlers (
    events,
    isNative
  ) {
    var prefix = isNative ? 'nativeOn:' : 'on:';
    var staticHandlers = "";
    var dynamicHandlers = "";
    for (var name in events) {
      var handlerCode = genHandler(events[name]);
      if (events[name] && events[name].dynamic) {
        dynamicHandlers += name + "," + handlerCode + ",";
      } else {
        staticHandlers += "\"" + name + "\":" + handlerCode + ",";
      }
    }
    staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
    if (dynamicHandlers) {
      return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
    } else {
      return prefix + staticHandlers
    }
  }

  function genHandler (handler) {
    if (!handler) {
      return 'function(){}'
    }

    if (Array.isArray(handler)) {
      return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
    }

    var isMethodPath = simplePathRE.test(handler.value);
    var isFunctionExpression = fnExpRE.test(handler.value);
    var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

    if (!handler.modifiers) {
      if (isMethodPath || isFunctionExpression) {
        return handler.value
      }
      return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
    } else {
      var code = '';
      var genModifierCode = '';
      var keys = [];
      for (var key in handler.modifiers) {
        if (modifierCode[key]) {
          genModifierCode += modifierCode[key];
          // left/right
          if (keyCodes[key]) {
            keys.push(key);
          }
        } else if (key === 'exact') {
          var modifiers = (handler.modifiers);
          genModifierCode += genGuard(
            ['ctrl', 'shift', 'alt', 'meta']
              .filter(function (keyModifier) { return !modifiers[keyModifier]; })
              .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
              .join('||')
          );
        } else {
          keys.push(key);
        }
      }
      if (keys.length) {
        code += genKeyFilter(keys);
      }
      // Make sure modifiers like prevent and stop get executed after key filtering
      if (genModifierCode) {
        code += genModifierCode;
      }
      var handlerCode = isMethodPath
        ? ("return " + (handler.value) + "($event)")
        : isFunctionExpression
          ? ("return (" + (handler.value) + ")($event)")
          : isFunctionInvocation
            ? ("return " + (handler.value))
            : handler.value;
      return ("function($event){" + code + handlerCode + "}")
    }
  }

  function genKeyFilter (keys) {
    return (
      // make sure the key filters only apply to KeyboardEvents
      // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
      // key events that do not have keyCode property...
      "if(!$event.type.indexOf('key')&&" +
      (keys.map(genFilterCode).join('&&')) + ")return null;"
    )
  }

  function genFilterCode (key) {
    var keyVal = parseInt(key, 10);
    if (keyVal) {
      return ("$event.keyCode!==" + keyVal)
    }
    var keyCode = keyCodes[key];
    var keyName = keyNames[key];
    return (
      "_k($event.keyCode," +
      (JSON.stringify(key)) + "," +
      (JSON.stringify(keyCode)) + "," +
      "$event.key," +
      "" + (JSON.stringify(keyName)) +
      ")"
    )
  }

  /*  */

  function on (el, dir) {
    if (dir.modifiers) {
      warn("v-on without argument does not support modifiers.");
    }
    el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
  }

  /*  */

  function bind$1 (el, dir) {
    el.wrapData = function (code) {
      return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
    };
  }

  /*  */

  var baseDirectives = {
    on: on,
    bind: bind$1,
    cloak: noop
  };

  /*  */





  var CodegenState = function CodegenState (options) {
    this.options = options;
    this.warn = options.warn || baseWarn;
    this.transforms = pluckModuleFunction(options.modules, 'transformCode');
    this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
    this.directives = extend(extend({}, baseDirectives), options.directives);
    var isReservedTag = options.isReservedTag || no;
    this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
    this.onceId = 0;
    this.staticRenderFns = [];
    this.pre = false;
  };



  function generate (
    ast,
    options
  ) {
    var state = new CodegenState(options);
    var code = ast ? genElement(ast, state) : '_c("div")';
    return {
      render: ("with(this){return " + code + "}"),
      staticRenderFns: state.staticRenderFns
    }
  }

  function genElement (el, state) {
    if (el.parent) {
      el.pre = el.pre || el.parent.pre;
    }

    if (el.staticRoot && !el.staticProcessed) {
      return genStatic(el, state)
    } else if (el.once && !el.onceProcessed) {
      return genOnce(el, state)
    } else if (el.for && !el.forProcessed) {
      return genFor(el, state)
    } else if (el.if && !el.ifProcessed) {
      return genIf(el, state)
    } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
      return genChildren(el, state) || 'void 0'
    } else if (el.tag === 'slot') {
      return genSlot(el, state)
    } else {
      // component or element
      var code;
      if (el.component) {
        code = genComponent(el.component, el, state);
      } else {
        var data;
        if (!el.plain || (el.pre && state.maybeComponent(el))) {
          data = genData$2(el, state);
        }

        var children = el.inlineTemplate ? null : genChildren(el, state, true);
        code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
      }
      // module transforms
      for (var i = 0; i < state.transforms.length; i++) {
        code = state.transforms[i](el, code);
      }
      return code
    }
  }

  // hoist static sub-trees out
  function genStatic (el, state) {
    el.staticProcessed = true;
    // Some elements (templates) need to behave differently inside of a v-pre
    // node.  All pre nodes are static roots, so we can use this as a location to
    // wrap a state change and reset it upon exiting the pre node.
    var originalPreState = state.pre;
    if (el.pre) {
      state.pre = el.pre;
    }
    state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
    state.pre = originalPreState;
    return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
  }

  // v-once
  function genOnce (el, state) {
    el.onceProcessed = true;
    if (el.if && !el.ifProcessed) {
      return genIf(el, state)
    } else if (el.staticInFor) {
      var key = '';
      var parent = el.parent;
      while (parent) {
        if (parent.for) {
          key = parent.key;
          break
        }
        parent = parent.parent;
      }
      if (!key) {
        state.warn(
          "v-once can only be used inside v-for that is keyed. ",
          el.rawAttrsMap['v-once']
        );
        return genElement(el, state)
      }
      return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
    } else {
      return genStatic(el, state)
    }
  }

  function genIf (
    el,
    state,
    altGen,
    altEmpty
  ) {
    el.ifProcessed = true; // avoid recursion
    return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
  }

  function genIfConditions (
    conditions,
    state,
    altGen,
    altEmpty
  ) {
    if (!conditions.length) {
      return altEmpty || '_e()'
    }

    var condition = conditions.shift();
    if (condition.exp) {
      return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
    } else {
      return ("" + (genTernaryExp(condition.block)))
    }

    // v-if with v-once should generate code like (a)?_m(0):_m(1)
    function genTernaryExp (el) {
      return altGen
        ? altGen(el, state)
        : el.once
          ? genOnce(el, state)
          : genElement(el, state)
    }
  }

  function genFor (
    el,
    state,
    altGen,
    altHelper
  ) {
    var exp = el.for;
    var alias = el.alias;
    var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
    var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

    if (state.maybeComponent(el) &&
      el.tag !== 'slot' &&
      el.tag !== 'template' &&
      !el.key
    ) {
      state.warn(
        "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
        "v-for should have explicit keys. " +
        "See https://vuejs.org/guide/list.html#key for more info.",
        el.rawAttrsMap['v-for'],
        true /* tip */
      );
    }

    el.forProcessed = true; // avoid recursion
    return (altHelper || '_l') + "((" + exp + ")," +
      "function(" + alias + iterator1 + iterator2 + "){" +
        "return " + ((altGen || genElement)(el, state)) +
      '})'
  }

  function genData$2 (el, state) {
    var data = '{';

    // directives first.
    // directives may mutate the el's other properties before they are generated.
    var dirs = genDirectives(el, state);
    if (dirs) { data += dirs + ','; }

    // key
    if (el.key) {
      data += "key:" + (el.key) + ",";
    }
    // ref
    if (el.ref) {
      data += "ref:" + (el.ref) + ",";
    }
    if (el.refInFor) {
      data += "refInFor:true,";
    }
    // pre
    if (el.pre) {
      data += "pre:true,";
    }
    // record original tag name for components using "is" attribute
    if (el.component) {
      data += "tag:\"" + (el.tag) + "\",";
    }
    // module data generation functions
    for (var i = 0; i < state.dataGenFns.length; i++) {
      data += state.dataGenFns[i](el);
    }
    // attributes
    if (el.attrs) {
      data += "attrs:" + (genProps(el.attrs)) + ",";
    }
    // DOM props
    if (el.props) {
      data += "domProps:" + (genProps(el.props)) + ",";
    }
    // event handlers
    if (el.events) {
      data += (genHandlers(el.events, false)) + ",";
    }
    if (el.nativeEvents) {
      data += (genHandlers(el.nativeEvents, true)) + ",";
    }
    // slot target
    // only for non-scoped slots
    if (el.slotTarget && !el.slotScope) {
      data += "slot:" + (el.slotTarget) + ",";
    }
    // scoped slots
    if (el.scopedSlots) {
      data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
    }
    // component v-model
    if (el.model) {
      data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
    }
    // inline-template
    if (el.inlineTemplate) {
      var inlineTemplate = genInlineTemplate(el, state);
      if (inlineTemplate) {
        data += inlineTemplate + ",";
      }
    }
    data = data.replace(/,$/, '') + '}';
    // v-bind dynamic argument wrap
    // v-bind with dynamic arguments must be applied using the same v-bind object
    // merge helper so that class/style/mustUseProp attrs are handled correctly.
    if (el.dynamicAttrs) {
      data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
    }
    // v-bind data wrap
    if (el.wrapData) {
      data = el.wrapData(data);
    }
    // v-on data wrap
    if (el.wrapListeners) {
      data = el.wrapListeners(data);
    }
    return data
  }

  function genDirectives (el, state) {
    var dirs = el.directives;
    if (!dirs) { return }
    var res = 'directives:[';
    var hasRuntime = false;
    var i, l, dir, needRuntime;
    for (i = 0, l = dirs.length; i < l; i++) {
      dir = dirs[i];
      needRuntime = true;
      var gen = state.directives[dir.name];
      if (gen) {
        // compile-time directive that manipulates AST.
        // returns true if it also needs a runtime counterpart.
        needRuntime = !!gen(el, dir, state.warn);
      }
      if (needRuntime) {
        hasRuntime = true;
        res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
      }
    }
    if (hasRuntime) {
      return res.slice(0, -1) + ']'
    }
  }

  function genInlineTemplate (el, state) {
    var ast = el.children[0];
    if (el.children.length !== 1 || ast.type !== 1) {
      state.warn(
        'Inline-template components must have exactly one child element.',
        { start: el.start }
      );
    }
    if (ast && ast.type === 1) {
      var inlineRenderFns = generate(ast, state.options);
      return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
    }
  }

  function genScopedSlots (
    el,
    slots,
    state
  ) {
    // by default scoped slots are considered "stable", this allows child
    // components with only scoped slots to skip forced updates from parent.
    // but in some cases we have to bail-out of this optimization
    // for example if the slot contains dynamic names, has v-if or v-for on them...
    var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
      var slot = slots[key];
      return (
        slot.slotTargetDynamic ||
        slot.if ||
        slot.for ||
        containsSlotChild(slot) // is passing down slot from parent which may be dynamic
      )
    });

    // #9534: if a component with scoped slots is inside a conditional branch,
    // it's possible for the same component to be reused but with different
    // compiled slot content. To avoid that, we generate a unique key based on
    // the generated code of all the slot contents.
    var needsKey = !!el.if;

    // OR when it is inside another scoped slot or v-for (the reactivity may be
    // disconnected due to the intermediate scope variable)
    // #9438, #9506
    // TODO: this can be further optimized by properly analyzing in-scope bindings
    // and skip force updating ones that do not actually use scope variables.
    if (!needsForceUpdate) {
      var parent = el.parent;
      while (parent) {
        if (
          (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
          parent.for
        ) {
          needsForceUpdate = true;
          break
        }
        if (parent.if) {
          needsKey = true;
        }
        parent = parent.parent;
      }
    }

    var generatedSlots = Object.keys(slots)
      .map(function (key) { return genScopedSlot(slots[key], state); })
      .join(',');

    return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
  }

  function hash(str) {
    var hash = 5381;
    var i = str.length;
    while(i) {
      hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0
  }

  function containsSlotChild (el) {
    if (el.type === 1) {
      if (el.tag === 'slot') {
        return true
      }
      return el.children.some(containsSlotChild)
    }
    return false
  }

  function genScopedSlot (
    el,
    state
  ) {
    var isLegacySyntax = el.attrsMap['slot-scope'];
    if (el.if && !el.ifProcessed && !isLegacySyntax) {
      return genIf(el, state, genScopedSlot, "null")
    }
    if (el.for && !el.forProcessed) {
      return genFor(el, state, genScopedSlot)
    }
    var slotScope = el.slotScope === emptySlotScopeToken
      ? ""
      : String(el.slotScope);
    var fn = "function(" + slotScope + "){" +
      "return " + (el.tag === 'template'
        ? el.if && isLegacySyntax
          ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
          : genChildren(el, state) || 'undefined'
        : genElement(el, state)) + "}";
    // reverse proxy v-slot without scope on this.$slots
    var reverseProxy = slotScope ? "" : ",proxy:true";
    return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
  }

  function genChildren (
    el,
    state,
    checkSkip,
    altGenElement,
    altGenNode
  ) {
    var children = el.children;
    if (children.length) {
      var el$1 = children[0];
      // optimize single v-for
      if (children.length === 1 &&
        el$1.for &&
        el$1.tag !== 'template' &&
        el$1.tag !== 'slot'
      ) {
        var normalizationType = checkSkip
          ? state.maybeComponent(el$1) ? ",1" : ",0"
          : "";
        return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
      }
      var normalizationType$1 = checkSkip
        ? getNormalizationType(children, state.maybeComponent)
        : 0;
      var gen = altGenNode || genNode;
      return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
    }
  }

  // determine the normalization needed for the children array.
  // 0: no normalization needed
  // 1: simple normalization needed (possible 1-level deep nested array)
  // 2: full normalization needed
  function getNormalizationType (
    children,
    maybeComponent
  ) {
    var res = 0;
    for (var i = 0; i < children.length; i++) {
      var el = children[i];
      if (el.type !== 1) {
        continue
      }
      if (needsNormalization(el) ||
          (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
        res = 2;
        break
      }
      if (maybeComponent(el) ||
          (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
        res = 1;
      }
    }
    return res
  }

  function needsNormalization (el) {
    return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
  }

  function genNode (node, state) {
    if (node.type === 1) {
      return genElement(node, state)
    } else if (node.type === 3 && node.isComment) {
      return genComment(node)
    } else {
      return genText(node)
    }
  }

  function genText (text) {
    return ("_v(" + (text.type === 2
      ? text.expression // no need for () because already wrapped in _s()
      : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
  }

  function genComment (comment) {
    return ("_e(" + (JSON.stringify(comment.text)) + ")")
  }

  function genSlot (el, state) {
    var slotName = el.slotName || '"default"';
    var children = genChildren(el, state);
    var res = "_t(" + slotName + (children ? ("," + children) : '');
    var attrs = el.attrs || el.dynamicAttrs
      ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
          // slot props are camelized
          name: camelize(attr.name),
          value: attr.value,
          dynamic: attr.dynamic
        }); }))
      : null;
    var bind$$1 = el.attrsMap['v-bind'];
    if ((attrs || bind$$1) && !children) {
      res += ",null";
    }
    if (attrs) {
      res += "," + attrs;
    }
    if (bind$$1) {
      res += (attrs ? '' : ',null') + "," + bind$$1;
    }
    return res + ')'
  }

  // componentName is el.component, take it as argument to shun flow's pessimistic refinement
  function genComponent (
    componentName,
    el,
    state
  ) {
    var children = el.inlineTemplate ? null : genChildren(el, state, true);
    return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
  }

  function genProps (props) {
    var staticProps = "";
    var dynamicProps = "";
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      var value = transformSpecialNewlines(prop.value);
      if (prop.dynamic) {
        dynamicProps += (prop.name) + "," + value + ",";
      } else {
        staticProps += "\"" + (prop.name) + "\":" + value + ",";
      }
    }
    staticProps = "{" + (staticProps.slice(0, -1)) + "}";
    if (dynamicProps) {
      return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
    } else {
      return staticProps
    }
  }

  // #3895, #4268
  function transformSpecialNewlines (text) {
    return text
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
  }

  /*  */



  // these keywords should not appear inside expressions, but operators like
  // typeof, instanceof and in are allowed
  var prohibitedKeywordRE = new RegExp('\\b' + (
    'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
    'super,throw,while,yield,delete,export,import,return,switch,default,' +
    'extends,finally,continue,debugger,function,arguments'
  ).split(',').join('\\b|\\b') + '\\b');

  // these unary operators should not be used as property/method names
  var unaryOperatorsRE = new RegExp('\\b' + (
    'delete,typeof,void'
  ).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

  // strip strings in expressions
  var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

  // detect problematic expressions in a template
  function detectErrors (ast, warn) {
    if (ast) {
      checkNode(ast, warn);
    }
  }

  function checkNode (node, warn) {
    if (node.type === 1) {
      for (var name in node.attrsMap) {
        if (dirRE.test(name)) {
          var value = node.attrsMap[name];
          if (value) {
            var range = node.rawAttrsMap[name];
            if (name === 'v-for') {
              checkFor(node, ("v-for=\"" + value + "\""), warn, range);
            } else if (onRE.test(name)) {
              checkEvent(value, (name + "=\"" + value + "\""), warn, range);
            } else {
              checkExpression(value, (name + "=\"" + value + "\""), warn, range);
            }
          }
        }
      }
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          checkNode(node.children[i], warn);
        }
      }
    } else if (node.type === 2) {
      checkExpression(node.expression, node.text, warn, node);
    }
  }

  function checkEvent (exp, text, warn, range) {
    var stipped = exp.replace(stripStringRE, '');
    var keywordMatch = stipped.match(unaryOperatorsRE);
    if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
      warn(
        "avoid using JavaScript unary operator as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
        range
      );
    }
    checkExpression(exp, text, warn, range);
  }

  function checkFor (node, text, warn, range) {
    checkExpression(node.for || '', text, warn, range);
    checkIdentifier(node.alias, 'v-for alias', text, warn, range);
    checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
    checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
  }

  function checkIdentifier (
    ident,
    type,
    text,
    warn,
    range
  ) {
    if (typeof ident === 'string') {
      try {
        new Function(("var " + ident + "=_"));
      } catch (e) {
        warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
      }
    }
  }

  function checkExpression (exp, text, warn, range) {
    try {
      new Function(("return " + exp));
    } catch (e) {
      var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
      if (keywordMatch) {
        warn(
          "avoid using JavaScript keyword as property name: " +
          "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
          range
        );
      } else {
        warn(
          "invalid expression: " + (e.message) + " in\n\n" +
          "    " + exp + "\n\n" +
          "  Raw expression: " + (text.trim()) + "\n",
          range
        );
      }
    }
  }

  /*  */

  var range = 2;

  function generateCodeFrame (
    source,
    start,
    end
  ) {
    if ( start === void 0 ) start = 0;
    if ( end === void 0 ) end = source.length;

    var lines = source.split(/\r?\n/);
    var count = 0;
    var res = [];
    for (var i = 0; i < lines.length; i++) {
      count += lines[i].length + 1;
      if (count >= start) {
        for (var j = i - range; j <= i + range || end > count; j++) {
          if (j < 0 || j >= lines.length) { continue }
          res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
          var lineLength = lines[j].length;
          if (j === i) {
            // push underline
            var pad = start - (count - lineLength) + 1;
            var length = end > count ? lineLength - pad : end - start;
            res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
          } else if (j > i) {
            if (end > count) {
              var length$1 = Math.min(end - count, lineLength);
              res.push("   |  " + repeat$1("^", length$1));
            }
            count += lineLength + 1;
          }
        }
        break
      }
    }
    return res.join('\n')
  }

  function repeat$1 (str, n) {
    var result = '';
    if (n > 0) {
      while (true) { // eslint-disable-line
        if (n & 1) { result += str; }
        n >>>= 1;
        if (n <= 0) { break }
        str += str;
      }
    }
    return result
  }

  /*  */



  function createFunction (code, errors) {
    try {
      return new Function(code)
    } catch (err) {
      errors.push({ err: err, code: code });
      return noop
    }
  }

  function createCompileToFunctionFn (compile) {
    var cache = Object.create(null);

    return function compileToFunctions (
      template,
      options,
      vm
    ) {
      options = extend({}, options);
      var warn$$1 = options.warn || warn;
      delete options.warn;

      /* istanbul ignore if */
      {
        // detect possible CSP restriction
        try {
          new Function('return 1');
        } catch (e) {
          if (e.toString().match(/unsafe-eval|CSP/)) {
            warn$$1(
              'It seems you are using the standalone build of Vue.js in an ' +
              'environment with Content Security Policy that prohibits unsafe-eval. ' +
              'The template compiler cannot work in this environment. Consider ' +
              'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
              'templates into render functions.'
            );
          }
        }
      }

      // check cache
      var key = options.delimiters
        ? String(options.delimiters) + template
        : template;
      if (cache[key]) {
        return cache[key]
      }

      // compile
      var compiled = compile(template, options);

      // check compilation errors/tips
      {
        if (compiled.errors && compiled.errors.length) {
          if (options.outputSourceRange) {
            compiled.errors.forEach(function (e) {
              warn$$1(
                "Error compiling template:\n\n" + (e.msg) + "\n\n" +
                generateCodeFrame(template, e.start, e.end),
                vm
              );
            });
          } else {
            warn$$1(
              "Error compiling template:\n\n" + template + "\n\n" +
              compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
              vm
            );
          }
        }
        if (compiled.tips && compiled.tips.length) {
          if (options.outputSourceRange) {
            compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
          } else {
            compiled.tips.forEach(function (msg) { return tip(msg, vm); });
          }
        }
      }

      // turn code into functions
      var res = {};
      var fnGenErrors = [];
      res.render = createFunction(compiled.render, fnGenErrors);
      res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
        return createFunction(code, fnGenErrors)
      });

      // check function generation errors.
      // this should only happen if there is a bug in the compiler itself.
      // mostly for codegen development use
      /* istanbul ignore if */
      {
        if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
          warn$$1(
            "Failed to generate render function:\n\n" +
            fnGenErrors.map(function (ref) {
              var err = ref.err;
              var code = ref.code;

              return ((err.toString()) + " in\n\n" + code + "\n");
          }).join('\n'),
            vm
          );
        }
      }

      return (cache[key] = res)
    }
  }

  /*  */

  function createCompilerCreator (baseCompile) {
    return function createCompiler (baseOptions) {
      function compile (
        template,
        options
      ) {
        var finalOptions = Object.create(baseOptions);
        var errors = [];
        var tips = [];

        var warn = function (msg, range, tip) {
          (tip ? tips : errors).push(msg);
        };

        if (options) {
          if (options.outputSourceRange) {
            // $flow-disable-line
            var leadingSpaceLength = template.match(/^\s*/)[0].length;

            warn = function (msg, range, tip) {
              var data = { msg: msg };
              if (range) {
                if (range.start != null) {
                  data.start = range.start + leadingSpaceLength;
                }
                if (range.end != null) {
                  data.end = range.end + leadingSpaceLength;
                }
              }
              (tip ? tips : errors).push(data);
            };
          }
          // merge custom modules
          if (options.modules) {
            finalOptions.modules =
              (baseOptions.modules || []).concat(options.modules);
          }
          // merge custom directives
          if (options.directives) {
            finalOptions.directives = extend(
              Object.create(baseOptions.directives || null),
              options.directives
            );
          }
          // copy other options
          for (var key in options) {
            if (key !== 'modules' && key !== 'directives') {
              finalOptions[key] = options[key];
            }
          }
        }

        finalOptions.warn = warn;

        var compiled = baseCompile(template.trim(), finalOptions);
        {
          detectErrors(compiled.ast, warn);
        }
        compiled.errors = errors;
        compiled.tips = tips;
        return compiled
      }

      return {
        compile: compile,
        compileToFunctions: createCompileToFunctionFn(compile)
      }
    }
  }

  /*  */

  // `createCompilerCreator` allows creating compilers that use alternative
  // parser/optimizer/codegen, e.g the SSR optimizing compiler.
  // Here we just export a default compiler using the default parts.
  var createCompiler = createCompilerCreator(function baseCompile (
    template,
    options
  ) {
    var ast = parse(template.trim(), options);
    if (options.optimize !== false) {
      optimize(ast, options);
    }
    var code = generate(ast, options);
    return {
      ast: ast,
      render: code.render,
      staticRenderFns: code.staticRenderFns
    }
  });

  /*  */

  var ref$1 = createCompiler(baseOptions);
  var compile = ref$1.compile;
  var compileToFunctions = ref$1.compileToFunctions;

  /*  */

  // check whether current browser encodes a char inside attribute values
  var div;
  function getShouldDecode (href) {
    div = div || document.createElement('div');
    div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
    return div.innerHTML.indexOf('&#10;') > 0
  }

  // #3663: IE encodes newlines inside attribute values while other browsers don't
  var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
  // #6828: chrome encodes content in a[href]
  var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

  /*  */

  var idToTemplate = cached(function (id) {
    var el = query(id);
    return el && el.innerHTML
  });

  var mount = Vue.prototype.$mount;
  Vue.prototype.$mount = function (
    el,
    hydrating
  ) {
    el = el && query(el);

    /* istanbul ignore if */
    if (el === document.body || el === document.documentElement) {
      warn(
        "Do not mount Vue to <html> or <body> - mount to normal elements instead."
      );
      return this
    }

    var options = this.$options;
    // resolve template/el and convert to render function
    if (!options.render) {
      var template = options.template;
      if (template) {
        if (typeof template === 'string') {
          if (template.charAt(0) === '#') {
            template = idToTemplate(template);
            /* istanbul ignore if */
            if (!template) {
              warn(
                ("Template element not found or is empty: " + (options.template)),
                this
              );
            }
          }
        } else if (template.nodeType) {
          template = template.innerHTML;
        } else {
          {
            warn('invalid template option:' + template, this);
          }
          return this
        }
      } else if (el) {
        template = getOuterHTML(el);
      }
      if (template) {
        /* istanbul ignore if */
        if (config.performance && mark) {
          mark('compile');
        }

        var ref = compileToFunctions(template, {
          outputSourceRange: "development" !== 'production',
          shouldDecodeNewlines: shouldDecodeNewlines,
          shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments
        }, this);
        var render = ref.render;
        var staticRenderFns = ref.staticRenderFns;
        options.render = render;
        options.staticRenderFns = staticRenderFns;

        /* istanbul ignore if */
        if (config.performance && mark) {
          mark('compile end');
          measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
        }
      }
    }
    return mount.call(this, el, hydrating)
  };

  /**
   * Get outerHTML of elements, taking care
   * of SVG elements in IE as well.
   */
  function getOuterHTML (el) {
    if (el.outerHTML) {
      return el.outerHTML
    } else {
      var container = document.createElement('div');
      container.appendChild(el.cloneNode(true));
      return container.innerHTML
    }
  }

  Vue.compile = compileToFunctions;

  return Vue;

}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(10).setImmediate))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(11);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(3)))

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_axios_dist_axios__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_axios_dist_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_axios_dist_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_qs_dist_qs__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_qs_dist_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__node_modules_qs_dist_qs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timg_jpg__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timg_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__timg_jpg__);






var data = __WEBPACK_IMPORTED_MODULE_1__node_modules_qs_dist_qs___default.a.stringify({ 
	id: "116", 
	type: "GetOneArticleInfo",
});
var app={
	data(){
		return {
			imgSrc:__WEBPACK_IMPORTED_MODULE_2__timg_jpg___default.a,

		}
	},
	template:`<div>
			11sss
			<img :src="imgSrc" alt="这是图片" />
			<div @click="postMsg">点击我发送信息</div>
	</div>`,
	methods:{
		postMsg(){
			__WEBPACK_IMPORTED_MODULE_0__node_modules_axios_dist_axios___default.a.post('../../phpdata/datapage/arclist.php', data)
			.then(function (str) {
			    console.log(str.data);
			})
			.catch(function (error) {
			    console.log(error);
		    });

		}
	}
}


/* harmony default export */ __webpack_exports__["a"] = (app);



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* axios v0.19.0 | (c) 2019 by Matt Zabriskie */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["axios"] = factory();
	else
		root["axios"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var bind = __webpack_require__(3);
	var Axios = __webpack_require__(5);
	var mergeConfig = __webpack_require__(22);
	var defaults = __webpack_require__(11);
	
	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);
	
	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);
	
	  // Copy context to instance
	  utils.extend(instance, context);
	
	  return instance;
	}
	
	// Create the default instance to be exported
	var axios = createInstance(defaults);
	
	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;
	
	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(mergeConfig(axios.defaults, instanceConfig));
	};
	
	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(23);
	axios.CancelToken = __webpack_require__(24);
	axios.isCancel = __webpack_require__(10);
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(25);
	
	module.exports = axios;
	
	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(3);
	var isBuffer = __webpack_require__(4);
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 * nativescript
	 *  navigator.product -> 'NativeScript' or 'NS'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
	                                           navigator.product === 'NativeScript' ||
	                                           navigator.product === 'NS')) {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * Function equal to merge with the difference being that no reference
	 * to original objects is kept.
	 *
	 * @see merge
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function deepMerge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = deepMerge(result[key], val);
	    } else if (typeof val === 'object') {
	      result[key] = deepMerge({}, val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  deepMerge: deepMerge,
	  extend: extend,
	  trim: trim
	};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */
	
	module.exports = function isBuffer (obj) {
	  return obj != null && obj.constructor != null &&
	    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var buildURL = __webpack_require__(6);
	var InterceptorManager = __webpack_require__(7);
	var dispatchRequest = __webpack_require__(8);
	var mergeConfig = __webpack_require__(22);
	
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = arguments[1] || {};
	    config.url = arguments[0];
	  } else {
	    config = config || {};
	  }
	
	  config = mergeConfig(this.defaults, config);
	  config.method = config.method ? config.method.toLowerCase() : 'get';
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	Axios.prototype.getUri = function getUri(config) {
	  config = mergeConfig(this.defaults, config);
	  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
	};
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});
	
	module.exports = Axios;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      } else {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    var hashmarkIndex = url.indexOf('#');
	    if (hashmarkIndex !== -1) {
	      url = url.slice(0, hashmarkIndex);
	    }
	
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var transformData = __webpack_require__(9);
	var isCancel = __webpack_require__(10);
	var defaults = __webpack_require__(11);
	var isAbsoluteURL = __webpack_require__(20);
	var combineURLs = __webpack_require__(21);
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}
	
	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);
	
	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Ensure headers exist
	  config.headers = config.headers || {};
	
	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  var adapter = config.adapter || defaults.adapter;
	
	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);
	
	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );
	
	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);
	
	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }
	
	    return Promise.reject(reason);
	  });
	};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var normalizeHeaderName = __webpack_require__(12);
	
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}
	
	function getDefaultAdapter() {
	  var adapter;
	  // Only Node.JS has a process variable that is of [[Class]] process
	  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(13);
	  } else if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(13);
	  }
	  return adapter;
	}
	
	var defaults = {
	  adapter: getDefaultAdapter(),
	
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Accept');
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  /**
	   * A timeout in milliseconds to abort a request. If set to 0 (default) a
	   * timeout is not created.
	   */
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	
	  maxContentLength: -1,
	
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};
	
	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};
	
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});
	
	module.exports = defaults;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var settle = __webpack_require__(14);
	var buildURL = __webpack_require__(6);
	var parseHeaders = __webpack_require__(17);
	var isURLSameOrigin = __webpack_require__(18);
	var createError = __webpack_require__(15);
	
	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	
	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }
	
	    var request = new XMLHttpRequest();
	
	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }
	
	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	    // Set the request timeout in MS
	    request.timeout = config.timeout;
	
	    // Listen for ready state
	    request.onreadystatechange = function handleLoad() {
	      if (!request || request.readyState !== 4) {
	        return;
	      }
	
	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }
	
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };
	
	      settle(resolve, reject, response);
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle browser request cancellation (as opposed to a manual cancellation)
	    request.onabort = function handleAbort() {
	      if (!request) {
	        return;
	      }
	
	      reject(createError('Request aborted', config, 'ECONNABORTED', request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
	        request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(19);
	
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	        cookies.read(config.xsrfCookieName) :
	        undefined;
	
	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }
	
	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }
	
	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }
	
	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }
	
	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }
	
	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }
	
	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }
	
	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }
	
	    if (requestData === undefined) {
	      requestData = null;
	    }
	
	    // Send the request
	    request.send(requestData);
	  });
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(15);
	
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  if (!validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(16);
	
	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	
	  error.request = request;
	  error.response = response;
	  error.isAxiosError = true;
	
	  error.toJSON = function() {
	    return {
	      // Standard
	      message: this.message,
	      name: this.name,
	      // Microsoft
	      description: this.description,
	      number: this.number,
	      // Mozilla
	      fileName: this.fileName,
	      lineNumber: this.lineNumber,
	      columnNumber: this.columnNumber,
	      stack: this.stack,
	      // Axios
	      config: this.config,
	      code: this.code
	    };
	  };
	  return error;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	// Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') {
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    }
	  });
	
	  return parsed;
	};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	    (function standardBrowserEnv() {
	      var msie = /(msie|trident)/i.test(navigator.userAgent);
	      var urlParsingNode = document.createElement('a');
	      var originURL;
	
	      /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	      function resolveURL(url) {
	        var href = url;
	
	        if (msie) {
	        // IE needs attribute set twice to normalize properties
	          urlParsingNode.setAttribute('href', href);
	          href = urlParsingNode.href;
	        }
	
	        urlParsingNode.setAttribute('href', href);
	
	        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	        return {
	          href: urlParsingNode.href,
	          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	          host: urlParsingNode.host,
	          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	          hostname: urlParsingNode.hostname,
	          port: urlParsingNode.port,
	          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	            urlParsingNode.pathname :
	            '/' + urlParsingNode.pathname
	        };
	      }
	
	      originURL = resolveURL(window.location.href);
	
	      /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	      return function isURLSameOrigin(requestURL) {
	        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	        return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	      };
	    })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	    (function nonStandardBrowserEnv() {
	      return function isURLSameOrigin() {
	        return true;
	      };
	    })()
	);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	    (function standardBrowserEnv() {
	      return {
	        write: function write(name, value, expires, path, domain, secure) {
	          var cookie = [];
	          cookie.push(name + '=' + encodeURIComponent(value));
	
	          if (utils.isNumber(expires)) {
	            cookie.push('expires=' + new Date(expires).toGMTString());
	          }
	
	          if (utils.isString(path)) {
	            cookie.push('path=' + path);
	          }
	
	          if (utils.isString(domain)) {
	            cookie.push('domain=' + domain);
	          }
	
	          if (secure === true) {
	            cookie.push('secure');
	          }
	
	          document.cookie = cookie.join('; ');
	        },
	
	        read: function read(name) {
	          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	          return (match ? decodeURIComponent(match[3]) : null);
	        },
	
	        remove: function remove(name) {
	          this.write(name, '', Date.now() - 86400000);
	        }
	      };
	    })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	    (function nonStandardBrowserEnv() {
	      return {
	        write: function write() {},
	        read: function read() { return null; },
	        remove: function remove() {}
	      };
	    })()
	);


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	
	/**
	 * Config-specific merge-function which creates a new config-object
	 * by merging two configuration objects together.
	 *
	 * @param {Object} config1
	 * @param {Object} config2
	 * @returns {Object} New object resulting from merging config2 to config1
	 */
	module.exports = function mergeConfig(config1, config2) {
	  // eslint-disable-next-line no-param-reassign
	  config2 = config2 || {};
	  var config = {};
	
	  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
	    if (typeof config2[prop] !== 'undefined') {
	      config[prop] = config2[prop];
	    }
	  });
	
	  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
	    if (utils.isObject(config2[prop])) {
	      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
	    } else if (typeof config2[prop] !== 'undefined') {
	      config[prop] = config2[prop];
	    } else if (utils.isObject(config1[prop])) {
	      config[prop] = utils.deepMerge(config1[prop]);
	    } else if (typeof config1[prop] !== 'undefined') {
	      config[prop] = config1[prop];
	    }
	  });
	
	  utils.forEach([
	    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
	    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
	    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
	    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
	    'socketPath'
	  ], function defaultToConfig2(prop) {
	    if (typeof config2[prop] !== 'undefined') {
	      config[prop] = config2[prop];
	    } else if (typeof config1[prop] !== 'undefined') {
	      config[prop] = config1[prop];
	    }
	  });
	
	  return config;
	};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}
	
	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};
	
	Cancel.prototype.__CANCEL__ = true;
	
	module.exports = Cancel;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Cancel = __webpack_require__(23);
	
	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }
	
	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });
	
	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }
	
	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};
	
	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};
	
	module.exports = CancelToken;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ })
/******/ ])
});
;
//# sourceMappingURL=axios.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Qs = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

},{}],2:[function(require,module,exports){
'use strict';

var stringify = require('./stringify');
var parse = require('./parse');
var formats = require('./formats');

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};

},{"./formats":1,"./parse":3,"./stringify":4}],3:[function(require,module,exports){
'use strict';

var utils = require('./utils');

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset);
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset);
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (val && options.comma && val.indexOf(',') > -1) {
            val = val.split(',');
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === 'number' ? opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};

},{"./utils":5}],4:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var formats = require('./formats');
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    formatter: formats.formatters[formats['default']],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = obj.join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};

},{"./formats":1,"./utils":5}],5:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};

},{}]},{},[2])(2)
});


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(16);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./main.less", function() {
		var newContent = require("!!./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./main.less");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Imports
var getUrl = __webpack_require__(17);
var ___CSS_LOADER_URL___0___ = getUrl(__webpack_require__(4));
// Module
exports.push([module.i, "body {\n  background-image: url(" + ___CSS_LOADER_URL___0___ + ");\n}\n", ""]);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, needQuotes) {
  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ })
/******/ ]);