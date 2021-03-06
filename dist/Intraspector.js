'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Intraspector = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _FluxibleMixin2 = _interopRequireDefault(_FluxibleMixin);

var _IntraspectorStore = require('./IntraspectorStore');

var _IntraspectorStore2 = _interopRequireDefault(_IntraspectorStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TraceFrame = _react2.default.createClass({
  displayName: 'TraceFrame',

  propTypes: {
    traceframe: _react2.default.PropTypes.object.isRequired,
    count: _react2.default.PropTypes.number.isRequired
  },
  render: function render() {
    var _props$traceframe = this.props.traceframe;
    var name = _props$traceframe.name;
    var source_code = _props$traceframe.source_code;
    var source_line = _props$traceframe.source_line;
    var module = _props$traceframe.module;
    var file = _props$traceframe.file;
    var documentation = _props$traceframe.documentation;


    if (documentation === null || documentation === undefined) {
      documentation = 'Intraspector cannot detect function documentation.';
    }

    if (source_code === null || source_code === undefined) {
      source_code = 'Intraspector cannot detect function source code.';
    }

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h3',
        null,
        name
      ),
      _react2.default.createElement(
        'h4',
        null,
        module
      ),
      _react2.default.createElement(
        'h4',
        null,
        file,
        ':',
        source_line
      ),
      _react2.default.createElement(
        'pre',
        null,
        _react2.default.createElement(
          'code',
          null,
          documentation
        )
      ),
      _react2.default.createElement(
        'pre',
        null,
        _react2.default.createElement(
          'code',
          null,
          source_code
        )
      )
    );
  }
});

var Intraspector = exports.Intraspector = _react2.default.createClass({
  displayName: 'Intraspector',

  mixins: [_FluxibleMixin2.default],
  propTypes: {
    context: _react2.default.PropTypes.object.isRequired,
    traceKey: _react2.default.PropTypes.string.isRequired
  },
  statics: {
    storeListeners: [_IntraspectorStore2.default]
  },
  onChange: function onChange() {
    this.forceUpdate();
  },
  renderTrace: function renderTrace(key) {
    var trace = this.getStore(_IntraspectorStore2.default).getTrace(key).toJS();
    return trace.map(function (traceframe, i) {
      return _react2.default.createElement(TraceFrame, { key: traceframe.call_timestamp, traceframe: traceframe, count: i });
    });
  },
  render: function render() {
    if (!this.getStore(_IntraspectorStore2.default).getStatus()) return false;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'Intraspector Trace: ',
        this.props.traceKey,
        ' '
      ),
      this.renderTrace(this.props.traceKey)
    );
  }
});