# browser-tab-emitter
An event emitter use localStorage for same-origin browser tab communication

## Demo
https://songjiachao.github.io/browser-tab-emitter/examples/index.html

![Demo](https://cdn.jsdelivr.net/npm/browser-tab-emitter@1.0.1/screenshots/demo.gif)

## Installation

### from NPM

`npm i browser-tab-emitter`

or if you use yarn

`yarn add browser-tab-emitter`

### from CDN

```
<script src="https://cdn.jsdelivr.net/npm/browser-tab-emitter@1.0.5/dist/index.global.js"></script>
```

## Usage
client1.js
```js
// npm install need, cdn way has been installed in global (window)
import BrowserTabEmitter from 'browser-tab-emitter'

const bte = new BrowserTabEmitter({
  // prefix: 'bte:'  // optional，default 'bte:'
})

// 绑定事件
bte.on('event1', (data) => {
  this.input1 = data
})
```

client2.js

```js
import BrowserTabEmitter from 'browser-tab-emitter'
const bte = new BrowserTabEmitter()
// emit event
bte.emit('event1', data)
```
