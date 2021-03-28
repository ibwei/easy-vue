import Dep from './watch.js'
export default class Observer {
  constructor(data) {
    this.observe(data)
  }
  observe(data) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key])
      })
    }
  }
  defineReactive(obj, key, value) {
    this.observe(value)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      configurable: false,
      enumerable: true,
      set: (newValue) => {
        this.observe(newValue)
        if (newValue !== value) {
          value = newValue
        }
        // 告诉 Dep 通知变化
        dep.notify()
      },
      get() {
        // 订阅数据变化时，往 Dep 中添加观察者
        Dep.target && dep.addSub(Dep.target)
        return value
      }
    })
  }
}
