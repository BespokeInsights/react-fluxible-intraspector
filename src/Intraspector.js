import React from 'react';
import FluxibleMixin from 'fluxible-addons-react/FluxibleMixin';
import IntraspectorStore from './IntraspectorStore';

const TraceFrame = React.createClass({
  propTypes: {
    traceframe: React.PropTypes.object.isRequired
  },
  render() {
    const {name, source_code, source_line, module, file, documentation} = this.props.traceframe;
    return (
      <div>
        <h3>{name}</h3>
        <h4>{module}</h4>
        <h4>{file}:{source_line}</h4>
        <code>{documentation}</code>
        <code>{source_code}</code>
      </div>
    );
  }
});

export const Intraspector = React.createClass({
  mixins: [FluxibleMixin],
  propTypes: {
    context: React.PropTypes.object.isRequired,
    traceKey: React.PropTypes.string.isRequired
  },
  statics: {
    storeListeners: [IntraspectorStore]
  },
  onChange() {
    this.forceUpdate();
  },
  renderTrace(key) {
    const trace = this.getStore(IntraspectorStore).getTrace(key).toJS();
    return trace.map((traceframe) => {
      return <TraceFrame key={traceframe.call_timestamp} traceframe={traceframe} />
    });
  },
  render() {
    if (!this.getStore(IntraspectorStore).getStatus()) return false;
    return (
      <div>
        <h2>Intraspector Trace: {this.props.traceKey} </h2>
        {this.renderTrace(this.props.traceKey)}
      </div>
    );
  }
});
