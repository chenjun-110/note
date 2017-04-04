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

组件的生命周期：Mounting：已插入真实DOM。Updating：正在被重新渲染。Unmounting：已移出真实DOM。will函数在进入状态之前调用，did函数在进入状态之后调用。
componentWillMount()
componentDidMount()
componentWillUpdate(object nextProps, object nextState)
componentDidUpdate(object prevProps, object prevState)
componentWillUnmount()
componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用
设置样式：style={{opacity: this.state.opacity}} 第一重大括号表示这是JS语法，第二重大括号表示样式对象。

变量用()包裹html。























