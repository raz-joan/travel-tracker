/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n.glide {\n  position: relative;\n  width: 100%;\n  box-sizing: border-box;\n}\n.glide * {\n  box-sizing: inherit;\n}\n.glide__track {\n  overflow: hidden;\n}\n.glide__slides {\n  position: relative;\n  width: 100%;\n  list-style: none;\n  backface-visibility: hidden;\n  transform-style: preserve-3d;\n  touch-action: pan-Y;\n  overflow: hidden;\n  padding: 0;\n  white-space: nowrap;\n  display: flex;\n  flex-wrap: nowrap;\n  will-change: transform;\n}\n.glide__slides--dragging {\n  user-select: none;\n}\n.glide__slide {\n  width: 100%;\n  height: 100%;\n  flex-shrink: 0;\n  white-space: normal;\n  user-select: none;\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: transparent;\n}\n.glide__slide a {\n  user-select: none;\n  -webkit-user-drag: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}\n.glide__arrows {\n  -webkit-touch-callout: none;\n  user-select: none;\n}\n.glide__bullets {\n  -webkit-touch-callout: none;\n  user-select: none;\n}\n.glide--rtl {\n  direction: rtl;\n}\n\n.glide__arrow {\n  position: absolute;\n  display: block;\n  top: 50%;\n  z-index: 2;\n  color: white;\n  text-transform: uppercase;\n  padding: 9px 12px;\n  background-color: transparent;\n  border: 2px solid rgba(255, 255, 255, 0.5);\n  border-radius: 4px;\n  box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.1);\n  text-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.1);\n  opacity: 1;\n  cursor: pointer;\n  transition: opacity 150ms ease, border 300ms ease-in-out;\n  transform: translateY(-50%);\n  line-height: 1;\n}\n.glide__arrow:focus {\n  outline: none;\n}\n.glide__arrow:hover {\n  border-color: white;\n}\n.glide__arrow--left {\n  left: 2em;\n}\n.glide__arrow--right {\n  right: 2em;\n}\n.glide__arrow--disabled {\n  opacity: 0.33;\n}\n.glide__bullets {\n  position: absolute;\n  z-index: 2;\n  bottom: 2em;\n  left: 50%;\n  display: inline-flex;\n  list-style: none;\n  transform: translateX(-50%);\n}\n.glide__bullet {\n  background-color: rgba(255, 255, 255, 0.5);\n  width: 9px;\n  height: 9px;\n  padding: 0;\n  border-radius: 50%;\n  border: 2px solid transparent;\n  transition: all 300ms ease-in-out;\n  cursor: pointer;\n  line-height: 0;\n  box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.1);\n  margin: 0 0.25em;\n}\n.glide__bullet:focus {\n  outline: none;\n}\n.glide__bullet:hover, .glide__bullet:focus {\n  border: 2px solid white;\n  background-color: rgba(255, 255, 255, 0.5);\n}\n.glide__bullet--active {\n  background-color: white;\n}\n.glide--swipeable {\n  cursor: grab;\n  cursor: -moz-grab;\n  cursor: -webkit-grab;\n}\n.glide--dragging {\n  cursor: grabbing;\n  cursor: -moz-grabbing;\n  cursor: -webkit-grabbing;\n}\n\nbody {\n  background-color: white;\n  color: black;\n  font-family: \"Nunito\", sans-serif;\n  font-size: 18px;\n}\n\n.error-modal {\n  position: fixed;\n  background-color: rgba(0, 0, 0, 0.5);\n  width: 100vw;\n  height: 100vh;\n  z-index: 2;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: row;\n}\n\n.error-message {\n  font-size: 35px;\n  color: #BA4315;\n  margin: 10px;\n}\n\n.log-in-section {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  background-image: url(\"https://wallpaperboat.com/wp-content/uploads/2020/06/03/42432/blue-cloud-19-920x518.jpg\");\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n  height: 100vh;\n}\n.log-in-section h1 {\n  font-family: \"Permanent Marker\", cursive;\n  font-size: 60px;\n  font-weight: bold;\n  margin: 3% 0;\n}\n.log-in-section .log-in-form {\n  display: flex;\n  justify-content: space-evenly;\n  align-items: center;\n  flex-direction: column;\n  box-shadow: 3px 0 8px #545E66, -2px 0 5px #545E66;\n  background-color: white;\n  height: 25vh;\n  width: 30vw;\n  padding: 2%;\n}\n.log-in-section .log-in-form input {\n  border-style: solid;\n  border-width: thin;\n  cursor: pointer;\n}\n.log-in-section .log-in-form .button {\n  background-color: white;\n  font-weight: bold;\n  padding: 3% 5%;\n  margin: 0 5%;\n  cursor: pointer;\n  padding: 2% 4%;\n}\n.log-in-section .log-in-form .button:hover {\n  background-color: black;\n  color: white;\n}\n.log-in-section .popup-response {\n  color: #BA4315;\n  background-color: white;\n  box-shadow: 3px 0 8px #545E66, -2px 0 5px #545E66;\n  margin: 2% 0;\n  padding: 0.5%;\n}\n\nheader {\n  background-color: #A87C02;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  flex-direction: row;\n  padding-bottom: 1.5%;\n  height: 25vh;\n}\nheader .greeting-cost-container {\n  display: flex;\n  justify-content: flex-end;\n  align-items: flex-start;\n  flex-direction: column;\n  width: 55%;\n  padding-left: 3%;\n}\nheader .greeting-cost-container h1 {\n  color: white;\n  font-family: \"Permanent Marker\", cursive;\n  font-size: 60px;\n  font-weight: bold;\n  margin: 1% 0;\n}\nheader .greeting-cost-container h2 {\n  font-size: 18px;\n  margin: 0.5% 0;\n}\nheader nav {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  flex-direction: row;\n  width: 45%;\n}\nheader nav .navigation {\n  background-color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: row;\n  width: 33%;\n}\nheader nav .navigation .navigation-button {\n  background-color: white;\n  font-weight: bold;\n  padding: 3% 5%;\n  margin: 0 5%;\n  cursor: pointer;\n  border: none;\n  padding: 5% 5%;\n  margin: 0;\n}\nheader nav .navigation .navigation-button:hover {\n  background-color: black;\n  color: white;\n}\nheader nav .navigation-icon {\n  padding: 2.5%;\n  width: 16%;\n  margin: 0;\n}\n\n.home-page-section {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  height: 70vh;\n  width: 100vw;\n}\n.home-page-section .trip-card {\n  background-color: white;\n  border: solid black 1px;\n  box-shadow: 3px 0 8px #545E66, -2px 0 5px #545E66;\n  width: 70%;\n  height: 65vh;\n  margin-left: 15%;\n}\n.home-page-section .trip-card .info-image-container {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  flex-direction: row;\n  height: 75%;\n}\n.home-page-section .trip-card .info-image-container .destination-status-date-container {\n  display: flex;\n  justify-content: space-around;\n  align-items: flex-start;\n  flex-direction: column;\n  height: 60%;\n  width: 40%;\n}\n.home-page-section .trip-card .info-image-container .destination-status-date-container h1 {\n  font-size: 60px;\n  font-weight: bold;\n}\n.home-page-section .trip-card .info-image-container .destination-status-date-container p {\n  font-size: 18px;\n  color: #545E66;\n  margin: 2% 0;\n}\n.home-page-section .trip-card .info-image-container .destination-status-date-container .orange {\n  color: #BA4315;\n}\n.home-page-section .trip-card .info-image-container .destination-status-date-container .green {\n  color: #2E824F;\n}\n.home-page-section .trip-card .info-image-container .trip-image {\n  max-width: 50%;\n  max-height: 90%;\n}\n.home-page-section .trip-card .message-cost-container {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  flex-direction: column;\n  height: 25%;\n  padding: 2% 3%;\n}\n.home-page-section .trip-card .message-cost-container p {\n  font-size: 25px;\n  font-weight: bold;\n}\n.home-page-section .trip-card .message-cost-container .est-cost {\n  font-size: 18px;\n  color: #545E66;\n}\n\n.new-trip-form-section {\n  display: flex;\n  justify-content: space-evenly;\n  align-items: center;\n  flex-direction: column;\n  height: 70vh;\n}\n.new-trip-form-section .form-banner {\n  height: 15vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: row;\n}\n.new-trip-form-section .form-banner h2 {\n  font-size: 35px;\n}\n.new-trip-form-section .form-banner img {\n  padding: 1%;\n  width: 6%;\n}\n.new-trip-form-section .new-trip-form {\n  display: flex;\n  justify-content: space-around;\n  align-items: flex-start;\n  flex-direction: column;\n  background-color: white;\n  box-shadow: 3px 0 8px #545E66, -2px 0 5px #545E66;\n  height: 40vh;\n  width: 50%;\n  padding: 2%;\n}\n.new-trip-form-section .new-trip-form input,\n.new-trip-form-section .new-trip-form select {\n  border-style: solid;\n  border-width: thin;\n  cursor: pointer;\n}\n.new-trip-form-section .new-trip-form input::placeholder {\n  color: #545E66;\n}\n.new-trip-form-section .new-trip-form .light-input {\n  color: #545E66;\n}\n.new-trip-form-section .new-trip-form .form-button-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-direction: row;\n}\n.new-trip-form-section .new-trip-form .form-button-container .button {\n  background-color: white;\n  font-weight: bold;\n  padding: 3% 5%;\n  margin: 0 5%;\n  cursor: pointer;\n  margin: 0 2%;\n}\n.new-trip-form-section .new-trip-form .form-button-container .button:hover {\n  background-color: black;\n  color: white;\n}\n.new-trip-form-section .new-trip-form .popup-response {\n  color: #BA4315;\n}\n\nfooter {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: row;\n  height: 4vh;\n  font-size: 12px;\n}\n\n.hidden {\n  display: none;\n}\n\n.glide__arrow {\n  background-color: #545E66;\n}\n.glide__arrow:focus {\n  background-color: black;\n}\n\n@media screen and (min-width: 416px) and (max-width: 775px) {\n  header {\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    flex-direction: column;\n  }\n  header .greeting-cost-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    width: 100%;\n    padding-left: 0;\n  }\n  header nav {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: row;\n    width: 100%;\n  }\n  header nav .navigation {\n    width: 30%;\n  }\n\n  .home-page-section .trip-card {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n  }\n  .home-page-section .trip-card .info-image-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column-reverse;\n    height: 80%;\n  }\n  .home-page-section .trip-card .info-image-container .trip-image {\n    max-width: 90%;\n    max-height: 75%;\n    margin: 3% 0;\n  }\n  .home-page-section .trip-card .info-image-container .destination-status-date-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    width: 90%;\n  }\n  .home-page-section .trip-card .info-image-container .destination-status-date-container h1 {\n    font-size: 35px;\n  }\n  .home-page-section .trip-card .message-cost-container {\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    flex-direction: column;\n    height: 20%;\n    width: 90%;\n  }\n  .home-page-section .trip-card .message-cost-container p {\n    font-size: 18px;\n  }\n\n  .log-in-section .log-in-form {\n    width: 60%;\n  }\n\n  .new-trip-form-section .form-banner {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n  }\n  .new-trip-form-section .form-banner img {\n    width: 15%;\n  }\n  .new-trip-form-section .new-trip-form {\n    width: 75%;\n  }\n  .new-trip-form-section .new-trip-form .form-button-container {\n    display: flex;\n    justify-content: space-evenly;\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .new-trip-form-section .new-trip-form .form-button-container .button {\n    margin: 2% 0;\n  }\n}\n@media screen and (max-width: 415px) {\n  header {\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center;\n    flex-direction: column;\n    height: 33vh;\n  }\n  header .greeting-cost-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    width: 100%;\n    padding-left: 0;\n  }\n  header .greeting-cost-container h1 {\n    font-size: 35px;\n  }\n  header nav {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    width: 100%;\n  }\n  header nav .navigation {\n    width: 40%;\n  }\n\n  .home-page-section {\n    height: 65vh;\n  }\n  .home-page-section .trip-card {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    height: 100%;\n  }\n  .home-page-section .trip-card .info-image-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column-reverse;\n    height: 75%;\n    width: 90%;\n  }\n  .home-page-section .trip-card .info-image-container .trip-image {\n    max-width: 90%;\n    max-height: 75%;\n    margin: 2% 0;\n  }\n  .home-page-section .trip-card .info-image-container .destination-status-date-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    width: 96%;\n  }\n  .home-page-section .trip-card .info-image-container .destination-status-date-container h1 {\n    font-size: 25px;\n    font-weight: bold;\n  }\n  .home-page-section .trip-card .info-image-container .destination-status-date-container p {\n    font-size: 18px;\n  }\n  .home-page-section .trip-card .info-image-container .destination-status-date-container .trip-messages {\n    display: none;\n  }\n  .home-page-section .trip-card .message-cost-container {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    flex-direction: column;\n    height: 25%;\n    width: 90%;\n  }\n  .home-page-section .trip-card .message-cost-container p {\n    font-size: 18px;\n    font-weight: normal;\n    margin: 2% 0;\n  }\n\n  .log-in-section h1 {\n    font-size: 35px;\n    margin: 5% 0;\n  }\n  .log-in-section .log-in-form {\n    width: 80%;\n  }\n  .log-in-section .popup-response {\n    width: 75%;\n    margin: 5% 0;\n    padding: 1%;\n  }\n\n  .new-trip-form-section {\n    height: 65vh;\n  }\n  .new-trip-form-section .form-banner {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    width: 90%;\n  }\n  .new-trip-form-section .form-banner img {\n    width: 15%;\n  }\n  .new-trip-form-section .form-banner h2 {\n    font-size: 25px;\n  }\n  .new-trip-form-section .new-trip-form {\n    width: 75%;\n  }\n  .new-trip-form-section .new-trip-form .form-button-container {\n    display: flex;\n    justify-content: space-evenly;\n    align-items: flex-start;\n    flex-direction: column;\n  }\n  .new-trip-form-section .new-trip-form .form-button-container .button {\n    margin: 1% 0;\n  }\n\n  footer {\n    height: 2vh;\n  }\n}", "",{"version":3,"sources":["webpack://./src/css/_normalize.scss","webpack://./src/css/base.scss","webpack://./node_modules/@glidejs/glide/src/assets/sass/glide.core.scss","webpack://./node_modules/@glidejs/glide/src/assets/sass/glide.theme.scss","webpack://./src/css/_variables.scss","webpack://./src/css/_mixins.scss"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;EAaC,SAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,wBAAA;ACCD;;ADCA,gDAAA;AACA;;EAEC,cAAA;ACED;;ADAA;EACC,cAAA;ACGD;;ADDA;EACC,gBAAA;ACID;;ADFA;EACC,YAAA;ACKD;;ADHA;;EAEC,WAAA;EACA,aAAA;ACMD;;ADJA;EACC,yBAAA;EACA,iBAAA;ACOD;;AC9CA;EAME,kBAAA;EACA,WAAA;EACA,sBAAA;AD4CF;AC1CE;EACE,mBAAA;AD4CJ;ACzCE;EACE,gBAAA;AD2CJ;ACxCE;EACE,kBAAA;EACA,WAAA;EACA,gBAAA;EACA,2BAAA;EACA,4BAAA;EACA,mBAAA;EACA,gBAAA;EACA,UAAA;EACA,mBAAA;EACA,aAAA;EACA,iBAAA;EACA,sBAAA;AD0CJ;ACxCI;EACE,iBAAA;AD0CN;ACtCE;EACE,WAAA;EACA,YAAA;EACA,cAAA;EACA,mBAAA;EACA,iBAAA;EACA,2BAAA;EACA,wCAAA;ADwCJ;ACtCI;EACE,iBAAA;EACA,uBAAA;EACA,sBAAA;EACA,qBAAA;ADwCN;ACpCE;EACE,2BAAA;EACA,iBAAA;ADsCJ;ACnCE;EACE,2BAAA;EACA,iBAAA;ADqCJ;AClCE;EACE,cAAA;ADoCJ;;AE/FE;EACE,kBAAA;EACA,cAAA;EACA,QAAA;EACA,UAAA;EACA,YAAA;EACA,yBAAA;EACA,iBAAA;EACA,6BAAA;EACA,0CAAA;EACA,kBAAA;EACA,+CAAA;EACA,8CAAA;EACA,UAAA;EACA,eAAA;EACA,wDAAA;EACA,2BAAA;EACA,cAAA;AFkGJ;AEhGI;EAAU,aAAA;AFmGd;AElGI;EAAU,mBAAA;AFqGd;AEnGI;EACE,SAAA;AFqGN;AElGI;EACE,UAAA;AFoGN;AEjGI;EACE,aAAA;AFmGN;AE/FE;EACE,kBAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;EACA,oBAAA;EACA,gBAAA;EACA,2BAAA;AFiGJ;AE9FE;EACE,0CAAA;EACA,UAAA;EACA,WAAA;EACA,UAAA;EACA,kBAAA;EACA,6BAAA;EACA,iCAAA;EACA,eAAA;EACA,cAAA;EACA,+CAAA;EACA,gBAAA;AFgGJ;AE9FI;EACE,aAAA;AFgGN;AE7FI;EAEE,uBAAA;EACA,0CAAA;AF8FN;AE3FI;EACE,uBAAA;AF6FN;AEzFE;EACE,YAAA;EACA,iBAAA;EACA,oBAAA;AF2FJ;AExFE;EACE,gBAAA;EACA,qBAAA;EACA,wBAAA;AF0FJ;;AA5KA;EACE,uBGTM;EHUN,YGNM;EHON,iCAAA;EACA,eGJM;AHmLR;;AA5KA;EACE,eAAA;EACA,oCAAA;EACA,YAAA;EACA,aAAA;EACA,UAAA;EIjBA,aAAA;EACA,uBJiBc;EIhBd,mBJgBsB;EIftB,mBAJwC;AJqM1C;;AA/KA;EACE,eGfM;EHgBN,cGxBO;EHyBP,YAAA;AAkLF;;AA9KA;EI5BE,aAAA;EACA,uBJ4Bc;EI3Bd,mBJ2BsB;EI1BtB,sBJ0B8B;EIT9B,gHAAA;EACA,2BJSyB;EIRzB,sBAAA;EACA,4BAAA;EJQA,aAAA;AAuLF;AArLE;EACE,wCAAA;EACA,eG3BM;EH4BN,iBAAA;EACA,YAAA;AAuLJ;AApLE;EIxCA,aAAA;EACA,6BJwCgB;EIvChB,mBJuC8B;EItC9B,sBJsCsC;EACpC,iDGhCc;EHiCd,uBG9CI;EH+CJ,YAAA;EACA,WAAA;EACA,WAAA;AAyLJ;AAvLI;EACE,mBAAA;EACA,kBAAA;EACA,eAAA;AAyLN;AAtLI;EI/CF,uBDVM;ECWN,iBAAA;EACA,cAAA;EACA,YAAA;EACA,eAAA;EJ6CI,cAAA;AA4LN;AIvOE;EACE,uBDbI;ECcJ,YDlBI;AH2PR;AA7LE;EACE,cG7DK;EH8DL,uBGhEI;EHiEJ,iDGpDc;EHqDd,YAAA;EACA,aAAA;AA+LJ;;AA1LA;EACE,yBGxEK;ECEL,aAAA;EACA,8BJsEc;EIrEd,qBJqE6B;EIpE7B,mBAJwC;EJyExC,oBAAA;EACA,YAAA;AAgMF;AA9LE;EI3EA,aAAA;EACA,yBJ2EgB;EI1EhB,uBJ0E0B;EIzE1B,sBJyEsC;EACpC,UAAA;EACA,gBAAA;AAmMJ;AAjMI;EACE,YGpFE;EHqFF,wCAAA;EACA,eG3EI;EH4EJ,iBAAA;EACA,YAAA;AAmMN;AAhMI;EACE,eGpFE;EHqFF,cAAA;AAkMN;AA9LE;EI9FA,aAAA;EACA,yBJ8FgB;EI7FhB,mBJ6F0B;EI5F1B,mBAJwC;EJiGtC,UAAA;AAmMJ;AAjMI;EACE,uBGtGE;ECGN,aAAA;EACA,uBJmGkB;EIlGlB,mBJkG0B;EIjG1B,mBAJwC;EJsGpC,UAAA;AAsMN;AApMM;EIhGJ,uBDVM;ECWN,iBAAA;EACA,cAAA;EACA,YAAA;EACA,eAAA;EJ8FM,YAAA;EACA,cAAA;EACA,SAAA;AA0MR;AIxSE;EACE,uBDbI;ECcJ,YDlBI;AH4TR;AA1MI;EACE,aAAA;EACA,UAAA;EACA,SAAA;AA4MN;;AAtMA;EIxHE,aAAA;EACA,uBJwHc;EIvHd,mBJuHsB;EItHtB,sBJsH8B;EAC9B,YAAA;EACA,YAAA;AA4MF;AA1ME;EACE,uBGjII;EHkIJ,uBAAA;EACA,iDGtHc;EHuHd,UAAA;EACA,YAAA;EACA,gBAAA;AA4MJ;AA1MI;EIrIF,aAAA;EACA,6BJqIkB;EIpIlB,mBJoIgC;EInIhC,mBAJwC;EJwIpC,WAAA;AA+MN;AA7MM;EIzIJ,aAAA;EACA,6BJyIoB;EIxIpB,uBJwIkC;EIvIlC,sBJuI8C;EACxC,WAAA;EACA,UAAA;AAkNR;AAhNQ;EACE,eGvIA;EHwIA,iBAAA;AAkNV;AA/MQ;EACE,eG/IF;EHgJE,cGrJH;EHsJG,YAAA;AAiNV;AA9MQ;EACE,cG3JD;AH2WT;AA7MQ;EACE,cG5JF;AH2WR;AA3MM;EACE,cAAA;EACA,eAAA;AA6MR;AAzMI;EIxKF,aAAA;EACA,6BJwKkB;EIvKlB,mBJuKgC;EItKhC,sBJsKwC;EACpC,WAAA;EACA,cAAA;AA8MN;AA5MM;EACE,eGxKC;EHyKD,iBAAA;AA8MR;AA3MM;EACE,eG9KA;EH+KA,cGpLD;AHiYP;;AAtMA;EI3LE,aAAA;EACA,6BJ2Lc;EI1Ld,mBJ0L4B;EIzL5B,sBJyLoC;EACpC,YAAA;AA4MF;AA1ME;EACE,YAAA;EIhMF,aAAA;EACA,uBJgMgB;EI/LhB,mBJ+LwB;EI9LxB,mBAJwC;AJiZ1C;AA7MI;EACE,eG7LE;AH4YR;AA5MI;EACE,WAAA;EACA,SAAA;AA8MN;AA1ME;EI7MA,aAAA;EACA,6BJ6MgB;EI5MhB,uBJ4M8B;EI3M9B,sBJ2M0C;EACxC,uBGlNI;EHmNJ,iDGtMc;EHuMd,YAAA;EACA,UAAA;EACA,WAAA;AA+MJ;AA7MI;;EAEE,mBAAA;EACA,kBAAA;EACA,eAAA;AA+MN;AA5MI;EACE,cG7NC;AH2aP;AA3MI;EACE,cGjOC;AH8aP;AA1MI;EIpOF,aAAA;EACA,8BJoOkB;EInOlB,mBJmOiC;EIlOjC,mBJkOyC;AA+M3C;AA7MM;EIhOJ,uBDVM;ECWN,iBAAA;EACA,cAAA;EACA,YAAA;EACA,eAAA;EJ8NM,YAAA;AAmNR;AI/aE;EACE,uBDbI;ECcJ,YDlBI;AHmcR;AAnNI;EACE,cG/OG;AHocT;;AA/MA;EIpPE,aAAA;EACA,uBJoPc;EInPd,mBJmPsB;EIlPtB,mBAJwC;EJuPxC,WAAA;EACA,eGnPQ;AHwcV;;AAjNA;EACE,aAAA;AAoNF;;AAjNA;EACE,yBGhQK;AHodP;AAnNE;EACE,uBGjQI;AHsdR;;AAhNA;EACE;IIxQA,aAAA;IACA,6BJwQgB;IIvQhB,mBJuQ8B;IItQ9B,sBJsQsC;EAsNtC;EArNE;II1QF,aAAA;IACA,uBJ0QkB;IIzQlB,mBJyQ0B;IIxQ1B,sBJwQkC;IAC9B,WAAA;IACA,eAAA;EA0NJ;EAxNE;II/QF,aAAA;IACA,uBJ+QkB;II9QlB,mBJ8Q0B;II7Q1B,mBAJwC;IJkRpC,WAAA;EA6NJ;EA5NI;IACE,UAAA;EA8NN;;EAxNE;IIzRF,aAAA;IACA,uBJyRkB;IIxRlB,mBJwR0B;IIvR1B,sBJuRkC;EA8NlC;EA7NI;II3RJ,aAAA;IACA,uBJ2RoB;II1RpB,mBJ0R4B;IIzR5B,8BJyRoC;IAC9B,WAAA;EAkON;EAjOM;IACE,cAAA;IACA,eAAA;IACA,YAAA;EAmOR;EAjOM;IInSN,aAAA;IACA,uBJmSsB;IIlStB,mBJkS8B;IIjS9B,sBJiSsC;IAC9B,UAAA;EAsOR;EArOQ;IACE,eGhSJ;EHugBN;EAnOI;II3SJ,aAAA;IACA,6BJ2SoB;II1SpB,mBJ0SkC;IIzSlC,sBJyS0C;IACpC,WAAA;IACA,UAAA;EAwON;EAvOM;IACE,eG3SF;EHohBN;;EAlOE;IACE,UAAA;EAqOJ;;EAhOE;II7TF,aAAA;IACA,uBJ6TkB;II5TlB,mBJ4T0B;II3T1B,sBJ2TkC;EAsOlC;EArOI;IACE,UAAA;EAuON;EApOE;IACE,UAAA;EAsOJ;EArOI;IIrUJ,aAAA;IACA,6BJqUoB;IIpUpB,uBJoUkC;IInUlC,sBJmU8C;EA0O9C;EAzOM;IACE,YAAA;EA2OR;AACF;AApOA;EACE;IIjVA,aAAA;IACA,6BJiVgB;IIhVhB,mBJgV8B;II/U9B,sBJ+UsC;IACpC,YAAA;EAyOF;EAxOE;IIpVF,aAAA;IACA,uBJoVkB;IInVlB,mBJmV0B;IIlV1B,sBJkVkC;IAC9B,WAAA;IACA,eAAA;EA6OJ;EA5OI;IACE,eGlVA;EHgkBN;EA3OE;II5VF,aAAA;IACA,uBJ4VkB;II3VlB,mBJ2V0B;II1V1B,sBJ0VkC;IAC9B,WAAA;EAgPJ;EA/OI;IACE,UAAA;EAiPN;;EA5OA;IACE,YAAA;EA+OF;EA9OE;IIvWF,aAAA;IACA,uBJuWkB;IItWlB,mBJsW0B;IIrW1B,sBJqWkC;IAC9B,YAAA;EAmPJ;EAlPI;II1WJ,aAAA;IACA,uBJ0WoB;IIzWpB,mBJyW4B;IIxW5B,8BJwWoC;IAC9B,WAAA;IACA,UAAA;EAuPN;EAtPM;IACE,cAAA;IACA,eAAA;IACA,YAAA;EAwPR;EAtPM;IInXN,aAAA;IACA,uBJmXsB;IIlXtB,mBJkX8B;IIjX9B,sBJiXsC;IAC9B,UAAA;EA2PR;EA1PQ;IACE,eGjXH;IHkXG,iBAAA;EA4PV;EA1PQ;IACE,eGtXJ;EHknBN;EA1PQ;IACE,aAAA;EA4PV;EAxPI;IIlYJ,aAAA;IACA,yBJkYoB;IIjYpB,mBJiY8B;IIhY9B,sBJgYsC;IAChC,WAAA;IACA,UAAA;EA6PN;EA5PM;IACE,eGlYF;IHmYE,mBAAA;IACA,YAAA;EA8PR;;EAvPE;IACE,eG1YE;IH2YF,YAAA;EA0PJ;EAxPE;IACE,UAAA;EA0PJ;EAxPE;IACE,UAAA;IACA,YAAA;IACA,WAAA;EA0PJ;;EAtPA;IACE,YAAA;EAyPF;EAxPE;IIhaF,aAAA;IACA,uBJgakB;II/ZlB,mBJ+Z0B;II9Z1B,sBJ8ZkC;IAC9B,UAAA;EA6PJ;EA5PI;IACE,UAAA;EA8PN;EA5PI;IACE,eGjaC;EH+pBP;EA3PE;IACE,UAAA;EA6PJ;EA5PI;II5aJ,aAAA;IACA,6BJ4aoB;II3apB,uBJ2akC;II1alC,sBJ0a8C;EAiQ9C;EAhQM;IACE,YAAA;EAkQR;;EA5PA;IACE,WAAA;EA+PF;AACF","sourcesContent":["html, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n","// this file is organized by 'page' sections and is nested throughout\n@use '_variables' as *;\n@use '_mixins' as *;\n@import '_normalize';\n@import \"node_modules/@glidejs/glide/src/assets/sass/glide.core\";\n@import \"node_modules/@glidejs/glide/src/assets/sass/glide.theme\";\n\n// basic for all pages\nbody {\n  background-color: $white;\n  color: $black;\n  font-family: 'Nunito', sans-serif;\n  font-size: $small;\n}\n// error modal for error handling with fetchAPIs\n.error-modal {\n  position: fixed;\n  background-color: rgba(0, 0, 0, .5);\n  width:100vw;\n  height: 100vh;\n  z-index: 2;\n  @include flex(center, center);\n}\n\n.error-message {\n  font-size: $large;\n  color: $orange;\n  margin: 10px;\n}\n\n// the landing page: the log in section\n.log-in-section {\n  @include flex(center, center, column);\n  @include backgroundImage(center);\n  height: 100vh;\n\n  h1 {\n    font-family: 'Permanent Marker', cursive;\n    font-size: $x-large;\n    font-weight: bold;\n    margin: 3% 0;\n  }\n\n  .log-in-form {\n    @include flex(space-evenly, center, column);\n    box-shadow: $standard-shadow;\n    background-color: $white;\n    height: 25vh;\n    width: 30vw;\n    padding: 2%;\n\n    input {\n      border-style: solid;\n      border-width: thin;\n      cursor: pointer;\n    }\n\n    .button {\n      @include button();\n      padding: 2% 4%;\n    }\n  }\n  .popup-response {\n    color: $orange;\n    background-color: $white;\n    box-shadow: $standard-shadow;\n    margin: 2% 0;\n    padding: 0.5%;\n  }\n}\n\n// the header to be paired with both the main-page and new-trip\nheader {\n  background-color: $gold;\n  @include flex(space-between, flex-end);\n  padding-bottom: 1.5%;\n  height: 25vh;\n\n  .greeting-cost-container {\n    @include flex(flex-end, flex-start, column);\n    width: 55%;\n    padding-left: 3%;\n\n    h1 {\n      color: $white;\n      font-family: 'Permanent Marker', cursive;\n      font-size: $x-large;\n      font-weight: bold;\n      margin: 1% 0;\n    }\n\n    h2 {\n      font-size: $small;\n      margin: 0.5% 0;\n    }\n  }\n\n  nav {\n    @include flex(flex-end, center);\n    width: 45%;\n\n    .navigation {\n      background-color: $white;\n      @include flex(center, center);\n      width: 33%;\n\n      .navigation-button {\n        @include button();\n        border: none;\n        padding: 5% 5%;\n        margin: 0;\n      }\n    }\n\n    .navigation-icon {\n      padding: 2.5%;\n      width: 16%;\n      margin: 0;\n    }\n  }\n}\n\n// the home-page view (has the above header)\n.home-page-section {\n  @include flex(center, center, column);\n  height: 70vh;\n  width: 100vw;\n\n  .trip-card {\n    background-color: $white;\n    border: solid black 1px;\n    box-shadow: $standard-shadow;\n    width: 70%;\n    height: 65vh;\n    margin-left: 15%;\n\n    .info-image-container {\n      @include flex(space-around, center);\n      height: 75%;\n\n      .destination-status-date-container {\n        @include flex(space-around, flex-start, column);\n        height: 60%;\n        width: 40%;\n\n        h1 {\n          font-size: $x-large;\n          font-weight: bold;\n        }\n\n        p {\n          font-size: $small;\n          color: $grey;\n          margin: 2% 0;\n        }\n\n        .orange {\n          color: $orange;\n        }\n\n        .green {\n          color: $green;\n        }\n      }\n\n      .trip-image {\n        max-width: 50%;\n        max-height: 90%;\n      }\n    }\n\n    .message-cost-container {\n      @include flex(space-around, center, column);\n      height: 25%;\n      padding: 2% 3%;\n\n      p {\n        font-size: $medium;\n        font-weight: bold;\n      }\n\n      .est-cost {\n        font-size: $small;\n        color: $grey;\n      }\n    }\n  }\n}\n\n// new-trip form page view (has the above header)\n.new-trip-form-section {\n  @include flex(space-evenly, center, column);\n  height: 70vh;\n\n  .form-banner {\n    height: 15vh;\n    @include flex(center, center);\n\n    h2 {\n      font-size: $large;\n    }\n\n    img {\n      padding: 1%;\n      width: 6%;\n    }\n  }\n\n  .new-trip-form {\n    @include flex(space-around, flex-start, column);\n    background-color: $white;\n    box-shadow: $standard-shadow;\n    height: 40vh;\n    width: 50%;\n    padding: 2%;\n\n    input,\n    select {\n      border-style: solid;\n      border-width: thin;\n      cursor: pointer;\n    }\n\n    input::placeholder {\n      color: $grey;\n    }\n\n    .light-input {\n      color: $grey;\n    }\n\n    .form-button-container {\n      @include flex(space-between, center, row);\n\n      .button {\n        @include button();\n        margin: 0 2%;\n      }\n    }\n\n    .popup-response {\n      color: $orange;\n    }\n  }\n}\n\n// the footer on every page view\nfooter {\n  @include flex(center, center);\n  height: 4vh;\n  font-size: $x-small;\n}\n\n// other\n.hidden {\n  display: none;\n}\n\n.glide__arrow {\n  background-color: $grey;\n  &:focus {\n    background-color: $black;\n  }\n}\n\n// tablet responsive design\n@media screen and (min-width: 416px) and (max-width: 775px) {\n  header {\n    @include flex(space-evenly, center, column);\n    .greeting-cost-container {\n      @include flex(center, center, column);\n      width: 100%;\n      padding-left: 0;\n    }\n    nav {\n      @include flex(center, center);\n      width: 100%;\n      .navigation {\n        width: 30%;\n      }\n    }\n  }\n\n  .home-page-section {\n    .trip-card {\n      @include flex(center, center, column);\n      .info-image-container {\n        @include flex(center, center, column-reverse);\n        height: 80%;\n        .trip-image {\n          max-width: 90%;\n          max-height: 75%;\n          margin: 3% 0;\n        }\n        .destination-status-date-container {\n          @include flex(center, center, column);\n          width: 90%;\n          h1 {\n            font-size: $large;\n          }\n        }\n      }\n      .message-cost-container {\n        @include flex(space-evenly, center, column);\n        height: 20%;\n        width: 90%;\n        p {\n          font-size: $small;\n        }\n      }\n    }\n  }\n\n  .log-in-section {\n    .log-in-form {\n      width: 60%;\n    }\n  }\n\n  .new-trip-form-section {\n    .form-banner {\n      @include flex(center, center, column);\n      img {\n        width: 15%;\n      }\n    }\n    .new-trip-form {\n      width: 75%;\n      .form-button-container {\n        @include flex(space-evenly, flex-start, column);\n        .button {\n          margin: 2% 0;\n        }\n      }\n    }\n  }\n}\n\n// mobile responsive\n@media screen and (max-width: 415px) {\n  header {\n    @include flex(space-evenly, center, column);\n    height: 33vh;\n    .greeting-cost-container {\n      @include flex(center, center, column);\n      width: 100%;\n      padding-left: 0;\n      h1 {\n        font-size: $large;\n      }\n    }\n    nav {\n      @include flex(center, center, column);\n      width: 100%;\n      .navigation {\n        width: 40%;\n      }\n    }\n  }\n\n  .home-page-section {\n    height: 65vh;\n    .trip-card {\n      @include flex(center, center, column);\n      height: 100%;\n      .info-image-container {\n        @include flex(center, center, column-reverse);\n        height: 75%;\n        width: 90%;\n        .trip-image {\n          max-width: 90%;\n          max-height: 75%;\n          margin: 2% 0;\n        }\n        .destination-status-date-container {\n          @include flex(center, center, column);\n          width: 96%;\n          h1 {\n            font-size: $medium;\n            font-weight: bold;\n          }\n          p {\n            font-size: $small;\n          }\n          .trip-messages {\n            display: none;\n          }\n        }\n      }\n      .message-cost-container {\n        @include flex(flex-end, center, column);\n        height: 25%;\n        width: 90%;\n        p {\n          font-size: $small;\n          font-weight: normal;\n          margin: 2% 0;\n        }\n      }\n    }\n  }\n\n  .log-in-section {\n    h1 {\n      font-size: $large;\n      margin: 5% 0;\n    }\n    .log-in-form {\n      width: 80%;\n    }\n    .popup-response {\n      width: 75%;\n      margin: 5% 0;\n      padding: 1%;\n    }\n  }\n\n  .new-trip-form-section {\n    height: 65vh;\n    .form-banner {\n      @include flex(center, center, column);\n      width: 90%;\n      img {\n        width: 15%;\n      }\n      h2 {\n        font-size: $medium;\n      }\n    }\n    .new-trip-form {\n      width: 75%;\n      .form-button-container {\n        @include flex(space-evenly, flex-start, column);\n        .button {\n          margin: 1% 0;\n        }\n      }\n    }\n  }\n\n  footer {\n    height: 2vh;\n  }\n}\n","@import \"variables\";\r\n\r\n.#{$glide-class} {\r\n  $this: &;\r\n\r\n  $se: $glide-element-separator;\r\n  $sm: $glide-modifier-separator;\r\n\r\n  position: relative;\r\n  width: 100%;\r\n  box-sizing: border-box;\r\n\r\n  * {\r\n    box-sizing: inherit;\r\n  }\r\n\r\n  &#{$se}track {\r\n    overflow: hidden;\r\n  }\r\n\r\n  &#{$se}slides {\r\n    position: relative;\r\n    width: 100%;\r\n    list-style: none;\r\n    backface-visibility: hidden;\r\n    transform-style: preserve-3d;\r\n    touch-action: pan-Y;\r\n    overflow: hidden;\r\n    padding: 0;\r\n    white-space: nowrap;\r\n    display: flex;\r\n    flex-wrap: nowrap;\r\n    will-change: transform;\r\n\r\n    &#{$glide-modifier-separator}dragging {\r\n      user-select: none;\r\n    }\r\n  }\r\n\r\n  &#{$se}slide {\r\n    width: 100%;\r\n    height: 100%;\r\n    flex-shrink: 0;\r\n    white-space: normal;\r\n    user-select: none;\r\n    -webkit-touch-callout: none;\r\n    -webkit-tap-highlight-color: transparent;\r\n\r\n    a {\r\n      user-select: none;\r\n      -webkit-user-drag: none;\r\n      -moz-user-select: none;\r\n      -ms-user-select: none;\r\n    }\r\n  }\r\n\r\n  &#{$se}arrows {\r\n    -webkit-touch-callout: none;\r\n    user-select: none;\r\n  }\r\n\r\n  &#{$se}bullets {\r\n    -webkit-touch-callout: none;\r\n    user-select: none;\r\n  }\r\n\r\n  &#{$sm}rtl {\r\n    direction: rtl;\r\n  }\r\n}\r\n","@import 'variables';\r\n\r\n.#{$glide-class} {\r\n  $this: &;\r\n\r\n  $se: $glide-element-separator;\r\n  $sm: $glide-modifier-separator;\r\n\r\n  &#{$se}arrow {\r\n    position: absolute;\r\n    display: block;\r\n    top: 50%;\r\n    z-index: 2;\r\n    color: white;\r\n    text-transform: uppercase;\r\n    padding: 9px 12px;\r\n    background-color: transparent;\r\n    border: 2px solid rgba(255, 255, 255, 0.5);\r\n    border-radius: 4px;\r\n    box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.1);\r\n    text-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.1);\r\n    opacity: 1;\r\n    cursor: pointer;\r\n    transition: opacity 150ms ease, border 300ms ease-in-out;\r\n    transform: translateY(-50%);\r\n    line-height: 1;\r\n\r\n    &:focus { outline: none; }\r\n    &:hover { border-color: white; }\r\n\r\n    &#{$sm}left {\r\n      left: 2em;\r\n    }\r\n\r\n    &#{$sm}right {\r\n      right: 2em;\r\n    }\r\n\r\n    &#{$sm}disabled {\r\n      opacity: 0.33;\r\n    }\r\n  }\r\n\r\n  &#{$se}bullets {\r\n    position: absolute;\r\n    z-index: 2;\r\n    bottom: 2em;\r\n    left: 50%;\r\n    display: inline-flex;\r\n    list-style: none;\r\n    transform: translateX(-50%);\r\n  }\r\n\r\n  &#{$se}bullet {\r\n    background-color: rgba(255, 255, 255, 0.5);\r\n    width: 9px;\r\n    height: 9px;\r\n    padding: 0;\r\n    border-radius: 50%;\r\n    border: 2px solid transparent;\r\n    transition: all 300ms ease-in-out;\r\n    cursor: pointer;\r\n    line-height: 0;\r\n    box-shadow: 0 0.25em 0.5em 0 rgba(0, 0, 0, 0.1);\r\n    margin: 0 0.25em;\r\n\r\n    &:focus {\r\n      outline: none;\r\n    }\r\n\r\n    &:hover,\r\n    &:focus {\r\n      border: 2px solid white;\r\n      background-color: rgba(255, 255, 255, 0.5);\r\n    }\r\n\r\n    &#{$sm}active {\r\n      background-color: white;\r\n    }\r\n  }\r\n\r\n  &#{$sm}swipeable {\r\n    cursor: grab;\r\n    cursor: -moz-grab;\r\n    cursor: -webkit-grab;\r\n  }\r\n\r\n  &#{$sm}dragging {\r\n    cursor: grabbing;\r\n    cursor: -moz-grabbing;\r\n    cursor: -webkit-grabbing;\r\n  }\r\n}\r\n","$white: white;\n$gold: #A87C02;\n$orange: #BA4315;\n$grey: #545E66;\n$black: black;\n$green: #2E824F;\n\n$x-small: 12px;\n$small: 18px;\n$medium: 25px;\n$large: 35px;\n$x-large: 60px;\n\n$standard-shadow: 3px 0 8px $grey, -2px 0 5px $grey;\n","@use '_variables' as *;\n\n@mixin flex($justify, $align, $direction: row) {\n  display: flex;\n  justify-content: $justify;\n  align-items: $align;\n  flex-direction: $direction;\n}\n\n@mixin button() {\n  background-color: $white;\n  font-weight: bold;\n  padding: 3% 5%;\n  margin: 0 5%;\n  cursor: pointer;\n\n  &:hover {\n    background-color: $black;\n    color: $white;\n  }\n}\n\n@mixin backgroundImage($position) {\n  background-image: url('https://wallpaperboat.com/wp-content/uploads/2020/06/03/42432/blue-cloud-19-920x518.jpg');\n  background-position: $position;\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/passport-icon.png");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/home-icon.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/ticket-icon.png");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/logout-icon.png");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/traveling-icon.png");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _error_handling_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);


let apiCalls = {

  getData(dataUrl, dataObjName) {
    const retrievedData = fetch(dataUrl)
      .then(res => {
        _error_handling_js__WEBPACK_IMPORTED_MODULE_0__.default.checkStatus(res, `There was an error connecting to ${dataUrl}.`);
        return res.json();
      })
      .then(data => data[dataObjName])
      .catch(err => {
        if (err.message === "Failed to fetch") {
          _error_handling_js__WEBPACK_IMPORTED_MODULE_0__.default.connectionErr(err, "Couldn't connect to database.");
        } else {
          _error_handling_js__WEBPACK_IMPORTED_MODULE_0__.default.connectionErr(err);
        }
      });
    return retrievedData;
  },

  getAllData() {
    const fetchedUsers = this.getData('http://localhost:3001/api/v1/travelers', 'travelers');
    const fetchedTrips = this.getData('http://localhost:3001/api/v1/trips', 'trips');
    const fetchedDestinations = this.getData('http://localhost:3001/api/v1/destinations', 'destinations');
    const allPromise = Promise.all([fetchedUsers, fetchedTrips, fetchedDestinations]);
    return allPromise;
  },

  postData(url, newData) {
    const postedData = fetch(url, {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        _error_handling_js__WEBPACK_IMPORTED_MODULE_0__.default.checkStatus(response);
        return response.json();
      })
      .catch(err => _error_handling_js__WEBPACK_IMPORTED_MODULE_0__.default.connectionErr(err));
    return postedData;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiCalls);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const errorMessage = document.querySelector('#errorMessage');
const errorModal = document.querySelector('#errorModal');
const errorButton = document.querySelector('#errorButton');

let errorHandling = {
  hideErrorModal() {
    errorModal.classList.add('hidden');
  },

  connectionErr(err, customMessage) {
    errorMessage.innerText = customMessage || err.message;
    errorModal.classList.remove('hidden');
  },

  checkStatus(res, customMessage) {
    if (!res.ok) {
      throw new Error(customMessage);
    }
  }
};

errorButton.addEventListener("click", errorHandling.hideErrorModal);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (errorHandling);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Trip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);


class UserRepository {
  constructor(user, tripData, destinationData) {
    this.user = user;
    this.trips = tripData;
    this.destinations = destinationData;
    this.message = '';
    this.totalYearCost = 0;
    this.totalAllTimeCost = 0;
    this.updatedTrips = [];
  }

  determineMessage() {
    const expr = this.user.travelerType;
    switch (expr) {
    case 'foodie':
      this.message = 'some amazing dishes!';
      break;
    case 'thrill-seeker':
      this.message = 'heart-racing adventure!';
      break;
    case 'photographer':
      this.message = 'some amazing views!';
      break;
    case 'relaxer':
      this.message = 'relaxing experiences.';
      break;
    case 'shopper':
      this.message = 'some unique souvenirs!';
      break;
    case 'history buff':
      this.message = 'learning interesting new things!';
      break;
    default:
      this.message = 'awesome memories!';
      break;
    }
  }

  createTrips() {
    this.trips.forEach((trip) => {
      if (trip.userID === this.user.id) {
        let newTrip = new _Trip__WEBPACK_IMPORTED_MODULE_0__.default(trip, this.destinations);
        this.updatedTrips.push(newTrip);
      }
    });
    this.updatedTrips.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  calculateTotalYearCost() {
    this.totalYearCost = this.updatedTrips.reduce((total, trip) => {
      if (new Date("2021/01/01") <= new Date(trip.date) && new Date(trip.date) < new Date("2022/01/01")) {
        trip.calculateEstCost();
        trip.calculateAgentPercent();
        trip.calculateTotalCost();
        total += trip.totalCost;
      }
      return total;
    }, 0);
  }

  calculateAllTimeCost() {
    this.totalAllTimeCost = this.updatedTrips.reduce((total, trip) => {
      trip.calculateEstCost();
      trip.calculateAgentPercent();
      trip.calculateTotalCost();
      total += trip.totalCost;
      return total;
    }, 0);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserRepository);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Trip {
  constructor(trip, destinations) {
    this.id = trip.id;
    this.status = trip.status;
    this.date = trip.date;
    this.duration = trip.duration;
    this.travelers = trip.travelers;
    this.destination = destinations
      .find(entry => entry.id === trip.destinationID).destination;
    this.img = destinations.find(entry => entry.id === trip.destinationID).image;
    this.alt = destinations.find(entry => entry.id === trip.destinationID).alt;
    this.estimatedLodgingCostPerDay = destinations
      .find(entry => entry.id === trip.destinationID).estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = destinations
      .find(entry => entry.id === trip.destinationID).estimatedFlightCostPerPerson;
    this.estCost = 0;
    this.agentPercent = 0;
    this.totalCost = 0;
  }

  calculateEstCost() {
    this.estCost = (this.duration * this.estimatedLodgingCostPerDay)
      + (this.travelers * this.estimatedFlightCostPerPerson);
  }

  calculateAgentPercent() {
    this.agentPercent = this.estCost * 0.1;
  }

  calculateTotalCost() {
    this.totalCost = this.estCost + this.agentPercent;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trip);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domUpdates": () => (/* binding */ domUpdates),
/* harmony export */   "dateInput": () => (/* binding */ dateInput),
/* harmony export */   "durationInput": () => (/* binding */ durationInput),
/* harmony export */   "travelersInput": () => (/* binding */ travelersInput),
/* harmony export */   "destinationInput": () => (/* binding */ destinationInput)
/* harmony export */ });
/* harmony import */ var _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);



// global
let myGlideSlider;
let pendingColorUpdate = 'green';

// query header elements:
const welcomeBanner = document.querySelector('#welcomeBanner');
const yearCostBanner = document.querySelector('#yearCostBanner');
const allTimeCostBanner = document.querySelector('#allTimeCostBanner');
const totalNumberBanner = document.querySelector('#totalNumberBanner');
const header = document.querySelector('#header');

// query page sections
const homePage = document.querySelector('#homePage');
const formPage = document.querySelector('#formPage');
const footer = document.querySelector('#footer');

// query form elements
const dateInput = document.querySelector('#dateInput');
const durationInput = document.querySelector('#durationInput');
const travelersInput = document.querySelector('#travelersInput');
const destinationInput = document.querySelector('#destinationInput');
const formMessage = document.querySelector('#formMessage');
const newTripForm = document.querySelector('#newTripForm');

// query log in elements
const logInResponse = document.querySelector('#logInResponse');
const logInForm = document.querySelector('#logInForm');
const logInPage = document.querySelector('#logInPage');

// query glide elements:
const glideSlides = document.querySelector('#glideSlides');

// number formatter
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

let domUpdates = {
  updateHeader(userRepo) {
    const firstName = userRepo.user.name.split(' ')[0];
    welcomeBanner.innerText = ` ${firstName}`;
    const totalYear = formatter.format(userRepo.totalYearCost);
    const totalAllTime = formatter.format(userRepo.totalAllTimeCost);
    yearCostBanner.innerText = `${totalYear}`;
    totalNumberBanner.innerText = `${userRepo.updatedTrips.length}`;
    allTimeCostBanner.innerText = `${totalAllTime}`;
  },

  formatDates(startDate) {
    let start = new Date(startDate);
    let startDay = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(start);
    let endDay = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(startDay).add(7, 'day');
    startDay = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(startDay).format('dddd, MMM DD, YYYY');
    endDay = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(endDay).format('MMM DD, YYYY');
    return startDay + ' to ' + endDay;
  },

  populateCarousel(userRepo) {
    glideSlides.innerHTML = '';
    userRepo.updatedTrips.forEach((trip) => {
      let tripEstCost = formatter.format(trip.estCost);
      let tripAgentPercent = formatter.format(trip.agentPercent);
      let dates = this.formatDates(trip.date);
      if (trip.status === 'pending') {
        pendingColorUpdate = 'orange';
      } else {
        pendingColorUpdate = 'green';
      }
      glideSlides.innerHTML += `
        <li class="glide__slide">
          <article class="trip-card">
            <div class="info-image-container">
              <div class="destination-status-date-container">
                <h1>${trip.destination}</h1>
                <div>
                  <p class="trip-messages">We hope it's full of ${userRepo.message}</p>
                  <p class="${pendingColorUpdate}">Trip Status: ${trip.status}</p>
                </div>
              </div>
              <img class="trip-image" src=${trip.img} alt=${trip.alt}>
            </div>
            <div class="message-cost-container">
              <p>${dates}</p>
              <p class="est-cost">Estimated Trip Cost: ${tripEstCost}, plus a 10% agent fee: ${tripAgentPercent}</p>
            </div>
          </article>
        </li>`;
    });
    myGlideSlider = new _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__.default('.glide').mount({ Controls: _glidejs_glide_dist_glide_modular_esm__WEBPACK_IMPORTED_MODULE_0__.Controls });
  },

  navigateToHome() {
    homePage.classList.remove('hidden');
    header.classList.remove('hidden');
    footer.classList.remove('hidden');
    formPage.classList.add('hidden');
    myGlideSlider.update();
  },

  navigateToForm() {
    homePage.classList.add('hidden');
    formPage.classList.remove('hidden');
  },

  populateDestinationOptions(destinations) {
    destinationInput.innerHTML = `<option value="">--Please choose an option--</option>`;
    destinations.forEach((place) => {
      destinationInput.innerHTML += `<option value="${place.id}">${place.destination}</option>`;
    });
  },

  displayEstimatedRequestedTripCost(cost) {
    let newCost = formatter.format(cost);
    formMessage.innerText = `The estimated trip cost, which includes the 10% agent fee, is ${newCost}.`;
    formMessage.classList.remove('hidden');
  },

  hideMessage() {
    formMessage.classList.add('hidden');
  },

  displayInvalidInputMessage() {
    formMessage.innerText = `Please check that all inputs are filled in correctly.`;
    formMessage.classList.remove('hidden');
  },

  displaySuccessMessageUponPost(duration, place) {
    formMessage.innerText = `Your ${duration} day trip to ${place} has been requested.`;
    formMessage.classList.remove('hidden');
    setTimeout(() => {
      this.formReset();
    }, 3000);
    setTimeout(() => {
      this.navigateToHome();
    }, 3000);
  },

  formReset() {
    newTripForm.reset();
    this.hideMessage();
  },

  showErrorForLogIn() {
    logInResponse.classList.remove('hidden');
    logInForm.reset();
  },

  hideLogIn() {
    logInPage.classList.add('hidden');
    logInResponse.classList.add('hidden');
    logInForm.reset();
  },

  redirectToLogInPage() {
    header.classList.add('hidden');
    homePage.classList.add('hidden');
    formPage.classList.add('hidden');
    footer.classList.add('hidden');
    logInPage.classList.remove('hidden');
  }
};




/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "Swipe": () => (/* binding */ swipe),
/* harmony export */   "Images": () => (/* binding */ images),
/* harmony export */   "Anchors": () => (/* binding */ anchors),
/* harmony export */   "Controls": () => (/* binding */ controls),
/* harmony export */   "Keyboard": () => (/* binding */ keyboard),
/* harmony export */   "Autoplay": () => (/* binding */ autoplay),
/* harmony export */   "Breakpoints": () => (/* binding */ breakpoints)
/* harmony export */ });
/*!
 * Glide.js v3.4.1
 * (c) 2013-2019 Jędrzej Chałubek <jedrzej.chalubek@gmail.com> (http://jedrzejchalubek.com/)
 * Released under the MIT License.
 */

var defaults = {
  /**
   * Type of the movement.
   *
   * Available types:
   * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
   * `carousel` - Changes slides without starting over when it reaches the first or last slide.
   *
   * @type {String}
   */
  type: 'slider',

  /**
   * Start at specific slide number defined with zero-based index.
   *
   * @type {Number}
   */
  startAt: 0,

  /**
   * A number of slides visible on the single viewport.
   *
   * @type {Number}
   */
  perView: 1,

  /**
   * Focus currently active slide at a specified position in the track.
   *
   * Available inputs:
   * `center` - Current slide will be always focused at the center of a track.
   * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
   *
   * @type {String|Number}
   */
  focusAt: 0,

  /**
   * A size of the gap added between slides.
   *
   * @type {Number}
   */
  gap: 10,

  /**
   * Change slides after a specified interval. Use `false` for turning off autoplay.
   *
   * @type {Number|Boolean}
   */
  autoplay: false,

  /**
   * Stop autoplay on mouseover event.
   *
   * @type {Boolean}
   */
  hoverpause: true,

  /**
   * Allow for changing slides with left and right keyboard arrows.
   *
   * @type {Boolean}
   */
  keyboard: true,

  /**
   * Stop running `perView` number of slides from the end. Use this
   * option if you don't want to have an empty space after
   * a slider. Works only with `slider` type and a
   * non-centered `focusAt` setting.
   *
   * @type {Boolean}
   */
  bound: false,

  /**
   * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
   *
   * @type {Number|Boolean}
   */
  swipeThreshold: 80,

  /**
   * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
   *
   * @type {Number|Boolean}
   */
  dragThreshold: 120,

  /**
   * A maximum number of slides to which movement will be made on swiping or dragging. Use `false` for unlimited.
   *
   * @type {Number|Boolean}
   */
  perTouch: false,

  /**
   * Moving distance ratio of the slides on a swiping and dragging.
   *
   * @type {Number}
   */
  touchRatio: 0.5,

  /**
   * Angle required to activate slides moving on swiping or dragging.
   *
   * @type {Number}
   */
  touchAngle: 45,

  /**
   * Duration of the animation in milliseconds.
   *
   * @type {Number}
   */
  animationDuration: 400,

  /**
   * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
   *
   * @type {Boolean}
   */
  rewind: true,

  /**
   * Duration of the rewinding animation of the `slider` type in milliseconds.
   *
   * @type {Number}
   */
  rewindDuration: 800,

  /**
   * Easing function for the animation.
   *
   * @type {String}
   */
  animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',

  /**
   * Throttle costly events at most once per every wait milliseconds.
   *
   * @type {Number}
   */
  throttle: 10,

  /**
   * Moving direction mode.
   *
   * Available inputs:
   * - 'ltr' - left to right movement,
   * - 'rtl' - right to left movement.
   *
   * @type {String}
   */
  direction: 'ltr',

  /**
   * The distance value of the next and previous viewports which
   * have to peek in the current view. Accepts number and
   * pixels as a string. Left and right peeking can be
   * set up separately with a directions object.
   *
   * For example:
   * `100` - Peek 100px on the both sides.
   * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
   *
   * @type {Number|String|Object}
   */
  peek: 0,

  /**
   * Collection of options applied at specified media breakpoints.
   * For example: display two slides per view under 800px.
   * `{
   *   '800px': {
   *     perView: 2
   *   }
   * }`
   */
  breakpoints: {},

  /**
   * Collection of internally used HTML classes.
   *
   * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
   * @type {Object}
   */
  classes: {
    direction: {
      ltr: 'glide--ltr',
      rtl: 'glide--rtl'
    },
    slider: 'glide--slider',
    carousel: 'glide--carousel',
    swipeable: 'glide--swipeable',
    dragging: 'glide--dragging',
    cloneSlide: 'glide__slide--clone',
    activeNav: 'glide__bullet--active',
    activeSlide: 'glide__slide--active',
    disabledArrow: 'glide__arrow--disabled'
  }
};

/**
 * Outputs warning message to the bowser console.
 *
 * @param  {String} msg
 * @return {Void}
 */
function warn(msg) {
  console.error("[Glide warn]: " + msg);
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Converts value entered as number
 * or string to integer value.
 *
 * @param {String} value
 * @returns {Number}
 */
function toInt(value) {
  return parseInt(value);
}

/**
 * Converts value entered as number
 * or string to flat value.
 *
 * @param {String} value
 * @returns {Number}
 */
function toFloat(value) {
  return parseFloat(value);
}

/**
 * Indicates whether the specified value is a string.
 *
 * @param  {*}   value
 * @return {Boolean}
 */
function isString(value) {
  return typeof value === 'string';
}

/**
 * Indicates whether the specified value is an object.
 *
 * @param  {*} value
 * @return {Boolean}
 *
 * @see https://github.com/jashkenas/underscore
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

  return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
}

/**
 * Indicates whether the specified value is a number.
 *
 * @param  {*} value
 * @return {Boolean}
 */
function isNumber(value) {
  return typeof value === 'number';
}

/**
 * Indicates whether the specified value is a function.
 *
 * @param  {*} value
 * @return {Boolean}
 */
function isFunction(value) {
  return typeof value === 'function';
}

/**
 * Indicates whether the specified value is undefined.
 *
 * @param  {*} value
 * @return {Boolean}
 */
function isUndefined(value) {
  return typeof value === 'undefined';
}

/**
 * Indicates whether the specified value is an array.
 *
 * @param  {*} value
 * @return {Boolean}
 */
function isArray(value) {
  return value.constructor === Array;
}

/**
 * Creates and initializes specified collection of extensions.
 * Each extension receives access to instance of glide and rest of components.
 *
 * @param {Object} glide
 * @param {Object} extensions
 *
 * @returns {Object}
 */
function mount(glide, extensions, events) {
  var components = {};

  for (var name in extensions) {
    if (isFunction(extensions[name])) {
      components[name] = extensions[name](glide, components, events);
    } else {
      warn('Extension must be a function');
    }
  }

  for (var _name in components) {
    if (isFunction(components[_name].mount)) {
      components[_name].mount();
    }
  }

  return components;
}

/**
 * Defines getter and setter property on the specified object.
 *
 * @param  {Object} obj         Object where property has to be defined.
 * @param  {String} prop        Name of the defined property.
 * @param  {Object} definition  Get and set definitions for the property.
 * @return {Void}
 */
function define(obj, prop, definition) {
  Object.defineProperty(obj, prop, definition);
}

/**
 * Sorts aphabetically object keys.
 *
 * @param  {Object} obj
 * @return {Object}
 */
function sortKeys(obj) {
  return Object.keys(obj).sort().reduce(function (r, k) {
    r[k] = obj[k];

    return r[k], r;
  }, {});
}

/**
 * Merges passed settings object with default options.
 *
 * @param  {Object} defaults
 * @param  {Object} settings
 * @return {Object}
 */
function mergeOptions(defaults, settings) {
  var options = _extends({}, defaults, settings);

  // `Object.assign` do not deeply merge objects, so we
  // have to do it manually for every nested object
  // in options. Although it does not look smart,
  // it's smaller and faster than some fancy
  // merging deep-merge algorithm script.
  if (settings.hasOwnProperty('classes')) {
    options.classes = _extends({}, defaults.classes, settings.classes);

    if (settings.classes.hasOwnProperty('direction')) {
      options.classes.direction = _extends({}, defaults.classes.direction, settings.classes.direction);
    }
  }

  if (settings.hasOwnProperty('breakpoints')) {
    options.breakpoints = _extends({}, defaults.breakpoints, settings.breakpoints);
  }

  return options;
}

var EventsBus = function () {
  /**
   * Construct a EventBus instance.
   *
   * @param {Object} events
   */
  function EventsBus() {
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, EventsBus);

    this.events = events;
    this.hop = events.hasOwnProperty;
  }

  /**
   * Adds listener to the specifed event.
   *
   * @param {String|Array} event
   * @param {Function} handler
   */


  createClass(EventsBus, [{
    key: 'on',
    value: function on(event, handler) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.on(event[i], handler);
        }
      }

      // Create the event's object if not yet created
      if (!this.hop.call(this.events, event)) {
        this.events[event] = [];
      }

      // Add the handler to queue
      var index = this.events[event].push(handler) - 1;

      // Provide handle back for removal of event
      return {
        remove: function remove() {
          delete this.events[event][index];
        }
      };
    }

    /**
     * Runs registered handlers for specified event.
     *
     * @param {String|Array} event
     * @param {Object=} context
     */

  }, {
    key: 'emit',
    value: function emit(event, context) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.emit(event[i], context);
        }
      }

      // If the event doesn't exist, or there's no handlers in queue, just leave
      if (!this.hop.call(this.events, event)) {
        return;
      }

      // Cycle through events queue, fire!
      this.events[event].forEach(function (item) {
        item(context || {});
      });
    }
  }]);
  return EventsBus;
}();

var Glide = function () {
  /**
   * Construct glide.
   *
   * @param  {String} selector
   * @param  {Object} options
   */
  function Glide(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Glide);

    this._c = {};
    this._t = [];
    this._e = new EventsBus();

    this.disabled = false;
    this.selector = selector;
    this.settings = mergeOptions(defaults, options);
    this.index = this.settings.startAt;
  }

  /**
   * Initializes glide.
   *
   * @param {Object} extensions Collection of extensions to initialize.
   * @return {Glide}
   */


  createClass(Glide, [{
    key: 'mount',
    value: function mount$$1() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._e.emit('mount.before');

      if (isObject(extensions)) {
        this._c = mount(this, extensions, this._e);
      } else {
        warn('You need to provide a object on `mount()`');
      }

      this._e.emit('mount.after');

      return this;
    }

    /**
     * Collects an instance `translate` transformers.
     *
     * @param  {Array} transformers Collection of transformers.
     * @return {Void}
     */

  }, {
    key: 'mutate',
    value: function mutate() {
      var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (isArray(transformers)) {
        this._t = transformers;
      } else {
        warn('You need to provide a array on `mutate()`');
      }

      return this;
    }

    /**
     * Updates glide with specified settings.
     *
     * @param {Object} settings
     * @return {Glide}
     */

  }, {
    key: 'update',
    value: function update() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.settings = mergeOptions(this.settings, settings);

      if (settings.hasOwnProperty('startAt')) {
        this.index = settings.startAt;
      }

      this._e.emit('update');

      return this;
    }

    /**
     * Change slide with specified pattern. A pattern must be in the special format:
     * `>` - Move one forward
     * `<` - Move one backward
     * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
     * `>>` - Rewinds to end (last slide)
     * `<<` - Rewinds to start (first slide)
     *
     * @param {String} pattern
     * @return {Glide}
     */

  }, {
    key: 'go',
    value: function go(pattern) {
      this._c.Run.make(pattern);

      return this;
    }

    /**
     * Move track by specified distance.
     *
     * @param {String} distance
     * @return {Glide}
     */

  }, {
    key: 'move',
    value: function move(distance) {
      this._c.Transition.disable();
      this._c.Move.make(distance);

      return this;
    }

    /**
     * Destroy instance and revert all changes done by this._c.
     *
     * @return {Glide}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this._e.emit('destroy');

      return this;
    }

    /**
     * Start instance autoplaying.
     *
     * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Glide}
     */

  }, {
    key: 'play',
    value: function play() {
      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (interval) {
        this.settings.autoplay = interval;
      }

      this._e.emit('play');

      return this;
    }

    /**
     * Stop instance autoplaying.
     *
     * @return {Glide}
     */

  }, {
    key: 'pause',
    value: function pause() {
      this._e.emit('pause');

      return this;
    }

    /**
     * Sets glide into a idle status.
     *
     * @return {Glide}
     */

  }, {
    key: 'disable',
    value: function disable() {
      this.disabled = true;

      return this;
    }

    /**
     * Sets glide into a active status.
     *
     * @return {Glide}
     */

  }, {
    key: 'enable',
    value: function enable() {
      this.disabled = false;

      return this;
    }

    /**
     * Adds cuutom event listener with handler.
     *
     * @param  {String|Array} event
     * @param  {Function} handler
     * @return {Glide}
     */

  }, {
    key: 'on',
    value: function on(event, handler) {
      this._e.on(event, handler);

      return this;
    }

    /**
     * Checks if glide is a precised type.
     *
     * @param  {String} name
     * @return {Boolean}
     */

  }, {
    key: 'isType',
    value: function isType(name) {
      return this.settings.type === name;
    }

    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */

  }, {
    key: 'settings',
    get: function get$$1() {
      return this._o;
    }

    /**
     * Sets value of the core options.
     *
     * @param  {Object} o
     * @return {Void}
     */
    ,
    set: function set$$1(o) {
      if (isObject(o)) {
        this._o = o;
      } else {
        warn('Options must be an `object` instance.');
      }
    }

    /**
     * Gets current index of the slider.
     *
     * @return {Object}
     */

  }, {
    key: 'index',
    get: function get$$1() {
      return this._i;
    }

    /**
     * Sets current index a slider.
     *
     * @return {Object}
     */
    ,
    set: function set$$1(i) {
      this._i = toInt(i);
    }

    /**
     * Gets type name of the slider.
     *
     * @return {String}
     */

  }, {
    key: 'type',
    get: function get$$1() {
      return this.settings.type;
    }

    /**
     * Gets value of the idle status.
     *
     * @return {Boolean}
     */

  }, {
    key: 'disabled',
    get: function get$$1() {
      return this._d;
    }

    /**
     * Sets value of the idle status.
     *
     * @return {Boolean}
     */
    ,
    set: function set$$1(status) {
      this._d = !!status;
    }
  }]);
  return Glide;
}();

function Run (Glide, Components, Events) {
  var Run = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {Void}
     */
    mount: function mount() {
      this._o = false;
    },


    /**
     * Makes glides running based on the passed moving schema.
     *
     * @param {String} move
     */
    make: function make(move) {
      var _this = this;

      if (!Glide.disabled) {
        Glide.disable();

        this.move = move;

        Events.emit('run.before', this.move);

        this.calculate();

        Events.emit('run', this.move);

        Components.Transition.after(function () {
          if (_this.isStart()) {
            Events.emit('run.start', _this.move);
          }

          if (_this.isEnd()) {
            Events.emit('run.end', _this.move);
          }

          if (_this.isOffset('<') || _this.isOffset('>')) {
            _this._o = false;

            Events.emit('run.offset', _this.move);
          }

          Events.emit('run.after', _this.move);

          Glide.enable();
        });
      }
    },


    /**
     * Calculates current index based on defined move.
     *
     * @return {Void}
     */
    calculate: function calculate() {
      var move = this.move,
          length = this.length;
      var steps = move.steps,
          direction = move.direction;


      var countableSteps = isNumber(toInt(steps)) && toInt(steps) !== 0;

      switch (direction) {
        case '>':
          if (steps === '>') {
            Glide.index = length;
          } else if (this.isEnd()) {
            if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
              this._o = true;

              Glide.index = 0;
            }
          } else if (countableSteps) {
            Glide.index += Math.min(length - Glide.index, -toInt(steps));
          } else {
            Glide.index++;
          }
          break;

        case '<':
          if (steps === '<') {
            Glide.index = 0;
          } else if (this.isStart()) {
            if (!(Glide.isType('slider') && !Glide.settings.rewind)) {
              this._o = true;

              Glide.index = length;
            }
          } else if (countableSteps) {
            Glide.index -= Math.min(Glide.index, toInt(steps));
          } else {
            Glide.index--;
          }
          break;

        case '=':
          Glide.index = steps;
          break;

        default:
          warn('Invalid direction pattern [' + direction + steps + '] has been used');
          break;
      }
    },


    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart: function isStart() {
      return Glide.index === 0;
    },


    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */
    isEnd: function isEnd() {
      return Glide.index === this.length;
    },


    /**
     * Checks if we are making a offset run.
     *
     * @param {String} direction
     * @return {Boolean}
     */
    isOffset: function isOffset(direction) {
      return this._o && this.move.direction === direction;
    }
  };

  define(Run, 'move', {
    /**
     * Gets value of the move schema.
     *
     * @returns {Object}
     */
    get: function get() {
      return this._m;
    },


    /**
     * Sets value of the move schema.
     *
     * @returns {Object}
     */
    set: function set(value) {
      var step = value.substr(1);

      this._m = {
        direction: value.substr(0, 1),
        steps: step ? toInt(step) ? toInt(step) : step : 0
      };
    }
  });

  define(Run, 'length', {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide.settings;
      var length = Components.Html.slides.length;

      // If the `bound` option is acitve, a maximum running distance should be
      // reduced by `perView` and `focusAt` settings. Running distance
      // should end before creating an empty space after instance.

      if (Glide.isType('slider') && settings.focusAt !== 'center' && settings.bound) {
        return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
      }

      return length - 1;
    }
  });

  define(Run, 'offset', {
    /**
     * Gets status of the offsetting flag.
     *
     * @return {Boolean}
     */
    get: function get() {
      return this._o;
    }
  });

  return Run;
}

/**
 * Returns a current time.
 *
 * @return {Number}
 */
function now() {
  return new Date().getTime();
}

/**
 * Returns a function, that, when invoked, will only be triggered
 * at most once during a given window of time.
 *
 * @param {Function} func
 * @param {Number} wait
 * @param {Object=} options
 * @return {Function}
 *
 * @see https://github.com/jashkenas/underscore
 */
function throttle(func, wait, options) {
  var timeout = void 0,
      context = void 0,
      args = void 0,
      result = void 0;
  var previous = 0;
  if (!options) options = {};

  var later = function later() {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function throttled() {
    var at = now();
    if (!previous && options.leading === false) previous = at;
    var remaining = wait - (at - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = at;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}

var MARGIN_TYPE = {
  ltr: ['marginLeft', 'marginRight'],
  rtl: ['marginRight', 'marginLeft']
};

function Gaps (Glide, Components, Events) {
  var Gaps = {
    /**
     * Applies gaps between slides. First and last
     * slides do not receive it's edge margins.
     *
     * @param {HTMLCollection} slides
     * @return {Void}
     */
    apply: function apply(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;
        var direction = Components.Direction.value;

        if (i !== 0) {
          style[MARGIN_TYPE[direction][0]] = this.value / 2 + 'px';
        } else {
          style[MARGIN_TYPE[direction][0]] = '';
        }

        if (i !== slides.length - 1) {
          style[MARGIN_TYPE[direction][1]] = this.value / 2 + 'px';
        } else {
          style[MARGIN_TYPE[direction][1]] = '';
        }
      }
    },


    /**
     * Removes gaps from the slides.
     *
     * @param {HTMLCollection} slides
     * @returns {Void}
    */
    remove: function remove(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;

        style.marginLeft = '';
        style.marginRight = '';
      }
    }
  };

  define(Gaps, 'value', {
    /**
     * Gets value of the gap.
     *
     * @returns {Number}
     */
    get: function get() {
      return toInt(Glide.settings.gap);
    }
  });

  define(Gaps, 'grow', {
    /**
     * Gets additional dimentions value caused by gaps.
     * Used to increase width of the slides wrapper.
     *
     * @returns {Number}
     */
    get: function get() {
      return Gaps.value * (Components.Sizes.length - 1);
    }
  });

  define(Gaps, 'reductor', {
    /**
     * Gets reduction value caused by gaps.
     * Used to subtract width of the slides.
     *
     * @returns {Number}
     */
    get: function get() {
      var perView = Glide.settings.perView;

      return Gaps.value * (perView - 1) / perView;
    }
  });

  /**
   * Apply calculated gaps:
   * - after building, so slides (including clones) will receive proper margins
   * - on updating via API, to recalculate gaps with new options
   */
  Events.on(['build.after', 'update'], throttle(function () {
    Gaps.apply(Components.Html.wrapper.children);
  }, 30));

  /**
   * Remove gaps:
   * - on destroying to bring markup to its inital state
   */
  Events.on('destroy', function () {
    Gaps.remove(Components.Html.wrapper.children);
  });

  return Gaps;
}

/**
 * Finds siblings nodes of the passed node.
 *
 * @param  {Element} node
 * @return {Array}
 */
function siblings(node) {
  if (node && node.parentNode) {
    var n = node.parentNode.firstChild;
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== node) {
        matched.push(n);
      }
    }

    return matched;
  }

  return [];
}

/**
 * Checks if passed node exist and is a valid element.
 *
 * @param  {Element} node
 * @return {Boolean}
 */
function exist(node) {
  if (node && node instanceof window.HTMLElement) {
    return true;
  }

  return false;
}

var TRACK_SELECTOR = '[data-glide-el="track"]';

function Html (Glide, Components) {
  var Html = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    mount: function mount() {
      this.root = Glide.selector;
      this.track = this.root.querySelector(TRACK_SELECTOR);
      this.slides = Array.prototype.slice.call(this.wrapper.children).filter(function (slide) {
        return !slide.classList.contains(Glide.settings.classes.cloneSlide);
      });
    }
  };

  define(Html, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get: function get() {
      return Html._r;
    },


    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set: function set(r) {
      if (isString(r)) {
        r = document.querySelector(r);
      }

      if (exist(r)) {
        Html._r = r;
      } else {
        warn('Root element must be a existing Html node');
      }
    }
  });

  define(Html, 'track', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function get() {
      return Html._t;
    },


    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function set(t) {
      if (exist(t)) {
        Html._t = t;
      } else {
        warn('Could not find track element. Please use ' + TRACK_SELECTOR + ' attribute.');
      }
    }
  });

  define(Html, 'wrapper', {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get: function get() {
      return Html.track.children[0];
    }
  });

  return Html;
}

function Peek (Glide, Components, Events) {
  var Peek = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.value = Glide.settings.peek;
    }
  };

  define(Peek, 'value', {
    /**
     * Gets value of the peek.
     *
     * @returns {Number|Object}
     */
    get: function get() {
      return Peek._v;
    },


    /**
     * Sets value of the peek.
     *
     * @param {Number|Object} value
     * @return {Void}
     */
    set: function set(value) {
      if (isObject(value)) {
        value.before = toInt(value.before);
        value.after = toInt(value.after);
      } else {
        value = toInt(value);
      }

      Peek._v = value;
    }
  });

  define(Peek, 'reductor', {
    /**
     * Gets reduction value caused by peek.
     *
     * @returns {Number}
     */
    get: function get() {
      var value = Peek.value;
      var perView = Glide.settings.perView;

      if (isObject(value)) {
        return value.before / perView + value.after / perView;
      }

      return value * 2 / perView;
    }
  });

  /**
   * Recalculate peeking sizes on:
   * - when resizing window to update to proper percents
   */
  Events.on(['resize', 'update'], function () {
    Peek.mount();
  });

  return Peek;
}

function Move (Glide, Components, Events) {
  var Move = {
    /**
     * Constructs move component.
     *
     * @returns {Void}
     */
    mount: function mount() {
      this._o = 0;
    },


    /**
     * Calculates a movement value based on passed offset and currently active index.
     *
     * @param  {Number} offset
     * @return {Void}
     */
    make: function make() {
      var _this = this;

      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.offset = offset;

      Events.emit('move', {
        movement: this.value
      });

      Components.Transition.after(function () {
        Events.emit('move.after', {
          movement: _this.value
        });
      });
    }
  };

  define(Move, 'offset', {
    /**
     * Gets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    get: function get() {
      return Move._o;
    },


    /**
     * Sets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    set: function set(value) {
      Move._o = !isUndefined(value) ? toInt(value) : 0;
    }
  });

  define(Move, 'translate', {
    /**
     * Gets a raw movement value.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Sizes.slideWidth * Glide.index;
    }
  });

  define(Move, 'value', {
    /**
     * Gets an actual movement value corrected by offset.
     *
     * @return {Number}
     */
    get: function get() {
      var offset = this.offset;
      var translate = this.translate;

      if (Components.Direction.is('rtl')) {
        return translate + offset;
      }

      return translate - offset;
    }
  });

  /**
   * Make movement to proper slide on:
   * - before build, so glide will start at `startAt` index
   * - on each standard run to move to newly calculated index
   */
  Events.on(['build.before', 'run'], function () {
    Move.make();
  });

  return Move;
}

function Sizes (Glide, Components, Events) {
  var Sizes = {
    /**
     * Setups dimentions of slides.
     *
     * @return {Void}
     */
    setupSlides: function setupSlides() {
      var width = this.slideWidth + 'px';
      var slides = Components.Html.slides;

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = width;
      }
    },


    /**
     * Setups dimentions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper: function setupWrapper(dimention) {
      Components.Html.wrapper.style.width = this.wrapperSize + 'px';
    },


    /**
     * Removes applied styles from HTML elements.
     *
     * @returns {Void}
     */
    remove: function remove() {
      var slides = Components.Html.slides;

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = '';
      }

      Components.Html.wrapper.style.width = '';
    }
  };

  define(Sizes, 'length', {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.slides.length;
    }
  });

  define(Sizes, 'width', {
    /**
     * Gets width value of the glide.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.root.offsetWidth;
    }
  });

  define(Sizes, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes.slideWidth * Sizes.length + Components.Gaps.grow + Components.Clones.grow;
    }
  });

  define(Sizes, 'slideWidth', {
    /**
     * Gets width value of the single slide.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes.width / Glide.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
    }
  });

  /**
   * Apply calculated glide's dimensions:
   * - before building, so other dimentions (e.g. translate) will be calculated propertly
   * - when resizing window to recalculate sildes dimensions
   * - on updating via API, to calculate dimensions based on new options
   */
  Events.on(['build.before', 'resize', 'update'], function () {
    Sizes.setupSlides();
    Sizes.setupWrapper();
  });

  /**
   * Remove calculated glide's dimensions:
   * - on destoting to bring markup to its inital state
   */
  Events.on('destroy', function () {
    Sizes.remove();
  });

  return Sizes;
}

function Build (Glide, Components, Events) {
  var Build = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     *
     * @return {Void}
     */
    mount: function mount() {
      Events.emit('build.before');

      this.typeClass();
      this.activeClass();

      Events.emit('build.after');
    },


    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */
    typeClass: function typeClass() {
      Components.Html.root.classList.add(Glide.settings.classes[Glide.settings.type]);
    },


    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass: function activeClass() {
      var classes = Glide.settings.classes;
      var slide = Components.Html.slides[Glide.index];

      if (slide) {
        slide.classList.add(classes.activeSlide);

        siblings(slide).forEach(function (sibling) {
          sibling.classList.remove(classes.activeSlide);
        });
      }
    },


    /**
     * Removes HTML classes applied at building.
     *
     * @return {Void}
     */
    removeClasses: function removeClasses() {
      var classes = Glide.settings.classes;

      Components.Html.root.classList.remove(classes[Glide.settings.type]);

      Components.Html.slides.forEach(function (sibling) {
        sibling.classList.remove(classes.activeSlide);
      });
    }
  };

  /**
   * Clear building classes:
   * - on destroying to bring HTML to its initial state
   * - on updating to remove classes before remounting component
   */
  Events.on(['destroy', 'update'], function () {
    Build.removeClasses();
  });

  /**
   * Remount component:
   * - on resizing of the window to calculate new dimentions
   * - on updating settings via API
   */
  Events.on(['resize', 'update'], function () {
    Build.mount();
  });

  /**
   * Swap active class of current slide:
   * - after each move to the new index
   */
  Events.on('move.after', function () {
    Build.activeClass();
  });

  return Build;
}

function Clones (Glide, Components, Events) {
  var Clones = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount: function mount() {
      this.items = [];

      if (Glide.isType('carousel')) {
        this.items = this.collect();
      }
    },


    /**
     * Collect clones with pattern.
     *
     * @return {Void}
     */
    collect: function collect() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var slides = Components.Html.slides;
      var _Glide$settings = Glide.settings,
          perView = _Glide$settings.perView,
          classes = _Glide$settings.classes;


      var peekIncrementer = +!!Glide.settings.peek;
      var part = perView + peekIncrementer;
      var start = slides.slice(0, part);
      var end = slides.slice(-part);

      for (var r = 0; r < Math.max(1, Math.floor(perView / slides.length)); r++) {
        for (var i = 0; i < start.length; i++) {
          var clone = start[i].cloneNode(true);

          clone.classList.add(classes.cloneSlide);

          items.push(clone);
        }

        for (var _i = 0; _i < end.length; _i++) {
          var _clone = end[_i].cloneNode(true);

          _clone.classList.add(classes.cloneSlide);

          items.unshift(_clone);
        }
      }

      return items;
    },


    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append: function append() {
      var items = this.items;
      var _Components$Html = Components.Html,
          wrapper = _Components$Html.wrapper,
          slides = _Components$Html.slides;


      var half = Math.floor(items.length / 2);
      var prepend = items.slice(0, half).reverse();
      var append = items.slice(half, items.length);
      var width = Components.Sizes.slideWidth + 'px';

      for (var i = 0; i < append.length; i++) {
        wrapper.appendChild(append[i]);
      }

      for (var _i2 = 0; _i2 < prepend.length; _i2++) {
        wrapper.insertBefore(prepend[_i2], slides[0]);
      }

      for (var _i3 = 0; _i3 < items.length; _i3++) {
        items[_i3].style.width = width;
      }
    },


    /**
     * Remove all cloned slides.
     *
     * @return {Void}
     */
    remove: function remove() {
      var items = this.items;


      for (var i = 0; i < items.length; i++) {
        Components.Html.wrapper.removeChild(items[i]);
      }
    }
  };

  define(Clones, 'grow', {
    /**
     * Gets additional dimentions value caused by clones.
     *
     * @return {Number}
     */
    get: function get() {
      return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length;
    }
  });

  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */
  Events.on('update', function () {
    Clones.remove();
    Clones.mount();
    Clones.append();
  });

  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */
  Events.on('build.before', function () {
    if (Glide.isType('carousel')) {
      Clones.append();
    }
  });

  /**
   * Remove clones HTMLElements:
   * - on destroying, to bring HTML to its initial state
   */
  Events.on('destroy', function () {
    Clones.remove();
  });

  return Clones;
}

var EventsBinder = function () {
  /**
   * Construct a EventsBinder instance.
   */
  function EventsBinder() {
    var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, EventsBinder);

    this.listeners = listeners;
  }

  /**
   * Adds events listeners to arrows HTML elements.
   *
   * @param  {String|Array} events
   * @param  {Element|Window|Document} el
   * @param  {Function} closure
   * @param  {Boolean|Object} capture
   * @return {Void}
   */


  createClass(EventsBinder, [{
    key: 'on',
    value: function on(events, el, closure) {
      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (isString(events)) {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        this.listeners[events[i]] = closure;

        el.addEventListener(events[i], this.listeners[events[i]], capture);
      }
    }

    /**
     * Removes event listeners from arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Boolean|Object} capture
     * @return {Void}
     */

  }, {
    key: 'off',
    value: function off(events, el) {
      var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (isString(events)) {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        el.removeEventListener(events[i], this.listeners[events[i]], capture);
      }
    }

    /**
     * Destroy collected listeners.
     *
     * @returns {Void}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      delete this.listeners;
    }
  }]);
  return EventsBinder;
}();

function Resize (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  var Resize = {
    /**
     * Initializes window bindings.
     */
    mount: function mount() {
      this.bind();
    },


    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('resize', window, throttle(function () {
        Events.emit('resize');
      }, Glide.settings.throttle));
    },


    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('resize', window);
    }
  };

  /**
   * Remove bindings from window:
   * - on destroying, to remove added EventListener
   */
  Events.on('destroy', function () {
    Resize.unbind();
    Binder.destroy();
  });

  return Resize;
}

var VALID_DIRECTIONS = ['ltr', 'rtl'];
var FLIPED_MOVEMENTS = {
  '>': '<',
  '<': '>',
  '=': '='
};

function Direction (Glide, Components, Events) {
  var Direction = {
    /**
     * Setups gap value based on settings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.value = Glide.settings.direction;
    },


    /**
     * Resolves pattern based on direction value
     *
     * @param {String} pattern
     * @returns {String}
     */
    resolve: function resolve(pattern) {
      var token = pattern.slice(0, 1);

      if (this.is('rtl')) {
        return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
      }

      return pattern;
    },


    /**
     * Checks value of direction mode.
     *
     * @param {String} direction
     * @returns {Boolean}
     */
    is: function is(direction) {
      return this.value === direction;
    },


    /**
     * Applies direction class to the root HTML element.
     *
     * @return {Void}
     */
    addClass: function addClass() {
      Components.Html.root.classList.add(Glide.settings.classes.direction[this.value]);
    },


    /**
     * Removes direction class from the root HTML element.
     *
     * @return {Void}
     */
    removeClass: function removeClass() {
      Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value]);
    }
  };

  define(Direction, 'value', {
    /**
     * Gets value of the direction.
     *
     * @returns {Number}
     */
    get: function get() {
      return Direction._v;
    },


    /**
     * Sets value of the direction.
     *
     * @param {String} value
     * @return {Void}
     */
    set: function set(value) {
      if (VALID_DIRECTIONS.indexOf(value) > -1) {
        Direction._v = value;
      } else {
        warn('Direction value must be `ltr` or `rtl`');
      }
    }
  });

  /**
   * Clear direction class:
   * - on destroy to bring HTML to its initial state
   * - on update to remove class before reappling bellow
   */
  Events.on(['destroy', 'update'], function () {
    Direction.removeClass();
  });

  /**
   * Remount component:
   * - on update to reflect changes in direction value
   */
  Events.on('update', function () {
    Direction.mount();
  });

  /**
   * Apply direction class:
   * - before building to apply class for the first time
   * - on updating to reapply direction class that may changed
   */
  Events.on(['build.before', 'update'], function () {
    Direction.addClass();
  });

  return Direction;
}

/**
 * Reflects value of glide movement.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Rtl (Glide, Components) {
  return {
    /**
     * Negates the passed translate if glide is in RTL option.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Components.Direction.is('rtl')) {
        return -translate;
      }

      return translate;
    }
  };
}

/**
 * Updates glide movement with a `gap` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Gap (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with number in the `gap` settings.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      return translate + Components.Gaps.value * Glide.index;
    }
  };
}

/**
 * Updates glide movement with width of additional clones width.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Grow (Glide, Components) {
  return {
    /**
     * Adds to the passed translate width of the half of clones.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      return translate + Components.Clones.grow / 2;
    }
  };
}

/**
 * Updates glide movement with a `peek` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Peeking (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with a `peek` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Glide.settings.focusAt >= 0) {
        var peek = Components.Peek.value;

        if (isObject(peek)) {
          return translate - peek.before;
        }

        return translate - peek;
      }

      return translate;
    }
  };
}

/**
 * Updates glide movement with a `focusAt` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Focusing (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with index in the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      var gap = Components.Gaps.value;
      var width = Components.Sizes.width;
      var focusAt = Glide.settings.focusAt;
      var slideWidth = Components.Sizes.slideWidth;

      if (focusAt === 'center') {
        return translate - (width / 2 - slideWidth / 2);
      }

      return translate - slideWidth * focusAt - gap * focusAt;
    }
  };
}

/**
 * Applies diffrent transformers on translate value.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function mutator (Glide, Components, Events) {
  /**
   * Merge instance transformers with collection of default transformers.
   * It's important that the Rtl component be last on the list,
   * so it reflects all previous transformations.
   *
   * @type {Array}
   */
  var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);

  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    mutate: function mutate(translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        var transformer = TRANSFORMERS[i];

        if (isFunction(transformer) && isFunction(transformer().modify)) {
          translate = transformer(Glide, Components, Events).modify(translate);
        } else {
          warn('Transformer should be a function that returns an object with `modify()` method');
        }
      }

      return translate;
    }
  };
}

function Translate (Glide, Components, Events) {
  var Translate = {
    /**
     * Sets value of translate on HTML element.
     *
     * @param {Number} value
     * @return {Void}
     */
    set: function set(value) {
      var transform = mutator(Glide, Components).mutate(value);

      Components.Html.wrapper.style.transform = 'translate3d(' + -1 * transform + 'px, 0px, 0px)';
    },


    /**
     * Removes value of translate from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transform = '';
    }
  };

  /**
   * Set new translate value:
   * - on move to reflect index change
   * - on updating via API to reflect possible changes in options
   */
  Events.on('move', function (context) {
    var gap = Components.Gaps.value;
    var length = Components.Sizes.length;
    var width = Components.Sizes.slideWidth;

    if (Glide.isType('carousel') && Components.Run.isOffset('<')) {
      Components.Transition.after(function () {
        Events.emit('translate.jump');

        Translate.set(width * (length - 1));
      });

      return Translate.set(-width - gap * length);
    }

    if (Glide.isType('carousel') && Components.Run.isOffset('>')) {
      Components.Transition.after(function () {
        Events.emit('translate.jump');

        Translate.set(0);
      });

      return Translate.set(width * length + gap * length);
    }

    return Translate.set(context.movement);
  });

  /**
   * Remove translate:
   * - on destroying to bring markup to its inital state
   */
  Events.on('destroy', function () {
    Translate.remove();
  });

  return Translate;
}

function Transition (Glide, Components, Events) {
  /**
   * Holds inactivity status of transition.
   * When true transition is not applied.
   *
   * @type {Boolean}
   */
  var disabled = false;

  var Transition = {
    /**
     * Composes string of the CSS transition.
     *
     * @param {String} property
     * @return {String}
     */
    compose: function compose(property) {
      var settings = Glide.settings;

      if (!disabled) {
        return property + ' ' + this.duration + 'ms ' + settings.animationTimingFunc;
      }

      return property + ' 0ms ' + settings.animationTimingFunc;
    },


    /**
     * Sets value of transition on HTML element.
     *
     * @param {String=} property
     * @return {Void}
     */
    set: function set() {
      var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';

      Components.Html.wrapper.style.transition = this.compose(property);
    },


    /**
     * Removes value of transition from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transition = '';
    },


    /**
     * Runs callback after animation.
     *
     * @param  {Function} callback
     * @return {Void}
     */
    after: function after(callback) {
      setTimeout(function () {
        callback();
      }, this.duration);
    },


    /**
     * Enable transition.
     *
     * @return {Void}
     */
    enable: function enable() {
      disabled = false;

      this.set();
    },


    /**
     * Disable transition.
     *
     * @return {Void}
     */
    disable: function disable() {
      disabled = true;

      this.set();
    }
  };

  define(Transition, 'duration', {
    /**
     * Gets duration of the transition based
     * on currently running animation type.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide.settings;

      if (Glide.isType('slider') && Components.Run.offset) {
        return settings.rewindDuration;
      }

      return settings.animationDuration;
    }
  });

  /**
   * Set transition `style` value:
   * - on each moving, because it may be cleared by offset move
   */
  Events.on('move', function () {
    Transition.set();
  });

  /**
   * Disable transition:
   * - before initial build to avoid transitioning from `0` to `startAt` index
   * - while resizing window and recalculating dimentions
   * - on jumping from offset transition at start and end edges in `carousel` type
   */
  Events.on(['build.before', 'resize', 'translate.jump'], function () {
    Transition.disable();
  });

  /**
   * Enable transition:
   * - on each running, because it may be disabled by offset move
   */
  Events.on('run', function () {
    Transition.enable();
  });

  /**
   * Remove transition:
   * - on destroying to bring markup to its inital state
   */
  Events.on('destroy', function () {
    Transition.remove();
  });

  return Transition;
}

/**
 * Test via a getter in the options object to see
 * if the passive property is accessed.
 *
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 */

var supportsPassive = false;

try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });

  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch (e) {}

var supportsPassive$1 = supportsPassive;

var START_EVENTS = ['touchstart', 'mousedown'];
var MOVE_EVENTS = ['touchmove', 'mousemove'];
var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];

function swipe (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  var swipeSin = 0;
  var swipeStartX = 0;
  var swipeStartY = 0;
  var disabled = false;
  var capture = supportsPassive$1 ? { passive: true } : false;

  var Swipe = {
    /**
     * Initializes swipe bindings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.bindSwipeStart();
    },


    /**
     * Handler for `swipestart` event. Calculates entry points of the user's tap.
     *
     * @param {Object} event
     * @return {Void}
     */
    start: function start(event) {
      if (!disabled && !Glide.disabled) {
        this.disable();

        var swipe = this.touches(event);

        swipeSin = null;
        swipeStartX = toInt(swipe.pageX);
        swipeStartY = toInt(swipe.pageY);

        this.bindSwipeMove();
        this.bindSwipeEnd();

        Events.emit('swipe.start');
      }
    },


    /**
     * Handler for `swipemove` event. Calculates user's tap angle and distance.
     *
     * @param {Object} event
     */
    move: function move(event) {
      if (!Glide.disabled) {
        var _Glide$settings = Glide.settings,
            touchAngle = _Glide$settings.touchAngle,
            touchRatio = _Glide$settings.touchRatio,
            classes = _Glide$settings.classes;


        var swipe = this.touches(event);

        var subExSx = toInt(swipe.pageX) - swipeStartX;
        var subEySy = toInt(swipe.pageY) - swipeStartY;
        var powEX = Math.abs(subExSx << 2);
        var powEY = Math.abs(subEySy << 2);
        var swipeHypotenuse = Math.sqrt(powEX + powEY);
        var swipeCathetus = Math.sqrt(powEY);

        swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

        if (swipeSin * 180 / Math.PI < touchAngle) {
          event.stopPropagation();

          Components.Move.make(subExSx * toFloat(touchRatio));

          Components.Html.root.classList.add(classes.dragging);

          Events.emit('swipe.move');
        } else {
          return false;
        }
      }
    },


    /**
     * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
     *
     * @param {Object} event
     * @return {Void}
     */
    end: function end(event) {
      if (!Glide.disabled) {
        var settings = Glide.settings;

        var swipe = this.touches(event);
        var threshold = this.threshold(event);

        var swipeDistance = swipe.pageX - swipeStartX;
        var swipeDeg = swipeSin * 180 / Math.PI;
        var steps = Math.round(swipeDistance / Components.Sizes.slideWidth);

        this.enable();

        if (swipeDistance > threshold && swipeDeg < settings.touchAngle) {
          // While swipe is positive and greater than threshold move backward.
          if (settings.perTouch) {
            steps = Math.min(steps, toInt(settings.perTouch));
          }

          if (Components.Direction.is('rtl')) {
            steps = -steps;
          }

          Components.Run.make(Components.Direction.resolve('<' + steps));
        } else if (swipeDistance < -threshold && swipeDeg < settings.touchAngle) {
          // While swipe is negative and lower than negative threshold move forward.
          if (settings.perTouch) {
            steps = Math.max(steps, -toInt(settings.perTouch));
          }

          if (Components.Direction.is('rtl')) {
            steps = -steps;
          }

          Components.Run.make(Components.Direction.resolve('>' + steps));
        } else {
          // While swipe don't reach distance apply previous transform.
          Components.Move.make();
        }

        Components.Html.root.classList.remove(settings.classes.dragging);

        this.unbindSwipeMove();
        this.unbindSwipeEnd();

        Events.emit('swipe.end');
      }
    },


    /**
     * Binds swipe's starting event.
     *
     * @return {Void}
     */
    bindSwipeStart: function bindSwipeStart() {
      var _this = this;

      var settings = Glide.settings;

      if (settings.swipeThreshold) {
        Binder.on(START_EVENTS[0], Components.Html.wrapper, function (event) {
          _this.start(event);
        }, capture);
      }

      if (settings.dragThreshold) {
        Binder.on(START_EVENTS[1], Components.Html.wrapper, function (event) {
          _this.start(event);
        }, capture);
      }
    },


    /**
     * Unbinds swipe's starting event.
     *
     * @return {Void}
     */
    unbindSwipeStart: function unbindSwipeStart() {
      Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
      Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
    },


    /**
     * Binds swipe's moving event.
     *
     * @return {Void}
     */
    bindSwipeMove: function bindSwipeMove() {
      var _this2 = this;

      Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function (event) {
        _this2.move(event);
      }, Glide.settings.throttle), capture);
    },


    /**
     * Unbinds swipe's moving event.
     *
     * @return {Void}
     */
    unbindSwipeMove: function unbindSwipeMove() {
      Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
    },


    /**
     * Binds swipe's ending event.
     *
     * @return {Void}
     */
    bindSwipeEnd: function bindSwipeEnd() {
      var _this3 = this;

      Binder.on(END_EVENTS, Components.Html.wrapper, function (event) {
        _this3.end(event);
      });
    },


    /**
     * Unbinds swipe's ending event.
     *
     * @return {Void}
     */
    unbindSwipeEnd: function unbindSwipeEnd() {
      Binder.off(END_EVENTS, Components.Html.wrapper);
    },


    /**
     * Normalizes event touches points accorting to different types.
     *
     * @param {Object} event
     */
    touches: function touches(event) {
      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return event;
      }

      return event.touches[0] || event.changedTouches[0];
    },


    /**
     * Gets value of minimum swipe distance settings based on event type.
     *
     * @return {Number}
     */
    threshold: function threshold(event) {
      var settings = Glide.settings;

      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return settings.dragThreshold;
      }

      return settings.swipeThreshold;
    },


    /**
     * Enables swipe event.
     *
     * @return {self}
     */
    enable: function enable() {
      disabled = false;

      Components.Transition.enable();

      return this;
    },


    /**
     * Disables swipe event.
     *
     * @return {self}
     */
    disable: function disable() {
      disabled = true;

      Components.Transition.disable();

      return this;
    }
  };

  /**
   * Add component class:
   * - after initial building
   */
  Events.on('build.after', function () {
    Components.Html.root.classList.add(Glide.settings.classes.swipeable);
  });

  /**
   * Remove swiping bindings:
   * - on destroying, to remove added EventListeners
   */
  Events.on('destroy', function () {
    Swipe.unbindSwipeStart();
    Swipe.unbindSwipeMove();
    Swipe.unbindSwipeEnd();
    Binder.destroy();
  });

  return Swipe;
}

function images (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  var Images = {
    /**
     * Binds listener to glide wrapper.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.bind();
    },


    /**
     * Binds `dragstart` event on wrapper to prevent dragging images.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
    },


    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('dragstart', Components.Html.wrapper);
    },


    /**
     * Event handler. Prevents dragging.
     *
     * @return {Void}
     */
    dragstart: function dragstart(event) {
      event.preventDefault();
    }
  };

  /**
   * Remove bindings from images:
   * - on destroying, to remove added EventListeners
   */
  Events.on('destroy', function () {
    Images.unbind();
    Binder.destroy();
  });

  return Images;
}

function anchors (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  /**
   * Holds detaching status of anchors.
   * Prevents detaching of already detached anchors.
   *
   * @private
   * @type {Boolean}
   */
  var detached = false;

  /**
   * Holds preventing status of anchors.
   * If `true` redirection after click will be disabled.
   *
   * @private
   * @type {Boolean}
   */
  var prevented = false;

  var Anchors = {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    mount: function mount() {
      /**
       * Holds collection of anchors elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._a = Components.Html.wrapper.querySelectorAll('a');

      this.bind();
    },


    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('click', Components.Html.wrapper, this.click);
    },


    /**
     * Unbinds events attached to anchors inside a track.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('click', Components.Html.wrapper);
    },


    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */
    click: function click(event) {
      if (prevented) {
        event.stopPropagation();
        event.preventDefault();
      }
    },


    /**
     * Detaches anchors click event inside glide.
     *
     * @return {self}
     */
    detach: function detach() {
      prevented = true;

      if (!detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = false;

          this.items[i].setAttribute('data-href', this.items[i].getAttribute('href'));

          this.items[i].removeAttribute('href');
        }

        detached = true;
      }

      return this;
    },


    /**
     * Attaches anchors click events inside glide.
     *
     * @return {self}
     */
    attach: function attach() {
      prevented = false;

      if (detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = true;

          this.items[i].setAttribute('href', this.items[i].getAttribute('data-href'));
        }

        detached = false;
      }

      return this;
    }
  };

  define(Anchors, 'items', {
    /**
     * Gets collection of the arrows HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Anchors._a;
    }
  });

  /**
   * Detach anchors inside slides:
   * - on swiping, so they won't redirect to its `href` attributes
   */
  Events.on('swipe.move', function () {
    Anchors.detach();
  });

  /**
   * Attach anchors inside slides:
   * - after swiping and transitions ends, so they can redirect after click again
   */
  Events.on('swipe.end', function () {
    Components.Transition.after(function () {
      Anchors.attach();
    });
  });

  /**
   * Unbind anchors inside slides:
   * - on destroying, to bring anchors to its initial state
   */
  Events.on('destroy', function () {
    Anchors.attach();
    Anchors.unbind();
    Binder.destroy();
  });

  return Anchors;
}

var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';

function controls (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  var capture = supportsPassive$1 ? { passive: true } : false;

  var Controls = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    mount: function mount() {
      /**
       * Collection of navigation HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);

      /**
       * Collection of controls HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);

      this.addBindings();
    },


    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    setActive: function setActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.addClass(this._n[i].children);
      }
    },


    /**
     * Removes active class to current slide.
     *
     * @return {Void}
     */
    removeActive: function removeActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.removeClass(this._n[i].children);
      }
    },


    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    addClass: function addClass(controls) {
      var settings = Glide.settings;
      var item = controls[Glide.index];

      if (item) {
        item.classList.add(settings.classes.activeNav);

        siblings(item).forEach(function (sibling) {
          sibling.classList.remove(settings.classes.activeNav);
        });
      }
    },


    /**
     * Removes active class from active control.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    removeClass: function removeClass(controls) {
      var item = controls[Glide.index];

      if (item) {
        item.classList.remove(Glide.settings.classes.activeNav);
      }
    },


    /**
     * Adds handles to the each group of controls.
     *
     * @return {Void}
     */
    addBindings: function addBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.bind(this._c[i].children);
      }
    },


    /**
     * Removes handles from the each group of controls.
     *
     * @return {Void}
     */
    removeBindings: function removeBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.unbind(this._c[i].children);
      }
    },


    /**
     * Binds events to arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    bind: function bind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.on('click', elements[i], this.click);
        Binder.on('touchstart', elements[i], this.click, capture);
      }
    },


    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    unbind: function unbind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.off(['click', 'touchstart'], elements[i]);
      }
    },


    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in driection precised in
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {Void}
     */
    click: function click(event) {
      event.preventDefault();

      Components.Run.make(Components.Direction.resolve(event.currentTarget.getAttribute('data-glide-dir')));
    }
  };

  define(Controls, 'items', {
    /**
     * Gets collection of the controls HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Controls._c;
    }
  });

  /**
   * Swap active class of current navigation item:
   * - after mounting to set it to initial index
   * - after each move to the new index
   */
  Events.on(['mount.after', 'move.after'], function () {
    Controls.setActive();
  });

  /**
   * Remove bindings and HTML Classes:
   * - on destroying, to bring markup to its initial state
   */
  Events.on('destroy', function () {
    Controls.removeBindings();
    Controls.removeActive();
    Binder.destroy();
  });

  return Controls;
}

function keyboard (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  var Keyboard = {
    /**
     * Binds keyboard events on component mount.
     *
     * @return {Void}
     */
    mount: function mount() {
      if (Glide.settings.keyboard) {
        this.bind();
      }
    },


    /**
     * Adds keyboard press events.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('keyup', document, this.press);
    },


    /**
     * Removes keyboard press events.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('keyup', document);
    },


    /**
     * Handles keyboard's arrows press and moving glide foward and backward.
     *
     * @param  {Object} event
     * @return {Void}
     */
    press: function press(event) {
      if (event.keyCode === 39) {
        Components.Run.make(Components.Direction.resolve('>'));
      }

      if (event.keyCode === 37) {
        Components.Run.make(Components.Direction.resolve('<'));
      }
    }
  };

  /**
   * Remove bindings from keyboard:
   * - on destroying to remove added events
   * - on updating to remove events before remounting
   */
  Events.on(['destroy', 'update'], function () {
    Keyboard.unbind();
  });

  /**
   * Remount component
   * - on updating to reflect potential changes in settings
   */
  Events.on('update', function () {
    Keyboard.mount();
  });

  /**
   * Destroy binder:
   * - on destroying to remove listeners
   */
  Events.on('destroy', function () {
    Binder.destroy();
  });

  return Keyboard;
}

function autoplay (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  var Autoplay = {
    /**
     * Initializes autoplaying and events.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.start();

      if (Glide.settings.hoverpause) {
        this.bind();
      }
    },


    /**
     * Starts autoplaying in configured interval.
     *
     * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Void}
     */
    start: function start() {
      var _this = this;

      if (Glide.settings.autoplay) {
        if (isUndefined(this._i)) {
          this._i = setInterval(function () {
            _this.stop();

            Components.Run.make('>');

            _this.start();
          }, this.time);
        }
      }
    },


    /**
     * Stops autorunning of the glide.
     *
     * @return {Void}
     */
    stop: function stop() {
      this._i = clearInterval(this._i);
    },


    /**
     * Stops autoplaying while mouse is over glide's area.
     *
     * @return {Void}
     */
    bind: function bind() {
      var _this2 = this;

      Binder.on('mouseover', Components.Html.root, function () {
        _this2.stop();
      });

      Binder.on('mouseout', Components.Html.root, function () {
        _this2.start();
      });
    },


    /**
     * Unbind mouseover events.
     *
     * @returns {Void}
     */
    unbind: function unbind() {
      Binder.off(['mouseover', 'mouseout'], Components.Html.root);
    }
  };

  define(Autoplay, 'time', {
    /**
     * Gets time period value for the autoplay interval. Prioritizes
     * times in `data-glide-autoplay` attrubutes over options.
     *
     * @return {Number}
     */
    get: function get() {
      var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');

      if (autoplay) {
        return toInt(autoplay);
      }

      return toInt(Glide.settings.autoplay);
    }
  });

  /**
   * Stop autoplaying and unbind events:
   * - on destroying, to clear defined interval
   * - on updating via API to reset interval that may changed
   */
  Events.on(['destroy', 'update'], function () {
    Autoplay.unbind();
  });

  /**
   * Stop autoplaying:
   * - before each run, to restart autoplaying
   * - on pausing via API
   * - on destroying, to clear defined interval
   * - while starting a swipe
   * - on updating via API to reset interval that may changed
   */
  Events.on(['run.before', 'pause', 'destroy', 'swipe.start', 'update'], function () {
    Autoplay.stop();
  });

  /**
   * Start autoplaying:
   * - after each run, to restart autoplaying
   * - on playing via API
   * - while ending a swipe
   */
  Events.on(['run.after', 'play', 'swipe.end'], function () {
    Autoplay.start();
  });

  /**
   * Remount autoplaying:
   * - on updating via API to reset interval that may changed
   */
  Events.on('update', function () {
    Autoplay.mount();
  });

  /**
   * Destroy a binder:
   * - on destroying glide instance to clearup listeners
   */
  Events.on('destroy', function () {
    Binder.destroy();
  });

  return Autoplay;
}

/**
 * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
 *
 * @param {Object} points
 * @returns {Object}
 */
function sortBreakpoints(points) {
  if (isObject(points)) {
    return sortKeys(points);
  } else {
    warn('Breakpoints option must be an object');
  }

  return {};
}

function breakpoints (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  /**
   * Holds reference to settings.
   *
   * @type {Object}
   */
  var settings = Glide.settings;

  /**
   * Holds reference to breakpoints object in settings. Sorts breakpoints
   * from smaller to larger. It is required in order to proper
   * matching currently active breakpoint settings.
   *
   * @type {Object}
   */
  var points = sortBreakpoints(settings.breakpoints);

  /**
   * Cache initial settings before overwritting.
   *
   * @type {Object}
   */
  var defaults = _extends({}, settings);

  var Breakpoints = {
    /**
     * Matches settings for currectly matching media breakpoint.
     *
     * @param {Object} points
     * @returns {Object}
     */
    match: function match(points) {
      if (typeof window.matchMedia !== 'undefined') {
        for (var point in points) {
          if (points.hasOwnProperty(point)) {
            if (window.matchMedia('(max-width: ' + point + 'px)').matches) {
              return points[point];
            }
          }
        }
      }

      return defaults;
    }
  };

  /**
   * Overwrite instance settings with currently matching breakpoint settings.
   * This happens right after component initialization.
   */
  _extends(settings, Breakpoints.match(points));

  /**
   * Update glide with settings of matched brekpoint:
   * - window resize to update slider
   */
  Binder.on('resize', window, throttle(function () {
    Glide.settings = mergeOptions(settings, Breakpoints.match(points));
  }, Glide.settings.throttle));

  /**
   * Resort and update default settings:
   * - on reinit via API, so breakpoint matching will be performed with options
   */
  Events.on('update', function () {
    points = sortBreakpoints(points);

    defaults = _extends({}, settings);
  });

  /**
   * Unbind resize listener:
   * - on destroying, to bring markup to its initial state
   */
  Events.on('destroy', function () {
    Binder.off('resize', window);
  });

  return Breakpoints;
}

var COMPONENTS = {
  Html: Html,
  Translate: Translate,
  Transition: Transition,
  Direction: Direction,
  Peek: Peek,
  Sizes: Sizes,
  Gaps: Gaps,
  Move: Move,
  Clones: Clones,
  Resize: Resize,
  Build: Build,
  Run: Run
};

var Glide$1 = function (_Core) {
  inherits(Glide$$1, _Core);

  function Glide$$1() {
    classCallCheck(this, Glide$$1);
    return possibleConstructorReturn(this, (Glide$$1.__proto__ || Object.getPrototypeOf(Glide$$1)).apply(this, arguments));
  }

  createClass(Glide$$1, [{
    key: 'mount',
    value: function mount() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return get(Glide$$1.prototype.__proto__ || Object.getPrototypeOf(Glide$$1.prototype), 'mount', this).call(this, _extends({}, COMPONENTS, extensions));
    }
  }]);
  return Glide$$1;
}(Glide);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Glide$1);



/***/ }),
/* 17 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_passport_icon_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _images_home_icon_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _images_ticket_icon_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _images_logout_icon_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _images_traveling_icon_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _api_calls__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _UserRepository__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var _dom_updates__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15);
// This is the JavaScript entry file

// imports for webpack












// globals
let userID;
let user;

// queries
const homeButton = document.querySelector('#homeButton');
const newTripButton = document.querySelector('#newTripButton');
const logOutButton = document.querySelector('#logOutButton');
const costEstButton = document.querySelector('#costEstButton');
const resetButton = document.querySelector('#resetButton');
const formSubmitButton = document.querySelector('#formSubmitButton');
const logInButton = document.querySelector('#logInButton');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

// event listeners
homeButton.addEventListener('click', _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.navigateToHome);
newTripButton.addEventListener('click', _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.navigateToForm);
costEstButton.addEventListener('click', calculateRequestedTripCost);
resetButton.addEventListener('click', _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.hideMessage);
formSubmitButton.addEventListener('click', postFormInputsToServer);
logInButton.addEventListener('click', verifyLogInInputs);
logOutButton.addEventListener('click', _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.redirectToLogInPage);

// functions
function fetchAllData() {
  return _api_calls__WEBPACK_IMPORTED_MODULE_6__.default.getAllData()
    .then(data => {
      let userObj = data[0].find(entry => entry.id === userID);
      user = new _UserRepository__WEBPACK_IMPORTED_MODULE_7__.default(userObj, data[1], data[2]);
      setUpUserAccount(user);
    });
}

function setUpUserAccount(userRepo) {
  userRepo.createTrips();
  userRepo.determineMessage();
  userRepo.calculateTotalYearCost();
  userRepo.calculateAllTimeCost();
  _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.updateHeader(userRepo);
  _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.populateCarousel(userRepo);
  _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.populateDestinationOptions(userRepo.destinations);
}

function calculateRequestedTripCost() {
  if (checkForValidInputs()) {
    let chosenDestination = parseInt(_dom_updates__WEBPACK_IMPORTED_MODULE_8__.destinationInput.value);
    let lodgingCost = user.destinations.find((entry) => {
      return entry.id === chosenDestination;
    }).estimatedLodgingCostPerDay;
    let flightCost = user.destinations.find((entry) => {
      return entry.id === chosenDestination;
    }).estimatedFlightCostPerPerson;
    let tripCost = (parseInt(_dom_updates__WEBPACK_IMPORTED_MODULE_8__.durationInput.value) * lodgingCost)
      + (parseInt(_dom_updates__WEBPACK_IMPORTED_MODULE_8__.travelersInput.value) * flightCost);
    let agentFee = tripCost * 0.1;
    let totalEst = tripCost + agentFee;
    _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.displayEstimatedRequestedTripCost(totalEst);
  } else {
    _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.displayInvalidInputMessage();
  }
}

function checkForValidInputs() {
  if (_dom_updates__WEBPACK_IMPORTED_MODULE_8__.dateInput.value && _dom_updates__WEBPACK_IMPORTED_MODULE_8__.durationInput.value && _dom_updates__WEBPACK_IMPORTED_MODULE_8__.travelersInput.value && _dom_updates__WEBPACK_IMPORTED_MODULE_8__.destinationInput.value) {
    return true;
  } else {
    return false;
  }
}

function postFormInputsToServer() {
  if (checkForValidInputs()) {
    let requestedTrip = {
      id: user.trips.length + 1,
      userID: user.user.id,
      destinationID: parseInt(_dom_updates__WEBPACK_IMPORTED_MODULE_8__.destinationInput.value),
      travelers: parseInt(_dom_updates__WEBPACK_IMPORTED_MODULE_8__.travelersInput.value),
      date: _dom_updates__WEBPACK_IMPORTED_MODULE_8__.dateInput.value.split('-').join('/'),
      duration: parseInt(_dom_updates__WEBPACK_IMPORTED_MODULE_8__.durationInput.value),
      status: 'pending',
      suggestedActivities: []
    };
    _api_calls__WEBPACK_IMPORTED_MODULE_6__.default.postData('http://localhost:3001/api/v1/trips', requestedTrip)
      .then(() => {
        fetchAllData()
          .then(() => {
            let locationID = user.trips[user.trips.length - 1].destinationID;
            let location = user.destinations.find(entry => entry.id === locationID).destination;
            _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.displaySuccessMessageUponPost(parseInt(_dom_updates__WEBPACK_IMPORTED_MODULE_8__.durationInput.value), location);
          })
      });
  } else {
    _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.displayInvalidInputMessage();
  }
}

function verifyLogInInputs() {
  if (username.value && password.value) {
    let usernameName = username.value.slice(0, 8);
    let usernameNumber = parseInt(username.value.slice(8));
    if (password.value === 'travel' && usernameName === 'traveler' && 0 < usernameNumber && usernameNumber <= 50) {
      userID = usernameNumber;
      fetchAllData()
        .then(() => {
          _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.hideLogIn();
          _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.navigateToHome();
        });
    } else {
      _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.showErrorForLogIn();
    }
  } else {
    _dom_updates__WEBPACK_IMPORTED_MODULE_8__.domUpdates.showErrorForLogIn();
  }
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map