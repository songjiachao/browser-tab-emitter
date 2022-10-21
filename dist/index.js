var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BrowserTabEmitter: () => BrowserTabEmitter
});
module.exports = __toCommonJS(src_exports);
var defaultBEOptions = {
  prefix: "bte:"
};
var BrowserTabEmitter = class {
  constructor(options) {
    this.eventsMap = /* @__PURE__ */ new Map();
    this.options = Object.assign({}, defaultBEOptions, options);
    this.init();
  }
  init() {
    window.onstorage = (e) => {
      let id = e.key;
      if (id && this.eventsMap.has(id)) {
        const data = JSON.parse(e.newValue);
        const callback = this.eventsMap.get(id);
        if (typeof callback === "function") {
          callback(data.value);
        } else {
          console.warn("BrowserTabEmitter: The key " + id + " do not have an callback function");
        }
      }
    };
  }
  on(id, callback) {
    this.eventsMap.set(id, callback);
  }
  emit(id, value) {
    if (id.substring(0, 3) === this.options.prefix) {
      window.localStorage.setItem(id, JSON.stringify({
        key: +new Date(),
        value
      }));
    }
  }
};
window.BrowserTabEmitter = BrowserTabEmitter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BrowserTabEmitter
});
