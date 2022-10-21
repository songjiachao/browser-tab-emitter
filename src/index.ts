
export interface BEOptions {
  prefix?: string
}

const defaultBEOptions:BEOptions = {
  prefix: 'bte:'
}

export class BrowserTabEmitter {
  eventsMap: Map<string, Function> = new Map()
  options: BEOptions

  constructor(options: BEOptions) {
    this.options = Object.assign({}, defaultBEOptions, options)
    this.init()
  }

  init() {
    window.onstorage = (e) => {
      let id = e.key
      if (id && this.eventsMap.has(id)) {
        const data = JSON.parse(e.newValue!);
        const callback = this.eventsMap.get(id)
        if (typeof callback === 'function') {
          callback(data.value)
        } else {
          console.warn('BrowserTabEmitter: The key ' + id + ' do not have an callback function')
        }
      }
    };
  }

  on(id: string, callback: Function) {
    this.eventsMap.set(id, callback)
  }

  emit(id: string, value: any) {
    // 直接写入数据
    if (id.substring(0, 3) === this.options.prefix) {
      window.localStorage.setItem(id, JSON.stringify({
        // 必须加一个时间戳，storage事件只有在值真正改变时才会触发
        key: +new Date(),
        value
      }))
    }
  }
}

(window as any).BrowserTabEmitter = BrowserTabEmitter