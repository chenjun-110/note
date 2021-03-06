[TOC]

##### 目录结构

    1. src 代码区
    2. bin-debug 编译和debug区 (不动)
    3. libs 库文件
    4. resource default.res.json配置资源
    5. template 调试(不动)
    6. egretProperties.json 项目配置
        1. path：是库的版本，没写则升级，写了则不升级。`"${EGRET_DEFAULT}"`引擎路径，`"${EGRET_APP_DATA}/4.0.3"`引擎历史版本路径。
    7. index.html 入口
        1. game_files：由`build -e`构建生成
        2. modules_files对应：libs/modules、项目配置中的mudules
        3. div:旋转模式、适配模式、帧频、游戏宽高、、多指数、显示fps/脏矩形区域/fpslog/过滤log/ps面板样式.
        4. script:egret.runEgret({}) 渲染模式、音频类型、抗锯齿、缩放画布
          运行：构建egret build->调试egret startserver -a
          生命周期egret.lifecycle
    8. onPause：进入后台
    9. onResume：进入前台
  egret.ticker
    10. pause()：关闭渲染心跳
    11. resume():打开渲染心跳
   自定义白鹭遇到宿主环境独有API：应先在ts中声明->事件监听/每帧判断
   编译顺序报错：调用其他文件的类时声明引用来源注释`///<reference path="TestA.ts" />`
   七大显示类：
    12. DisplayObject 显示对象基类，所有显示对象均继承自此类
   2. Bitmap	显示位图
      	. Shape	显示矢量图
            	. TextField	文本类
            	. BitmapText	位图文本类
            	. DisplayObjectContainer	显示对象容器接口
            1. Stage
            2. ScrollView
            3. Sprite
         		 Sprite	矢量绘制的显示容器
        13. Stage 舞台类
        14. MovieClip MovieClipData MovieClipDataFactory
      容器API：
      `var shape:egret.Shape = new egret.Shape();`
        15. shape.x/y 图片锚点位置(笛卡尔坐标)
        16. scaleX/Y缩放 alpha透明度 rotation旋转角度 skewX/Y横纵向斜切 visible是否可见 width/height anchorOffsetX/Y改锚点自己的坐标
        17. 遮罩：mask=new egret.Rectangle(,,,) 仅显示对象的遮罩区 .mask=obj 显示对象obj的轮廓就是遮罩区(obj要在列表，要填充) maks=null和$maskedObject=null删除遮罩
        18. 碰撞检测：`shp.hitTestPoint(x,y,true)`判断某点，返回true是发生了碰撞。 带3参是精确碰撞(消耗性能)，不带是非精确。适用于判断点击区域范围是否为目标范围。 pixelHitTest位图透明碰撞
      `var container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();`
        19. container.globalToLocal(0,0): 全局坐标(0,0)转容器内坐标.值输出到返回值的x、y属性。 localToGlobal是本地转舞台。
        20. addChild:  对象放在显示列表的顶层。同一对象多次添加只绘制一次(跟在哪个容器无关)。深度默认从0开始，每次+1。先把显示对象容器实例addChild到this -> 再把Shape实例addChild到container 注意：addChild进去的对象用contains会返回true
        21. 容器对象.removeChild( 显示对象 ): 对象移出显示列表
        22. 插到最前列：this.setChildIndex(obj, this.numChildren - 1)
        23. 增删改对象：`addChildAt`(显示对象, 深度值)： 插入到指定z-index。 `removeChildAt`(深度值)：移出指定深度对象 `removeChildren`():移出所有子对象 交换对象深度：`swapChildren`(对象, 对象)/`swapChildrenAt`(深度值, 深度值) `setChildIndex`(显示对象, 新深度值)：修改对象深度
        24. 容器获取子对象：推荐`getChildAt`(深度值)。 `getChildByName`(name属性) 
        25. this.stage: 获取对象的容器？

##### 矢量画图API

 shape/Sprite实例：`spr.graphics`前缀

  1. 基础过程： beginFill() -> drawReact/drawCircle() -> endFill() 
  2. 边框/线条样式：lineStyle(线宽，颜色)
  3. 清空：clear
  4. 圆：drawCircle(x,y,r) xy相对于shape对象锚点
  5. 线：起点moveTo(x,y) 节/终点：lineTo(x,y)、curveTo(x1,y1,x2,y2) 1是控制点，2是终点
  6. 圆弧：drawArc(x,y,r,ang1,ang2,true) 围绕圆心画弧线(可填充成扇形/拱形)，长度绘制从起弧->终弧(0是x轴最右处)，顺逆时针。
  7. 圆角：drawRoundRect()
文本API:
  1. `new egret.TextField()`
  2. text文字 size/default_size字号 textColor/default_textColor字色  width/height不设则根据字 bold/italic=true加粗斜体
  3. 滚动条： `bigText.scrollRect = new egret.Rectangle(0, 0, 200, 50);` 设置x/y再赋值会scrollRect可以滚动
  4. 字体：fontFamily(没有则默认)  native需要default_fontFamily，值为路径("/"开头是从主目录查找，不加是系统目录) egret.registerFontMapping(自定义字体名, "fonts/font1.ttf"); 建议发布时手动拷贝字体到项目内
  5. 布局：`textAlign`默认左对齐 值：egret.HorizontalAlign.RIGHT右对齐/CENTER居中。 `verticalAlign`默认顶对齐 值：egret.VerticalAlign.BOTTOM底对齐/MIDDLE垂直居中。注意：相对文字宽高
  6. 描边样式：stroke描边宽度 strokeColor描边颜色
  7. 混合样式：
        1. js写法：`textFlow`=[{text:"a",style:{"size":6}},{text:"b",style:{"italic":true}}] `text:"\n"`换行
            2. HTML写法：`textFlow=(new egret.HtmlTextParser).parser("")` 默认"",有样式"<font color="" size="" fontFamily=""><i></i><b></b></font>"
  8. 输入框：`type` = egret.TextFieldType.INPUT 默认是没背景色的，需要额外的Shape绘制
        1. 获得焦点：按钮监听TOUCH_BEGIN -> 调用text.`setFocus()`
            2. 输入样式：inputType=egret.TextFieldInputType.TEXT/PASSWORD/TEL displayAsPassword=true隐藏密码

##### 事件

`circle.touchEnabled = true; circle.addEventListener(egret.TouchEvent.TOUCH_TAP,fuc,this);`

    1. 手指：`egret.TouchEvent.TOUCH_BEGIN TOUCH_END TOUCH_TAP`
    2. 顺序：先监听TOUCH_BEGIN -> 在回调里监听TOUCH_MOVE TOUCH_END -> switch(e.type)
    3. 移除事件：this.stage.removeEventListener
    4. 文字超链接事件：egret.TextEvent.LINK 会绑定textFlow的`stye:{"href":"event:abc"}`e.text取到abc stye:{"href":"www.baidu.com"}点击则跳转
    5. 滚动事件：TOUCH_BEGIN->TouchCancel 
    6. http事件：egret.Event.COMPLETE egret.IOErrorEvent.IO_ERROR egret.ProgressEvent.PROGRESS
    7. 位图事件：RES.ResourceEvent.GROUP_COMPLETE
    8. 计时事件：egret.TimerEvent.TIMER计时开始 egret.TimerEvent.TIMER_COMPLETE计时结束
    9. 帧事件：egret.Event.ENTER_FRAME 帧率：this.stage.frameRate
    10. 音频事件：`egret.Event.COMPLETE`音频加载完成 `egret.IOErrorEvent.IO_ERROR`音频加载失败
    11. `touchChildren=false;`性能高，
    12. 数组更改事件：`eui.CollectionEvent.COLLECTION_CHANGE`
    13. 加载skinName事件：`eui.UIEvent.COMPLETE` 在createChildren之后触发
    14. event:
             1. 点击坐标：e.localX/localY
             2. 手指坐标：e.stageX/Y 
             3. 手指按到的当前对象：e.currentTarget
             4. 多点触摸标识：e.touchPointID
    15. 事件搭配：
           1. egret.Event.COMPLETE -> new egret.Sound/Video() sound.load() -> new egret.HttpRequest();
    16. 事件代理：
           1. 单选：RadioButton.group监听egret.Event.CHANGE
    17. 事件传参：this.reset.addEventListener(egret.TouchEvent.TOUCH_TAP,this.fuc.`bind(this,"reset")` ,this) //回调第一个参数是传参，第二个参数是event对象。 不管用就`bind(null,[this,'reset'])`如果事件在回调内绑定好像拿不到回调内的局部变量？
    18. 阻止冒泡：`e.stopImmediatePropagation()`

###### 自定义事件

  1. 事件类：

        ```
        class abc extends egret.Event {
        	constructor (type,bubbles,cancelable) {
        		super(type,bubbles,cancelable)
        	}
         }
        ```

  2. 注册：`.addEventListener(abc.type, f.a, f)` f是接受事件的类,2参必是返回空值的函数格式，5参可设优先级数字 .removeEventListener参数一致

  3. 触发：`var msg = new abc(abc.type)` `this.dispatchEvent(msg)` 事件类的实例msg触发时传入f.a回调参数

  4. 检测是否注册：事件发送者.hasEventListener(事件类型)

##### http请求

    1. 创建：var request = new egret.HttpRequest()
    2. 响应类型：responseType=egret.HttpResponseType.TEXT/ARRAY_BUFFER 
    3. open(url,egret.HttpMethod.GET) -> setRequestHeader("Content-Type", "application/x-www-form-urlencoded") -> send()
    4. COMPLETE事件回调里获取返回信息：event.currentTarget.response
    5. PROGRESS事件回调里获取进度条： Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%"
    6. 请求参数：GET的参数就写在url内，POST的参数去掉问号传给send()。
    7. 加载位图：new egret.ImageLoader -> http对象.once(,,null)注册 -> load(url) -> 回调里new egret.Bitmap(e.currentTarget.data) - crossOrigin='anonymous'匿名跨域访问
    8. 请求事件：监听用once

###### Soket

创建：new egret.WebSocket()
读取数据：readUTF()
发送数据：writeUTF()
事件：egret.Event.CONNECT连接成功 egret.ProgressEvent.SOCKET_DATA收数据 egret.Event.CLOSE连接关闭 egret.IOErrorEvent.IO_ERROR连接错误

##### 位图

    1. new egret.Bitmap()
    2. 纹理：texture=RES.getRes(图name)
    3. json配置:{"groups":[],"resources":[{"name":,"type":,"url":}]}
    4. 顺序：RES监听位图事件 -> 插入位图 -> RES.loadConfig(jsonUrl,资源目录/) -> RES.loadGroup 
    5. 九宫格属性：拉伸时保护边框不变形scale9Grid=new egret.Rectangle(w,h,W,H)图1区宽高，2区宽，4区高(整数)
    6. 平铺属性：fillMode = egret.BitmapFillMode.REPEAT默认是拉伸
    7. 纹理集：用Texture Merger工具制作纹理集json -> 改配置文件type:'sheet'，keys和name值为json名 -> new egret.Bitmap(RES.getRes("jsonname.name1"))
    8. 截图：
        1. 截图转存本地：texture=RES.getRes() texture.saveToFile(截图格式,截图名,new egret.Rectangle(2,2,1,1)) 截图格式：'image/png'/ 'image/jpeg'
            2. 截屏显示对象：new egret.RenderTexture -> drawToTexture(displayobj，rect) -> 赋值给new egret.Bitmap的texture
    9. 图片重叠时：img.blendMode = egret.BlendMode.NORMAL;覆盖 egret.BlendMode.ADD叠加透明变亮 egret.BlendMode.ERASE重叠区删除
    10. 滤镜：
          1. 光晕：img.`filters` = [new egret.GlowFilter(颜色，透明，x模糊,y模糊，强度，次数，方向，挖空)]
          2. 阴影：new egret.DropShadowFilter()
          3. 变色：new egret.ColorMatrixFilter(矩阵数组) 该实例的matrix属性获取矩阵数组
          4. 模糊：new egret.BlurFilte(x,y)
    11. 位图字体：RES.getResByUrl获取fnt文件 -> 回调参数赋值给BItmapText.font -> 修改text属性 `<e:BitmapLabel text="1" font="1_fnt" />`
    12. 
         时间：
    13. 计时器：new egret.Timer(间隔，次数) -> 监听计时器事件 -> timer.start()开始计时
    14. 60频率：egret.startTick(fuc,this) 回调返true则重绘 egret.stopTick(fuc,this)停止
    15. 获取框架启动时间：egret.getTimer() 依赖系统本地时间不太可靠
   多媒体：
    16. 音频：
         1. sound加载：new egret.Sound() -> 监听音频加载 -> sound.play()播放
         2. URLLoader加载：new egret.URLLoader() -> 监听音频加载事件 -> sound=loader.data; sound.play() -> dataFormat=egret.URLLoaderDataFormat.SOUND -> load(new egret.URLRequest("resource/sound/sound.mp3"))
         3. res加载：var sound = RES.getRes("sound_mp3") -> sound.play()
         4. api:channel=sound.play(播放位置,播放次数) channel.stop() volume音量 position当前播放位置 sound.length时长
    17. 视频：
         1. new egret.Video
         硬件信息：
    18. egret.Capabilities.isMobile移动系统/language语言/os操作系统/runtimeType项目类型
    19. 陀螺仪：new egret.DeviceOrientation() -> 监听egret.Event.CHANGE -> orientation.start() | e.alpha/beta/gamma
    20. 地理位置：
         1. new egret.Geolocation() -> 监听egret.Event.CHANGE -> gps.start() e.latitude/altitude/longitude/speed
         2. 监听用户手动拒绝事件： egret.GeolocationEvent.PERMISSION_DENIED
         3. 失败事件：egret.GeolocationEvent.UNAVAILABLE e.errorMessage/errorType
           调试：
    21. 开发版：if(DEBUG){} 发行版：if(RELEASE){}  发行后会移除DEBUG代码块
    22. log: 先开启data-show-log="true" ->  egret.log()
    23. 自动保存：egret startserver -a / egret startserver -port 3001 -a另起端口 -a是自动编译
   原生：
    24. 安卓配置在proj.android/AndroidManifest.xml
    25. IOS配置在ViewController.mm
   问题：
    随机色：`(Math.floor(Math.random() * 0xff)<<16）+(Math.floor(Math.random() * 0xff )<<8）+Math.floor(Math.random() * 0xff）`
    cacheAsBitmap = true; 对象转位图，频繁改位置不用重渲
    父级宽度：this.stage.stageWidth
    Sprite和Shape的区别？
      this.stage.addEventListener(egret.Event.ACTIVATE,this.onActive,this)
    egret.registerImplementation("eui.IAssetAdapter",assetAdapter); eui.IThemeAdapte
    Socket
##### 动画

###### Wing编辑器: 

    1. 新建组 - 新建动画 - 右键设置最少2个关键帧 - 右键设置补间动画 - 把组名id调用 a.play(0) a.stop() a.pause() - 动画完成事件` this.a.addEventListener('complete', this.onTweenGroupComplete, this);`
    2. 帧事件：ENTER_FRAME是帧频，startTick是60帧。egret.Ticker.getInstance().register(v,this) / unregister 把
    3. 
  思路：墙的四个边放上透明的条形图片，用这些透明图来和子弹判断碰撞，就可以知道碰撞的是哪个边。
###### Tween

egret.Tween.get( shp, { loop:true,onChange:fuc} ).to( {x:10}, 500, egret.Ease.backInOut)
.call() 动画结束后都回调
.wait().to() 延迟时间
onChange: 执行次数由时间决定。

##### Tiled

1.下载tiled编辑器，设置地图属性-图块层格式(XML), .tmx文件和图片都放入resource
2.引入tiled官方库，渲染tiled.TMXTilemap对象。
控制首个对象层的子元素：this.tmxTileMap.getObjects()[0].getObjectById(1).x += 50
getlayers()

##### 游戏设计

    1. 关卡地图：用json里的数组控制游戏地图上的格子。
    2. 游戏策划：世界观
    3. MVC:数据、视图、逻辑。
    4. 一维数组能描述的逻辑比二维好。
    5. 元素：类型、下标

##### RES

顺序：加载资源配置loadConfig -> 加载资源组loadGroup -> 加载资源getRes
自定义解析类代替默认解析类：registerAnalyzer
清除已加载资源的缓存：RES.destroyRes()
加载：loadGroup() 所有资源会载入缓存，之前要监听3个资源组事件，e.groupName正在加载的组名	
获取：RES.getRes RES.getResByUrl(适合三方网络资源/本地，不需要加载配置) RES.getResAsync(只能得到已缓存的)
合并/创建资源组：RES.createGroup
CDN:`RES.web.Html5VersionController.prototype.getVirtualUrl = function (url) {return url = Configure.CDN_HOST + "/" + url + '?v=' + Configure.resVersion;}`

##### EUI

自适应流式布局:是层层向上测量，层层向下布局
逻辑组件+皮肤组件
动态加载：EXML.load(url,this.load,this) -> new eui.Button() -> button.skinName=url ->this.addChild(button)
EXML写在js内：EXML字符串置换上面的url -> EXML.parse(text) -> new parse()
EXML格式：

    1. <e:Group 表示继承eui.Group类。 
    2. class="app.my" 表示app模块内的my类
    3. <e:Image /> 位置在根节点内部，表示在constructor内 new eui.Image() -> this.addChild(image)
        1. source  图片路径
        2. scale9Grid  给父级设置九宫格.
        3. id 声明pubilc变量
        4. height="100%" 等价 image.percentHeight = 100
        5. 如果子节点是父节点的默认属性，可不写属性节点(属性内部的还是要写)
        6. horizontalCenter="0" 水平方向居中 verticalCenter="0"垂直居中
        7. label 文字
        8. top 同时约束相对位置和宽高
    4. 数据绑定：text="{data.label}" 这里绑定的是父级data属性的label值
    5. skinName 引用其他exml皮肤类，值对应class,相当于把被引用的标签写为它的子节点。父级exml声明的属性会传到skinName子级作`"{}"`变量。
    6. states状态
        1. 对应各个子节点：source.down 或 includeIn="down"
        2. excludeFrom表示不存在某个状态时
        3. js内设置button.currentState = "down"
        4. js内的this.invalidateState() -> 触发getCurrentState() 后者的return值就是状态值
    7. 皮肤组件<e:Skin>的同名变量值会赋值给逻辑组件button.skinName的pubilc变量。
    8. thm.json:skins是默认皮肤，exmls是预加载的文件列表
        1. 版本号：url加？v=123
        2. 异步加载主题：new eui.Theme("resource/thm.json", this.stage)
        3. 更改根目录前缀：EXML.prefixURL 
    9. 自动测量：不显示设置宽高
  布局：控制EUI的layout属性
    10. 基本布局：new eui.BasicLayout() 常用于外层Group
    11. 水平布局：new eui.HorizontalLayout() -> gap间隔、paddingTop距顶、horizontalAlign=egret.HorizontalAlign.CENTER集体水平居中
    12. 垂直布局：new eui.VerticalLayout() -> 属性同上
    13. 网格布局：new eui.TileLayout() -> requestedColumnCount=2双列、horizontalGap/verticalGap水平垂直间距、columnAlign/rowAlign可见列行与容器对齐 
    14. 
   控件：
    15. 文本：new eui.Label() / <e:Label/> 属性：width height fontFamily textColor size bold italic textAlign verticalAlign lineSpacing text style要配置主题
    16. 图片：new eui.Image() 属性：source图片路径 scale9Grid width height 
    17. 按钮：new eui.Button() 属性：skinName皮肤exml label文字 width height enabled禁用 x y (<eui.Label>btn.labelDisplay)转换为文本对象
    18. 多选框：new eui.CheckBox() 属性：label x y enabled禁用 事件：eui.UIEvent.CHANGE选中时e.target.selected为true
    19. 单选框：new eui.RadioButton() / new eui.RadioButtonGroup() 属性：label value数据 groupName group值为单选组实例 事件：同上，e.target.selectedValue取value值
    20. 开关：new eui.ToggleSwitch()
    21. 标签页：new eui.ToggleButton() 属性：selected选中
    22. 滑条：new eui.HSlider() / new eui.VSlider() 属性：width x y minimum maximum value默认值
    23. 进度条：new eui.ProgressBar() 属性：value当前进度值 minimum maximum width height direction=eui.Direction.BTT垂直条 
    24. 输入框： new eui.EditableText() 要搭配背景图 属性：displayAsPassword密码 left左距 textColor text width height e.target.text
         容器：
    25. 简单容器：eui.Group 适用不带皮肤的，类似Sprite,内部组件要放在 protected createChildren(){super.createChildren()} 中
         1. removeChildren删除内部所有显示对象
         2. scrollEnabled = true 超出容器部分隐藏
    26. 层叠容器:new eui.ViewStack() 只能显示一个子项。属性：selectedIndex默认项。 内部组件放置同上
    27. 面板容器：基于Group但eui.Panel()放在createChildren内
         1. 必须有3个id：moveArea/titleDisplay/closeButton
    28. 滚动容器：new eui.Scroller() -> 把Group实例赋值给viewport属性 内部组件放置同上 属性：Scroller.viewport.scrollV/scrollH纵横向滚动位置 Scroller.height滚动区域高度 Scroller.viewport.contentHeight滚动内容高度 stopAnimation()停止滚动动画 scroller.verticalScrollBar.autoVisibility/visible是否显示滚动条 滚动回弹时间0.5s
   数据：
    29. 数据容器：new eui.ArrayCollection([]) -> new eui.DataGroup() -> dataProvider=arc ->itemRenderer=类(这个类有数据！)
         1. 大数据优化：useVirtualLayout = true;
         2. itemRenderer类：数组改变则触发dataChanged()显示几条就循环调用几次,this.data是数组里显示的1条数据，继承在原型上无需定义。
    30. 数组集合：eui.ArrayCollection 可监听数组更改事件eui.CollectionEvent.COLLECTION_CHANGE e.kind操作类型、e.target.length
         1. addItem()相当于push addItemAt(,index)添加到指定索引
         2. getItemAt(index)获取值 getItemIndex()获取索引 length获取数组长度
         3. replaceItemAt(,index)替换数据
         4. removeItemAt(index)删除某个 removeAll()全删
    31. 列表：new eui.List() -> dataProvider=arc -> itemRendererSkinName=exml列表样式({data}可取到数组各项) -> 
         1. 属性：selectedIndex默认项 allowMultipleSelection可多选
         2. 事件：eui.ItemTapEvent.ITEM_TAP点击列表项 list.selectedIndices/selectedItems选中项 requireSelection至少有一个选中




##### MovieClip

1. 先把json和png写入res.json的resources
2. 创建：new egret.MovieClipDataFactory(json,png) -> new egret.MovieClip( mcFactory.generateMovieClipData( name ) )
3. 播放：this.addChild() -> .gotoAndPlay(labelsname,1)

##### PureMVC

比传统的3个单例类多了1个Façade单例类。它负责通信其它3个。Proxy、Mediator、Command解决了每个模块都有自己的MVC。
class AppFacade extends puremvc.Facade
通知与事件的区别：通知不用冒泡，没有父子级关系。
直接调用：facade.retrieveMediator 通知调用：Notification
Mediator通过listNotificationInterests注册、Command通过facade.registerCommand()注册

###### Command

1. MacroCommand多命令：initializeMacroCommand()里面调用添加命令类`this.addSubCommand(cmd-n)` execute()会循环数组调用命令类的excute，但不用重写定义它
2. SimpleCommand单命令：注册命令`(new acommand()).registerCommand()`/注册代理`this.facade.registerProxy(new HallProxy())`/注册视图`this.facade.registerMediator(new mediator(notification.getBody()))` 只有一个execute方法接收一个nofitication实例作为参数
3. Command里面注册
   Mediator：
4. 注册时会调用listNotifications()返回通知数组，用来接收消息。
5. 接收通知时调用handleNotification()。它内部可做简单逻辑。通知名notification.getName(),通知体notification.getBody()
6. super(name,view)初始化new时要传本类的名字和对应的UI.
7. 不常用：onRegister/onRemove在facade上注册销毁。getMediatorName返回名字 set/getViewComponent设置UI
8. 在facade上registerMediator时，底层调用Mediator的onRegister(),它的底层又调用View的registerMediator()
   Proxy:
9. super(name,data) 初始化必须的，data可以不传在内部定义私有变量
10. 不常用：set/gatData操作data,getProxyName，onRegister/onRemove同上
11. 只能发消息，不能接收。
    sendNotification:
12. 顺序：sendNotification -> Command接收、在execute内执行、switch(notification.getName())各种回调 -> 回调内调用proxy拿数据 -> proxy回调内调用mediator更新界面 
13. sendNotification与registerCommand()、registerMediator()在Observer内被关联
14. 底层调用了View.notifyObservers()并new了一个通知类，它的底层调用了Observer.notifyObserver()
    Controller类中notificationName和Command类是数组的key-value，它是被registerCommand()实现，底层又是view.registerObserver()
    Notifier类：是MacroCommand类、SimpleCommand类、Mediator类和Proxy类的基类，它通过sendNotification()方法用来发送消息。
    Facade：
15. 按需调用super.initializeController/
16. this.registerCommand(str,mainCommand)
17. send会触发注册的new类并执行execute
    实用点：
18. 获取代理引用：this.facade.retrieveProxy(bull.CardProxy.NAME)
19. Mediator通信：listNotificationInterests数组手写入字符，handleNotification判断字符执行回调。

#### Three.js



```
castShadow = true;   //设置该对象可以产生阴影
receiveShadow = true;  //设置该对象可以接收阴影
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 修改阴影柔和模式
spotLight.shadowMapHeight=5048; //阴影分辨率精度
spotLight.shadowMapWidth=5148;
lightMap属性 用阴影图片代替阴影
new TWEEN.Tween( mesh.position).to( { x: -400 }, 3000 ).repeat( Infinity ).start();// 随便哪调用
TWEEN.update(); // 在requestAnimationFrame内调用
```

MeshBasicMaterial：对光照无感，给几何体一种简单的颜色或显示线框。

MeshLambertMaterial：这种材质对光照有反应，用于创建暗淡的不发光的物体。

MeshPhongMaterial：这种材质对光照也有反应，用于创建金属类明亮的物体。

emissive是材质的自发光颜色 

ambient：设置材质的环境色，和AmbientLight光源一起使用 





```
texture = new THREE.Texture( canvas);  动态纹理
texture.needsUpdate = true 
```

加载3D模型：不支持.tga 引入1.DDSLoader.js   2.OBJLoader.js    3.OBJMTLLoader.js 

```
THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
new THREE.MTLLoader()
   .load('http://127.0.0.1/male02.mtl', function (materials) {
       materials.preload();
       new THREE.OBJLoader()
          .setMaterials(materials)
          .load('http://127.0.0.1/male02.obj',
             function (object) {
                 object.position.z = -160;
                 scene.add(object);
           });
});

```

#### Egret3D 

贴图是一张照片，用于替代模型。纹理是重复，阵列，缩放的贴图。材质是视觉层面的反光表现力。

结构：egret3d是引擎代码，paper是是仿unity的组件实体系统，AssetsManager  是资源和网络。

2d3d的不同：声音，Paper-cli egret命令行

矢量 Vector3D代表一个坐标点。射线Ray由两个坐标点组成。

曲面法线进行光照计算 

4*4矩阵方法 Matrix4_4

四元数旋转 Quaternion  

渲染管线：先把3D坐标转为2D坐标，再把2D坐标转为带颜色的像素。

着色器：GPU每个核运行渲染管线的小程序。

组件实体系统：实体包含若干组件，组件有数据，系统有实体逻辑。

```
|--场景
    |-- GameObject (模型)  const cube = new paper.GameObject();
        |-- 网格过滤组件    const meshFilter = cube.addComponent(egret3d.MeshFilter); 
        				  meshFilter.mesh = egret3d.DefaultMeshes.CUBE;
        |-- 网格渲染组件 	  const renderer = cube.addComponent(egret3d.MeshRenderer);
        |-- 材质组件	   const texture = RES.getRes("logo_png") as egret3d.Texture;
        				 const material = new egret3d.Material();
        				 material.setShader(egret3d.DefaultShaders.DIFFUSE);
        				 material.setTexture("_MainTex", texture);
        				 renderer.materials = [material];
        |-- 变换组件
    |-- GameObject（摄像机）
        |-- 摄像机组件
    |-- GameObject(灯光)
        |-- 灯光组件
```

demo:

this.gameObject.transform.setLocalEulerAngles(x,y,z) 旋转

#### 微信小游戏

全局对象： window => `GameGlobal`
`wx.onTouchStart onTouchMove onTouchEnd onTouchCancel`
`wx.createCanvas()`

`wx.navigateToMiniProgram` 小程序跳转到小游戏

##### 开放数据源

类似getUserCloudStorage 这种只能在另一个js里单独调用。

##### 引入三方tiled库：

1. 改配置先清理再构建
2. wxgame.ts改：if (filename == 'libs/modules/tiled/tiled.js' || filename == 'libs/modules/tiled/tiled.min.js') {content += ';window.tiled = tiled';}
3. 如果需要解析XML文件，要下载xml支持库,在ganme.js引用：
    window.DOMParser = require("./xmldom/xmldom.js").DOMParser;
4. 注释setTimeout语句。
    发布：先关闭微信开发者工具，再点击插件发布小游戏。
    tiled编辑器：
 5. 对象层是用来预埋坐标的。
 6. 对象层无子元素：.tmx必须要有<tileset><image /></tileset>
 7. 图片层不显示:修改tiled.js：_this.x = +data.attributes.offsetx; min.js要重新压缩。
    点击失效：设$touchEnabled = true
    侦听到 tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE 事件


##### 命令行

egret前缀 当前文件夹则不需要name

    1. 新建项目： `create name --type game/empty/gui/eui`
    2. 新建库：`create_lib name`
    3. 游戏转app:`create_app name -f "路径1" -t "路径2"`
    4. 构建：`build name` -e编译引擎并清理libs/modules/--runtime native编译native 
    5. 发布：`publish name --version 0.03` --runtime html5|native发布方式 --passWorld 000 解压密码
    6. 服务器运行：`startserver name --port 8080` -ip本机IP -serveronly只运行服务器
    7. 重置引擎：`clean name`
    8. 升级：`upgrade name`
    9. 升级后检测api替换：`apitest name`
    10. 编译引擎：`make`
    11. 命令手册：`help [command]`

#### Typescript:

语法：

1. 基本 :any  :Object :string :boolean :number :symbol支持浮点数/2、8、10、16进制数 :Error :Date :RegExp :HTMLElement ：Document ：Event ：NodeList 
   1. `：any`声明但未赋值的变量默认类型，可做任意操作。
   2. `:undefined`和`:null`值只能为自己,且是所有类型的子类型。
   3. 类型推论：声明且赋值自动加类型。2.1中根据最后一次赋值，联合类型会变化哦！
   4. 联合类型：`:string | number`注意如果传值没定义类型，则只能访问共有属性！ 
   5. 类型断言： `(a as string).length` / `(<string>a).length` 等价于a.length,前者支持JSX
2. `type` 用于综合类型
   1. type EventNames = 'click' | 'scroll' | 'mousemove'; 必须为这三个字符串之一。
   2. type A = typeA|typeB 为type综合类型之一
3. 数组：
   1. 数字`:number[]`或`:Array<number>` `:any[]`
   2. 只读的数组 ：ReadonlyArray<number>
   3. 元组 :[string,number] 前2位按顺序为该类型，后添加值也得是该类型之一。赋值时必须一次按类型赋值，不能分段赋值
4. 枚举类型 enum Name {a, b=100, c,} let kk:Name=Name.a;  值必须为数字。默认值从0开始，累加1。手动赋值的值后面累加1。适用于给数字命名。 
5. 设了某种类型，其它类型的原生方法会被屏蔽。
6. 函数 
   1. ():void 规定返回值类型,必须为`null`和`undefined`。
   2. ():never throw或return error 或while语句。 never类型不能被其它类型赋值 
   3. (obj:{a:string}) 检查传参的a属性 等价于(obj:jiekou) interface jiekou{a:string}
   4. 可选参数：`p?:string`放在最后
   5. 剩余参数：`(A , ...B:any[])`
7. .d.ts:
   1. 声明：`declare var jQuery: (string) => any;`
   2. 调用:`/// <reference path="./jQuery.d.ts" />`文件开头
   3. TypeScript 核心库的定义中不包含 Node.js 部分。`npm install @types/node --save-dev`
   4. 修改默认:`D:\Microsoft VS Code\resources\app\extensions\node_modules\typescript\liblib.dom.d.ts`
8. 接口：interface jiekou{a:string; b?:number; readonly c:number; (d:string):boolean; [index: number]: string; f(e:Date);} 
   1. 可选属性：`?` 
   2. 只读属性：`readonly a:number` 调用时只能被赋值一次，适合属性
   3. ():boolean 函数类型，参数名可不与接口参数一致
   4. [index:number]:string 用数字索引取的值必须是字符串
   5. f(d:Date) 继承类必须重写它
   6. 首字母大写
   7. 总结：必选属性不多不少，可选属性可以少,任意属性可以多。 
   8. 任意属性：`[propName: string]: any;` 其它属性类型必须为任意类型的子类型。
   9. 数组的接口定义：`[index:number]:number`
   10. 接口用`:`在左边是约束定义时的格式，用`<>`在右边是约束后面的赋值格式。
   11. 同名接口会合并。
9. 类：
   1. pubilc 默认
   2. private 用this.xx访问
   3. protected 子类在内部可用this.xx访问父类的xx，子类的实例不能直接访问。
   4. readonly 只读
   5. super 调用父类的constructor
   6. get name() {} set name(value) {} 影响点操作符
   7. 实例属性： name="a" 等价于 constructor内的this.name="a"
   8. abstract 抽象类或抽象方法，父类对子类的约束，子类必须实现抽象方法！
   9. implements和interface 接口定义的类似公用方法，但没有方法体。接口可继承接口。接口对任何类的约束，该类必须实现接口方法！
10. 模块：
    1. 声明 declare module "url" {export }  
    2. 导入 import * as URL from "url"
11. 泛型： 用来约束未知类型
    1. `fuc<T,U>(len: U, value: T): Array<T>` 表示返回值是数组，数组成员类型为value类型。
    2. 因为泛型不知道具体类型，访问属性会报错，所以泛型可继承接口`<T extends a>`,在接口内定义要访问的属性。
12. 反射：运行时探知未知类的属性和方法，运行时能使用任意类！
    1. `abstract class`内的private调用`protected abstract`方法可调用子类的同名`protected`方法。
    2. 父类的protected可调用protected间接调用子类同名protected方法。
       tsconfig.json：
13. noEmitOnError：报错不编译成js
    问题：
    type C = { a: string, b?: number }

```
function f({ a, b }: C): void {
```

}

##### 技巧

1. interface：调用超过定义的字段会报错。后端修改字段->修改接口字段->根据报错改对应调用代码！(实际上就是根据报错查哪里要修改) 【定义的不可多也不可少】

##### 踩坑

1. 监听事件时，this参数不一定是本类。

```
class haha{
    private _ins;
    get ins(){
        this._ins = 3;
        return this._ins;
    }
    async a(){
        const h = await new Promise((a,b)=>{
            setTimeout(()=>{console.log("a()");a(20)},2000)
        })
        const l = await new Promise((a,b)=>{
            setTimeout(()=>{console.log("b()");a((h+100))},2000)
        })
        console.log("all",h,l);
        return h+l;
    }
    sleep(timeountMS) {
        for(let i of [1,2]){}
        return new Promise((resolve) => {
                    setTimeout(resolve, timeountMS);
                });
    } 
}
```

#### 实战踩坑

    1. 定时器：不用TIMER_COMPLETE事件，直接
    
    2. 调用timer.stop();
    
    3. dispatchEventWith触发任意字符串。dispatchEvent不行。
    
    4. dispatchEventWith发送的参数，event.data接收。
    
    5. window.location.href跳转地址必须带协议
    
    6. 调用组件父级容器的validateNow()方法解决异步刷新闪屏
    
    7. 获取主场景引用：egret.MainContext.instance.stage
    
    8. 文本颜色：textColor十六进制 #FFCD70 应写成 0XFFCD70
    
    9. 强制横屏：this.stage.orientation = egret.OrientationMode.LANDSCAPE;
    
    10. 蓝屏后网页白板：index.html损坏！
    
    11. addListener()这个API会被调用2次！
    
    12. 子级点击区域不能超过父级Group
    
    13. 老手机不支持new url()
    
    14. IOS的资源有缓存。在index.html里加window.sourceVer = "1.1";
    
    15. 动态组件：
            1. collection.addItem()不卡。 replaceAll()不会重置滚动位置
            2. Itemrender内存调用栈爆炸：是因为ArrayCollection传参不是数组！
            3. Itemrender数据错误：滚动的时候没被新数据覆盖的老数据区域没清，需要手动隐藏。
            4. 隐藏滚动条：scrollPolicyH="ScrollPolicy.OFF"
            5. 原理：拿List组件来说，如果数据源只有一条数据，显示区域可以同时显示十条，则开始时只创建一个项目渲染器，添加一条数据，再创建一个新的项目渲染器。当数据量超过显示区域的最大值10时，就不再创建新的itemRenderer，而是回收利用现有资源。
            6. 事件：eui.ItemTapEvent.ITEM_TAP -> e.itemRenderer。点list项找到itemRenderer再找到按钮属性，用once挂事件，不能批量绑定按钮事件因为只能找到数据，找不到显示对象(itemRenderer有限)。
    
    16. 手机扫描egret本地服务器要在同一网关，查看本地网络的IPv4地址。
    
    17. 引入三方库：文件夹放在项目外同级位置。首先要有文件夹包含3个文件p2.d.ts p2.js p2.min.js -> egretProperties.json用name:'p2',"path":绝对路径引入文件夹。-> 项目内用egret build -e编译      Cannot find name 'p2'是官网的.d.ts不能用！ 
    
    18. 获取Group组子元素：`this.group.getElementAt(1)`
    
    19. 大量Image动画性能比大量Button高
    
    20. 调用其它类方法时不奏效：因为拿到的不是这个实例，检查下该类是被new出来的还是get单例出来的！
    
    21. Wing编辑器踩坑：
            1. 图片居中：位图字体不能设宽度！分类属性勾选详细约束上中项0！
            2. 锚点：点击图片按shift键拖动蓝点！ 复合组件双击进入子界面分别设置锚点！
    
    22. 屏幕适配：
            1. fixedwidth模式：宽度不变。
            2. egret.Event.RESIZE只能被this.stage监听！
    
    23. id属性不可为关键字：name、 
    
    24. ios的touchPointID值是随机的，安卓是单指0 二指1
    
    25. win10的微信开发者工具点击按钮黑屏：右键图形独显开启
#### 常用组件写法例子

#####   垂直动态数据滚动条

```
<e:Scroller id="Scroller" xmlns:e="http://ns.egret.com/eui" scrollPolicyH="ScrollPolicy.OFF">
    <e:Skin>
        <e:HScrollBar id="horizontalScrollBar" width="100%" bottom="0" autoVisibility="false" visible="false" />
        <e:VScrollBar id="verticalScrollBar" height="100%" right="0" autoVisibility="false" visible="false" />
    </e:Skin>
    <e:List id="list">
        <e:itemRendererSkinName >
            <e:Skin states="up,down">
                    <e:Label id="kicking" text="{data.name}" /> 
					//id属性会被挂到itemRender对象上！
 			</e:Skin>
        </e:itemRendererSkinName>
    </e:List>
</e:Scroller>

this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,(e) => {
 //console.log(this.list_wait.selectedItem,this.list_wait.selectedIndex,this.list_wait.selectedIndices,e,e.target,e.itemRenderer)
	e.itemRenderer.check.once(egret.TouchEvent.TOUCH_TAP, this.C_SEND_APPLY,this);
	e.itemRenderer.ignore.once(egret.TouchEvent.TOUCH_TAP, this.C_SEND_IGNORE,this);
},this)
```
##### 中心缩放

```
this.anchorOffsetX = this.width / 2; //要预设绝对锚点 再设坐标
this.x = this.width / 2;
this.anchorOffsetY = this.height / 2;
this.y = this.height / 2;
egret.Tween.get(this, {})
	.to({
		scaleX:0,
		scaleY:0,
		anchorOffsetY : this.height/2,
		anchorOffsetX : this.width/2
	}, 1000,egret.Ease.bounceIn) 
	.call(this.goback, this, ["param1", {key: "key", value: 3}]);
```
##### 头像

远程拉下来的数据转成Gpu纹理

```
RES.getResByUrl(avatar, function (event: any) {
	var img: egret.Texture = <egret.Texture>event;
	this.headmask.texture = img; //headmask是个image
}, this, RES.ResourceItem.TYPE_IMAGE);

private headmask(){ //绘制圆角并设置头像遮罩
	var shp:egret.Shape = new egret.Shape(); 
	shp.graphics.beginFill( 0xff0000 ); shp.graphics.drawRoundRect(11.6,10.27,115,115,50,50); shp.graphics.endFill(); 
	this.addChild( shp ); 
	this.head.mask = shp;//this.head
}
```
##### 自适应

```
this.addEventListener(egret.Event.RESIZE,this.onResize,this);
onResize(){
	let stageWidth = egret.MainContext.instance.stage.stageWidth;
	let stageHeight = egret.MainContext.instance.stage.stageHeight;
	let widthPercentage = stageWidth / 1920;
	let hightPercentage = stageHeight / 1080;
	this.scaleX = widthPercentage;
	this.scaleY = hightPercentage;
	console.log("大小",stageWidth,stageHeight)
}
```
##### 自定义item

```
this.List.itemRenderer = ite_bottom;
class ite_bottom extends eui.ItemRenderer{
	constructor(){
		super();
		this.skinName = `<?xml version="1.0" encoding="utf-8"?>
			<e:Skin class="ite_bottom_c" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
				<e:Group></e:Group>
			</e:Skin>
		`;
	}
	dataChanged(){
		console.log('项切换数据会调用它')
	}
	
```
##### 翻牌动画

```
var sx = card.scaleX, sy = card.scaleY;
card.runAction([
    {to:{scaleX: 0}, duration: 0.4},
    {func: (card)=>{card.setFrame(1)}}, //换图
    {to:{scaleX: sx}, duration: 0.4}
]);
```
##### 滑动条

```
//新建一个a.exml
	<?xml version="1.0" encoding="utf-8"?>
	<e:Skin class="a" minWidth="378" minHeight="8" xmlns:e="http://ns.egret.com/eui">
	    <e:Image id="" width="100%"  verticalCenter="0" source="setting_yinliangtiao_png" horizontalCenter="0"/>
	    <e:Image id=""  verticalCenter="0" source="setting_tiao_png"  x="0"/>
	    <e:Image id="" verticalCenter="1" source="setting_tuodong_png" x="610" />
	</e:Skin>
//HSlider.skinName="a"
不能获取它的子节点，但可以用id获取。
```

##### 碰撞

```
if (shp.hitTestPoint( this.obj.x, this.obj.y)) 
	this.removeEventListener(egret.Event.ENTER_FRAME, calls, this )
```



##### 弹球反弹

  1. 碰到矩形x边 `vx*=-1` 碰到y边 `vy*=-1` 垂直水平边取反正负号
  2. 球球之间碰 遍历所有对象坐标,比较二者坐标判断 左上/左/左下/右上/右/右下/上/下 8个方位。转换vx/vy正负既可。
向量积：
 1. 如果向量1转向向量2为逆时针，那么他们的向量积就大于0，如果是顺时针，那么就小于0。`<x1,y1>*<x2,y2> = x1*y2-x2*y1` 手算过转了三个象限判断顺逆时针有效。
 2.  如果两个点在一个位于原点的向量（暂称原向量）两侧，那两个向量必将在原向量的顺时针和逆时针两侧。那么原向量和两个向量分别的向量积必定异号

### 物理引擎

##### matter.js

egret引入matter.js教程：<https://github.com/guawoo/matterDemo_egret>

```javascript
 // 对刚体circle施加一个上抛力
 Matter.Body.applyForce(circle, circle.position, {
 	x:0,y:0.5
 })
// y方向重力为0
engine.world.gravity.y = 0;
// 碰撞事件
Matter.Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        //pair.bodyA pair.bodyB是碰撞双方
    }
}) 
// 自定义组合刚体
Matter.Body.create({
    parts:[b1,b2],
});
```

刚体的options

```
{
     egretSprite: shape, //自定义
     container:this,		 //自定义
     friction: .2,			 //摩擦力
     frictionAir//空气摩擦
     frictionStatic//静止摩擦
     isSleeping: true,       //睡眠中
     isStatic,				 //静态
     isSensor:true 			 //传感器，触发碰撞
     restitution: 0.5,  	 //弹性：0不弹，越大越弹
     angle:角度*Math.PI/360 //旋转弧度 这里1π是360度？
     chamfer: 15 //矩形圆角度
}
timeScale刚体内的时间流速 torque扭矩 parts刚体内零件数组 parent零件的父级 motion当前移动量 inverseMass=1/mass和mass质量 inverseInertia=1/inertia和inertia惯性矩 id label density密度 slop允许刚体重叠距离
collisionFilter:{
	group所属碰撞组 mask和category碰撞分类
}
angularVelocity通过修改扭矩和车身角度来修改角速度 angularSpeed当前角速度(只读)
```

```
时间速率 engine.timing.timeScale 1正常 0停止 >1快动作
```

pointA 和 pointB 表示约束点的位置，其值为向量，默认为{x=0,y:0}在物体中心位置。以物体中心为原点进行量相减(三角形法则)

```
Body.setStatic()
Sleeping.set
Body.translate无速度移动
Body.setVelocity设置速度 x:0.5等于egret的50x轴距离
Body.setPosition 设置位置
Body.setParts(body, [body], [autoHull=true]) 设置零件
Matter.Body.nextGroup(false)  groupId相等时false不碰撞true碰撞

另一种移动：帧事件里把视图的坐标赋值给刚体 robot_phy.position.x = robot.x 但会穿透
```



```
//Engine.create()
options{
    broadphase :  ; Engine.create (应该一个引擎实例  ,  默认为一个 Engine.create对象)

    constraintIterations: ;number (整数,默认为 2 通常很充足,   可以理解为帧数   针对约束迭代)

    enableSleeping : ;boolean (默认为 false     是否可以通过 Matter.Sleeping模块休眠)

    plugin : ;  (用于存储特定插件的属性对象)

    positionIterations : ; number (整数, 默认为6 , 可以理解为帧数   针对于位置迭代)

    timing : (定时系统包含的属性){

        timeScale :  ;number指定所有实体的全局缩放时间因子,  (0 为冻结时间 , 值为 0.1 慢动作效果,1.2 位加速)

        timestamp :  ;number 指定当前模拟时间(毫秒)0, 按照Engine.update给定的 delta 参数递增(与Engine.update方法对应)

    }

    velocityIterations: ; number 指定执行每次更新的迭代次数, 值越高,模拟质量越高, 帧

    world: ;  Matter.World  一个 World 实例  即 世界/舞台  包含所有的 实例模拟体,约束等

}

```

事件

```
afterUpdate/beforeUpdate 更新和碰撞发生后/前
collisonActive 正在碰撞
collisonEnd 结束碰撞 	
collisonStart 开始碰撞
```



bug:

刚体穿透： 自动休眠模式会引发 | 力度太大 |  调密度弹性

刚体间碰撞抖动：零件设成静态 刚体挤压

静态刚体设动态，xy变Null angle变 NaN

x轴和egret x轴不对应