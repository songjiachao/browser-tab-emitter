# browser-tab-emitter
在网站开发过程中，经常会遇到两个页面进行通信的情况，这个项目是通过监听localStorage，实现多tab之间的通信。

## 示例
https://songjiachao.github.io/browser-tab-emitter/examples/index.html

![示例](./screenshots/demo.gif)



## 安装
--------------------------
`npm i browser-tab-emitter`

or if you use yarn

`yarn add browser-tab-emitter`

## 使用
```js
import BrowserTabEmitter from 'browser-tab-emitter'

const bte = new BrowserTabEmitter({
  prefix: 'bte:'  // 可选，默认以'bte:'开头的key，存储到localStorage里面
})

// 绑定事件
bte.on('bte:input1', (data) => {
  this.input1 = data
})

// 触发事件
bte.emit('bte:input1', this.input1)
```
