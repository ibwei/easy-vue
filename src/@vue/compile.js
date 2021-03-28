// 一个更新 dom 的工具对象
const compileUtil = {
  // 通过 key 从 data 里面取值出来
  getVal(vm, dataKey) {
    return dataKey.split('.').reduce((data, currentVal) => {
      return data[currentVal]
    }, vm.$data)
  },
  // 更新 v-text 或者 text 结点里面的变量
  text(node, dataKey, vm) {
    let value
    if (dataKey.indexOf('{{') !== -1) {
      // 替换{{taget.name}} 这部分内容
      value = dataKey.replace(/\{\{(.+?)\}\}/g, (...args) => {
        // console.log('target', args[1])
        return this.getVal(vm, args[1])
      })
      console.log('value=', value)
    } else {
      value = this.getVal(vm, dataKey)
    }
    this.updater.textUpdater(node, value)
  },
  // 更新 v-html
  html(node, dataKey, vm) {
    let value = this.getVal(vm, dataKey)
    this.updater.htmlUpdater(node, value)
  },
  // 更新 v-model
  model(node, dataKey, vm) {
    const value = this.getVal(vm, dataKey)
    this.updater.modelUpdater(node, value)
    /* node.addEventListenner('input', (e) => {
      vm.$data[dataKey] = e.target.value
    }) */
  },
  on(node, dataKey, vm, eventName) {
    const fn = vm.$options.methods && vm.$options.methods[dataKey]
    // console.log(fn)
    node.addEventListener(eventName, fn.bind(vm), false)
  },
  // v-bind
  bind() {},
  updater: {
    textUpdater(node, value) {
      node.textContent = value
    },
    htmlUpdater(node, value) {
      node.innerHTML = value
    },
    modelUpdater(node, value) {
      node.value = value
    }
  }
}

export default class Complile {
  constructor(el, vm) {
    // 处理渲染的根节点
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    const fragment = this.node2Fragment(this.el)
    this.compile(fragment)
    this.el.appendChild(fragment)
  }

  // 把所有的孩子结点放进 fragment ，减少回流
  node2Fragment(rootNode) {
    const container = document.createDocumentFragment()
    let firstChild
    while ((firstChild = rootNode.firstChild)) {
      container.appendChild(firstChild)
    }
    return container
  }

  // 判断是否是 dom 结点
  isElementNode(node) {
    return node?.nodeType === 1
  }

  // 编译结点
  compile(fragment) {
    const childNodes = fragment.childNodes
    Array.from(childNodes).forEach((child) => {
      if (this.isElementNode(child)) {
        this.compileElement(child) // 编译结点
      } else {
        this.compileText(child) // 编译文本
      }
      if (child.childNodes && child.childNodes.length) {
        this.compile(child)
      }
    })
  }

  // 是否是监听事件
  isEventName(attrName) {
    return attrName.startsWith('@')
  }

  // 真正编译元素结点
  compileElement(node) {
    const attributes = node.attributes
    Array.from(attributes).forEach((attr) => {
      const { name, value } = attr
      // 编译指令
      if (this.isDirective(name)) {
        const [, directive] = name.split('-')
        const [directiveName, eventName] = directive.split(':')
        compileUtil[directiveName](node, value, this.vm, eventName)
        node.removeAttribute(name)
      } else if (this.isEventName(name)) {
        const [, eventName] = name.split('@')
        compileUtil['on'](node, value, this.vm, eventName)
        node.removeAttribute(name)
      }
    })
  }

  // 真正编译文本结点
  compileText(textNode) {
    const t = textNode.textContent
    if (/\{\{(.+?)\}\}/g.test(t)) {
      // 有变量的才需要编译
      compileUtil.text(textNode, t, this.vm)
    }
  }

  isDirective(name) {
    return name.startsWith('v-')
  }
}
