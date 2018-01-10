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
  **问题**：
    子元素的层级超不出容器的z-index
    absolute层级比z-index高，兄弟元素也要position
this.route：
  getCurrentPages()保存了页面数组栈，
  wx.redirectTo 重定向覆盖当前栈 wx.reLaunch刷新进入 wx.switchTab打开子页  wx.navigateTo wx.navigateBack
WXML：
  wx:if  wx:elif  wx:else
API：
  wx.getSetting 了解是否授权
  <button open-type='share'> 分享弹框  open-type="contact" 跳客服会话
  wx.navigateToMiniProgram 跳转别的小程序

### 微信小程序
和Vue的不同：
  单向绑定 this.setData({},()=>) 修改data并渲染，能设置obj.key属性，也能设置并新建不存在的对象和属性。
  没有method属性,挂方法和react一样。 它的methods在自定义组件上，而且data仍然是对象。
注意：
  `"{{false}}"`和`"false"` 后者为真
  `"{{a}} "`等同于`"'{{a}}'+' '"`
   `wx:for="arr"` 等同于 `wx:for="{{['a','r','r']}}"` 所以要防止空格导致变为字符串数组。
   静态样式不要写在style中，style适合动态渲染样式

事件：`bind:tap="回调名"` catch:tap阻止冒泡 capture-bind:tap捕获 capture-catch:tap阻止捕获(包括后面的冒泡)
 触摸事件 tap touchstart touchmove touchcancel touchend longpress长按 
 过渡事件 transitionend animationend animationstart animationiteration一次迭代结束 
其他事件都是非冒泡。data-属性挂载dataset对象下。`target`指向发生事件的组件，`currentTarget`指向绑定事件的组件。

生命周期：
  App生命周期： onLaunch初始化 onShow前台 onHide后台 onError 时间参数能确定小程序入口
  Page生命周期： onLoad加载 onReady初次渲染 onShow/onHide显示隐藏 onUnload页面卸载(点左上退回健) ---onShow快于onReady
  组件生命周期：`created/attached`组件进入页面 `ready`组件节点布局完成 `moved`组件在节点树移动 `detached`页面移除组件
  组件relations生命周期：`linked`插入后 `linkChanged`移动后 `unlinked`移除后
Page页面事件： onPageScroll滚动 onPullDownRefresh下拉 onReachBottom上拉触底 onShareAppMessage点击转发按钮

getApp().globalData 全局变量属性
支持文件模块： module.exports = {} require()

模板和组件的区别及思路：
  组件wxss的样式只对组件内的节点生效。 
  模板没有父级，作用只是切分wxml和wxss和js代码片段,要各自导入，data数据只共享当前页面的注入部分。
  init函数下把that.func=func，可以把自定义方法挂到其他对象中去，方便做函数级的mixin封装。

用CSS3动画比这垃圾API强多了。keyframes触发animationend事件。
#### WXML
定义模板：<template name="{{a ? 'm':''}}"></template> 引入<import src="item.wxml"/> 调用<template is="m" data="{{...item}}"/>  
  扩展运算符把对象属性当做参数传入，模板内容可直接调用。{{...item}}等同于{{a:1,b:2,c}}这里的c表示c:c变量。有自己的作用域，只能引用模板内定义的wxs。
  <include src="header.wxml"/>只用来引入代码，切分文件
wx:for="{{arr或obj}}" 循环次数等同对象长度 默认项item，默认索引index，
  嵌套wx:for貌似只是数据层为了拿到循环的变量？展现只靠最里面。wx:for-item/index自定义项、索引，用来做条件运算的。
  <block wx:for> 是渲染多个结构块
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


#### 自定义组件
定义页的json设为 "component": true
使用页的json设为 "usingComponents": { 组件名: 路径 }
把组件插在调用处。小写字母和下划线。
Component({})
 properties属性 data数据 methods方法
 observer属性改变执行该函数。驼峰写法：定义和表达式内。-符写法：传入在组件上。
 <popup taps="{{taps}}" /> 下传属性
 
`<slot></slot>`是给使用页插节点的。像参数。
  默认只有一处，多处要设置Component.options.multipleSlots为true
  使用页的`<view slot="a">`会插入到`<slot name="a">`
  
组件生命周期：`created/attached`组件进入页面 `ready`组件节点布局完成 `moved`组件在节点树移动 `detached`页面移除组件
组件relations生命周期：`linked`插入后 `linkChanged`移动后 `unlinked`移除后
  父子组件都要设Component.relations属性。
  获取关联组件实例的有序数组：this.getRelationNodes(url)
	
自定义事件：
  组件内通过原生事件回调手动触发自定义事件：`this.triggerEvent('xxevent',{},{})`
  组件外监听自定义事件：`bindxxevent="xx"` e.detail是二参 xx是父组件的方法。默认不冒泡。
  composed: true事件会冒泡进入父组件的模板内部，然后进入页面的父组件
  
module.exports = Behavior() 类似mixins,抽象出选项的公共部分。组件通过behaviors属使用。
  覆盖优先级：同名属性/方法：组件>后behavior>前behavior data:对象则合并，其他相互覆盖。 生命周期函数：都调用。
  
#### 性能
单包<2M 所有包<4M 打开对应子包页时下载子包。
按需加载：app.json subPackages 子包之间不能引用js、template。
小程序进入后台5分钟微信销毁，除了置顶的小程序

性能：
  WebView和js数据传输是通过字符串拼接。
  微信小程序CDN的Gzip对文本压缩好，图片不好。
  后台页面最好不要setData。每次setData不要传太多数据。
  图片过大、过多会引发内存回收webview

#### 动画
创建实例 wx.createAnimation()
一组 step() 同时开始，可传入配置指定当前组动画，不同时开始的用step衔接。
提交 this.setData({Data:animation.export()}) 就算有多组貌似也只有一次提交
#### DOM
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

# word介绍-能做什么
小程序的视图层目前使用 WebView（app内嵌网页）作为渲染载体。
原生组件：滑条选择器，拖拽、音视频、地图、相机、实时音视频录制、实时音视频播放、内嵌网页、客服会话、
系统功能：操作文件/加速度/罗盘/打电话/扫码/蓝牙/截屏/屏幕亮度/振动/通讯录/NFC/WiFi
数据分析：用户访问趋势、用户访问分布、用户访问留存、页面访问数据。

照相自定义截图
淡入淡出图廊
选择音乐
全屏