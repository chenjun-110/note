```javascript
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})
```

Object.defineProperty只定义value,属性默认不可改、不可删、不可枚举。

```javascript
//nodejs
class Lib extends require('events').EventEmitter {
  constructor () {
    super()
	//在实例化完成以后就立马发送了init事件 其他的微任务也可以实现相同的效果
    // 比如Promise.resolve().then(_ => this.emit('init'))
    process.nextTick(_ => {
      this.emit('init')
    })
  }
}

new RegExp(`[^${source}.$_\\d]`)

fn.apply(null, arguments) 或 ...args => func.apply(this, args)

let i = vm._watchers.length
while (i--) {
    vm._watchers[i].teardown()
}
```

每个文件夹层级都有个`index.js`负责导入导出

`1+''`转字符串 `!!1`转布尔值

`string.charCodeAt(0) === strCode`比较字符相等



Diff算法：新旧节点同层比较，如果第一层不一样那么就不会继续深入比较第二层了。

```javascript
function patch (oldVnode, vnode) {
    // some code
    if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode)
    } else {
        const oEl = oldVnode.el // 当前oldVnode对应的真实元素节点
        let parentEle = api.parentNode(oEl)  // 父元素
        createEle(vnode)  // 根据Vnode生成新元素
        if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // 将新元素添加进父元素
            api.removeChild(parentEle, oldVnode.el)  // 移除以前的旧元素节点
            oldVnode = null
        }
    }
    // some code 
    return vnode
}
function sameVnode (a, b) {
  return (
    a.key === b.key &&  // key值
    a.tag === b.tag &&  // 标签名
    a.isComment === b.isComment &&  // 是否为注释节点
    // 是否都定义了data，data包含一些具体信息，例如onclick , style
    isDef(a.data) === isDef(b.data) &&  
    sameInputType(a, b) // 当标签是<input>的时候，type必须相同
  )
}
function patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode)
        if (oldCh && ch && oldCh !== ch) {
            updateChildren(el, oldCh, ch)
        }else if (ch){
            createEle(vnode) //create el's children dom
        }else if (oldCh){
            api.removeChildren(el)
        }
    }
}
```

