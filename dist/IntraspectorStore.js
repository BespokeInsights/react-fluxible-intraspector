'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IntraspectorStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _createStore = require('fluxible/addons/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _BaseStore2 = require('fluxible/addons/BaseStore');

var _BaseStore3 = _interopRequireDefault(_BaseStore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IntraspectorStore = exports.IntraspectorStore = function (_BaseStore) {
  _inherits(IntraspectorStore, _BaseStore);

  function IntraspectorStore() {
    _classCallCheck(this, IntraspectorStore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(IntraspectorStore).call(this));

    _this.toggleIntraspector = function () {
      _this.debug = !_this.debug;
      _this.emitChange();
    };

    _this.handleTraceReceived = function (payload) {
      (0, _assert2.default)(payload !== undefined, 'Payload must not be undefined.');
      (0, _assert2.default)(payload.key !== undefined, 'Payload.key must not be undefined.');
      (0, _assert2.default)(payload.trace !== undefined, 'Payload.trace must not be undefined.');
      _this.trace = _this.trace.setIn([payload.key], _immutable2.default.fromJS(payload.trace));
      _this.emitChange();
    };

    _this.trace = new _immutable2.default.Map();
    _this.debug = false;
    window.toggleIntraspector = function () {
      _this.toggleIntraspector();
    };
    return _this;
  }

  _createClass(IntraspectorStore, [{
    key: 'getTrace',
    value: function getTrace(key) {
      return this.trace.get(key, new _immutable2.default.List());
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      return this.debug;
    }
  }]);

  return IntraspectorStore;
}(_BaseStore3.default);

IntraspectorStore.storeName = 'IntraspectorStore';
IntraspectorStore.handlers = {
  'intraspectorTrace.received': 'handleTraceReceived'
};