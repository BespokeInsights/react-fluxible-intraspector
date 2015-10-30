import assert from 'assert';
import Immutable from 'immutable';
import createStore from 'fluxible/addons/createStore';

export default createStore({
  storeName: 'IntraspectorStore',
  handlers: {
    'intraspectorTrace.received': 'handleTraceReceived'
  },

  handleTraceReceived(payload) {
    assert(payload !== undefined, 'Payload must not be undefined.');
    assert(payload.key !== undefined, 'Payload.key must not be undefined.');
    assert(payload.trace !== undefined, 'Payload.trace must not be undefined.');
    this.trace = this.trace.setIn([payload.key], Immutable.fromJS(payload.trace));
    this.emitChange();
  },

  getTrace(key) {
    return this.trace.get(key, new Immutable.List());
  },

  switchDebug() {
    this.debug = !this.debug;
    this.emitChange();
  },

  getStatus() {
    return this.debug;
  },

  initialize() {
    this.trace = new Immutable.Map();
    this.debug = false;
    window.toggleDebug = () => {
      this.switchDebug();
    }.bind(this);
  }
});
