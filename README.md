# React Fluxible Intraspector
[![npm version](https://badge.fury.io/js/react-fluxible-intraspector.svg)](https://badge.fury.io/js/react-fluxible-intraspector)

This project is currently in development. Not recommended for use in production. APIs will change.

## Component API
### Intraspector

| Attribute | Required? | Default | Description |
| --------- | --------- | -------- | ----------- |
| context   | Yes       | None     | Fluxible Application Context |
| traceKey  | Yes       | None     | Intraspector Trace Key |

## Example Usage
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

```
git clone https://github.com/BespokeInsights/react-fluxible-intraspector.git
cd react-fluxible-intraspector
npm install
```

Make changes to files in the src/ folder. To build for release run `npm run compile`

## Related Modules
[Python Intraspector](https://github.com/BespokeInsights/python-intraspector)

## Thanks
Proudly developed by [Bespoke Insights](http://BespokeInsights.github.io)
