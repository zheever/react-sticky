"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _raf = _interopRequireDefault(require("raf"));

var Container =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2["default"])(Container, _PureComponent);

  function Container() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Container);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Container)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "events", ["resize", "scroll", "touchstart", "touchmove", "touchend", "pageshow", "load"]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "subscribers", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "rafHandle", null);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "subscribe", function (handler) {
      _this.subscribers = _this.subscribers.concat(handler);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "unsubscribe", function (handler) {
      _this.subscribers = _this.subscribers.filter(function (current) {
        return current !== handler;
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "notifySubscribers", function (evt) {
      if (!_this.framePending) {
        var currentTarget = evt.currentTarget;
        _this.rafHandle = (0, _raf["default"])(function () {
          _this.framePending = false;

          var _this$node$getBoundin = _this.node.getBoundingClientRect(),
              top = _this$node$getBoundin.top,
              bottom = _this$node$getBoundin.bottom;

          _this.subscribers.forEach(function (handler) {
            return handler({
              distanceFromTop: top,
              distanceFromBottom: bottom,
              eventSource: currentTarget === window ? document.body : _this.node
            });
          });
        });
        _this.framePending = true;
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getParent", function () {
      return _this.node;
    });
    return _this;
  }

  (0, _createClass2["default"])(Container, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
        getParent: this.getParent
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.events.forEach(function (event) {
        return window.addEventListener(event, _this2.notifySubscribers, true);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      if (this.rafHandle) {
        _raf["default"].cancel(this.rafHandle);

        this.rafHandle = null;
      }

      this.events.forEach(function (event) {
        return window.removeEventListener(event, _this3.notifySubscribers);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react["default"].createElement("div", (0, _extends2["default"])({}, this.props, {
        ref: function ref(node) {
          return _this4.node = node;
        },
        onScroll: this.notifySubscribers,
        onTouchStart: this.notifySubscribers,
        onTouchMove: this.notifySubscribers,
        onTouchEnd: this.notifySubscribers
      }));
    }
  }]);
  return Container;
}(_react.PureComponent);

exports["default"] = Container;
(0, _defineProperty2["default"])(Container, "childContextTypes", {
  subscribe: _propTypes["default"].func,
  unsubscribe: _propTypes["default"].func,
  getParent: _propTypes["default"].func
});