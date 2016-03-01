import assert from 'assert';
import Immutable from 'immutable';
import createStore from 'fluxible/addons/createStore';
import BaseStore from 'fluxible/addons/BaseStore';


export class IntraspectorStore extends BaseStore {
  static storeName = 'IntraspectorStore';
  static handlers = {
    'intraspectorTrace.received': 'handleTraceReceived'
  }

  constructor() {
    super();
    this.trace = new Immutable.Map();
    this.debug = false;
    window.toggleIntraspector = () => {
      this.toggleIntraspector();
    }
  }

  toggleIntraspector = () => {
    this.debug = !this.debug;
    this.emitChange();
  };

  handleTraceReceived = payload => {
    assert(payload !== undefined, 'Payload must not be undefined.');
    assert(payload.key !== undefined, 'Payload.key must not be undefined.');
    assert(payload.trace !== undefined, 'Payload.trace must not be undefined.');
    this.trace = this.trace.setIn([payload.key], Immutable.fromJS(payload.trace));
    this.emitChange();
  };

  getTrace(key) {
    return this.trace.get(key, new Immutable.List());
  }

  getStatus() {
    return this.debug;
  }
}
