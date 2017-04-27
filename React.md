兼容IE8：html5shiv兼容h5标签，es5-shim兼容ES5数组方法。es5-sham兼容对象方法。console-polyfill兼容console.*。
JSX语法：
首字母大、小写来区分本地组件的类和 HTML 标签。
script标签的type="text/babel"
`<`开头就用HTML规则解析。`{`开头就用js规则解析。
class属性要写成`className`,for属性要写成`htmlFor`。tabindex写成`tabIndex`。
注释：在子节点内部`{/* */}`
react.js react-dom.js Browser.js是把JSX转js语法的，消耗性能，应在服务器上转。
模板转HTML并插入：ReactDOM.render()
创建组件类实例：`React.createClass({render:function(){}})`,内部HTML标签顶层只允许一个,变量首字母大写,组件上的属性对应`this.props.属性`,
render:仅仅是子组件的快照。
遍历:`React.Children.map()` this.props.children可获取组件标签内所有子节点-如果无子就是udf,有1子则类型是object,有多子则类型是array。 如果渲染数组的索引是纯数字(哈希值)，有可能导致乱序，需要给索引加字符串前缀items['result-' + result.id] = <li>{result.text}</li>; 

ref：ref='refName' 
  `this.refs.refName.getDOMNode()` 获取真实DOM元素。只在虚拟DOM插入后生效，一般在onClick回调中使用。
  `React.findDOMNode(this.refs.refName)`同效。
  ref={function(c){React.findDOMNode(c).focus();}} ref值为回调函数。

设置样式：style=`{{opacity: this.state.opacity}}` 第一重大括号表示这是JS语法，第二重大括号表示样式对象。
变量用()包裹html。
表单或<textarea>的值通过value设置。要么不写，写不能写死，要用onChange监听state
  读取文本框的值：event.target.value


**props**
propTypes属性是用来验证组件实例的属性是否符合要求. propTypes:{len:React.PropTypes.number}
父组件向子组件通信：父组件设置属性，子组件用this.props.x获取。
展开属性：
  `<A {...obj} />` 把obj的属性和值都传到组件上.
  var {checked,...other}=this.props; 这个checked被列出来就不会传递下去，<div {...other} />。如果想传递列出来的属性，就<div {...other} checked={checked} />。
  单纯的<div {...this.props} />会把所有属性传下去。
HTML插入JSX：`<div dangerouslySetInnerHTML={{'{{'}}__html: 'First &middot; Second'}} />`
**state**：通常放在组件上层，向下流动。
无状态组件：无状态组件只负责渲染数据，在它的上层创建state组件封装交互逻辑，再通过props传给无状态组件。
this.state:内部保存基础交互数据，其它数据由它计算出最好。
子组件状态：style={{ '{{'}}display: 'none' }}状态子组件最好隐藏而非删除。

mixin:组件和组件间需要共享某种功能。如果引入了多个mixin，会按引入顺序执行，最后执行组件内方法。
```
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() { 
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() { //这样组件就不用重复设置该周期了。除非有额外功能。
    this.intervals.map(clearInterval);
  }
};
在组件类中设置 mixins: [SetIntervalMixin], 即可引用。组件内凡是调用了this.setInterval都会被push到数组内且组件被删除会清除定时器(共享功能)。
```

组件的生命周期：
Mounting：已插入真实DOM。Updating：正在被重新渲染。Unmounting：已移出真实DOM。will函数在进入状态之前调用，did函数在进入状态之后调用。
componentWillMount() 
componentDidMount()
componentWillUpdate(object nextProps, object nextState)
componentDidUpdate(object prevProps, object prevState)
componentWillUnmount()
componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

初始化阶段
getDefaultPropos：只调用一次，实力之间共享引用
getInitialState：初始化每个实例特有的状态
handleChange:事件，内部修改this.setState(),组件直接设置onChange={this.handleChange} 
componentWillMount：render之前最后一次修改状态的机会
  render：只能访问this.props和this.state，只有一个顶层组件，不允许修改状态和DOM输出
componentDidMount：成功render并渲染完成真实DOM后触发，可以修改DOM
运行中阶段
componentWillReceiveProps:父组件修改属性触发，可以修改新属性，修改状态
shouldComponentUpdate:返回false会阻止render调用,提高性能
componentWillUpeate:组件更新前触发，在收到新props/state之前触发,不能修改属性和状态
  render:只能访问this.props和this.state，只有一个顶层组件，不允许修改状态和DOM输出
componentDidUpdate:组件更新后触发，可以修改DOM
销毁阶段：
componentWillUnMount:在删除组件之前进行清理操作，比如计时器和事件监听器。

getDefaultProps方法可以用来设置组件属性的默认值。如果父级没传入props，它就声明默认值。
getInitialState方法用于定义初始状态return对象,可用`this.state`获取该对象。`this.setState()`方法就修改状态值且重新渲染组件。
forceUpdate:适合嵌套极深的组件改变state时，而不是从先祖流下。
shouldComponentUpdate: function(nextProps, nextState) {
  return this.props.value !== nextProps.value;
}
支持的标签：
```
a abbr address area article aside audio b base bdi bdo big blockquote body br
button canvas caption cite code col colgroup data datalist dd del details dfn
dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5
h6 head header hr html i iframe img input ins kbd keygen label legend li link
main map mark menu menuitem meta meter nav noscript object ol optgroup option
output p param picture pre progress q rp rt ruby s samp script section select
small source span strong style sub summary sup table tbody td textarea tfoot th
thead time title tr track u ul var video wbr
```
支持的属性：另外还支持SVG标签和属性。
```
accept acceptCharset accessKey action allowFullScreen allowTransparency alt
async autoComplete autoPlay cellPadding cellSpacing charSet checked classID
className cols colSpan content contentEditable contextMenu controls coords
crossOrigin data dateTime defer dir disabled download draggable encType form
formAction formEncType formMethod formNoValidate formTarget frameBorder height
hidden href hrefLang htmlFor httpEquiv icon id label lang list loop manifest
marginHeight marginWidth max maxLength media mediaGroup method min multiple
muted name noValidate open pattern placeholder poster preload radioGroup
readOnly rel required role rows rowSpan sandbox scope scrolling seamless
selected shape size sizes span spellCheck src srcDoc srcSet start step style
tabIndex target title type useMap value width wmode
```
propTypes验证：
```
基础类型：React.PropTypes.array/bool/func/number/object/string
React.PropTypes-
.node 字符串/DOM元素或包含这些类型的数组。
.element //React元素
.instanceOf(Message) 实例
.oneOf(['a', 'b']) 指定值a/b
.arrayOf(React.PropTypes.number) 数字组成的数组
.objectOf(React.PropTypes.number) 数字属性组成的对象
.shape({color: React.PropTypes.string}) 特定参数的对象
.any.isRequired 所有类型不能为空
.oneOfType([React.PropTypes.string,React.PropTypes.number]) 数组或字符串组成的对象
prop_a: function(props, propName, componentName) { //自定义验证
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }
```

diff算法：先比较节点类型，不同则删除替换树结构，相同则进行匹配。再比较节点属性。该算法不会匹配不同组件类的子树，如果发现两个组件类DOM结构很相似，可以合并组件类。	
key:属性，值在兄弟节点唯一，优化diff算法匹配时间。key应该添加在组件上，而非具体html上。



React-router:
<Route path={`${match.url}/:topicId`} component={Topic}/> 注意这是``符，no引号。{}符，no括号。
Link:to决定url，replace仅替换不存历史 activeStyle或activeClassName活跃状态的链接样式
Route:当path匹配时，显示component。把Route放在Route内部，配合{this.props.children}，子组件只和子组件切换，父导航不消失。
区别：Route负责定义显示什么，Link定义去向哪里。
