# React Fluxible Intraspector
This project is currently in development. Not recommended for use in production. APIs will change.

## Usage
1) Register Store in Fluxible Application

```javascript
import { IntraspectorStore } from 'react-fluxible-intraspector';
app.registerStore(IntraspectorStore);
```

2) Dispatch Intraspector Events
```javascript
payload = {key: 'exampleKey', trace: intraspectorTrace};
actionContext.dispatch('intraspectorTrace.received', payload);
```

3) Intraspector Component

```javascript
import { Intraspector } from 'react-fluxible-intraspector';

Component = React.createClass({
render() {
  return (
    <Intraspector context={this.props.appContext} traceKey={'exampleKey'} />
  )
});
```

4) Toggle debug mode in console to display Intraspector Component
```
toggleDebug()
```

## Development Guide

## Related Modules
Python Intraspector
