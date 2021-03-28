import { compileUtil } from './compile.js'
/**
 * @description 判断新值和旧值有没有变化，有的话，就调用 callback
 */
export class Watcher {
  constructor(vm, dataKey, cb) {
    this.vm = vm
    this.dataKey = dataKey
    this.cb = cb
    this.oldValue = this.getOldValue()
  }

  getOldValue() {
    Dep.target = this
    const oldValue = compileUtil.getVal(this.vm, this.dataKey)
    console.log('被观察了', oldValue)
    Dep.target = null
    return oldValue
  }

  update() {
    const newVal = compileUtil.getVal(this.vm, this.dataKey)
    if (newVal !== this.oldValue) {
      this.cb(newVal)
    }
  }
}

export default class Dep {
  constructor() {
    this.subs = [] // 依赖数组
  }

  // 添加 watch
  addSub(watcher) {
    console.log('添加了观察者', this.subs)
    this.subs.push(watcher)
  }

  notify() {
    console.log('通知了观察者', this.subs)
    this.subs.forEach((w) => w.update())
  }

  removeSub() {}
}
