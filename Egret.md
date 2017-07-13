目录结构：
  1. src 代码区
  2. bin-debug 编译和debug区 (不动)
  3. libs 库文件
  4. resource default.res.json配置资源
  5. template 调试(不动)
  6. egretProperties.json 项目配置
    1. path：是库的版本，没写则升级，写了则不升级。`"${EGRET_DEFAULT}"`引擎路径，`"${EGRET_APP_DATA}/4.0.3"`引擎历史版本路径。
  7. index.html 入口
    1. game_files：由`build -e`所构不能动
    2. modules_files对应：libs/modules、项目配置中的mudules
    3. div:旋转模式、适配模式、帧频、游戏宽高、、多指数、显示fps/脏矩形区域/fpslog/过滤log/ps面板样式.
    4. script:egret.runEgret({}) 渲染模式、音频类型、抗锯齿、缩放画布
运行：构建egret build->调试egret startserver
生命周期egret.lifecycle
  1. onPause：进入后台
  2. onResume：进入前台
egret.ticker
  1. pause()：关闭渲染心跳
  2. resume():打开渲染心跳
自定义白鹭遇到宿主环境独有API：应先在ts中声明->事件监听/每帧判断
编译顺序报错：调用其他文件的类时声明引用来源注释`///<reference path="TestA.ts" />`
七大显示类：
  1. DisplayObject 显示对象基类，所有显示对象均继承自此类
  2. Bitmap	显示位图
  3. Shape	显示矢量图
  4. TextField	文本类
  5. BitmapText	位图文本类
  6. DisplayObjectContainer	显示对象容器接口
  7. Sprite	矢量绘制的显示容器
  8. Stage 舞台类
容器API：
`var shape:egret.Shape = new egret.Shape();`
  1. shape.x/y 图片锚点位置(笛卡尔坐标)
  2. scaleX/Y缩放 alpha透明度 rotation旋转角度 skewX/Y横纵向斜切 visible是否可见 width/height anchorOffsetX/Y改锚点自己的坐标
  3. 遮罩：mask=new egret.Rectangle(,,,) 仅显示对象的遮罩区 .mask=obj 显示对象obj的轮廓就是遮罩区(obj要在列表，要填充) maks=null删除遮罩
  4. 碰撞检测：`shp.hitTestPoint(x,y,true)`判断某点，返回true是发生了碰撞。 带3参是精确碰撞(消耗性能)，不带是非精确。
`var container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();`
  1. container.globalToLocal(0,0): 全局坐标(0,0)转容器内坐标.值输出到返回值的x、y属性。 localToGlobal是本地转舞台。
  2. addChild:  对象放在显示列表的顶层。同一对象多次添加只绘制一次(跟在哪个容器无关)。深度默认从0开始，每次+1。先把显示对象容器实例addChild到this -> 再把Shape实例addChild到container
  3. 容器对象.removeChild( 显示对象 ): 对象移出显示列表
  4. numChildren：子对象个数
  5. 增删改对象：`addChildAt`(显示对象, 深度值)： 插入到指定z-index。 `removeChildAt`(深度值)：移出指定深度对象 `removeChildren`():移出所有子对象 交换对象深度：`swapChildren`(对象, 对象)/`swapChildrenAt`(深度值, 深度值) `setChildIndex`(显示对象, 新深度值)：修改对象深度
  6. 容器获取子对象：推荐`getChildAt`(深度值)。 `getChildByName`(name属性) 
  3. this.stage: 获取对象的容器？
矢量画图API:
 shape/Sprite实例：`spr.graphics`前缀
  1. 基础过程： beginFill() -> drawReact/drawCircle() -> endFill() 
  2. 边框/线条样式：lineStyle(线宽，颜色)
  3. 清空：clear
  4. 圆：drawCircle(x,y,r) xy相对于shape对象锚点
  5. 线：起点moveTo(x,y) 节/终点：lineTo(x,y)、curveTo(x1,y1,x2,y2) 1是控制点，2是终点
  6. 圆弧：drawArc(x,y,r,ang1,ang2,true) 围绕圆心画弧线(可填充成扇形/拱形)，长度绘制从起弧->终弧(0是x轴最右处)，顺逆时针。
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
 
事件：`circle.touchEnabled = true; circle.addEventListener(egret.TouchEvent.TOUCH_TAP,fuc,this);`
  1. 手指按到屏幕：egret.TouchEvent.TOUCH_BEGIN
  2. 手指离开屏幕：egret.TouchEvent.TOUCH_END
  3. 手指坐标：e.stageX/Y 
  4. 手指按到的当前对象：e.currentTarget
  4. 触发手指移动事件：`this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,fuc,this);`
  5. 移除事件：this.stage.removeEventListener
  6. 点击事件：egret.TouchEvent.TOUCH_TAP
  7. 文字超链接事件：egret.TextEvent.LINK 会绑定textFlow的`stye:{"href":"event:abc"}`e.text取到abc stye:{"href":"www.baidu.com"}点击则跳转
  8. 滚动事件：TOUCH_BEGIN->TouchCancel 
  9. http事件：egret.Event.COMPLETE egret.IOErrorEvent.IO_ERROR egret.ProgressEvent.PROGRESS
  10. 位图事件：RES.ResourceEvent.GROUP_COMPLETE
自定义事件：
  1. 事件类：`class abc extends egret.Event` constructor(type,bubbles,cancelable){super(type,bubbles,cancelable)}
  2. 注册：`.addEventListener(abc.type, f.a, f)` f是接受事件的类,2参必是返回空值的函数格式，5参可设优先级数字 .removeEventListener参数一致
  3. 触发：`var msg = new abc(abc.type)` `this.dispatchEvent(msg)` 事件类的实例msg触发时传入f.a回调参数
  4. 检测是否注册：事件发送者.hasEventListener(事件类型)
http请求：
  1. 创建：var request = new egret.HttpRequest()
  2. 响应类型：responseType=egret.HttpResponseType.TEXT/ARRAY_BUFFER 
  3. open(url,egret.HttpMethod.GET) -> setRequestHeader("Content-Type", "application/x-www-form-urlencoded") -> send()
  4. COMPLETE事件回调里获取返回信息：event.currentTarget.response
  5. PROGRESS事件回调里获取进度条： Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%"
  6. 请求参数：GET的参数就写在url内，POST的参数去掉问号传给send()。
  7. 加载位图：new egret.ImageLoader -> http对象.once(,,null)注册 -> load(url) -> 回调里new egret.Bitmap(e.currentTarget.data) - crossOrigin='anonymous'匿名跨域访问
  8. 请求事件：监听用once
位图：
  1. new egret.Bitmap()
  2. 纹理：texture=RES.getRes(图name)
  3. json配置:{"groups":[],"resources":[{"name":,"type":,"url":}]}
  4. 顺序：RES监听位图事件 -> 插入位图 -> RES.loadConfig(jsonUrl,资源目录/) -> RES.loadGroup 
  5. 九宫格属性：拉伸时保护边框不变形scale9Grid=new egret.Rectangle(w,h,W,H)图1区宽高，2区宽，4区高(整数)
  6. 平铺属性：fillMode = egret.BitmapFillMode.REPEAT默认是拉伸
  7. 纹理集：用Texture Merger工具制作纹理集json -> 改配置文件type:'sheet'，keys和name值为json名 -> new egret.Bitmap(RES.getRes("jsonname.name1"))
  8. 截图：
    1. 截图转存本地：texture=RES.getRes() texture.saveToFile(截图格式,截图名,new egret.Rectangle(2,2,1,1)) 截图格式：'image/png'/ 'image/jpeg'
    2. 截屏：new egret.RenderTexture -> drawToTexture(this，rect) -> 赋值给new egret.Bitmap的texture
  9. 图片重叠时：img.blendMode = egret.BlendMode.NORMAL;覆盖 egret.BlendMode.ADD叠加透明变亮 egret.BlendMode.ERASE重叠区删除
  10. 滤镜：
    1. 光晕：img.filters = [new egret.GlowFilter(颜色，透明，x模糊,y模糊，强度，次数，方向，挖空)]
    2. 阴影：new egret.DropShadowFilter
问题：
  cacheAsBitmap = true; 对象转位图，频繁改位置不用重渲
  Sprite和Shape的区别？
贴图是一张照片，用于替代模型。纹理是重复，阵列，缩放的贴图。材质是视觉层面的反光表现力。
Typescript:
语法：
  1. 数字组成的数组：`list: number[]`或`list: Array<number>`











命令行：egret前缀 当前文件夹则不需要name
  1. 新建项目： `create name --type game/empty/gui/eui`
  2. 新建库：`create_lib name`
  3. 游戏转app:`create_app name -f "路径1" -t "路径2"`
  4. 构建：`build name` -e编译引擎并清理libs/modules/--runtime native编译native 
  5. 发布：`publish name --version 0.03` --runtime html5|native发布方式 --passWorld 000 解压密码
  6. 服务器运行：`startserver name --port 8080` -ip本机IP -serveronly只运行服务器
  7. 重置引擎：`clean name`
  8. 升级：`upgrade name`
  9. 升级后检测api替换：`apitest name`
  9. 编译引擎：`make`
  10. 命令手册：`help [command]`

