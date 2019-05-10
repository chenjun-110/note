##### 第三方库

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
        异步库：redux-sage 用生成器发action
        调试：Redux DevTools
        webpack:无用代码移除：UglifyJS  搜索所有文件替换字符：DefinePlugin
        撤销、重置reducer库：redux-undo
        表单库：redux-form-utils

##### 无法做的事

    1. 调用Audio/Video的play方法 和 input的focus方法，只能直接操作DOM.
    2. 事件绑定在根节点之外。document

##### JSX语法

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
##### 组件

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
        1. 智能组件：state在组件内更新。
        2. 木偶组件：state在组件外更新。if ('b' in this.props) 传入state

        props:多从父组件传入、或默认。
  6. children:内置prop。`React.Children.map(this.props.children，()=>{})` this.props.children可获取组件标签内所有子节点-如果无子就是udf,有1子则类型是object,有多子则类型是array。
  7. refs:   挂在div上就是dom节点，挂在组件上就是组件实例(可调用实例方法)
        21. `ref={(ref)=>this.a=ref}`  this.a指向实例(如果是组件可以调用子组件方法this.refs.a.x()获取子组件的this.b也就是子根dom节点)
            22. `ref='n'`  Dom=`this.refs.n`指向实例 不推荐但如需组件转节点调用`findDOMNode(Dom)`。
  8. var {checked,...other}=this.props; 这个checked被列出来就不会传递下去，<div {...other} />。如果想传递列出来的属性，就<div {...other} checked={checked} />。
  9. 单纯的<div {...this.props} />会把所有属性传下去。
  10. propTypes属性是用来验证组件实例的属性是否符合要求. propTypes:{len:React.PropTypes.number}

##### 通信技巧

父组件向下传函数时要绑定this：hanlde={this.handle.bind(this)}

    1. 子组件向父组件传值:子组件用事件触发onChange={this.props.father}调用父组件的函数。
    2. 子组件向父组件传值预处理：把onChange={this.me}把father回调封装在me内。
    3. 孙组件传给爷组件：`孙：onChange={this.props.a}->父：a={this.props.b}->爷：b={this.c.bind(this)}`
    4. 兄弟组件传值：兄->父->弟
    5. 不相关组件传值: 自定义事件，a组件挂载时订阅、卸载时取消。b组件触发自定义事件并传入参数。关系易混乱应从结构上考虑更优解。
    6. 组件外更新：componentWillReceiveProps(nextProps)
    7. 组件内更新：子组件调用父组件回调更新父组件
    8. Context:越级向下传递，组件内定义`getChildContext(){return{color:'red'}}`，后代组件调用`this.context.color` 另外本组件还要定义static childContextTypes={color: PropTypes.string,} 接收组件也要定义static contextTypes = {color: PropTypes.string,}; 动态数据不推荐使用，适合不会更改的全局信息，该方法是不稳定的，转成高阶组件使用。
  技巧：
    9. state控制dom的增改：`{this.state.list.map((item) => <div>{item}</div>)}` 推荐用这种方法控制dom而非findDOMNode。
    10. state控制dom属性变化：`<a href={this.state.link}></a>`
    11. state控制class变化：`<a className={classnames({'hide': !this.state.show,})}></a>`
    12. state控制css变化：`style={{background: this.state.background ? 'red' :'block'}}`
    13. {...ref}:把ref对象提出来可以加条件判断是否赋值。比直接写在组件上灵活。
    14. 动态渲染子组件：render(){List=this.state.List return(<div>{List.map(e,i)=><A key={i} p={e} />}</div>)} 先用事件监听触发ajax,返回数据传给setState，再map遍历state渲染。
    15. 1个事件函数处理2个表单：onChange={this.handleChange.bind(this, 'name') -> this.setState({[name]: value,}); 利用对象表达式的特性、传参进去。
   组件抽象：
    16. 划分合理(界面抽象):如果组件内的界面能拆分组装成别的界面，应该拆分。
    17. 逻辑抽象:把state、事件回调、生命周期函数，都放在高阶组件内定义。向下传进被包裹的组件props。
    18. 数据组件：获取fetch数据的组件，拿到的数据作props传下去。 业务组件：list.map遍历数据并展示。
   组件结构：
    19. Layouts-布局组件：页面的基本结构，设置在最外层Route内。
    20. Views-子路由入口组件：定义数据和action分发入子组件。
    21. Components-末级渲染组件：数据皆从天来。
   生命周期：
    22. 更新state:shouldComponentUpdate->componentWillUpdate->render->componentDidUpdate。
    23. 更新props:componentWillReceiveProps->同上。
   ReactDOM:
    24. findDOMNode:多用于componentDid-Mount/Update内部。ReactDOM.findDOMNode(this)获取当前组件dom实例。
    25. unmountComponentAtNode:卸载
    26. render:3参为渲染后的回调函数。
    27. unstable_renderSubtreeIntoContainer：更新组件到任何dom上。
    28. unstable_batchedUpdates
   React事件：
    29. 原生事件对象：nativeEvent。阻止默认preventDefault。
    30. 阻止冒泡：
         21. stopPropagation只能阻止React事件冒泡。
             22. 原生事件阻止冒泡：判断`e.target.matches`退出回调。原生的阻止冒泡可以阻止React冒泡。
    31. 合成事件统一由最外层代理监听。
    32. 绑定this写法：
         41. 传参：onClick={this.handleClick.bind(this, 'test')} 
             42. 不传参：onClick={::this.handleClick}  (stage0草案)
             43. 如果函数是以箭头定义的或手动绑定在constructor内：onClick={this.handleClick} 推荐！
    33. 绑定原生事件：addEventListener必须配合removeEventListener消除引用。写在div内或dom0级绑定都可以。
    34. 没有捕获阶段。
   表单：
    35. 读取文本框的值：e.target.value，值通过v={this.state.v}设置(注意textarea元素也是如此！)
    36. 多选select：multiple={true} value={[ov1,ov2]} 数组形式表示多选
    37. 受控组件：推荐。state决定默认值->onChange双向绑定setState组件。好处是取值放值之间可以做特殊处理。(注意：单选复选的`checked={}`、下拉的`value={}`都是用来双向绑定渲染选中项的。)
    38. 不受控组件：数据被写死、配合dom操作。defaultChecked、defaultValue=""默认值。state并不能改变value。
   CSS:
    39. style=`{{opacity: this.state.opacity}}` 第一重大括号表示这是JS语法，第二重大括号表示样式对象。
    40. 前缀大写WebkitTransition会转换成-webkit-transition。仅ms小写。
    41. 不用写px单位。
    42. CSS-Modules：需要css-loader。sass仅解决css编程能力，没有解决模块化。Shadow DOM可以但外部无法重写过于局部化。仅对类名生效。
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
    43. mixin:官方库里不允许同名方法覆盖。可合并生命周期、state、方法。仅适合createClass
    44. @mixin:import { mixin } from 'core-decorators'; @mixin(PureRender, Theme) 允许同名方法。缺点是难维护。
    45. 高阶组件：接收一个组件，返回另一个组件。
         31. 属性代理：把组件传入函数，返回加工过的组件：控制props、重写refs、把组件的函数抽象到高阶上。
             32. 反向继承：条件渲染、劫持渲染。避免增加state。
             33. 找回原组件名：设置static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
             34. 往常开发维护时不断增加props应对需求。
             35. 适合抽象与组件主体功能无关的。
    46. 容器组件：类似高阶组件，适合合并功能。

##### 性能优化

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

            ​    1. props要转。
            ​    2. 提交到store的state要转。
            ​    3. action发送的数据要转。
            ​    4. action提交给reducer的数据要转。
            ​    5. reducer处理后的state要转。
            ​    6. 仅发送给服务器的数据用toJS(),响应的也要转。
  4. key:
        1. 适合动态子组件
        2. key值不能是随机值，可以把key值保存在state。
        3. 值在兄弟节点唯一，优化diff算法匹配时间。key应该添加在组件上，而非具体html上。
        4. 自动加key库：react-addons-create-fragment
  5. 性能分析库：react-addons-perf

    动画：
  6. 库：React Transition是js动画，React CSS Transition是C3动画。
  7. 原理：让状态延迟变化。动画如持续500ms,就setState的回调延迟执行setState。 
  8. 体验：spring > ease > linear

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

##### 组件的生命周期

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

diff算法：
  1. 先比较节点类型，不同则删除替换树结构，相同则进行匹配。再比较节点属性。该算法不会匹配不同组件类的子树，如果发现两个组件类DOM结构很相似，可以合并组件类。
  2. 禁止进行DOM节点跨层级的操作！	比如跨层移动节点。为保证结构稳定可用css隐藏节点。
  3. 不同组件会直接替换，相同组件会进行diff运算，如果确定没改动就强制shouldComponentUpdate！
  4. 同层级DOM节点移动增删时必须加key! 因为diff会因为位置不同判断重渲，相同key只进行移动操作。
  5. 同层级DOM节点移动不要把【位置索引】最后的节点移动到前面，因为diff是从左边比较后移动到右边。




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
history.pushState对应{browserHistory}，需服务端配置。
hashChange对应{hashHistory}，兼容性好但有/#/。
改变#后的hash值并不会触发页面跳转，而是会在页面中跳转到相应的锚点。
?_k=0e9k95：这段query是为了提供每一条路由记录持久化数据而生成的唯一标识。可用createHistory去掉特性。
**React-Router-Redux**：路由信息与store绑定,基于React-router的高阶组件。
增强store:`const middleware = routerMiddleware(browserHistory);` `const store = createStore(reducers, applyMiddleware(middleware));`
增强store2:`const store = createStore(combineReducers({...reducers,routing: routerReducer}))`
增强history:`const history = syncHistoryWithStore(browserHistory, store);` 
切换路由：`store.dispatch(push('/home'));` 切到/home。   replace(location), go(number), goBack(), goForward()
监听：history.listen(location => analyticsService.track(location.pathname)) 
**Flux**
单向数据流：Action->Dispather->Store->View（React's VM）-> Action
每次流动重渲染View层的虚拟DOM，PureRender则让重渲变为局更。如果交互要改数据，只能通过dispatcher分发action(交互事件不能直接setState！)。
FSA规范：action对象如何写。
store:只读，不设。根据type触发更新事件。
controller-view：监听到更新事件，把数据并setState。存入state->props传下去。
actionCreator：由于dispatch分发函数内部的action格式固定，可以封装起来。
设计store.js:
  1. 有获取数据的getter方法。
  2. 有绑定、触发、删除事件的方法。
  3. 有export出口。
  4. 有修改数据的register方法，根据action的type改数据并触发事件。
  5. 部分API： `getInitialState` 设置store初始state  `reduce` 返回新state给store  `export default new CommentStore(AppDispatcher)`分发器实例传入商店实例并导出
设计actions.js:
  1. fetch拉取数据->传入dispatch()
  2. 思路：提交->fetch->成功则分发success的action,失败则分发error的action -> 下载->fetch->成功。。。失败。。。
  3. 有export出口。
  4. 部分API:`AppDispatcher.dispatch(action)`
设计controller-view：
  1. 它是React父组件。
  2. this.state：初始化值用store的getter拿到。子组件依赖它。
  3. 事件回调：内部的setState()拿值同上。
  4. 组件渲染后把调用setState的事件函数传入store作为监听事件的回调，卸载后要解除。如果store触发事件，则调用修改状态的回调。
  5. 部分API:`export default Container.create(CommentBox);`组件需要被包裹
设计dispatcher.js:
  1. 内部判断action.type,执行相应回调(比如：往store添加数据)并触发store事件->controller-view改变状态
  2. 该实例只能有一个。
优点：
 1. 把数据中心化管理。组件渲染只有一个触发来源。
 2. flux提供的全局变量可让非父子关系的组件通信，且依赖该数据的都会监听到。
 3. 让view层组件真正纯粹。专注展现。
### Redux
数据容器：const store = createStore(reducer);
获取数据快照：const state = store.getState(); 一快照对应一视图
创建消息：function add(t){return {type:'ADD_TODO',payload：t}}   const action=add('message');  一种消息对应一Action。用户通过View影响State。
发送消息：store.dispatch({type:'ADD_TODO',payload:'message'})等价于store.dispatch(add('message'));   接收一个Action对象参数
修改快照：reducer函数接收state参数和action参数，返回新state。创建容器时传入，自动返回快照。
监听快照：store.subscribe(fuc) 快照改变则触发fuc,所以fuc是修改View的函数(render/setState) 解除监听是调用它的返回值。
解耦reducer:combineReducers({}) 合并多个reducer
中间件：原理给dispatch添加功能。createStore(reducer,state,applyMiddleware(fuc))

特点：
  1. 单一数据源：状态都保存在一个对象内。
  2. 状态是只读的：
  3. reducer是纯函数：可做撤销功能。
创建:`store = createStore(reducers,initialState)`
  1. getState()：获取 store 中当前的状态。
  2. dispatch(action)：分发一个 action，并返回这个 action
  3. subscribe(listener)：注册一个监听者
  4. replaceReducer(nextReducer)：更新当前 store 里的 reducer
中间件：可以检阅每一个流过的 action，挑选出特定类型的 action 进行相应操作。在dispatch之前先执行中间件。
  1. 增强createStore方法：`const finalcreateStore = compose(applyMiddleware(d1,d2,d3),DevTools.instrument())(createStore)`
  2. 创建store:`let newStore = applyMiddleware(mid1, mid2, mid3, ...)(createStore)(reducer, null);`
  3. 增强dispatch方法:`dispatch = compose(...chain)(store.dispatch);` compose是从右到左依次累加执行中间件
  4. middleware流程：store.dispatch(action) -> next() -> ... -> next() -> dispatch -> 再循环出去。 如果中途调用了store.dispatch会回到起点。next()方法是进入下一个中间件。
	edux-thunk：`const store = createStore(reducer,applyMiddleware(thunk));`然后把Action Creator的返回值改为函数格式。比如：get=(url,b)=>(dispatch,getState)=>{fetch(url).then(r=>{dispatch({type:'',payload:r})})} 	
redux-promise:判断 action 或 action.payload 是否为 promise，如果是，就执行 then，返回的结果再发送一次 dispatch。
自定义中间件：`const Middleware = store => next => action =>{next(action)}`
轮询：定时发出dispatch().then then回调递归调用自身
Reducer：
  1. let Reducer = (previousState=init, action) => newState
  2. 整合reducer:combineReducers({r1,r2})
  3. 复用：不同组件不能共用reducer,action-Type必须区分。想复用就把reducer函数封装下，type设为参数。
  4. 禁止：修改传入的state参数、执行有副作用的操作，比如API请求，路由跳转等、调用非纯函数，比如Math.random()或Date.now()。
把Action转化成能直接调用的函数：bindActionCreators({a:action.a, b:action.b})
Store:
  1. connect 方法隐式使用 store.subscribe
  2. createStore源码：如果2参是函数类型，便增强createStore：return enhancer(createStore)(reducer, initialState)
  3. 
#### React-redux
生成容器组件：input把state变成ui上的props,output把交互变成action。
  const Rongqi=connect(input,output)(Ui)。
展示组件： 无法感知Redux。
<Provider/> 
  1. 接受一个 store 作为props，它是整个 Redux 应用的顶层组件。
connect()
  1. 任意组件中获取store中数据的功能。
  2. connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
  3. 用法：`const Comp = connect(...args)(MyComp);`
        1. mapStateToProps(state, ownProps):返回的对象属性作为 props 绑定到MyComp上。state就是store,ownProps是MyComp的原props。
            2. mapDispatchToProps(dispatch, ownProps):将action作为 props 绑定到 MyComp 上。这是为了让MyComp感知不到dispatch方法，又能调用它。
                3. mergeProps(stateProps,dispatchProps,ownProps) : stateProps是mapStateToProps返回的props对象。
                    4. {pure:,withRef:} pure:true在shouldComponentUpdate浅比较props。withRef：true可保存dom引用`getWrappedInstance()` 
  4. 内部实现了许多判断组件是否更新的逻辑。


**Redux Devtools**
npm install --save-dev redux-devtools redux-devtools-log-monitor redux-devtools-dock-monitor

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
</Motion> 
```

工程化流程：设计目录->设计routes.js->路由导入app.js
![](http://i.imgur.com/UDmGQY6.png)
![](http://i.imgur.com/yrrNGZi.png)
![](http://i.imgur.com/lsMotGH.png)
![设计目录](http://i.imgur.com/Y0xvpQP.png)
由于递归的特性， 父组件的componentWillMount 在其子组件的 componentWillMount 之前调用，而父组件的 componentDidMount在其子组件的 componentDidMount 之后调用。
周期参数：
componentDidUpdate(prevProps)
setState({},f()) 回调在组件渲染后执行







# React-Native

安装条件：

1. npm install -g yarn react-native-cli 
2. Java Development Kit [JDK] 1.8
3. Android Studio2.0 Bundle版本,非ide版 
4. yarn add react-navigation
5. 环境变量: `ANDROID_HOME`  Android SDK的路径. `PATH` Android SDK的tools和platform-tools目录路径
6. npm install -g create-react-native-app 
7. Expo / 夜神模拟器

安装帮助：

```
安装studio如果提示没有android-Sdk就因为代理设置。点击小弹框里的设置代理，再点第2个勾。sdk装完run-android有问题关掉影梭先重启！！！
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
在欢迎界面中选择Configure | SDK Manager。
  SDK Platforms | Show Package Details，在Android 6.0 (Marshmallow)中勾选
	Google APIs
	Android SDK Platform 23
	Intel x86 Atom System Image
	Intel x86 Atom_64 System Image
	Google APIs Intel x86 Atom_64 System Image。
	
	//  sources for android 23
	//  Google APIs Intel x86 Atom System Image。
	//  Android SDK Platform 26
  SDK Tools | Show Package Details，在Android SDK Build Tools中勾选
    Android SDK Build-Tools 23.0.1 // 26.0.3 23.0.3 google respository
    Android Support Repository.
Android SDK Manager找不到就是因为工具是ide版本
不能用studio打开android文件夹
```

```
react-native init test 或 react-native init --version="0.55.4" test 最新版有时候跑不通
cd test
react-native run-android  
或
create-react-native-app test //可以用Windows开发iOS版的RN应用，再用Expo扫码预览,如果手机VPN不行用fiddler用PC代理。  注意打包iOS和Android编译环境. 
cd test
npm start
```

夜神模拟器用法：

```
adb connect 127.0.0.1:62001  检查adb devices是否有模拟器
首次 run-android
红屏 点击摇一摇-Dev Settings-Debug sever host&port for device- 设为本机IP:8081
重启模拟器
再次 run-android

点击remote js谷歌调试因为代理会跨域报错，右键属性目标添加 --disable-web-security --user-data-dir 并取消固定任务栏
```



​	

https://dl.google.com/android/repository/android_m2repository_r47.zip

签名打包：仅用于 `react-native init xxx`
1. windows在jdk的bin目录生成密钥：`keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000` 粘贴到android/app
2. 编辑gradle.properties
```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```
3. 编辑android/app/build.gradle
4. 发布：`cd android && ./gradlew assembleRelease`

手机调试：`adb logcat *:S ReactNative:V ReactNativeJS:V`  `react-native run-android` 检测手机连接：`adb devices`

报错：
1.  Expected a component class,got[object Object] 组件首字母要大写
2.  require引入本地资源，需要重启调试才奏效。
3.  找不到'escape-string-regexp'模块： 进react-native目录npm install
4.  TransformError : yarn remove babel-preset-react-native ， yarn add babel-preset-react-native@2.1.0
5.  onPress找不到navigate ： 在render内：const {navigate} = this.props.navigation;


Props :
  1. <Image source={ {uri:('http://a.jpg'||Base64)} || require('./a.jpg') } style={{width: 193}} /> 兼容性：IOS9/10只支持https
  2. props值的变化，是组件复用的关键。

    State :  this.setState(preState => { return{ showText: !prevState.showText} }); this.state传进preState参数
    Style : 
  3. 属性名首字母小写驼峰 
  4. 数组，后面可覆盖前面并继承
  5. FlexBox：父级必须有height或flex。alignItems: 'stretch'的子元素不能固定次轴尺寸。与css的区别：flexDirection的默认值是column而不是row，而flex也只能指定一个数字值。

    组件：

每个组件都有一大堆props

 1. <View /> : 支持Flexbox布局、样式、触摸、无障碍、任意嵌套。
 2. <Text /> : 嵌套的Text会继承上面的文字样式。文字必须在该组件内！
 3. <Image />: GIF和WEBP需要编辑build.gradle。
 4. <ImageBackground> ： 背景图
 5. <TextInput onChangeText={(text) => this.setState({text})} value={this.state.text} /> : 键盘字符全部传入text参数
 6. <ScrollView> : 所有元素都被渲染，长列表不适合。pagingEnabled整屏滑动。min/maximumZoomScale双指缩放
 7. <FlatList data renderItem /> : 只渲染可见区。 renderItem函数负责渲染组件
 8. <SectionList sections renderItem renderSectionHeader /> : titile和data交替渲染



    网络：WebSocket('ws://') XMLHttpRequest() fetch()

图片：

 1. 精度后缀：check@2x.png、check@3x.png
 2. flex缩放图片：需要{ width: undefined, height: undefined }。
 3. 网络图片、混合app的图片、非图片静态资源、要设置尺寸。

react-navigation：
1. 切换页面回调：navigate('Main', { })  引入：const {navigate} = this.props.navigetion； 

2. 定义路由 ： const App = StackNavigator({Main: { screen: HomeClass },Second: {screen:ChatClass}});

3. 引用参数：

   1.render内：`this.props.navigation.state.params` 

   2.navigationOptions内：( {navigation} ) => ({title: navigation.state.params.user,});

4. TabNavigator：左右滑动Tab

5. 嵌套路由：把xxxNavigator的Class替换成yyyNavigator

动画：
1. interpolate线性插值：inputRange:[]映射到outputRange:[],支持数字、字符串、函数
2. InteractionManager.runAfterInteractions(()=>{}) : 确保同步任务之前交互和动画已执行完毕了
#### 事件

```
<TouchableNativeFeedback  onPress={this._onPressButton}>
            <Image style={styles.arrow} source={require('../assets/arrow.png')} />
        </TouchableNativeFeedback>
```

点击组件：

1. <TouchableHighlight> 变黑
2. <TouchableNativeFeedback> 水滴(安卓)
3. <TouchableOpacity> 字变透明
4. <TouchableWithoutFeedback> 无变化

事件属性：


1. 点击：`onPress`   
2. 长按：`onLongPress`  
3. 按下：`onPressIn` 
4. 松开：`onPressOut`


#### 样式

层叠写法：`style={[styles.text, styles.header]} `

```
transform: [{scale:3},{rotate: '90deg'}] //等同transform:scale(2) rotate(90deg)
```

margin只能写一个值

View不支持很多字符串样式

position:fixed的安卓实现： ScrollView放底层/类fixed元素放上层。

display: 

1. `flexDirection: 'row'` 等同 display: 'flex' 
2. 只支持'flex' 'none'   默认值是‘flex’，且默认方向是column！

box-shadow: 

1. RN阴影属性是只对IOS生效。 在安卓5.0上，要是设置的是黑色的阴影，可以通过设置elevation属性.  不能定义颜色、透明度、偏移，会影响zIndex层级。
2. Image组件，当为单标签是图片；当为双标签是背景；(UI强调就用图片) 

获取屏幕宽高：`require('Dimensions').get('window').width `

SCSS函数迁移：

```
@function vw($px) {
  @return ($px / 375) * 100vw;
}
-----------------------
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
function vw ($px) {
  return ($px / 375) * width;
}
```

```
{
  display: inline;
  vertical-align: bottom;
  line-height: 1;
}
每个div都添加这个类。不同字体大小底部对齐。 中文貌似必须手动调整
-------RN------
{
  textAlignVertical: 'bottom', //仅限Android的属性
  alignItems: 'baseline',
  lineHeight: 60,
}
```

#### 组件

ScrollView必须设高度：<ScrollView style={} horizontal={true}> 

WebView

1. 父容器必须设高度，自身的高度完全依赖父容器好像无法设置？
2. 加载本地html解决图表功能。Android 需要先把静态资源放到 `android/app/src/main/assets` 目录下面 ` source = Platform.OS === 'ios' ? require('./demo.html') : { uri: 'file:///android_asset/demo.html' };`

#### 动画

`Animated`仅封装了四个可以动画化的组件：`View`、`Text`、`Image`和`ScrollView`，不过你也可以使用`Animated.createAnimatedComponent()`来封装你自己的组件。 

无限旋转

```
this.state = {
	fadeAnim: new Animated.Value(0),      // 透明度初始值设为0
};
startAnimation () {
    this.state.fadeAnim.setValue(0); 	  // 暂停所有动画并重置
    Animated.timing(                      // 随时间变化而执行的动画类型
      this.state.fadeAnim, {
        toValue: 360, 					// 终值
        duration: 2000, 
        useNativeDriver: true,			 // 开启原生加速(组合里一开都要开)
        easing: Easing.out(Easing.linear)}
    ).start(() => this.startAnimation()); // 循环
}
<Animated.Image
  style={{transform: [{rotate: this.state.fadeAnim.interpolate({
	inputRange: [0, 360],
	outputRange: ['0deg', '360deg'],
})}]}} 
  source={require('./assets/button.png')} />
```

#### 导航

```
static navigationOptions = { // 设置该属性改导航栏样式
    title: '小糖书',
    headerStyle: {
      height:0，  		    // 隐藏导航栏
      backgroundColor: 'rgb(237, 23, 30)'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'normal',
    },
};
const { navigate, goback } = this.props.navigation;
global.navigation = this.props.navigation; //  设为全局变量
navigate('Map',{}) 			// 跳转
goBack(null)                 // 返回
```

# Next.js

http://nextjs.frontendx.cn/docs/#%E4%BB%A3%E7%A0%81%E8%87%AA%E5%8A%A8%E5%88%86%E5%89%B2

以 `./pages`作为服务端的渲染和索引

静态文件夹的名字，只能叫`static` 

# SSR

style-loader和isomorphic-style-loader:

​	如果使用 css-module 转换类名为哈希值必须要搭配`className={styles.xx}`这种写法的。

​	客户端的bound.js包含前者会自动挂载style标签。服务端的后者会把类名写的和前者挂载类名相同。

mini-css-extract-plugin：提取css文件，和style-loader冲突导致dom类名消失。

this.props.staticContext 可以拿到<StaticRouter>的context属性。

任何想访问conrext里面的属性的组件都必须显示的指定一个contextTypes的属性

```js
const StoreContext = React.createContext({
    store
});
```

