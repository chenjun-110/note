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

