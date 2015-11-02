'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _fluxibleAddonsCreateStore = require('fluxible/addons/createStore');

var _fluxibleAddonsCreateStore2 = _interopRequireDefault(_fluxibleAddonsCreateStore);

exports['default'] = (0, _fluxibleAddonsCreateStore2['default'])({
  storeName: 'IntraspectorStore',
  handlers: {
    'intraspectorTrace.received': 'handleTraceReceived'
  },

  handleTraceReceived: function handleTraceReceived(payload) {
    (0, _assert2['default'])(payload !== undefined, 'Payload must not be undefined.');
    (0, _assert2['default'])(payload.key !== undefined, 'Payload.key must not be undefined.');
    (0, _assert2['default'])(payload.trace !== undefined, 'Payload.trace must not be undefined.');
    this.trace = this.trace.setIn([payload.key], _immutable2['default'].fromJS(payload.trace));
    this.emitChange();
  },

  getTrace: function getTrace(key) {
    return this.trace.get(key, new _immutable2['default'].List());
  },

  toggleIntraspector: function toggleIntraspector() {
    this.debug = !this.debug;
    this.emitChange();
  },

  getStatus: function getStatus() {
    return this.debug;
  },

  initialize: function initialize() {
    var _this = this;

    this.trace = new _immutable2['default'].Map();
    this.debug = false;
    window.toggleIntraspector = (function () {
      _this.toggleIntraspector();
    }).bind(this);
  }
});
module.exports = exports['default'];