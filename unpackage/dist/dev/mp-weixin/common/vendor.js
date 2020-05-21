(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!****************************************************************!*\
  !*** C:/Users/Administrator/Desktop/yy/yydsq1/untils/index.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function login() {
}var _default =

{
  login: login };exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
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
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
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

if (true) {
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
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
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
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
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
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
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
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
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
      if (Dep.SharedObject.target) { // fixed by xxxxxx
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
      if ( true && customSetter) {
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
  if ( true &&
    (isUndef(target) || isPrimitive(target))
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
     true && warn(
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
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
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
if (true) {
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
       true && warn(
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
     true && assertObjectType(key, childVal, vm);
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
  if (true) {
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
      } else if (true) {
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
  } else if (true) {
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
  } else if (true) {
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
  if (true) {
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
  if ( true && warnMissing && !res) {
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
  if (
    true
  ) {
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
  if ( true && isObject(def)) {
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
  if (true) {
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
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
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

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
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
      'prevent conflicts with Vue internals. ' +
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

var mark;
var measure;

if (true) {
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
       true && warn(
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

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
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
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
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
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
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
        } else if (true) {
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
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
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
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
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
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
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
       true && warn(
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
       true && warn(
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
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
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
  if (true) {
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
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
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
    if (true) {
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
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

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
     true && warn(
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
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
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
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
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
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
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
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
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
      if ( true && Array.isArray(vnode)) {
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
       true && warn(
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
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
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
    if (true) {
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

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
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
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
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

  if (true) {
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
  if (true) {
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
    if ( true && has[id] != null) {
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

      if ( true && !config.async) {
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
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
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
    if (true) {
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
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
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
     true && warn(
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
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
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
    if ( true && getter == null) {
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
    } else if (true) {
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
  if ( true &&
      sharedPropertyDefinition.set === noop) {
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
      if (Dep.SharedObject.target) {// fixed by xxxxxx
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
    if (true) {
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
  if (true) {
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
    if ( true && config.performance && mark) {
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
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
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
  if ( true &&
    !(this instanceof Vue)
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
    if ( true && name) {
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
        if ( true && type === 'component') {
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
  if (true) {
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

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
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
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

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

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!***********************************************************!*\
  !*** C:/Users/Administrator/Desktop/yy/yydsq1/pages.json ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 55:
/*!*****************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/yy/yydsq1/components/address/city.json ***!
  \*****************************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, default */
/***/ (function(module) {

module.exports = [{"name":"北京市","city":[{"name":"东城区东城区东城区"},{"name":"东城区"},{"name":"西城区"},{"name":"崇文区"},{"name":"宣武区"},{"name":"朝阳区"},{"name":"丰台区"},{"name":"石景山区"},{"name":"海淀区"},{"name":"门头沟区"},{"name":"房山区"},{"name":"通州区"},{"name":"顺义区"},{"name":"昌平区"},{"name":"大兴区"},{"name":"平谷区"},{"name":"怀柔区"},{"name":"密云县"},{"name":"延庆县"}]},{"name":"天津市","city":[{"name":"和平区"},{"name":"河东区"},{"name":"河西区"},{"name":"南开区"},{"name":"河北区"},{"name":"红桥区"},{"name":"塘沽区"},{"name":"汉沽区"},{"name":"大港区"},{"name":"东丽区"},{"name":"西青区"},{"name":"津南区"},{"name":"北辰区"},{"name":"武清区"},{"name":"宝坻区"},{"name":"宁河县"},{"name":"静海县"},{"name":"蓟  县"}]},{"name":"河北省","city":[{"name":"石家庄市","area":[{"name":"长安区"},{"name":"桥东区"},{"name":"桥西区"},{"name":"新华区"},{"name":"郊  区"},{"name":"井陉矿区"},{"name":"井陉县"},{"name":"正定县"},{"name":"栾城县"},{"name":"行唐县"},{"name":"灵寿县"},{"name":"高邑县"},{"name":"深泽县"},{"name":"赞皇县"},{"name":"无极县"},{"name":"平山县"},{"name":"元氏县"},{"name":"赵  县"},{"name":"辛集市"},{"name":"藁"},{"name":"晋州市"},{"name":"新乐市"},{"name":"鹿泉市"}]},{"name":"唐山市","area":[{"name":"路南区"},{"name":"路北区"},{"name":"古冶区"},{"name":"开平区"},{"name":"新  区"},{"name":"丰润县"},{"name":"滦  县"},{"name":"滦南县"},{"name":"乐亭县"},{"name":"迁西县"},{"name":"玉田县"},{"name":"唐海县"},{"name":"遵化市"},{"name":"丰南市"},{"name":"迁安市"}]},{"name":"秦皇岛市","area":[{"name":"海港区"},{"name":"山海关区"},{"name":"北戴河区"},{"name":"青龙满族自治县"},{"name":"昌黎县"},{"name":"抚宁县"},{"name":"卢龙县"}]},{"name":"邯郸市","area":[{"name":"邯山区"},{"name":"丛台区"},{"name":"复兴区"},{"name":"峰峰矿区"},{"name":"邯郸县"},{"name":"临漳县"},{"name":"成安县"},{"name":"大名县"},{"name":"涉  县"},{"name":"磁  县"},{"name":"肥乡县"},{"name":"永年县"},{"name":"邱  县"},{"name":"鸡泽县"},{"name":"广平县"},{"name":"馆陶县"},{"name":"魏  县"},{"name":"曲周县"},{"name":"武安市"}]},{"name":"邢台市","area":[{"name":"桥东区"},{"name":"桥西区"},{"name":"邢台县"},{"name":"临城县"},{"name":"内丘县"},{"name":"柏乡县"},{"name":"隆尧县"},{"name":"任  县"},{"name":"南和县"},{"name":"宁晋县"},{"name":"巨鹿县"},{"name":"新河县"},{"name":"广宗县"},{"name":"平乡县"},{"name":"威  县"},{"name":"清河县"},{"name":"临西县"},{"name":"南宫市"},{"name":"沙河市"}]},{"name":"保定市","area":[{"name":"新市区"},{"name":"北市区"},{"name":"南市区"},{"name":"满城县"},{"name":"清苑县"},{"name":"涞水县"},{"name":"阜平县"},{"name":"徐水县"},{"name":"定兴县"},{"name":"唐  县"},{"name":"高阳县"},{"name":"容城县"},{"name":"涞源县"},{"name":"望都县"},{"name":"安新县"},{"name":"易  县"},{"name":"曲阳县"},{"name":"蠡  县"},{"name":"顺平县"},{"name":"博野"},{"name":"雄县"},{"name":"涿州市"},{"name":"定州市"},{"name":"安国市"},{"name":"高碑店市"}]},{"name":"张家口","area":[{"name":"桥东区"},{"name":"桥西区"},{"name":"宣化区"},{"name":"下花园区"},{"name":"宣化县"},{"name":"张北县"},{"name":"康保县"},{"name":"沽源县"},{"name":"尚义县"},{"name":"蔚  县"},{"name":"阳原县"},{"name":"怀安县"},{"name":"万全县"},{"name":"怀来县"},{"name":"涿鹿县"},{"name":"赤城县"},{"name":"崇礼县"}]},{"name":"承德市","area":[{"name":"双桥区"},{"name":"双滦区"},{"name":"鹰手营子矿区"},{"name":"承德县"},{"name":"兴隆县"},{"name":"平泉县"},{"name":"滦平县"},{"name":"隆化县"},{"name":"丰宁满族自治县"},{"name":"宽城满族自治县"},{"name":"围场满族蒙古族自治县"}]},{"name":"沧州市","area":[{"name":"新华区"},{"name":"运河区"},{"name":"沧  县"},{"name":"青  县"},{"name":"东光县"},{"name":"海兴县"},{"name":"盐山县"},{"name":"肃宁县"},{"name":"南皮县"},{"name":"吴桥县"},{"name":"献  县"},{"name":"孟村回族自治县"},{"name":"泊头市"},{"name":"任丘市"},{"name":"黄骅市"},{"name":"河间市"}]},{"name":"廊坊市","area":[{"name":"安次区"},{"name":"固安县"},{"name":"永清县"},{"name":"香河县"},{"name":"大城县"},{"name":"文安县"},{"name":"大厂回族自治县"},{"name":"霸州市"},{"name":"三河市"}]},{"name":"衡水市","area":[{"name":"桃城区"},{"name":"枣强县"},{"name":"武邑县"},{"name":"武强县"},{"name":"饶阳县"},{"name":"安平县"},{"name":"故城县"},{"name":"景  县"},{"name":"阜城县"},{"name":"冀州市"},{"name":"深州市"}]}]},{"name":"山西省","city":[{"name":"太原市","area":[{"name":"小店区"},{"name":"迎泽区"},{"name":"杏花岭区"},{"name":"尖草坪区"},{"name":"万柏林区"},{"name":"晋源区"},{"name":"清徐县"},{"name":"阳曲县"},{"name":"娄烦县"},{"name":"古交市"}]},{"name":"大同市","area":[{"name":"城  区"},{"name":"矿  区"},{"name":"南郊区"},{"name":"新荣区"},{"name":"阳高县"},{"name":"天镇县"},{"name":"广灵县"},{"name":"灵丘县"},{"name":"浑源县"},{"name":"左云县"},{"name":"大同县"}]},{"name":"阳泉市","area":[{"name":"城  区"},{"name":"矿  区"},{"name":"郊  区"},{"name":"平定县"},{"name":"盂  县"}]},{"name":"长治市","area":[{"name":"城  区"},{"name":"郊  区"},{"name":"长治县"},{"name":"襄垣县"},{"name":"屯留县"},{"name":"平顺县"},{"name":"黎城县"},{"name":"壶关县"},{"name":"长子县"},{"name":"武乡县"},{"name":"沁  县"},{"name":"沁源县"},{"name":"潞城市"}]},{"name":"晋城市","area":[{"name":"城  区"},{"name":"沁水县"},{"name":"阳城县"},{"name":"陵川县"},{"name":"泽州县"},{"name":"高平市"}]},{"name":"朔州市","area":[{"name":"朔城区"},{"name":"平鲁区"},{"name":"山阴县"},{"name":"应  县"},{"name":"右玉县"},{"name":"怀仁县"}]},{"name":"忻州市","area":[{"name":"忻府区"},{"name":"原平市"},{"name":"定襄县"},{"name":"五台县"},{"name":"代  县"},{"name":"繁峙县"},{"name":"宁武县"},{"name":"静乐县"},{"name":"神池县"},{"name":"五寨县"},{"name":"岢岚县"},{"name":"河曲县"},{"name":"保德县"},{"name":"偏关县"}]},{"name":"吕梁市","area":[{"name":"离石区"},{"name":"孝义市"},{"name":"汾阳市"},{"name":"文水县"},{"name":"交城县"},{"name":"兴  县"},{"name":"临  县"},{"name":"柳林县"},{"name":"石楼县"},{"name":"岚  县"},{"name":"方山县"},{"name":"中阳县"},{"name":"交口县"}]},{"name":"晋中市","area":[{"name":"榆次市"},{"name":"介休市"},{"name":"榆社县"},{"name":"左权县"},{"name":"和顺县"},{"name":"昔阳县"},{"name":"寿阳县"},{"name":"太谷县"},{"name":"祁  县"},{"name":"平遥县"},{"name":"灵石县"}]},{"name":"临汾市","area":[{"name":"临汾市"},{"name":"侯马市"},{"name":"霍州市"},{"name":"曲沃县"},{"name":"翼城县"},{"name":"襄汾县"},{"name":"洪洞县"},{"name":"古  县"},{"name":"安泽县"},{"name":"浮山县"},{"name":"吉  县"},{"name":"乡宁县"},{"name":"蒲  县"},{"name":"大宁县"},{"name":"永和县"},{"name":"隰  县"},{"name":"汾西县"}]},{"name":"运城市","area":[{"name":"运城市"},{"name":"永济市"},{"name":"河津市"},{"name":"芮城县"},{"name":"临猗县"},{"name":"万荣县"},{"name":"新绛县"},{"name":"稷山县"},{"name":"闻喜县"},{"name":"夏  县"},{"name":"绛  县"},{"name":"平陆县"},{"name":"垣曲县"}]}]},{"name":"内蒙古","city":[{"name":"呼和浩特市","area":[{"name":"新城区"},{"name":"回民区"},{"name":"玉泉区"},{"name":"郊  区"},{"name":"土默特左旗"},{"name":"托克托县"},{"name":"和林格尔县"},{"name":"清水河县"},{"name":"武川县"}]},{"name":"包头市","area":[{"name":"东河区"},{"name":"昆都伦区"},{"name":"青山区"},{"name":"石拐矿区"},{"name":"白云矿区"},{"name":"郊  区"},{"name":"土默特右旗"},{"name":"固阳县"},{"name":"达尔罕茂明安联合旗"}]},{"name":"乌海市","area":[{"name":"海勃湾区"},{"name":"海南区"},{"name":"乌达区"}]},{"name":"赤峰市","area":[{"name":"红山区"},{"name":"元宝山区"},{"name":"松山区"},{"name":"阿鲁科尔沁旗"},{"name":"巴林左旗"},{"name":"巴林右旗"},{"name":"林西县"},{"name":"克什克腾旗"},{"name":"翁牛特旗"},{"name":"喀喇沁旗"},{"name":"宁城县"},{"name":"敖汉旗"}]},{"name":"呼伦贝尔市","area":[{"name":"海拉尔市"},{"name":"满洲里市"},{"name":"扎兰屯市"},{"name":"牙克石市"},{"name":"根河市"},{"name":"额尔古纳市"},{"name":"阿荣旗"},{"name":"莫力达瓦达斡尔族自治旗"},{"name":"鄂伦春自治旗"},{"name":"鄂温克族自治旗"},{"name":"新巴尔虎右旗"},{"name":"新巴尔虎左旗"},{"name":"陈巴尔虎旗"}]},{"name":"兴安盟","area":[{"name":"乌兰浩特市"},{"name":"阿尔山市"},{"name":"科尔沁右翼前旗"},{"name":"科尔沁右翼中旗"},{"name":"扎赉特旗"},{"name":"突泉县"}]},{"name":"通辽市","area":[{"name":"科尔沁区"},{"name":"霍林郭勒市"},{"name":"科尔沁左翼中旗"},{"name":"科尔沁左翼后旗"},{"name":"开鲁县"},{"name":"库伦旗"},{"name":"奈曼旗"},{"name":"扎鲁特旗"}]},{"name":"锡林郭勒盟","area":[{"name":"二连浩特市"},{"name":"锡林浩特市"},{"name":"阿巴嘎旗"},{"name":"苏尼特左旗"},{"name":"苏尼特右旗"},{"name":"东乌珠穆沁旗"},{"name":"西乌珠穆沁旗"},{"name":"太仆寺旗"},{"name":"镶黄旗"},{"name":"正镶白旗"},{"name":"正蓝旗"},{"name":"多伦县"}]},{"name":"乌兰察布盟","area":[{"name":"集宁市"},{"name":"丰镇市"},{"name":"卓资县"},{"name":"化德县"},{"name":"商都县"},{"name":"兴和县"},{"name":"凉城县"},{"name":"察哈尔右翼前旗"},{"name":"察哈尔右翼中旗"},{"name":"察哈尔右翼后旗"},{"name":"四子王旗"}]},{"name":"伊克昭盟","area":[{"name":"东胜市"},{"name":"达拉特旗"},{"name":"准格尔旗"},{"name":"鄂托克前旗"},{"name":"鄂托克旗"},{"name":"杭锦旗"},{"name":"乌审旗"},{"name":"伊金霍洛旗"}]},{"name":"巴彦淖尔盟","area":[{"name":"临河市"},{"name":"五原县"},{"name":"磴口县"},{"name":"乌拉特前旗"},{"name":"乌拉特中旗"},{"name":"乌拉特后旗"},{"name":"杭锦后旗"}]},{"name":"阿拉善盟","area":[{"name":"阿拉善左旗"},{"name":"阿拉善右旗"},{"name":"额济纳旗"}]}]},{"name":"辽宁省","city":[{"name":"沈阳市","area":[{"name":"沈河区"},{"name":"皇姑区"},{"name":"和平区"},{"name":"大东区"},{"name":"铁西区"},{"name":"苏家屯区"},{"name":"东陵区"},{"name":"于洪区"},{"name":"新民市"},{"name":"法库县"},{"name":"辽中县"},{"name":"康平县"},{"name":"新城子区"},{"name":"其他"}]},{"name":"大连市","area":[{"name":"西岗区"},{"name":"中山区"},{"name":"沙河口区"},{"name":"甘井子区"},{"name":"旅顺口区"},{"name":"金州区"},{"name":"瓦房店市"},{"name":"普兰店市"},{"name":"庄河市"},{"name":"长海县"},{"name":"其他"}]},{"name":"鞍山市","area":[{"name":"铁东区"},{"name":"铁西区"},{"name":"立山区"},{"name":"千山区"},{"name":"海城市"},{"name":"台安县"},{"name":"岫岩满族自治县"},{"name":"其他"}]},{"name":"抚顺市","area":[{"name":"顺城区"},{"name":"新抚区"},{"name":"东洲区"},{"name":"望花区"},{"name":"抚顺县"},{"name":"清原满族自治县"},{"name":"新宾满族自治县"},{"name":"其他"}]},{"name":"本溪市","area":[{"name":"平山区"},{"name":"明山区"},{"name":"溪湖区"},{"name":"南芬区"},{"name":"本溪满族自治县"},{"name":"桓仁满族自治县"},{"name":"其他"}]},{"name":"丹东市","area":[{"name":"振兴区"},{"name":"元宝区"},{"name":"振安区"},{"name":"东港市"},{"name":"凤城市"},{"name":"宽甸满族自治县"},{"name":"其他"}]},{"name":"锦州市","area":[{"name":"太和区"},{"name":"古塔区"},{"name":"凌河区"},{"name":"凌海市"},{"name":"黑山县"},{"name":"义县"},{"name":"北宁市"},{"name":"其他"}]},{"name":"营口市","area":[{"name":"站前区"},{"name":"西市区"},{"name":"鲅鱼圈区"},{"name":"老边区"},{"name":"大石桥市"},{"name":"盖州市"},{"name":"其他"}]},{"name":"阜新市","area":[{"name":"海州区"},{"name":"新邱区"},{"name":"太平区"},{"name":"清河门区"},{"name":"细河区"},{"name":"彰武县"},{"name":"阜新蒙古族自治县"},{"name":"其他"}]},{"name":"辽阳市","area":[{"name":"白塔区"},{"name":"文圣区"},{"name":"宏伟区"},{"name":"太子河区"},{"name":"弓长岭区"},{"name":"灯塔市"},{"name":"辽阳县"},{"name":"其他"}]},{"name":"盘锦","area":[{"name":"双台子区"},{"name":"兴隆台区"},{"name":"盘山县"},{"name":"大洼县"},{"name":"其他"}]},{"name":"铁岭市","area":[{"name":"银州区"},{"name":"清河区"},{"name":"调兵山市"},{"name":"开原市"},{"name":"铁岭县"},{"name":"昌图县"},{"name":"西丰县"},{"name":"其他"}]},{"name":"朝阳市","area":[{"name":"双塔区"},{"name":"龙城区"},{"name":"凌源市"},{"name":"北票市"},{"name":"朝阳县"},{"name":"建平县"},{"name":"喀喇沁左翼蒙古族自治县"},{"name":"其他"}]},{"name":"葫芦岛市","area":[{"name":"龙港区"},{"name":"南票区"},{"name":"连山区"},{"name":"兴城市"},{"name":"绥中县"},{"name":"建昌县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"吉林省","city":[{"name":"长春市","area":[{"name":"朝阳区"},{"name":"宽城区"},{"name":"二道区"},{"name":"南关区"},{"name":"绿园区"},{"name":"双阳区"},{"name":"九台市"},{"name":"榆树市"},{"name":"德惠市"},{"name":"农安县"},{"name":"其他"}]},{"name":"吉林市","area":[{"name":"船营区"},{"name":"昌邑区"},{"name":"龙潭区"},{"name":"丰满区"},{"name":"舒兰市"},{"name":"桦甸市"},{"name":"蛟河市"},{"name":"磐石市"},{"name":"永吉县"},{"name":"其他"}]},{"name":"四平","area":[{"name":"铁西区"},{"name":"铁东区"},{"name":"公主岭市"},{"name":"双辽市"},{"name":"梨树县"},{"name":"伊通满族自治县"},{"name":"其他"}]},{"name":"辽源市","area":[{"name":"龙山区"},{"name":"西安区"},{"name":"东辽县"},{"name":"东丰县"},{"name":"其他"}]},{"name":"通化市","area":[{"name":"东昌区"},{"name":"二道江区"},{"name":"梅河口市"},{"name":"集安市"},{"name":"通化县"},{"name":"辉南县"},{"name":"柳河县"},{"name":"其他"}]},{"name":"白山市","area":[{"name":"八道江区"},{"name":"江源区"},{"name":"临江市"},{"name":"靖宇县"},{"name":"抚松县"},{"name":"长白朝鲜族自治县"},{"name":"其他"}]},{"name":"松原市","area":[{"name":"宁江区"},{"name":"乾安县"},{"name":"长岭县"},{"name":"扶余县"},{"name":"前郭尔罗斯蒙古族自治县"},{"name":"其他"}]},{"name":"白城市","area":[{"name":"洮北区"},{"name":"大安市"},{"name":"洮南市"},{"name":"镇赉县"},{"name":"通榆县"},{"name":"其他"}]},{"name":"延边朝鲜族自治州","area":[{"name":"延吉市"},{"name":"图们市"},{"name":"敦化市"},{"name":"龙井市"},{"name":"珲春市"},{"name":"和龙市"},{"name":"安图县"},{"name":"汪清县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"黑龙江省","city":[{"name":"哈尔滨市","area":[{"name":"松北区"},{"name":"道里区"},{"name":"南岗区"},{"name":"平房区"},{"name":"香坊区"},{"name":"道外区"},{"name":"呼兰区"},{"name":"阿城区"},{"name":"双城市"},{"name":"尚志市"},{"name":"五常市"},{"name":"宾县"},{"name":"方正县"},{"name":"通河县"},{"name":"巴彦县"},{"name":"延寿县"},{"name":"木兰县"},{"name":"依兰县"},{"name":"其他"}]},{"name":"齐齐哈尔市","area":[{"name":"龙沙区"},{"name":"昂昂溪区"},{"name":"铁锋区"},{"name":"建华区"},{"name":"富拉尔基区"},{"name":"碾子山区"},{"name":"梅里斯达斡尔族区"},{"name":"讷河市"},{"name":"富裕县"},{"name":"拜泉县"},{"name":"甘南县"},{"name":"依安县"},{"name":"克山县"},{"name":"泰来县"},{"name":"克东县"},{"name":"龙江县"},{"name":"其他"}]},{"name":"鹤岗市","area":[{"name":"兴山区"},{"name":"工农区"},{"name":"南山区"},{"name":"兴安区"},{"name":"向阳区"},{"name":"东山区"},{"name":"萝北县"},{"name":"绥滨县"},{"name":"其他"}]},{"name":"双鸭山","area":[{"name":"尖山区"},{"name":"岭东区"},{"name":"四方台区"},{"name":"宝山区"},{"name":"集贤县"},{"name":"宝清县"},{"name":"友谊县"},{"name":"饶河县"},{"name":"其他"}]},{"name":"鸡西市","area":[{"name":"鸡冠区"},{"name":"恒山区"},{"name":"城子河区"},{"name":"滴道区"},{"name":"梨树区"},{"name":"麻山区"},{"name":"密山市"},{"name":"虎林市"},{"name":"鸡东县"},{"name":"其他"}]},{"name":"大庆市","area":[{"name":"萨尔图区"},{"name":"红岗区"},{"name":"龙凤区"},{"name":"让胡路区"},{"name":"大同区"},{"name":"林甸县"},{"name":"肇州县"},{"name":"肇源县"},{"name":"杜尔伯特蒙古族自治县"},{"name":"其他"}]},{"name":"伊春市","area":[{"name":"伊春区"},{"name":"带岭区"},{"name":"南岔区"},{"name":"金山屯区"},{"name":"西林区"},{"name":"美溪区"},{"name":"乌马河区"},{"name":"翠峦区"},{"name":"友好区"},{"name":"上甘岭区"},{"name":"五营区"},{"name":"红星区"},{"name":"新青区"},{"name":"汤旺河区"},{"name":"乌伊岭区"},{"name":"铁力市"},{"name":"嘉荫县"},{"name":"其他"}]},{"name":"牡丹江市","area":[{"name":"爱民区"},{"name":"东安区"},{"name":"阳明区"},{"name":"西安区"},{"name":"绥芬河市"},{"name":"宁安市"},{"name":"海林市"},{"name":"穆棱市"},{"name":"林口县"},{"name":"东宁县"},{"name":"其他"}]},{"name":"佳木斯市","area":[{"name":"向阳区"},{"name":"前进区"},{"name":"东风区"},{"name":"郊区"},{"name":"同江市"},{"name":"富锦市"},{"name":"桦川县"},{"name":"抚远县"},{"name":"桦南县"},{"name":"汤原县"},{"name":"其他"}]},{"name":"七台河市","area":[{"name":"桃山区"},{"name":"新兴区"},{"name":"茄子河区"},{"name":"勃利县"},{"name":"其他"}]},{"name":"黑河市","area":[{"name":"爱辉区"},{"name":"北安市"},{"name":"五大连池市"},{"name":"逊克县"},{"name":"嫩江县"},{"name":"孙吴县"},{"name":"其他"}]},{"name":"绥化市","area":[{"name":"北林区"},{"name":"安达市"},{"name":"肇东市"},{"name":"海伦市"},{"name":"绥棱县"},{"name":"兰西县"},{"name":"明水县"},{"name":"青冈县"},{"name":"庆安县"},{"name":"望奎县"},{"name":"其他"}]},{"name":"大兴安岭地区","area":[{"name":"呼玛县"},{"name":"塔河县"},{"name":"漠河县"},{"name":"大兴安岭辖区"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"上海市","city":[{"name":"黄浦区"},{"name":"卢湾区"},{"name":"徐汇区"},{"name":"长宁区"},{"name":"静安区"},{"name":"普陀区"},{"name":"闸北区"},{"name":"虹口区"},{"name":"杨浦区"},{"name":"宝山区"},{"name":"闵行区"},{"name":"嘉定区"},{"name":"松江区"},{"name":"金山区"},{"name":"青浦区"},{"name":"南汇区"},{"name":"奉贤区"},{"name":"浦东新区"},{"name":"崇明县"},{"name":"其他"}]},{"name":"江苏省","city":[{"name":"南京市","area":[{"name":"玄武区"},{"name":"白下区"},{"name":"秦淮区"},{"name":"建邺区"},{"name":"鼓楼区"},{"name":"下关区"},{"name":"栖霞区"},{"name":"雨花台区"},{"name":"浦口区"},{"name":"江宁区"},{"name":"六合区"},{"name":"溧水县"},{"name":"高淳县"},{"name":"其他"}]},{"name":"苏州市","area":[{"name":"金阊区"},{"name":"平江区"},{"name":"沧浪区"},{"name":"虎丘区"},{"name":"吴中区"},{"name":"相城区"},{"name":"常熟市"},{"name":"张家港市"},{"name":"昆山市"},{"name":"吴江市"},{"name":"太仓市"},{"name":"其他"}]},{"name":"无锡市","area":[{"name":"崇安区"},{"name":"南长区"},{"name":"北塘区"},{"name":"滨湖区"},{"name":"锡山区"},{"name":"惠山区"},{"name":"江阴市"},{"name":"宜兴市"},{"name":"其他"}]},{"name":"常州市","area":[{"name":"钟楼区"},{"name":"天宁区"},{"name":"戚墅堰区"},{"name":"新北区"},{"name":"武进区"},{"name":"金坛市"},{"name":"溧阳市"},{"name":"其他"}]},{"name":"镇江市","area":[{"name":"京口区"},{"name":"润州区"},{"name":"丹徒区"},{"name":"丹阳市"},{"name":"扬中市"},{"name":"句容市"},{"name":"其他"}]},{"name":"南通市","area":[{"name":"崇川区"},{"name":"港闸区"},{"name":"通州市"},{"name":"如皋市"},{"name":"海门市"},{"name":"启东市"},{"name":"海安县"},{"name":"如东县"},{"name":"其他"}]},{"name":"泰州市","area":[{"name":"海陵区"},{"name":"高港区"},{"name":"姜堰市"},{"name":"泰兴市"},{"name":"靖江市"},{"name":"兴化市"},{"name":"其他"}]},{"name":"扬州市","area":[{"name":"广陵区"},{"name":"维扬区"},{"name":"邗江区"},{"name":"江都市"},{"name":"仪征市"},{"name":"高邮市"},{"name":"宝应县"},{"name":"其他"}]},{"name":"盐城市","area":[{"name":"亭湖区"},{"name":"盐都区"},{"name":"大丰市"},{"name":"东台市"},{"name":"建湖县"},{"name":"射阳县"},{"name":"阜宁县"},{"name":"滨海县"},{"name":"响水县"},{"name":"其他"}]},{"name":"连云港市","area":[{"name":"新浦区"},{"name":"海州区"},{"name":"连云区"},{"name":"东海县"},{"name":"灌云县"},{"name":"赣榆县"},{"name":"灌南县"},{"name":"其他"}]},{"name":"徐州市","area":[{"name":"云龙区"},{"name":"鼓楼区"},{"name":"九里区"},{"name":"泉山区"},{"name":"贾汪区"},{"name":"邳州市"},{"name":"新沂市"},{"name":"铜山县"},{"name":"睢宁县"},{"name":"沛县"},{"name":"丰县"},{"name":"其他"}]},{"name":"淮安市","area":[{"name":"清河区"},{"name":"清浦区"},{"name":"楚州区"},{"name":"淮阴区"},{"name":"涟水县"},{"name":"洪泽县"},{"name":"金湖县"},{"name":"盱眙县"},{"name":"其他"}]},{"name":"宿迁市","area":[{"name":"宿城区"},{"name":"宿豫区"},{"name":"沭阳县"},{"name":"泗阳县"},{"name":"泗洪县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"浙江省","city":[{"name":"杭州市","area":[{"name":"拱墅区"},{"name":"西湖区"},{"name":"上城区"},{"name":"下城区"},{"name":"江干区"},{"name":"滨江区"},{"name":"余杭区"},{"name":"萧山区"},{"name":"建德市"},{"name":"富阳市"},{"name":"临安市"},{"name":"桐庐县"},{"name":"淳安县"},{"name":"其他"}]},{"name":"宁波市","area":[{"name":"海曙区"},{"name":"江东区"},{"name":"江北区"},{"name":"镇海区"},{"name":"北仑区"},{"name":"鄞州区"},{"name":"余姚市"},{"name":"慈溪市"},{"name":"奉化市"},{"name":"宁海县"},{"name":"象山县"},{"name":"其他"}]},{"name":"温州市","area":[{"name":"鹿城区"},{"name":"龙湾区"},{"name":"瓯海区"},{"name":"瑞安市"},{"name":"乐清市"},{"name":"永嘉县"},{"name":"洞头县"},{"name":"平阳县"},{"name":"苍南县"},{"name":"文成县"},{"name":"泰顺县"},{"name":"其他"}]},{"name":"嘉兴市","area":[{"name":"秀城区"},{"name":"秀洲区"},{"name":"海宁市"},{"name":"平湖市"},{"name":"桐乡市"},{"name":"嘉善县"},{"name":"海盐县"},{"name":"其他"}]},{"name":"湖州市","area":[{"name":"吴兴区"},{"name":"南浔区"},{"name":"长兴县"},{"name":"德清县"},{"name":"安吉县"},{"name":"其他"}]},{"name":"绍兴市","area":[{"name":"越城区"},{"name":"诸暨市"},{"name":"上虞市"},{"name":"嵊州市"},{"name":"绍兴县"},{"name":"新昌县"},{"name":"其他"}]},{"name":"金华市","area":[{"name":"婺城区"},{"name":"金东区"},{"name":"兰溪市"},{"name":"义乌市"},{"name":"东阳市"},{"name":"永康市"},{"name":"武义县"},{"name":"浦江县"},{"name":"磐安县"},{"name":"其他"}]},{"name":"衢州市","area":[{"name":"柯城区"},{"name":"衢江区"},{"name":"江山市"},{"name":"龙游县"},{"name":"常山县"},{"name":"开化县"},{"name":"其他"}]},{"name":"舟山市","area":[{"name":"定海区"},{"name":"普陀区"},{"name":"岱山县"},{"name":"嵊泗县"},{"name":"其他"}]},{"name":"台州市","area":[{"name":"椒江区"},{"name":"黄岩区"},{"name":"路桥区"},{"name":"临海市"},{"name":"温岭市"},{"name":"玉环县"},{"name":"天台县"},{"name":"仙居县"},{"name":"三门县"},{"name":"其他"}]},{"name":"丽水市","area":[{"name":"莲都区"},{"name":"龙泉市"},{"name":"缙云县"},{"name":"青田县"},{"name":"云和县"},{"name":"遂昌县"},{"name":"松阳县"},{"name":"庆元县"},{"name":"景宁畲族自治县"},{"name":"其他"}]},{"name":"其他市","area":[{"name":"其他"}]}]},{"name":"安徽省","city":[{"name":"合肥市","area":[{"name":"庐阳区"},{"name":"瑶海区"},{"name":"蜀山区"},{"name":"包河区"},{"name":"长丰县"},{"name":"肥东县"},{"name":"肥西县"},{"name":"其他"}]},{"name":"芜湖市","area":[{"name":"镜湖区"},{"name":"弋江区"},{"name":"鸠江区"},{"name":"三山区"},{"name":"芜湖县"},{"name":"南陵县"},{"name":"繁昌县"},{"name":"其他"}]},{"name":"蚌埠市","area":[{"name":"蚌山区"},{"name":"龙子湖区"},{"name":"禹会区"},{"name":"淮上区"},{"name":"怀远县"},{"name":"固镇县"},{"name":"五河县"},{"name":"其他"}]},{"name":"淮南市","area":[{"name":"田家庵区"},{"name":"大通区"},{"name":"谢家集区"},{"name":"八公山区"},{"name":"潘集区"},{"name":"凤台县"},{"name":"其他"}]},{"name":"马鞍山市","area":[{"name":"雨山区"},{"name":"花山区"},{"name":"金家庄区"},{"name":"当涂县"},{"name":"其他"}]},{"name":"淮北市","area":[{"name":"相山区"},{"name":"杜集区"},{"name":"烈山区"},{"name":"濉溪县"},{"name":"其他"}]},{"name":"铜陵市","area":[{"name":"铜官山区"},{"name":"狮子山区"},{"name":"郊区"},{"name":"铜陵县"},{"name":"其他"}]},{"name":"安庆市","area":[{"name":"迎江区"},{"name":"大观区"},{"name":"宜秀区"},{"name":"桐城市"},{"name":"宿松县"},{"name":"枞阳县"},{"name":"太湖县"},{"name":"怀宁县"},{"name":"岳西县"},{"name":"望江县"},{"name":"潜山县"},{"name":"其他"}]},{"name":"黄山市","area":[{"name":"屯溪区"},{"name":"黄山区"},{"name":"徽州区"},{"name":"休宁县"},{"name":"歙县"},{"name":"祁门县"},{"name":"黟县"},{"name":"其他"}]},{"name":"滁州市","area":[{"name":"琅琊区"},{"name":"南谯区"},{"name":"天长市"},{"name":"明光市"},{"name":"全椒县"},{"name":"来安县"},{"name":"定远县"},{"name":"凤阳县"},{"name":"其他"}]},{"name":"阜阳市","area":[{"name":"颍州区"},{"name":"颍东区"},{"name":"颍泉区"},{"name":"界首市"},{"name":"临泉县"},{"name":"颍上县"},{"name":"阜南县"},{"name":"太和县"},{"name":"其他"}]},{"name":"宿州市","area":[{"name":"埇桥区"},{"name":"萧县"},{"name":"泗县"},{"name":"砀山县"},{"name":"灵璧县"},{"name":"其他"}]},{"name":"巢湖市","area":[{"name":"居巢区"},{"name":"含山县"},{"name":"无为县"},{"name":"庐江县"},{"name":"和县"},{"name":"其他"}]},{"name":"六安市","area":[{"name":"金安区"},{"name":"裕安区"},{"name":"寿县"},{"name":"霍山县"},{"name":"霍邱县"},{"name":"舒城县"},{"name":"金寨县"},{"name":"其他"}]},{"name":"亳州市","area":[{"name":"谯城区"},{"name":"利辛县"},{"name":"涡阳县"},{"name":"蒙城县"},{"name":"其他"}]},{"name":"池州市","area":[{"name":"贵池区"},{"name":"东至县"},{"name":"石台县"},{"name":"青阳县"},{"name":"其他"}]},{"name":"宣城市","area":[{"name":"宣州区"},{"name":"宁国市"},{"name":"广德县"},{"name":"郎溪县"},{"name":"泾县"},{"name":"旌德县"},{"name":"绩溪县"},{"name":"其他"}]},{"name":"其他市","area":[{"name":"其他"}]}]},{"name":"福建省","city":[{"name":"福州市","area":[{"name":"鼓楼区"},{"name":"台江区"},{"name":"仓山区"},{"name":"马尾区"},{"name":"晋安区"},{"name":"福清市"},{"name":"长乐市"},{"name":"闽侯县"},{"name":"闽清县"},{"name":"永泰县"},{"name":"连江县"},{"name":"罗源县"},{"name":"平潭县"},{"name":"其他"}]},{"name":"厦门市","area":[{"name":"思明区"},{"name":"海沧区"},{"name":"湖里区"},{"name":"集美区"},{"name":"同安区"},{"name":"翔安区"},{"name":"其他"}]},{"name":"莆田市","area":[{"name":"城厢区"},{"name":"涵江区"},{"name":"荔城区"},{"name":"秀屿区"},{"name":"仙游县"},{"name":"其他"}]},{"name":"三明市","area":[{"name":"梅列区"},{"name":"三元区"},{"name":"永安市"},{"name":"明溪县"},{"name":"将乐县"},{"name":"大田县"},{"name":"宁化县"},{"name":"建宁县"},{"name":"沙县"},{"name":"尤溪县"},{"name":"清流县"},{"name":"泰宁县"},{"name":"其他"}]},{"name":"泉州市","area":[{"name":"鲤城区"},{"name":"丰泽区"},{"name":"洛江区"},{"name":"泉港区"},{"name":"石狮市"},{"name":"晋江市"},{"name":"南安市"},{"name":"惠安县"},{"name":"永春县"},{"name":"安溪县"},{"name":"德化县"},{"name":"金门县"},{"name":"其他"}]},{"name":"漳州市","area":[{"name":"芗城区"},{"name":"龙文区"},{"name":"龙海市"},{"name":"平和县"},{"name":"南靖县"},{"name":"诏安县"},{"name":"漳浦县"},{"name":"华安县"},{"name":"东山县"},{"name":"长泰县"},{"name":"云霄县"},{"name":"其他"}]},{"name":"南平市","area":[{"name":"延平区"},{"name":"建瓯市"},{"name":"邵武市"},{"name":"武夷山市"},{"name":"建阳市"},{"name":"松溪县"},{"name":"光泽县"},{"name":"顺昌县"},{"name":"浦城县"},{"name":"政和县"},{"name":"其他"}]},{"name":"龙岩市","area":[{"name":"新罗区"},{"name":"漳平市"},{"name":"长汀县"},{"name":"武平县"},{"name":"上杭县"},{"name":"永定县"},{"name":"连城县"},{"name":"其他"}]},{"name":"宁德市","area":[{"name":"蕉城区"},{"name":"福安市"},{"name":"福鼎市"},{"name":"寿宁县"},{"name":"霞浦县"},{"name":"柘荣县"},{"name":"屏南县"},{"name":"古田县"},{"name":"周宁县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"江西省","city":[{"name":"南昌市","area":[{"name":"东湖区"},{"name":"西湖区"},{"name":"青云谱区"},{"name":"湾里区"},{"name":"青山湖区"},{"name":"新建县"},{"name":"南昌县"},{"name":"进贤县"},{"name":"安义县"},{"name":"其他"}]},{"name":"景德镇市","area":[{"name":"珠山区"},{"name":"昌江区"},{"name":"乐平市"},{"name":"浮梁县"},{"name":"其他"}]},{"name":"萍乡市","area":[{"name":"安源区"},{"name":"湘东区"},{"name":"莲花县"},{"name":"上栗县"},{"name":"芦溪县"},{"name":"其他"}]},{"name":"九江市","area":[{"name":"浔阳区"},{"name":"庐山区"},{"name":"瑞昌市"},{"name":"九江县"},{"name":"星子县"},{"name":"武宁县"},{"name":"彭泽县"},{"name":"永修县"},{"name":"修水县"},{"name":"湖口县"},{"name":"德安县"},{"name":"都昌县"},{"name":"其他"}]},{"name":"新余市","area":[{"name":"渝水区"},{"name":"分宜县"},{"name":"其他"}]},{"name":"鹰潭市","area":[{"name":"月湖区"},{"name":"贵溪市"},{"name":"余江县"},{"name":"其他"}]},{"name":"赣州市","area":[{"name":"章贡区"},{"name":"瑞金市"},{"name":"南康市"},{"name":"石城县"},{"name":"安远县"},{"name":"赣县"},{"name":"宁都县"},{"name":"寻乌县"},{"name":"兴国县"},{"name":"定南县"},{"name":"上犹县"},{"name":"于都县"},{"name":"龙南县"},{"name":"崇义县"},{"name":"信丰县"},{"name":"全南县"},{"name":"大余县"},{"name":"会昌县"},{"name":"其他"}]},{"name":"吉安市","area":[{"name":"吉州区"},{"name":"青原区"},{"name":"井冈山市"},{"name":"吉安县"},{"name":"永丰县"},{"name":"永新县"},{"name":"新干县"},{"name":"泰和县"},{"name":"峡江县"},{"name":"遂川县"},{"name":"安福县"},{"name":"吉水县"},{"name":"万安县"},{"name":"其他"}]},{"name":"宜春市","area":[{"name":"袁州区"},{"name":"丰城市"},{"name":"樟树市"},{"name":"高安市"},{"name":"铜鼓县"},{"name":"靖安县"},{"name":"宜丰县"},{"name":"奉新县"},{"name":"万载县"},{"name":"上高县"},{"name":"其他"}]},{"name":"抚州市","area":[{"name":"临川区"},{"name":"南丰县"},{"name":"乐安县"},{"name":"金溪县"},{"name":"南城县"},{"name":"东乡县"},{"name":"资溪县"},{"name":"宜黄县"},{"name":"广昌县"},{"name":"黎川县"},{"name":"崇仁县"},{"name":"其他"}]},{"name":"上饶市","area":[{"name":"信州区"},{"name":"德兴市"},{"name":"上饶县"},{"name":"广丰县"},{"name":"鄱阳县"},{"name":"婺源县"},{"name":"铅山县"},{"name":"余干县"},{"name":"横峰县"},{"name":"弋阳县"},{"name":"玉山县"},{"name":"万年县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"山东省","city":[{"name":"济南市","area":[{"name":"市中区"},{"name":"历下区"},{"name":"天桥区"},{"name":"槐荫区"},{"name":"历城区"},{"name":"长清区"},{"name":"章丘市"},{"name":"平阴县"},{"name":"济阳县"},{"name":"商河县"},{"name":"其他"}]},{"name":"青岛市","area":[{"name":"市南区"},{"name":"市北区"},{"name":"城阳区"},{"name":"四方区"},{"name":"李沧区"},{"name":"黄岛区"},{"name":"崂山区"},{"name":"胶南市"},{"name":"胶州市"},{"name":"平度市"},{"name":"莱西市"},{"name":"即墨市"},{"name":"其他"}]},{"name":"淄博市","area":[{"name":"张店区"},{"name":"临淄区"},{"name":"淄川区"},{"name":"博山区"},{"name":"周村区"},{"name":"桓台县"},{"name":"高青县"},{"name":"沂源县"},{"name":"其他"}]},{"name":"枣庄市","area":[{"name":"市中区"},{"name":"山亭区"},{"name":"峄城区"},{"name":"台儿庄区"},{"name":"薛城区"},{"name":"滕州市"},{"name":"其他"}]},{"name":"东营市","area":[{"name":"东营区"},{"name":"河口区"},{"name":"垦利县"},{"name":"广饶县"},{"name":"利津县"},{"name":"其他"}]},{"name":"烟台市","area":[{"name":"芝罘区"},{"name":"福山区"},{"name":"牟平区"},{"name":"莱山区"},{"name":"龙口市"},{"name":"莱阳市"},{"name":"莱州市"},{"name":"招远市"},{"name":"蓬莱市"},{"name":"栖霞市"},{"name":"海阳市"},{"name":"长岛县"},{"name":"其他"}]},{"name":"潍坊市","area":[{"name":"潍城区"},{"name":"寒亭区"},{"name":"坊子区"},{"name":"奎文区"},{"name":"青州市"},{"name":"诸城市"},{"name":"寿光市"},{"name":"安丘市"},{"name":"高密市"},{"name":"昌邑市"},{"name":"昌乐县"},{"name":"临朐县"},{"name":"其他"}]},{"name":"济宁市","area":[{"name":"市中区"},{"name":"任城区"},{"name":"曲阜市"},{"name":"兖州市"},{"name":"邹城市"},{"name":"鱼台县"},{"name":"金乡县"},{"name":"嘉祥县"},{"name":"微山县"},{"name":"汶上县"},{"name":"泗水县"},{"name":"梁山县"},{"name":"其他"}]},{"name":"泰安市","area":[{"name":"泰山区"},{"name":"岱岳区"},{"name":"新泰市"},{"name":"肥城市"},{"name":"宁阳县"},{"name":"东平县"},{"name":"其他"}]},{"name":"威海市","area":[{"name":"环翠区"},{"name":"乳山市"},{"name":"文登市"},{"name":"荣成市"},{"name":"其他"}]},{"name":"日照市","area":[{"name":"东港区"},{"name":"岚山区"},{"name":"五莲县"},{"name":"莒县"},{"name":"其他"}]},{"name":"莱芜市","area":[{"name":"莱城区"},{"name":"钢城区"},{"name":"其他"}]},{"name":"临沂市","area":[{"name":"兰山区"},{"name":"罗庄区"},{"name":"河东区"},{"name":"沂南县"},{"name":"郯城县"},{"name":"沂水县"},{"name":"苍山县"},{"name":"费县"},{"name":"平邑县"},{"name":"莒南县"},{"name":"蒙阴县"},{"name":"临沭县"},{"name":"其他"}]},{"name":"德州市","area":[{"name":"德城区"},{"name":"乐陵市"},{"name":"禹城市"},{"name":"陵县"},{"name":"宁津县"},{"name":"齐河县"},{"name":"武城县"},{"name":"庆云县"},{"name":"平原县"},{"name":"夏津县"},{"name":"临邑县"},{"name":"其他"}]},{"name":"聊城市","area":[{"name":"东昌府区"},{"name":"临清市"},{"name":"高唐县"},{"name":"阳谷县"},{"name":"茌平县"},{"name":"莘县"},{"name":"东阿县"},{"name":"冠县"},{"name":"其他"}]},{"name":"滨州市","area":[{"name":"滨城区"},{"name":"邹平县"},{"name":"沾化县"},{"name":"惠民县"},{"name":"博兴县"},{"name":"阳信县"},{"name":"无棣县"},{"name":"其他"}]},{"name":"菏泽市","area":[{"name":"牡丹区"},{"name":"鄄城县"},{"name":"单县"},{"name":"郓城县"},{"name":"曹县"},{"name":"定陶县"},{"name":"巨野县"},{"name":"东明县"},{"name":"成武县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"河南省","city":[{"name":"郑州市","area":[{"name":"中原区"},{"name":"金水区"},{"name":"二七区"},{"name":"管城回族区"},{"name":"上街区"},{"name":"惠济区"},{"name":"巩义市"},{"name":"新郑市"},{"name":"新密市"},{"name":"登封市"},{"name":"荥阳市"},{"name":"中牟县"},{"name":"其他"}]},{"name":"开封市","area":[{"name":"鼓楼区"},{"name":"龙亭区"},{"name":"顺河回族区"},{"name":"禹王台区"},{"name":"金明区"},{"name":"开封县"},{"name":"尉氏县"},{"name":"兰考县"},{"name":"杞县"},{"name":"通许县"},{"name":"其他"}]},{"name":"洛阳市","area":[{"name":"西工区"},{"name":"老城区"},{"name":"涧西区"},{"name":"瀍河回族区"},{"name":"洛龙区"},{"name":"吉利区"},{"name":"偃师市"},{"name":"孟津县"},{"name":"汝阳县"},{"name":"伊川县"},{"name":"洛宁县"},{"name":"嵩县"},{"name":"宜阳县"},{"name":"新安县"},{"name":"栾川县"},{"name":"其他"}]},{"name":"平顶山市","area":[{"name":"新华区"},{"name":"卫东区"},{"name":"湛河区"},{"name":"石龙区"},{"name":"汝州市"},{"name":"舞钢市"},{"name":"宝丰县"},{"name":"叶县"},{"name":"郏县"},{"name":"鲁山县"},{"name":"其他"}]},{"name":"安阳市","area":[{"name":"北关区"},{"name":"文峰区"},{"name":"殷都区"},{"name":"龙安区"},{"name":"林州市"},{"name":"安阳县"},{"name":"滑县"},{"name":"内黄县"},{"name":"汤阴县"},{"name":"其他"}]},{"name":"鹤壁市","area":[{"name":"淇滨区"},{"name":"山城区"},{"name":"鹤山区"},{"name":"浚县"},{"name":"淇县"},{"name":"其他"}]},{"name":"新乡市","area":[{"name":"卫滨区"},{"name":"红旗区"},{"name":"凤泉区"},{"name":"牧野区"},{"name":"卫辉市"},{"name":"辉县市"},{"name":"新乡县"},{"name":"获嘉县"},{"name":"原阳县"},{"name":"长垣县"},{"name":"封丘县"},{"name":"延津县"},{"name":"其他"}]},{"name":"焦作市","area":[{"name":"解放区"},{"name":"中站区"},{"name":"马村区"},{"name":"山阳区"},{"name":"沁阳市"},{"name":"孟州市"},{"name":"修武县"},{"name":"温县"},{"name":"武陟县"},{"name":"博爱县"},{"name":"其他"}]},{"name":"濮阳市","area":[{"name":"华龙区"},{"name":"濮阳县"},{"name":"南乐县"},{"name":"台前县"},{"name":"清丰县"},{"name":"范县"},{"name":"其他"}]},{"name":"许昌市","area":[{"name":"魏都区"},{"name":"禹州市"},{"name":"长葛市"},{"name":"许昌县"},{"name":"鄢陵县"},{"name":"襄城县"},{"name":"其他"}]},{"name":"漯河市","area":[{"name":"源汇区"},{"name":"郾城区"},{"name":"召陵区"},{"name":"临颍县"},{"name":"舞阳县"},{"name":"其他"}]},{"name":"三门峡市","area":[{"name":"湖滨区"},{"name":"义马市"},{"name":"灵宝市"},{"name":"渑池县"},{"name":"卢氏县"},{"name":"陕县"},{"name":"其他"}]},{"name":"南阳市","area":[{"name":"卧龙区"},{"name":"宛城区"},{"name":"邓州市"},{"name":"桐柏县"},{"name":"方城县"},{"name":"淅川县"},{"name":"镇平县"},{"name":"唐河县"},{"name":"南召县"},{"name":"内乡县"},{"name":"新野县"},{"name":"社旗县"},{"name":"西峡县"},{"name":"其他"}]},{"name":"商丘市","area":[{"name":"梁园区"},{"name":"睢阳区"},{"name":"永城市"},{"name":"宁陵县"},{"name":"虞城县"},{"name":"民权县"},{"name":"夏邑县"},{"name":"柘城县"},{"name":"睢县"},{"name":"其他"}]},{"name":"信阳市","area":[{"name":"浉河区"},{"name":"平桥区"},{"name":"潢川县"},{"name":"淮滨县"},{"name":"息县"},{"name":"新县"},{"name":"商城县"},{"name":"固始县"},{"name":"罗山县"},{"name":"光山县"},{"name":"其他"}]},{"name":"周口市","area":[{"name":"川汇区"},{"name":"项城市"},{"name":"商水县"},{"name":"淮阳县"},{"name":"太康县"},{"name":"鹿邑县"},{"name":"西华县"},{"name":"扶沟县"},{"name":"沈丘县"},{"name":"郸城县"},{"name":"其他"}]},{"name":"驻马店市","area":[{"name":"驿城区"},{"name":"确山县"},{"name":"新蔡县"},{"name":"上蔡县"},{"name":"西平县"},{"name":"泌阳县"},{"name":"平舆县"},{"name":"汝南县"},{"name":"遂平县"},{"name":"正阳县"},{"name":"其他"}]},{"name":"焦作市","area":[{"name":"济源市"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"湖北省","city":[{"name":"武汉市","area":[{"name":"江岸区"},{"name":"武昌区"},{"name":"江汉区"},{"name":"硚口区"},{"name":"汉阳区"},{"name":"青山区"},{"name":"洪山区"},{"name":"东西湖区"},{"name":"汉南区"},{"name":"蔡甸区"},{"name":"江夏区"},{"name":"黄陂区"},{"name":"新洲区"},{"name":"其他"}]},{"name":"黄石市","area":[{"name":"黄石港区"},{"name":"西塞山区"},{"name":"下陆区"},{"name":"铁山区"},{"name":"大冶市"},{"name":"阳新县"},{"name":"其他"}]},{"name":"十堰市","area":[{"name":"张湾区"},{"name":"茅箭区"},{"name":"丹江口市"},{"name":"郧县"},{"name":"竹山县"},{"name":"房县"},{"name":"郧西县"},{"name":"竹溪县"},{"name":"其他"}]},{"name":"荆州市","area":[{"name":"沙市区"},{"name":"荆州区"},{"name":"洪湖市"},{"name":"石首市"},{"name":"松滋市"},{"name":"监利县"},{"name":"公安县"},{"name":"江陵县"},{"name":"其他"}]},{"name":"宜昌市","area":[{"name":"西陵区"},{"name":"伍家岗区"},{"name":"点军区"},{"name":"猇亭区"},{"name":"夷陵区"},{"name":"宜都市"},{"name":"当阳市"},{"name":"枝江市"},{"name":"秭归县"},{"name":"远安县"},{"name":"兴山县"},{"name":"五峰土家族自治县"},{"name":"长阳土家族自治县"},{"name":"其他"}]},{"name":"襄阳市","area":[{"name":"襄城区"},{"name":"樊城区"},{"name":"襄阳区"},{"name":"老河口市"},{"name":"枣阳市"},{"name":"宜城市"},{"name":"南漳县"},{"name":"谷城县"},{"name":"保康县"},{"name":"其他"}]},{"name":"鄂州市","area":[{"name":"鄂城区"},{"name":"华容区"},{"name":"梁子湖区"},{"name":"其他"}]},{"name":"荆门市","area":[{"name":"东宝区"},{"name":"掇刀区"},{"name":"钟祥市"},{"name":"京山县"},{"name":"沙洋县"},{"name":"其他"}]},{"name":"孝感市","area":[{"name":"孝南区"},{"name":"应城市"},{"name":"安陆市"},{"name":"汉川市"},{"name":"云梦县"},{"name":"大悟县"},{"name":"孝昌县"},{"name":"其他"}]},{"name":"黄冈市","area":[{"name":"黄州区"},{"name":"麻城市"},{"name":"武穴市"},{"name":"红安县"},{"name":"罗田县"},{"name":"浠水县"},{"name":"蕲春县"},{"name":"黄梅县"},{"name":"英山县"},{"name":"团风县"},{"name":"其他"}]},{"name":"咸宁市","area":[{"name":"咸安区"},{"name":"赤壁市"},{"name":"嘉鱼县"},{"name":"通山县"},{"name":"崇阳县"},{"name":"通城县"},{"name":"其他"}]},{"name":"随州市","area":[{"name":"曾都区"},{"name":"广水市"},{"name":"其他"}]},{"name":"恩施土家族苗族自治州","area":[{"name":"恩施市"},{"name":"利川市"},{"name":"建始县"},{"name":"来凤县"},{"name":"巴东县"},{"name":"鹤峰县"},{"name":"宣恩县"},{"name":"咸丰县"},{"name":"其他"}]},{"name":"仙桃市","area":[{"name":"仙桃"}]},{"name":"天门市","area":[{"name":"天门"}]},{"name":"潜江市","area":[{"name":"潜江"}]},{"name":"神农架林区","area":[{"name":"神农架林区"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"湖南省","city":[{"name":"长沙市","area":[{"name":"岳麓区"},{"name":"芙蓉区"},{"name":"天心区"},{"name":"开福区"},{"name":"雨花区"},{"name":"浏阳市"},{"name":"长沙县"},{"name":"望城县"},{"name":"宁乡县"},{"name":"其他"}]},{"name":"株洲市","area":[{"name":"天元区"},{"name":"荷塘区"},{"name":"芦淞区"},{"name":"石峰区"},{"name":"醴陵市"},{"name":"株洲县"},{"name":"炎陵县"},{"name":"茶陵县"},{"name":"攸县"},{"name":"其他"}]},{"name":"湘潭市","area":[{"name":"岳塘区"},{"name":"雨湖区"},{"name":"湘乡市"},{"name":"韶山市"},{"name":"湘潭县"},{"name":"其他"}]},{"name":"衡阳市","area":[{"name":"雁峰区"},{"name":"珠晖区"},{"name":"石鼓区"},{"name":"蒸湘区"},{"name":"南岳区"},{"name":"耒阳市"},{"name":"常宁市"},{"name":"衡阳县"},{"name":"衡东县"},{"name":"衡山县"},{"name":"衡南县"},{"name":"祁东县"},{"name":"其他"}]},{"name":"邵阳市","area":[{"name":"双清区"},{"name":"大祥区"},{"name":"北塔区"},{"name":"武冈市"},{"name":"邵东县"},{"name":"洞口县"},{"name":"新邵县"},{"name":"绥宁县"},{"name":"新宁县"},{"name":"邵阳县"},{"name":"隆回县"},{"name":"城步苗族自治县"},{"name":"其他"}]},{"name":"岳阳市","area":[{"name":"岳阳楼区"},{"name":"云溪区"},{"name":"君山区"},{"name":"临湘市"},{"name":"汨罗市"},{"name":"岳阳县"},{"name":"湘阴县"},{"name":"平江县"},{"name":"华容县"},{"name":"其他"}]},{"name":"常德市","area":[{"name":"武陵区"},{"name":"鼎城区"},{"name":"津市市"},{"name":"澧县"},{"name":"临澧县"},{"name":"桃源县"},{"name":"汉寿县"},{"name":"安乡县"},{"name":"石门县"},{"name":"其他"}]},{"name":"张家界市","area":[{"name":"永定区"},{"name":"武陵源区"},{"name":"慈利县"},{"name":"桑植县"},{"name":"其他"}]},{"name":"益阳市","area":[{"name":"赫山区"},{"name":"资阳区"},{"name":"沅江市"},{"name":"桃江县"},{"name":"南县"},{"name":"安化县"},{"name":"其他"}]},{"name":"郴州市","area":[{"name":"北湖区"},{"name":"苏仙区"},{"name":"资兴市"},{"name":"宜章县"},{"name":"汝城县"},{"name":"安仁县"},{"name":"嘉禾县"},{"name":"临武县"},{"name":"桂东县"},{"name":"永兴县"},{"name":"桂阳县"},{"name":"其他"}]},{"name":"永州市","area":[{"name":"冷水滩区"},{"name":"零陵区"},{"name":"祁阳县"},{"name":"蓝山县"},{"name":"宁远县"},{"name":"新田县"},{"name":"东安县"},{"name":"江永县"},{"name":"道县"},{"name":"双牌县"},{"name":"江华瑶族自治县"},{"name":"其他"}]},{"name":"怀化市","area":[{"name":"鹤城区"},{"name":"洪江市"},{"name":"会同县"},{"name":"沅陵县"},{"name":"辰溪县"},{"name":"溆浦县"},{"name":"中方县"},{"name":"新晃侗族自治县"},{"name":"芷江侗族自治县"},{"name":"通道侗族自治县"},{"name":"靖州苗族侗族自治县"},{"name":"麻阳苗族自治县"},{"name":"其他"}]},{"name":"娄底市","area":[{"name":"娄星区"},{"name":"冷水江市"},{"name":"涟源市"},{"name":"新化县"},{"name":"双峰县"},{"name":"其他"}]},{"name":"湘西土家族苗族自治州","area":[{"name":"吉首市"},{"name":"古丈县"},{"name":"龙山县"},{"name":"永顺县"},{"name":"凤凰县"},{"name":"泸溪县"},{"name":"保靖县"},{"name":"花垣县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"广东省","city":[{"name":"广州市","area":[{"name":"越秀区"},{"name":"荔湾区"},{"name":"海珠区"},{"name":"天河区"},{"name":"白云区"},{"name":"黄埔区"},{"name":"番禺区"},{"name":"花都区"},{"name":"南沙区"},{"name":"萝岗区"},{"name":"增城市"},{"name":"从化市"},{"name":"其他"}]},{"name":"深圳市","area":[{"name":"福田区"},{"name":"罗湖区"},{"name":"南山区"},{"name":"宝安区"},{"name":"龙岗区"},{"name":"盐田区"},{"name":"其他"}]},{"name":"东莞市","area":[{"name":"莞城"},{"name":"常平"},{"name":"塘厦"},{"name":"塘厦"},{"name":"塘厦"},{"name":"其他"}]},{"name":"中山市","area":[{"name":"中山"}]},{"name":"潮州市","area":[{"name":"湘桥区"},{"name":"潮安县"},{"name":"饶平县"},{"name":"其他"}]},{"name":"揭阳市","area":[{"name":"榕城区"},{"name":"揭东县"},{"name":"揭西县"},{"name":"惠来县"},{"name":"普宁市"},{"name":"其他"}]},{"name":"云浮市","area":[{"name":"云城区"},{"name":"新兴县"},{"name":"郁南县"},{"name":"云安县"},{"name":"罗定市"},{"name":"其他"}]},{"name":"珠海市","area":[{"name":"香洲区"},{"name":"斗门区"},{"name":"金湾区"},{"name":"其他"}]},{"name":"汕头市","area":[{"name":"金平区"},{"name":"濠江区"},{"name":"龙湖区"},{"name":"潮阳区"},{"name":"潮南区"},{"name":"澄海区"},{"name":"南澳县"},{"name":"其他"}]},{"name":"韶关市","area":[{"name":"浈江区"},{"name":"武江区"},{"name":"曲江区"},{"name":"乐昌市"},{"name":"南雄市"},{"name":"始兴县"},{"name":"仁化县"},{"name":"翁源县"},{"name":"新丰县"},{"name":"乳源瑶族自治县"},{"name":"其他"}]},{"name":"佛山市","area":[{"name":"禅城区"},{"name":"南海区"},{"name":"顺德区"},{"name":"三水区"},{"name":"高明区"},{"name":"其他"}]},{"name":"江门市","area":[{"name":"蓬江区"},{"name":"江海区"},{"name":"新会区"},{"name":"恩平市"},{"name":"台山市"},{"name":"开平市"},{"name":"鹤山市"},{"name":"其他"}]},{"name":"湛江市","area":[{"name":"赤坎区"},{"name":"霞山区"},{"name":"坡头区"},{"name":"麻章区"},{"name":"吴川市"},{"name":"廉江市"},{"name":"雷州市"},{"name":"遂溪县"},{"name":"徐闻县"},{"name":"其他"}]},{"name":"茂名市","area":[{"name":"茂南区"},{"name":"茂港区"},{"name":"化州市"},{"name":"信宜市"},{"name":"高州市"},{"name":"电白县"},{"name":"其他"}]},{"name":"肇庆市","area":[{"name":"端州区"},{"name":"鼎湖区"},{"name":"高要市"},{"name":"四会市"},{"name":"广宁县"},{"name":"怀集县"},{"name":"封开县"},{"name":"德庆县"},{"name":"其他"}]},{"name":"惠州市","area":[{"name":"惠城区"},{"name":"惠阳区"},{"name":"博罗县"},{"name":"惠东县"},{"name":"龙门县"},{"name":"其他"}]},{"name":"梅州市","area":[{"name":"梅江区"},{"name":"兴宁市"},{"name":"梅县"},{"name":"大埔县"},{"name":"丰顺县"},{"name":"五华县"},{"name":"平远县"},{"name":"蕉岭县"},{"name":"其他"}]},{"name":"汕尾市","area":[{"name":"城区"},{"name":"陆丰市"},{"name":"海丰县"},{"name":"陆河县"},{"name":"其他"}]},{"name":"河源市","area":[{"name":"源城区"},{"name":"紫金县"},{"name":"龙川县"},{"name":"连平县"},{"name":"和平县"},{"name":"东源县"},{"name":"其他"}]},{"name":"阳江市","area":[{"name":"江城区"},{"name":"阳春市"},{"name":"阳西县"},{"name":"阳东县"},{"name":"其他"}]},{"name":"清远市","area":[{"name":"清城区"},{"name":"英德市"},{"name":"连州市"},{"name":"佛冈县"},{"name":"阳山县"},{"name":"清新县"},{"name":"连山壮族瑶族自治县"},{"name":"连南瑶族自治县"},{"name":"其他"}]}]},{"name":"广西","city":[{"name":"南宁市","area":[{"name":"青秀区"},{"name":"兴宁区"},{"name":"西乡塘区"},{"name":"良庆区"},{"name":"江南区"},{"name":"邕宁区"},{"name":"武鸣县"},{"name":"隆安县"},{"name":"马山县"},{"name":"上林县"},{"name":"宾阳县"},{"name":"横县"},{"name":"其他"}]},{"name":"柳州市","area":[{"name":"城中区"},{"name":"鱼峰区"},{"name":"柳北区"},{"name":"柳南区"},{"name":"柳江县"},{"name":"柳城县"},{"name":"鹿寨县"},{"name":"融安县"},{"name":"融水苗族自治县"},{"name":"三江侗族自治县"},{"name":"其他"}]},{"name":"桂林市","area":[{"name":"象山区"},{"name":"秀峰区"},{"name":"叠彩区"},{"name":"七星区"},{"name":"雁山区"},{"name":"阳朔县"},{"name":"临桂县"},{"name":"灵川县"},{"name":"全州县"},{"name":"平乐县"},{"name":"兴安县"},{"name":"灌阳县"},{"name":"荔浦县"},{"name":"资源县"},{"name":"永福县"},{"name":"龙胜各族自治县"},{"name":"恭城瑶族自治县"},{"name":"其他"}]},{"name":"梧州市","area":[{"name":"万秀区"},{"name":"蝶山区"},{"name":"长洲区"},{"name":"岑溪市"},{"name":"苍梧县"},{"name":"藤县"},{"name":"蒙山县"},{"name":"其他"}]},{"name":"北海市","area":[{"name":"海城区"},{"name":"银海区"},{"name":"铁山港区"},{"name":"合浦县"},{"name":"其他"}]},{"name":"防城港市","area":[{"name":"港口区"},{"name":"防城区"},{"name":"东兴市"},{"name":"上思县"},{"name":"其他"}]},{"name":"钦州市","area":[{"name":"钦南区"},{"name":"钦北区"},{"name":"灵山县"},{"name":"浦北县"},{"name":"其他"}]},{"name":"贵港市","area":[{"name":"港北区"},{"name":"港南区"},{"name":"覃塘区"},{"name":"桂平市"},{"name":"平南县"},{"name":"其他"}]},{"name":"玉林市","area":[{"name":"玉州区"},{"name":"北流市"},{"name":"容县"},{"name":"陆川县"},{"name":"博白县"},{"name":"兴业县"},{"name":"其他"}]},{"name":"百色市","area":[{"name":"右江区"},{"name":"凌云县"},{"name":"平果县"},{"name":"西林县"},{"name":"乐业县"},{"name":"德保县"},{"name":"田林县"},{"name":"田阳县"},{"name":"靖西县"},{"name":"田东县"},{"name":"那坡县"},{"name":"隆林各族自治县"},{"name":"其他"}]},{"name":"贺州市","area":[{"name":"八步区"},{"name":"钟山县"},{"name":"昭平县"},{"name":"富川瑶族自治县"},{"name":"其他"}]},{"name":"河池市","area":[{"name":"金城江区"},{"name":"宜州市"},{"name":"天峨县"},{"name":"凤山县"},{"name":"南丹县"},{"name":"东兰县"},{"name":"都安瑶族自治县"},{"name":"罗城仫佬族自治县"},{"name":"巴马瑶族自治县"},{"name":"环江毛南族自治县"},{"name":"大化瑶族自治县"},{"name":"其他"}]},{"name":"来宾市","area":[{"name":"兴宾区"},{"name":"合山市"},{"name":"象州县"},{"name":"武宣县"},{"name":"忻城县"},{"name":"金秀瑶族自治县"},{"name":"其他"}]},{"name":"崇左市","area":[{"name":"江州区"},{"name":"凭祥市"},{"name":"宁明县"},{"name":"扶绥县"},{"name":"龙州县"},{"name":"大新县"},{"name":"天等县"},{"name":"其他"}]},{"name":"其他市","area":[{"name":"其他"}]}]},{"name":"海南省","city":[{"name":"海口市","area":[{"name":"龙华区"},{"name":"秀英区"},{"name":"琼山区"},{"name":"美兰区"},{"name":"其他"}]},{"name":"三亚市","area":[{"name":"三亚市"},{"name":"其他"}]},{"name":"五指山市","area":[{"name":"五指山"}]},{"name":"琼海市","area":[{"name":"琼海"}]},{"name":"儋州市","area":[{"name":"儋州"}]},{"name":"文昌市","area":[{"name":"文昌"}]},{"name":"万宁市","area":[{"name":"万宁"}]},{"name":"东方市","area":[{"name":"东方"}]},{"name":"澄迈县","area":[{"name":"澄迈县"}]},{"name":"定安县","area":[{"name":"定安县"}]},{"name":"屯昌县","area":[{"name":"屯昌县"}]},{"name":"临高县","area":[{"name":"临高县"}]},{"name":"白沙黎族自治县","area":[{"name":"白沙黎族自治县"}]},{"name":"昌江黎族自治县","area":[{"name":"昌江黎族自治县"}]},{"name":"乐东黎族自治县","area":[{"name":"乐东黎族自治县"}]},{"name":"陵水黎族自治县","area":[{"name":"陵水黎族自治县"}]},{"name":"保亭黎族苗族自治县","area":[{"name":"保亭黎族苗族自治县"}]},{"name":"琼中黎族苗族自治县","area":[{"name":"琼中黎族苗族自治县"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"重庆市","city":[{"name":"重庆市","area":[{"name":"渝中区"},{"name":"大渡口区"},{"name":"江北区"},{"name":"南岸区"},{"name":"北碚区"},{"name":"渝北区"},{"name":"巴南区"},{"name":"长寿区"},{"name":"双桥区"},{"name":"沙坪坝区"},{"name":"万盛区"},{"name":"万州区"},{"name":"涪陵区"},{"name":"黔江区"},{"name":"永川区"},{"name":"合川区"},{"name":"江津区"},{"name":"九龙坡区"},{"name":"南川区"},{"name":"綦江县"},{"name":"潼南县"},{"name":"荣昌县"},{"name":"璧山县"},{"name":"大足县"},{"name":"铜梁县"},{"name":"梁平县"},{"name":"开县"},{"name":"忠县"},{"name":"城口县"},{"name":"垫江县"},{"name":"武隆县"},{"name":"丰都县"},{"name":"奉节县"},{"name":"云阳县"},{"name":"巫溪县"},{"name":"巫山县"},{"name":"石柱土家族自治县"},{"name":"秀山土家族苗族自治县"},{"name":"酉阳土家族苗族自治县"},{"name":"彭水苗族土家族自治县"},{"name":"其他"}]}]},{"name":"四川省","city":[{"name":"成都市","area":[{"name":"青羊区"},{"name":"锦江区"},{"name":"金牛区"},{"name":"武侯区"},{"name":"成华区"},{"name":"龙泉驿区"},{"name":"青白江区"},{"name":"新都区"},{"name":"温江区"},{"name":"都江堰市"},{"name":"彭州市"},{"name":"邛崃市"},{"name":"崇州市"},{"name":"金堂县"},{"name":"郫县"},{"name":"新津县"},{"name":"双流县"},{"name":"蒲江县"},{"name":"大邑县"},{"name":"其他"}]},{"name":"自贡市","area":[{"name":"大安区"},{"name":"自流井区"},{"name":"贡井区"},{"name":"沿滩区"},{"name":"荣县"},{"name":"富顺县"},{"name":"其他"}]},{"name":"攀枝花市","area":[{"name":"仁和区"},{"name":"米易县"},{"name":"盐边县"},{"name":"东区"},{"name":"西区"},{"name":"其他"}]},{"name":"泸州市","area":[{"name":"江阳区"},{"name":"纳溪区"},{"name":"龙马潭区"},{"name":"泸县"},{"name":"合江县"},{"name":"叙永县"},{"name":"古蔺县"},{"name":"其他"}]},{"name":"德阳市","area":[{"name":"旌阳区"},{"name":"广汉市"},{"name":"什邡市"},{"name":"绵竹市"},{"name":"罗江县"},{"name":"中江县"},{"name":"其他"}]},{"name":"绵阳市","area":[{"name":"涪城区"},{"name":"游仙区"},{"name":"江油市"},{"name":"盐亭县"},{"name":"三台县"},{"name":"平武县"},{"name":"安县"},{"name":"梓潼县"},{"name":"北川羌族自治县"},{"name":"其他"}]},{"name":"广元市","area":[{"name":"元坝区"},{"name":"朝天区"},{"name":"青川县"},{"name":"旺苍县"},{"name":"剑阁县"},{"name":"苍溪县"},{"name":"市中区"},{"name":"其他"}]},{"name":"遂宁市","area":[{"name":"船山区"},{"name":"安居区"},{"name":"射洪县"},{"name":"蓬溪县"},{"name":"大英县"},{"name":"其他"}]},{"name":"内江市","area":[{"name":"市中区"},{"name":"东兴区"},{"name":"资中县"},{"name":"隆昌县"},{"name":"威远县"},{"name":"其他"}]},{"name":"乐山市","area":[{"name":"市中区"},{"name":"五通桥区"},{"name":"沙湾区"},{"name":"金口河区"},{"name":"峨眉山市"},{"name":"夹江县"},{"name":"井研县"},{"name":"犍为县"},{"name":"沐川县"},{"name":"马边彝族自治县"},{"name":"峨边彝族自治县"},{"name":"其他"}]},{"name":"南充","area":[{"name":"顺庆区"},{"name":"高坪区"},{"name":"嘉陵区"},{"name":"阆中市"},{"name":"营山县"},{"name":"蓬安县"},{"name":"仪陇县"},{"name":"南部县"},{"name":"西充县"},{"name":"其他"}]},{"name":"眉山市","area":[{"name":"东坡区"},{"name":"仁寿县"},{"name":"彭山县"},{"name":"洪雅县"},{"name":"丹棱县"},{"name":"青神县"},{"name":"其他"}]},{"name":"宜宾市","area":[{"name":"翠屏区"},{"name":"宜宾县"},{"name":"兴文县"},{"name":"南溪县"},{"name":"珙县"},{"name":"长宁县"},{"name":"高县"},{"name":"江安县"},{"name":"筠连县"},{"name":"屏山县"},{"name":"其他"}]},{"name":"广安市","area":[{"name":"广安区"},{"name":"华蓥市"},{"name":"岳池县"},{"name":"邻水县"},{"name":"武胜县"},{"name":"其他"}]},{"name":"达州市","area":[{"name":"通川区"},{"name":"万源市"},{"name":"达县"},{"name":"渠县"},{"name":"宣汉县"},{"name":"开江县"},{"name":"大竹县"},{"name":"其他"}]},{"name":"雅安市","area":[{"name":"雨城区"},{"name":"芦山县"},{"name":"石棉县"},{"name":"名山县"},{"name":"天全县"},{"name":"荥经县"},{"name":"宝兴县"},{"name":"汉源县"},{"name":"其他"}]},{"name":"巴中市","area":[{"name":"巴州区"},{"name":"南江县"},{"name":"平昌县"},{"name":"通江县"},{"name":"其他"}]},{"name":"资阳市","area":[{"name":"雁江区"},{"name":"简阳市"},{"name":"安岳县"},{"name":"乐至县"},{"name":"其他"}]},{"name":"阿坝藏族羌族自治州","area":[{"name":"马尔康县"},{"name":"九寨沟县"},{"name":"红原县"},{"name":"汶川县"},{"name":"阿坝县"},{"name":"理县"},{"name":"若尔盖县"},{"name":"小金县"},{"name":"黑水县"},{"name":"金川县"},{"name":"松潘县"},{"name":"壤塘县"},{"name":"茂县"},{"name":"其他"}]},{"name":"甘孜藏族自治州","area":[{"name":"康定县"},{"name":"丹巴县"},{"name":"炉霍县"},{"name":"九龙县"},{"name":"甘孜县"},{"name":"雅江县"},{"name":"新龙县"},{"name":"道孚县"},{"name":"白玉县"},{"name":"理塘县"},{"name":"德格县"},{"name":"乡城县"},{"name":"石渠县"},{"name":"稻城县"},{"name":"色达县"},{"name":"巴塘县"},{"name":"泸定县"},{"name":"得荣县"},{"name":"其他"}]},{"name":"凉山彝族自治州","area":[{"name":"西昌市"},{"name":"美姑县"},{"name":"昭觉县"},{"name":"金阳县"},{"name":"甘洛县"},{"name":"布拖县"},{"name":"雷波县"},{"name":"普格县"},{"name":"宁南县"},{"name":"喜德县"},{"name":"会东县"},{"name":"越西县"},{"name":"会理县"},{"name":"盐源县"},{"name":"德昌县"},{"name":"冕宁县"},{"name":"木里藏族自治县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"贵州省","city":[{"name":"贵阳市","area":[{"name":"南明区"},{"name":"云岩区"},{"name":"花溪区"},{"name":"乌当区"},{"name":"白云区"},{"name":"小河区"},{"name":"清镇市"},{"name":"开阳县"},{"name":"修文县"},{"name":"息烽县"},{"name":"其他"}]},{"name":"六盘水市","area":[{"name":"钟山区"},{"name":"水城县"},{"name":"盘县"},{"name":"六枝特区"},{"name":"其他"}]},{"name":"遵义市","area":[{"name":"红花岗区"},{"name":"汇川区"},{"name":"赤水市"},{"name":"仁怀市"},{"name":"遵义县"},{"name":"绥阳县"},{"name":"桐梓县"},{"name":"习水县"},{"name":"凤冈县"},{"name":"正安县"},{"name":"余庆县"},{"name":"湄潭县"},{"name":"道真仡佬族苗族自治县"},{"name":"务川仡佬族苗族自治县"},{"name":"其他"}]},{"name":"安顺市","area":[{"name":"西秀区"},{"name":"普定县"},{"name":"平坝县"},{"name":"镇宁布依族苗族自治县"},{"name":"紫云苗族布依族自治县"},{"name":"关岭布依族苗族自治县"},{"name":"其他"}]},{"name":"铜仁地区","area":[{"name":"铜仁市"},{"name":"德江县"},{"name":"江口县"},{"name":"思南县"},{"name":"石阡县"},{"name":"玉屏侗族自治县"},{"name":"松桃苗族自治县"},{"name":"印江土家族苗族自治县"},{"name":"沿河土家族自治县"},{"name":"万山特区"},{"name":"其他"}]},{"name":"毕节地区","area":[{"name":"毕节市"},{"name":"黔西县"},{"name":"大方县"},{"name":"织金县"},{"name":"金沙县"},{"name":"赫章县"},{"name":"纳雍县"},{"name":"威宁彝族回族苗族自治县"},{"name":"其他"}]},{"name":"黔西南布依族苗族自治州","area":[{"name":"兴义市"},{"name":"望谟县"},{"name":"兴仁县"},{"name":"普安县"},{"name":"册亨县"},{"name":"晴隆县"},{"name":"贞丰县"},{"name":"安龙县"},{"name":"其他"}]},{"name":"黔东南苗族侗族自治州","area":[{"name":"凯里市"},{"name":"施秉县"},{"name":"从江县"},{"name":"锦屏县"},{"name":"镇远县"},{"name":"麻江县"},{"name":"台江县"},{"name":"天柱县"},{"name":"黄平县"},{"name":"榕江县"},{"name":"剑河县"},{"name":"三穗县"},{"name":"雷山县"},{"name":"黎平县"},{"name":"岑巩县"},{"name":"丹寨县"},{"name":"其他"}]},{"name":"黔南布依族苗族自治州","area":[{"name":"都匀市"},{"name":"福泉市"},{"name":"贵定县"},{"name":"惠水县"},{"name":"罗甸县"},{"name":"瓮安县"},{"name":"荔波县"},{"name":"龙里县"},{"name":"平塘县"},{"name":"长顺县"},{"name":"独山县"},{"name":"三都水族自治县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"云南省","city":[{"name":"昆明市","area":[{"name":"盘龙区"},{"name":"五华区"},{"name":"官渡区"},{"name":"西山区"},{"name":"东川区"},{"name":"安宁市"},{"name":"呈贡县"},{"name":"晋宁县"},{"name":"富民县"},{"name":"宜良县"},{"name":"嵩明县"},{"name":"石林彝族自治县"},{"name":"禄劝彝族苗族自治县"},{"name":"寻甸回族彝族自治县"},{"name":"其他"}]},{"name":"曲靖市","area":[{"name":"麒麟区"},{"name":"宣威市"},{"name":"马龙县"},{"name":"沾益县"},{"name":"富源县"},{"name":"罗平县"},{"name":"师宗县"},{"name":"陆良县"},{"name":"会泽县"},{"name":"其他"}]},{"name":"玉溪市","area":[{"name":"红塔区"},{"name":"江川县"},{"name":"澄江县"},{"name":"通海县"},{"name":"华宁县"},{"name":"易门县"},{"name":"峨山彝族自治县"},{"name":"新平彝族傣族自治县"},{"name":"元江哈尼族彝族傣族自治县"},{"name":"其他"}]},{"name":"保山市","area":[{"name":"隆阳区"},{"name":"施甸县"},{"name":"腾冲县"},{"name":"龙陵县"},{"name":"昌宁县"},{"name":"其他"}]},{"name":"昭通市","area":[{"name":"昭阳区"},{"name":"鲁甸县"},{"name":"巧家县"},{"name":"盐津县"},{"name":"大关县"},{"name":"永善县"},{"name":"绥江县"},{"name":"镇雄县"},{"name":"彝良县"},{"name":"威信县"},{"name":"水富县"},{"name":"其他"}]},{"name":"丽江市","area":[{"name":"古城区"},{"name":"永胜县"},{"name":"华坪县"},{"name":"玉龙纳西族自治县"},{"name":"宁蒗彝族自治县"},{"name":"其他"}]},{"name":"普洱市","area":[{"name":"思茅区"},{"name":"普洱哈尼族彝族自治县"},{"name":"墨江哈尼族自治县"},{"name":"景东彝族自治县"},{"name":"景谷傣族彝族自治县"},{"name":"镇沅彝族哈尼族拉祜族自治县"},{"name":"江城哈尼族彝族自治县"},{"name":"孟连傣族拉祜族佤族自治县"},{"name":"澜沧拉祜族自治县"},{"name":"西盟佤族自治县"},{"name":"其他"}]},{"name":"临沧市","area":[{"name":"临翔区"},{"name":"凤庆县"},{"name":"云县"},{"name":"永德县"},{"name":"镇康县"},{"name":"双江拉祜族佤族布朗族傣族自治县"},{"name":"耿马傣族佤族自治县"},{"name":"沧源佤族自治县"},{"name":"其他"}]},{"name":"德宏傣族景颇族自治州","area":[{"name":"潞西市"},{"name":"瑞丽市"},{"name":"梁河县"},{"name":"盈江县"},{"name":"陇川县"},{"name":"其他"}]},{"name":"怒江傈僳族自治州","area":[{"name":"泸水县"},{"name":"福贡县"},{"name":"贡山独龙族怒族自治县"},{"name":"兰坪白族普米族自治县"},{"name":"其他"}]},{"name":"迪庆藏族自治州","area":[{"name":"香格里拉县"},{"name":"德钦县"},{"name":"维西傈僳族自治县"},{"name":"其他"}]},{"name":"大理白族自治州","area":[{"name":"大理市"},{"name":"祥云县"},{"name":"宾川县"},{"name":"弥渡县"},{"name":"永平县"},{"name":"云龙县"},{"name":"洱源县"},{"name":"剑川县"},{"name":"鹤庆县"},{"name":"漾濞彝族自治县"},{"name":"南涧彝族自治县"},{"name":"巍山彝族回族自治县"},{"name":"其他"}]},{"name":"楚雄彝族自治州","area":[{"name":"楚雄市"},{"name":"双柏县"},{"name":"牟定县"},{"name":"南华县"},{"name":"姚安县"},{"name":"大姚县"},{"name":"永仁县"},{"name":"元谋县"},{"name":"武定县"},{"name":"禄丰县"},{"name":"其他"}]},{"name":"红河哈尼族彝族自治州","area":[{"name":"蒙自县"},{"name":"个旧市"},{"name":"开远市"},{"name":"绿春县"},{"name":"建水县"},{"name":"石屏县"},{"name":"弥勒县"},{"name":"泸西县"},{"name":"元阳县"},{"name":"红河县"},{"name":"金平苗族瑶族傣族自治县"},{"name":"河口瑶族自治县"},{"name":"屏边苗族自治县"},{"name":"其他"}]},{"name":"文山壮族苗族自治州","area":[{"name":"文山县"},{"name":"砚山县"},{"name":"西畴县"},{"name":"麻栗坡县"},{"name":"马关县"},{"name":"丘北县"},{"name":"广南县"},{"name":"富宁县"},{"name":"其他"}]},{"name":"西双版纳傣族自治州","area":[{"name":"景洪市"},{"name":"勐海县"},{"name":"勐腊县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"西藏","city":[{"name":"拉萨市","area":[{"name":"城关区"},{"name":"林周县"},{"name":"当雄县"},{"name":"尼木县"},{"name":"曲水县"},{"name":"堆龙德庆县"},{"name":"达孜县"},{"name":"墨竹工卡县"},{"name":"其他"}]},{"name":"那曲地区","area":[{"name":"那曲县"},{"name":"嘉黎县"},{"name":"比如县"},{"name":"聂荣县"},{"name":"安多县"},{"name":"申扎县"},{"name":"索县"},{"name":"班戈县"},{"name":"巴青县"},{"name":"尼玛县"},{"name":"其他"}]},{"name":"昌都地区","area":[{"name":"昌都县"},{"name":"江达县"},{"name":"贡觉县"},{"name":"类乌齐县"},{"name":"丁青县"},{"name":"察雅县"},{"name":"八宿县"},{"name":"左贡县"},{"name":"芒康县"},{"name":"洛隆县"},{"name":"边坝县"},{"name":"其他"}]},{"name":"林芝地区","area":[{"name":"林芝县"},{"name":"工布江达县"},{"name":"米林县"},{"name":"墨脱县"},{"name":"波密县"},{"name":"察隅县"},{"name":"朗县"},{"name":"其他"}]},{"name":"山南地区","area":[{"name":"乃东县"},{"name":"扎囊县"},{"name":"贡嘎县"},{"name":"桑日县"},{"name":"琼结县"},{"name":"曲松县"},{"name":"措美县"},{"name":"洛扎县"},{"name":"加查县"},{"name":"隆子县"},{"name":"错那县"},{"name":"浪卡子县"},{"name":"其他"}]},{"name":"日喀则地区","area":[{"name":"日喀则市"},{"name":"南木林县"},{"name":"江孜县"},{"name":"定日县"},{"name":"萨迦县"},{"name":"拉孜县"},{"name":"昂仁县"},{"name":"谢通门县"},{"name":"白朗县"},{"name":"仁布县"},{"name":"康马县"},{"name":"定结县"},{"name":"仲巴县"},{"name":"亚东县"},{"name":"吉隆县"},{"name":"聂拉木县"},{"name":"萨嘎县"},{"name":"岗巴县"},{"name":"其他"}]},{"name":"阿里地区","area":[{"name":"噶尔县"},{"name":"普兰县"},{"name":"札达县"},{"name":"日土县"},{"name":"革吉县"},{"name":"改则县"},{"name":"措勤县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"陕西省","city":[{"name":"西安市","area":[{"name":"莲湖区"},{"name":"新城区"},{"name":"碑林区"},{"name":"雁塔区"},{"name":"灞桥区"},{"name":"未央区"},{"name":"阎良区"},{"name":"临潼区"},{"name":"长安区"},{"name":"高陵县"},{"name":"蓝田县"},{"name":"户县"},{"name":"周至县"},{"name":"其他"}]},{"name":"铜川市","area":[{"name":"耀州区"},{"name":"王益区"},{"name":"印台区"},{"name":"宜君县"},{"name":"其他"}]},{"name":"宝鸡市","area":[{"name":"渭滨区"},{"name":"金台区"},{"name":"陈仓区"},{"name":"岐山县"},{"name":"凤翔县"},{"name":"陇县"},{"name":"太白县"},{"name":"麟游县"},{"name":"扶风县"},{"name":"千阳县"},{"name":"眉县"},{"name":"凤县"},{"name":"其他"}]},{"name":"咸阳市","area":[{"name":"秦都区"},{"name":"渭城区"},{"name":"杨陵区"},{"name":"兴平市"},{"name":"礼泉县"},{"name":"泾阳县"},{"name":"永寿县"},{"name":"三原县"},{"name":"彬县"},{"name":"旬邑县"},{"name":"长武县"},{"name":"乾县"},{"name":"武功县"},{"name":"淳化县"},{"name":"其他"}]},{"name":"渭南市","area":[{"name":"临渭区"},{"name":"韩城市"},{"name":"华阴市"},{"name":"蒲城县"},{"name":"潼关县"},{"name":"白水县"},{"name":"澄城县"},{"name":"华县"},{"name":"合阳县"},{"name":"富平县"},{"name":"大荔县"},{"name":"其他"}]},{"name":"延安市","area":[{"name":"宝塔区"},{"name":"安塞县"},{"name":"洛川县"},{"name":"子长县"},{"name":"黄陵县"},{"name":"延川县"},{"name":"富县"},{"name":"延长县"},{"name":"甘泉县"},{"name":"宜川县"},{"name":"志丹县"},{"name":"黄龙县"},{"name":"吴起县"},{"name":"其他"}]},{"name":"汉中市","area":[{"name":"汉台区"},{"name":"留坝县"},{"name":"镇巴县"},{"name":"城固县"},{"name":"南郑县"},{"name":"洋县"},{"name":"宁强县"},{"name":"佛坪县"},{"name":"勉县"},{"name":"西乡县"},{"name":"略阳县"},{"name":"其他"}]},{"name":"榆林市","area":[{"name":"榆阳区"},{"name":"清涧县"},{"name":"绥德县"},{"name":"神木县"},{"name":"佳县"},{"name":"府谷县"},{"name":"子洲县"},{"name":"靖边县"},{"name":"横山县"},{"name":"米脂县"},{"name":"吴堡县"},{"name":"定边县"},{"name":"其他"}]},{"name":"安康市","area":[{"name":"汉滨区"},{"name":"紫阳县"},{"name":"岚皋县"},{"name":"旬阳县"},{"name":"镇坪县"},{"name":"平利县"},{"name":"石泉县"},{"name":"宁陕县"},{"name":"白河县"},{"name":"汉阴县"},{"name":"其他"}]},{"name":"商洛市","area":[{"name":"商州区"},{"name":"镇安县"},{"name":"山阳县"},{"name":"洛南县"},{"name":"商南县"},{"name":"丹凤县"},{"name":"柞水县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"甘肃省","city":[{"name":"兰州市","area":[{"name":"城关区"},{"name":"七里河区"},{"name":"西固区"},{"name":"安宁区"},{"name":"红古区"},{"name":"永登县"},{"name":"皋兰县"},{"name":"榆中县"},{"name":"其他"}]},{"name":"嘉峪关市","area":[{"name":"嘉峪关市"},{"name":"其他"}]},{"name":"金昌市","area":[{"name":"金川区"},{"name":"永昌县"},{"name":"其他"}]},{"name":"白银市","area":[{"name":"白银区"},{"name":"平川区"},{"name":"靖远县"},{"name":"会宁县"},{"name":"景泰县"},{"name":"其他"}]},{"name":"天水市","area":[{"name":"清水县"},{"name":"秦安县"},{"name":"甘谷县"},{"name":"武山县"},{"name":"张家川回族自治县"},{"name":"北道区"},{"name":"秦城区"},{"name":"其他"}]},{"name":"武威市","area":[{"name":"凉州区"},{"name":"民勤县"},{"name":"古浪县"},{"name":"天祝藏族自治县"},{"name":"其他"}]},{"name":"酒泉市","area":[{"name":"肃州区"},{"name":"玉门市"},{"name":"敦煌市"},{"name":"金塔县"},{"name":"肃北蒙古族自治县"},{"name":"阿克塞哈萨克族自治县"},{"name":"安西县"},{"name":"其他"}]},{"name":"张掖市","area":[{"name":"甘州区"},{"name":"民乐县"},{"name":"临泽县"},{"name":"高台县"},{"name":"山丹县"},{"name":"肃南裕固族自治县"},{"name":"其他"}]},{"name":"庆阳市","area":[{"name":"西峰区"},{"name":"庆城县"},{"name":"环县"},{"name":"华池县"},{"name":"合水县"},{"name":"正宁县"},{"name":"宁县"},{"name":"镇原县"},{"name":"其他"}]},{"name":"平凉市","area":[{"name":"崆峒区"},{"name":"泾川县"},{"name":"灵台县"},{"name":"崇信县"},{"name":"华亭县"},{"name":"庄浪县"},{"name":"静宁县"},{"name":"其他"}]},{"name":"定西市","area":[{"name":"安定区"},{"name":"通渭县"},{"name":"临洮县"},{"name":"漳县"},{"name":"岷县"},{"name":"渭源县"},{"name":"陇西县"},{"name":"其他"}]},{"name":"陇南市","area":[{"name":"武都区"},{"name":"成县"},{"name":"宕昌县"},{"name":"康县"},{"name":"文县"},{"name":"西和县"},{"name":"礼县"},{"name":"两当县"},{"name":"徽县"},{"name":"其他"}]},{"name":"临夏回族自治州","area":[{"name":"临夏市"},{"name":"临夏县"},{"name":"康乐县"},{"name":"永靖县"},{"name":"广河县"},{"name":"和政县"},{"name":"东乡族自治县"},{"name":"积石山保安族东乡族撒拉族自治县"},{"name":"其他"}]},{"name":"甘南藏族自治州","area":[{"name":"合作市"},{"name":"临潭县"},{"name":"卓尼县"},{"name":"舟曲县"},{"name":"迭部县"},{"name":"玛曲县"},{"name":"碌曲县"},{"name":"夏河县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"青海省","city":[{"name":"西宁市","area":[{"name":"城中区"},{"name":"城东区"},{"name":"城西区"},{"name":"城北区"},{"name":"湟源县"},{"name":"湟中县"},{"name":"大通回族土族自治县"},{"name":"其他"}]},{"name":"海东地区","area":[{"name":"平安县"},{"name":"乐都县"},{"name":"民和回族土族自治县"},{"name":"互助土族自治县"},{"name":"化隆回族自治县"},{"name":"循化撒拉族自治县"},{"name":"其他"}]},{"name":"海北藏族自治州","area":[{"name":"海晏县"},{"name":"祁连县"},{"name":"刚察县"},{"name":"门源回族自治县"},{"name":"其他"}]},{"name":"海南藏族自治州","area":[{"name":"共和县"},{"name":"同德县"},{"name":"贵德县"},{"name":"兴海县"},{"name":"贵南县"},{"name":"其他"}]},{"name":"黄南藏族自治州","area":[{"name":"同仁县"},{"name":"尖扎县"},{"name":"泽库县"},{"name":"河南蒙古族自治县"},{"name":"其他"}]},{"name":"果洛藏族自治州","area":[{"name":"玛沁县"},{"name":"班玛县"},{"name":"甘德县"},{"name":"达日县"},{"name":"久治县"},{"name":"玛多县"},{"name":"其他"}]},{"name":"玉树藏族自治州","area":[{"name":"玉树县"},{"name":"杂多县"},{"name":"称多县"},{"name":"治多县"},{"name":"囊谦县"},{"name":"曲麻莱县"},{"name":"其他"}]},{"name":"海西蒙古族藏族自治州","area":[{"name":"德令哈市"},{"name":"格尔木市"},{"name":"乌兰县"},{"name":"都兰县"},{"name":"天峻县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"宁夏","city":[{"name":"银川市","area":[{"name":"兴庆区"},{"name":"西夏区"},{"name":"金凤区"},{"name":"灵武市"},{"name":"永宁县"},{"name":"贺兰县"},{"name":"其他"}]},{"name":"石嘴山市","area":[{"name":"大武口区"},{"name":"惠农区"},{"name":"平罗县"},{"name":"其他"}]},{"name":"吴忠市","area":[{"name":"利通区"},{"name":"青铜峡市"},{"name":"盐池县"},{"name":"同心县"},{"name":"其他"}]},{"name":"固原市","area":[{"name":"原州区"},{"name":"西吉县"},{"name":"隆德县"},{"name":"泾源县"},{"name":"彭阳县"},{"name":"其他"}]},{"name":"中卫市","area":[{"name":"沙坡头区"},{"name":"中宁县"},{"name":"海原县"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"新疆","city":[{"name":"乌鲁木齐市","area":[{"name":"天山区"},{"name":"沙依巴克区"},{"name":"新市区"},{"name":"水磨沟区"},{"name":"头屯河区"},{"name":"达坂城区"},{"name":"东山区"},{"name":"乌鲁木齐县"},{"name":"其他"}]},{"name":"克拉玛依市","area":[{"name":"克拉玛依区"},{"name":"独山子区"},{"name":"白碱滩区"},{"name":"乌尔禾区"},{"name":"其他"}]},{"name":"吐鲁番地区","area":[{"name":"吐鲁番市"},{"name":"托克逊县"},{"name":"鄯善县"},{"name":"其他"}]},{"name":"哈密地区","area":[{"name":"哈密市"},{"name":"伊吾县"},{"name":"巴里坤哈萨克自治县"},{"name":"其他"}]},{"name":"和田地区","area":[{"name":"和田市"},{"name":"和田县"},{"name":"洛浦县"},{"name":"民丰县"},{"name":"皮山县"},{"name":"策勒县"},{"name":"于田县"},{"name":"墨玉县"},{"name":"其他"}]},{"name":"阿克苏地区","area":[{"name":"阿克苏市"},{"name":"温宿县"},{"name":"沙雅县"},{"name":"拜城县"},{"name":"阿瓦提县"},{"name":"库车县"},{"name":"柯坪县"},{"name":"新和县"},{"name":"乌什县"},{"name":"其他"}]},{"name":"喀什地区","area":[{"name":"喀什市"},{"name":"巴楚县"},{"name":"泽普县"},{"name":"伽师县"},{"name":"叶城县"},{"name":"岳普湖县"},{"name":"疏勒县"},{"name":"麦盖提县"},{"name":"英吉沙县"},{"name":"莎车县"},{"name":"疏附县"},{"name":"塔什库尔干塔吉克自治县"},{"name":"其他"}]},{"name":"克孜勒苏柯尔克孜自治州","area":[{"name":"阿图什市"},{"name":"阿合奇县"},{"name":"乌恰县"},{"name":"阿克陶县"},{"name":"其他"}]},{"name":"巴音郭楞蒙古自治州","area":[{"name":"库尔勒市"},{"name":"和静县"},{"name":"尉犁县"},{"name":"和硕县"},{"name":"且末县"},{"name":"博湖县"},{"name":"轮台县"},{"name":"若羌县"},{"name":"焉耆回族自治县"},{"name":"其他"}]},{"name":"昌吉回族自治州","area":[{"name":"昌吉市"},{"name":"阜康市"},{"name":"奇台县"},{"name":"玛纳斯县"},{"name":"吉木萨尔县"},{"name":"呼图壁县"},{"name":"木垒哈萨克自治县"},{"name":"米泉市"},{"name":"其他"}]},{"name":"博尔塔拉蒙古自治州","area":[{"name":"博乐市"},{"name":"精河县"},{"name":"温泉县"},{"name":"其他"}]},{"name":"石河子","area":[{"name":"石河子"}]},{"name":"阿拉尔","area":[{"name":"阿拉尔"}]},{"name":"图木舒克","area":[{"name":"图木舒克"}]},{"name":"五家渠","area":[{"name":"五家渠"}]},{"name":"伊犁哈萨克自治州","area":[{"name":"伊宁市"},{"name":"奎屯市"},{"name":"伊宁县"},{"name":"特克斯县"},{"name":"尼勒克县"},{"name":"昭苏县"},{"name":"新源县"},{"name":"霍城县"},{"name":"巩留县"},{"name":"察布查尔锡伯自治县"},{"name":"塔城地区"},{"name":"阿勒泰地区"},{"name":"其他"}]},{"name":"其他","area":[{"name":"其他"}]}]},{"name":"台湾省","city":[{"name":"台北市","area":[{"name":"内湖区"},{"name":"南港区"},{"name":"中正区"},{"name":"万华区"},{"name":"大同区"},{"name":"中山区"},{"name":"松山区"},{"name":"大安区"},{"name":"信义区"},{"name":"文山区"},{"name":"士林区"},{"name":"北投区"}]},{"name":"新北市","area":[{"name":"板桥区"},{"name":"汐止区"},{"name":"新店区"},{"name":"其他"}]},{"name":"桃园市","area":[{"name":"其他"}]},{"name":"台中市","area":[{"name":"其他"}]},{"name":"台南市","area":[{"name":"其他"}]},{"name":"高雄市","area":[{"name":"其他"}]}]},{"name":"澳门","city":[{"name":"花地玛堂区"},{"name":"圣安多尼堂区"},{"name":"大堂区"},{"name":"望德堂区"},{"name":"风顺堂区"},{"name":"嘉模堂区"},{"name":"圣方济各堂区"},{"name":"路凼"},{"name":"其他"}]},{"name":"香港","city":[{"name":"深水埗区"},{"name":"油尖旺区"},{"name":"九龙城区"},{"name":"黄大仙区"},{"name":"观塘区"},{"name":"北区"},{"name":"大埔区"},{"name":"沙田区"},{"name":"西贡区"},{"name":"元朗区"},{"name":"屯门区"},{"name":"荃湾区"},{"name":"葵青区"},{"name":"离岛区"},{"name":"中西区"},{"name":"湾仔区"},{"name":"东区"},{"name":"南区"},{"name":"其他"}]}];

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map