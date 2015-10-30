'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fluxibleAddonsReactFluxibleMixin = require('fluxible-addons-react/FluxibleMixin');

var _fluxibleAddonsReactFluxibleMixin2 = _interopRequireDefault(_fluxibleAddonsReactFluxibleMixin);

var _IntraspectorStore = require('./IntraspectorStore');

var _IntraspectorStore2 = _interopRequireDefault(_IntraspectorStore);

var TraceFrame = _react2['default'].createClass({
  displayName: 'TraceFrame',

  propTypes: {
    traceframe: _react2['default'].PropTypes.object.isRequired
  },
  render: function render() {
    var _props$traceframe = this.props.traceframe;
    var name = _props$traceframe.name;
    var source_code = _props$traceframe.source_code;
    var source_line = _props$traceframe.source_line;
    var module = _props$traceframe.module;
    var file = _props$traceframe.file;
    var documentation = _props$traceframe.documentation;

    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'h3',
        null,
        name
      ),
      _react2['default'].createElement(
        'h4',
        null,
        module
      ),
      _react2['default'].createElement(
        'h4',
        null,
        file,
        ':',
        source_line
      ),
      _react2['default'].createElement(
        'code',
        null,
        documentation
      ),
      _react2['default'].createElement(
        'code',
        null,
        source_code
      )
    );
  }
});

var Intraspector = _react2['default'].createClass({
  displayName: 'Intraspector',

  mixins: [_fluxibleAddonsReactFluxibleMixin2['default']],
  propTypes: {
    context: _react2['default'].PropTypes.object.isRequired,
    traceKey: _react2['default'].PropTypes.string.isRequired
  },
  statics: {
    storeListeners: [_IntraspectorStore2['default']]
  },
  onChange: function onChange() {
    this.forceUpdate();
  },
  renderTrace: function renderTrace(key) {
    var trace = this.getStore(_IntraspectorStore2['default']).getTrace(key).toJS();
    return trace.map(function (traceframe) {
      return _react2['default'].createElement(TraceFrame, { key: traceframe.call_timestamp, traceframe: traceframe });
    });
  },
  render: function render() {
    if (!this.getStore(_IntraspectorStore2['default']).getStatus()) return false;
    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
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
exports.Intraspector = Intraspector;