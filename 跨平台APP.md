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

夜神模拟器

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

# Flutter 

## Android Studio搭建bug

`No valid Android SDK platforms found`

​	执行`flutter upgrade`

​	可能要更新sdk

`uses-sdk:minSdkVersion 16 cannot be smaller than version 17 declared in library`

​	修改`android/app/src/build.gradle`的minSdkVersion字段值

`Incompatible HAX module version 3,requires minimum version 4 No accelerator found.`

 	先在SDK-TOOLS里下载HAX，再在`android-sdk\extras\intel\Hardware_Accelerated_Execution_Manager` 运行 `IntelHaxm.exe`

## 热加载bug

adb有问题要更新 Android SDK Platform-Tools

## 代理bug

1. gradle打包代理gradle.properties加上`org.gradle.jvmargs=-DsocksProxyHost=127.0.0.1 -DsocksProxyPort=1080 -DsocksNonProxyHosts=*.xcompany.com`。一定要把之前的`org.gradle.jvmargs`删掉！

   1080是影梭的Ip,并用switchyOmega的proxy添加了代理了127.0.0.1:1080，点应用选项。

   AS编辑器代理**Android SDK Manager - Settings** =》**HTTP Proxy Server**

2. github下载的插件一定要先打开下载pub依赖再引入！

3. 设置代理（发布插件用的），设置了会影响热加载

```cmd
set http_proxy=http://127.0.0.1:1080
set https_proxy=http://127.0.0.1:1080
```

4. 设置Git Bash代理

   ```bash
   export http_proxy="http://127.0.0.1:1080"
   export https_proxy="http://127.0.0.1:1080"
   ```

5. 设置全局代理：Proxifier软件+影梭 (推荐！！！) 可实现shell全局代理支持socks5协议。

6. oop错误：去掉org.gradle.jvmargs=-Xmx1536M

## 模拟器

设置Android模拟器

1. 确保电脑启用了VM acceleration
2. 启动 **Android Studio>Tools>Android>AVD Manager** 创建一个模拟器
3. 模拟器配置使用 *x86* 或 *x86_64* image .
4. 在 Emulated Performance下, 选择 **Hardware - GLES 2.0** 以启用硬件加速并 **Finish**。
5. 启动模拟器（夜神 adb connect 127.0.0.1:62001）
6. `flutter run` 

单独启动Android模拟器：cmd`D:\Android\sdk\emulator\emulator.exe -netdelay none -netspeed full -avd Pixel_API_23`Pixel_API_23是建好的name，_是空格

cmd按R刷新 按H监控 按P显示布局线框 按o切换系统 I是部件树？

引入库：先修改**pubspec.yaml**的dependencies, 再`import 'package:包名/xx.dart';`

## 框架类

Widget修饰的都是布局，Widget方法内部调用不需要this

### 无状态部件 

属性不能改变 继承它的类都是Widget,可作参数传递给布局。

```dart
class MyApp extends StatelessWidget {
  Widget build(BuildContext context) { //一定有个build方法
    return new MaterialApp();
  }
}
```

### 有状态部件

```dart
class name extends StatefulWidget {
  name({Key key}) : super(key: key);//可能是初始化调用
  final List<Product> products;
  a createState() => new a(); //name实例.createState()返回State对象引用
}
class a extends State<name> {
  int _counter = 0;
  Widget build(BuildContext context) {
    return new Row(children: <Widget>[
      new CounterIncrementor(onPressed: _increment), //无状态部件，父类方法下传(同级组件通信)
      new CounterDisplay(count: _counter),//无状态部件
    ]);
  }
  void _increment() {
    setState(() { //在这里面修改值可刷新界面
      _counter++; //widget属性指向实例name，name被销毁并重建时指向会变化(didUpdateWidget触发)
    });
  }
  void initState() {
    super.initState();
  }
}
```

Widget是临时对象, State是持久对象。在Flutter中，事件流是“向上”传递的，而状态流是“向下”传递的

//name({Product product, this.inCart, this.onCartChanged})
//    : product = product,
//      super(key: new ObjectKey(product));//这又是什么？

createState 触发 State的super.initState。销毁是super.dispose



某些widget属性需要单个（child），action需要一组[children]



### widget部件

**runApp**接受根部件，覆盖整个屏幕

最低层的widget通常为`RenderObject`，它会计算并描述widget的几何形状。

#### `Text`

#### `Row/Column`

Flexbox

```dart
new Column(
 children: <Widget>[
  new MyAppBar(),
  new Expanded(), //弹性填充
 ],
)
Row(
	mainAxisAlignment: MainAxisAlignment.spaceBetween,
)
```

#### `Stack` 

线性布局绝对定位

positioned相对Stack的左上角

StackFit属性有如下几种：

- loose：子节点宽松的取值，可以从min到max的尺寸；
- expand：子节点尽可能的占用空间，取max尺寸；
- passthrough：不改变子节点的约束条件。

#### `Container`

盒模型：背景/边框/阴影/margins/padding/constraints大小/矩阵三维

`LimitedBox`, `ConstrainedBox`, `Align`, `Padding`, `DecoratedBox`, `Transform`

##### 图片

```dart
image: AssetImage('assets/background.png') //本地
body: Image.network('https://flutter.io/images/owl.jpg') //网络
new Image.asset(
    'images/beefsteak.jpg',
    fit: BoxFit.cover,
);
```



Material UI需要MaterialApp开始。Scaffold是Material中主要的布局组件.

##### ListView

ListView适合少量数据，ListView.builder适合无限列表

```dart
ListView.builder(
  itemCount: data.length,
  itemBuilder: (context, int index) {
    return Text(
      data[index],
    );
  },
  padding:EdgeInsets.all(0.0)
)
```

ListView的onItemClickListener来确定哪个列表项被点击

#### `Button`

```dart
SizedBox( // 用它才能给IconButton设置尺寸
    height: 40,
    width: 40,
    child: IconButton(
        icon: Image.asset('images/tj.png'),
        padding: EdgeInsets.all(0),
        alignment: Alignment(0, 0),
        onPressed: () {  },
    ),
)
```



### Material 

Scaffold：

  Drawer 水平滑动面板

```dart
Drawer(
  child:ListTile( //抽屉导航/侧边面板
    leading: Icon(Icons.change_history),
    title: Text('Screen2'),
    onTap: () {
      Navigator.of(context).pushNamed("/b");
    },
  ),
  elevation: 20.0,
),
```

  AppBars

  SnackBars

标签导航

```dart
class _NavigationHomePageState extends State<NavigationHomePage> with SingleTickerProviderStateMixin {
  TabController controller=TabController(length: 2, vsync: this);//
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: Material (
        child: TabBar(//对应1
          tabs: <Tab> [
            Tab(icon: Icon(Icons.person),)
            Tab(icon: Icon(Icons.email),),
          ],
          controller: controller,//对应2
        ),
        color: Colors.blue,
      ),
      body: TabBarView(//对应1
        children: <Widget> [
          home.homeScreen(),
          tabScreen.tabScreen()
        ],
        controller: controller,//对应2
      )
    );
  }
}
```



### 手势

不能阻止冒泡

```dart
new GestureDetector(
  onTap: () {},
  child: new Container()
)
onTapDown
onTapUp
onTap
onTapCancel
onDoubleTap 双击
onLongPress 长按
垂直拖动
onVerticalDragStart
onVerticalDragUpdate
onVerticalDragEnd
水平拖拽 
onHorizontalDragStart
onHorizontalDragUpdate
onHorizontalDragEnd
底层事件
PointerDownEvent
PointerMoveEvent
PointerUpEvent
PointerCancelEvent 
```

有些widget自带`onPressed`回调



### 动画

```dart
// 每帧生成一个值 
controller = AnimationController(duration: const Duration(milliseconds: 3000), vsync: this);
// 缓动动画
final CurvedAnimation curve = new CurvedAnimation(parent: controller, curve: Curves.easeIn);
//animation传到部件的Animation属性中,或者animation.value传入普通属性
animation = Tween(begin: 0.0, end: 1.0).animate(curve)
            ..addListener(() {
                setState(() {});
            });
			..addStatusListener((state) => print("打印： $state"));
controller.forward();

dispose() {
    controller.dispose(); // 防内存泄漏
    super.dispose();
}

//如果没有调用.animate则这么传
opacity = new Tween<double>(begin: 0.1, end: 1.0)
opacity.evaluate(curve)
```

AnimationController：控制播放`controller.forward() reverse(),fling() repeat() animateTo()`。 



 Animation代表当前状态

​	 `vsync`防止屏幕外动画消耗，需要State对象加接口`with TickerProviderStateMixin或SingleTickerProviderStateMixin`

​	 当前值通过`value()`方法取到，报错可能是热更新的问题。

​	 addListener每帧都触发，addStatusListener在节点触发

  ```dart
// 往返循环播放
..addStatusListener((state) {
    if (state == AnimationStatus.completed) {
        controller.reverse();//倒放
    } else if (state == AnimationStatus.dismissed) {
        controller.forward();//正放
    }
    print("打印： $state");
    //值可能是AnimationStatus.forward/completed/dismissed/reverse
});
repeat 循环重播
  ```

Tween可用于颜色/数字/size

​	`new ColorTween(begin: Colors.transparent, end: Colors.black54)`

​	evaluate方法将映射函数应用于动画当前值



动画组件：AnimatedBuilder、AnimatedModalBarrier、DecoratedBoxTransition、FadeTransition、PositionedTransition、RelativePositionedTransition、RotationTransition、ScaleTransition、SizeTransition、SlideTransition。

##### 封装自定义动画组件

```dart
//这么做好处是什么 只是封装了widget部分而已。会自动调用addListener()和setState()
class AnimatedLogo extends AnimatedWidget {
  AnimatedLogo({Key key, Animation<double> animation})
      : super(key: key, listenable: animation);
  Widget build(BuildContext context) {
    final Animation<double> animation = listenable;
    return new Center(
      child: new Container(
        margin: new EdgeInsets.symmetric(vertical: 10.0),
        height: animation.value,
        width: animation.value,
        child: new FlutterLogo(),
      ),
    );
  }
}
new AnimatedLogo(animation: animation)
```

AnimatedBuilder自动监听来自Animation对象的通知，并根据需要将该控件树标记为脏(dirty)，因此不需要手动调用`addListener()`。

```dart
class GrowTransition extends StatelessWidget {
  GrowTransition({this.child, this.animation});
  final Widget child;
  final Animation<double> animation;
  Widget build(BuildContext context) {
    return new Center(
      child: new AnimatedBuilder( //标记控件为脏
          animation: animation,
          builder: (BuildContext context, Widget child) {
            return new Container(
                height: animation.value, width: animation.value, child: child);
          },
          child: child),
    );
  }
}
new GrowTransition(child: new LogoWidget(), animation: animation)
```

#### flare

```dart
import 'package:flare_flutter/flare_actor.dart';

    return new FlareActor("assets/test.flr", alignment:Alignment.center, fit:BoxFit.contain, animation:"动画名");

```

```dart
class Pandy extends StatefulWidget {
  @override
  PandyS createState() => PandyS();
}
class PandyS extends State<Pandy> implements FlareController {
  ActorAnimation _rock;
  String animationName = "Untitled";
  int start;
  double _rockTime = 0.0;
  void initialize(FlutterActorArtboard artboard) {
    _rock = artboard.getAnimation("Untitled");
    start = DateTime.now().millisecondsSinceEpoch;
  }
  void setViewTransform( viewTransform) {
    print('setViewTransform ${_rock.isLooping}');
  }
  bool advance(FlutterActorArtboard artboard, double elapsed) {
    _rockTime += elapsed;
    _rock.apply(_rockTime % _rock.duration, artboard, 0.1);//开始播放
    var now = DateTime.now().millisecondsSinceEpoch;
    if ((now - start) > 3000) {
      _rock.apply(0, artboard, 0.1);
      return false;// 停止播放
    } else {
    }
    print('advances ${_rockTime % _rock.duration} ${(now - start)}');
    return true;
  }
  Widget build(BuildContext context) {
    print('flr build');
    var flr = new FlareActor("images/test.flr", 
      alignment:Alignment.center, 
      fit:BoxFit.contain, 
      animation: "idle",//错误名字就是不自动播放
      controller: this,
      isPaused: false,
      callback: (r) {
        print('动画播放完毕');
        print(r);
      },
    );
    return RaisedButton(
      onPressed: () {
        print('点击元素');
        setState(() { // build会重新激活advance
            start = DateTime.now().millisecondsSinceEpoch;
            _rockTime = 0.0;
        });
      },
      child: flr
    );
  }
```

#### nima

```dart
import 'package:nima/nima_actor.dart';

```



### 画布

CustomPaint

不能用setState的方式来刷新

```dart
class ProgressPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
      Paint paint = Paint();//画笔属性
      canvas.drawCircle(，，paint);//图形属性
  }
  
  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
  bool shouldRebuildSemantics(MyCanvasPainter oldDelegate) => false;
}
Container(
child: CustomPaint(
    key: paintKey,
    size: size,
    painter: ProgressPainter(),
))

```



### 生命周期

通过 hook `WidgetsBinding` 观察者来监听生命周期事件，并监听 `didChangeAppLifecycleState()`的变化事件。

动态列表用`ListView.Builder`

### API



##### 平台

```dart
MediaQuery.of(context).size 设备尺寸
var statusBarHeight = MediaQuery.of(context).padding.top;//状态栏高度

if (Theme.of(context).platform == TargetPlatform.iOS) {
  return "iOS";
} else if (Theme.of(context).platform == TargetPlatform.android) {
  return "android";
} else if (Theme.of(context).platform == TargetPlatform.fuchsia) {
  return "fuchsia";
} else {
  return "not recognised ";
}
defaultTargetPlatform 当前平台

import dart:ui ；
window.devicePixelRatio 获取设备像素比；
window.physicalSize  获取屏幕尺寸
import 'dart:io';
platform library 可以查看平台信息
```

```dart
Theme.of(context) 拿到之前定义的new ThemeData对象
new Theme(
  data: Theme.of(context).copyWith(accentColor: Colors.yellow),child:
）//局部继承并覆盖
```

##### canvas-api

```dart
// 绘制弧线
drawArc(Rect rect, double startAngle, double sweepAngle, bool useCenter, Paint paint)
// 绘制图片
drawImage(Image image, Offset p, Paint paint) 
// 绘制圆
drawCircle(Offset c, double radius, Paint paint) 
// 绘制线条
drawLine(Offset p1, Offset p2, Paint paint) 
// 绘制椭圆
drawOval(Rect rect, Paint paint)
// 绘制文字
drawParagraph(Paragraph paragraph, Offset offset)
// 绘制路径
drawPath(Path path, Paint paint) 
// 绘制点
drawPoints(PointMode pointMode, List<Offset> points, Paint paint)
// 绘制Rect
drawRect(Rect rect, Paint paint) 
// 绘制阴影
drawShadow(Path path, Color color, double elevation, bool transparentOccluder)
// 旋转画布90度
canvas.save();
canvas.translate(0.0, size.width);
canvas.rotate(degToRad(-90.0));
canvas.drawArc(arcRect, 0.0, degToRad(angle), false, paint);
canvas.restore();

```

Paint-api

```dart
color：画笔颜色
style：绘制模式，画线 or 充满
maskFilter：绘制完成，还没有被混合到布局上时，添加的遮罩效果，比如blur效果
strokeWidth：线条宽度
strokeCap：线条结束时的绘制样式
    StrokeCap.round//圆头线
    StrokeCap.butt
    StrokeCap.square
shader：着色器，一般用来绘制渐变效果或ImageShader
```



### 布局API

##### 盒约束

```dart
//OverflowBox child尺寸可超出parent
new OverflowBox(
    maxWidth: double.INFINITY,//可超出的最大值
    maxHeight: double.INFINITY,
    child: new Container(),
)
//为200盒添加约束 
new ConstrainedBox(
  constraints: const BoxConstraints(
    minWidth: 100.0,
    minHeight: 100.0,
    maxWidth: 150.0,//超过约束会报错，晕， 
    maxHeight: 150.0,//默认值double.infinity Column子级会自动撑满它
  ),
  child: new Container(
    width: 200.0,
    height: 200.0,
    color: Colors.red,
  ),
);
//滚动条里放minHeight=vh，随子集增大而增大的元素。
//bug: Expanded都会充满max约束，我想要的是不让它充满
//思路: 通过多个Column嵌套组合,不用Expanded
//mainAxisSize: MainAxisSize.min 能让Column不充满max约束
```

ConstrainedBox 设置max和min

AspectRatio    强制子级的宽高比

SizedBox         强制子级的宽高值

LimitedBox     强制子级的max宽高

FittedBox        控制子级的fit和align (跟图片容器一致)

OverflowBox  子级大小可超过Overflow尺寸

IntrinsicHeight/Width 强制高度不受限的子级的高度为指定值，null值为同级固定高度子级的高度。 (性能差)

#### 尺寸单位

##### Alignment

[FractionalOffset](https://docs.flutter.io/flutter/painting/FractionalOffset-class.html)使用坐标系，其原点位于矩形的左上角，而[Alignment](https://docs.flutter.io/flutter/painting/Alignment-class.html)使用坐标系，原点位于矩形的中心。

FractionalOffset.center

```dart
Alignment(x,y) //对齐

alignment: Alignment.topLeft//控制child在盒子里的位置
    
mainAxisAlignment: MainAxisAlignment.spaceEvenly //行

crossAxisAlignment: CrossAxisAlignment.center //列
    				CrossAxisAlignment.start

mainAxisSize: MainAxisSize.min //内部所有元素紧密排列，不分散

//用Expanded(child:)包装每个元素代表弹性元素 默认flex:1
new Expanded(
    flex: 2,
    child: new Image.asset('images/pic2.jpg')
),
```

##### Offset 

偏移

##### Size  

宽高尺寸

##### EdgeInsets 

是边距通用的

#### margin/padding

```dart
margin: new EdgeInsets.symmetric(vertical: 10.0,horizontal:10.0)
EdgeInsetsDirectional.only(start: 56.0)
```

```dart
const EdgeInsets.all(8.0)
new EdgeInsets.all(16.0)
EdgeInsets.only(left: 10.0, right: 10.0, bottom: 8.0)
EdgeInsets.fromLTRB(10.0, 10.0, 10.0, 10.0)  
Padding(
    padding: EdgeInsets.all(20.0),
    child: Icon(Icons.lightbulb_outline, size: 48.0, 
                color: Colors.redAccent) //material所有
),
```

#### opacity

```dart
FadeTransition(
    opacity: animation,
    child: Container(
        height: 200.0,
        width: 200.0,
        child: FlutterLogo(),
    ),
);
new Center(
    child: new Opacity(
        opacity: _opacityTween.evaluate(animation),
        child: new Container(
            margin: new EdgeInsets.symmetric(vertical: 10.0),
            height: _sizeTween.evaluate(animation),
            width: _sizeTween.evaluate(animation),
            child: new FlutterLogo(),
        ),
    ),
);
```



#### color

```dart
color: const Color(0xFF0099ff) //0x+透明度+色值 ARGB格式
Colors.teal.shade700
Colors.grey[500] //这种适合动画？
Colors.red[500]

```
#### Theme

```dart
MaterialApp(
    title: 'Sample App',
    theme: ThemeData( //全局样式
        primarySwatch: Colors.blue,
        textSelectionColor: Colors.red
    ),
    home: SampleAppPage(),
);

Widget build(BuildContext context) {
    return Theme( //可单独使用
        data: ThemeData(
            primaryColor: Colors.cyan,
            brightness: brightness,
        ),
        child: Scaffold(
            backgroundColor:Theme.of(context).primaryColor
        ),
    );
}
```

#### CSS对照

```dart
// 弹性居中 
new Center()
    
// max-width 
请使用容器的BoxConstraints的minWidth，maxWidth
    
// 父级 position: relative，子集 position: absolute
new Container( // 父
  child: new Stack(
    children: [
      new Positioned( // 子
        child: new Container(),
        left: 24.0,
        top: 24.0,
      ),
    ],
  ), 
）
    
                                                              
// 容器
decoration: new BoxDecoration(
  borderRadius: new BorderRadius.all(const Radius.circular(8.0)), //圆角 border-radius: 8px;
  shape: BoxShape.circle, //圆形
    
  // 线性渐变 background: linear-gradient(180deg, #ef5350, rgba(0, 0, 0, 0) 80%); 
  gradient: new LinearGradient(
    begin: const Alignment(0.0, -1.0),//开始坐标
    end: const Alignment(0.0, 0.6),//结束坐标因为x值相等所以垂直渐变
    colors: <Color>[const Color(0xffef5350), const Color(0x00ef5350)],
  ),

  // 阴影 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 0 6px 20px rgba(0, 0, 0, 0.5); 
  boxShadow: <BoxShadow>[
    new BoxShadow (
        color: const Color(0xcc000000),
        offset: new Offset(0.0, 2.0),
        blurRadius: 4.0,
        //spreadRadius: 0,
    ),
    new BoxShadow (
        color: const Color(0x80000000),
        offset: new Offset(0.0, 6.0),
        blurRadius: 20.0,
    ),
  ],
),
new PhysicalModel(color: Colors.black,elevation: 6.0,child)

 visibility == RenderOffstage
```

```dart
// 文字
// text-aligh:right
new Directionality( //这种都是子代可继承的
    textDirection: TextDirection.rtl,
    child: new Text('我是一段文本')
)
new RichText(
    text: new TextSpan( // 文字嵌套
        style: bold24Roboto,
        children: <TextSpan>[
            new TextSpan(text: "Lorem "), //默认继承文字样式
            new TextSpan(
                text: "ipsum",
                style: new TextStyle(),
            ),
        ],
    ),
), 
// 不同大小文字基线对齐
new Baseline(
    baseline: 30.0, //对齐值
    baselineType: TextBaseline.alphabetic,
    child:
    new Text(
        'AAAAA',
        style: new TextStyle(
            fontSize: 12.0,
            textBaseline: TextBaseline.alphabetic,
        ),
    )
)
// 文字省略号 overflow: hidden;text-overflow: ellipsis;white-space: nowrap; 
new Text(
   "Lorem ipsum dolor sit amet, consec etur",
   style: bold24Roboto,
   overflow: TextOverflow.ellipsis,
   maxLines: 1, 
),

// TextStyle的属性
new TextStyle(
    fontSize: 24.0
    fontWeight: FontWeight.bold,
                FontWeight.w900
    fontFamily: "Georgia",
    textAlign: TextAlign.center, //text-align: center;
)
color
decoration
decorationColor
decorationStyle
fontFamily
fontSize
fontStyle
fontWeight
hashCode
height
inherit
letterSpacing
textBaseline
wordSpacing
```

透明度要Opacity widget

#### transfrom

```dart
new Transform(//有transform属性
 child: new Container()
 alignment: Alignment.center,//transform-origin
   
 // transform: scale(1.5);  缩放  
 transform: new Matrix4.identity()..scale(1.5),
    
 //transform: Matrix4.rotationZ(0.1)
), 

//translate(100%, 0)
new FractionalTranslation(translation: const Offset(1.0, 0.0))

//旋转
transform: new Matrix4.identity()..rotateZ(15 * 3.1415927 / 180),//15度
new RotatedBox(quarterTurns: -1) //90度
    
```

#### background-size

```dart
//可对任何元素生效
new FittedBox(fit: BoxFit.fitHeight/contain/cover/fitWidth/fill)
// 背景图
decoration: BoxDecoration(
    image: DecorationImage(
        image: AssetImage(
            'images/backs.png',
        )
    )
)
```

#### wx:if

```dart
// 隐藏时，需要手动关闭child上的动画。 
new Offstage(
     offstage: true,
     child: Container(color: Colors.blue, height: 100.0),
 ),
```

#### Wrap

单行的Wrap跟Row表现几乎一致，单列的Wrap则跟Row表现几乎一致。但Row与Column都是单行单列的

类似div内有多个可换行内联块

#### SingleChildScrollView

滚动ScrollView

禁用滚动：`physics: new NeverScrollableScrollPhysics()`

ListBody

控制子节点序列的排列

#### 裁剪区域

圆形剪裁(ClipOval)

圆角矩形剪裁(ClipRRect)

矩形剪裁(ClipRect)

###### 路径剪裁(ClipPath)

### 路由

```dart
void main() {
  runApp(MaterialApp(
    home: MyAppHome(),
    routes: <String, WidgetBuilder> {
      '/a': (BuildContext context) => MyPage(title: 'page A'),
      '/b': (BuildContext context) => MyPage(title: 'page B'),
      '/c': (BuildContext context) => MyPage(title: 'page C'),
    },
  ));
}

Map coordinates = await Navigator.of(context).pushNamed('/a');
Navigator.of(context).push(new MaterialPageRoute());
Navigator.of(context).pop({"lat":43.821757,"long":-79.226392});

Navigator.push(context, MaterialPageRoute(builder: (BuildContext context) => UsualNavscreen()));
```

```dart

```



### http

```dart
import 'package:http/http.dart' as http; //依赖 http: '>=0.11.3+12'
import 'dart:convert' show json;
Future loadData() async {
  String dataURL = "https://jsonplaceholder.typicode.com/posts";
  http.Response response = await http.get(dataURL);
  setState(() {
    widgets = json.decode(response.body);
  });
}
HttpRequest.request(url)
  .then((value) {})
  .catchError((error) => print(error));
```

Isolates 线程不能共享内存

Future类似promise

### 存储

##### 键值对

```dart
import 'package:shared_preferences/shared_preferences.dart';
//  先获取 shared preferences 
final prefs = await SharedPreferences.getInstance();
//  设置value-setInt，setBool和setString
prefs.setInt('counter', counter);
//  获取value
final counter = prefs.getInt('counter');
//  删除value
prefs.remove('counter');
```

##### 本地资源

```dart
import 'package:flutter/services.dart' show rootBundle;
Future<String> loadAsset() async {
  return await rootBundle.loadString('my-assets/data.json');
  return AssetImage("images/a_dot_burr.jpeg"); //widget访问本地图片
}
Widget build(BuildContext context) {
  return Image.asset("images/my_image.png");//加载本地图片
}

```



### pubspec.yaml

IDE插件会执行`flutter packages get`

```yaml
dependencies:
   flutter:
     sdk: flutter
   shared_preferences: any #本地存储库
   http: ^0.11.3+16 #http三方库
   cupertino_icons: ^0.1.0 #ios库-CupertinoIcons字体
flutter:
	uses-material-design：true #material库
	assets:
     - my-assets/data.json #任意资源 路径随便放
     - images/ #只导入文件 不包括子目录
    fonts:
  	 - family: MyCustomFont
       fonts:
        - asset: fonts/MyCustomFont.ttf
        - style: italic
```

```dart
import 'package:flutter/material.dart'; //Material Design库
import 'package:flutter/cupertino.dart';//iOS样式
import 'package:flutter/widgets.dart';//基本部件
import 'package:flutter/my_widgets.dart';//自定义部件
```

无论您导入哪个小部件包，Dart都只会导入在您的应用中使用的小部件

### 插件

#### webview

webview.createState().webviewReference

把java对象挂在到游览器的window

```java
webView.addJavascriptInterface(new Object() {
    @JavascriptInterface // 加上注解,方法才能被 JS 调用
    public void call(String string) {
        FlutterWebviewPlugin.channel.invokeMethod("onJSEvent", string);
    }
}, "JSBridge");
```



```dart
//dart调js
webview.createState().webviewReference.reloadUrl("javascript:(window.JSBridge.onJSEvent('qwerf'))()");
//js调dart
webview.createState().webviewReference.onJSEvent.listen((param) {});
```



### 

# Dart

有类型推断

在Dart中，只有布尔值“true”被视为true。

```

```

#### 函数

当函数类型分配给变量时，typedef会保留类型信息。

```dart
//=> 是return的缩写
void main() => runApp(MyApp()); 
var f3 = (int a) => print("a = $a");

//形参
void say({String name}) {
  print("hello, my name is $name"); //参数
}
void say({name: String}) {}

//调用-入参
say(name: 'zhangsan');
say("zhangsan");

//对象类型
StringBuffer sb = new StringBuffer();

// async/await
Future<String> getData() async{
  http.Response res = await http.get("http://www.baidu.com");
  return res.body;
}
getData().then((str) { print(str); });

```

##### 形参

`(@required String name, int age = 3, Function callback, [String hobby])`

`@required`参数必传，`[]`位置参数列表可不传，参数默认值为`null`, 函数默认返回值为`null`

#### 运算符

和js相同的有：switch if-else for for-in => while try-catch

因为是静态语言，所以很多地方要加类型。

```dart
//is is!判断数据类型
print(s is String) 	  // true
print(num is! String) // true

~/ 除并向下取整

//as 将一个对象强制类型转换
(emp as Person).teach();

//如果 ??= 运算符前面的变量为null，则赋值，否则不赋值
param ??= "world";

//如果 ?. 的属性不存在为null, 普通 . 会报错
str?.length

// 如果a非空返回a，否则b
a ?? b
//..运算符调用的方法返回值为对象本身
new Person()..eat()..study();

try {
	1 ~/ 0;
} on IntegerDivisionByZeroException { // 捕获指定类型的异常
	print("error");
} finally {
	print("over");
}

```

#### 类

##### 基本写法

```dart
  String name;
  int age;
  num x, y; 	//批量声明
  Person(this.x, this.y); //new的初始化1(默认构造方法)  new Person(1,2)
  Person.origin() { //new的初始化2(命名构造方法) new Person.origin()
    x = 0;
    y = 0;
  }
  Person.init(num y): this(1, y); //new的初始化3(命名构造方法调用了默认构造方法)
  sayHello() {
    print("hello, this is $name, I am $age years old, I am a $gender");
  }
  
  // Getter和Setter
  num get right => left + width;
  set right(num value) => left = value - width;
  
  // 静态属性
  static const name = "zhangsan";
  static sayHello() {
    print("hello, this is ${Cons.name}");
  }
  
  //+-运算符重载
  Person operator +(Person v) => new Person(x + v.x, y + v.y);
  	// x是左对象属性，v.x是右对象属性，返回一个新对象
  Person operator -(Person v) => new Person(x - v.x, y - v.y);
}

```

##### 继承及其它

```dart
Person(this.name, this.age);默认构造方法等同于下面
Person(String name, int age) {
    this.name = name;
    this.age = age;
}

//如果父类没有默认构造方法，继承时需要显示调用super
class Man extends Person {
  Man.origin(Map data) : super.origin(data) {
    print("Man");
  }
}

abstract class Doer {
  // 抽象方法，没有方法体，需要子类去实现
  void doSomething();
  // 普通的方法
  void greet() {
    print("hello world!");
  }
}

// 泛型
abstract class Cache<T> {
  T getByKey(String key);
  void setByKey(String key, T value);
}

// 枚举类
enum Color { red, green, blue }

// 使用with关键字，表示类C是由类A和类B的mixins
class C = A with B;
C c = new C();

@Override 的作用是：如果想重写父类的方法，比如toString()方法的话，在方法前面加上@Override 系统可以帮你检查方法的正确性。
```

#### 模块

```dart
import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;
import 'package:lib3/lib3.dart' show foo; // 只导入foo
import 'package:lib4/lib4.dart' hide foo; // 导入除了foo的所有其他部分
import 'package:lib5/lib5.dart' deferred as lib5; // 懒加载deferred as

// lib1的.
Element element1 = Element();

// lib2的.
lib2.Element element2 = lib2.Element();
```

#### 异步

##### Future

**顺序**：先执行同步代码，再执行Microtask队列，再执行event队列。

Microtask队列执行完后，如果又被插入了，继续执行。比如在Future多个then里插入Microtask，会在最后then之后执行。

Future的多个then的回调要快于下个Future。如果then返回值是Future,那么它要慢于下个Future。延时要慢于所有。



Future是Timer的封装

插入事件队列 new Future(() {})

microtask队列为空才执行delayed

new Future.delayed(const Duration(seconds:1), () {});

scheduleMicrotask(() {});

##### stream

onData，处理数据的 callback  唯一必填
onError，处理错误的 callback 
onDone，结束的 callback 
unsubscribeOnError，遇到第一个错误时是否停止（也就是取消订阅），默认为false 

```dart
var data = [1, 2, 3, 4];
var stream = new Stream.fromIterable(data);
stream.listen((e)=>print(e), onDone: () => print('Done')); 
```

```dart
var sub = stream.listen(null);
sub.onData((e){
  if(e > 2)
    sub.cancel();//取消，不触发ondone
  else 
	print(e);
});
sub.onError((e)=>print('error $e'));
sub.onDone(()=>print('done'));
```

```dart
var controller1 = new StreamController.broadcast();
var controller2 = new StreamController();//默认单订阅，只能listen一次
//send event
controller..add(1)..add(2)..add(3)..add(4);
//done
controller.close();

var myStream = controller.stream;
new Timer(new Duration(seconds:5), ()=>myStream.listen(print));
//controller2会输出，单订阅会持有数据，controller1不会，因为1之前被close了。
```

多订阅stream.asBroadcastStream()

#### 常用API

```dart
//创建map
Map<String, WidgetBuilder>.fromIterable(
    list,
    key: (dynamic demo) => '${demo.routeName}', 
    value: (dynamic demo) => demo.buildRoute,
);
// setInterval
Timer.periodic()
// setTimeout
Timer()
//setTimeout(,0)
Timer.run()
timer.cancel()

(1.012).toStringAsFixed(2) //保留2位小数
    
//List是有序的对象集合，具有长度。Set是无序的唯一对象集合。
new Set()..add('1')..addAll(['2', '3'])
```





# 安卓

四大组件

Activity => 页面/部件

Service => 后台服务

ContentProvider => 数据存取

BroadcastReceiver => 事件

Android 应用没有单一入口点，组件可被外部启动

Intent 事件消息（不能启动外部数据组件）

AndroidManifest.xml 清单声明：组件、权限、API、硬件、库

```xml
<manifest ... >
    ...
    <application ... >
        <activity android:name="com.example.project.ComposeEmailActivity">
            <intent-filter> //以便响应来自其他应用的Intent
                <action android:name="android.intent.action.SEND" />
                <data android:type="*/*" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>
    </application>
    //如果三方APP设置了指定权限，这里就要设置同名权限
    <uses-permission android:name="com.google.socialapp.permission.SHARE_POST" />
    <uses-feature android:name="android.hardware.camera.any"
                  android:required="true" />//必须使用的API，设备没有将无法安装
    <uses-sdk android:minSdkVersion="7" android:targetSdkVersion="19" />//
</manifest>
```



## Activity 

生命周期：onCreate() onStart显示 onResume获焦/onPause失焦 onStop/onRestart onDestroy



















