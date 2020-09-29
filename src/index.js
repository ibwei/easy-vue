export function render(vnode, container) {
  // vue2 渲染页面的方法叫 patch
  // 1.初次渲染 2.dom-diff
  patch(null, vnode, container)
}

/**
 * @param n1 旧的虚拟节点
 * @param n2 新的虚拟节点
 */

function patch(n1, n2, container) {
  //后续 diff 是可以执行此方法
  // 组件的虚拟节点,tag 是一个对象
  // 如果是组件,tag 可能是一个对象
  if (typeof n2.tag === 'string') {
    mountElement(n2, container)
  } else if (typeof n2.tag === 'object') {
    // 组件渲染
  }
}

function mountElement(vnode, container) {}
