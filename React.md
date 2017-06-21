第三方库：
  兼容IE8：html5shiv兼容h5标签，es5-shim兼容ES5数组方法。es5-sham兼容对象方法。console-polyfill兼容console.*。react-ie8
  事件库：add-dom-event-listener 或 bean 或 自定义PubSubJS
  class库：
    1. classnames
    2. react-css-modules <div styleName="classa"> 这个库可以避免写style.classa的对象名。
  Ajax库： natty-fetch 兼容IE8、兼容jsonp、使用类似jq。
  动画库：
    1. 拖拽缓动动画 react-motion
    2. 加类名进场动画 ReactCSSTransitionGroup 
    3. 动画生命周期库(基础) ReactTransitionGroup 
    4. 非进场动画 rc-animate
    5. 缓动函数：react-smooth
  mixin库：
	1. react-addons-pure-render-mixin
	2. ramda 用compose组合多个高阶组件
  装饰器库：core-decorators
  高阶组件找回对应组件名：recompose 
  pure-render优化：
    1. react-addons-pure-render-mixin  
    2. pure-render-decorator   
    3. react-immutable-render-mixin   用来深比较immutable变化shouldComponentUpdate
  不可变优化：immutable.js / immutable/contrib/cursor
  自动加key:react-addons-create-fragment
  性能分析库：react-addons-perf
  
无法做的事：
  1. 调用Audio/Video的play方法 和 input的focus方法，只能直接操作DOM.
  2. 事件绑定在根节点之外。document
JSX语法：
  1. 标签必须闭合，首字母大写。组件的最终目的是输出虚拟元素，也就是需要被渲染到界面的结构。
  2. 组件库写法：<MUI.xxx label="Default" /> 
  3. 注释写法：
     31. 写在组件子级或同级 `{/* note */}`  
     32. 写在组件标签内 <Nav `/* note */` />
     33. 游览器条件注释： { (!!window.ActiveXObject || 'ActiveXObject' in window) ? <p>IE</p> : '' }
  4. 组件属性：都是标准属性，除了className、htmlFor、tabIndex
```
const Header = ({title, children}) => (
	<h3 title={title}>{children}</h3>
);      //定义组件，<h3>的属性和<Header>的属性区别是，后者的值可以在组件内部随意传递。
<Header title="hello world">{a ? Hello world:<A />}</Header>  //调用组件
```
    41. 简写布尔值：值如为true可不写值 <Checkbox checked />， 值如为false可不写属性。
    42. 属性不写死：<C name={name} /> 等价于 c=<C />; c.props.name=name;
    43. 展开属性：data={name:'foo'}  <C name={data.name} /> 等价于 <C `{...data}` />
    44. 阻止转义字符串：用在html元素上。<div `dangerouslySetInnerHTML`={{__html: 'cc &copy; 2015'}} /> 或者 <div>{['cc ', <span>&copy;</span>, ' 2015']}</div> 或者 用UTF8字符、Unicode编码。
组件：
  1. 无状态组件写法：仅function-return即可，函数名就是组件名。没有实例不占内存、没有this、没有生命周期。(参考上面的Header)
  2. 正常组件写法： React.Component已经取代了React.createClass
```
class InputControlES6 extends Component {
	constructor(props) {
		super(props);
		this.state = {};   //取代getInitialState
		this.handleClick = this.handleClick.bind(this); 
	}   //手动绑定方法的this(性能高)，或者：<div onClick={()=>this.handleClick()}></div>
	handleClick(){}
	render(){return();}

	static propTypes = {} //ES7静态属性，取代propTypes:{}
	static defaultProps = {} //取代getDefaultProps，定义在本组件内不需要父级传入
}
```
  
state：通常放在组件上层，向下流动。
  1. 无状态组件：无状态组件只负责渲染数据，在它的上层创建state组件封装交互逻辑，再通过props传给无状态组件。不会新建实例(refs、findDOMNode失效)
  2. this.state:内部保存基础交互数据，其它数据由它计算出最好。
  3. 子组件状态：style={{ '{{'}}display: 'none' }}状态子组件最好隐藏而非删除。
  4. setState是异步方法，一个周期内的setState会合并。
  5. 设计状态：state多针对组件自身
    51. 智能组件：state在组件内更新。
    52. 木偶组件：state在组件外更新。if ('b' in this.props) 传入state
props:多从父组件传入、或默认。
  1. children:内置prop。`React.Children.map(this.props.children，()=>{})` this.props.children可获取组件标签内所有子节点-如果无子就是udf,有1子则类型是object,有多子则类型是array。
  2. refs:   挂在div上就是dom节点，挂在组件上就是组件实例(可调用实例方法)
    21. `ref={(ref)=>this.a=ref}`  this.a指向实例(如果是组件可以调用子组件方法this.refs.a.x()获取子组件的this.b也就是子根dom节点)
    22. `ref='n'`  Dom=`this.refs.n`指向实例 不推荐但如需组件转节点调用`findDOMNode(Dom)`。
  3. var {checked,...other}=this.props; 这个checked被列出来就不会传递下去，<div {...other} />。如果想传递列出来的属性，就<div {...other} checked={checked} />。
  4. 单纯的<div {...this.props} />会把所有属性传下去。
  5. propTypes属性是用来验证组件实例的属性是否符合要求. propTypes:{len:React.PropTypes.number}

通信技巧：  父组件向下传函数时要绑定this：hanlde={this.handle.bind(this)}
  1. 子组件向父组件传值:子组件用事件触发onChange={this.props.father}调用父组件的函数。
  2. 子组件向父组件传值预处理：把onChange={this.me}把father回调封装在me内。
  3. 孙组件传给爷组件：`孙：onChange={this.props.a}->父：a={this.props.b}->爷：b={this.c.bind(this)}`
  4. 兄弟组件传值：兄->父->弟
  5. 不相关组件传值: 自定义事件，a组件挂载时订阅、卸载时取消。b组件触发自定义事件并传入参数。关系易混乱应从结构上考虑更优解。
  6. 组件外更新：componentWillReceiveProps(nextProps)
  7. 组件内更新：子组件调用父组件回调更新父组件
  8. Context:越级向下传递，组件内定义`getChildContext(){return{color:'red'}}`，后代组件调用`this.context.color` 另外本组件还要定义static childContextTypes={color: PropTypes.string,} 接收组件也要定义static contextTypes = {color: PropTypes.string,}; 动态数据不推荐使用，适合不会更改的全局信息，该方法是不稳定的，转成高阶组件使用。
技巧：
  1. state控制dom的增改：`{this.state.list.map((item) => <div>{item}</div>)}` 推荐用这种方法控制dom而非findDOMNode。
  2. state控制dom属性变化：`<a href={this.state.link}></a>`
  3. state控制class变化：`<a className={classnames({'hide': !this.state.show,})}></a>`
  4. state控制css变化：`style={{background: this.state.background ? 'red' :'block'}}`
  5. {...ref}:把ref对象提出来可以加条件判断是否赋值。比直接写在组件上灵活。
  6. 动态渲染子组件：render(){List=this.state.List return(<div>{List.map(e,i)=><A key={i} p={e} />}</div>)} 先用事件监听触发ajax,返回数据传给setState，再map遍历state渲染。
  7. 1个事件函数处理2个表单：onChange={this.handleChange.bind(this, 'name') -> this.setState({[name]: value,}); 利用对象表达式的特性、传参进去。
组件抽象：
  1. 划分合理(界面抽象):如果组件内的界面能拆分组装成别的界面，应该拆分。
  2. 逻辑抽象:把state、事件回调、生命周期函数，都放在高阶组件内定义。向下传进被包裹的组件props。
生命周期：
  1. 更新state:shouldComponentUpdate->componentWillUpdate->render->componentDidUpdate。
  2. 更新props:componentWillReceiveProps->同上。
ReactDOM:
  1. findDOMNode:多用于componentDid-Mount/Update内部。ReactDOM.findDOMNode(this)获取当前组件dom实例。
  2. unmountComponentAtNode:卸载
  3. render:3参为渲染后的回调函数。
  4. unstable_renderSubtreeIntoContainer：更新组件到任何dom上。
  5. unstable_batchedUpdates
React事件：
  1. 原生事件对象：nativeEvent。阻止默认preventDefault。
  2. 阻止冒泡：
    21. stopPropagation只能阻止React事件冒泡。
    22. 原生事件阻止冒泡：判断`e.target.matches`退出回调。原生的阻止冒泡可以阻止React冒泡。
  3. 合成事件统一由最外层代理监听。
  4. 绑定this写法：
    41. 传参：onClick={this.handleClick.bind(this, 'test')} 
    42. 不传参：onClick={::this.handleClick}  (stage0草案)
    43. 如果函数是以箭头定义的或手动绑定在constructor内：onClick={this.handleClick} 推荐！
  5. 绑定原生事件：addEventListener必须配合removeEventListener消除引用。写在div内或dom0级绑定都可以。
  6. 没有捕获阶段。
表单：
  1. 读取文本框的值：e.target.value，值通过v={this.state.v}设置(注意textarea元素也是如此！)
  2. 多选select：multiple={true} value={[ov1,ov2]} 数组形式表示多选
  3. 受控组件：推荐。state决定默认值->onChange双向绑定setState组件。好处是取值放值之间可以做特殊处理。(注意：单选复选的`checked={}`、下拉的`value={}`都是用来双向绑定渲染选中项的。)
  4. 不受控组件：数据被写死、配合dom操作。defaultChecked、defaultValue=""默认值。state并不能改变value。
CSS:
  1. style=`{{opacity: this.state.opacity}}` 第一重大括号表示这是JS语法，第二重大括号表示样式对象。
  2. 前缀大写WebkitTransition会转换成-webkit-transition。仅ms小写。
  3. 不用写px单位。
  4. CSS-Modules：需要css-loader。sass仅解决css编程能力，没有解决模块化。Shadow DOM可以但外部无法重写过于局部化。仅对类名生效。
    41. 配置webpack：css?modules&localIdentName=[name]__[local]-[hash:base64:5] 表示css文件名--类名-hash名。在组件内import该css。
    42. 写法：
      1. composes继承语法：`.p{composes:base}`拿到.base的类。`.p{composes:$base from './a.css'}`拿到外部css文件的.base类。 非合并类，是2个类名在一个变量中。 和预处理器不兼容。
      
      3. :export语法：`:export{A:a}` 把css的a属性赋值给A变量并输出到js文件的style.A。(css和css变量共享用postcss-loader)
      4. :global语法：默认局部模式，如需全局样式就这么定义类`:global(.btn{ } .box{ })` 坑！不加圆括号！游览器会显示括号！
    43. 用法：默认局部`className={style.title}` style为导入名。全局模式：`className="title"`
    44. 技巧：
      1. 类命名：模块名-节点名--状态名。不层叠class，只用单个class。用composes复用类。
      2. 覆盖样式：因为class名无法预知，所以把覆盖类写进组件属性。`[date-role="btn"]{}` date-role="btn"
      3. react-css-modules库： <div className="a" `styleName="b"`>  export default `库名(组件名，样式对象名)`； 可不写样式对象名。className可看作全局类，styleName可看作局部类。
        1. 用法：@CSSModules(styles, { allowMultiple: true }) 可写多个类名,问题：不会配置transform-decorators-legacy ? 只能`export default CSSModules(TodoList,styles,{allowMultiple: true})`
公用方法：
  1. mixin:官方库里不允许同名方法覆盖。可合并生命周期、state、方法。仅适合createClass
  2. @mixin:import { mixin } from 'core-decorators'; @mixin(PureRender, Theme) 允许同名方法。缺点是难维护。
  3. 高阶组件：接收一个组件，返回另一个组件。
    31. 属性代理：把组件传入函数，返回加工过的组件：控制props、重写refs、把组件的函数抽象到高阶上。
    32. 反向继承：条件渲染、劫持渲染。避免增加state。
    33. 找回原组件名：设置static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
    34. 往常开发维护时不断增加props应对需求。
    35. 适合抽象与组件主体功能无关的。
性能优化：
  1. 纯函数：
    1. 输入输出确定：内部行为依赖传参Math.random/不改变原数组splice/不随时间变化Date。
    2. 无副作用：不改变外部对象或数组。
    3. 无状态依赖：不使用共享变量，状态只在方法的生命周期内存活。
  2. Pure Render：引入react-addons-pure-render-mixin库，然后组件constructor内定义`this.shouldComponentUpdate = raprm.shouldComponentUpdate.bind(this)`, 自动判断props一致就不更新。
    1. 调用组件会创建新组件：`style={this.props.style||{}}` 代替 style={{color:'red'}} 更新时新对象引用不等于原来。
    2. 事件this绑定：在构造器内，非组件上。
    3. PureRender适合浅比较，Immutable适合深比较。如果this.state.a的值是个对象，就用Immutable。
  3. Immutable.js：Map就是对象，List就是数组，ArraySet是不重复数组。
    1. 数据很安全，改变的数据新建，没改变的结构引用。
    2. react-redux的connect优化了shouldComponentUpdate，不需要它。
    3. 用于组件，只渲染变化节点的祖先节点，不渲染子节点。
    4. 不用为了不污染原state而新建一个变量了。
    5. 使用技巧：
      1. props要转。
      2. 提交到store的state要转。
      3. action发送的数据要转。
      4. action提交给reducer的数据要转。
      5. reducer处理后的state要转。
      6. 仅发送给服务器的数据用toJS(),响应的也要转。
  4. key:
    1. 适合动态子组件
    2. key值不能是随机值，可以把key值保存在state。
    3. 值在兄弟节点唯一，优化diff算法匹配时间。key应该添加在组件上，而非具体html上。
    4. 自动加key库：react-addons-create-fragment
  5. 性能分析库：react-addons-perf
动画：
  1. 库：React Transition是js动画，React CSS Transition是C3动画。
  2. 原理：让状态延迟变化。动画如持续500ms,就setState的回调延迟执行setState。 
  3. 体验：spring > ease > linear














script标签的type="text/babel"
`<`开头就用HTML规则解析。`{`开头就用js规则解析。
react.js react-dom.js Browser.js是把JSX转js语法的，消耗性能，应在服务器上转。
模板转HTML并插入：ReactDOM.render()
render:仅仅是子组件的快照。 
如果渲染数组的索引是纯数字(哈希值)，有可能导致乱序，需要给索引加字符串前缀items['result-' + result.id] = <li>{result.text}</li>; 
变量用()包裹html。

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
Mounting：已插入真实DOM。Updating：正在被重新渲染。Unmounting：已移出真实DOM。
will函数在进入状态之前调用，did函数在进入状态之后调用。
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
componentWillReceiveProps:父组件修改属性触发，可以修改新属性，修改setState。
shouldComponentUpdate:返回false会阻止render调用,提高性能.判断待更新的props和state。
componentWillUpeate:组件更新前触发，在收到新props/state之前触发,不能修改属性和状态
  render:只能访问this.props和this.state，只有一个顶层组件，不允许修改状态和DOM输出
componentDidUpdate:组件更新后触发，可以修改DOM
销毁阶段：
componentWillUnMount:在删除组件之前进行清理操作，比如计时器和事件监听器。

方法：
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




**React-router**:
<Route path={`${match.url}/:topicId`} component={Topic}/> 注意这是``符，no引号。{}符，no括号。
Link:to决定url，replace仅替换不存历史 activeStyle或activeClassName活跃状态的链接样式
Route:当path匹配时，显示component。把Route放在Route内部，配合{this.props.children}，子组件只和子组件切换，父导航不消失。
  path="/a/:b/:c" 冒号是参数，关联Link的to,取值用{this.props.params.b/c}，参数路由一般写在底部，因为可能规则和静态相似就覆盖掉了。{this.props.location.query.bar}可取url键值对。
  {this.props.children}关联component,放在父组件内，Route放在父Route内。可实现不消失的全局导航。
  进入路由触发onEnter属性，离开触发onLeave。
区别：Route负责定义显示什么，Link定义去向哪里。
<IndexRoute component={Home}/>：n个子路由中的默认路由，随主组件一同出现。关联to="/"
IndexLink：解决索引路由总是处在活跃的问题(或Link使用属性onlyActiveOnIndex={true})。
Router:history={hashHistory}。用{browserHistory}可以得到干净的url,但刷新会访问不到，需要配置服务器：package.json修改`"start": "webpack-dev-server --inline --content-base . --history-api-fallback"`,然后把css/js路径改为绝对路径。
  routes={a},可以把Route写在a变量里。
Redirect：从url自动跳转到另一url.
表单跳转：
  handleSubmit(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value
    const path = `/repos/${userName}/${repo}`
    browserHistory.push(path)
  },

**Redux**:
数据容器：const store = createStore(reducer);
获取数据快照：const state = store.getState(); 一快照对应一视图
创建消息：function add(t){return {type:'ADD_TODO',payload：t}}   const action=add('message');  一种消息对应一Action。用户通过View影响State。
发送消息：store.dispatch({type:'ADD_TODO',payload:'message'})等价于store.dispatch(add('message'));   接收一个Action对象参数
修改快照：reducer函数接收state参数和action参数，返回新state。创建容器时传入，自动返回快照。
监听快照：store.subscribe(fuc) 快照改变则触发fuc,所以fuc是修改View的函数(render/setState) 解除监听是调用它的返回值。
解耦reducer:combineReducers({}) 合并多个reducer
中间件：原理给dispatch添加功能。createStore(reducer,state,applyMiddleware(fuc))
**react-redux**
生成容器组件：input把state变成ui上的props,output把交互变成action。
  const Rongqi=connect(input,output)(Ui)
Provider组件：组件放在它内部可以拿到state。
**immutable**
js转Immutable：fromJs(obj/arr) 按参数返回Map、List
Immutable转js：List/Map.toJSON()浅转换 toJS()深转换
  Map转为对象：deep.toObject()
  List转为数组：deep.toArray()
转为json:json,stringfy(deep)
取值: 嵌套用In
  1. map.get(key) 键通常为字符串
  2. map.getIn(arr) 参数["a","b"]取的是a的子b的值
添/改值： 不会修改原Map!
  1. map.set(k,v) 索引，值
  2. map.setIn(k,v)
改值：
  1. map.update(k,f) 索引，回调
  2. map.updateIn(k,f)
删除：deleteIn()
比较：is(map1, map2) 全等/Object.is对Map无效
遍历：map1.map((v,k)=>{})
合并：
  1. map1.mergeDeep(map2) 深合并，相同属性名会递归搜索内部，永远只覆盖不同值。
  2. map1.mergeDeepWith(f，map2) f为回调，把2个map的相同键运算后返回
  3. map1.merge(map2) 浅合并，后者覆盖前者
创建不变：Seq(obj) seq类型适合遍历
插入：insert(k,v) 
清空：clear()
push：list1.push(3,4,5) 不会修改原List！
.unshift(0).concat(list2,list3);
**react-addons-perf**
**react-addons-css-transition-group**
类名：前缀+ `-leave -leave-active` `-enter -enter-active` ` -appear -appear-active` 作用在该组件的子组件们
transitionName: "string"类前缀。 {{object}}自定义类名。
transitionEnterTimeout/transitionLeaveTimeout:进场类、出场类持续时间 (值为true则不加类)(作用在子组件)
transitionAppear={true} 动画组件初始化时给子组件加类
transitionAppearTimeout 初始化类的存在时间
注意：动画组件本身不能动态生成，子组件可以。它必须添加在已出现的dom上、或者transitionAppear={ture}的组件上。
**react-addons-transition-group**
component="ul" 渲染ul组件 component={a} 渲染a变量代表的组件
问题：
  1. extends继承组件与JSX嵌套有什么区别？
  2. react的<select value={v}>和原生select.value有什么区别？类似的还有<input checked={!true}>
  3. 无法获取style对象：因为webpack的css-modules格式不对。
  4. 静态属性babel配置？
**react-motion**
```
<Motion defaultStyle={{x: 0}} style={{x: spring(10, {stiffness: 120, damping: 17})}}>
    {({x})=><div style={{ transform: `translate3d(${x}px, 0, 0)`}}>123</div>}
</Motion> ```





![](http://i.imgur.com/yrrNGZi.png)
周期参数：
componentDidUpdate(prevProps)



