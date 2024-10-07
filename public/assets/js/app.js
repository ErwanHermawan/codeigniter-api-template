(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _core = require("./core");
var _components = require("./components");
// --- core

// --- components

// --- App
var App = function () {
  // --- run transition
  var runTransition = function runTransition() {
    $("body").removeClass("hold-transition");
  };

  // --- show site content
  var showSiteContent = function showSiteContent() {
    $(".js-main-site").removeClass("main-site--hide");
    // --- disable scroll
    Scrolllable.enable();
  };

  // --- ready
  var ready = function ready() {
    (function ($) {
      // -- core initialization
      _core.SweetAlert.init();
      _core.Dropify.init();
      _core.TemporaryAlert.init();
      _core.BackButton.init();
      _core.DatePickerInput.init();
      _core.SelectInput.init();
      _core.EditableTables.init();
      _core.ChangeFormatNumber.init();
      _core.Password.init();
      _core.Dropdown.init();
      _core.CheckBox.init();
      _core.DataTable.init();

      // -- components initialization
      _components.Header.init();
      _components.Login.init();
      _components.Users.init();
      _components.Meta.init();
    })(jQuery);
  };

  // --- load
  var load = function load() {
    (function ($) {
      $(window).on("load", function () {});
    })(jQuery);
  };

  // --- init
  var init = function init() {
    load();
    ready();
  };

  // --- return
  return {
    init: init
  };
}();

// ---  run main js
App.init();

},{"./components":6,"./core":19}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _variables = require("../variables");
var _utilities = require("../utilities");
/* ------------------------------------------------------------------------------
@name: Header
@description: Header
--------------------------------------------------------------------------------- */

// --- variables

// --- utilities

var _userData = JSON.parse(_utilities.Session.get("userData"));

// --- Header
var Header = function () {
  // handleCheckSession
  var handleCheckSession = function handleCheckSession() {
    _utilities.Session.timeout(function () {
      _utilities.Session.remove("userData");
      location.reload();
    }, 3600);
  };

  // handleLogout
  var handleLogout = function handleLogout() {
    $(".js-logout").on("click", function (e) {
      e.preventDefault();
      _utilities.Session.remove("userData");
      location.href = _variables.WEB_URL.login;
    });
  };

  // -init
  var init = function init() {
    handleCheckSession();
    handleLogout();
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = Header;

},{"../utilities":31,"../variables":35}],3:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _variables = require("../variables");
var _utilities = require("../utilities");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /* ------------------------------------------------------------------------------
@name: Login
--------------------------------------------------------------------------------- */ // --- variables
// --- utilities
// Form Validation
var ElementSelector = [{
  id: "email",
  validation: {
    required: true,
    email: true,
    invalid: true
  }
}, {
  id: "password",
  validation: {
    required: true,
    minimum: true,
    minimumChar: 5
  }
}];
var ElementEvents = ["input", "blur"];
var Login = function () {
  // Handle Run Validation
  var handleRunValidation = function handleRunValidation() {
    _utilities.Form.validation(ElementEvents, ElementSelector);
  };

  // Handle Click Validation
  var handleClickValidation = function handleClickValidation() {
    $('.js-auth-login button[type="submit"]').on("click", function (e) {
      e.preventDefault();
      $.each(ElementSelector, function (i, v) {
        $("#" + v.id).blur();
      });
      if ($(".error").length === 0) {
        handleLoginUser();
      }
    });
  };
  var handleLoginUser = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var username, password, formData, data, response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            username = $(".js-auth-login").find("#username").val();
            password = $(".js-auth-login").find("#password").val();
            formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            data = {
              url: _variables.API_URL.login,
              method: "POST",
              data: formData
            };
            _context.next = 8;
            return _utilities.HttpRequest.ajax(data);
          case 8:
            response = _context.sent;
            console.log(response);
            if (response.status) {
              _utilities.Session.set("userData", JSON.stringify(response.data));
              location.href = _variables.WEB_URL.dashboard;
            } else {
              _utilities.SweetAlert.config(response.message, "error");
            }
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleLoginUser() {
      return _ref.apply(this, arguments);
    };
  }();

  // initx
  var init = function init() {
    if ($(".js-auth-login").length) {
      handleClickValidation();
      handleRunValidation();
    }
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = Login;

},{"../utilities":31,"../variables":35}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _variables = require("../variables");
var _utilities = require("../utilities");
/* ------------------------------------------------------------------------------
@name: Meta
@description: Meta
--------------------------------------------------------------------------------- */

// --- variables

// --- utilities

var Meta = function () {
  // handleClickMeta
  var handleClickMeta = function handleClickMeta() {
    $('.js-form-meta button[type="submit"]').on("click", function (e) {
      handleFormData();
      e.preventDefault();
    });
  };

  // handleFormData
  var handleFormData = function handleFormData() {
    var _meta_id = $('input[name="meta_id"]').val();
    var _og_image = $('input[name="og_image"]').prop("files")[0];
    var _twitter_image = $('input[name="twitter_image"]').prop("files")[0];
    var _robots = $('input[name="robots"]').val();
    var _refresh = $('input[name="refresh"]').val();
    var _title = $('input[name="title"]').val();
    var _description = $('input[name="description"]').val();
    var _keywords = $('input[name="keywords"]').val();
    var _author = $('input[name="author"]').val();
    var _copyright = $('input[name="copyright"]').val();
    var _theme_color = $('input[name="theme_color"]').val();
    var _domain_name = $('input[name="domain_name"]').val();
    var _twitter_account = $('input[name="twitter_account"]').val();
    var _facebook_account = $('input[name="facebook_account"]').val();
    var _instagram_account = $('input[name="instagram_account"]').val();
    var _email_account = $('input[name="email_account"]').val();
    if (!_variables.WHITESPACE.test(_robots) && !_variables.WHITESPACE.test(_refresh) && !_variables.WHITESPACE.test(_title) && !_variables.WHITESPACE.test(_description) && !_variables.WHITESPACE.test(_keywords) && !_variables.WHITESPACE.test(_author) && !_variables.WHITESPACE.test(_copyright) && !_variables.WHITESPACE.test(_theme_color) && !_variables.WHITESPACE.test(_domain_name) && !_variables.WHITESPACE.test(_twitter_account) && !_variables.WHITESPACE.test(_facebook_account) && !_variables.WHITESPACE.test(_instagram_account) && !_variables.WHITESPACE.test(_email_account)) {
      var form_data = new FormData();
      form_data.append("meta_id", _meta_id);
      form_data.append("og_image", _og_image);
      form_data.append("twitter_image", _twitter_image);
      form_data.append("robots", _robots);
      form_data.append("refresh", _refresh);
      form_data.append("title", _title);
      form_data.append("description", _description);
      form_data.append("keywords", _keywords);
      form_data.append("author", _author);
      form_data.append("copyright", _copyright);
      form_data.append("theme_color", _theme_color);
      form_data.append("domain_name", _domain_name);
      form_data.append("twitter_account", _twitter_account);
      form_data.append("facebook_account", _facebook_account);
      form_data.append("instagram_account", _instagram_account);
      form_data.append("email_account", _email_account);
      handlePostData(form_data);
    }
  };

  // handlePostData
  var handlePostData = function handlePostData(form_data) {
    $.ajax({
      url: _variables.API_URL.meta,
      method: "POST",
      dataType: "JSON",
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      beforeSend: function beforeSend() {
        var _loader = "<span class=\"custom-loader\"><span></span><span></span><span></span><span></span></span> Mengirim ....";
        $(".js-form-meta button[type='submit']").html(_loader);
      },
      success: function success(response) {
        var _status = response.status;
        var _message = response.message;
        if (_status) {
          $(".js-form-meta button[type='submit']").html("<i class=\"mdi mdi-content-save-outline\"></i> Simpan");
          _utilities.SweetAlert.config(_message);
          setTimeout(function () {
            location.href = _variables.WEB_URL.meta;
          }, 800);
        }
      }
    });
  };
  var init = function init() {
    if ($(".js-form-meta").length) {
      handleClickMeta();
    }
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = Meta;

},{"../utilities":31,"../variables":35}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _variables = require("../variables");
var _utilities = require("../utilities");
var _core = require("../core");
/* ------------------------------------------------------------------------------
@name: Users
@description: Users
--------------------------------------------------------------------------------- */

// --- variables

// --- utilities

// --- core

var userData = JSON.parse(_utilities.Session.get("userData"));

// Form UserSelector
var UserSelector = [{
  id: "name",
  validation: {
    required: true
  }
}, {
  id: "password",
  validation: {
    minimum: true,
    minimumChar: 5
  }
}, {
  id: "confirm_password",
  validation: {
    confirmPassword: true
  }
}, {
  id: "email",
  validation: {
    required: true,
    email: true
  }
}, {
  id: "phone",
  validation: {
    required: false,
    phone: true
  }
}, {
  id: "role",
  validation: {
    selectRequired: true
  }
}];
var ElementEvents = ["input", "blur"];
var Users = function () {
  // Handle Run DataTable
  var handleRunDataTable = function handleRunDataTable() {
    var dataSetting = {
      selector: "js-data-users",
      url: _variables.API_URL.USERS,
      method: "GET",
      token: userData.token
    };
    var columnSetting = [{
      targets: 0,
      orderable: false,
      render: function render(data) {
        return "<div class=\"custom-checkbox\">\n\t\t\t\t\t\t\t\t\t\t<label class=\"custom-checkbox__wrapper\">\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" value=\"".concat(data, "\" />\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"custom-checkbox__checkmark\"></div>\n\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t</div>");
      }
    }, {
      targets: 1,
      render: function render(data) {
        return "<span class=\"user-avatar\">\n\t\t\t\t\t\t\t\t\t\t<img class=\"user-avatar__img\" src=\"".concat(data, "\" />\n\t\t\t\t\t\t\t\t\t</span>");
      }
    }, {
      targets: 6,
      className: "text-center",
      render: function render(data) {
        return "<button type=\"button\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Edit\" class=\"btn btn-icon waves-effect btn-primary btn-trans js-edit-data\" data-id=\"".concat(data, "\"><i class=\"mdi mdi-pencil-outline\"></i></button>\n\t\t\t\t\t<button type=\"button\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Delete\" class=\"btn btn-icon waves-effect btn-danger btn-trans js-delete-data\" data-id=\"").concat(data, "\"><i class=\"mdi mdi-trash-can-outline\"></i></button>");
      }
    }];
    var filterSetting = [{
      id: "dateRange",
      event: "change"
    }, {
      id: "status",
      event: "change"
    }, {
      id: "search",
      event: "keyup"
    }];
    var sortSetting = {
      id: "sort",
      event: "change"
    };
    _core.DataTable.server(dataSetting, columnSetting, filterSetting, sortSetting);
  };
  var selectCheckbox = function selectCheckbox() {
    $(".js-select-all-checkbox input").on("click", function (e) {
      var _this = $(e.currentTarget);
      if (_this.is(":checked")) {
        console.log(1);
      } else {
        console.log(2);
      }
    });
  };
  var init = function init() {
    handleRunDataTable();
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = Users;

},{"../core":19,"../utilities":31,"../variables":35}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Header", {
  enumerable: true,
  get: function get() {
    return _Header["default"];
  }
});
Object.defineProperty(exports, "Login", {
  enumerable: true,
  get: function get() {
    return _Login["default"];
  }
});
Object.defineProperty(exports, "Meta", {
  enumerable: true,
  get: function get() {
    return _Meta["default"];
  }
});
Object.defineProperty(exports, "Users", {
  enumerable: true,
  get: function get() {
    return _Users["default"];
  }
});
var _Header = _interopRequireDefault(require("./Header.js"));
var _Login = _interopRequireDefault(require("./Login.js"));
var _Users = _interopRequireDefault(require("./Users.js"));
var _Meta = _interopRequireDefault(require("./Meta.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }

},{"./Header.js":2,"./Login.js":3,"./Meta.js":4,"./Users.js":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: BackButton
@description: BackButton
--------------------------------------------------------------------------------- */

// --- BackButton
var BackButton = function () {
  // --- handleBackButton
  var handleBackButton = function handleBackButton() {
    $(".js-back-btn").on("click", function (e) {
      window.history.back();
      e.preventDefault();
    });
  };

  // --- init
  var init = function init() {
    if ($(".js-back-btn").length) {
      handleBackButton();
    }
  };

  // --- return
  return {
    init: init
  };
}();
var _default = exports["default"] = BackButton;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _utilities = require("../utilities");
/* ------------------------------------------------------------------------------
@name: ChangeFormatNumber
@description: ChangeFormatNumber
--------------------------------------------------------------------------------- */

// --- utilities

// --- ChangeFormatNumber
var ChangeFormatNumber = function () {
  // -- handleChangeFormatNumber
  var handleChangeFormatNumber = function handleChangeFormatNumber() {
    $("body").on("input", ".js-format-number", function (e) {
      var _this = $(e.currentTarget);
      var _value = _this.val();
      _value = String(parseInt(_value.replace(/\./gi, "").replace(/r/gi, "").replace(/p/gi, "")));
      if (_value !== 0) {
        _this.val(_utilities.Currency.format_rp(_value));
      }
    });
    if ($("input").hasClass("js-format-number")) {
      $(".js-format-number").each(function (i, e) {
        var _id = $(e).attr("id");
        var _value = $("#" + _id).val();
        if (_value !== undefined) {
          var _prefix = _value.substring(0, 2);
          if (_prefix !== "Rp") {
            _value = String(parseInt(_value.replace(/\./gi, "").replace(/r/gi, "").replace(/p/gi, "")));
            if (_value !== 0 && !isNaN(_value)) {
              $("#" + _id).val(_utilities.Currency.format_rp(_value));
            }
          }
        }
      });
    }
  };

  // --- init
  var init = function init() {
    handleChangeFormatNumber();
  };

  // --- return
  return {
    init: init
  };
}();
var _default = exports["default"] = ChangeFormatNumber;

},{"../utilities":31}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: CheckBox
@description: CheckBox
--------------------------------------------------------------------------------- */

// --- CheckBox
var CheckBox = function () {
  // handle back
  var handleBack = function handleBack() {
    $(".js-checkbox").on("change", function (e) {
      var _this = $(e.currentTarget);
      var _label = _this.siblings(".custom-control-label");
      if (_this.is(":checked")) {
        _label.text("Ya");
      } else {
        _label.text("Tidak");
      }
    });
  };
  var init = function init() {
    if ($(".js-checkbox").length) {
      handleBack();
    }
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = CheckBox;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* ------------------------------------------------------------------------------
@name: DataTable
--------------------------------------------------------------------------------- */

var DataTable = function () {
  var handleDataTable = function handleDataTable() {
    // data table defautl
    $(".js-datatable").DataTable({
      responsive: true,
      autoWidth: false,
      stateSave: true
    });
  };
  var handleRunDataTableServer = function handleRunDataTableServer(dataSetting) {
    var columnSetting = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var filterSetting = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var sortSetting = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var columnVisibleSetting = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    // --- datatable setting
    var tableSetting = _defineProperty(_defineProperty({
      // bLengthChange: false,
      // ordering: false,
      info: false,
      processing: true,
      serverSide: true,
      responsive: true,
      autoWidth: false,
      stateSave: true,
      dom: '<"float-right"f>rt<"row"<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>',
      // buttons: ["copy", "excel", "pdf"],
      ajax: {
        url: dataSetting.url,
        type: dataSetting.method,
        data: dataSetting ? dataSetting.data : "",
        beforeSend: function beforeSend(xhr) {
          // Add Bearer token to the request headers
          xhr.setRequestHeader("Authorization", "Bearer " + dataSetting.token);
        }
      },
      columnDefs: columnSetting
    }, "processing", true), "language", {
      processing: '<div class="loader"></div>'
    });
    var table = $("." + dataSetting.selector).DataTable(tableSetting);

    // --- filter setting
    $.each(filterSetting, function (i, v) {
      if (v.event === "change") {
        $("#" + v.id).on(v.event, function (e) {
          table.draw();
        });
      } else {
        $("#" + v.id).on(v.event, function (e) {
          var value = $(e.currentTarget).val();
          table.search(value).draw();
        });
      }
    });

    // --- sort setting
    if (sortSetting) {
      $("#" + sortSetting.id).on(sortSetting.event, function (e) {
        var value = $(e.currentTarget).val();
        table.page.len(value).draw();
      });
    }

    // --- setting visibility column
    if (columnVisibleSetting) {
      table.columns(columnVisibleSetting.target).visible(columnVisibleSetting.visble);
    }
    var selectedRows = [];
    var deleteButton = "<button type=\"button\" class=\"btn btn-danger waves-effect w-md waves-light\" id=\"deleteBatch\"><i class=\"mdi mdi-trash-can-outline\"></i> Delete Batch</button>";

    // Handle 'Select All' checkbox
    $("#selectAll").on("click", function () {
      var rows = table.rows({
        search: "applied"
      }).nodes();
      $('input[type="checkbox"]', rows).prop("checked", this.checked);

      // Add or remove row IDs from selectedRows
      if (this.checked) {
        $('input[type="checkbox"]', rows).each(function () {
          var id = $(this).val();
          if (!selectedRows.includes(id)) {
            selectedRows.push(id);
          }
        });
        $("body").find(".form-inline").prepend(deleteButton);
      } else {
        $('input[type="checkbox"]', rows).each(function () {
          var id = $(this).val();
          selectedRows = selectedRows.filter(function (item) {
            return item !== id;
          });
        });
        $("body").find(".form-inline").find("#deleteBatch").remove();
      }
    });

    // Handle individual row checkboxes
    $("." + dataSetting.selector + " tbody").on("change", 'input[type="checkbox"]', function () {
      var id = $(this).val();
      if (this.checked) {
        if (!selectedRows.includes(id)) {
          selectedRows.push(id);
        }
        $("body").find(".form-inline").prepend(deleteButton);
      } else {
        selectedRows = selectedRows.filter(function (item) {
          return item !== id;
        });
        $("#selectAll").prop("checked", false);
        $("body").find(".form-inline").find("#deleteBatch").remove();
      }
    });

    // Example of getting selected rows when form is submitted
    $("body").find("#deleteBatch").on("click", function () {
      console.log("Selected Row IDs:", selectedRows);
    });
  };

  // -- init
  var init = function init() {
    handleDataTable();
  };
  return {
    init: init,
    server: handleRunDataTableServer
  };
}();
var _default = exports["default"] = DataTable;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: DatePickerInput
@description: DatePickerInput Activate
--------------------------------------------------------------------------------- */

var DatePickerInput = function () {
  // handlRunDatePicker
  var handlRunDatePicker = function handlRunDatePicker() {
    $(".js-date-picker").datepicker({
      format: "dd/mm/yyyy",
      autoclose: true,
      todayHighlight: true
    });
  };

  // handldeDateRengePicker
  var handldeDateRengePicker = function handldeDateRengePicker() {
    var start = moment().subtract(29, "days");
    var end = moment();
    function cb(start, end) {
      $(".js-date-range-picker").val(start.format("DD/MM/YYYY") + " - " + end.format("DD/MM/YYYY"));
    }
    $(".js-date-range-picker").daterangepicker({
      // timePicker: true,
      startDate: start,
      endDate: end,
      locale: {
        format: "DD/MM/YYYY",
        separator: " - "
      },
      ranges: {
        "Hari ini": [moment(), moment()],
        Kemarin: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "7 hari terakhir": [moment().subtract(6, "days"), moment()],
        "30 hari terakhir": [moment().subtract(29, "days"), moment()],
        "Bulan ini": [moment().startOf("month"), moment().endOf("month")],
        "Bulan lalu": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
        "Tahun ini": [moment().startOf("year"), moment().endOf("year")],
        "Tahun lalu": [moment().subtract(1, "year").startOf("year"), moment().subtract(1, "year").endOf("year")]
      }
    }, cb);
    cb(start, end);
    var _dateRange = $(".js-date-range-picker").val();
    $(".js-date-range-picker").attr("data-date", _dateRange);
  };
  var init = function init() {
    if ($(".js-date-picker").length || $(".js-date-range-picker").length) {
      handlRunDatePicker();
      handldeDateRengePicker();
    }
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = DatePickerInput;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: Dropdown
@description: Dropdown
--------------------------------------------------------------------------------- */

var Dropdown = function () {
  // handle back
  var handleShow = function handleShow() {
    $("body").on("click", ".fi-dropdown input", function (e) {
      var _this = $(e.currentTarget);
      if (_this.parents(".fi-dropdown").hasClass("fi-dropdown--show")) {
        _this.parents(".fi-dropdown").removeClass("fi-dropdown--show");
      } else {
        _this.parents(".fi-dropdown").addClass("fi-dropdown--show");
      }
    });

    // handle click body
    $("body").on("click", function (e) {
      if ($(".fi-dropdown input").parents(".fi-dropdown").hasClass("fi-dropdown--show")) {
        $(".fi-dropdown input").parents(".fi-dropdown").removeClass("fi-dropdown--show");
      }
    });

    // stop progation
    $("body").on("click", ".fi-dropdown", function (e) {
      e.stopPropagation();
    });
  };
  var handleSelect = function handleSelect() {
    $("body").on("click", ".fi-dropdown .fi-dropdown-item", function (e) {
      var _this = $(e.currentTarget);
      var _val = _this.text();
      var _id = _this.attr("data-id");
      if (!_this.hasClass("selected")) {
        $(".fi-dropdown-item").removeClass("selected");
        _this.addClass("selected");
        _this.parents(".fi-dropdown").find(".form-control").val(_val);
        _this.parents(".fi-dropdown").find(".form-control").attr("data-id", _id);
      }
      $(".fi-dropdown").removeClass("fi-dropdown--show");
    });
  };
  var init = function init() {
    if ($("body").find(".fi-dropdown").length) {
      handleShow();
      handleSelect();
    }
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = Dropdown;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: Dropify
@description: Dropify Activate
--------------------------------------------------------------------------------- */

var Dropify = function () {
  // dropify
  var handleRunDropify = function handleRunDropify() {
    $(".js-dropify").dropify({
      messages: {
        "default": "Seret dan lepas file di sini atau klik",
        replace: "Seret dan lepas atau klik untuk mengganti",
        remove: "Remove",
        error: "Ups, ada yang salah ditambahkan."
      },
      error: {
        fileSize: "Ukuran file terlalu besar."
      }
    });
  };
  var init = function init() {
    if ($(".js-dropify").length) {
      handleRunDropify();
    }
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = Dropify;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _variables = require("../variables");
/* ------------------------------------------------------------------------------
@name: Data Table Editable
@description: Data Table Editable Activate
--------------------------------------------------------------------------------- */

// --- variables

var EditableTables = function () {
  var handleCheckEditTable = function handleCheckEditTable() {
    $("body").on("click", 'td[data-editable="true"]', function (e) {
      var _this = $(e.currentTarget);
      var _id = _this.attr("data-id");
      $(".js-editable").attr("data-id", _id);
    });
  };
  var handleValidationEditTable = function handleValidationEditTable() {
    $("body").on("keypress", ".js-editable", function (e) {
      var _this = $(e.currentTarget);
      if (!_variables.NUMBERIC.test(e.key)) {
        _this.addClass("error");
        e.preventDefault();
      } else {
        _this.removeClass("error");
      }
    });
  };

  // run datatable
  var handleRunDataTable = function handleRunDataTable() {
    // data table default
    $(".js-editable-table").editableTableWidget();
  };
  var init = function init() {
    if ($("body").find(".js-editable-table").length) {
      handleCheckEditTable();
      handleValidationEditTable();
      handleRunDataTable();
    }
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = EditableTables;

},{"../variables":35}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: Password
@description: Password
--------------------------------------------------------------------------------- */

// --- Password
var Password = function () {
  var handleShowPassword = function handleShowPassword() {
    $(".js-show-password").on("click", function (e) {
      var _this = $(e.currentTarget);
      var _parent = _this.parent();
      if (_parent.hasClass("show--password")) {
        _parent.removeClass("show--password");
        _parent.find(".password").attr("type", "password");
        _this.removeClass("pi-eye");
        _this.addClass("pi-eye-off");
      } else {
        _parent.addClass("show--password");
        _parent.find(".password").attr("type", "text");
        _this.removeClass("pi-eye-off");
        _this.addClass("pi-eye");
      }
    });
  };

  // handle back
  var handleConfirmPassword = function handleConfirmPassword() {
    $(".js-confirm-password").on("input", function (e) {
      var _this = $(e.currentTarget);
      var _parent = _this.parent();
      var _val = _this.val();
      var _password = _this.parents("body").find("#password").val();
      var _text = _parent.find(".form-alert").attr("data-invalid");
      if (_val == _password) {
        _parent.removeClass("error");
        _parent.find(".form-alert").removeClass("error").text("");
      } else {
        _parent.addClass("error");
        _parent.find(".form-alert").addClass("error").text(_text);
      }
    });
  };
  var init = function init() {
    if ($(".js-confirm-password").length) {
      // handleShowPassword();
      // handleConfirmPassword();
    }
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = Password;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: SelectInput
@description: SelectInput
--------------------------------------------------------------------------------- */

var SelectInput = function () {
  // SelectInput
  var handleRunSelectInput = function handleRunSelectInput() {
    // SelectInput
    $(".js-select-input").select2();
    $("body").on("change", ".js-select-input", function () {
      $(".js-select-input").select2();
    });
  };
  var init = function init() {
    if ($(".js-select-input").length) {
      handleRunSelectInput();
    }
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = SelectInput;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: SweetAlert
@description: SweetAlert Activate
--------------------------------------------------------------------------------- */

var SweetAlert = function () {
  // handle run detele
  var handleRunDelete = function handleRunDelete() {
    //Parameter
    $("body").on("click", ".js-delete", function (e) {
      e.preventDefault();
      var url = e.currentTarget.getAttribute("href");
      swal({
        title: "Apa Anda yakin?",
        text: "Tindakan Anda tidak dapat diurungkan!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus!",
        cancelButtonText: "Batal",
        confirmButtonClass: "btn btn-custom",
        cancelButtonClass: "btn btn-danger m-l-10",
        buttonsStyling: false
      }).then(function () {
        swal({
          title: "Deleted!",
          text: "Data Anda telah dihapus.",
          type: "success",
          timer: 1500
        });
        handleSuccess(url);
      }, function (dismiss) {
        if (dismiss === "cancel") {
          swal("Dibatalkan", "Data Anda aman :)", "error");
        }
      });
    });
  };

  // handle success
  var handleSuccess = function handleSuccess(url) {
    setTimeout(function () {
      window.location.href = url;
    }, 800);
  };
  var init = function init() {
    handleRunDelete();
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = SweetAlert;

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: Temporary Alert
@description: Temporary Alert Activate
--------------------------------------------------------------------------------- */

var TemporaryAlert = function () {
  // handle run Temporary alert
  var handleRunTemporaryAlert = function handleRunTemporaryAlert() {
    setTimeout(function () {
      $(".js-temporary-alert").slideUp(300);
    }, 3000);
    setTimeout(function () {
      $(".js-temporary-alert").remove();
    }, 3350);
  };
  var init = function init() {
    if ($(".js-temporary-alert").length) {
      handleRunTemporaryAlert();
    }
  };
  return {
    init: init
  };
}();
var _default = exports["default"] = TemporaryAlert;

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BackButton", {
  enumerable: true,
  get: function get() {
    return _BackButton["default"];
  }
});
Object.defineProperty(exports, "ChangeFormatNumber", {
  enumerable: true,
  get: function get() {
    return _ChangeFormatNumber["default"];
  }
});
Object.defineProperty(exports, "CheckBox", {
  enumerable: true,
  get: function get() {
    return _CheckBox["default"];
  }
});
Object.defineProperty(exports, "DataTable", {
  enumerable: true,
  get: function get() {
    return _DataTable["default"];
  }
});
Object.defineProperty(exports, "DatePickerInput", {
  enumerable: true,
  get: function get() {
    return _DatePickerInput["default"];
  }
});
Object.defineProperty(exports, "Dropdown", {
  enumerable: true,
  get: function get() {
    return _Dropdown["default"];
  }
});
Object.defineProperty(exports, "Dropify", {
  enumerable: true,
  get: function get() {
    return _Dropify["default"];
  }
});
Object.defineProperty(exports, "EditableTables", {
  enumerable: true,
  get: function get() {
    return _EditableTables["default"];
  }
});
Object.defineProperty(exports, "Password", {
  enumerable: true,
  get: function get() {
    return _Password["default"];
  }
});
Object.defineProperty(exports, "SelectInput", {
  enumerable: true,
  get: function get() {
    return _SelectInput["default"];
  }
});
Object.defineProperty(exports, "SweetAlert", {
  enumerable: true,
  get: function get() {
    return _SweetAlert["default"];
  }
});
Object.defineProperty(exports, "TemporaryAlert", {
  enumerable: true,
  get: function get() {
    return _TemporaryAlert["default"];
  }
});
var _DataTable = _interopRequireDefault(require("./DataTable"));
var _SweetAlert = _interopRequireDefault(require("./SweetAlert"));
var _Dropify = _interopRequireDefault(require("./Dropify"));
var _TemporaryAlert = _interopRequireDefault(require("./TemporaryAlert"));
var _BackButton = _interopRequireDefault(require("./BackButton"));
var _DatePickerInput = _interopRequireDefault(require("./DatePickerInput"));
var _SelectInput = _interopRequireDefault(require("./SelectInput"));
var _EditableTables = _interopRequireDefault(require("./EditableTables"));
var _ChangeFormatNumber = _interopRequireDefault(require("./ChangeFormatNumber"));
var _Password = _interopRequireDefault(require("./Password"));
var _Dropdown = _interopRequireDefault(require("./Dropdown"));
var _CheckBox = _interopRequireDefault(require("./CheckBox"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }

},{"./BackButton":7,"./ChangeFormatNumber":8,"./CheckBox":9,"./DataTable":10,"./DatePickerInput":11,"./Dropdown":12,"./Dropify":13,"./EditableTables":14,"./Password":15,"./SelectInput":16,"./SweetAlert":17,"./TemporaryAlert":18}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Scrolllable = _interopRequireDefault(require("./Scrolllable.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/* ------------------------------------------------------------------------------
@name: Alert
@description: Alert Activate
--------------------------------------------------------------------------------- */

var Alert = function () {
  // --- handleEnable
  var handleEnable = function handleEnable(message, status) {
    if (status === "success") {
      $(".alert").removeClass("alert--failed").addClass("alert--success show-alert");
      $(".alert").find(".alert__title").text("Berhasil!");
      $(".alert").find(".alert__desc").text(message);
      _Scrolllable["default"].enable();
    }
    if (status === "error") {
      $(".alert").addClass("alert--failed show-alert");
      $(".alert").find(".alert__title").text("Gagal!");
      $(".alert").find(".alert__desc").text(message);
      _Scrolllable["default"].disable();
    }
    setTimeout(function () {
      handleDisable();
    }, 2000);
    handleHideAlert();
  };
  var handleDisable = function handleDisable() {
    _Scrolllable["default"].enable();
    if ($(".alert").hasClass("show-alert")) {
      $(".alert").removeClass("show-alert");
    }
    if ($(".alert").hasClass("alert--success")) {
      $(".alert").removeClass("alert--success");
    } else {
      $(".alert").removeClass("alert--failed");
    }
  };
  var handleHideAlert = function handleHideAlert() {
    $(".js-alert-close").on("click", function () {
      handleDisable();
    });
  };
  return {
    enable: handleEnable,
    disable: handleDisable
  };
}();
var _default = exports["default"] = Alert;

},{"./Scrolllable.js":27}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: Currency
@description: Currency
--------------------------------------------------------------------------------- */

var Currency = function () {
  var idr_format = function idr_format(number) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Rp ";
    var _number_string = number.toString().replace(/[^,\d]/g, ""),
      _split = _number_string.split(","),
      _mod = _split[0].length % 3,
      _idr = _split[0].substr(0, _mod),
      _thousands = _split[0].substr(_mod).match(/\d{3}/gi),
      _separator = "",
      _isMinus = String(number)[0],
      _result;

    // if thousands
    if (_thousands) {
      _separator = _mod ? "." : "";
      _idr += _separator + _thousands.join(".");
    }
    _idr = _split[1] != undefined ? _idr + "," + _split[1] : _idr;
    if (_isMinus == "-") {
      prefix = "RP -";
    }
    _result = prefix != false ? prefix + _idr : _idr;
    return _result;
  };

  // remove_idr_format
  var remove_idr_format = function remove_idr_format(idr) {
    var _result = idr.split(".").join("").split(" ").join("").split("Rp").join("");
    return Number(_result);
  };

  // abbreviate
  var abbreviate = function abbreviate(num, digits) {
    var units = ["k+", "M+", "B+", "T+", "P+", "E+", "Z+", "Y+"],
      decimal;
    for (var i = units.length - 1; i >= 0; i--) {
      decimal = Math.pow(1000, i + 1);
      if (num <= -decimal || num >= decimal) {
        return +(num / decimal).toFixed(digits) + units[i];
      }
    }
    return num;
  };
  return {
    format_rp: idr_format,
    remove_rp: remove_idr_format,
    abbreviate: abbreviate
  };
}();
var _default = exports["default"] = Currency;

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _components = require("../components");
// --- components

/* ------------------------------------------------------------------------------
@name: DeleteData
@description: DeleteData Activate
--------------------------------------------------------------------------------- */

var DeleteData = function () {
  var handleGetData = function handleGetData(id) {
    if ($(".js-product-result").length) {
      _components.Product.handleDeleteData(id);
    }
    if ($(".js-type-result").length) {
      _components.Type.handleDeleteData(id);
    }
    if ($(".js-category-result").length) {
      _components.Category.handleDeleteData(id);
    }
    if ($(".js-unit-result").length) {
      _components.Unit.handleDeleteData(id);
    }
    if ($(".js-supplier-result").length) {
      _components.Supplier.handleDeleteData(id);
    }
    if ($(".js-customer-result").length) {
      _components.Customer.handleDeleteData(id);
    }
    if ($(".js-user-result").length) {
      _components.Users.handleDeleteData(id);
    }
    if ($(".js-table-result").length) {
      _components.Table.handleDeleteData(id);
    }
    if ($(".js-po-result").length) {
      _components.PurchaseOrder.handleDeleteData(id);
    }
    if ($(".js-stock-in-result").length) {
      _components.StockIn.handleDeleteData(id);
    }
    if ($(".js-stock-out-result").length) {
      _components.StockOut.handleDeleteData(id);
    }
    if ($(".js-stock-opname-result").length) {
      _components.StockOpname.handleDeleteData(id);
    }
    if ($(".js-sale-result").length) {
      _components.Sale.handleDeleteData(id);
    }
    if ($(".js-tax-result").length) {
      _components.Tax.handleDeleteData(id);
    }
    if ($(".js-outlet-result").length) {
      _components.Outlet.handleDeleteData(id);
    }
    if ($(".js-employee-result").length) {
      _components.Employee.handleDeleteData(id);
    }
    if ($(".js-addon-result").length) {
      _components.Addon.handleDeleteData(id);
    }
    if ($(".js-cash-result").length) {
      _components.Cash.handleDeleteData(id);
    }
    if ($(".js-cash-category").length) {
      _components.CashCategory.handleDeleteData(id);
    }
    if ($(".js-payment-account").length) {
      _components.PaymentAccount.handleDeleteData(id);
    }
  };

  // handle run detele
  var handleRunDelete = function handleRunDelete() {
    //delete single data
    $("body").on("click", ".js-delete-data", function (e) {
      var _this = $(e.currentTarget);
      var _id = _this.attr("data-id");
      swal({
        title: "Apakah Anda yakin?",
        text: "Tindakan ini tidak dapat diurungkan!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger m-l-10",
        buttonsStyling: false
      }).then(function () {
        // Run API Delete Data
        handleGetData(_id);
      }, function (dismiss) {
        if (dismiss === "cancel") {
          swal("Batal", "Data Anda aman :)", "error");
        }
      });
    });
  };

  // handleRunDeleteAll
  var handleRunDeleteAll = function handleRunDeleteAll() {
    // delete multiple data
    $(".js-delete-all").on("click", function (e) {
      var _productIDArray = [];
      $(".js-select-data:checked").each(function (i, e) {
        var _value = $(e).val();
        _productIDArray.push(_value);
      });
      swal({
        title: "Apakah Anda yakin?",
        text: "Tindakan ini tidak dapat diurungkan!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger m-l-10",
        buttonsStyling: false
      }).then(function () {
        // Run API Delete Data
        handleGetData(_productIDArray);
        $(".js-delete-all").addClass("d-none");
        $(".js-select-all").prop("checked", false);
      }, function (dismiss) {
        if (dismiss === "cancel") {
          swal("Batal", "Data Anda aman :)", "error");
        }
      });
    });
  };
  var init = function init() {
    handleRunDelete();
  };
  return {
    init: init,
    "delete": handleRunDelete,
    deleteAll: handleRunDeleteAll
  };
}();
var _default = exports["default"] = DeleteData;

},{"../components":6}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: EditTable
@description: EditTable
--------------------------------------------------------------------------------- */

var EditTable = function () {
  // ajax
  var handleRunEditTable = function handleRunEditTable(url, data) {
    if (!$(".js-editable").hasClass("error")) {
      $.ajax({
        url: url,
        type: "POST",
        dataType: "JSON",
        data: data,
        success: function success(response) {
          if (response.code == 200) {
            toastr.success(response.message);
          } else {
            toastr.error(response.message);
          }
        },
        error: function error(response) {
          toastr.error(response.message);
        }
      });
    }
  };
  return {
    handleRunEditTable: handleRunEditTable
  };
}();
var _default = exports["default"] = EditTable;

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _variables = require("../variables");
var _components = require("../components");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // --- variables
// --- components
/* ------------------------------------------------------------------------------
@name: FilterData
@description: FilterData
--------------------------------------------------------------------------------- */

var FilterData = function () {
  // --- handleDateRange
  var handleDateRange = function handleDateRange(date) {
    return date.replace(" - ", "-").split("-");
  };

  // --- handleFormatDate
  var handleFormatDate = function handleFormatDate(date) {
    var _date = date.split(/\//);
    return [_date[0], _date[1], _date[2]].join("-");
  };
  var handleGetData = function handleGetData(_filter) {
    if ($(".js-product-result").length) {
      _components.Product.handleGetData(_filter);
    }
    if ($(".js-type-result").length) {
      _components.Type.handleGetData(_filter);
    }
    if ($(".js-category-result").length) {
      _components.Category.handleGetData(_filter);
    }
    if ($(".js-unit-result").length) {
      _components.Unit.handleGetData(_filter);
    }
    if ($(".js-addon-result").length) {
      _components.Addon.handleGetData(_filter);
    }
    if ($(".js-supplier-result").length) {
      _components.Supplier.handleGetData(_filter);
    }
    if ($(".js-customer-result").length) {
      _components.Customer.handleGetData(_filter);
    }
    if ($(".js-user-result").length) {
      _components.Users.handleGetData(_filter);
    }
    if ($(".js-table-result").length) {
      _components.Table.handleGetData(_filter);
    }
    if ($(".js-table-detail-result").length) {
      _components.TableDetail.handleGetData(_filter);
    }
    if ($(".js-sales-periode").length) {
      _components.SalesPeriode.handleGetData(_filter);
    }
    if ($(".js-sales-product").length) {
      _components.SalesProduct.handleGetData(_filter);
    }
    if ($(".js-sales-customer").length) {
      _components.SalesCustomer.handleGetData(_filter);
    }
    if ($(".js-sales-category").length) {
      _components.SalesCategory.handleGetData(_filter);
    }
    if ($(".js-sales-payment").length) {
      _components.SalesPayment.handleGetData(_filter);
    }
    if ($(".js-sales-type").length) {
      _components.SalesType.handleGetData(_filter);
    }
    if ($(".js-sales-served").length) {
      _components.SalesServed.handleGetData(_filter);
    }
    if ($(".js-po-result").length) {
      _components.PurchaseOrder.handleGetData(_filter);
    }
    if ($(".js-stock-in-result").length) {
      _components.StockIn.handleGetData(_filter);
    }
    if ($(".js-stock-out-result").length) {
      _components.StockOut.handleGetData(_filter);
    }
    if ($(".js-stock-opname-result").length) {
      _components.StockOpname.handleGetData(_filter);
    }
    if ($(".js-stock-card-result").length) {
      _components.StockCard.handleGetData(_filter);
    }
    if ($(".js-sale-result").length) {
      _components.Sale.handleGetData(_filter);
    }
    if ($(".js-tax-result").length) {
      _components.Tax.handleGetData(_filter);
    }
    if ($(".js-outlet-result").length) {
      _components.Outlet.handleGetData(_filter);
    }
    if ($(".js-employee-result").length) {
      _components.Employee.handleGetData(_filter);
    }
    if ($(".js-cash-flow").length) {
      _components.CashFlow.handleGetData(_filter);
    }
    if ($(".js-cash-detail").length) {
      _components.CashDetail.handleGetData(_filter);
    }
    if ($(".js-cash-netprofit").length) {
      _components.CashNetprofit.handleGetData(_filter);
    }
    if ($(".js-cash-result").length) {
      _components.Cash.handleGetData(_filter);
    }
    if ($(".js-cash-category").length) {
      _components.CashCategory.handleGetData(_filter);
    }
    if ($(".js-payment-account").length) {
      _components.PaymentAccount.handleGetData(_filter);
    }
    if ($(".js-device-result").length) {
      _components.Device.handleGetData(_filter);
    }
    if ($(".js-invoice-result").length) {
      _components.Invoice.handleGetData(_filter);
    }
  };
  var handleChangePage = function handleChangePage() {
    $("body").on("click", ".js-pagination a", function (e) {
      e.preventDefault();
      var _this = $(e.currentTarget);
      var _startPage = _this.data("ci-pagination-page");
      var _showPerPage = $(".js-show-per-page").val();
      var _keyword = $(".js-keyword").val();
      var _filter = {
        startPage: _startPage,
        limitPage: _showPerPage,
        keyword: _keyword
      };
      if ($(".js-date-range-picker").length) {
        var _date = $(".js-date-range-picker").val();
        var _dateRange = handleDateRange(_date);
        var _startDate = handleFormatDate(_dateRange[0]);
        var _endDate = handleFormatDate(_dateRange[1]);

        // filter join
        var _filter1 = _filter;
        var _filter2 = {
          startDate: _startDate,
          endDate: _endDate
        };
        var _filter = _objectSpread(_objectSpread({}, _filter1), _filter2);
        if ($(".js-change-type").length) {
          var _type = $(".js-change-type").val();
          // filter join
          var _filter1 = _filter;
          var _filter2 = {
            type: _type
          };
          var _filter = _objectSpread(_objectSpread({}, _filter1), _filter2);
        }
      }
      handleGetData(_filter);
    });
  };
  var handleChangeSort = function handleChangeSort() {
    $(".js-show-per-page").on("change", function () {
      handleLoadData();
    });
  };
  var handleFilterData = function handleFilterData() {
    $(".js-filter-data").on("click", function () {
      handleLoadData();
    });
  };
  var handleKeyupKeyword = function handleKeyupKeyword() {
    $(".js-keyword").on("keyup", function (e) {
      var _this = $(e.currentTarget);
      if (e.which == 13 && !_variables.WHITESPACE.test(_this.val())) {
        if ($(".js-pagination a").data("ci-pagination-page") !== undefined) {
          var _startPage = $(".js-pagination a").data("ci-pagination-page");
        } else {
          var _startPage = 1;
        }
        var _showPerPage = $(".js-show-per-page").val();
        var _keyword = _this.val();
        var _filter = {
          startPage: _startPage,
          limitPage: _showPerPage,
          keyword: _keyword
        };
        if ($(".js-date-range-picker").length) {
          var _date = $(".js-date-range-picker").val();
          var _dateRange = handleDateRange(_date);
          var _startDate = handleFormatDate(_dateRange[0]);
          var _endDate = handleFormatDate(_dateRange[1]);

          // filter join
          var _filter1 = _filter;
          var _filter2 = {
            startDate: _startDate,
            endDate: _endDate
          };
          var _filter = _objectSpread(_objectSpread({}, _filter1), _filter2);
        }
        if ($(".js-change-type").length) {
          var _type = $(".js-change-type").val();
          // filter join
          var _filter1 = _filter;
          var _filter2 = {
            type: _type
          };
          var _filter = _objectSpread(_objectSpread({}, _filter1), _filter2);
        }
        handleGetData(_filter);
      }
    });
  };
  var handleResetData = function handleResetData() {
    $(".js-reset-data").on("click", function () {
      var _dateRange = $(".js-date-range-picker").attr("data-date");
      $(".js-show-per-page").val("10");
      $(".js-keyword").val("");
      $(".js-change-type").find("[value=\"All\"]").attr("selected", "selected");
      $(".js-date-range-picker").val(_dateRange);
      handleLoadData();
    });
  };

  // handleLoadData
  var handleLoadData = function handleLoadData() {
    if ($(".js-pagination a").data("ci-pagination-page") !== undefined) {
      var _startPage = $(".js-pagination a").data("ci-pagination-page");
    } else {
      var _startPage = 1;
    }
    var _showPerPage = $(".js-show-per-page").val();
    var _keyword = $(".js-keyword").val() !== "" ? $(".js-keyword").val() : 0;
    var _is_sale = $(".js-status-stock").val() !== "" ? $(".js-status-stock").val() : "All";
    var _filter = {
      startPage: _startPage,
      limitPage: _showPerPage,
      keyword: _keyword,
      is_sale: _is_sale
    };
    if ($(".js-date-range-picker").length) {
      var _date = $(".js-date-range-picker").val();
      var _dateRange = handleDateRange(_date);
      var _startDate = handleFormatDate(_dateRange[0]);
      var _endDate = handleFormatDate(_dateRange[1]);

      // filter join
      var _filter1 = _filter;
      var _filter2 = {
        startDate: _startDate,
        endDate: _endDate
      };
      var _filter = _objectSpread(_objectSpread({}, _filter1), _filter2);
    }
    if ($(".js-change-type").length) {
      var _type = $(".js-change-type").val();
      // filter join
      var _filter1 = _filter;
      var _filter2 = {
        type: _type
      };
      var _filter = _objectSpread(_objectSpread({}, _filter1), _filter2);
    }
    handleGetData(_filter);
  };
  var init = function init() {
    if ($(".js-filter-data").length) {
      handleChangeSort();
      handleChangePage();
      handleFilterData();
      handleKeyupKeyword();
      handleResetData();
      handleLoadData();
    }
  };
  return {
    init: init,
    handleDateRange: handleDateRange,
    handleFormatDate: handleFormatDate,
    handleLoadData: handleLoadData
  };
}();
var _default = exports["default"] = FilterData;

},{"../components":6,"../variables":35}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _variables = require("../variables");
var _index = require("./index");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); } /* ------------------------------------------------------------------------------
@name: Form
@description: Form
--------------------------------------------------------------------------------- */ // --- variables
// --- utilities
var Form = function () {
  // - handleValidation
  var handleValidation = function handleValidation(eventsEl, selectorEl) {
    $.each(eventsEl, function (ie, ve) {
      $.each(selectorEl, function (i, v) {
        $("#" + v.id).on(ve, function (e) {
          var _this = $(e.currentTarget),
            _val = _this.val(),
            _target = _this.attr("data-target"),
            _alertEl = $("#" + _target);
          var _errorMessage;

          // Condition if validation does not error
          _alertEl.removeClass("error");
          _this.parent().removeClass("error");

          // confirmPassword Validation
          if (v.validation !== undefined && v.validation.confirmPassword) {
            if (_val !== $("#password").val()) {
              _errorMessage = _alertEl.attr("data-invalid-confirm");
            }
          }

          // Minimum Validation
          if (v.validation !== undefined && v.validation.minimum) {
            if (_val.length < v.validation.minimumChar) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Maximum Validation
          if (v.validation !== undefined && v.validation.maximum) {
            if (_val.length < v.validation.maximumChar) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Minimum Validation
          if (v.validation !== undefined && v.validation.name) {
            if (!_variables.PERSON_NAME.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Email validation
          if (v.validation !== undefined && v.validation.email) {
            if (!_variables.EMAIL.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Numeric validation
          if (v.validation !== undefined && v.validation.phone) {
            if (!_variables.PHONE_NUMBER.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Required validation
          if (_variables.WHITESPACE.test(_val) || _val === null) {
            _errorMessage = _alertEl.attr("data-req");
          }

          // Error Message
          if (_errorMessage !== undefined) {
            _alertEl.text(_errorMessage);
            _alertEl.addClass("error");
            _this.parent().addClass("error");
          }
        });
      });
    });

    // Return Handle keypress
    handleKeypress();
    // Return Handle confirm password
    handleConfirmPassword();
  };

  // handleKeypress
  var handleKeypress = function handleKeypress() {
    $(".number-only").on("keypress", function (e) {
      var _this = $(e.currentTarget),
        _val = _this.val(),
        _target = _this.attr("data-target"),
        _alertEl = $("#" + _target);
      var _errorMessage;
      if (!_variables.NUMBERIC.test(e.key)) {
        _errorMessage = _alertEl.attr("data-invalid");
        _alertEl.text(_errorMessage);
        _alertEl.addClass("error");
        _this.parent().addClass("error");
        // remove error after few second
        setTimeout(function () {
          _alertEl.removeClass("error");
          _this.parent().removeClass("error");
        }, 2000);
        e.preventDefault();
      }
    });
  };
  var handleConfirmPassword = function handleConfirmPassword() {
    $(".js-confirm-password").on("input", function (e) {
      var _this = $(e.currentTarget);
      var _parent = _this.parent();
      var _val = _this.val();
      var _password = _this.parents("body").find("#password").val();
      var _text = _parent.find(".form-alert").attr("data-invalid");
      if (_val == _password) {
        _parent.removeClass("error");
        _parent.find(".form-alert").removeClass("error").text("");
      } else {
        _parent.addClass("error");
        _parent.find(".form-alert").addClass("error").text(_text);
      }
    });
  };

  // handleEmptyData
  var handleEmptyData = function handleEmptyData(selectorEl) {
    $.each(selectorEl, function (i, v) {
      var _target = $("#" + v.id).attr("data-target"),
        _alertEl = $("#" + _target);

      // Condition if validation does not error
      _alertEl.removeClass("error");
      $("#" + v.id).parent().removeClass("error");
      if (v.validation !== undefined && v.validation.selectOption) {
        if ($("#" + v.id).hasClass("js-select2")) {
          var _select = $("#".concat(v.id, " option[value=0]")).text();
          $("#".concat(v.id, " option[value=0]")).attr("selected", "selected");
          $("#" + v.id).parent().find(".select2").find(".select2-selection__rendered").text(_select);
        }
        var _value = $("#" + v.id + " option:first-child").val();
        $("#" + v.id).val(_value);
      } else if (v.validation !== undefined && v.validation.attrId) {
        $("#" + v.id).attr("data-id", "");
      } else if (v.emptydata) {} else {
        $("#" + v.id).val("");
      }
      if ($("#" + v.id + "[type='file']")) {
        $('label[for="photo"]').parent().find(".user-avatar").remove();
        $(".dropify-preview").hide();
        $(".form-horizontal .img-preview").hide();
      }
    });
  };

  // handleRunEmpty
  var handleRunEmpty = function handleRunEmpty(selectorEl, isAlert) {
    if (isAlert) {
      swal({
        title: "Apakah Anda yakin?",
        text: "Tindakan ini tidak dapat diurungkan!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: "btn btn-danger m-l-10",
        buttonsStyling: false
      }).then(function () {
        // Run Empty data
        handleEmptyData(selectorEl);
        // hide modal
        $(".modal").modal("hide");
      }, function (dismiss) {
        if (dismiss === "cancel") {
          swal("Batal", "Data Anda aman :)", "error");
        }
      });
    } else {
      // Run Empty data
      handleEmptyData(selectorEl);
    }
  };

  // handleDataColletion
  var handleDataColletion = function handleDataColletion(selectorEl) {
    var formData = new FormData();
    $.each(selectorEl, function (i, v) {
      var inputValue = "";
      if (v.type !== undefined && v.type == "file") {
        inputValue = $("#" + v.id).prop("files")[0];
      } else if (v.type !== undefined && v.type == "checkbox") {
        if ($("#" + v.id).is(":checked")) {
          inputValue = "1";
        } else {
          inputValue = "0";
        }
      } else if (v.dataValueId !== undefined) {
        inputValue = $("#" + v.id).attr("data-id");
      } else {
        inputValue = $("#" + v.id).val();
      }
      if (!_variables.WHITESPACE.test(inputValue)) {
        if (inputValue !== null) {
          var keyValue = v.alias === undefined ? v.id : v.alias;
          formData.append(keyValue, inputValue);
        }
      }
    });
    return formData;
  };

  // handleGetFormData
  var handleGetFormData = function handleGetFormData(data, modalShow) {
    // handleRunEmpty(data.elementSelector);
    // get data from API
    var response = _index.HttpRequest.custom(data);
    if (response.code === 200) {
      // show form modal
      if (modalShow !== undefined) {
        // for examination modal
        if (modalShow === "examination") {
          var _data = response.data;
          if (_data.examinationNurse === "1" && _data.doctorId === undefined) {
            modalShow = "#modalExaminationNurse";
            $(modalShow).modal("show");
          } else {
            modalShow = "#modalExamination";
            $(modalShow).modal("show");
          }
          // end for examination modal
        } else {
          $(modalShow).modal("show");
        }
      } else {
        $(".modal").modal("show");
      }
      // set input data
      $.each(data.elementSelector, function (i, v) {
        var _element = v.alias !== undefined ? $("#" + v.alias) : $("#" + v.id);
        var _elementId = v.alias !== undefined ? v.alias : v.id;
        $.each(response.data, function (iD, vD) {
          if (modalShow !== undefined) {
            _element = $(modalShow).find("#" + v.id);
          }
          if (_elementId == iD) {
            if (v.type !== undefined && v.type == "file") {
              if (vD !== null) {
                _element.parents(".form-group").find(".img-preview").show();
                _element.parents(".form-group").find(".img-preview__el").attr({
                  src: vD
                });
              }
            } else if (v.type !== undefined && v.type == "checkbox") {
              if (vD == 1) {
                _element.attr("checked", "checked");
              } else {
                _element.removeAttr("checked");
              }
            } else if (v.type !== undefined && v.type == "custom-select-input") {
              _element.val(vD);
              _element.trigger("change");
            } else if (v.validation !== undefined && v.validation.selectOption) {
              if (_element.hasClass("js-select2")) {
                var _dataSelect = vD.split("value: ");
                var _text = _dataSelect[0];
                var _val = _dataSelect[1];
                _element.parent().find(".select2").find(".select2-selection__rendered").text(_text);
                $("#".concat(v.id, " option[value=\"").concat(_val, "\"]")).attr("selected", "selected");
                _element.val(_val);
              } else {
                _element.val(vD);
              }
            } else if (v.validation !== undefined && v.validation.attrId) {
              var _arr = vD.split(" - ");
              var _val2 = "";
              for (var _i = 0; _i < _arr.length; _i++) {
                _val2 += _arr[_i].split(",")[0] + ", ";
              }
              _element.attr("data-id", _val2.slice(0, -1));
              _element.val(vD);
            } else if (v.dataValueId !== undefined) {
              var _dataSelect2 = vD.split("-");
              _element.attr("data-id", _dataSelect2[0]);
              _element.val(_dataSelect2[1]);
              $("#".concat(iD)).parent(".form-dropdown").find(".js-reset-dropdown").show();
            } else {
              if (_typeof(vD) !== "object") {
                _element.val(vD);
              }
            }
          }
        });
      });
    } else {
      $(".modal").modal("hide");
      _index.SweetAlert.config(response.message, "warning");
    }
    return response;
  };

  // handleDeleteData
  var handleDeleteData = function handleDeleteData(data, element) {
    swal({
      title: "Apakah Anda yakin?",
      text: "Tindakan ini tidak dapat diurungkan!",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger m-l-10",
      buttonsStyling: false
    }).then(function () {
      // Run API Delete Data
      _index.HttpRequest["default"](data, element);
    }, function (dismiss) {
      if (dismiss === "cancel") {
        swal("Batal", "Data Anda aman :)", "error");
      }
    });
  };
  return {
    validation: handleValidation,
    emptyData: handleRunEmpty,
    dataColletion: handleDataColletion,
    deleteData: handleDeleteData,
    getFormData: handleGetFormData
  };
}();
var _default = exports["default"] = Form;

},{"../variables":35,"./index":31}],26:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _index = require("./index");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } /* ------------------------------------------------------------------------------
@name: HttpRequest
@description: HttpRequest Activate
--------------------------------------------------------------------------------- */ // --- utilities
var HttpRequest = function () {
  // handleAjaxRequest
  var handleAjaxRequest = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
      var response, _error$responseJSON;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return $.ajax({
              url: data.url,
              method: data.method,
              dataType: "JSON",
              cache: false,
              contentType: false,
              processData: false,
              data: data.data
            });
          case 3:
            response = _context.sent;
            return _context.abrupt("return", response);
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            _index.SweetAlert.config(((_error$responseJSON = _context.t0.responseJSON) === null || _error$responseJSON === void 0 ? void 0 : _error$responseJSON.message) || "Error during the request", "error");
            return _context.abrupt("return", null);
          case 11:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function handleAjaxRequest(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  return {
    ajax: handleAjaxRequest
  };
}();
var _default = exports["default"] = HttpRequest;

},{"./index":31}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: Scrolllable
@description: Scrolllable
--------------------------------------------------------------------------------- */

// --- Scrolllable
var Scrolllable = function () {
  // --- handleEnable
  var handleEnable = function handleEnable() {
    $("body").removeClass("rm-scroll");
    // --- vendor scrollLock for solve (position changed when on hover) in window/mac show scrollbar
    scrollLock.enablePageScroll();
  };

  // --- handleDisable
  var handleDisable = function handleDisable() {
    if ($(window).width() <= 1200) {
      $("body").addClass("rm-scroll");
    } else {
      // --- vendor scrollLock for solve (position changed when on hover) in window/mac show scrollbar
      scrollLock.setFillGapMethod("padding");
      // handle fill gap header
      var _fillGapHeader = document.querySelector(".header");
      scrollLock.addFillGapTarget(_fillGapHeader);
      // handle fill gap order
      var _fillGapOrder = document.querySelector(".order");
      scrollLock.addFillGapTarget(_fillGapOrder);
      scrollLock.disablePageScroll();
    }
  };

  // --- return
  return {
    enable: handleEnable,
    disable: handleDisable
  };
}();
var _default = exports["default"] = Scrolllable;

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: Session
@description: Session
--------------------------------------------------------------------------------- */

// --- Session
var Session = function () {
  var _timeoutSession;

  // --- handleSet
  var handleSet = function handleSet(key, value) {
    return localStorage.setItem(key, value);
  };

  // --- handleGet
  var handleGet = function handleGet(key) {
    return localStorage.getItem(key);
  };

  // --- handleRemove
  var handleRemove = function handleRemove(key) {
    return localStorage.removeItem(key);
  };

  // --- handleClear
  var handleClear = function handleClear() {
    return localStorage.clear();
  };

  // --- handleTimeout
  var handleTimeout = function handleTimeout(callbackFunction) {
    var timer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    _timeoutSession = setTimeout(function () {
      callbackFunction();
    }, timer * 1000);
    document.addEventListener("mousemove", function (e) {
      clearTimeout(_timeoutSession);
      _timeoutSession = setTimeout(function () {
        callbackFunction();
      }, timer * 10000);
    }, true);
  };

  // --- return
  return {
    set: handleSet,
    get: handleGet,
    remove: handleRemove,
    clear: handleClear,
    timeout: handleTimeout
  };
}();
var _default = exports["default"] = Session;

},{}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/* ------------------------------------------------------------------------------
@name: SweetAlert
--------------------------------------------------------------------------------- */

var SweetAlert = function () {
  var handleRunSweetAlert = function handleRunSweetAlert(message) {
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "success";
    switch (status) {
      case "warning":
        swal({
          title: "Peringatan!",
          text: message,
          type: "warning",
          confirmButtonClass: "btn btn-warning",
          timer: 3000
        });
        break;
      case "error":
        swal({
          title: "Gagal!",
          text: message,
          type: "error",
          confirmButtonClass: "btn btn-danger",
          timer: 3000
        });
        break;
      default:
        swal({
          title: "Berhasil!",
          text: message,
          type: "success",
          confirmButtonClass: "btn btn-custom",
          timer: 3000
        });
        break;
    }
  };
  return {
    config: handleRunSweetAlert
  };
}();
var _default = exports["default"] = SweetAlert;

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _variables = require("../variables");
/* ------------------------------------------------------------------------------
@name: Validation
@description: Validation
--------------------------------------------------------------------------------- */

// --- variables

var Validation = function () {
  // - handleInput
  var handleInput = function handleInput(eventsEl, selectorEl) {
    $.each(eventsEl, function (ie, ve) {
      $.each(selectorEl, function (i, v) {
        $("#" + v.id).on(ve, function (e) {
          var _this = $(e.currentTarget),
            _val = _this.val(),
            _target = _this.attr("data-target"),
            _alertEl = $("#" + _target);
          var _errorMessage;

          // Condition if validation does not error
          _alertEl.removeClass("error");
          _this.parent().removeClass("error");

          // Minimum Validation
          if (v.validation.minimum) {
            if (_val.length < v.validation.minimumChar) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Maximum Validation
          if (v.validation.maximum) {
            if (_val.length < v.validation.maximumChar) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Minimum Validation
          if (v.validation.name) {
            if (!_variables.PERSON_NAME.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Email validation
          if (v.validation.email) {
            if (!_variables.EMAIL.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid");
            }
          }

          // Numeric validation
          if (v.validation.phone) {
            if (!_variables.PHONE_NUMBER.test(_val)) {
              _errorMessage = _alertEl.attr("data-invalid-phone");
            }
          }

          // Required validation
          if (_variables.WHITESPACE.test(_val)) {
            _errorMessage = _alertEl.attr("data-req");
          }

          // Error Message
          if (_errorMessage !== undefined) {
            _alertEl.text(_errorMessage);
            _alertEl.addClass("error");
            _this.parent().addClass("error");
          }
        });
      });
    });

    // Return Handle keypress
    handleKeypress();
  };

  // handleKeypress
  var handleKeypress = function handleKeypress() {
    $(".number-only").on("keypress", function (e) {
      var _this = $(e.currentTarget),
        _val = _this.val(),
        _target = _this.attr("data-target"),
        _alertEl = $("#" + _target);
      var _errorMessage;
      if (!_variables.NUMBERIC.test(e.key)) {
        _errorMessage = _alertEl.attr("data-invalid");
        _alertEl.text(_errorMessage);
        _alertEl.addClass("error");
        _this.parent().addClass("error");
        // remove error after few second
        setTimeout(function () {
          _alertEl.removeClass("error");
          _this.parent().removeClass("error");
        }, 2000);
        e.preventDefault();
      }
    });
  };
  return {
    config: handleInput
  };
}();
var _default = exports["default"] = Validation;

},{"../variables":35}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Alert", {
  enumerable: true,
  get: function get() {
    return _Alert["default"];
  }
});
Object.defineProperty(exports, "Currency", {
  enumerable: true,
  get: function get() {
    return _Currency["default"];
  }
});
Object.defineProperty(exports, "DeleteData", {
  enumerable: true,
  get: function get() {
    return _DeleteData["default"];
  }
});
Object.defineProperty(exports, "EditTable", {
  enumerable: true,
  get: function get() {
    return _EditTable["default"];
  }
});
Object.defineProperty(exports, "FilterData", {
  enumerable: true,
  get: function get() {
    return _FilterData["default"];
  }
});
Object.defineProperty(exports, "Form", {
  enumerable: true,
  get: function get() {
    return _Form["default"];
  }
});
Object.defineProperty(exports, "HttpRequest", {
  enumerable: true,
  get: function get() {
    return _HttpRequest["default"];
  }
});
Object.defineProperty(exports, "Scrolllable", {
  enumerable: true,
  get: function get() {
    return _Scrolllable["default"];
  }
});
Object.defineProperty(exports, "Session", {
  enumerable: true,
  get: function get() {
    return _Session["default"];
  }
});
Object.defineProperty(exports, "SweetAlert", {
  enumerable: true,
  get: function get() {
    return _SweetAlert["default"];
  }
});
Object.defineProperty(exports, "Validation", {
  enumerable: true,
  get: function get() {
    return _Validation["default"];
  }
});
var _Currency = _interopRequireDefault(require("./Currency"));
var _Session = _interopRequireDefault(require("./Session"));
var _FilterData = _interopRequireDefault(require("./FilterData"));
var _EditTable = _interopRequireDefault(require("./EditTable"));
var _DeleteData = _interopRequireDefault(require("./DeleteData"));
var _SweetAlert = _interopRequireDefault(require("./SweetAlert"));
var _Validation = _interopRequireDefault(require("./Validation"));
var _Alert = _interopRequireDefault(require("./Alert"));
var _Scrolllable = _interopRequireDefault(require("./Scrolllable"));
var _Form = _interopRequireDefault(require("./Form"));
var _HttpRequest = _interopRequireDefault(require("./HttpRequest"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }

},{"./Alert":20,"./Currency":21,"./DeleteData":22,"./EditTable":23,"./FilterData":24,"./Form":25,"./HttpRequest":26,"./Scrolllable":27,"./Session":28,"./SweetAlert":29,"./Validation":30}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API_URL = void 0;
/* ------------------------------------------------------------------------------
@name: API_URL
@description: API_URL
--------------------------------------------------------------------------------- */

var URL_BASE = "http://localhost/codeigniter-api-template/api/";
var API_URL = exports.API_URL = {
  login: "".concat(URL_BASE, "auth/login"),
  USERS: "".concat(URL_BASE, "users")
};

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHITESPACE = exports.PHONE_NUMBER = exports.PERSON_NAME = exports.NUMBERIC = exports.FULL_NAME = exports.EMAIL = void 0;
/* ------------------------------------------------------------------------------
@name: Regex
@description: Regex
--------------------------------------------------------------------------------- */

var WHITESPACE = exports.WHITESPACE = /^ *$/;
var EMAIL = exports.EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
var NUMBERIC = exports.NUMBERIC = /[0-9]+$/i;
var PHONE_NUMBER = exports.PHONE_NUMBER = /^(0|\+62)+([0-9]){4,16}/i;
var FULL_NAME = exports.FULL_NAME = /^(?:[\u00c0-\u01ffa-zA-Z-\s\.']){3,}(?:[\u00c0-\u01ffa-zA-Z-\s\.']{3,})+$/i;
var PERSON_NAME = exports.PERSON_NAME = /^[a-zA-Z][a-zA-Z\-' ]*[a-zA-Z ]$/i;

},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WEB_URL = void 0;
/* ------------------------------------------------------------------------------
@name: WEB_URL
@description: WEB_URL
--------------------------------------------------------------------------------- */

var URL_BASE_WEB = $("base").attr("href");
var WEB_URL = exports.WEB_URL = {
  base: "".concat(URL_BASE_WEB),
  dashboard: "".concat(URL_BASE_WEB, "dashboard"),
  login: "".concat(URL_BASE_WEB, "login")
};

},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Regex = require("./Regex");
Object.keys(_Regex).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Regex[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Regex[key];
    }
  });
});
var _API_URL = require("./API_URL");
Object.keys(_API_URL).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _API_URL[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _API_URL[key];
    }
  });
});
var _WEB_URL = require("./WEB_URL");
Object.keys(_WEB_URL).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _WEB_URL[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _WEB_URL[key];
    }
  });
});

},{"./API_URL":32,"./Regex":33,"./WEB_URL":34}]},{},[1])

//# sourceMappingURL=maps/app.js.map
