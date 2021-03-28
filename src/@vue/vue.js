import Compile from './compile.js'

export default class EasyVue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    this.$options = options
    if (this.$el) {
      // 1.实现一个数据观察者
      // 2.实现一个指令解析器
      new Compile(this.$el, this)
    }
  }
}
