(() => {
  // src/index.ts
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
      this.eventsMap.set(this.options.prefix + id, callback);
    }
    emit(id, value) {
      window.localStorage.setItem(this.options.prefix + id, JSON.stringify({
        key: +new Date(),
        value
      }));
    }
  };
  window.BrowserTabEmitter = BrowserTabEmitter;
})();
