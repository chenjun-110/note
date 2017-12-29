以下都和data属性绑定，data属性渲染后手动赋值全部会实时生效

{{m}} 双括号变量
v-bind:title="m" v-bind绑定html属性
v-if="m" 控制本节点存在性 false用注释替换节点  v-shows适合高频切换
v-for="(v,i) in arr" 数组批量渲染本节点，v表示每项,可以迭代对象
v-on:click="方法名" @事件绑定方法 methods属性存方法 事件修饰符有原生事件能力 按键修饰符缩小触发范围
v-model="m" input绑定 复选框注入m的值为true/false 单选框和下拉框注入的值是value属性值

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

#### 生命周期
mounted 挂载后（不包括子组件） 调用this.$nextTick包括子组件

#### vue-cli
.vue
export default{} 等同于 new vue({})

本地访问打包后：把dist子内容复制到KOA的静态目录下。 config.index.js修改assetsPublicPath

#### vue-router
点击 <router-link to="/foo">Go to Foo</router-link>
渲染 <router-view></router-view>
router必须传入根实例
激活class="router-link-exact-active router-link-active"
path: '/user/x' 指向 to="/user/x"
path: '/user/:id' 指向 to="/user/所有"  {{ $route.params.id }}可取路由值 冒号代表任意值，id只是取值用的 $route.query取问号查询参数 复用路由组件会导致生命周期失效,需watch它的$route或使用beforeRouteUpdate
嵌套路由子内容：用children属性和<router-view/>
手动点击 this.$router.push('aa') 或this.$router.push({ path: 'aa', query: { a: '1' }})
以名字来跳转 this.$router.push({ name:'user'}) 等价于 <router-link :to="{ name: 'user', params: { a: 1 }}">
一路由控制多组件：多个<router-view name="a">和components:{a:A,default:B}
把路由传入组件属性 props: true 不用调用$router

#### 其它：
`#`是用来指导浏览器动作的,表位置，也可以用来显示个性化内容
  ajax请求自动剔除它。 
  如果#有意义需转码 
  改变#会改变浏览器的访问历史不会重载,触发onhashchange
  window.location.hash
  Google爬虫读不到#，读得到`#!`转成查询字符串 /#!/username等同于/？_escaped_fragment_=/username


#### 微信平台
接口的调用需要先获取access_token 2小时内有效
获取OpenID是无需同意，获取用户基本信息则需用户同意
资质认证通过，才可获得公众号接口。
两种公众号：订阅号和服务号 权限不同接口不同 企业号只有通讯录成员可关注
`http://res.wx.qq.com/open/js/jweixin-1.2.0.js`
生成签名步骤:请求access_token -> access_token获取jsapi_ticket -> appId jsapi_ticket、noncestr、timestamp、url拼接，使用SHA1加密算法生成签名 -> 把数据给前端向微信官方注入`wx.config`配置
SDK只能调起的授权过的域名，变化url的SPA可在每次url变化时进行调用`wx.config`

#### 微信SDK
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

#### 微信小程序
和Vue的不同：
  this.setData({},()=>) 修改data并渲染，能设置obj.key属性，也能设置并新建不存在的对象和属性。
  没有method属性,挂方法和react一样。
注意：
  `"{{false}}"`和`"false"` 后者为真
  `"{{a}} "`等同于`"'{{a}}'+' '"`
事件：`bind:tap="回调名"` catch:tap阻止冒泡 capture-bind:tap捕获 capture-catch:tap阻止捕获(包括后面的冒泡)
 触摸事件 tap touchstart touchmove touchcancel touchend longpress长按 
 过渡事件 transitionend animationend animationstart animationiteration一次迭代结束 
其他事件都是非冒泡

App生命周期： onLaunch初始化 onShow前台 onHide后台 onError 时间参数能确定小程序入口
Page生命周期： onLoad加载 onReady初次渲染 onShow/onHide显示隐藏 onUnload页面卸载(点左上退回健) ---onShow快于onReady
Page页面事件： onPageScroll滚动 onPullDownRefresh下拉 onReachBottom上拉触底 onShareAppMessage点击转发按钮

getApp().globalData 全局变量属性
支持文件模块： module.exports = {} require()

this.route
  getCurrentPages()保存了页面数组栈，
  wx.redirectTo 重定向覆盖当前栈 wx.reLaunch刷新进入 wx.switchTab打开子页  wx.navigateTo wx.navigateBack

WXML
定义模板：<template name="msgItem"></template> 调用<template is="msgItem" data="{{...item}}"/>  扩展运算符把对象属性当做参数传入，模板内容可直接调用。{{...item}}等同于{{a:1,b:2,c}}这里的c表示c:c变量
wx:for="{{arr或obj}}" 循环次数等同对象长度 默认项item，默认索引index，
  嵌套wx:for貌似只是数据层为了拿到循环的变量？展现只靠最里面。wx:for-item/index自定义项、索引，用来做条件运算的。