// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/typewriter.min.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Title: Typewriter JS
 * Descritpion: A native javascript plugin that can be used to create an elegent automatic typewriter animation effect on websites.
 * Author: Tameem Safi
 * Website: https://safi.me.uk
 * Version: 1.0.0
 */
(function () {
  (function () {
    for (var a = 0, c = ["ms", "moz", "webkit", "o"], b = 0; b < c.length && !window.requestAnimationFrame; ++b) {
      window.requestAnimationFrame = window[c[b] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[c[b] + "CancelAnimationFrame"] || window[c[b] + "CancelRequestAnimationFrame"];
    }

    window.requestAnimationFrame || (window.requestAnimationFrame = function (c, b) {
      var f = new Date().getTime(),
          d = Math.max(0, 16 - (f - a)),
          e = window.setTimeout(function () {
        c(f + d);
      }, d);
      a = f + d;
      return e;
    });
    window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) {
      clearTimeout(a);
    });
  })();

  window.Typewriter = function (a, c) {
    this._settings = {
      cursorAnimationPaused: !1,
      opacityIncreasing: !1,
      currentOpacity: 1,
      delayedQue: [],
      delayItemsCount: 0,
      eventQue: [],
      calledEvents: [],
      eventRunning: !1,
      timeout: !1,
      delayExecution: !1,
      fps: .06,
      typingFrameCount: 0,
      stringToTypeHTMLArray: [],
      currentTypedCharacters: [],
      typing: !1,
      usedIDs: [],
      charAmountToDelete: !1,
      userOptions: {},
      eventLoopRerun: 0
    };
    if (!a) return console.error("Please choose an DOM element so that type writer can display itself.");
    if ("object" !== _typeof(c)) return console.error("Typewriter only accepts the options as an object.");
    this._settings.userOptions = c;
    this.default_options = {
      strings: !1,
      cursorClassName: "typewriter-cursor",
      cursor: "|",
      animateCursor: !0,
      blinkSpeed: 50,
      typingSpeed: "natural",
      deleteSpeed: "natural",
      charSpanClassName: "typewriter-char",
      wrapperClassName: "typewriter-wrapper",
      loop: !1,
      autoStart: !1,
      devMode: !1
    };
    this.options = this._setupOptions(c);
    this.el = a;

    this._setupTypwriterWrapper();

    this._startCursorAnimation();

    !0 === this.options.autoStart && this.options.strings && this.typeOutAllStrings();
  };

  var b = window.Typewriter.prototype;

  b.stop = function () {
    this._addToEventQue(this._stopEventLoop);

    return this;
  };

  b.start = function () {
    this._startEventLoop();

    return this;
  };

  b.rerun = function () {
    this._addToEventQue(this._rerunCalledEvents);

    return this;
  };

  b.typeString = function (a) {
    if (!a || "string" != typeof a) return console.error("Please enter a string as the paramater.");
    a = this._getCharacters(a);

    this._addToEventQue([this._typeCharacters, [a]]);

    return this;
  };

  b.deleteAll = function () {
    this._addToEventQue([this._deleteChars, ["all"]]);

    return this;
  };

  b.deleteChars = function (a) {
    this._addToEventQue([this._deleteChars, [a]]);

    return this;
  };

  b.pauseFor = function (a) {
    this._addToEventQue([this._pauseFor, [a]]);

    return this;
  };

  b.typeOutAllStrings = function () {
    var a = this._getStringsAsCharsArray();

    if (1 === a.length) this._typeCharacters(a[0]);else for (var c = 0, b = a.length; c < b; c++) {
      this._addToEventQue([this._typeCharacters, [a[c]]]), this.pauseFor(this._randomInteger(1500, 2500)), this.deleteAll(), this.pauseFor(this._randomInteger(1500, 2500));
    }
    return this;
  };

  b.changeSettings = function (a) {
    if (!a && "object" !== _typeof(a)) return console.error("Typewriter will only accept an object as the settings.");

    this._addToEventQue([this._changeSettings, [JSON.stringify(a)]]);

    return this;
  };

  b.changeBlinkSpeed = function (a) {
    if (!a && "number" !== typeof a) return console.error("Please enter a number for the new blink speed.");
    this.changeSettings({
      blinkSpeed: a
    });
    return this;
  };

  b.changeTypingSpeed = function (a) {
    if (!a && "number" !== typeof a) return console.error("Please enter a number for the new typing speed.");
    this.changeSettings({
      typingSpeed: a
    });
    return this;
  };

  b.changeDeleteSpeed = function (a) {
    if (!a && "number" !== typeof a) return console.error("Please enter a number for the new delete speed.");
    this.changeSettings({
      changeDeleteSpeed: a
    });
    return this;
  };

  b._rerunCalledEvents = function () {
    0 < this._settings.currentTypedCharacters.length ? (this.deleteAll(), this._resetEventLoop("rerunCalledEvents")) : (this._settings.eventQue = this._settings.calledEvents, this._settings.calledEvents = [], this.options = this._setupOptions(this._settings.userOptions), this._settings.usedIDs = [], this.charAmountToDelete = !1, this._startEventLoop());
  };

  b._deleteChars = function (a) {
    a && (this._settings.charAmountToDelete = a);
    this._deletingCharIdsAnimation = window.requestAnimationFrame(this._deletingCharAnimationFrame.bind(this));
    return this;
  };

  b._pauseFor = function (a) {
    var c = this;
    c._settings.eventRunning = !0;
    setTimeout(function () {
      c._resetEventLoop("pauseFor");
    }, a);
  };

  b._changeSettings = function (a) {
    this.options = this._setupOptions(JSON.parse(a[0]));

    this._resetEventLoop("changeSettings");

    this.options.devMode && console.log("New settings", this.options);
  };

  b._deletingCharAnimationFrame = function () {
    var a = this,
        c = this.options.deleteSpeed,
        b = a.options.wrapperClassName,
        d = a._settings.currentTypedCharacters,
        e = a._settings.charAmountToDelete;
    if (!a._settings.charAmountToDelete || 0 === a._settings.charAmountToDelete || 0 === d) return a._resetEventLoop("deletingCharAnimationFrame"), !0;
    "natural" == c && (c = a._randomInteger(50, 150));
    "all" == e && (e = d.length, a._settings.charAmountToDelete = e);
    setTimeout(function () {
      if (a._settings.charAmountToDelete) {
        var c = d.length - 1,
            f = d[c];

        a._settings.currentTypedCharacters.splice(c, 1);

        if (c = document.getElementById(f)) a.el.querySelector("." + b).removeChild(c), a._settings.charAmountToDelete = e - 1, a.options.devMode && console.log("Deleted char with ID", f);
      }

      a._deletingCharIdsAnimation = window.requestAnimationFrame(a._deletingCharAnimationFrame.bind(a));
    }, c);
  };

  b._setupOptions = function (a) {
    var c = {},
        b;

    for (b in this.default_options) {
      c[b] = this.default_options[b];
    }

    if (this._settings.userOptions) for (b in this._settings.userOptions) {
      c[b] = this._settings.userOptions[b];
    }

    for (b in a) {
      c[b] = a[b];
    }

    return c;
  };

  b._addToEventQue = function (a) {
    this._settings.eventQue.push(a);

    0 < this._settings.eventQue.length && !this._settings.eventRunning && this.options.autoStart && this._startEventLoop();
  };

  b._startEventLoop = function () {
    this.options.devMode && console.log("Event loop started.");

    if (!this._settings.eventRunning) {
      if (0 < this._settings.eventQue.length) {
        this.eventLoopRerun = 0;
        var a = this._settings.eventQue[0];
        "function" == typeof a ? (this._settings.eventRunning = !0, this._settings.calledEvents.push(a), this._settings.eventQue.splice(0, 1), a.call(this), this.options.devMode && console.log("Event started.")) : a instanceof Array && "function" == typeof a[0] && a[1] instanceof Array && (this._settings.eventRunning = !0, this._settings.calledEvents.push(a), this._settings.eventQue.splice(0, 1), a[0].call(this, a[1]), this.options.devMode && console.log("Event started."));
      }

      this._eventQueAnimation = window.requestAnimationFrame(this._startEventLoop.bind(this));
    }

    if (!this._settings.eventRunning && 0 >= this._settings.eventQue.length) {
      var c = this;

      c._stopEventLoop();

      setTimeout(function () {
        c.options.loop && (c.eventLoopRerun++, c.options.devMode && console.log("Before Loop State", c._settings), 4 < c.eventLoopRerun ? (console.error("Maximum amount of loop retries reached."), c._stopEventLoop()) : (c.options.devMode && console.log("Looping events."), c._rerunCalledEvents()));
      }, 1E3);
    }
  };

  b._resetEventLoop = function (a) {
    a = a || "Event";
    this._settings.eventRunning = !1;

    this._startEventLoop();

    this.options.devMode && console.log(a, "Finished");
  };

  b._stopEventLoop = function () {
    window.cancelAnimationFrame(this._eventQueAnimation);
    this.options.devMode && console.log("Event loop stopped.");
  };

  b._setupTypwriterWrapper = function () {
    var a = this.options.wrapperClassName,
        c = document.createElement("span");
    c.className = a;
    this.el.innerHTML = "";
    this.el.appendChild(c);
  };

  b._typeCharacters = function (a) {
    this._settings.stringToTypeHTMLArray = this._convertCharsToHTML(a);
    this._typingAnimation = window.requestAnimationFrame(this._typingAnimationFrame.bind(this, a.length));
    return this;
  };

  b._typingAnimationFrame = function (a) {
    var c = this,
        b = this.options.typingSpeed,
        d = c.options.wrapperClassName;
    if (0 == c._settings.stringToTypeHTMLArray.length) return window.cancelAnimationFrame(c._typingAnimation), this._resetEventLoop("typingAnimationFrame"), !0;
    "natural" == b && (b = this._randomInteger(50, 150));
    setTimeout(function () {
      var b = c._settings.stringToTypeHTMLArray[0];
      c.el.querySelector("." + d).appendChild(b.el);

      c._settings.currentTypedCharacters.push(b.id);

      c._settings.stringToTypeHTMLArray.splice(0, 1);

      c._typingAnimation = window.requestAnimationFrame(c._typingAnimationFrame.bind(c, a));
      c.options.devMode && console.log("Typed", b);
    }, b);
  };

  b._convertCharsToHTML = function (a) {
    var c = [],
        b = this.options.charSpanClassName;
    a = a[0];

    for (var d = 0, e = a.length; d < e; d++) {
      var g = document.createElement("span"),
          h = this._generateUniqueID();

      g.id = h;
      g.className = b + " typewriter-item-" + d;
      g.innerHTML = a[d];
      c.push({
        id: h,
        el: g
      });
    }

    return c;
  };

  b._getCharacters = function (a) {
    return "string" !== typeof a ? !1 : a.split("");
  };

  b._getStringsAsCharsArray = function () {
    var a = "string" === typeof this.options.strings;
    if (!(this.options.strings instanceof Array)) return a ? [this.options.strings.split("")] : console.error("Typewriter only accepts strings or an array of strings as the input.");

    for (var a = [], c = 0, b = this.options.strings.length; c < b; c++) {
      var d = this._getCharacters(this.options.strings[c]);

      if (!d) {
        console.error("Please enter only strings.");
        break;
      }

      a.push(d);
    }

    return a;
  };

  b._cursorAnimationFrame = function () {
    if (!this._settings.cursorAnimationPaused) {
      var a = .001 * this.options.blinkSpeed,
          c = this.el.querySelector(".typewriter-cursor");
      1 == this._settings.opacityIncreasing && (1 <= this._settings.currentOpacity && (this._settings.opacityIncreasing = !1, this._settings.currentOpacity = 1), this._settings.currentOpacity += a);
      0 == this._settings.opacityIncreasing && (0 >= this._settings.currentOpacity && (this._settings.opacityIncreasing = !0, this._settings.currentOpacity = 0), this._settings.currentOpacity -= a);
      c.style.opacity = this._settings.currentOpacity;
      this._cursorAnimation = window.requestAnimationFrame(this._cursorAnimationFrame.bind(this));
    }
  };

  b._startCursorAnimation = function () {
    var a = this.options.cursor,
        c = this.options.cursorClassName,
        b = document.createElement("span");
    b.className = c;
    b.innerHTML = a;
    this.el.appendChild(b);
    this.options.animateCursor && (this._cursorAnimation = window.requestAnimationFrame(this._cursorAnimationFrame.bind(this)));
  };

  b._pauseCursorAnimation = function () {
    this._settings.cursorAnimationPaused || (window.cancelAnimationFrame(this._cursorAnimation), this._settings.cursorAnimationPaused = !0);
  };

  b._restartCursorAnimation = function () {
    if (!this._settings.cursorAnimationPaused) return console.error("Cursor animation is already running.");
    this._settings.cursorAnimationPaused = !1;
    this._cursorAnimation = window.requestAnimationFrame(this._cursorAnimationFrame.bind(this));
  };

  b._randomInteger = function (a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  };

  b._randomID = function () {
    for (var a = "", b = 0; b < this._randomInteger(5, 15); b++) {
      a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
    }

    return a;
  };

  b._generateUniqueID = function () {
    var a = this._randomID();

    return -1 == this._settings.usedIDs.indexOf(a) ? (this._settings.usedIDs.push(a), a) : this._generateUniqueID.call(this);
  };
})();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65138" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/typewriter.min.js"], null)
//# sourceMappingURL=/typewriter.min.d2b5b6eb.map