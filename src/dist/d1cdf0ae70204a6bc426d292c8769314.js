// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({71:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],46:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":71}],70:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":46}],18:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./../fonts/raleway-regular-webfont.woff2":48,"./../fonts/raleway-regular-webfont.woff":49,"./../fonts/raleway-light-webfont.woff2":50,"./../fonts/raleway-light-webfont.woff":51,"./../fonts/raleway-medium-webfont.woff2":52,"./../fonts/raleway-medium-webfont.woff":53,"./../img/bradley.png":54,"./../img/bradley2.png":55,"./../img/bradley3.png":56,"./../img/flecheBas.png":57,"./../img/fond.png":58,"_css_loader":46}],15:[function(require,module,exports) {
'use strict';

require('flexboxgrid');

require('./style/style.scss');

var titre = document.querySelector('.Projects-title');
var bradleyFirst = document.querySelector('.Projects-firstImage');
var bradleySecond = document.querySelector('.Projects-secondImage');
var bradleyThird = document.querySelector('.Projects-thirdImage');
var flecheBas = document.querySelector('.Projects-downArrow1');
var flecheBas2 = document.querySelector('.Projects-downArrow2');
var flecheBas3 = document.querySelector('.Projects-downArrow3');
var modalContent = document.querySelector('.Projects-modalContent');
var cross = document.querySelector('.Projects-bradleyCross');
var modal = document.querySelector('.Projects-modal');

titre.addEventListener('click', function () {
  bradleyFirst.style.marginTop = '0px';
  bradleyFirst.style.transform = 'rotate(0deg)';
  bradleyFirst.style.transition = 'all 1s ease';
  bradleyFirst.style.zIndex = '1';
  bradleySecond.style.marginTop = '0px';
  bradleySecond.style.transform = 'rotate(0deg)';
  bradleySecond.style.transition = 'all 1.5s ease';
  bradleySecond.style.zIndex = '0';
  bradleyThird.style.marginTop = '0px';
  bradleyThird.style.transform = 'rotate(0deg)';
  bradleyThird.style.transition = 'all 2s ease';
  bradleyThird.style.zIndex = '-1';
});

flecheBas.addEventListener('click', function () {

  bradleyFirst.style.marginTop = '720px';
  bradleyFirst.style.transform = 'rotate(45deg)';
  bradleyFirst.style.transition = 'all 1.5s ease';
  setTimeout(function () {
    bradleySecond.style.opacity = '1';
  }, 10);
  flecheBas.style.display = 'none';
  flecheBas2.style.display = 'block';
});

flecheBas2.addEventListener('click', function () {

  bradleySecond.style.marginTop = '725px';
  bradleySecond.style.transform = 'rotate(45deg)';
  bradleySecond.style.transition = 'all 1.5s ease';
  bradleyThird.style.opacity = '1';
  flecheBas2.style.display = 'none';
  flecheBas3.style.display = 'block';
});

flecheBas3.addEventListener('click', function () {

  bradleyThird.style.marginTop = '730px';
  bradleyThird.style.transition = 'all 1.5s ease';
  bradleyThird.style.transform = 'rotate(45deg)';
  bradleyFirst.style.opacity = '1';
  flecheBas3.style.display = 'none';
  flecheBas.style.display = 'block';
});

cross.addEventListener('mouseover', function () {

  cross.style.transform = 'rotate(90deg)';
  cross.style.transition = 'all 0.5s ease';
});

cross.addEventListener('mouseout', function () {

  cross.style.transform = 'rotate(-90deg)';
  cross.style.transition = 'all 0.5s ease';
});

cross.addEventListener('click', function () {

  modal.style.display = "none";
});
},{"flexboxgrid":70,"./style/style.scss":18}],72:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55998' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
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
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
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
        parents.push(+k);
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
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]