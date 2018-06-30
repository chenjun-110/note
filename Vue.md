### 实战bug
ts写法直接修改变量无效，src={a} 通过三元运算符才能改？ 复杂的要函数操作渲染{func()}
blob图片透明底会变白色
异步子组件：异步数据没有时，v-if不显示该组件配合computed赋值状态。貌似是响应依赖关系没建立。
路由传参：
  1. 如果 props 被设置为 true，`route.params`将会被设置为组件属性。
  2. 函数模式：props: (route) => ({ A: `route.query`.a }) A将会被设置为组件属性。 ？&可以传复杂对象！ :to="{ path: 'a/b', query: { data: item }}"
  3. 弃用this.$route的强耦合。
jsx:
  1. {this.arr} 千万别用双括号！
  2. 代替v-for: let A = data.map((v) => <p>{v}</p>)  <div>{A}</div>
监听路由变化：`@Watch('$route')`
监听数组绑定：`arr.splice(index, 1, value)` 直接索引赋值无效
监听数据初始化：
  1. 增加对象属性是无法建立依赖追踪！
  2. `Vue.set(obj,k,v)`/`this.$set(obj,k,v)` 
  3. 合并对象或赋值整个对象`this.obj = Object.assign({}, this.obj, {a: 1})`
  4. 推荐设异步属性初始化为`null` 
  5. 响应属性赋值是异步的，确保回调执行`Vue.nextTick(callback)`/`this.$nextTick`
异步数据tsx渲染：`if (!Object.keys(this.all).length) return (<div>数据加载中</div>)` 好处：不用判定异步数据是否存在
get不能用data关键字，否则this指向VUE非组件。
import导入库的时候，可能导致循环依赖，在微信PC端游览器上无法显示！是因为调用了URLSearchParams不兼容的方法！
100vw会超出微信游览器屏宽，100%不会。img只要有宽度就出现？
微信：
  1. 微信分享会把`?from=singlemessage`添加在`#/route?`之前: [?][\s\S]*[#]
  2. 微信分享的连接和图片url必须在公众号后台设定的js安全域名内！
  3. ios-safari的往返缓存会丢失dom事件，必须下拉一下页面,用popstate事件。
  4. 用 `window.wx` 代替 wx。解决首次进入wx的undefined
  5. 微信分享的VUE在根组件时获取query也是没有参数的！还需要每个页面都签名一次。
ios8兼容：
  1. includes不兼容
  2. flex不兼容
安卓兼容：
  1. pointer-events:none 安卓点击image预览
```
window.addEventListener('popstate', function (e) {
  console.log('referrer', document.referrer)
  if (window.location.href.indexOf('member') > 1) that.$router.push('/member') 重置当前url
}, false)
```

https里的iframe不能用http
webpackjsop报错和异步require组件报错原因：没用https流量劫持导致js文件没下载下来
#### vue-cli开发环境配置
1. 配置scss:vue-cli有sass的loader不用手动加。
    npm install node-sass --save-dev  
    npm install sass-loader --save-dev  
    <style lang="scss">
.vue
export default{} 等同于 new vue({})
2. 本地访问打包后：把dist子内容复制到KOA的静态目录下。 config.index.js把assetsPublicPath的'/'改成'./'
3. 配置免密git: 修改.git/config http://chenjun-110:password@git.com
4. tsx引入图片： `declare var require: any` 或 `declare function require(string): string;`
5. 微信环境：dist目录要有个带密钥的txt文件
6. 手机访问PC环境：
  1. 反向代理：ipconfig找到无线局域网适配器IP就是ngnix服务器在局域网的IP 手机WIFI的IP设置成ngnix是访问nginx本身！
  2. 正向代理：wifi的IP设置成fiddler的IP:8888 
  3. HTTPS抓包：fiddlerPC端在 https://www.telerik.com/fiddler/add-ons 下证书，手机端访问IP:8888点击链接下证书。 谷歌PC游览器需要从fiddler的tools里导出证书。 IOS还需要开启：设置 –> 通用 –> 关于本机 –> 证书信息设置; 
7. 移动控制台
```
npm install vconsole
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
let vConsole = new VConsole()
```
####
以下都和data属性绑定，data属性渲染后手动赋值全部会实时生效

{{m}} 双括号变量
v-bind:title="m" v-bind绑定html属性
v-if="m" 控制本节点存在性 false用注释替换节点  v-shows适合高频切换
v-for="(v,i) in arr" 数组批量渲染本节点，v表示每项,可以迭代对象
v-on:click="方法名" @事件绑定方法 methods属性存方法 事件修饰符有原生事件能力 按键修饰符缩小触发范围
v-model="m" input绑定 复选框注入m的值为true/false 单选框和下拉框注入的值是value属性值
:key在语法提示里是必须的
:class
  :class="[{'a': true}, 'b']" a,b都有
  :class="[id === 20 ? 'a' : 'b']"

自定义指令：
  钩子：bind inserted update componentUpdated unbind
  如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。
  绑定值会注入到binding.value
#### 组件
一个组件本质上是一个拥有预定义选项的一个 Vue 实例  Vue.component(tagName, options)

先全局注册,后实例vue 局部注册在components属性的属性
props自定义属性负责渲染template,大写无效 v-bind="m"值为对象表示传递所有属性 没有用v-bindb绑定的自定义属性不会被当做表达式 v-bind:is的值变化会切换组件 因为组件有自己独立的作用域。为了把迭代数据传递到组件里，要用v-bind注入,props声明取出。
 template负责替换本组件节点 template上的class会追加到组件class后
 data是函数，返回对象
插槽分发内容：父组件包含的内容传入子组件模板的<slot></slot>内。父组件模板包含的<div slot="na"></div>会插入子组件<slot name="na"></slot>。slot-scope可在父级模板写子级内容。
递归组件：name属性为组件名在模板中调用。v-if为出口。
带唯一key，不会复用DOM。追踪key身份就要v-bind:key了

mixins：
  合并选项，冲突项不合并
#### 动画：
<transition name="v"> ： 包裹的dom有动画效果， name是CSS类名前缀：v-enter v-enter-to v-leave v-leave-to v-enter-active/v-leave-active
 <transition name="v" enter-active-class=""> 使用三方CSS动画库
 v-on可以绑定钩子属性，貌似是动画每个阶段的回调？ 使用三方JS动画库
 v-bind:css="false" js动画元素跳过css检测
<transition appear> apper属性对初始渲染动画
mode属性：过渡模式，默认进入和离开过渡同时进行，

<transition-group> ： 子元素必须有key name属性是动画类前缀 name-move类在元素的改变定位时中应用 tag属性设置包裹元素 FLIP过渡元素不能是inline内联的
```
easeInOut(t, b, c, d)的t是当前时间差，b初始值，c变化值，d变化时间
easeInOut(currtime, -0.5, 2, duration)
const currtime = Date.now() - borntime;
退出条件是：currtime >= duration
```
#### 生命周期
mounted 挂载后（不包括子组件） 调用this.$nextTick包括子组件


#### vuex
store.dispatch('Action') 异步
store.commit('Mutations') 同步(改变state)

组件内：`this.$store`.dispatch()
监听： 
#### Typescript
每个vue文件引入：import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
`get count(){}`等价于computed:{count(){}}
ts中的写法：
```
@Emit()
addToCount(n: number){ this.count += n }

@Emit('reset')
resetCount(){ this.count = 0 }

@Inject() foo: string
@Inject('bar') bar: string
@Inject(s) baz: string

@Model('change') checked: boolean

@Prop()
propA: number
@Prop({ default: 'default value' })
propB: string
@Prop([String, Boolean])
propC: string | boolean

@Provide() foo = 'foo'
@Provide('bar') baz = 'bar'

@Watch('person', { immediate: true, deep: true })
onPersonChanged(val: Person, old: Person) { }
```
#### vue-router
异步组件语法：`component: resolve => require(['@/components/Subscribe'], resolve),` 
 优点：延迟执行代码，减少首屏内存。缺点：异步组件会闪屏。页面由大量异步组件构成导致http阻塞和渲染不齐。
meta信息：beforeEach判定，做tab状态、title信息。
钩子：
 1. 单个路由钩子：beforeEnter
 2. 全局路由钩子：beforeEach afterEach
点击 <router-link to="/foo">Go to Foo</router-link>
渲染 <router-view></router-view>
router必须传入根实例
激活class="router-link-exact-active router-link-active"
path: '/user/x' 指向 to="/user/x"
path: '/user/:id' 指向 to="/user/所有"  {{ $route.params.id }}可取路由值 $route.query取问号查询参数 复用路由组件会导致生命周期失效,需watch它的$route或使用beforeRouteUpdate
嵌套路由子内容：用children属性和<router-view/>
手动点击 this.$router.push('aa') 或this.$router.push({ path: 'aa', query: { a: '1' }})
以名字来跳转 this.$router.push({ name:'user'}) 等价于 <router-link :to="{ name: 'user', params: { a: 1 }}">
一路由控制多组件：多个<router-view name="a">和components:{a:A,default:B}
把路由传入组件属性 props: true 不用调用$router
传参：this.$route

#### 其它：
`#`是用来指导浏览器动作的,表位置，也可以用来显示个性化内容
  ajax请求自动剔除它，如果#有意义需转码 。
  改变#会改变浏览器的访问历史不会重载,触发onhashchange
  window.location.hash
  Google爬虫读不到#，读得到`#!`转成查询字符串 /#!/username等同于/？_escaped_fragment_=/username

#### Element-UI
<el-row> 
  :gutter 列的间隙
  :justify="start/end/center/space-around/space-between" 水平排列方式 :type="flex"
  :align="top/middle/bottom" 垂直排列方式
 <el-col> 
  :span 普通单位。 :xs/sm/md/lg/xl 屏宽响应单位,总24,一般同时写。
  :offset ->左间隔单位(会影响右侧空间) :push/pull 右左移单位
<el-container > 用它的不同组合来确定flexbox分布 direction="horizontal/vertical"排列
 <el-header height="60px">
 <el-main>
 <el-footer height="60px">
 <el-aside width="300px">

设计规范：
  font-size：主标题20px 标题18px 小标题16px 正文14px 小正文13px 辅助文字12px 
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
设计：
 16：9 height:56.25vw
和设计的约定：
  列表式icon切图宽度务必一致。防止比例不对。



## 微信平台
接口的调用需要先获取access_token 2小时内有效
获取OpenID是无需同意，获取用户基本信息则需用户同意
资质认证通过，才可获得公众号接口。
两种公众号：订阅号和服务号 权限不同接口不同 企业号只有通讯录成员可关注
`http://res.wx.qq.com/open/js/jweixin-1.2.0.js`
生成签名步骤:请求access_token -> access_token获取jsapi_ticket -> appId jsapi_ticket、noncestr、timestamp、url拼接，使用SHA1加密算法生成签名 -> 把数据给前端向微信官方注入`wx.config`配置
SDK只能调起的授权过的域名，变化url的SPA可在每次url变化时进行调用`wx.config`

### 微信SDK
前端要先向后台请求微信配置的数据。`location.href.split('#')[0]`
wx.config
  debug:true 调试模式,调用所有api的返回值会alert出来
  appId timestamp nonceStr随机串 signature签名 jsApiList接口列表
wx.ready
  wx.微信sdk
分享4个：朋友圈、微信好友、qq好友、qq空间 wx.onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareQZone
wx.error 如签名过期在这里更新

兼容：
6.2-安卓微信不支持pushState，不支持history模式，导致签名失败，解决：hash模式、监听url更改注入config
ios微信的支付和分享链接按照首次进入的链接来算，pushState无效，解决：/?#/ 取url用`window.location.href`
Hash中的/会被微信认为是一个目录

### 微信小程序基本介绍
原生组件：
  view 有点击class
  scroll-vieww 滚到顶部和底部都有事件。
  swiper 滑条
  movable-area 拖拽 可限制拖拽方向 可做拖拽的图标
  cover-view 覆盖map、video、canvas、camera 可与自己和cover-image嵌套
  icon √ × ！ 箭头 放大镜
  progress 进度条
  rich-text nodes属性写显示的HTML节点，数组类型性能高。
  navigator 路由
  camera 相机 wx.createCameraContext().takePhoto
WXSS样式：
  1rpx=1物理像素，自适应。
  导入外联样式表 `@import 'a.wxss';`
  app.wxss 中的样式为全局样式
  组件wxss中不应使用ID、属性和标签名选择器
  .a > .b 前者必须是<view>
  :host{} 组件控制其所在父节点
  优先级：同个wxss文件内，同个属性值，上面写的会覆盖下面写的。
  所有同名css会合并而非覆盖！
  **问题**：
    子元素的层级超不出容器的z-index
    absolute层级比z-index高，兄弟元素也要position
this.route：
  getCurrentPages()保存了页面数组栈，
  wx.redirectTo 重定向覆盖当前栈 wx.reLaunch刷新进入 wx.switchTab打开子页  wx.navigateTo wx.navigateBack
WXML：
  wx:if  wx:elif  wx:else
**API**：
  wx.getSetting 了解是否授权
  <button open-type='share'> 分享弹框  open-type="contact" 跳客服会话
  wx.navigateToMiniProgram 跳转别的小程序
  wx.setNavigationBarTitle({ title: '当前页面'}) 设置标题

### 微信小程序
##### 重构思路

  Page对象设name属性/this，保存起来统一管理。 this.data.name复用同组件时区分页面
  ajax和回调业务分离。
  把跨页面跨组件的数据放入Redux。改了数据要有个机制实时刷新呢？ ：：Redux->setData
  如果用 redux，就没有 state 和 props 的区分了。组件都应该用 props

##### 遇到的坑

  把所有该用的init数据，最开始就要拿到！别到时候该有的数据没有，异步请求写一大堆，逻辑思路全乱还分散精力。路由入口判断尤为重要！
  箭头函数在模块文件里，拿不到this(就连bind都无效)，要写成function。
  cover-view自己是绝对定位，子元素绝对定位会消失。
  有时候工具的API调用不了，是权限设置没开。
  onShareAppMessage报错会无法带参数。
  自定义组件的`wx.createCanvasContext`必须带二参this。`wx.createSelectorQuery().in(this)`也是(要在ready周期后)！
  `this.data.obj`设初始属性会被下次赋值覆盖。
  Canvas组件前5秒巨卡，setData巨慢，只能把按钮延迟setData显示,drawImage阻塞setData。
  离屏Canvas识别不适用对加载速度严格的组件。

##### 兼容性

  IOS能放音的API是wx.createInnerAudioContext()，设不理会静音开关obeyMuteSwitch=false
  IOS的image比background-image好

  绝对定位必须有定位值。或者说弹性居中对绝对元素无效。

##### 和Vue的不同

  单向绑定 this.setData({},()=>) 修改data并渲染，能设置obj.key属性，也能设置并新建不存在的对象和属性。
  没有method属性,挂方法和react一样。 它的methods在自定义组件上，而且data仍然是对象。
注意：
  `"{{false}}"`和`"false"` 后者为真
  `"{{a}} "`等同于`"'{{a}}'+' '"`
   `wx:for="arr"` 等同于 `wx:for="{{['a','r','r']}}"` 所以要防止空格导致变为字符串数组。
   静态样式不要写在style中，style适合动态渲染样式

事件：`bind:tap="回调名"` catch:tap阻止冒泡 capture-bind:tap捕获 capture-catch:tap阻止捕获(包括后面的冒泡)
 触摸事件 `tap touchstart touchmove touchcancel touchend` `longpress`长按 
 过渡事件 `transitionend animationend animationstart animationiteration`一次迭代结束 
 其他事件都是非冒泡。data-属性挂载dataset对象下。`target`指向发生事件的组件，`currentTarget`指向绑定事件的组件。
 用CSS3动画比这垃圾API强多了。`keyframes`触发`animationend`事件。

##### 生命周期

  App生命周期： `onLaunch`初始化 `onShow`前台 `onHide`后台 `onError` 时间参数能确定小程序入口
  Page生命周期： `onLoad`加载 `onReady`初次渲染 `onShow`/`onHide`显示隐藏 `onUnload`页面卸载(点左上退回健) ---`onShow`快于`onReady`
  组件生命周期：`created/attached`组件进入页面 `ready`组件节点布局完成 `moved`组件在节点树移动 `detached`页面移除组件
  组件relations生命周期：`linked`插入后 `linkChanged`移动后 `unlinked`移除后
Page页面事件： `onPageScroll`滚动 `onPullDownRefresh`下拉 `onReachBottom`上拉触底 `onShareAppMessage`点击转发按钮

getApp().globalData 全局变量属性
支持文件模块： `module.exports = {}` `require()`

##### 模板和组件的区别及思路

  组件wxss的样式只对组件内的节点生效。 
  模板没有父级，作用只是切分wxml和wxss和js代码片段,要各自导入，data数据只共享当前页面的注入部分。
  init函数下把that.func=func，可以把自定义方法挂到其他对象中去，方便做函数级的mixin封装。


##### WXML
定义模板：`<template name="{{a ? 'm':''}}"></template>` 引入`<import src="item.wxml"/>` 调用`<template is="m" data="{{...item}}"/>`  
  扩展运算符把对象属性当做参数传入，模板内容可直接调用。{{...item}}等同于{{a:1,b:2,c}}这里的c表示c:c变量。有自己的作用域，只能引用模板内定义的wxs。
  `<include src="header.wxml"/>`只用来引入代码，切分文件
wx:for="{{arr或obj}}" 循环次数等同对象长度 默认项item，默认索引index，
  嵌套wx:for貌似只是数据层为了拿到循环的变量？展现只靠最里面。wx:for-item/index自定义项、索引，用来做条件运算的。
  `<block wx:for>` 是渲染多个结构块
wx:key 动态渲染时保留状态(重排序) `wx:key="u"` 表示绑定item.u `wx:key="*this"`表示绑定item,item要是唯一字符串或数字。

```
<wxs module="a">
  var b="1"; module.exports.b=b;
</wxs>
或
<wxs src="kaka.wxs" module="a" />
<view>{{a.b}}</view>
```
优点：IOS下比JS快，缺点：不能调用小程序api，不能调用js文件的js函数，不能做事件回调。
用途: {{}}下做运算。
  .wxs应用.wxs用require
  单例模式，多次引用
数据类型的判断可以使用 constructor 属性。


##### 自定义组件
定义页的json设为 "component": true
使用页的json设为 "usingComponents": { 组件名: 路径 }
把组件插在调用处。小写字母和下划线。
Component({})
 properties属性 data数据 methods方法 `this.properties`渲染不需要转成data。
 observer属性改变执行该函数。驼峰写法：定义和表达式内。-符写法：传入在组件上。
 <popup taps="{{taps}}" /> 下传属性

`<slot></slot>`是给使用页插节点的。像参数。
  默认只有一处，多处要设置Component.options.multipleSlots为true
  使用页的`<view slot="a">`会插入到`<slot name="a">`

组件生命周期：`created/attached`组件进入页面 `ready`组件节点布局完成 `moved`组件在节点树移动 `detached`页面移除组件
组件relations生命周期：`linked`插入后 `linkChanged`移动后 `unlinked`移除后
  父子组件都要设Component.relations属性。
  获取关联组件实例的有序数组：this.getRelationNodes(url)
	

##### 自定义事件：

  组件内通过原生事件回调手动触发自定义事件：`this.triggerEvent('xxevent',{},{})`
  组件外监听自定义事件：`bindxxevent="xx"` e.detail是二参 xx是父组件的方法。默认不冒泡。
  composed: true事件会冒泡进入父组件的模板内部，然后进入页面的父组件

module.exports = Behavior() 类似mixins,抽象出选项的公共部分。组件通过behaviors属使用。
  覆盖优先级：同名属性/方法：组件>后behavior>前behavior data:对象则合并，其他相互覆盖。 生命周期函数：都调用。

##### 性能
单包<2M 所有包<4M 打开对应子包页时下载子包。
按需加载：app.json subPackages 子包之间不能引用js、template。
小程序进入后台5分钟微信销毁，除了置顶的小程序

性能：
  WebView和js数据传输是通过字符串拼接。
  微信小程序CDN的Gzip对文本压缩好，图片不好。
  后台页面最好不要setData。每次setData不要传太多数据。
  图片过大、过多会引发内存回收webview
Redux:
  业务逻辑写在reducer
  createStore的二参是初始数据，用于前后端同构。
  视图组件只包含了渲染逻辑和触发 action
##### 动画
创建实例 wx.createAnimation()
一组 step() 同时开始，可传入配置指定当前组动画，不同时开始的用step衔接。
提交 this.setData({Data:animation.export()}) 就算有多组貌似也只有一次提交
Canvas api
draw会清空画布，draw(true)会保留。
restore返回save保存的ctx设置
drawImage(url,x,y,w,h) xy都是左上角
##### DOM
wx.createSelectorQuery().in(this)
  select('.class')  跨自定义组件的后代选择器：.the-ancestor >>> .the-descendant
  selectAll
  selectViewport().scrollOffset(res=>).exec() 节点必须是scroll-view或viewport,滚动位置查询
.boundingClientRect(res=>).exec()    坐标和dataset
.fields({},res=>)).exec() 			 所有节点信息


图片全屏显示
```
<image src bindtap="previewImage"></image>  
previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls:  [] // 需要预览的图片http链接列表  
    })
} 
```
分享到朋友圈：后台生成图片，拿到后再保存到本地。用户自己去发朋友圈。 wx.downloadFile -> wx.saveImageToPhotosAlbum
父组件：
```
var pages = getCurrentPages();
var currPage = pages[pages.length - 1];   //当前页面
currPage.setData({ sharepop: true })
```
路由传参：
```
 onLoad: function(option){
    console.log(option.参数)  
  }
```
圆形旋转用：wx.onAccelerometerChange加速计，手机垂直地面时,左倒x=-1,右倒x=1。绝对值大于1表示在甩。
```
rotate:function(){
  that.prevtime = new Date().getTime();
  that.once = 100;
  that.prevdiec=0;
  wx.onAccelerometerChange(function (res) {
    console.log('x: '+res.x, 'y: '+res.y, 'z: '+res.z)
    let directions = res.x.toFixed(2);
    that.currtime = new Date().getTime();
    let x = that.currtime - that.prevtime;
    that.currvdiec = directions * 360;
    if (x > 200 && (Math.abs(that.currvdiec - that.prevdiec) > 20)) {
      that.prevtime = that.currtime;
      that.prevdiec = that.currvdiec;
      that.setData({
        rotate: directions*360
      })
    }
  })
}
```
滑块组件： 比手写滑动算法好用（上下滑时不允许左右滑，左右滑时不允许上下滑）
<swiper current="1"  class='swiperbox' interval="0" duration="500"  bindchange="SlideFinish"> 
	<swiper-item><view /></swiper-item> 
</swiper>

 sin30°就得写成 Math.sin（30*Math.PI/180）
`dy=dc*sin; dx=dc*cos;`
wx.canvasGetImageData无法在组件中使用
只有[].every能中途终止

### mpvue
1. 新增的页面需要重新 npm run dev 来进行编译

### D3
SVG原生元素：矩形 圆 椭圆 线段 折线 多边形 路径 
svg.selectAll("rect").data(dataset).enter().append("rect") 有数据，而没有足够图形元素的时候，使用此方法可以添加足够的元素。
css: style/attr()
  1. rect `fill`背景色 x y width height `transform:translate(x,y)`定位
  2. circle cx cy r fill
  3. text x y dx dy
特效： circle.transition().duration(1000).ease('bounce').style('fill','red').attr('cx', 300) 
比例尺:将某一区域的值映射到另一区域，其大小关系不变。开发者需要指定 定义域domain 和 值域range 的范围
  1. 线性比例尺，能将一个连续的区间，映射到另一区间。要解决柱形图宽度的问题，就需要线性比例尺。
  2. var linear = d3.`scaleLinear`().domain([d3.min(dataset), d3.max(dataset)]).range([0, 300]); linear(min)返回0  domain的最小值映射到range的最小值，最大值同理。
  3. var ordinal = `d3.scaleOrdinal`().domain([]).range([]); 映射离散值按索引一一对应。
坐标轴：svg.append("g").call(`d3.axisBottom`(linear).ticks(7)); 
没有元素与之对应的数据称为 Enter。元素和数据对应称为 Update。没有和数据绑定的元素称为 Exit。
.on("mouseover",function(d,i){d3.select(this).attr("fill","yellow");})
.on("mouseout",function(d,i){d3.select(this).transition().duration(500).attr("fill","steelblue");});
# word介绍-能做什么
日历思路
首行 要知道有几个项 7-n得出剩余位置 n是1日位
要知道有几行 x/7 
末行 总天数-首数-中间行*7
求总行数 
获取当前星期 new Date(str).getDay() 0-6 日至六
getMonth() 0-11 一至十二

<form bindsubmit="formSubmit" report-submit="true">
<button formType="submit" open-type='share' >转发到好友或群聊</button>
<button formType="submit" bindtap='bindcof'>生成朋友圈分享图</button>
    "enablePullDownRefresh":true
单页思路
下拉刷新的每次数据保存在store,tab状态记入store,init画布数据记入store 
组件出生时从store载入数据。
下拉不会刷新页面，只是请求数据而已.store改变应该监听到列表数据setData,从index注入到组件！
切换tab是否刷新数据？为性能暂不处理，可设超过1分钟切换tab刷新

公司公用组件：

http实时交互：每个请求返回一个list,包含服务端的变化,去请求对应的接口。服务端要记住前端请求了哪些，这要求数据库信息有序号。

离线缓存思路：
把app.js等缓存进catch,用ajax更新动态内容
线上改动时：js判断是否页面联网，联网就更新

ajax下载图片等blob二进制
`window.URL.createObjectURL(blob)`
```
axios.get('http://app.gym2.com/?file_name=00.gif', {onDownloadProgress: e => this.progress = (e.loaded / e.total * 100 | 0) + '%', responseType: 'blob'})
.then(v => this.$set(this.img, 'src', window.URL.createObjectURL(v.data)))
```