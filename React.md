JSX语法：
script标签的type="text/babel"
`<`开头就用HTML规则解析。`{`开头就用js规则解析。

react.js react-dom.js Browser.js是把JSX转js语法的，消耗性能，应在服务器上转。
模板转HTML并插入：ReactDOM.render()
创建组件类实例：`React.createClass({render:function(){}})`,内部HTML标签顶层只允许一个,变量首字母大写，`<A  />`,组件上的属性对应`this.props.属性`,class属性要写成className,for属性要写成htmlFor。tabindex写成tabIndex。
遍历子节点:`React.Children.map()` this.props.children可获取组件标签内所有子节点-如果无子就是udf,有1子则类型是object,有多子则类型是array。
PropTypes属性是用来验证组件实例的属性是否符合要求.
getDefaultProps方法可以用来设置组件属性的默认值.
ref属性值：`this.refs.[refName]` 获取真实DOM元素。只在虚拟DOM插入后生效，一般在onClick回调中使用。
getInitialState方法用于定义初始状态return对象,可用`this.state`获取该对象。`this.setState()`方法就修改状态值且重新渲染组件。
读取文本框的值：event.target.value

设置样式：style=`{{opacity: this.state.opacity}}` 第一重大括号表示这是JS语法，第二重大括号表示样式对象。
变量用()包裹html。

父组件向子组件通信：父组件设置属性，子组件用this.props.x获取。



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
componentWillUpeate:在收到新props/state之前触发,不能修改属性和状态
  render:只能访问this.props和this.state，只有一个顶层组件，不允许修改状态和DOM输出
componentDidUpdate:组件更新后触发，可以修改DOM
销毁阶段：
componentWillUnMount:在删除组件之前进行清理操作，比如计时器和事件监听器。


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


diff算法：先比较节点类型，不同则删除替换树结构，相同则进行匹配。再比较节点属性。该算法不会匹配不同组件类的子树，如果发现两个组件类DOM结构很相似，可以合并组件类。	
key:属性，值在兄弟节点唯一，优化diff算法匹配时间。






